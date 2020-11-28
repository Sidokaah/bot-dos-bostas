const Discord = require("discord.js")

module.exports = {
    name: "queue",
    aliases: ["Queue", "QUEUE", "q", "Q", " queue", " Queue", " QUEUE", " q", " Q"],
    description: "Mostra a lista de músicas que estão no queue",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "ADD_REACTIONS", "MANAGE_MESSAGES"],
    userPermissions: [],
    run: async (client, message, args) => {
      let queue = client.distube.getQueue(message.guild.id)
      if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
      let userVoiceChannel = message.member.voice.channel;
      let clientVoiceConnection = message.guild.me.voice;
      if (userVoiceChannel === clientVoiceConnection.channel) {
          const pageBack = "778721943318036510";
          const pageForward = "778721875290357780";
          const trash = "778721979061633035";
          const num_per_page = 10; // Número de músicas por página
          let queuedVideos = queue.songs.slice();
          let pageContents = []; 
          while (queuedVideos.length > 0) {
              pageContents.push(queuedVideos.splice(0, num_per_page))
          }
          let num_pages = pageContents.length;
          let currentPage = 0;
          let currentListNum = ((currentPage + 1) * num_per_page) - num_per_page;
          let title = queue.songs.length > 1 ? `Queue Atual ➜ ${queue.songs.length} músicas - ${queue.formattedDuration}` : `Queue Atual - ${queue.songs.length} música`;
          let description = `<:musical_note:779660919802036245> **Agora a tocar: [${queue.songs[0].name}](${queue.songs[0].url})** <:musical_note:779660919802036245>\n\n${pageContents[currentPage].map((song, index) =>
              `**${currentListNum + (index + 1)} - [${song.name}](${song.url})**`).join('\n')}\n\n`;
          description += `**Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "Todo o queue" : "Esta música" : "Desligado"}**`;
          const embed = new Discord.MessageEmbed()
              .setTitle(title)
              .setColor('#ff7700')
              .setThumbnail(queue.songs[0].thumbnail)
              .setDescription(description)
              .setFooter(`Página ${currentPage + 1}/${num_pages} | Pedido por: ${message.author.tag}`)
              .setTimestamp();
          const msg = await message.channel.send(embed);
          if (num_pages <= 1) return;
          msg.react(pageBack);
          msg.react(trash);
          msg.react(pageForward);
          const filter = (reaction) => reaction.emoji.id === pageBack || reaction.emoji.id === trash || reaction.emoji.id === pageForward;
          const collector = msg.createReactionCollector(filter, { time: 150000 });
          collector.on("collect", (reaction, user) => {
              if (user.bot) return;
              queuedVideos = queue.songs.slice();
              pageContents = [];
              title = queuedVideos.length > 1 ? `Queue Atual ➜ ${queuedVideos.length} músicas - ${queue.formattedDuration}` : `Queue Atual - ${queueVideos.length} música`;
              while (queuedVideos.length > 0) {
                  pageContents.push(queuedVideos.splice(0, num_per_page))
              }
              num_pages = pageContents.length;
              switch (reaction.emoji.id) {
                  case pageBack: {
                      currentPage = currentPage == 0 ? pageContents.length - 1 : currentPage -= 1;
                      break;
                  }
                  case trash: {
                      msg.delete()
                      break;
                  }
                  case pageForward: {
                      currentPage = currentPage == pageContents.length - 1 ? 0 : currentPage += 1;
                      break;
                  }
              }
              reaction.users.remove(user);
              currentListNum = ((currentPage + 1) * num_per_page) - num_per_page;
              let description = `<:musical_note:779660919802036245> **Agora a tocar: [${queue.songs[0].name}](${queue.songs[0].url})** <:musical_note:779660919802036245>\n\n${pageContents[currentPage].map((video, index) =>
                  `**${currentListNum + (index + 1)} - [${video.name}](${video.url})**`).join('\n')}\n\n`;
              description += `**Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "Todo o queue" : "Esta música" : "Desligado"}**`;
              embed.setTitle(title);
              embed.setDescription(description);
              embed.setFooter(`Página ${currentPage + 1}/${num_pages} | Pedido por: ${message.author.tag}`);
              msg.edit(embed);
          });
      } else {
          message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
      }
  }
}
