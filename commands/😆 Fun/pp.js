const Discord = require("discord.js")

module.exports = {
    name: "pp",
    aliases: ["Pp", "PP", " pp", " Pp", " PP"],
    usage: ["[@alguém]"],
    description: "Responde com o tamanho do pp de alguém",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const love = Math.random() * 15;
        const loveIndex = Math.floor(love / 1);
        const loveLevel = "=".repeat(loveIndex)
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`PP Size`)
            .setDescription(`${member.user.username}\'s pp size:` + `\n8${loveLevel}D`);
        message.channel.send(embed);
    }
}