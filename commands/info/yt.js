const Discord = require("discord.js")
const fecth = require("node-superfetch")

module.exports = {
    name: "yt",
    aliases: ["Yt", "YT", " yt", " Yt", " YT"],
    run: async (client, message, args) => {
        let name = args.join(" ");
        if (!name) {
            message.react(":X:748632517476745226")
            return message.channel.send("Nome de Canal Desconhecido.");
        }
        const channel = await fecth.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${config.google}&maxResults=1&type=channel`)
            .catch(() => message.channel.send("Erro no canal desconhecido."));
        if (!channel.body.items[0]) return message.channel.send("Sem resultado de um canal.");
        const data = await fecth.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${config.google}`)
            .catch(() => message.channel.send("Erro da data do canal desconhecido."));
        const embed = new Discord.MessageEmbed()
            .setColor("#F93A2F")
            .setThumbnail(channel.body.items[0].snippet.thumbnails.high.url)
            .setTimestamp(new Date())
            .addField("Nome do Canal", channel.body.items[0].snippet.channelTitle, true)
            .addField("Descrição do Canal", channel.body.items[0].snippet.description, true)
            .addField("Subscritores", parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString(), true)
            .addField("Views Totais", parseInt(data.body.items[0].statistics.viewCount).toLocaleString(), true)
            .addField("Vídeos totais", parseInt(data.body.items[0].statistics.videoCount).toLocaleString(), true)
            .addField("Canal Criado a", new Date(channel.body.items[0].snippet.publishedAt).toDateString(), true)
            .addField("Link", `[${channel.body.items[0].snippet.channelTitle}](https://www.youtube.com/channel/${channel.body.items[0].id.channelId})`, true)
            .setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
            .setTimestamp()
        return message.channel.send(embed);
    }
}