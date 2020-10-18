const Discord = require("discord.js")

module.exports = {
  name: "skip",
  aliases: ["Skip", "SKIP", " skip", " Skip", " SKIP"],
  run: async (client, message, args) => {
    let queue = client.distube.getQueue(message.guild.id)
    if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
    if (!message.member.voice.channelID) {
      message.react(":X:748632517476745226")
      const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`Precisas de estar num voice chat para dares skip à música!`)
        return message.channel.send(embed).then(msg => {
          msg.delete({ timeout: 25000 })
        })
      }
    let userVoiceChannel = message.member.voice.channel;
    let clientVoiceConnection = message.guild.me.voice;
    if (userVoiceChannel === clientVoiceConnection.channel) {
      client.distube.skip(message);
      const vidNext = queue.songs.length > 1 ? `**Agora a tocar: [${queue.songs[1].name}](${queue.songs[1].url})**` : "**Queue vazio ➜ A sair do voice channel!**";
      const embed1 = new Discord.MessageEmbed()
        .setTitle("Skip!")
        .setThumbnail(queue.songs[0].thumbnail)
        .setDescription(`**Dei skip a: [${queue.songs[0].name}](${queue.songs[0].url})**\n${vidNext}\n**Pedido por:** ${message.author}`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor("RANDOM")
      message.channel.send(embed1)
    } else {
      message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
    }
  }
}
