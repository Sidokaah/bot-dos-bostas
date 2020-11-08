module.exports = {
    name: "flip",
    aliases: ["Flip", "FLIP", " flip", " Flip", " FLIP"],
    description: "Jogas cara ou coroa",
    clientPermissions: ["SEND_MESSAGES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const messages = [`${message.member.user}, deu **Cara**! <:cara:755159085070155936>`, `${message.member.user}, deu **Coroa**! <:coroa:755158379768578169>`]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        message.channel.send(randomMessage)
    }
}