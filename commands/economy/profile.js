const Discord = require("discord.js")
const db = require("quick.db")
const ms1 = require("parse-ms")

module.exports = {
    name: "profile",
    aliases: [],
    run: async (client, message, args) => {
      let user = message.mentions.members.first() || message.author;
      let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
      if (money === null) money = 0;
      let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
      if (bank === null) bank = 0;
      let shoes = await db.fetch(`nikes_${message.guild.id}_${user.id}`)
      if(shoes === null) shoes = '0'
      let newcar = await db.fetch(`car_${message.guild.id}_${user.id}`)
      if(newcar === null) newcar = '0'
      let newhouse = await db.fetch(`house_${message.guild.id}_${user.id}`)
      if(newhouse === null) newhouse = '0'
      let team = await db.fetch(`team_${message.guild.id}_${user.id}`)
      if(team === null) team = '0'
      let dragon = await db.fetch(`dragon_${message.guild.id}_${user.id}`)
      if(dragon === null) dragon = '0'
      let pc = await db.fetch(`pc_${message.guild.id}_${user.id}`)
      if(pc === null) pc = '0'
      let moneyEmbed = new Discord.MessageEmbed()
        .setAuthor(`Perfil de ${user.username}`, message.author.displayAvatarURL())
        .setColor("RANDOM")
        .setDescription(`Carteira: **${money}**\nBanco: **${bank}**\n\n**Inventário**\n\nNikes: **${shoes}**\nCarros: **${newcar}**\nMansões: **${newhouse}**\nUnusual Team Captain: **${team}**\nAWP Dragon Lore: **${dragon}**\nPC Gamer: **${pc}**`);
      message.channel.send(moneyEmbed)
    }
}