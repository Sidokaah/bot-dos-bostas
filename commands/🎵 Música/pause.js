const Discord = require("discord.js")

module.exports = {
    name: "pause",
    aliases: ["Pause", "PAUSE", " pause", " Pause", " PAUSE"],
    description: "Pausa a música",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para pausares música!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        let queue = client.distube.getQueue(message.guild.id)
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        if(client.distube.isPlaying = false){
            const cembed = new Discord.MessageEmbed()
                .setDescription("A música já não está a tocar!")
                .setColor("RANDOM")
            return message.channel.send(cembed)
        }
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            client.distube.pause(message);
            const embed1 = new Discord.MessageEmbed()
                .setDescription(`Pausei: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                .setColor("RANDOM")
            message.channel.send(embed1)
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}