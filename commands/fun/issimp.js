const Discord = require("discord.js")

module.exports = {
    name: "issimp",
    aliases: ["Issimp", "ISSIMP", " issimp", " Issimp", " ISSIMP"],
    run: async (client, message, args) => {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const simp = Math.random() * 100;
        const simpIndex = Math.floor(simp / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Simp Machine 2020`)
            .setDescription(`${member.user.username} é ${Math.floor(simp)}% simp.`)
        message.channel.send(embed);
    }
}