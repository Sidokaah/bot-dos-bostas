const Discord = require("discord.js")
const moment = require("moment")

module.exports = {
    name: "sobre",
    aliases: ["Sobre", "SOBRE", " sobre", " Sobre", " SOBRE"],
    run: async (client, message, args) => {
        let totalMembers = 0
        for (const guild of client.guilds.cache) {
            totalMembers += (await guild[1].members.fetch()).size
        }
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setDescription(`**[Server de Suporte](https://discord.gg/hwbTDEB) • [Convida-me](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=271969366&scope=bot) • Autor: TonaS • [Discord.js](https://discord.js.org/#/) • [DisTube](https://distube.js.org/)**`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .addField("Comandos:", "```\n🎶 de Música\n🤣 de Memes\n🐶 de Animais\n📷 de Imagens\n😆 de Entretenimento\n🔧 de Informação\n⚙️ de Moderação\n💸 de Economia```")
        	.addField("Uptime", "```" + duration + "```")
            .addFields(
                { name: "Users:", value: "```" + `${totalMembers}` + "```", inline: true },
                { name: "Servers:", value: "```" + `${client.guilds.cache.size}` + "```", inline: true },
                { name: "Shards:", value: "```" + `${client.options.shards.length}` + "```", inline: true },
                { name: "Discord.js", value: "```" + `v12.2.0` + "```", inline: true },
                { name: "Node.js", value: "```" + process.version + "```", inline: true },
                { name: "DisTube", value: "```" + `v${client. distube.version}` + "```", inline: true }
            )
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed);
    }
}