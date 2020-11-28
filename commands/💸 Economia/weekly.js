const Discord = require("discord.js")
const ms1 = require("parse-ms")

module.exports = {
    name: "weekly",
    aliases: [],
    description: "Recebe as tuas moedas semanais",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
      let user = message.author;
      let timeout = 604800000;
      let amount = 800;
      let daily = await client.db.fetch(`weekly_${message.guild.id}_${user.id}`);
      if (daily !== null && timeout - (Date.now() - daily) > 0) {
          let time = ms1(timeout - (Date.now() - daily));
          let timeEmbed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setDescription(`<:X:748632517476745226> Já coletaste a tua recompensa semanal!\nReclama-a de novo daqui a ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s !`);
          message.channel.send(timeEmbed)
      } else {
          let moneyEmbed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setDescription(`<:tick:748569437589995731> Coletaste a tua recompensa semanal de ${amount} moedas!`);
          message.channel.send(moneyEmbed)
          client.db.add(`money_${message.guild.id}_${user.id}`, amount)
          client.db.set(`weekly_${message.guild.id}_${user.id}`, Date.now())
      }
    }
}