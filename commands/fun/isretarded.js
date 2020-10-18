const Discord = require("discord.js")

module.exports = {
    name: "isretarded",
    aliases: ["Isretarded", "ISRETARDED", " isretarded", " Isretarded", " ISRETARDED"],
    run: async (client, message, args) => {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const retard = Math.random() * 100;
        const retardIndex = Math.floor(retard / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Retards Machine 2020`)
            .setDescription(`${member.user.username} é ${Math.floor(retard)}% retardado lmao.`)
        message.channel.send(embed);
    }
}