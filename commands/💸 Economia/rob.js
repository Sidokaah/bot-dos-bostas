const Discord = require("discord.js")
const db = require("quick.db")
const ms1 = require("parse-ms")

module.exports = {
    name: "rob",
    aliases: [],
    description: "Rouba alguém",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
      let user = message.mentions.members.first()
      let moneyEmbed3 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`<:X:748632517476745226> Não mencionaste ninguém para roubar.`);
      if(!user) {
          return message.channel.send(moneyEmbed3)
      }
      let targetuser = await db.fetch(`money_${message.guild.id}_${user.id}`)
      let author = await db.fetch(`rob_${message.guild.id}_${message.author.id}`)
      let author2 = await db.fetch(`money_${message.guild.id}_${message.author.id}`)
      let timeout = 1800000;
      if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms1(timeout - (Date.now() - author));
        let timeEmbed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:X:748632517476745226> Já roubaste alguem recentemente\n\nTenta de novo daqui a ${time.minutes}m ${time.seconds}s!`);
        message.channel.send(timeEmbed)
      } else {
        let moneyEmbed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:X:748632517476745226> A pessoa que estás a roubar precisa de ter pelo menos 350 moedas.`);
        if (targetuser < 350) {
          return message.channel.send(moneyEmbed)
        }
        let moneyEmbed1 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:X:748632517476745226> Precisas de ter pelo menos 350 moedas para roubares uma pessoa!`);
        if (author2 < 350) {
          return message.channel.send(moneyEmbed1)
        }
        let testChance = Math.random() * 100;
        if ((testChance -= 35) < 0) {
        	let vip = await db.fetch(`bronze_${user.id}`)
        	if(vip === true) random = Math.floor(Math.random() * 200) + 1;
        	if (vip === null) random = Math.floor(Math.random() * 400) + 1;
        	let embed = new Discord.MessageEmbed()
          		.setDescription(`<:tick:748569437589995731> Roubaste ${user.user.username} e conseguiste ${random} moedas!`)
          		.setColor("RANDOM")
        	message.channel.send(embed)
        	db.add(`money_${message.guild.id}_${message.author.id}`, random)
        	db.set(`rob_${message.guild.id}_${message.author.id}`, Date.now())
        } else { 
			let vip = await db.fetch(`bronze_${user.id}`)
        	if(vip === true) random = Math.floor(Math.random() * 200) + 1;
        	if (vip === null) random = Math.floor(Math.random() * 400) + 1;
        	let embed = new Discord.MessageEmbed()
          		.setDescription(`<:X:748632517476745226> Falhaste o roubo ao ${user.user.username} por isso perdeste ${random} moedas que foram para ele!`)
          		.setColor("RANDOM")
        	message.channel.send(embed)
        	db.subtract(`money_${message.guild.id}_${message.author.id}`, random)
        	db.add(`money_${message.guild.id}_${user.id}`, random)
        	db.set(`rob_${message.guild.id}_${message.author.id}`, Date.now())
        }
      }
    }
}