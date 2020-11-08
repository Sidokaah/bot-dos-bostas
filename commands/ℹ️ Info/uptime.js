const Discord = require("discord.js")
const moment = require("moment")

module.exports = {
    name: "uptime",
    aliases: ["Uptime", "UPTIME", " uptime", " Uptime", " UPTIME"],
    description: "Responde com o tempo que o Bot está online",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const uptime = new Discord.MessageEmbed()
            .setTitle("Uptime")
            .setDescription(duration)
            .setTimestamp()
        	.setColor("RANDOM")
        message.channel.send(uptime)
    }
}