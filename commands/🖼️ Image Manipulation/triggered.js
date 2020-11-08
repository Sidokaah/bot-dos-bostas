const Discord = require("discord.js")
const { createCanvas, loadImage } = require('canvas');
const GIFEncoder = require('gifencoder');
const request = require('node-superfetch');
const path = require('path');
const { streamToArray } = require('../../util/Util');
const { drawImageWithTint } = require('../../util/Canvas');
const coord1 = [-25, -33, -42, -14];
const coord2 = [-25, -13, -34, -10];

module.exports = {
    name: "triggered",
    usage: ["[@alguém]"],
    description: "Responde com um gif de alguém (ou tu) triggered",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
		try {
            let userArray = message.content.split(" ");
        	let userArgs = userArray.slice(1);
        	let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
            const image = member.user.displayAvatarURL({ format: 'png', size: 512 })
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'triggered.png'));
			const { body } = await request.get(image);
			const avatar = await loadImage(body);
			const encoder = new GIFEncoder(base.width, base.width);
			const canvas = createCanvas(base.width, base.width);
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, base.width, base.width);
			const stream = encoder.createReadStream();
			encoder.start();
			encoder.setRepeat(0);
			encoder.setDelay(50);
			encoder.setQuality(200);
			for (let i = 0; i < 4; i++) {
				drawImageWithTint(ctx, avatar, 'red', coord1[i], coord2[i], 300, 300);
				ctx.drawImage(base, 0, 218, 256, 38);
				encoder.addFrame(ctx);
			}
			encoder.finish();
			const buffer = await streamToArray(stream);
			return message.channel.send({ files: [{ attachment: Buffer.concat(buffer), name: 'triggered.gif' }] });
		} catch (err) {
			return message.reply(`Ocorreu um erro ao executar o comando: \`${err.message}\`. Tenta de novo mais tarde!`);
		}
    },
}