const Discord = require("discord.js")
const ms1 = require("parse-ms")

module.exports = {
    name: "leaderboard",
    aliases: [],
    usage: ["[alguma coisa]"],
    description: "Vê o leaderboard do Server",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
      let prefix = client.db.get(`prefix_${message.guild.id}`)
      if(prefix === null) prefix = client.config.prefix;
      const embed = new Discord.MessageEmbed()
      .setDescription(`**Escolhe uma opção de LeaderBoard**\n\nMoedas: ${prefix}leaderboard moedas\nNikes: ${prefix}leaderboard nikes\nCarro: ${prefix}leaderboard carro\nMansão: ${prefix}leaderboard mansão\nDragon Lore: ${prefix}leaderboard dragonlore\nPC Gamer: ${prefix}leaderboard pcgamer\nUnusual Team Captain: ${prefix}leaderboard teamcaptain`)
      .setColor("RANDOM")
      if(!args[0]) return message.channel.send(embed)
      if (args[0] == 'moedas') {
        let money = client.db.startsWith(`money_${message.guild.id}`, { sort: '.data'})
        let content = "";
        for (let i = 0; i < money.length; i++) {
          let user = client.users.cache.get(money[i].ID.split('_')[2]).username
          content += `${i+1}. ${user} ~ ${money[i].data}\n`
        }
        const embed = new Discord.MessageEmbed()
          .setAuthor(`Pessoas com mais Moedas em ${message.guild.name}`)
          .setDescription(`${content}`)
          .setColor("RANDOM")
        message.channel.send(embed)
      } else if(args[0] == 'nikes') {
        let nike = client.db.startsWith(`nikes_${message.guild.id}`, { sort: '.data'})
        let content = "";
        for (let i = 0; i < nike.length; i++) {
          let user = client.users.cache.get(nike[i].ID.split('_')[2]).username
          content += `${i+1}. ${user} ~ ${nike[i].data}\n`
        }
        const embed = new Discord.MessageEmbed()
          .setAuthor(`Pessoas com mais Nikes em ${message.guild.name}`)
          .setDescription(`${content}`)
          .setColor("RANDOM")
        message.channel.send(embed)
      } else if(args[0] == 'carros') {
        let cars = client.db.startsWith(`car_${message.guild.id}`, { sort: '.data'})
        let content = "";
        for (let i = 0; i < cars.length; i++) {
          let user = client.users.cache.get(cars[i].ID.split('_')[2]).username
          content += `${i+1}. ${user} ~ ${cars[i].data}\n`
        }
        const embed = new Discord.MessageEmbed()
          .setAuthor(`Pessoas com mais Carros em ${message.guild.name}`)
          .setDescription(`${content}`)
          .setColor("RANDOM")
        message.channel.send(embed)
      } else if(args[0] == 'mansão') {
        let mansions = client.db.startsWith(`house_${message.guild.id}`, { sort: '.data'})
        let content = "";
        for (let i = 0; i < mansions.length; i++) {
          let user = client.users.cache.get(mansions[i].ID.split('_')[2]).username
          content += `${i+1}. ${user} ~ ${mansions[i].data}\n`
        }
        const embed = new Discord.MessageEmbed()
          .setAuthor(`Pessoas com mais Mansões em ${message.guild.name}`)
          .setDescription(`${content}`)
          .setColor("RANDOM")
        message.channel.send(embed)
      } else if(args[0] == 'dragonlore') {
          let mansions = client.db.startsWith(`dragon_${message.guild.id}`, { sort: '.data'})
          let content = "";
          for (let i = 0; i < mansions.length; i++) {
              let user = client.users.cache.get(mansions[i].ID.split('_')[2]).username
              content += `${i+1}. ${user} ~ ${mansions[i].data}\n`
          }
          const embed = new Discord.MessageEmbed()
              .setAuthor(`Pessoas com mais AWPs Dragon Lore em ${message.guild.name}`)
              .setDescription(`${content}`)
              .setColor("RANDOM")
          message.channel.send(embed)
      } else if(args[0] == 'pcgamer') {
          let mansions = client.db.startsWith(`pc_${message.guild.id}`, { sort: '.data'})
          let content = "";
          for (let i = 0; i < mansions.length; i++) {
              let user = client.users.cache.get(mansions[i].ID.split('_')[2]).username
              content += `${i+1}. ${user} ~ ${mansions[i].data}\n`
          }
          const embed = new Discord.MessageEmbed()
              .setAuthor(`Pessoas com mais PC Gamers em ${message.guild.name}`)
              .setDescription(`${content}`)
              .setColor("RANDOM")
          message.channel.send(embed)
      } else if(args[0] == 'teamcaptain') {
          let mansions = client.db.startsWith(`team_${message.guild.id}`, { sort: '.data'})
          let content = "";
          for (let i = 0; i < mansions.length; i++) {
              let user = client.users.cache.get(mansions[i].ID.split('_')[2]).username
              content += `${i+1}. ${user} ~ ${mansions[i].data}\n`
          }
          const embed = new Discord.MessageEmbed()
              .setAuthor(`Pessoas com mais Unusuals Burning Flames Team Captain em ${message.guild.name}`)
              .setDescription(`${content}`)
              .setColor("RANDOM")
          message.channel.send(embed)
      }
    }
}