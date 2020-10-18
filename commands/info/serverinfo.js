const Discord = require("discord.js")

module.exports = {
    name: "serverinfo",
    aliases: ["Serverinfo", "ServerInfo", "SERVERINFO", " serverinfo", " Serverinfo", " ServerInfo", " SERVERINFO"],
    run: async (client, message, args) => {
        const members = message.guild.members.cache;
        const { guild } = message;
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
            .setThumbnail(guild.iconURL())
            .addField('Criado a', guild.createdAt.toLocaleString())
            .addField('Dono do Server', guild.owner.user.tag, true)
            .addField('Região', guild.region, true)
            .addField('Membros Totais', guild.memberCount, true)
            .addField('Membros Totais Reais', guild.members.cache.filter(member => !member.user.bot).size, true)
            .addField('Bots Totais', guild.members.cache.filter(member => member.user.bot).size, true)
            .addField('Channels Totais', guild.channels.cache.size, true)
            .addField('Chats de Texto', `<:text:757184168244543499> ${guild.channels.cache.filter(ch => ch.type === 'text').size}`, true)
            .addField('Voice Channels', `<:voice:757184156882174031> ${guild.channels.cache.filter(ch => ch.type === 'voice').size}`, true)
            .addField('Boosts', `<:boost:757181670758547456> ${guild.premiumSubscriptionCount}` || `0`, true)
            .addField("Presença", `<:online:757181609643474964>${members.filter(member => member.presence.status === "online").size}\n<:status_idle:757181623652581416> ${members.filter(member => member.presence.status === "idle").size}\n<:dnd:757181634050261092> ${members.filter(member => member.presence.status === "dnd").size}\n<:offline:757181657504546847> ${members.filter(member => member.presence.status === "offline").size}`, true)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
            .setDescription(`**Roles**\n${guild.roles.cache.map(role => role.toString()).join(' ')}`);
        message.channel.send(embed);
    }
}