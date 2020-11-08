const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "reset-warnings",
    usage: ["[@alguém]"],
    description: "Dá reset aos avisos de alguém do server",
    clientPermissions: ["SEND_MESSAGES"],
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
          const user = message.mentions.members.first()
          if(!user) {
            return message.channel.send("<:X:748632517476745226> Por favor menciona a pessoa que queres resetar os avisos!")
          }
          if(message.mentions.users.first().bot) {
            return message.channel.send("<:X:748632517476745226> Bots não podem ter avisos!")
          }
          if(message.author.id === user.id) {
            return message.channel.send("<:X:748632517476745226> Não podes resetar os teus próprios avisos!")
          }
          let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
          if(warnings === null) {
            return message.channel.send(`${message.mentions.users.first().username} não tem nenhum aviso!`)
          }
          db.delete(`warnings_${message.guild.id}_${user.id}`)
          user.send(`**Todos os teus avisos foram resetados em ${message.guild.name}!**`)
          const suc = new Discord.MessageEmbed()
            .setDescription(`**<:tick:748569437589995731> Avisos do usuário resetados com sucesso!**`)
            .setColor("RANDOM")
        await message.channel.send(suc)
    }
}