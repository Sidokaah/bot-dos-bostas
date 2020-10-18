const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
    name: "setprefix",
    aliases: ["Setprefix", "SETPREFIX", " setprefix", " Setprefix", " SETPREFIX"],
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("não podes usar isso")
        if (!args[0] || args[0] === "help") {
            const helpembed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(`Como usar: \`${prefix}setprefix <prefix que queres>\``)
                .setTimestamp()
                .setColor("RANDOM")
            return message.channel.send(helpembed)
        }
        if(args.join("") === config.prefix) {
            db.delete(`prefix_${message.guild.id}`)
            return await message.channel.send("<:tick:748569437589995731> Prefix foi resetado!")
        }
        db.set(`prefix_${message.guild.id}`, args[0])
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle("Successo!")
            .setDescription(`<:tick:748569437589995731> Mudaste o prefix do server para ➜ ${args[0]}`)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setColor("RANDOM")
        await message.channel.send(embed)
    }
}