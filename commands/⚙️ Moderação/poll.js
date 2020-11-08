const Discord = require("discord.js")

module.exports = {
    name: "poll",
    aliases: ["Poll", "POLL", ' poll', " Poll", " POLL"],
    description: "Começa uma votação no channel que quiseres",
    usage: ["[#channel alguma coisa]"],
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.slice(1).join(' ');
        let embedPoll = new Discord.MessageEmbed()
            .setTitle('😲 Nova Votação! 😲')
            .setDescription(`O Admin **${message.author.username}** começou uma votação: ` + `**${pollDescription}**`)
            .setColor('YELLOW')
            .setFooter("Reage com um dos emojis abaixo para votar!")
            .setTimestamp();
        pollChannel.send(embedPoll).then(msg2 => {
            msg2.react(':tick:748569437589995731')
        	msg2.react(':X:748632517476745226')
        })
        message.delete();
    }
}