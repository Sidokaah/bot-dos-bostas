const Discord = require("discord.js")
const canva = require("canvacord");

module.exports = {
    name: "beautiful",
    aliases: ["Beautiful", "BEAUTIFUL", " beautiful", " Beautiful", " BEAUTIFUL"],
    description: "Responde com uma imagem do meme `This, this is beautiful` do Gravity Falls com a imagem de alguém do server (ou a tua)",
    usage: ["[@alguém]"],
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        if(!message.guild.me.hasPermission("ATTACH_FILES")) return message.channel.send("<:X:748632517476745226> Não tenho permissões para mandar ficheiros como imagens neste server!")
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.beautiful(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
}