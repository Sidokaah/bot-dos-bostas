const Discord = require("discord.js")
const DIG = require("discord-image-generation");

module.exports = {
    name: "not-stonks",
    aliases: ["Not-stonks", "NOT-STONKS", " not-stonks", " Not-stonks", " NOT-STONKS"],
    usage: ["[@alguém]"],
    description: "Responde com uma imagem de `Not Stonks` com a tua imagem ou a de alguém",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await new DIG.NotStonk().getImage(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
}