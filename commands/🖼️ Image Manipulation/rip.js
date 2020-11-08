const Discord = require("discord.js")
const { createCanvas, loadImage, registerFont } = require('canvas');
const request = require('node-superfetch');
const path = require('path');
const { greyscale } = require('../../util/Canvas');
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'CoffinStone.otf'), { family: 'Coffin Stone' });

module.exports = {
    name: "rip",
    usage: ["[@alguém]"],
    description: "Responde com a imagem de alguém (ou a tua) numa lápide",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
		try {
            let userArray = message.content.split(" ");
        	let userArgs = userArray.slice(1);
        	let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
            const image = member.user.displayAvatarURL({ format: 'png', size: 512 })
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'rip.png'));
			const { body } = await request.get(image);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(base, 0, 0);
			ctx.drawImage(avatar, 194, 399, 500, 500);
			greyscale(ctx, 194, 399, 500, 500);
			ctx.textBaseline = 'top';
			ctx.textAlign = 'center';
			ctx.font = '62px Coffin Stone';
			ctx.fillStyle = 'black';
			ctx.fillText(member.user.username, 438, 330, 500);
			ctx.fillStyle = 'white';
			ctx.font = '37px Coffin Stone';
			ctx.fillText('In Loving Memory of', 438, 292);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'rip.png' }] });
		} catch (err) {
			return message.reply(`Ocorreu um erro ao executar o comando: \`${err.message}\`. Tenta de novo mais tarde!`);
		}
    },
}