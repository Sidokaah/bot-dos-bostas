module.exports = {
    name: "warnings",
    usage: ["[@alguém]"],
    description: "Vês os avisos de alguém do server",
    clientPermissions: ["SEND_MESSAGES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.author
        let warnings = client.db.get(`warnings_${message.guild.id}_${user.id}`)
        if(warnings === null) warnings = 0;
        message.channel.send(`${user} tem **${warnings}** aviso(s).`)
    }
}