const Discord = require("discord.js")

module.exports = {
    name: "playskip",
    aliases: ["PlaySkip", "Playskip", "pskip", "Pskip", "PSKIP", "PLAYSKIP"],
    usage: ["[alguma coisa]"],
    description: "Toca um vídeo que quiseres, dando skip á música que estava a tocar",
    cooldown: "6",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
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
            try {
                client.distube.options.searchSongs = true
            	client.distube.playSkip(message, args.join(" "));
            } catch (e) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                    .setTitle(`<:X:748632517476745226> Ocorreu um erro <:X:748632517476745226>`)
                    .setDescription("Se erro continua a acontecer, entra no **[Servidor de Suporte](https://discord.gg/25RTJnNbmS)**" + "\n" + "```\n" + "Ocorreu um erro: " + e + "```")
                	.setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
                	.setColor("RANDOM")
                	.setTimestamp()
                message.channel.send(embed)
            }
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}