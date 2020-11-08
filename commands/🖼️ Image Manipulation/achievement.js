const Discord = require("discord.js")
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const { shortenText } = require('../../util/Canvas');
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Minecraftia.ttf'), { family: 'Minecraftia' });

module.exports = {
    name: "achievement",
    usage: ["[algum texto]"],
    description: "Responde com uma imagem de uma proeza do minecraft com o texto que quiseres",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        if(!message.guild.me.hasPermission("ATTACH_FILES")) return message.channel.send("<:X:748632517476745226> Não tenho permissões para mandar ficheiros como imagens neste server!")
		try {
            if(!args.join(" ")) return message.channel.send("<:X:748632517476745226> Por favor especifica texto para pôr na imagem!")
            const text = args.join(" ")
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'achievement.png'));
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(base, 0, 0);
			ctx.font = '17px Minecraftia';
			ctx.fillStyle = '#ffff00';
			ctx.fillText('Achievement Get!', 60, 40);
			ctx.fillStyle = '#ffffff';
			ctx.fillText(shortenText(ctx, text, 230), 60, 60);
		return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'achievement.png' }] });
		} catch (err) {
			return message.reply(`Ocorreu um erro ao executar o comando: \`${err.message}\`. Tenta de novo mais tarde!`);
		}
    },
}