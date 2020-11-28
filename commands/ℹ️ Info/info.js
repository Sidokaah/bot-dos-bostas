const Discord = require("discord.js")
const moment = require("moment")

module.exports = {
    name: "info",
    aliases: ["Info", "INFO", " info", " Info", " INFO", "sobre", "Sobre", "SOBRE", " sobre", " Sobre", " SOBRE"],
    description: "Responde com informação sobre o Bot",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const usados = client.db.get("comandos_usados")
        const musicas = client.db.get("music_played")
        const embed = new Discord.MessageEmbed()
        	.setColor("RANDOM")
        	.setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setDescription(`**__[Server de Suporte](https://discord.gg/hwbTDEB)__ • __[Invite](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=271969366&scope=bot)__ • Autor: TonaS#9344 • __[Discord.js](https://discord.js.org/#/)__ • __[DisTube](https://distube.js.org/)__ • Ícones por [Icons8](https://icons8.com)**`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .addField("Comandos:", "```\n🎶 de Música\n🤣 de Memes\n🐶 de Animais\n📷 de Imagens\n😆 de Entretenimento\n🔧 de Informação\n⚙️ de Moderação\n💸 de Economia```")
            .addField("Uptime:", "```" + duration + "```")
            .addFields(
                { name: "Users:", value: "```" + `${client.users.cache.size}` + "```", inline: true },
                { name: "Servers:", value: "```" + `${client.guilds.cache.size}` + "```", inline: true },
                { name: "Shards:", value: "```" + `${client.options.shards.length}` + "```", inline: true },
                { name: "Discord.js:", value: "```" + `v12.2.0` + "```", inline: true },
                { name: "Node.js:", value: "```" + process.version + "```", inline: true },
                { name: "DisTube:", value: "```" + `v${client.distube.version}` + "```", inline: true },
                { name: "Comandos Usados:", value: "```" + usados + "```", inline: true },
                { name: "Músicas Tocadas:", value: "```" + musicas + "```", inline: true },
            )
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
		message.channel.send(embed)
    }
}