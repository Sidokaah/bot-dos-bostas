const Discord = require("discord.js")
const fecth = require("node-superfetch")
const moment = require("moment")

module.exports = {
    name: "npm",
    aliases: ["Npm", "NPM", " npm", " Npm", " NPM"],
    usage: ["[package]"],
    description: "Procura um package de npm (npmjs.com)",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        try {
            const pkg = args.join(" ")
            const { body } = await fecth.get(`https://registry.npmjs.com/${pkg}`);
            if (body.time.unpublished) return message.channel.send('This package no longer exists.');
			const version = body.versions[body['dist-tags'].latest];
			const maintainers = (body.maintainers.map(user => user.name));
			const dependencies = version.dependencies ? (Object.keys(version.dependencies)) : null;
			const embed = new Discord.MessageEmbed()
				.setColor("RANDOM")
				.setAuthor('NPM', 'https://i.imgur.com/ErKf5Y0.png', 'https://www.npmjs.com/')
				.setTitle(body.name)
				.setURL(`https://www.npmjs.com/package/${pkg}`)
				.setDescription(body.description || 'No description.')
				.addField('❯ Versão', body['dist-tags'].latest, true)
				.addField('❯ Licença', body.license || 'None', true)
				.addField('❯ Autor', body.author ? body.author.name : '???', true)
				.addField('❯ Data de Criação', moment.utc(body.time.created).format('MM/DD/YYYY h:mm A'), true)
				.addField('❯ Última Data de Modificação', moment.utc(body.time.modified).format('MM/DD/YYYY h:mm A'), true)
				.addField('❯ Main File', version.main || 'index.js', true)
				.addField('❯ Dependencies', dependencies && dependencies.length ? dependencies.join(', ') : 'None')
				.addField('❯ Maintainers', maintainers.join(', '));
			return message.channel.send(embed);
		} catch (err) {
			return message.reply("Houve um erro a executar o comando: " + "`" + err.message + "`" + `\nTenta de novo mais tarde!`);
		}
    }
}