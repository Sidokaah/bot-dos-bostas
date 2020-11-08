const Discord = require("discord.js")
const db = require("quick.db")
const ms1 = require("parse-ms")

module.exports = {
    name: "pay",
    aliases: [],
    usage: ["[@alguém dinheiro]"],
    description: "Dá dinheiro a alguém",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
      let user = message.mentions.members.first();
      let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)
      let embed1 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`<:X:748632517476745226> Menciona alguém para pagar!`);
      if (!user) {
        return message.channel.send(embed1)
      }
      let embed2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`<:X:748632517476745226> Especifica uma quantidade para pagar!`);
      if (!args[1]) {
          return message.channel.send(embed2)
      }
      let embed3 = new Discord.MessageEmbed()
      	.setColor("RANDOM")
      	.setDescription(`<:X:748632517476745226> Não podes pagar dinheiro negativo!`);
      if (args[1].includes('-')) { 
          return message.channel.send(embed3)
      }
      let embed4 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`<:X:748632517476745226> Não tens todo esse dinheiro!`);
      if (member < args[1]) {
          return message.channel.send(embed4)
      }
      let embed5 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`<:tick:748569437589995731> Pagaste a ${user.user.username} ${args[1]} moedas!`);
      message.channel.send(embed5)
      db.add(`money_${message.guild.id}_${user.id}`, args[1])
      db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])
    }
}