const Discord = require("discord.js")

module.exports = {
    name: "jump",
    aliases: ["Jump", "JUMP", "j", "J", " jump", " Jump", " JUMP", " j", " J"],
    description: "Salta o número de músicas que quiseres",
    usage: ["[número]"],
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
                if (!parseInt(args[0])) {
                    const erroembed = new Discord.MessageEmbed()
                        .setDescription("Precisas de especificar um número para saltares.")
                        .setColor("RANDOm")
                    message.channel.send(erroembed)
                }
                if (isNaN(args[0])) {
                    const erroembed = new Discord.MessageEmbed()
                        .setDescription("Isso não é um número.")
                        .setColor("RANDOm")
                    message.channel.send(erroembed)
                }
                if(args[0].includes("-")) {
                    const erroembed = new Discord.MessageEmbed()
                        .setDescription("Não posso saltar número negativos.")
                        .setColor("RANDOm")
                    message.channel.send(erroembed)
                }
                client.distube.jump(message, parseInt(args[0]))
                const embed1 = new Discord.MessageEmbed()
                    .setDescription(`⬆️ Saltei **${parseInt(args[0])} músicas** no queue!`)
                    .setColor("RANDOM")
                message.channel.send(embed1)
            } catch {
                return;
            }
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}