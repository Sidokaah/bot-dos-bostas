const Discord = require("discord.js")

module.exports = {
    name: "ban",
    aliases: ["Ban", "BAN", " ban", " Ban", " BAN"],
    usage: ["[@alguém]"],
    description: "Dá ban a alguém do server",
    clientPermissions: ["SEND_MESSAGES", "BAN_MEMBERS"],
    userPermissions: ["BAN_MEMBERS"],
    run: async (client, message, args) => {
        var user = message.mentions.users.first();
        if (!user) return message.reply("<:X:748632517476745226> Por favor menciona alguém para banir!");
        var member;
        try {
            member = await message.guild.members.fetch(user);
        } catch (err) {
            member = null;
        }
        if(member.id == message.guild.ownerID) return message.reply(`<:X:748632517476745226> Não podes banir o Owner do server!`);
        if(message.author.id == member.id) return message.reply(`<:X:748632517476745226> Não te podes banir a ti próprio!`);
		if(!member.bannable) return message.channel.send(`Não tenho permissão para banir ${member.user.tag} pois ele está acima de mim em termos de Roles!`);
        if(member.roles.highest.comparePositionTo >= message.member.roles.highest.comparePositionTo && message.member.id !== message.guild.ownerID) return message.channel.send(`Não podes banir ${member.user.tag} porque o seu maior role é igual ao teu, ou maior.`);
        var reason = args.splice(1).join(' ');
        member.ban(user);
        user.send(`Foste banido por ${message.author} em **${message.guild.name}**\n**Razão**: ${reason ? reason : "Nenhuma razão especificada"}`)
        message.channel.send(`${member.user} foi banido por ${message.author}\n**Razão**: ${reason ? reason : "Nenhuma razão especificada"}`)
    }
}