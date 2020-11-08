const Discord = require("discord.js")
const requests = require("../../modules/requests")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
    name: "wiki",
    aliases: ["Wiki", "WIKI", " wiki", " Wiki", " WIKI"],
    usage: ["[termo]"],
    description: "Procura alguma coisa na wikipédia (wikipedia.org)",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    nsfw: true,
    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = config.prefix;
		let requestLang = 'pt';
		if (!args[0]) {
			message.react(':X:748632517476745226').catch(e => Logger.error(e))
			message.channel.send({
				embed: {
					color: "RANDOM",
					description: 'O comando foi mal executado!\n' +
						'Por favor usa-o desta forma:\n\n' +
						'``' + prefix + "wiki" + ' [qualquer coisa] | Exemplo: ' + prefix + 'wiki Benfica``',
				},
			})
		}
		else {
			let searchValue = args.join(" ")
			requests.getWikipediaShortSummary(message, searchValue, requestLang).catch(e => console.log(e))
		}
    }
}