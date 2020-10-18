const Discord = require("discord.js")
const requests = require("../../modules/requests")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
    name: "wiki",
    aliases: ["Wiki", "WIKI", " wiki", " Wiki", " WIKI"],
    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = config.prefix;
        if(message.channel.nsfw) {
            var requestLang = "pt"
			if (!args[0]) {
				message.react(':X:748632517476745226').catch(e => Logger.error(e))
				message.channel.send({
					embed: {
						color: "RANDOM",
						description: 'Está a faltar alguma coisa para o comando funcionar!\n' +
						'Como usar o comando:\n\n' +
						'``' + prefix + this.name + ' [tópico] | Example ' + prefix + this.name + 'Benfica``',
                	},
				})
        	} else {
				let searchValue = args.join(" ")
				requests.getWikipediaShortSummary(message, searchValue, requestLang).catch(e => Logger.error(e))
			}
        } else {
            message.channel.send(`<:X:748632517476745226> Este comando só pode ser usado em canais de NSFW!`)
        }
    }
}