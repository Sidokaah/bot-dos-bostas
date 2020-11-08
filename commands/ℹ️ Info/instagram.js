const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "instagram",
    aliases: ["Instagram", "INSTAGRAM", " instagram", " Instagram", " INSTAGRAM"],
    usage: ["[nome da conta"],
    description: "Procura informação sobre uma conta de Instagram",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        const name = args.join(" ");
        if (!name) {
            message.react(":X:748632517476745226")
            return message.reply("Se calhar dava jeito procurares algum nome...!")
                .then(m => m.delete(5000));
        }
        const url = `https://instagram.com/${name}/?__a=1`;
        let res;
        try {
            res = await fetch(url).then(url => url.json());
        } catch (e) {
            return message.reply("Não consegui encontrar essa conta... :(")
                .then(m => m.delete(5000));
        }
        const account = res.graphql.user;
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(account.full_name)
            .setURL(`https://instagram.com/${name}`)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Informação do Perfil", `**- Username:** ${account.username}
            **- Nome Verdadeiro:** ${account.full_name}
            **- Biografia:** ${account.biography.length == 0 ? "none" : account.biography}
            **- Posts:** ${account.edge_owner_to_timeline_media.count}
            **- Followers:** ${account.edge_followed_by.count}
            **- Following:** ${account.edge_follow.count}
            **- Conta privada:** ${account.is_private ? "Sim 🔐" : "Não 🔓"}`);
        message.channel.send(embed);
    }
}