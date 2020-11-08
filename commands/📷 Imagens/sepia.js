const Discord = require("discord.js")
const DIG = require("discord-image-generation");

module.exports = {
    name: "sepia",
    aliases: ["Sepia", "SEPIA", " sepia", " Sepia", " SEPIA"],
    usage: ["[@alguém]"],
    description: "Imagem a sepia (não me lembro como é em português) de alguém (ou a tua)",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await new DIG.Sepia().getImage(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
}