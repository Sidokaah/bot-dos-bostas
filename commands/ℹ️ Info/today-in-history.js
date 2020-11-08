const Discord = require("discord.js")
const fecth = require("node-superfetch")

module.exports = {
    name: "today-in-history",
    aliases: ["Today-in-history", "TODAY-IN-HISTORY", " today-in-history", " Today-in-history", " TODAY-IN-HISTORY"],
    usage: ["[data (ex: 27/8)]"],
    description: "Responde com alguma coisa que aconteceu no dia especificado",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        let splitarg = args.join(" ").split("/")
        let day = splitarg[0]
        let month = splitarg[1]
        const date = month && day ? `/${month}/${day}` : '';
		try {
			const { text } = await fecth.get(`http://history.muffinlabs.com/date${date}`);
			const body = JSON.parse(text);
			const events = body.data.Events;
			const event = events[Math.floor(Math.random() * events.length)];
			const embed = new Discord.MessageEmbed()
				.setColor(0x9797FF)
				.setURL(body.url)
				.setTitle(`Neste dia (${body.date})...`)
				.setTimestamp()
				.setDescription(`${event.year}: ${event.text}`)
				.addField('Vê mais:', event.links.map(link => (link.title, link.link)).join('\n'));
			return message.channel.send(embed);
		} catch (err) {
			if (err.status === 404 || err.status === 500) return msg.say('Invalid date.');
			return message.reply(`Ocorreu um erro ao executar o comando! Tenta de novo mais tarde!`);
		}
    }
}