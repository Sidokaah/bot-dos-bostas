const Discord = require("discord.js")

module.exports = {
    name: "seek",
    aliases: ["Seek", "SEEK", " seek", " Seek", " SEEK"],
    description: "Salta o número de músicas que quiseres",
    usage: ["[número]"],
    cooldown: "7",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para passares para outra música!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        let queue = client.distube.getQueue(message.guild.id)
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            try {
                if (!args[0]) {
                    const erroembed = new Discord.MessageEmbed()
                        .setDescription("Precisas de especificar um valor para passares à frente a música.")
                        .setColor("RANDOM")
                    message.channel.send(erroembed)
                }
                if (!IsNaN(args[0])) {
                    const erroembed = new Discord.MessageEmbed()
                        .setDescription("Isso não é um número.")
                        .setColor("RANDOM")
                    message.channel.send(erroembed)
                }
                client.distube.seek(message, Number(args[0] * 1000))
            } catch {
                return;
            }
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}