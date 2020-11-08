const Discord = require("discord.js")
const DIG = require("discord-image-generation");

module.exports = {
    name: "spank",
    aliases: ["Spank", "SPANK", " spank", " Spank", " SPANK"],
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
		const user = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let avatar1 = message.mentions.users.first()
        if(!avatar1) return message.channel.send("<:X:748632517476745226> Especifica o usuário para a Imagem!")
      	let image = await new DIG.Spank().getImage(user, avatar1.displayAvatarURL({ dynamic: false, format: 'png' }));
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
}