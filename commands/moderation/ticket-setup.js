const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../../config.json")

module.exports = {
    name: "ticket-setup",
    aliases: [],
    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = config.prefix;
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("<:X:748632517476745226> Não tenho permissão para criar channels, isso sendo necessário para o comando ser usado!")
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`<:X:748632517476745226> Não tens permissões para usar este comando!`);
        let channel = message.mentions.channels.first();
        if (!channel) return message.channel.send(`Como usar: ` + "`" + `${prefix}ticket-setup #channel <título> | <descrição>` + "`");
        const rle = message.guild.roles.cache.find(role => role.name === "Support Team");
        if (!rle) return message.channel.send(`<:X:748632517476745226> Não há nenhum role neste server chamado "Support team", cria um antes de usares este comando!`)
        let splitarg = args.join(" ").split(" | ")
        let text = splitarg[2]
        let titulo = splitarg[1]
        if(!text) return message.channel.send("<:X:748632517476745226> Especifica a mensagem que queres pôr na embed!")
        if(!titulo) return message.channel.send("<:X:748632517476745226> Especifica a mensagem do título que queres pôr na embed!")
        let sent = await channel.send(
          new Discord.MessageEmbed()
            .setAuthor(titulo)
            .setDescription(text)
            .setFooter("Ticket System", client.user.displayAvatarURL())
            .setTimestamp()
            .setColor("00ff00")
        );
        sent.react("🎫");
        db.set(`${message.guild.id}-ticket`, sent.id);
        message.channel.send("<:tick:748569437589995731> Ticket System Setup feito!");
    }
}