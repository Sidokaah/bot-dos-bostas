const Discord = require("discord.js")

module.exports = {
    name: "giverole",
    aliases: ["GiveRole", "GIVEROLE", " giverole", " GiveRole", " GIVEROLE"],
    run: async (client, message, args) => {
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`<:X:748632517476745226> Não tenho permissões para gerir Roles!`)
        const targetUser = message.mentions.users.first()
        if (!targetUser) {
            message.react(":X:748632517476745226")
            message.reply('Por favor especifica alguém para dar o role.')
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
            message.reply(`Não há nenhum role chamado: **${roleName}**`)
            return
        }
        const member = guild.members.cache.get(targetUser.id)
        member.roles.add(role)
        message.reply(`o ${member.user} agora tem o role: **${roleName}**.`)
        let channel1 = await client.channels.cache.get("746067012341596231");
        const embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setDescription(`O ${message.author} deu um role a ${member.user}.`)
            .addField("Nome do Role", `${roleName}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .setFooter(`ID do usuário: ${member.user.id}`)
            .setTimestamp();
        channel1.send(embed1);
    }
}