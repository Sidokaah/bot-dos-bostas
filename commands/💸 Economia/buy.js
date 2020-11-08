const Discord = require("discord.js")
const db = require("quick.db")
const ms1 = require("parse-ms")

module.exports = {
    name: "buy",
    aliases: [],
    usage: ["[alguma coisa]"],
    description: "Compra alguma coisa da loja",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
      let user = message.author;
      let author = db.fetch(`money_${message.guild.id}_${user.id}`)
      if(args[0] == 'nikes') {
        let Embed2 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:X:748632517476745226> Precisas de 4000 moedas para comprar sapatos da Nike!`);
        if (author < 4000) return message.channel.send(Embed2)
        db.fetch(`nikes_${message.guild.id}_${user.id}`)
        db.add(`nikes_${message.guild.id}_${user.id}`, 1)
        let Embed3 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:tick:748569437589995731> Compraste sapatos da Nike por 4000 moedas!`);
        db.subtract(`money_${message.guild.id}_${user.id}`, 4000)
        message.channel.send(Embed3)
      } else if(args[0] == 'car') {
        let Embed2 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:X:748632517476745226> Precisas de 100000 moedas para comprar um carro!`);
        if (author < 100000) return message.channel.send(Embed2)
        db.fetch(`car_${message.guild.id}_${user.id}`)
        db.add(`car_${message.guild.id}_${user.id}`, 1)
        let Embed3 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:tick:748569437589995731> Compraste um carro por 100000 moedas!`);
        db.subtract(`money_${message.guild.id}_${user.id}`, 100000)
        message.channel.send(Embed3)
      } else if(args[0] == 'mansion') {
        let Embed2 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:X:748632517476745226> Precisas de 1750000 moedas para comprares uma mansão!`);
        if (author < 1750000) return message.channel.send(Embed2)
        db.fetch(`house_${message.guild.id}_${user.id}`)
        db.add(`house_${message.guild.id}_${user.id}`, 1)
        let Embed3 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`<:tick:748569437589995731> Compraste uma mansão por 1750000 moedas!`);
        db.subtract(`money_${message.guild.id}_${user.id}`, 1750000)
        message.channel.send(Embed3)
      } else if(args[0] == 'dragonlore') {
          let Embed2 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`<:X:748632517476745226> Precisas de 40000 moedas para comprares uma AWP Dragon Lore!`);
          if (author < 40000) return message.channel.send(Embed2)
          db.fetch(`dragon_${message.guild.id}_${user.id}`)
          db.add(`dragon_${message.guild.id}_${user.id}`, 1)
          let Embed3 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`<:tick:748569437589995731> Compraste uma AWP Dragon Lore por 40000 moedas!`);
          db.subtract(`money_${message.guild.id}_${user.id}`, 40000)
          message.channel.send(Embed3)
      } else if(args[0] == 'teamcaptain') {
          let Embed2 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`<:X:748632517476745226> Precisas de 75000 moedas para comprares um Unusual Burning Flames Team Captain!`);
          if (author < 75000) return message.channel.send(Embed2)
          db.fetch(`team_${message.guild.id}_${user.id}`)
          db.add(`team_${message.guild.id}_${user.id}`, 1)
          let Embed3 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`<:tick:748569437589995731> Compraste um Unusual Burning Flames Team Captain por 75000 moedas!`);
          db.subtract(`money_${message.guild.id}_${user.id}`, 75000)
          message.channel.send(Embed3)
      } else if(args[0] == 'pcgamer') {
          let Embed2 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`<:X:748632517476745226> Precisas de 32500 moedas para comprares uma PC Gamer!`);
          if (author < 32500) return message.channel.send(Embed2)
          db.fetch(`pc_${message.guild.id}_${user.id}`)
          db.add(`pc_${message.guild.id}_${user.id}`, 1)
          let Embed3 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`<:tick:748569437589995731> Compraste um PC Gamer por 32500 moedas!`);
          db.subtract(`money_${message.guild.id}_${user.id}`, 32500)
          message.channel.send(Embed3)
      } else {
        message.channel.send("<:X:748632517476745226> Especifica um item da loja para comprar!")
      }
    }
}