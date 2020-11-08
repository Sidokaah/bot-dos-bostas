const Discord = require("discord.js")
const DIG = require("discord-image-generation");

module.exports = {
    name: "confused-stonks",
    aliases: ["Confused-stonks", "CONFUSED-STONKS", " confused-stonks", " Confused-stonks", " CONFUSED-STONKS"],
    usage: ["[@alguém]"],
    description: "Responde com uma imagem de `Confused Stonks` com a tua imagem ou a de alguém",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await new DIG.ConfusedStonk().getImage(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
}