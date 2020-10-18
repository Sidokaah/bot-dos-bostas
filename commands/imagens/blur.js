const Discord = require("discord.js")
const canva = require("canvacord");

module.exports = {
    name: "blur",
    aliases: ["Blur", "BLUR", " blur", " Blur", " BLUR"],
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.blur(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
}