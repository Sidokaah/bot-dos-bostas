const Discord = require("discord.js")

module.exports = {
    name: "delrole",
    aliases: ["Delrole", "DELROLE", " delrole", " Delrole", " DELROLE"],
    run: async (client, message, args) => {
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`<:X:748632517476745226> Não tenho permissões para gerir Roles!`)
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Não podes usar isso!");
        const targetUser = message.mentions.users.first()
        if (!targetUser) {
            message.react(":X:748632517476745226")
            message.reply('Por favor especifica uma pessoa para tirar um role.')
            return
        }
        args.shift()
        const roleName = args.join(' ')
        const { guild } = message
        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })
        if (!role) {
            message.react(":X:748632517476745226")
            message.reply(`Não há nenhum role com o nome: **${roleName}**`)
            return
        }
        const member = guild.members.cache.get(targetUser.id)
        if (member.roles.cache.get(role.id)) {
            member.roles.remove(role)
            message.reply(`o ${member.user} já não tem o role: **${roleName}**.`)
            let channel1 = await client.channels.cache.get("746067012341596231");
            const embed1 = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setDescription(`O ${message.author} tirou um role a ${member.user}.`)
                .addField("Nome do Role", `${roleName}`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setFooter(`ID do usuário: ${member.user.id}`)
                .setTimestamp();
            channel1.send(embed1);
        } else {
            message.reply(`o ${member.user} não tem o role: **${roleName}**.`)
        }
    }
}