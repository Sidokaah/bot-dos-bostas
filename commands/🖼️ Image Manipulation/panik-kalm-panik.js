const Discord = require("discord.js")
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const { wrapText } = require('../../util/Canvas');
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-Regular.ttf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-CJK.otf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-Emoji.ttf'), { family: 'Noto' });
const db = require("quick.db")
const config = require("../../config.json")

module.exports = {
    name: "panik-kalm-panik",
    usage: ["[panik | kalm | panik]"],
    description: "Responde com a imagem com o texto que quiseres do meme `Panik Kalm Panik`",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = config.prefix;
		try {
            let splitarg = args.join(" ").split(" | ")
        	let panik = splitarg[0]
        	let kalm = splitarg[1]
            let panik2 = splitarg[2]
            if(!panik) return message.channel.send("Como usar o comando: `" + prefix + `panik-kalm-panik | <panik> | <kalm> | <panik>` + "`")
            if(!kalm) return message.channel.send("Especifica texto para a parte do Kalm!")
            if(!panik2) return message.channel.send("Especifica texto para a segunda parte do Panik!")
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'panik-kalm-panik.png'));
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(base, 0, 0);
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			ctx.font = '40px Noto';
			let fontSize = 40;
			while (ctx.measureText(panik).width > 1136) {
				fontSize--;
				ctx.font = `${fontSize}px Noto`;
			}
			const panikLines = await wrapText(ctx, panik, 284);
			const panikTopMost = 130 - (((fontSize * panikLines.length) / 2) + ((10 * (panikLines.length - 1)) / 2));
			for (let i = 0; i < panikLines.length; i++) {
				const height = panikTopMost + ((fontSize + 10) * i);
				ctx.fillText(panikLines[i], 150, height);
			}
			ctx.font = '40px Noto';
			fontSize = 40;
			while (ctx.measureText(kalm).width > 1136) {
				fontSize--;
				ctx.font = `${fontSize}px Noto`;
			}
			const kalmLines = await wrapText(ctx, kalm, 284);
			const kalmTopMost = 430 - (((fontSize * kalmLines.length) / 2) + ((10 * (kalmLines.length - 1)) / 2));
			for (let i = 0; i < kalmLines.length; i++) {
				const height = kalmTopMost + ((fontSize + 10) * i);
				ctx.fillText(kalmLines[i], 150, height);
			}
			ctx.font = '40px Noto';
			fontSize = 40;
			while (ctx.measureText(panik2).width > 1136) {
				fontSize--;
				ctx.font = `${fontSize}px Noto`;
			}
			const panik2Lines = await wrapText(ctx, panik2, 284);
			const panik2TopMost = 730 - (((fontSize * panik2Lines.length) / 2) + ((10 * (panik2Lines.length - 1)) / 2));
			for (let i = 0; i < panik2Lines.length; i++) {
				const height = panik2TopMost + ((fontSize + 10) * i);
				ctx.fillText(panik2Lines[i], 150, height);
			}
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'panik-kalm-panik.png' }] });
		} catch (err) {
			return message.reply(`Ocorreu um erro ao executar o comando: \`${err.message}\`. Tenta de novo mais tarde!`);
		}
    },
}