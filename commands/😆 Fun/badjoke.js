const { Random } = require("something-random-on-discord")
const random = new Random();

module.exports = {
    name: "badjoke",
    aliases: ["Badjoke", "BadJoke", "BADJOKE", " badjoke", " Badjoke", " BadJoke", " BADJOKE"],
    cooldown: "3.5",
    description: "Responde com uma piada aleatória",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        let data = await random.getJoke()
        message.channel.send(data)
    }
}