const Discord = require("discord.js")
const canva = require("canvacord");

module.exports = {
    name: "bed",
    aliases: ["Bed", "BED", " bed", " Bed", " BED"],
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
		const user = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let avatar1 = message.mentions.users.first()
        if(!avatar1) return message.channel.send("<:X:748632517476745226> Especifica o usuário para a Imagem!")
      	let image = await canva.bed(user, avatar1.displayAvatarURL({ dynamic: false, format: 'png' }));
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
}