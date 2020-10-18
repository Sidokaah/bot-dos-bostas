module.exports = {
  name: "loop",
  aliases: ["repeat", "Repeat", "Loop", "REPEAT", "LOOP", " repeat", " loop", " Repeat", " Loop", " REPEAT", " LOOP"],
  run: async (client, message, args) => {
    if (!message.member.voice.channelID) {
      message.react(":X:748632517476745226")
      const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`Precisas de estar num voice chat para repetires música!`)
      return message.channel.send(embed).then(msg => {
          msg.delete({ timeout: 25000 })
      })
    }
    let userVoiceChannel = message.member.voice.channel;
    let clientVoiceConnection = message.guild.me.voice;
    if (userVoiceChannel === clientVoiceConnection.channel) {
      let mode = client.distube.setRepeatMode(message, parseInt(args[0]));
      mode = mode ? mode == 2 ? "Repetir o queue" : "Repetir a música" : "Desligado";
      const embed = new Discord.MessageEmbed()
        .setDescription("O Loop agora está agora: `" + mode + "`")
        .setColor("RANDOM")
      message.channel.send(embed)
    } else {
      message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
    }
  }
}
