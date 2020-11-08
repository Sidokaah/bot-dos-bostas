const Discord = require("discord.js")

module.exports = {
    name: "isgamer",
    aliases: ["Isgamer", "ISGAMER", " isgamer", " Isgamer", " ISGAMER"],
    usage: ["[@alguém]"],
    description: "Percentagem se alguém é um gamer",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const gamer = Math.random() * 100;
        const gamerIndex = Math.floor(gamer / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`⌨️ Gamer Machine 2020 🖱️`)
            .setDescription(`${member.user.username} é ${Math.floor(gamer)}% gamer. **Épico**!`)
        message.channel.send(embed);
    }
}