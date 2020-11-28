const Discord = require("discord.js")

module.exports = {
  name: "leave",
  aliases: ["Leave", "LEAVE", " leave", " Leave", " LEAVE", "disconnect", "Disconnect", "DISCONNECT", " disconnect", " Disconnect", " DISCONNECT"],
  cooldown: "5",
  description: "Para a música e sai do voice channel",
  clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  userPermissions: [],
  run: async (client, message, args) => {
    let queue = client.distube.getQueue(message.guild.id)
    if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
    if (!message.member.voice.channelID) {
        message.react(":X:748632517476745226")
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`<:X:748632517476745226> Precisas de estar num voice chat para parares música!`)
        return message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 25000 })
        })
    }
    let userVoiceChannel = message.member.voice.channel;
    let clientVoiceConnection = message.guild.me.voice;
    if (userVoiceChannel === clientVoiceConnection.channel) {
        clientVoiceConnection.channel.leave()
        message.channel.send("<:tick:748569437589995731> **Saí do voice channel!**")
    } else {
        message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
    }
  }
}
