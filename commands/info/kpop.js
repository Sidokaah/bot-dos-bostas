const Discord = require("discord.js")
const { Random } = require("something-random-on-discord")
const random = new Random();

module.exports = {
    name: "kpop",
    aliases: ["Kpop", "KPOP", " kpop", " Kpop", " KPOP"],
    run: async (client, message, args) => {
        let data = await random.getKpop()
        message.channel.send(data)
    }
}