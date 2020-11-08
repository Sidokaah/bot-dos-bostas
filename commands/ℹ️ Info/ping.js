module.exports = {
    name: "ping",
    aliases: ["Ping", "PING", " ping", " Ping", " PING"],
    cooldown: "4",
    description: "Responde com o ping do Bot",
    clientPermissions: ["SEND_MESSAGES"],
    userPermissions: [],
    run: async (client, message, args) => {
        message.channel.send('A calcular o ping <a:loading2:751573442037284924>').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            resultMessage.edit("Pong! `" + `${ping}ms` + "`")
        })
    }
}