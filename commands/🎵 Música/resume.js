const Discord = require("discord.js")

module.exports = {
    name: "resume",
    aliases: ["Resume", "RESUME", " resume", " Resume", " RESUME"],
    description: "Resume uma música",
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
        if (userVoiceChannel === clientVoiceConnection.channel) {
            client.distube.resume(message);
            const embed1 = new Discord.MessageEmbed()
                .setDescription(`Voltei a tocar: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                .setColor("RANDOM")
            message.channel.send(embed1)
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}