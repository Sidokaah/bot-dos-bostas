const db = require("quick.db")

module.exports = {
    name: "disablegoodbye",
    aliases: ["disable-goodbye"],
    run: async (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("<:X:748632517476745226> Tens de ter perms de Administrador para usar este comando!")
        }
        db.delete(`leavchannel_${message.guild.id}`)
        message.channel.send(`<:tick:748569437589995731> Leave Channel foi deletado!`)
    }
}