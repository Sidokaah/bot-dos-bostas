module.exports = {
    name: "setmodlogs",
    aliases: ["set-modlogs"],
    usage: ["[#channel]"],
    description: "Setup das mensagens de mod-logs",
    clientPermissions: ["SEND_MESSAGES"],
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
        let channel = message.mentions.channels.first()
        if(!channel) {
          return message.channel.send("<:X:748632517476745226> Por favor especifica um canal primeiro!")
        }
        client.db.set(`logs_${message.guild.id}`, channel.id)
        message.channel.send(`<:tick:748569437589995731> Logs Channel foi guardado como ${channel}!`)
    }
}