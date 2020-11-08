const { Random } = require("something-random-on-discord")
const random = new Random();

module.exports = {
    name: "advice",
    aliases: ["Advice", "ADVICE"],
    description: "Responde com um conselho para a vida",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        let data = await random.getAdvice()
        message.channel.send(data)
    }
}