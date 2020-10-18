const Discord = require("discord.js")

module.exports = {
    name: "isdank",
    aliases: ["Isdank", "ISDANK", " isdank", " Isdank", " ISDANK"],
    run: async (client, message, args) => {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const dank = Math.random() * 100;
        const dankIndex = Math.floor(dank / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Dank Memer Machine 2020`)
            .setDescription(`${member.user.username} é ${Math.floor(dank)}% um dank memer xD.`)
        message.channel.send(embed);
    }
}