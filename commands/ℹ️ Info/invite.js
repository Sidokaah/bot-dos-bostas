const Discord = require("discord.js")

module.exports = {
    name: "invite",
    aliases: ["Invite", "INVITE", " invite", " Invite", " INVITE"],
    description: "Invite do Bot",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Convida o Bot!")
            .setDescription("Convida o Bot para o teu server para o utilizares como quiseres!")
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .addField("\u200B", `**ENG**-If you want to invite **${client.user.username}** to other servers, here's the link: [Link](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=271969366&scope=bot).\n
            **PT**- Se quiseres convidar o **${client.user.username}** para outro server, aqui está o link: [Link](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=271969366&scope=bot).`);
        message.channel.send(embed);
    }
}