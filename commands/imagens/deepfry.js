const Discord = require("discord.js")
const canva = require("canvacord");

module.exports = {
    name: "deepfry",
    aliases: ["Deepfry", "DEEPFRY", " deepfry", " Deepfry", " DEEPFRY"],
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.deepfry(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
}