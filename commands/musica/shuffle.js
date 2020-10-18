const Discord = require("discord.js")

module.exports = {
    name: "shuffle",
    aliases: ["Shuffle", "SHUFFLE", " shuffle", " Shuffle", " SHUFFLE"],
    run: async (client, message, args) => {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para misturares o queue!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        let queue = client.distube.getQueue(message.guild.id)
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            if(queue.songs.length < 3) {
                const embed2 = new Discord.MessageEmbed()
                    .setDescription(`<:X:748632517476745226> Só existem **${queue.songs.length} música(s)** no queue, por isso não vou dar shuffle!`)
                    .setColor("RANDOM")
                message.channel.send(embed2)
            }
            if(queue.songs.length >= 3) {
                client.distube.shuffle(message)
                const embed1 = new Discord.MessageEmbed()
                    .setDescription(`:twisted_rightwards_arrows: Misturei as **${queue.songs.length} músicas** que estão no queue!`)
                    .setColor("RANDOM")
                message.channel.send(embed1)
            }
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}