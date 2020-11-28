const Discord = require("discord.js")
var { getPreview, getData } = require("spotify-url-info");

module.exports = {
    name: "spotify",
    aliases: ["Spotify", "SPOTIFY", " spotify", " Spotify", " SPOTIFY"],
    usage: ["[alguma coisa]"],
    cooldown: "8",
    description: "Toca algum vídeo do Spotify [url]",
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
            if (!args[0]) {
            	message.react(":X:748632517476745226")
            	message.channel.send("<:X:748632517476745226> Diz-me alguma coisa para eu procurar!")
        	} else {
                try {
                    const { voice } = message.member
        	    	const connection = await voice.channel.join()
        	    	await connection.voice.setSelfDeaf(true)
                	const data = await getData(args.join(' '));
                	if (args[0].startsWith('https://open.spotify.com')) {
						const data = await getData(args.join(' '));
						if (data.type == 'playlist' || data.type == 'album') {
							if (data.type == 'playlist') {
                                if(message.author.id !== "343491235975135243") {
                                    return message.channel.send("<:X:748632517476745226> Playlists do Spotify ainda estão em Beta!")
                                } else if(message.author.id === "343491235975135243") {
									await data.tracks.items.forEach(song => {
                                    	if(data.tracks.items.length > 35){
                                    		return message.channel.send("<:X:748632517476745226> Só podes tocar playlists com menos de 35 músicas.")
                                		} else {
                                    		client.distube.play(message, song.track.name + " " + song.track.artists[0].name);
                                		}
                                	})
                                }
							}
							else {
                                if(message.author.id !== "343491235975135243") {
                                    return message.channel.send("<:X:748632517476745226> Álbuns do Spotify ainda estão em Beta!")
                                } else if(message.author.id === "343491235975135243") {
									await data.tracks.items.forEach(song => {
                                    	client.distube.play(message, song.name + " " + song.artists[0].name);
									});
								}
                    		}
                        }
						else if (data.type == 'track') {
							const track = await getPreview(args.join(' '));
							client.distube.play(message, track.title + " " + track.artist);
						}
                    }
					else {
						const embed = new Discord.MessageEmbed()
                    		.setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                    		.setDescription(`**URLs Suportados:**\n<:spotify:777168347879309352> Spotify: Track [só url]\n<:spotify:777168347879309352> Spotify: Playlists (Beta)\n<:spotify:777168347879309352> Spotify: Álbuns (Beta)`)
                			.setColor("RANDOM")
                			.setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
                			.setTimestamp()
                		message.channel.send(embed)
					}
            	} catch (e) {
                	const embed = new Discord.MessageEmbed()
                    	.setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                    	.setTitle(`<:X:748632517476745226> Ocorreu um erro <:X:748632517476745226>`)
                    	.setDescription("Se erro continua a acontecer, entra no **[Servidor de Suporte](https://discord.gg/25RTJnNbmS)**" + "\n" + "```\n" + "Ocorreu um erro: " + e + "```")
                		.setColor("RANDOM")
                		.setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
                		.setTimestamp()
                	message.channel.send(embed)
                }
            }
            } else {
                message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}
