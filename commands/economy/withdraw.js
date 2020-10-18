const Discord = require("discord.js")
const db = require("quick.db")
const ms1 = require("parse-ms")

module.exports = {
    name: "withdraw",
    aliases: [],
    run: async (client, message, args) => {
      let user = message.author;
      let member = db.fetch(`money_${message.guild.id}_${user.id}`)
      let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)
      if (args[0] == 'all') {
        let money = await db.fetch(`bank_${message.guild.id}_${user.id}`)
        db.subtract(`bank_${message.guild.id}_${user.id}`, money)
        db.add(`money_${message.guild.id}_${user.id}`, money)
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
        if (message.content.includes('-')) { 
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
        db.subtract(`bank_${message.guild.id}_${user.id}`, args[0])
        db.add(`money_${message.guild.id}_${user.id}`, args[0])
      }
    }
}