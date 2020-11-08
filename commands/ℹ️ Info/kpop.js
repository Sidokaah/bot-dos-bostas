const Discord = require("discord.js")
const { Random } = require("something-random-on-discord")
const random = new Random();

module.exports = {
    name: "kpop",
    aliases: ["Kpop", "KPOP", " kpop", " Kpop", " KPOP"],
    description: "Manda um cantor de Kpop aleatório",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        let data = await random.getKpop()
        message.channel.send(data)
    }
}