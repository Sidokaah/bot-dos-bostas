const Discord = require("discord.js")

module.exports = {
    name: "sugestão",
    aliases: ["Sugestão", "SUGESTÃO", " sugestão", " Sugestão", " SUGESTÃO"],
    run: async (client, message, args) => {
        const { guild } = message;
        let MSG = args.join(" ")
        if (!MSG) return message.channel.send(`Não especificaste uma mensagem para mandar!`).then(msg => {
            msg.delete({timeout: 7500})
        })
        const _ = new Discord.MessageEmbed()
            .setAuthor(`Nova sugestão feita para ${guild.name}`, guild.iconURL())
            .addField("Sugestão", `> **${MSG}**`)
            .addField("Quem fez a sugestão", `> ${message.author}`)
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter("⬆️ - Concordar | ⬇️ - Discordar")
            .setTimestamp()
        message.channel.send(_).then(msg => {
            msg.react("⬆️")
            msg.react("⬇️")
        })
        message.delete();
    }
}