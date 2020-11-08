const db = require("quick.db")

module.exports = {
    name: "disablewelcome",
    aliases: ["disable-welcome"],
    description: "Desativa a mensagem de boas-vindas",
    clientPermissions: ["SEND_MESSAGES"],
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
        db.delete(`welchannel_${message.guild.id}`)
        message.channel.send(`<:tick:748569437589995731> Welcome Channel foi deletado!`)
    }
}