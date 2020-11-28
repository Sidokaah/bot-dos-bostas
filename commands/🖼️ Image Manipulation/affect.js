const Discord = require("discord.js")
const canva = require("canvacord");

module.exports = {
    name: "affect",
    aliases: ["Affect", "AFFECT", " affect", " Affect", " AFFECT"],
    usage: ["[@alguém]"],
    description: "Responde com uma imagem de o tabaco e álcool afetar o bebé com a imagem de alguém do server (ou a tua)",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.affect(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
}