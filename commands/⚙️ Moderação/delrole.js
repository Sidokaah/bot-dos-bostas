const Discord = require("discord.js")

module.exports = {
    name: "delrole",
    aliases: ["Delrole", "DELROLE", " delrole", " Delrole", " DELROLE"],
    usage: ["[role]"],
    description: "Tira um role a alguém",
    clientPermissions: ["SEND_MESSAGES", "MANAGE_ROLES"],
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
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
        } else {
            message.reply(`o ${member.user} não tem o role: **${roleName}**.`)
        }
    }
}