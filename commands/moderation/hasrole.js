module.exports = {
    name: "hasrole",
    aliases: ["Hasrole", "HASROLE", " hasrole", " Hasrole", " HASROLE"],
    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Não podes usar isso!");
        const targetUser = message.mentions.users.first()
        if (!targetUser) {
            message.react(":X:748632517476745226")
            message.reply('Por favor especifica alguém para ver se tem um role.')
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
            message.reply(`Não há nenhum role com o nome: **"${roleName}"**.`)
            return
        }
        const member = guild.members.cache.get(targetUser.id)
        if (member.roles.cache.get(role.id)) {
            message.reply(`o ${member.user} tem o role: **${roleName}**.`)
        } else {
            message.reply(`o ${member.user} não tem o role: **${roleName}**.`)
        }
    }
}