const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
    name: "shop",
    aliases: [],
    description: "Vê a lista de itens qu estão na loja",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
      let prefix = db.get(`prefix_${message.guild.id}`)
      if(prefix === null) prefix = config.prefix;
      let embed = new Discord.MessageEmbed()
        .setAuthor("Loja", message.author.displayAvatarURL())
        .setDescription(`Nikes: **4000** [${prefix}buy nikes]\nCarro: **100000** [${prefix}buy carro]\nMansão: **1750000** [${prefix}buy mansão]\nPC Gamer: **35000** [${prefix}buy pcgamer]\nAWP Dragon Lore: **40000** [${prefix}buy dragonlore]\nUnusual Team Captain: **80000** [${prefix}buy teamcaptain]`)
        .setColor("RANDOM")
      message.channel.send(embed)
    }
}