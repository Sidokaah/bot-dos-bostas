const Discord = require("discord.js")

module.exports = {
    name: "unban",
    aliases: ["Unban", "UNBAN", " unban", " Unban", " UNBAN"],
    usage: ["[@alguém <razão>]"],
    description: "Dá unban a alguém do server",
    clientPermissions: ["SEND_MESSAGES", "BAN_MEMBERS"],
    userPermissions: ["BAN_MEMBERS"],
    run: async (client, message, args) => {
        const rgx = /^(?:<@!?)?(\d+)>?$/;
        const id = args[0];
    	if (!rgx.test(id)) return message.channel.send('<:X:748632517476745226> Por favor especifica um ID válido!');
        if(message.author.id == id) return message.channel.send(`<:X:748632517476745226> Não te podes unban a ti próprio!`);
    	const bannedUsers = await message.guild.fetchBans();
        const user1 = bannedUsers.get(id).user;
        if(!user1) return message.channel.send("<:X:748632517476745226> Nenhum ID encontrado!");
        var reason = args.splice(1).join(' ');
        await message.guild.members.unban(user1, reason);
        let channel = client.db.get(`logs_${message.guild.id}`)
        let cases = client.db.get(`case_${message.guild.id}`)
        if(channel === null) {
            client.db.add(`case_${message.guild.id}`, 1)
            user1.send(`**Foste desbanido no server: ${message.guild.name}**\n**Razão: ${reason ? reason : "Nenhuma razão especificada"}**`)
            const suc = new Discord.MessageEmbed()
              	.setAuthor(`${user1.user.tag} foi desbanido!`, user1.user.displayAvatarURL())
              	.setDescription(`**Razão:** ${reason ? reason : "Nenhuma razão especificada"}`)
              	.setColor("RANDOM")
            await message.channel.send(suc)
        } else if(channel !== null) {
            client.db.add(`case_${message.guild.id}`, 1)
            user1.send(`**Foste desbanido no server: ${message.guild.name}**\n**Razão: ${reason ? reason : "Nenhuma razão especificada"}**`)
            message.channel.send(`<:tick:748569437589995731> Feito, vê **Caso #${cases}!**`)
            const suc = new Discord.MessageEmbed()
                .setAuthor(`Usuário Desbanido | Caso #${cases}`, client.user.displayAvatarURL())
                .setDescription(`**❯ Membro:** ${user1.user.tag} [${user1.user}]\n**❯ Moderador:** ${message.author.tag} [${message.author}]\n**❯ Razão:** ${reason ? reason : "Nenhuma razão especificada"}`)
              	.setColor("#318f3d")
                .setThumbnail(user1.user.displayAvatarURL())
                .setFooter(`ID: ${user1.user.id}`)
                .setTimestamp()
          	await client.channels.cache.get(channel).send(suc)
        }
    }
}