const Discord = require("discord.js")
const db = require("quick.db")
const ms1 = require("parse-ms")

module.exports = {
    name: "sell",
    aliases: [],
    usage: ["[alguma coisa]"],
    description: "Vende alguma coisa",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
      let user = message.author;
      if(args[0] == 'nikes') {
        let Embed2 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:X:748632517476745226> Não tens Nikes para venderes!`);
        let nikeses = await db.fetch(`nikes_${message.guild.id}_${user.id}`)
        if (nikeses < 1) return message.channel.send(Embed2)
        db.fetch(`nikes_${message.guild.id}_${user.id}`)
        db.subtract(`nikes_${message.guild.id}_${user.id}`, 1)
        let Embed3 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:tick:748569437589995731> Vendeste Nikes por 4000 moedas!`);
        db.add(`money_${message.guild.id}_${user.id}`, 4000)
        message.channel.send(Embed3)
      } else if(args[0] == 'carro') {
        let Embed2 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:X:748632517476745226> Não tens nenhum carro para vender!`);
        let cars = await db.fetch(`car_${message.guild.id}_${user.id}`)
        if (cars < 1) return message.channel.send(Embed2)
        db.fetch(`car_${message.guild.id}_${user.id}`)
        db.subtract(`car_${message.guild.id}_${user.id}`, 1)
        let Embed3 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:tick:748569437589995731> Vendeste um carro por 100000 moedas!`);
        db.add(`money_${message.guild.id}_${user.id}`, 100000)
        message.channel.send(Embed3)
      } else if(args[0] == 'mansão') {
        let Embed2 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:X:748632517476745226> Não tens nenhuma mansão para vender!`);
        let houses = await db.fetch(`house_${message.guild.id}_${user.id}`)
        if (houses < 1) return message.channel.send(Embed2)
        db.fetch(`house_${message.guild.id}_${user.id}`)
        db.subtract(`house_${message.guild.id}_${user.id}`, 1)
        let Embed3 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:tick:748569437589995731> Vendeste uma mansão por 1750000 moedas!`);
        db.add(`money_${message.guild.id}_${user.id}`, 1750000)
        message.channel.send(Embed3)
      } else if(args[0] == 'dragonlore') {
          let Embed2 = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setDescription(`<:X:748632517476745226> Não tens nenhuma AWP Dragon Lore para vender!`);
          let houses = await db.fetch(`dragon_${message.guild.id}_${user.id}`)
          if (houses < 1) return message.channel.send(Embed2)
          db.fetch(`dragon_${message.guild.id}_${user.id}`)
          db.subtract(`dragon_${message.guild.id}_${user.id}`, 1)
          let Embed3 = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setDescription(`<:tick:748569437589995731> Vendeste uma AWP Dragon Lore por 40000 moedas!`);
          db.add(`money_${message.guild.id}_${user.id}`, 40000)
          message.channel.send(Embed3)
      } else if(args[0] == 'pcgamer') {
          let Embed2 = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setDescription(`<:X:748632517476745226> Não tens nenhuma mansão para vender!`);
          let houses = await db.fetch(`pc_${message.guild.id}_${user.id}`)
          if (houses < 1) return message.channel.send(Embed2)
          db.fetch(`pc_${message.guild.id}_${user.id}`)
          db.subtract(`pc_${message.guild.id}_${user.id}`, 1)
          let Embed3 = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setDescription(`<:tick:748569437589995731> Vendeste um PC Gamer por 35000 moedas!`);
          db.add(`money_${message.guild.id}_${user.id}`, 35000)
          message.channel.send(Embed3)
      }
      else if(args[0] == 'teamcaptain') {
          let Embed2 = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setDescription(`<:X:748632517476745226> Não tens nenhum Unusual Burning Flames Team Captain para vender!`);
          let houses = await db.fetch(`team_${message.guild.id}_${user.id}`)
          if (houses < 1) return message.channel.send(Embed2)
          db.fetch(`team_${message.guild.id}_${user.id}`)
          db.subtract(`team_${message.guild.id}_${user.id}`, 1)
          let Embed3 = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setDescription(`<:tick:748569437589995731> Vendeste um Unusual Burning Flames Team Captain por 80000 moedas!`);
          db.add(`money_${message.guild.id}_${user.id}`, 80000)
          message.channel.send(Embed3)
      }
    }
}