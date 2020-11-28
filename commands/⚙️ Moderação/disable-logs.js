module.exports = {
    name: "disablemodlogs",
    aliases: ["disable-modlogs"],
    description: "Desativa a mensagens de mod-logs",
    clientPermissions: ["SEND_MESSAGES"],
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
        client.db.delete(`logs_${message.guild.id}`)
        message.channel.send(`<:tick:748569437589995731> Logs Channel foi deletado!`)
    }
}