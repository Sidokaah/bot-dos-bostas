const fetch = require("node-fetch")

module.exports = {
    name: "chat",
    aliases: ["Chat", "CHAT", " chat", " Chat", " CHAT"],
    usage: ["[algum texto]"],
    description: "Fala com o Bot",
    clientPermissions: ["SEND_MESSAGES"],
    userPermissions: [],
    run: async (client, message, args) => {
        let mesg = args.join(" ");
        if (!mesg) return message.channel.send("<:X:748632517476745226> Por favor especifica algum texto para falar com o Bot!");
        message.channel.startTyping()
        const response = await fetch(`https://some-random-api.ml/chatbot?message=${encodeURIComponent(mesg)}`)
        const json = await response.json()
        message.channel.send(json.response);
        return message.channel.stopTyping(true)
    }
}