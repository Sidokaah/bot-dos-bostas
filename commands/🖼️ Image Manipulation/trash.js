const Discord = require("discord.js")
const canva = require("canvacord");

module.exports = {
    name: "trash",
    aliases: ["Trash", "TRASH", " trash", " Trash", " TRASH"],
    usage: ["[@alguém]"],
    description: "Ur trash",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.trash(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
}