const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "lyrics",
    aliases: ["LYRICS", "Lyrics", " lyrics", " Lyrics", " LYRICS"],
    description: "Procura a letra de uma música à tua escolha ou a música que está a tocar",
    usage: ["[nada (música que está a tocar) | nome da música]"],
    cooldown: "5",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message.guild.id);
		var msg = await message.channel.send(`A procurar. . .`)
		if (args.join(" ")) {
			var res = await fetch(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(args.join(" "))}`)
			var lyrics = await res.json()
			if (lyrics.error) return message.channel.send('<:X:748632517476745226> Não está nada a tocar!')
		if (lyrics.lyrics.length >= 2048) {
			    var cut = lyrics.lyrics.length - 2000
			    lyrics.lyrics = lyrics.lyrics.slice(0,0 - cut) + "..."
			}
			var lyricembed = new Discord.MessageEmbed()
			    .setTitle("Letra de " + lyrics.title)
                .setDescription(lyrics.lyrics)
                .setColor("RANDOM")
			message.channel.send(lyricembed) 
	    } else {
            if (!queue) return message.channel.send(`<:X:748632517476745226> Não está nada a tocar!`)
		    var res = await fetch(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(queue.songs[0].name)}`)
		    var lyrics = await res.json()
		    if (lyrics.error) return message.reply('não consegui encontrar a música que estava a tocar.')
		    if (lyrics.lyrics.length >= 2048) {
			    var cut = lyrics.lyrics.length - 2000
			    lyrics.lyrics = lyrics.lyrics.slice(0,-cut) + "..."
            }
		    var lyricembed = new Discord.MessageEmbed()
		        .setTitle("Letra de " + lyrics.title)
                .setDescription(lyrics.lyrics)
                .setColor("RANDOM")
		    message.channel.send(lyricembed)
        }
    }
}