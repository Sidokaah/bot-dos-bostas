const Discord = require("discord.js")
const DIG = require("discord-image-generation");

module.exports = {
    name: "pressf",
    aliases: ["Pressf", "PRESSF", " pressf", " Pressf", " PRESSF"],
    usage: ["[@alguém]"],
    description: "Responde com o meme de `Press F to Pay Respects` com a tua imagem ou a de alguém",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await new DIG.Rip().getImage(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
}