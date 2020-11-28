const Discord = require("discord.js")

module.exports = {
    name: "softban",
    aliases: ["Softban", "SOFTBAN", " softban", " Softban", " SOFTBAN"],
    usage: ["[@alguém]"],
    description: "Dá softban a alguém do server",
    clientPermissions: ["SEND_MESSAGES", "BAN_MEMBERS"],
    userPermissions: ["BAN_MEMBERS"],
    run: async (client, message, args) => {
        var user = message.mentions.users.first();
        if (!user) return message.reply("<:X:748632517476745226> Por favor menciona alguém para softbanir!");
        var member;
        try {
            member = await message.guild.members.fetch(user);
        } catch (err) {
            member = null;
        }
        if(member.id == message.guild.ownerID) return message.reply(`<:X:748632517476745226> Não podes softbanir o Owner do server!`);
        if(message.author.id == member.id) return message.reply(`<:X:748632517476745226> Não te podes softbanir a ti próprio!`);
		if(!member.bannable) return message.channel.send(`Não tenho permissão para softbanir ${member.user.tag} pois ele está acima de mim em termos de Roles!`);
        if(member.roles.highest.comparePositionTo >= message.member.roles.highest.comparePositionTo && message.member.id !== message.guild.ownerID) return message.channel.send(`Não podes softbanir ${member.user.tag} porque o seu maior role é igual ao teu, ou maior.`);
        var reason = args.splice(1).join(' ');
        await member.ban(user);
        await message.guild.members.unban(user.id, reason)
        let channel = client.db.get(`logs_${message.guild.id}`)
        let cases = client.db.get(`case_${message.guild.id}`)
        if(channel === null) {
            client.db.add(`case_${message.guild.id}`, 1)
           	member.send(`**Foste softbanido no server: ${message.guild.name}**\n**Razão: ${reason ? reason : "Nenhuma razão especificada"}**`)
            const suc = new Discord.MessageEmbed()
              	.setAuthor(`${member.user.tag} foi softbanido!`, member.user.displayAvatarURL())
              	.setDescription(`**Razão:** ${reason ? reason : "Nenhuma razão especificada"}`)
              	.setColor("RANDOM")
            await message.channel.send(suc)
        } else if(channel !== null) {
            client.db.add(`case_${message.guild.id}`, 1)
            member.send(`**Foste softbanido no server: ${message.guild.name}**\n**Razão: ${reason ? reason : "Nenhuma razão especificada"}**`)
            message.channel.send(`<:tick:748569437589995731> Feito, vê **Caso #${cases}!**`)
            const suc = new Discord.MessageEmbed()
                .setAuthor(`Usuário Softbanido | Caso #${cases}`, client.user.displayAvatarURL())
                .setDescription(`**❯ Membro:** ${member.user.tag} [${member.user}]\n**❯ Moderador:** ${message.author.tag} [${message.author}]\n**❯ Razão:** ${reason ? reason : "Nenhuma razão especificada"}`)
              	.setColor("#0011ff")
                .setThumbnail(member.user.displayAvatarURL())
                .setFooter(`ID: ${member.user.id}`)
                .setTimestamp()
            await client.channels.cache.get(channel).send(suc)
        }
    }
}