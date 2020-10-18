const { Random } = require("something-random-on-discord")
const random = new Random();

module.exports = {
    name: "advice",
    aliases: ["Advice", "ADVICE"],
    run: async (client, message, args) => {
        let data = await random.getAdvice()
        message.channel.send(data)
    }
}