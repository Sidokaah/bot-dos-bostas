module.exports = {
    name: "ping",
    aliases: ["Ping", "PING", " ping", " Ping", " PING"],
    cooldown: "3",
    run: async (client, message, args) => {
        message.reply('A calcular o ping <a:loading2:751573442037284924>').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            resultMessage.edit("Pong! `" + `${ping}ms` + "`")
        })
    }
}