const Discord = require("discord.js")

module.exports = {
  name: "loop",
  aliases: ["repeat", "Repeat", "Loop", "REPEAT", "LOOP", " repeat", " loop", " Repeat", " Loop", " REPEAT", " LOOP"],
  usage: ["[0 | 1 | 2]"],
  cooldown: "5",
  description: "Ativa e desativa o loop",
  clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  userPermissions: [],
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
    let queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
    let userVoiceChannel = message.member.voice.channel;
    let clientVoiceConnection = message.guild.me.voice;
    if (userVoiceChannel === clientVoiceConnection.channel) {
        let mode = null;
        switch (args[0]) {
      		case "off":
        		mode = 0
        		break
      		case "song":
        		mode = 1
        		break
      		case "queue":
        		mode = 2
        		break
    	}
        if(!args[0]) return message.channel.send(`**Especifica uma opção para o loop**\n\n**Off** - \`Desligado\`\n**Song** - \`Repete a música que está a tocar\`\n**Queue** - \`Repete o queue todo\``)
    	mode = client.distube.setRepeatMode(message, mode);
    	mode = mode ? mode == 2 ? "Repetir o queue" : "Repetir música" : "Desligado";
        const embed = new Discord.MessageEmbed()
        	.setDescription("O Loop agora está: `" + mode + "`")
        	.setColor("RANDOM")
      	message.channel.send(embed)
    } else {
      message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
    }
  }
}