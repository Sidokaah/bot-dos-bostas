const Discord = require("discord.js")

module.exports = {
    name: "pp",
    aliases: ["Pp", "PP", " pp", " Pp", " PP"],
    run: async (client, message, args) => {
        const love = Math.random() * 15;
        const loveIndex = Math.floor(love / 1);
        const loveLevel = "=".repeat(loveIndex)
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`PP Size`)
            .setDescription(`${message.member.user.username}\'s pp size:` + `\n8${loveLevel}D`);
        message.channel.send(embed);
    }
}