const Discord = require("discord.js")

module.exports = {
    name: "jumpto",
    aliases: ["JumpTo", "JUMPTO", "skipto", "SkipTo", "SKIPTO", " jumpto", " JumpTo", " JUMPTO", " skipto", " SkipTo", " SKIPTO"],
    usage: ["[número]"],
 	description: "Salta para o número que quiseres no queue",
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
                if (!args.length){
                    const erroembed = new Discord.MessageEmbed()
                        .setDescription("<:X:748632517476745226> Precisas de especificar um número para saltares.")
                        .setColor("RANDOM")
                    message.channel.send(erroembed)
                }
                if (isNaN(args[0])) {
                    const erroembed = new Discord.MessageEmbed()
                        .setDescription("<:X:748632517476745226> Isso não é um número.")
                        .setColor("RANDOM")
                    message.channel.send(erroembed)
                }
                if(args[0].includes("-")) {
                    const erroembed = new Discord.MessageEmbed()
                        .setDescription("Não posso saltar número negativos.")
                        .setColor("RANDOm")
                    message.channel.send(erroembed)
                }
                queue.playing = true;
                if (queue.repeatMode) {
                    for (let i = 0; i < args[0] - 2; i++) {
                    queue.songs.push(queue.songs.shift());
                }
                } else {
                    queue.songs = queue.songs.slice(args[0] - 2);
                }
                queue.connection.dispatcher.end();
                const embed1 = new Discord.MessageEmbed()
                    .setDescription(`⬆️ Saltei para o número **${parseInt(args[0])}** no queue!`)
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