const Discord = require("discord.js")

module.exports = {
  name: "stop",
  aliases: ["leave", "Stop", "Leave", "STOP", "LEAVE", "disconnect", "Disconnect", "DISCONNECT", " stop", " leave", " Stop", " Leave", " STOP", " LEAVE", " disconnect", " Disconnect", " DISCONNECT"],
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
        client.distube.stop(message);
        const embed = new Discord.MessageEmbed()
            .setTitle("Stop!")
            .setColor("RANDOM")
            .setDescription(`Parei a música e saí do voice channel!\nPedido por(a): ${message.member.user}\nObrigado por usares o **${client.user.username}!**`)
            .addFields(
                { name: "Links Importantes:", value: "[Github Repository](https://github.com/TonaS21/bot-dos-bostas)\n[Convida o Bot](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot)\n[Server de Suporte](https://discord.gg/DRnnZPS)", inline: false }
            )
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        message.channel.send(embed)
    } else {
        message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
    }
  }
}
