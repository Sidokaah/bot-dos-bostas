const Discord = require("discord.js")

module.exports = {
    name: "poll",
    aliases: ["Poll", "POLL", ' poll', " Poll", " POLL"],
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR"))
            return message.channel.send(
                `Não tens permissões de Admin, ${message.author.username}!`
            );
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