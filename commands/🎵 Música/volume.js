const Discord = require("discord.js")

module.exports = {
  name: "volume",
  aliases: [`Volume`, `VOLUME`, `v`, `V`, ` Volume`, ` VOLUME`, ` v`, ` V`, "set", "set-volume"],
  usage: ["[número]"],
  cooldown: "7",
  description: "Vê ou muda o volume da música",
  clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  userPermissions: [],
  run: async (client, message, args) => {
    let queue = client.distube.getQueue(message.guild.id)
    if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
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
        if(args[0].includes("-")) {
            const erroembed = new Discord.MessageEmbed()
                .setDescription("Não posso saltar número negativos.")
                .setColor("RANDOm")
            message.channel.send(erroembed)
        }
      	if(!args[0] || isNaN(args[0])) {
      		const embed1 = new Discord.MessageEmbed()
          		.setDescription(`<:volumeup:772391748999577600> O volume da música está a: **${queue.volume}%**`)
          		.setColor("RANDOM")
      		message.channel.send(embed1)
    	} else {
            if (args[0] > 200) {
          		client.distube.setVolume(message, 200);
          		const errembed = new Discord.MessageEmbed()
              		.setDescription(`<:X:748632517476745226> O máximo de volume é **200%**, então pus o volume a **200%** e não **${args[0]}%**.`)
              		.setColor("RANDOM")
          		message.channel.send(errembed)
      		} else {
          		client.distube.setVolume(message, args[0]);
          		const embed1 = new Discord.MessageEmbed()
              		.setDescription(`<:volumeup:772391748999577600> O volume da música está agora a: **${queue.volume}%**`)
              		.setColor("RANDOM")
          		message.channel.send(embed1)
      		}
        }
    } else {
      	message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
    }
  }
}
