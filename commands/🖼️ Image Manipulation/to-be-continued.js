const Discord = require("discord.js")
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const path = require('path');
const { drawImageWithTint } = require('../../util/Canvas');

module.exports = {
    name: "to-be-continued",
    usage: ["[@alguém]"],
    description: "Responde com uma imagem do meme `To be Continued` com a tua imagem (ou a de alguém)",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
		try {
            let userArray = message.content.split(" ");
        	let userArgs = userArray.slice(1);
        	let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
            const image = member.user.displayAvatarURL({ format: 'png', size: 512 })
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'to-be-continued.png'));
			const { body } = await request.get(image);
			const data = await loadImage(body);
			const canvas = createCanvas(data.width, data.height);
			const ctx = canvas.getContext('2d');
			drawImageWithTint(ctx, data, '#704214', 0, 0, data.width, data.height);
			const ratio = base.width / base.height;
			const width = canvas.width / 2;
			const height = Math.round(width / ratio);
			ctx.drawImage(base, 0, canvas.height - height, width, height);
			const attachment = canvas.toBuffer();
			if (Buffer.byteLength(attachment) > 8e+6) return message.reply('Resulting image was above 8 MB.');
			return message.channel.send({ files: [{ attachment, name: 'to-be-continued.png' }] });
		} catch (err) {
			return message.reply(`Ocorreu um erro ao executar o comando: \`${err.message}\`. Tenta de novo mais tarde!`);
		}
    },
}