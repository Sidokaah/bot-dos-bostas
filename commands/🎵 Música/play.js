const Discord = require("discord.js")

module.exports = {
    name: "play",
    aliases: ["Play", "PLAY", "p", "P", " play", " Play", " PLAY", " p", " P"],
    usage: ["[alguma coisa]"],
    cooldown: "6",
    description: "Toca algum vídeo do Youtube [url/string] ou do SoundCloud",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],
    userPermissions: [],
    run: async (client, message, args) => {
        client.distube.options.searchSongs = false
        if (!message.member.voice.channel) {
            message.react("X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para tocares música!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel || userVoiceChannel && !clientVoiceConnection.channel) {
            if (!args.join(" ")) {
            	message.react(":X:748632517476745226")
            	message.channel.send("<:X:748632517476745226> Diz-me alguma coisa para eu procurar!")
        	} else {
                try {
                    const { voice } = message.member
        	    	const connection = await voice.channel.join()
        	   		await connection.voice.setSelfDeaf(true)
                	client.distube.play(message, args.join(" "))
            	} catch (e) {
                	const embed = new Discord.MessageEmbed()
                    	.setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                    	.setTitle(`<:X:748632517476745226> Ocorreu um erro <:X:748632517476745226>`)
                    	.setDescription("Se erro continua a acontecer, entra no **[Servidor de Suporte](https://discord.gg/25RTJnNbmS)**" + "\n" + "```\n" + "Ocorreu um erro: " + e + "```")
                		.setColor("RANDOM")
                		.setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
                		.setTimestamp()
                	message.channel.send(embed)
                    console.log(e)
            	}
            }
            } else {
                message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}
