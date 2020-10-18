const Discord = require("discord.js")
const canva = require("canvacord");

module.exports = {
    name: "wanted",
    aliases: ["Wanted", "WANTED", " wanted", " Wanted", " WANTED"],
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.wanted(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
}