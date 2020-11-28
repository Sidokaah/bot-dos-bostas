const Discord = require("discord.js")

module.exports = {
    name: "move",
    aliases: ["Move", "MOVE", " move", " Move", " MOVE"],
    usage: ["[número]"],
    description: "Move uma música para outra posição no queue",
    cooldown: "5",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
      let userVoiceChannel = message.member.voice.channel;
      let clientVoiceConnection = message.guild.me.voice;
      if (userVoiceChannel === clientVoiceConnection.channel) {
        try {
            if (isNaN(args[0])) return message.channel.send('<:X:748632517476745226> Número inválido.');
            if (args[0] === 0) return message.channel.send(`<:X:748632517476745226> Não consigo mover uma música que já estou a tocar!`);
            let queue = client.distube.getQueue(message.guild.id);
            if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
            if ((args[0] > queue.songs.length) || (args[0] && !queue.songs[args[0]])) return message.channel.send('<:X:748632517476745226> Nenhuma música encontrada.');
            if(args[0].includes("-")) {
                const erroembed = new Discord.MessageEmbed()
                    .setDescription("Não posso mover número negativos.")
                    .setColor("RANDOM")
                message.channel.send(erroembed)
            }
            if(args[1].includes("-")) {
                const erroembed = new Discord.MessageEmbed()
                    .setDescription("Não posso saltar mover negativos.")
                    .setColor("RANDOM")
                message.channel.send(erroembed)
            }
            if (!args[1]) {
              const song = queue.songs[args[0] - 1];
              queue.songs.splice(args[0] - 1, 1);
              queue.songs.splice(0, 0, song);
              const embed = new Discord.MessageEmbed()
                .setDescription(`**[${song.name}](${song.url})** foi movido para o princípio do queue!`)
                .setColor("RANDOM")
              return message.channel.send(embed);
            }
            else if (args[1]) {
              if (args[1] == 0) return message.channel.send(`<:X:748632517476745226> Não consigo mover uma música que já estou a tocar!`);
              if ((args[1] > queue.songs.length) || !queue.songs[args[1]]) return message.channel.send('<:X:748632517476745226> Nenhuma música encontrada.');
              const song = queue.songs[args[0] - 1];
              queue.songs.splice(args[0] - 1, 1);
              queue.songs.splice(args[1] - 1, 0, song);
              const embed = new Discord.MessageEmbed()
                .setDescription(`**[${song.name}](${song.url})** foi movido para a **posição ${args[1]}** do queue!`)
                .setColor("RANDOM")
              return message.channel.send(embed);
            }
        } catch {
            return;
        }
      } else {
        message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
      }
    }
  }