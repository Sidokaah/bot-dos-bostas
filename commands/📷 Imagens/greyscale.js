const Discord = require("discord.js")
const DIG = require("discord-image-generation");

module.exports = {
    name: "greyscale",
    aliases: ["Greyscale", "GREYSCALE", " greyscale", " Greyscale", " GREYSCALE"],
    usage: ["[@alguém]"],
    description: "Imagem a preto e branco de alguém (ou a tua)",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await new DIG.Greyscale().getImage(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
}