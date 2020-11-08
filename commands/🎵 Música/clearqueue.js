const Discord = require("discord.js")

module.exports = {
    name: "clearqueue",
    aliases: ["Clearqueue", "ClearQueue", "CLEARQUEUE", " clearqueue", " Clearqueue", " ClearQueue", " CLEARQUEUE"],
    description: "Apaga o queue (menos a música que está a tocar)",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message.guild.id);
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        if (!message.member.voice.channelID) return message.channel.send("<:X:748632517476745226> Precisas de estar num voice channel para usares o comando!")
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            if (args[0]) {
                if (isNaN(args[0])) return message.channel.send(`<:X:748632517476745226> Isso não é número, ${message.author}.`)
                const index = Math.floor(parseInt(args[0])) - 1;
                if (index == 0) {
                    distube.skip(message);
                    let queue = distube.getQueue(message)
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`Dei skip a: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                        .setColor("RANDOM")
                    return message.channel.send(embed1)
                }
                const video = queue.songs[index];
                queue.songs.splice(parseInt(args[0]) - 1, 1);
                const clearembed1 = new Discord.MessageEmbed()
                    .setDescription(`🗑️ **${video.name}** foi removido do queue!`)
                    .setColor("RANDOM")
                message.channel.send(clearembed1)
                return; 
            }
            queue.songs = [queue.songs[0]];
            const clearembed = new Discord.MessageEmbed()
                .setDescription(`🗑️ O queue foi removido! Adiciona mais músicas ou o playback vai acabar quando acabar esta música.`)
                .setColor("RANDOM")
            message.channel.send(clearembed)
            } else {
                message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}