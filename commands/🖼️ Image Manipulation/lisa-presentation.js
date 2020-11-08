const Discord = require("discord.js")
const DIG = require("discord-image-generation");

module.exports = {
    name: "lisa-presentation",
    aliases: ["Lisa-presentation", "LISA-PRESENTATION", " lisa-presentation", " Lisa-presentation", " LISA-PRESENTATION"],
    usage: ["[@alguém]"],
    description: "Responde com o meme de `Lisa Presentation` com o texto que quiseres",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const avatar = args.join(" ")
        if(!avatar) return message.channel.send("<:X:748632517476745226> Especifica texto para usar na Imagem!")
        let image = await new DIG.LisaPresentation().getImage(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
}