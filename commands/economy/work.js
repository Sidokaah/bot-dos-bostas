const Discord = require("discord.js")
const db = require("quick.db")
const ms1 = require("parse-ms")

module.exports = {
    name: "work",
    aliases: [],
    run: async (client, message, args) => {
      let user = message.author;
      let author = await db.fetch(`work_${message.guild.id}_${user.id}`)
      let timeout = 1800000;
      if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms1(timeout - (Date.now() - author));
        let timeEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`<:X:748632517476745226> Já trabalhaste recentemente\nTenta de novo daqui a ${time.minutes}m ${time.seconds}s!`);
        message.channel.send(timeEmbed)
      } else {
        let replies = ['Programador','Construtor','Empregado de Restaurante','Condutor de Autocarros','Chefe de Cozinha','Mecânico', "Youtuber", "Futebolista", "CS:GO Pro"]
        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 180) + 1;
        let embed1 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`<:tick:748569437589995731> Trabalhaste como **${replies[result]}** e recebeste **${amount} moedas!**`);
        message.channel.send(embed1)
        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`work_${message.guild.id}_${user.id}`, Date.now())
      };
    }
}