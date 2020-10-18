const Discord = require("discord.js")

module.exports = {
    name: "guilds",
    aliases: ["Guilds"],
    run: async (client, message, args) => {
        if(!message.author.id === "343491235975135243") return message.channel.send("Não podes usar este comando por este ser exclusivo ao Owner do Bot!")
        if(message.author.id === "343491235975135243") {
            const embed = new Discord.MessageEmbed()
                .setTitle("Servers")
                .setDescription(client.guilds.cache.map((guild) => `**${guild.name}** - ${guild.memberCount} membros`).join("\n"))
                .setColor("RANDOM")
            message.channel.send(embed)
        }
    }
}