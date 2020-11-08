const Discord = require("discord.js")

module.exports = {
    name: "search",
    aliases: ["Search", "SEARCH", "sr", "Sr", "SR", " search", " Search", " SEARCH", " sr", " Sr", " SR"],
    usage: ["[alguma coisa]"],
    description: "Procura uma música no youtube, dando no máximo 12 resultados para escolher",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],
    userPermissions: [],
    run: async (client, message, args) => {
        client.distube.options.searchSongs = true
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
                	client.distube.play(message, args.join(" "))
            	} catch (e) {
                	const embed = new Discord.MessageEmbed()
                    	.setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                    	.setTitle(`<:X:748632517476745226> Ocorreu um erro <:X:748632517476745226>`)
                    	.setDescription("```\n" + "Ocorreu um erro: " + e + "```")
                		.setColor("RANDOM")
                		.setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
                		.setTimestamp()
                	message.channel.send(embed)
            	}
                const { voice } = message.member
        	    const connection = await voice.channel.join()
        	    await connection.voice.setSelfDeaf(true)
            	}
            } else {
                message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}
