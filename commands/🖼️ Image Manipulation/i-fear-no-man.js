const Discord = require("discord.js")
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const path = require('path');
const { centerImagePart } = require('../../util/Canvas');

module.exports = {
    name: "i-fear-no-man",
    usage: ["[@alguém]"],
    description: "Responde com a imagem do meme de TF2 (melhor jogo) `I Fear No Man...`com a tua ou a imagem de alguém",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
		try {
            let userArray = message.content.split(" ");
        	let userArgs = userArray.slice(1);
        	let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
            const image = member.user.displayAvatarURL({ format: 'png', size: 512 })
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'i-fear-no-man.png'));
			const { body } = await request.get(image);
			const data = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(base, 0, 0);
			const { x, y, width, height } = centerImagePart(data, 169, 169, 167, 330);
			ctx.drawImage(data, x, y, width, height);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'i-fear-no-man.png' }] });
			return message.reply(`Ocorreu um erro ao executar o comando: \`${err.message}\`. Tenta de novo mais tarde!`);
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
    },
}