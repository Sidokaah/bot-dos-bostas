const Discord = require("discord.js")
const ms1 = require("parse-ms")

module.exports = {
    name: "withdraw",
    aliases: [],
    description: "Levanta dinheiro do banco",
    usage: ["[dinheiro]"],
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
      let user = message.author;
      let member = client.db.fetch(`money_${message.guild.id}_${user.id}`)
      let member2 = client.db.fetch(`bank_${message.guild.id}_${user.id}`)
      if (args[0] == 'all') {
        let money = await client.db.fetch(`bank_${message.guild.id}_${user.id}`)
        client.db.subtract(`bank_${message.guild.id}_${user.id}`, money)
        client.db.add(`money_${message.guild.id}_${user.id}`, money)
        let embed5 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:tick:748569437589995731> Levantaste todas as moedas que estavam no banco!`);
        message.channel.send(embed5)
      } else {
        let embed2 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:X:748632517476745226> Especifica uma quantidade de dinheiro para levantar!`);
        if (!args[0]) {
          return message.channel.send(embed2)
        }
        let embed3 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:X:748632517476745226> Não podes levantar dinheiro negativo!`);
        if (args[0].includes('-')) { 
          return message.channel.send(embed3)
        }
        let embed4 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:X:748632517476745226> Não tens todo esse dinheiro no banco!`);
        if (member2 < args[0]) {
          return message.channel.send(embed4)
        }
        let embed5 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:tick:748569437589995731> Levantaste ${args[0]} moedas do teu banco!`);
        message.channel.send(embed5)
        client.db.subtract(`bank_${message.guild.id}_${user.id}`, args[0])
        client.db.add(`money_${message.guild.id}_${user.id}`, args[0])
      }
    }
}