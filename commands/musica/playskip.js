const Discord = require("discord.js")

module.exports = {
    name: "playskip",
    aliases: ["PlaySkip", "Playskip", "pskip", "Pskip", "PSKIP", "PLAYSKIP"],
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
        let queue = client.distube.getQueue(message.guild.id)
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel || userVoiceChannel && !clientVoiceConnection.channel) {
            if(!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("<:X:748632517476745226> Não tenho permissão para enviar embeds!")
            client.distube.options.searchSongs = true
            client.distube.playSkip(message, args.join(" "));
            const embed = new Discord.MessageEmbed()
                .setDescription(`:track_next: Vou dar skip à música que está a tocar e começar a tocar a que escolheres!`)
                .setColor("RANDOM")
            message.channel.send(embed)
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}