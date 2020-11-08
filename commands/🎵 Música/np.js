const Discord = require("discord.js")

module.exports = {
    name: "np",
    aliases: ["NP", "Np", "nowplaying", "Nowplaying", "NowPlaying", "NOWPLAYING", "current", "Current", "CURRENT", " np", " NP", " Np", " nowplaying", " Nowplaying", " NowPlaying", " NOWPLAYING", " current", " Current", " CURRENT"],
    description: "Mostra a música que está a tocar",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const utils = require("../../utils/util.js");
        const util = new utils.Utils(client, process.cwd());
        let queue = client.distube.getQueue(message.guild.id);
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        if (!queue.connection) return message.reply("<:X:748632517476745226> O vídeo ainda não começou a tocar!");
        if (!message.member.voice.channelID) return message.reply("<:X:748632517476745226> Precisas de estar num voice channel para usares o comando!")
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            const currentVideo = queue.songs[0];
            const vidLength = currentVideo.duration;
            const vidTitle = `**${currentVideo.name}**`;
            const vidUrl = `${currentVideo.url}`;
            const vidLoop = queue.repeatMode ? queue.repeatMode == 2 ? "Todo o Queue" : "Esta música" : "Desligado";
            const vidRequester = currentVideo.user;
            const vidDurationCount = 27;
            const lengthBar = "━".repeat(vidDurationCount);
            const timeIndicator = "⚪";
            let timePosition = Math.floor(((queue.connection.dispatcher.streamTime / 1000) / vidLength) * vidDurationCount);
            let timeString = `[${util.formatSeconds(queue.connection.dispatcher.streamTime / 1000)}/${util.formatSeconds(vidLength)}]`
            let timeRemaining = util.formatSeconds(vidLength - (queue.connection.dispatcher.streamTime / 1000));
            let vidNext = queue.songs.length > 1 ? `[${queue.songs[1].name}](${queue.songs[1].url})` : "Nenhuma música";
            let description = `[${vidTitle}](${vidUrl})\n`;
            description += `\`\`\`${util.replaceStrChar(lengthBar, timePosition, timeIndicator)} ${timeString}\`\`\``;
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Agora a tocar:")
                .setThumbnail(currentVideo.thumbnail)
                .setDescription(`${description}`)
                .addFields(
                    { name: "Depois:", value: `**${vidNext}**`, inline: false },
                    { name: "Duração:", value: `**${util.formatSeconds(vidLength)}**`, inline: true },
                    { name: "Tempo Restante:", value: `**${timeRemaining}**`, inline: true },
                    { name: "Loop:", value: `**${vidLoop}**`, inline: true },
                    { name: "Pedido por:", value: vidRequester, inline: true },
                )
                .setFooter(`Pedido por: ${message.author.username}`, message.author.displayAvatarURL())
                .setTimestamp();
            const msg = await message.channel.send(embed);
            const interval = setInterval(() => {
                try {
                    let vidLoop = queue.repeatMode ? queue.repeatMode == 2 ? "Todo o Queue" : "Esta música" : "Desligado";
                    queue = client.distube.getQueue(message.guild.id)
                    timeString = `[${util.formatSeconds(queue.connection.dispatcher.streamTime / 1000)}/${util.formatSeconds(vidLength)}]`
                    timePosition = Math.floor(((queue.connection.dispatcher.streamTime / 1000) / vidLength) * vidDurationCount);
                    timeRemaining = util.formatSeconds(vidLength - (queue.connection.dispatcher.streamTime / 1000));
                    vidNext = queue.songs.length > 1 ? `[${queue.songs[1].name}](${queue.songs[1].url})` : "None";
                    description = `[${vidTitle}](${vidUrl})\n`;
                    description += `\`\`\`${util.replaceStrChar(lengthBar, timePosition, timeIndicator)} ${timeString}\`\`\``;
                    embed.setDescription(description);
                    embed.spliceFields(2, 1, { name: "Tempo Restante:", value: `**${timeRemaining}**`, inline: true });
                    embed.spliceFields(3, 1, { name: "Loop:", value: `**${vidLoop}**`, inline: true });
                    msg.edit(embed);
                } catch (e){
                    msg.delete();
                    return clearInterval(interval);
                }
            }, 5000);
            queue.connection.dispatcher.on("finish", () => {
                description = `[${vidTitle}](${vidUrl})\n`;
                description += `\`\`\`${util.replaceStrChar(lengthBar, vidDurationCount - 1, timeIndicator)} Ended\`\`\``;
                embed.setTitle("Antes a tocar:");
                embed.setDescription(description);
                embed.spliceFields(2, 1, { name: "Tempo Restante:", value: "**Acabou**", inline: true });
                msg.edit(embed);
                return clearInterval(interval);
            });
            } else {
                message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}