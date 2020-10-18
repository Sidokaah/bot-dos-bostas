const db = require("quick.db")

module.exports = {
    name: "setwelcome",
    aliases: ["set-welcome"],
    run: async (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("<:X:748632517476745226> Tens de ter perms de Administrador para usar este comando!")
        }
        let channel = message.mentions.channels.first()
        if(!channel) {
          return message.channel.send("<:X:748632517476745226> Por favor especifica um canal primeiro!")
        }
        db.set(`welchannel_${message.guild.id}`, channel.id)
        message.channel.send(`<:tick:748569437589995731> Welcome Channel foi guardado como ${channel}!`)
    }
}