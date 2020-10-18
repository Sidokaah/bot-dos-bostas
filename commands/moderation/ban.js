const Discord = require("discord.js")

module.exports = {
    name: "ban",
    aliases: ["Ban", "BAN", " ban", " Ban", " BAN"],
    run: async (client, message, args) => {
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`<:X:748632517476745226> Não tenho permissões para banir pessoas!`)
        if (!message.member.hasPermission('BAN_MEMBERS', "KICK_MEMBERS")) return message.reply("Não podes usar isso!");
        var user = message.mentions.users.first();
        if (!user) return message.reply("Não mencionaste ninguém ou estás a tentar banir um bot");
        var member;
        try {
            member = await message.guild.members.fetch(user);
        } catch (err) {
            member = null;
        }
        if (member) {
            if (member.hasPermission('KICK_MEMBERS', "BAN_MEMBERS")) return message.reply("Não podes banir essa pessoa!");
        }
        var reason = args.splice(1).join(' ');
        if (!reason) return message.reply('Precisas de dar uma razão.');
        if(message.guild.id === "577155568699965444") {
        	let channel1 = await client.channels.cache.get("746067012341596231");
        	const embed1 = new Discord.MessageEmbed()
            	.setColor("RANDOM")
            	.setAuthor(user.tag, user.displayAvatarURL())
            	.setDescription(`:outbox_tray: ${user} foi banido por ${message.author}.`)
            	.setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            	.addField("Razão", `${reason}`)
            	.setFooter(`ID do usuário: ${user.id}`)
            	.setTimestamp();
        	channel1.send(embed1);
        }
        message.guild.members.ban(user);
        if(message.guild.id === "577155568699965444") return channel.send(`<:tick:748569437589995731> ${user} foi banido por ${message.author}\n**Reason**: ${reason}`)
        else {
            message.channel.send(`<:tick:748569437589995731> ${user} foi banido por ${message.author}\n**Reason**: ${reason}`)
        }
    }
}