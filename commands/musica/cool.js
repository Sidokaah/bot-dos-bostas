const Discord = require("discord.js")

module.exports = {
    name: "cool",
    aliases: ["coolplaylist"],
    run: async (client, message, args) => {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
            return message.channel.send(embed)
        }
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel || userVoiceChannel && !clientVoiceConnection.channel) {
        	const link = "https://www.youtube.com/playlist?list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN"
        	const playembed = new Discord.MessageEmbed()
            	.setDescription(`<:youtube1:748576732642148472> A procurar no Youtube: **${link}**`)
            	.setColor("RANDOM")
        	message.channel.send(playembed).then(msg1 => {
            	client.distube.on("playList", (message, queue, playlist, song) => {
                	playembed.setDescription(`<:youtube1:748576732642148472> Encontrado no Youtube: **[${playlist.name}](${playlist.url})** com 	**${playlist.songs.length}** músicas`)
                	msg1.edit(playembed)
            	})
            	client.distube.on("addList", (message, queue, playlist, song) => {
                	playembed.setDescription(`<:youtube1:748576732642148472> Adicionado ao queue: **[${playlist.name}](${playlist.url})** com **${playlist.songs.length}** músicas`)
                	msg1.edit(playembed)
            	})
        	})
        	const { voice } = message.member
        	const connection = await voice.channel.join()
        	await connection.voice.setSelfDeaf(true)
        	client.distube.play(message, link);
        	} else {
            	message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}