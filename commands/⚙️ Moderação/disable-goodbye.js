const db = require("quick.db")

module.exports = {
    name: "disablegoodbye",
    aliases: ["disable-goodbye"],
    description: "Desativa a mensagem de adeus (quando alguém sai do server)",
    clientPermissions: ["SEND_MESSAGES"],
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
        db.delete(`leavchannel_${message.guild.id}`)
        message.channel.send(`<:tick:748569437589995731> Leave Channel foi deletado!`)
    }
}