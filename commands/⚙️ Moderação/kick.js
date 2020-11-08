const Discord = require("discord.js")

module.exports = {
    name: "kick",
    aliases: ["Kick", "KICK", " kick", " Kick", " KICK"],
    description: "Dá kick a alguém do server",
    usage: ["[@alguém]"],
    clientPermissions: ["SEND_MESSAGES", "KICK_MEMBERS"],
    userPermissions: ["KICK_MEMBERS"],
    run: async (client, message, args) => {
        var user = message.mentions.users.first();
        if (!user) return message.reply("<:X:748632517476745226> Por favor menciona alguém para kickar!");
        var member;
        try {
            member = await message.guild.members.fetch(user);
        } catch (err) {
            member = null;
        }
        if(member.id == message.guild.ownerID) return message.reply(`<:X:748632517476745226> Não podes kickar o Owner do server!`);
        if(message.author.id == member.id) return message.reply(`<:X:748632517476745226> Não te podes kickar a ti próprio!`);
        if(!member.bannable) return message.channel.send(`Não tenho permissão para kickar ${member.user.tag} pois ele está acima de mim em termos de Roles!`);
        if(member.roles.highest.comparePositionTo >= message.member.roles.highest.comparePositionTo && message.member.id !== message.guild.ownerID) return message.channel.send(`<:X:748632517476745226> Não podes kickar ${member.user.tag} porque o seu maior role é igual ao teu, ou maior.`);
        var reason = args.splice(1).join(' ');
        member.kick(user);
        user.send(`Foste kickado por ${message.author} em **${message.guild.name}**\n**Razão**: ${reason ? reason : "Nenhuma razão especificada"}`)
        message.channel.send(`${user} foi kickado por ${message.author}\n**Razão**: ${reason ? reason : "Nenhuma razão especificada"}`)
    }
}