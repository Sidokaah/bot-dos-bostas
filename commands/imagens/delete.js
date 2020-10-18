const Discord = require("discord.js")
const canva = require("canvacord");

module.exports = {
    name: "delete",
    aliases: ["Delete", "DELETE", " delete", " Delete", " DELETE"],
    run: async (client, message, args) => {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let image = await canva.delete(user.displayAvatarURL({ dynamic: false, format: 'png' }));
        let attachment = new Discord.MessageAttachment(image, "deleted.png");
        return message.channel.send(attachment);
    }
}