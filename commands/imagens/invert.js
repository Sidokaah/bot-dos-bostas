const Discord = require("discord.js")
const canva = require("canvacord");

module.exports = {
    name: "invert",
    aliases: ["Inverse", "INVERSE", " inverse", " Inverse", " INVERSE"],
    run: async (client, message, args) => {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let image = await canva.invert(user.displayAvatarURL({ dynamic: false, format: 'png' }));
        let attachment = new Discord.MessageAttachment(image, "deleted.png");
        return message.channel.send(attachment);
    }
}