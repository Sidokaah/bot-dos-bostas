const Discord = require("discord.js")
const DIG = require("discord-image-generation");

module.exports = {
    name: "jail",
    aliases: ["Jail", "JAIL", " jail", " Jail", " JAIL"],
    usage: ["[@alguém]"],
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await new DIG.Jail().getImage(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
}