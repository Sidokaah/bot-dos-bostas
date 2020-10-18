const Discord = require("discord.js")

module.exports = {
  name: "volume",
  aliases: [`Volume`, `VOLUME`, `v`, `V`, ` Volume`, ` VOLUME`, ` v`, ` V`, "set", "set-volume"],
  run: async (client, message, args) => {
    let queue = client.distube.getQueue(message.guild.id)
    if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
    if (isNaN(args[0])) {
      message.react(":X:748632517476745226")
      const errooembed = new Discord.MessageEmbed()
          .setDescription("<:X:748632517476745226> Isso não é um número.")
          .setColor("RANDOM")
      message.channel.send(errooembed)
    }
    if(!args[0]) {
      const embed1 = new Discord.MessageEmbed()
          .setDescription(`:loud_sound: O volume da música está a: **${queue.volume}%**`)
          .setColor("RANDOM")
      message.channel.send(embed1)
    }
    if (!message.member.voice.channelID) {
      message.react(":X:748632517476745226")
      const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`Precisas de estar num voice chat para veres o volume da música!`)
      return message.channel.send(embed).then(msg => {
          msg.delete({ timeout: 25000 })
      })
    }
    let userVoiceChannel = message.member.voice.channel;
    let clientVoiceConnection = message.guild.me.voice;
    if (userVoiceChannel === clientVoiceConnection.channel) {
      if (args[0] > 200) {
          client.distube.setVolume(message, 200);
          const errembed = new Discord.MessageEmbed()
              .setDescription(`<:X:748632517476745226> O máximo de volume é **200%**, então pus o volume a **200%** e não **${args[0]}%**.`)
              .setColor("RANDOM")
          message.channel.send(errembed)
      } else {
          client.distube.setVolume(message, args[0]);
          const embed1 = new Discord.MessageEmbed()
              .setDescription(`:loud_sound: O volume da música está agora a: **${queue.volume}%**`)
              .setColor("RANDOM")
          message.channel.send(embed1)
      }
    } else {
      message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
    }
  }
}
