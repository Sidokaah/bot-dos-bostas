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
        user1.send(`Foste desbanido por ${message.author} em **${message.guild.name}**\n**Razão**: ${reason ? reason : "Nenhuma razão especificada"}`)
        message.channel.send(`**${user1.tag}** foi desbanido por ${message.author}\n**Razão**: ${reason ? reason : "Nenhuma razão especificada"}`)
    }
}