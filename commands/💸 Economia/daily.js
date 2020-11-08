const Discord = require("discord.js")
const db = require("quick.db")
const ms1 = require("parse-ms")

module.exports = {
    name: "daily",
    aliases: [],
    description: "Reclama a tua recompensa diária",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
      let user = message.author;
      let timeout = 86400000;
      let amount = 300;
      let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);
      if (daily !== null && timeout - (Date.now() - daily) > 0) {
          let time = ms1(timeout - (Date.now() - daily));
          let timeEmbed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setDescription(`<:X:748632517476745226> Já coletaste a tua recompensa diária!\nReclama-a de novo daqui a ${time.hours}h ${time.minutes}m ${time.seconds}s !`);
          message.channel.send(timeEmbed)
      } else {
          let moneyEmbed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setDescription(`<:tick:748569437589995731> Coletaste a tua recompensa diária de ${amount} moedas!`);
          message.channel.send(moneyEmbed)
          db.add(`money_${message.guild.id}_${user.id}`, amount)
          db.set(`daily_${message.guild.id}_${user.id}`, Date.now())
      }
    }
}