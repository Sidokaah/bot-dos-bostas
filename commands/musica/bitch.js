const Discord = require("discord.js")

module.exports = {
    name: "bitch",
    aliases: ["bitchlasagna"],
    run: async (client, message, args) => {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel || userVoiceChannel && !clientVoiceConnection.channel) {
            const playlistembed = new Discord.MessageEmbed()
            	.setDescription(`<a:loading:751573466842529912> A carregar a playlist...`)
            	.setColor("RANDOM")
        	message.channel.send(playlistembed).then(msg1 => {
            	client.distube.on("playList", (message, queue, playlist, song) => {
                	playlistembed.setDescription(`🎶 Playlist **${playlist.name}** carregada, com **${playlist.songs.length}** músicas`)
                	msg1.edit(playlistembed)
            	})
            	client.distube.on("addList", (message, queue, playlist, song) => {
                	playlistembed.setDescription(`🎶 Playlist **${playlist.title}** carregada, com **${playlist.songs.length}** músicas`)
                	msg1.edit(playlistembed)
            	})
        	})
        	let songs = ["https://www.youtube.com/watch?v=6Dh-RL__uN4", "https://www.youtube.com/watch?v=YNNXTs6adIs", "https://www.youtube.com/watch?v=BuNmXYmTRQE", "https://www.youtube.com/watch?v=0oq7805Fxfw", "https://www.youtube.com/watch?v=Z9uLwuGTTFk", "https://www.youtube.com/watch?v=uoww4ou3Ark", "https://www.youtube.com/watch?v=KprzFp9A0kc", "https://www.youtube.com/watch?v=eoK-Ew_0Nw8", "https://www.youtube.com/watch?v=i20TUj4d8sw", "https://www.youtube.com/watch?v=34WnaTTGIKw", "https://www.youtube.com/watch?v=5FusviCrZOk", "https://www.youtube.com/watch?v=52_hLibBRzY", "https://www.youtube.com/watch?v=0uCgyy1pjyo", "https://www.youtube.com/watch?v=qlZvOytosLc"];
            client.distube.playCustomPlaylist(message, songs, { name: "Bitch Lasagna Playlist" });
        	} else {
            	message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}