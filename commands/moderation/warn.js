const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "warn",
    aliases: [],
    run: async (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("<:X:748632517476745226> Tens de ter perms de Administrador para usar este comando!")
          }
          const user = message.mentions.members.first()
          if(!user) {
            return message.channel.send("<:X:748632517476745226> Por favor menciona a pessoa que queres avisar!")
          }
          if(message.mentions.users.first().bot) {
            return message.channel.send("<:X:748632517476745226> Não podes avisar bots!")
          }
          if(message.author.id === user.id) {
            return message.channel.send("<:X:748632517476745226> Não te podes avisar a ti mesmo!")
          }
          if(user.id === message.guild.owner.id) {
            return message.channel.send("<:X:748632517476745226> Não podes avisar o server owner!")
          }
          const reason = args.slice(1).join(" ")
          if(!reason) {
            return message.channel.send("<:X:748632517476745226> Por favor especifica a razão para avisares essa pessoa!")
          }
          let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
          if(warnings === 3) {
            return message.channel.send(`${message.mentions.users.first().username} já chegou ao seu limite de 3 avisos!`)
          }
          if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(`**Foste avisado no server: ${message.guild.name}**\n**Razão: ${reason}**`)
            const suc = new Discord.MessageEmbed()
              .setDescription(`**<:tick:748569437589995731> Usuário avisado com sucesso!**`)
              .setColor("RANDOM")
            await message.channel.send(suc)
          } else if(warnings !== null) {
              db.add(`warnings_${message.guild.id}_${user.id}`, 1)
             user.send(`**Foste avisado no server: ${message.guild.name}**\n**Razão: ${reason}**`)
            const suc = new Discord.MessageEmbed()
              .setDescription(`**<:tick:748569437589995731> Usuário avisado com sucesso!**`)
              .setColor("RANDOM")
            await message.channel.send(suc)
        }
    }
}