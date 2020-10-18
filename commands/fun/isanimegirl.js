const Discord = require("discord.js")

module.exports = {
    name: "isanimegirl",
    aliases: ["Isanimegirl", "ISANIMEGIRL", " isanimegirl", " Isanimegirl", " ISANIMEGIRL"],
    run: async (client, message, args) => {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const animegirl = Math.random() * 100;
        const animegirlIndex = Math.floor(animegirl / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Anime Machine 2020`)
            .setDescription(`${member.user.username} é ${Math.floor(animegirl)}% uma anime girl. 💁`)
        message.channel.send(embed);
    }
}