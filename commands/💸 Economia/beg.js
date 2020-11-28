const Discord = require("discord.js")
const ms1 = require("parse-ms")

module.exports = {
    name: "beg",
    aliases: [],
    description: "Implora por dinheiro",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
      let user = message.author;
      let timeout = 1800000;
      let amount = 25;
      let beg = await client.db.fetch(`beg_${message.guild.id}_${user.id}`);
      if (beg !== null && timeout - (Date.now() - beg) > 0) {
        let time = ms1(timeout - (Date.now() - beg));
        let timeEmbed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:X:748632517476745226> Já imploraste por dinheiro recentemente\n\nImplora de novo daqui a ${time.minutes}m ${time.seconds}s!`);
        message.channel.send(timeEmbed)
      } else {
        let testChance = Math.random() * 100;
        if ((testChance -= 55) < 0) {
        	let moneyEmbed = new Discord.MessageEmbed()
          		.setColor("RANDOM")
          		.setDescription(`<:tick:748569437589995731> Imploraste por dinheiro e ganhaste ${amount} moedas!`);
        	message.channel.send(moneyEmbed)
        	client.db.add(`money_${message.guild.id}_${user.id}`, amount)
        	client.db.set(`beg_${message.guild.id}_${user.id}`, Date.now())
        } else {
            let moneyEmbed = new Discord.MessageEmbed()
          		.setColor("RANDOM")
          		.setDescription(`<:X:748632517476745226> Imploraste por dinheiro mas não ganhaste moedas!`);
        	message.channel.send(moneyEmbed)
        	client.db.set(`beg_${message.guild.id}_${user.id}`, Date.now())
        }
      }
    }
}