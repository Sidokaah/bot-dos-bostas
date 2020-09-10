const Discord = require('discord.js'),
    DisTube = require('distube')
const client = new Discord.Client();
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, highWaterMark: 1 << 24 });
const Minesweeper = require('discord.js-minesweeper');
const fetch = require('node-fetch');
const config = require("./config.json")
const fecth = require('node-superfetch');
const cheerio = require("cheerio");
const request = require("request");
const moment = require("moment");
const version = "v2.4.0" //também podes mudar para a que quiseres
const superagent = require("superagent");
const ms = require("ms");
const querystring = require("querystring");
const { search } = require('superagent');
const dateFormat = require('dateformat');
const api = require("imageapi.js");
const canva = require("canvacord");
const weather = require("weather-js")
const { Random } = require("something-random-on-discord")
const random = new Random();
const fs = require("fs")
//const mongo = require("./mongo")
const { calculator, formatDate } = require("./functions");
const fortnite = require("simple-fortnite-api")
const Client = new fortnite("");//token da api do fortnite-tracker
const got = require("got");
const utils = require("./utils/util.js");
const data = require('./tickets.json')
const util = new utils.Utils(client, process.cwd());
client.once("ready", async () => {
    console.log(`${client.user.tag} está pronto para ser usado! ${version}`);
    const statuses = [
        { text: (`nothing`), type: 'LISTENING' },
		{ text: (`with your mom`), type: 'PLAYING' },
		{ text: ("you"), type: 'WATCHING' }
    ]
	client.setInterval(() => {
		const activity = statuses[Math.floor(Math.random() * statuses.length)];
		const text = typeof activity.text === 'function' ? activity.text() : activity.text;
		client.user.setActivity(text, { type: activity.type });
    }, 30000);
    //await mongo().then((mongoose) => {
        //try {
          //console.log('Conectado ao mongodb!')
        //} finally {
         // mongoose.connection.close()
        //}
    //})
    
});
client.on('guildCreate', async (guild) => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text') //não te aconselho a mudares isto
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username}:`, client.user.displayAvatarURL())
        .setColor("RANDOM")
        .setDescription(`Sup everyone, eu sou o **Bot dos Bostas**. Obrigado por me adicionarem ao vosso server. Para verem os comandos em português, faz \`${config.prefix}help\`. Para os veres em inglês, faz \`${config.prefix}help-eng\`.`)
        .addField("❯ Coisas importantes:", "[Server de Suporte](https://discord.gg/DRnnZPS) - Caso tenhas alguma dúvida ou esteja a haver algum erro ou bug, estás à vontade para entrar no server!")
        .addField("❯ Discord.js:", `[Site](https://discord.js.org/#/) - Library em que o bot foi baseado.!`)
        .addField("❯ Criador: TonaS#9344", "Disfruta dos mais de 130 comandos!")
        .setTimestamp()
    channel.send(embed)
    let joinLeaveChannel = await client.channels.cache.get("746067012341596231");
	if (joinLeaveChannel) {
		const embed = new Discord.MessageEmbed()
			.setColor("RANDOM")
            .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
			.setTitle(`Entrei em ${guild.name}!`)
			.setFooter(`ID: ${guild.id}`)
			.setTimestamp()
			.setDescription(`**❯ Membros: ${guild.memberCount}\n❯ Estou agora em: ${client.guilds.cache.size} servers\n❯ Com: ${client.users.cache.size} pessoas**`);
		await joinLeaveChannel.send(embed)
	}
});
client.on("guildDelete", async (guild) => {
    let joinLeaveChannel = await client.channels.cache.get("746067012341596231");
	if (joinLeaveChannel) {
		const embed = new Discord.MessageEmbed()
			.setColor("RANDOM")
            .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
			.setTitle(`Saí de ${guild.name}!`)
			.setFooter(`ID: ${guild.id}`)
			.setTimestamp()
			.setDescription(`**❯ Membros: ${guild.memberCount}\n❯ Estou agora em: ${client.guilds.cache.size} servers\n❯ Com: ${client.users.cache.size} pessoas**`);
		await joinLeaveChannel.send(embed)
	}
});
client.on("guildMemberAdd", async (member) => {
    let guild = await client.guilds.cache.get("577155568699965444"); //podes mudar
    let channel = await client.channels.cache.get("577155569379704835"); //podes mudar
    let channel1 = await client.channels.cache.get("746067012341596231"); //podes mudar, isto serve para logs quando alguém entra ou sai do server
    let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "HammerAndickle"); //podes mudar
    let emoji1 = await member.guild.emojis.cache.find(emoji => emoji.name === "dogey_smile"); //podes mudar
    var cdate = moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm");
    const created = formatDate(member.user.createdAt);
    if (guild != member.guild) {
        return console.log("Sem boas-vindas pra você! Sai daqui saco pela.");
    } else {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setTitle(`${emoji} Bem-vindo! ${emoji}`)
            .setDescription(`${member.user}, Bem-vindo(a) ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, espero que te divirtas connosco! ${emoji1}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp();
        channel.send(embed);
        const embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .addField("Conta criada", `${created}`)
            .setDescription(`:inbox_tray: ${member.user} **entrou no server.**`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .setFooter(`ID do usuário: ${member.user.id}`)
            .setTimestamp();
        channel1.send(embed1);
    }
});
client.on("guildMemberRemove", async (member) => {
    let guild = await client.guilds.cache.get("577155568699965444"); //podes mudar
    let channel = await client.channels.cache.get("736885387099635812"); //podes mudar
    let channel1 = await client.channels.cache.get("746067012341596231");
    let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "notstonks"); //podes mudar o nome do emoji
    if (guild != member.guild) {
        return console.log("Sem boas-vindas pra você! Sai daqui saco pela.");
    } else {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setTitle(`Adeus!`)
            .setDescription(`Adeus ${member.user}, espero que voltes ${emoji}.`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp();
        channel.send(embed);
        const embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setDescription(`:outbox_tray: ${member.user} **saiu do server.**`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .setFooter(`ID do usuário: ${member.user.id}`)
            .setTimestamp();
        channel1.send(embed1);
    }
});
client.on("message", async (message) => {
    const key = `${message.guild.id-message.author.id}`;
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes : config.prefix
        };
    }
    let prefix = prefixes [message.guild.id].prefixes;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    const query = querystring.stringify({ term: args.join(' ') })
    if (["loopnow", "Loopnow", "LoopNow", "LOOPNOW"].includes(command)) {
        let queue = distube.getQueue(message);
        const embed = new Discord.MessageEmbed()
            .setDescription(`Repeat mode está: **${queue.repeatMode ? queue.repeatMode == 2 ? "Todo o Queue" : "Esta música" : "Desligado"}**`)
            .setColor("RANDOM")
        message.channel.send(embed)
    }
    if (["autoplaynow", "Autoplaynow", "AutoPlay", "AUTOPLAY"].includes(command)) {
        let queue = distube.getQueue(message);
        const embed = new Discord.MessageEmbed()
            .setDescription(`O AutoPlay está: **${queue.autoplay ? "Ligado" : "Desligado"}**`)
            .setColor("RANDOM")
        message.channel.send(embed)
    }
    if (["join", "Join", "JOIN"].includes(command)) {
        const { voice } = message.member
        if (!voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para eu me juntar!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        voice.channel.join()
        message.channel.send("<:tick:748569437589995731> | Entrei no voice channel!")
    }
    if (["remove", "Remove", "REMOVE"].includes(command)) {
        let queue = distube.getQueue(message.guild.id); // Get the queue for the guild the cmd was executed in
        if (!queue) return message.reply("<:X:748632517476745226> Não está nada a tocar!");  // Tell the user no song is being played
        if (args[0] < 1 && args[0] >= queue.songs.length) {
            return message.reply('por favor especifica um número válido.');
        }
        var voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('Entra num voice channel e tenta outra vez.');
        if (
            typeof queue.dispatcher == 'undefined' || queue.dispatcher == null
        ) {
            return message.reply('<:X:748632517476745226> There is no song playing right now!');
        } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
            message.reply(`Precisas de estar no mesmo voice channel do Bot para usares o comando!`);
            return;
        }
        queue.songs.splice(args[0] - 1, 1);
        const removeembed = new Discord.MessageEmbed()
            .setDescription(`Música número **${args[0]}** removida do queue.`)
            .setColor("RANDOM")
        return message.channel.send(removeembed);
    }
    if (["play", "Play", "PLAY", "p", "P"].includes(command)) {
        distube.options.searchSongs = false
        if (!message.member.voice.channelID) {
            message.react("X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para tocares música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        if (!args.join(" ")) {
            message.react(":X:748632517476745226")
            message.channel.send("<:X:748632517476745226> | Diz-me alguma coisa para eu procurar!")
        }
        try {
            distube.play(message, args.join(" "))
        } catch (e) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(`:X:748632517476745226 Ocorreu um erro`)
                .setDescription("```\n" + "Ocorreu um erro: " + err + "```")
                .setColor("RANDOM")
                .setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
                .setTimestamp()
            message.channel.send(embed)
        }
        const playembed = new Discord.MessageEmbed()
            .setDescription(`<:youtube1:748576732642148472> A procurar no Youtube: **${args.join(" ")}.**`)
            .setColor("RANDOM")
        message.channel.send(playembed).then(msg1 => {
            distube.on("playSong", (message, queue, song) => {
                playembed.setDescription(`<:youtube1:748576732642148472> Encontrado no Youtube: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                msg1.edit(playembed)
            })
            distube.on("addSong", (message, queue, song) => {
                playembed.setDescription(`<:youtube1:748576732642148472> Adicionado ao queue: **[${song.name}](${song.url})**`)
                msg1.edit(playembed)
            })
        })
    }
    if (["search", "Search", "SEARCH"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        if (!args.join(" ")) {
            message.react(":X:748632517476745226")
            message.channel.send("<:X:748632517476745226> | Diz-me alguma coisa para eu procurar!")
        }
        try {
            distube.play(message, args.join(" "))
        } catch (e) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(`:X:748632517476745226 Ocorreu um erro`)
                .setDescription("```\n" + "Ocorreu um erro: " + err + "```")
                .setColor("RANDOM")
                .setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
                .setTimestamp()
            message.channel.send(embed)
        }
        const playembed = new Discord.MessageEmbed({
            description: `<:youtube1:748576732642148472> A procurar no Youtube: **${args.join(" ")}.**`,
            color: "RANDOM"
        })
        message.channel.send(playembed).then(msg1 => {
            distube.on("playSong", (message, queue, song) => {
                playembed.setDescription(`<:youtube1:748576732642148472> Agora a tocar: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                msg1.edit(playembed)
            })
            distube.on("searchResult", (message, result) => {
                playembed.setDescription(`<:youtube1:748576732642148472> Encontrados **${result.length} resultados** no Youtube.`)
                msg1.edit(playembed)
            })
            distube.on("addSong", (message, queue, song) => {
                playembed.setDescription(`<:youtube1:748576732642148472> Adicionado ao queue: **[${song.name}](${song.url})**`)
                msg1.edit(playembed)
            })
        })
    }
    if (command === "clearqueue") {
        let queue = distube.getQueue(message.guild.id); // Get the queue for the guild the cmd was executed in
        if (!queue) return message.reply("<:X:748632517476745226> Não está nada a tocar!");  // Tell the user no song is being played
        if (!message.member.voice.channelID) return message.reply("<:X:748632517476745226> Precisas de estar num voice channelpara usares o comando!")
        if (args[0]) {
            if (isNaN(args[0])) return message.channel.send(`<:X:748632517476745226> Isso não é número, ${message.author}.`)
            const index = Math.floor(parseInt(args[0])) - 1;
            if (index == 0) {
                distube.skip(message);
                let queue = distube.getQueue(message)
                const embed1 = new Discord.MessageEmbed()
                    .setDescription(`Dei skip a: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                    .setColor("RANDOM")
                return message.channel.send(embed1)
            }
            const video = queue.songs[index];
            queue.songs.splice(parseInt(args[0]) - 1, 1);
            const clearembed1 = new Discord.MessageEmbed()
                .setDescription(`🗑️ **${video.name}** foi removido do queue!`)
                .setColor("RANDOM")
            message.channel.send(clearembed1);
            return;
        }
        queue.songs = [queue.songs[0]];
        const clearembed = new Discord.MessageEmbed()
            .setDescription(`🗑️ O queue foi removido! Adiciona mais músicas ou o playback vai acabar quando acabar esta música.`)
            .setColor("RANDOM")
        message.channel.send(clearembed);
    }
    if (["np", "NP", "Np", "nowplaying", "Nowplaying", "NowPlaying", "NOWPLAYING", "current", "Current", "CURRENT"].includes(command)) {
        let queue = distube.getQueue(message.guild.id);
        if (!queue) return message.reply("<:X:748632517476745226> Não está nada a tocar!");
        if (!queue.connection) return message.reply("<:X:748632517476745226> O vídeo ainda não começou a tocar!");
        if (!message.member.voice.channelID) return message.reply("<:X:748632517476745226> Precisas de estar num voice channelpara usares o comando!")
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
                queue = distube.getQueue(message.guild.id)
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
            } catch {
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
    }
    if (["repeat", "loop", "Repeat", "Loop", "REPEAT", "LOOP"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para repetires música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        let mode = distube.setRepeatMode(message, parseInt(args[0]));
        mode = mode ? mode == 2 ? "Repetir o queue" : "Repetir a música" : "Desligado";
        const embed = new Discord.MessageEmbed()
            .setDescription("O Loop agora está agora: `" + mode + "`")
            .setColor("RANDOM")
        message.channel.send(embed);
    }
    if (["stop", "leave", "Stop", "Leave", "STOP", "LEAVE", "disconnect", "Disconnect", "DISCONNECT"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para parares música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        distube.stop(message);
        const embed = new Discord.MessageEmbed()
            .setTitle("Stop!")
            .setColor("RANDOM")
            .setDescription(`Parei a música e saí do voice channel!\nPedido por(a): ${message.member.user}\nObrigado por usares o **${client.user.username}!**`)
            .addFields(
                { name: "Links Importantes:", value: "[Github Repository](https://github.com/TonaS21/bot-dos-bostas)\n[Convida o Bot](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot)\n[Server de Suporte](https://discord.gg/DRnnZPS)", inline: false }
            )
            .setTimestamp()
            .setFooter("Bot dos Bostas", client.user.displayAvatarURL())
        message.channel.send(embed)
    }
    if (["skip", "Skip", "SKIP"].includes(command)) {
        distube.skip(message);
        let queue = distube.getQueue(message)
        const vidNext = queue.songs.length > 1 ? `**Agora a tocar: [${queue.songs[1].name}](${queue.songs[1].url})**` : "**Queue vazio ➜ A sair do voice channel!**";
        const embed1 = new Discord.MessageEmbed()
            .setTitle("Skip!")
            .setThumbnail(queue.songs[0].thumbnail)
            .setDescription(`**Dei skip a: [${queue.songs[0].name}](${queue.songs[0].url})**\n${vidNext}\n**Pedido por:** ${message.author}`)
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            .setColor("RANDOM")
        message.channel.send(embed1)
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para dares skip à música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        if (!distube.isPlaying(message)) return message.channel.send("<:X:748632517476745226> | Não está nada a tocar!")
    }
    if (["pause", "Pause", "PAUSE"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para pausares música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        distube.pause(message);
        let queue = distube.getQueue(message)
        const embed1 = new Discord.MessageEmbed()
            .setDescription(`Pausei: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
            .setColor("RANDOM")
        message.channel.send(embed1)
    }
    if (["resume", "Resume", "RESUME"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        distube.resume(message);
        let queue = distube.getQueue(message)
        const embed1 = new Discord.MessageEmbed()
            .setDescription(`Voltei a tocar: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
            .setColor("RANDOM")
        message.channel.send(embed1)
    }
    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `haas`, `flanger`, `gate`, `reverse`].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para mudares filters!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        let filter = distube.setFilter(message, command);
        message.channel.send("Filtro do queue atual: " + (filter || "Off"));
    }
    if (["queue", "Queue", "QUEUE", "q", "Q"].includes(command)) {
        let queue = distube.getQueue(message.guild.id);
        if (!queue) return message.reply("⚠️ Não está nada a tocar!"); // Tell the user no song is being played
        const pageBack = "⏪";
        const pageForward = "⏩";
        const trash = "🗑️";
        const num_per_page = 10; // Number of songs to show in a page
        let queuedVideos = queue.songs.slice(); // Make a copy of the queue by value
        let pageContents = []; // This array will contain arrays with length of number of songs to show in a page
        while (queuedVideos.length > 0) {
            pageContents.push(queuedVideos.splice(0, num_per_page))
        }
        let num_pages = pageContents.length; // The number of pages is the number of arrays in the pageContent arrays
        let currentPage = 0; // Page starts at 0 because array index starts at 0
        let currentListNum = ((currentPage + 1) * num_per_page) - num_per_page; // Calculate the last item's position in a page
        let title = queue.songs.length > 1 ? `Queue Atual ➜ ${queue.songs.length} músicas - ${queue.formattedDuration}` : `Queue Atual - ${queue.songs.length} música`;
        let description = `🎵 **Agora a tocar: [${queue.songs[0].name}](${queue.songs[0].url})**\n\n${pageContents[currentPage].map((song, index) =>
            `**${currentListNum + (index + 1)} - [${song.name}](${song.url})**`).join('\n')}\n\n`;
        description += `**Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "Todo o queue" : "Esta música" : "Desligado"}**`;
        const embed = new Discord.MessageEmbed()
            .setTitle(title)
            .setColor('RANDOM')
            .setThumbnail(queue.songs[0].thumbnail)
            .setDescription(description)
            .setFooter(`Página ${currentPage + 1} de ${num_pages} | Pedido por: ${message.author.tag}`)
            .setTimestamp();
        const msg = await message.channel.send(embed);
        if (num_pages <= 1) return;
        msg.react(pageBack);
        msg.react(pageForward);
        const filter = (reaction) => reaction.emoji.name === pageBack || reaction.emoji.name === pageForward;
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
            switch (reaction.emoji.name) {
                case pageBack: {
                    currentPage = currentPage == 0 ? pageContents.length - 1 : currentPage -= 1;
                    break;
                }
                case pageForward: {
                    currentPage = currentPage == pageContents.length - 1 ? 0 : currentPage += 1;
                    break;
                }
                case trash: {
                    msg.reactions.removeAll()
                    break;
                }
            }
            reaction.users.remove(user);
            currentListNum = ((currentPage + 1) * num_per_page) - num_per_page;
            let description = `🎵 **Agora a tocar: [${queue.songs[0].name}](${queue.songs[0].url})**\n\n${pageContents[currentPage].map((video, index) =>
                `**${currentListNum + (index + 1)} - [${video.name}](${video.url})**`).join('\n')}\n\n`;
            description += `**Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "Todo o queue" : "Esta música" : "Desligado"}**`;
            embed.setTitle(title);
            embed.setDescription(description);
            embed.setFooter(`Página ${currentPage + 1} de ${num_pages} | Pedido por: ${message.author.tag}`);
            msg.edit(embed);
        });
    }
    if ([`changevolume`, `ChangeVolume`, `CHANGEVOLUME`, `cv`, `CV`].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para mudares o volume música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        if (!distube.isPlaying(message)) return message.channel.send("<:X:748632517476745226> | Não está nada a tocar!")
        if (isNaN(args[0])) {
            message.react(":X:748632517476745226")
            const errooembed = new Discord.MessageEmbed()
                .setDescription("<:X:748632517476745226> Isso não é um número")
                .setColor("RANDOM")
            message.channel.send(errooembed)
        }
        if (!args[0]) {
            message.react(":X:748632517476745226")
            const erroembed = new Discord.MessageEmbed()
                .setDescription("<:X:748632517476745226> Especifica um número para mudar o volume.")
                .setColor("RANDOM")
            message.channel.send(erroembed)
        }
        distube.setVolume(message, args[0]);
        if (args[0] > 200) {
            distube.setVolume(message, 200);
            const errembed = new Discord.MessageEmbed()
                .setDescription(`<:X:748632517476745226> O máximo de volume é **200%**, então pus o volume a **200%** e não **${args[0]}%**.`)
                .setColor("RANDOM")
            message.channel.send(errembed)
        } else {
            distube.setVolume(message, args[0]);
            message.channel.send(`:loud_sound: | Mudei o volume para: **${args[0]}%**`)
        }
    }
    if ([`volume`, `Volume`, `VOLUME`, `v`, `V`].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para veres o volume da música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        let queue = distube.getQueue(message);
        const embed1 = new Discord.MessageEmbed()
            .setDescription(`:loud_sound: O volume da música está a: **${queue.volume}%**`)
            .setColor("RANDOM")
        message.channel.send(embed1)
    }
    if (["shuffle", "Shuffle", "SHUFFLE"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para misturares o queue!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        let queue = distube.getQueue(message);
        distube.shuffle(message)
        const embed1 = new Discord.MessageEmbed()
            .setDescription(`:twisted_rightwards_arrows: Misturei as **${queue.songs.length} músicas** que estão no queue!`)
            .setColor("RANDOM")
        message.channel.send(embed1)
    }
    if (["jump", "Jump", "JUMP"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para passares para outra música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        if (!parseInt(args[0])) {
            const erroembed = new Discord.MessageEmbed()
                .setDescription("Precisas de especificar um número para saltares.")
                .setColor("RANDOm")
            message.channel.send(erroembed)
        }
        const embed1 = new Discord.MessageEmbed()
            .setDescription(`⬆️ | Saltei para o número ${parseInt(args[0])} no queue!`)
            .setColor("RANDOM")
        message.channel.send(embed1)
        distube.jump(message, parseInt(args[0]))
    }
    if (["autoplay", "Autoplay", "AUTOPLAY", "ap", "AP"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para usares autoplay!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        let mode = distube.toggleAutoplay(message);
        message.channel.send("Autoplay está agora: `" + (mode ? "On" : "Off") + "`");
    }
    if (["playSkip", "PlaySkip", "playskip", "PLAYSKIP"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        distube.playSkip(message, args.join(" "));
        message.channel.send(":track_next: | Vou dar skip à música que está a tocar e começar a tocar a que escolheres!")
    }
    if (command === "bitch") {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        const playlistembed = new Discord.MessageEmbed()
            .setDescription(`<a:loading:751573466842529912> A carregar a playlist...`)
            .setColor("RANDOM")
        message.channel.send(playlistembed).then(msg1 => {
            distube.on("playList", (message, queue, playlist, song) => {
                playlistembed.setDescription(`🎶 Playlist **${playlist.title}** carregada, com **${playlist.total_items}** músicas`)
                msg1.edit(playlistembed)
            })
            distube.on("addList", (message, queue, playlist, song) => {
                playlistembed.setDescription(`🎶 Playlist **${playlist.title}** carregada, com **${playlist.total_items}** músicas`)
                msg1.edit(playlistembed)
            })
        })
        let songs = ["https://www.youtube.com/watch?v=6Dh-RL__uN4", "https://www.youtube.com/watch?v=YNNXTs6adIs", "https://www.youtube.com/watch?v=BuNmXYmTRQE", "https://www.youtube.com/watch?v=0oq7805Fxfw", "https://www.youtube.com/watch?v=Z9uLwuGTTFk", "https://www.youtube.com/watch?v=uoww4ou3Ark",
            "https://www.youtube.com/watch?v=KprzFp9A0kc", "https://www.youtube.com/watch?v=eoK-Ew_0Nw8", "https://www.youtube.com/watch?v=i20TUj4d8sw", "https://www.youtube.com/watch?v=34WnaTTGIKw", "https://www.youtube.com/watch?v=5FusviCrZOk", "https://www.youtube.com/watch?v=52_hLibBRzY", "https://www.youtube.com/watch?v=0uCgyy1pjyo", "https://www.youtube.com/watch?v=qlZvOytosLc"];
        distube.playCustomPlaylist(message, songs, { title: "Bitch Lasagna Playlist" });
    }
    if (command === "playlist") {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        const playlistembed = new Discord.MessageEmbed()
            .setDescription(`<a:loading:751573466842529912> A carregar a playlist (demora em média 5 a 10s)...`)
            .setColor("RANDOM")
        message.channel.send(playlistembed).then(msg1 => {
            distube.on("playList", (message, queue, playlist, song) => {
                playlistembed.setDescription(`🎶 Playlist **${playlist.title}** carregada, com **${playlist.total_items}** músicas`)
                msg1.edit(playlistembed)
            })
            distube.on("addList", (message, queue, playlist, song) => {
                playlistembed.setDescription(`🎶 Playlist **${playlist.title}** carregada, com **${playlist.total_items}** músicas`)
                msg1.edit(playlistembed)
            })
        })
        let songs = ["https://www.youtube.com/watch?v=7h7qQf03kN0&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=2&t=11s", "https://www.youtube.com/watch?v=QiFBgtgUtfw&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=5&t=0s", "https://www.youtube.com/watch?v=6Dh-RL__uN4&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=7&t=0s", "https://www.youtube.com/watch?v=PHgc8Q6qTjc&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=8&t=0s",
            "https://www.youtube.com/watch?v=PX5QgITQAwk&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=9&t=0s", "https://www.youtube.com/watch?v=kPkT0jMjEu8&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=10&t=0s", "https://www.youtube.com/watch?v=KiaSHg6BsXg&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=11&t=0s", "https://www.youtube.com/watch?v=K6VCeG7-Vk4&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=12&t=0s",
            "https://www.youtube.com/watch?v=-XsYMHm64wM&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=12", "https://www.youtube.com/watch?v=ulbGlbqWykM&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=13", "https://www.youtube.com/watch?v=3qFvCPmee8U&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=14",
            "https://www.youtube.com/watch?v=_Yhyp-_hX2s&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=15", "https://www.youtube.com/watch?v=YVkUvmDQ3HY&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=16", "https://www.youtube.com/watch?v=XbGs_qK2PQA&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=17", "https://www.youtube.com/watch?v=eJO5HU_7_1w&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=18",
            "https://www.youtube.com/watch?v=GEhNioRhedE&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=19", "https://www.youtube.com/watch?v=qq-RGFyaq0U&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=21",
            "https://www.youtube.com/watch?v=ot7q_my379o&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=26", "https://www.youtube.com/watch?v=n7UFWriNFaY&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=27",
            "https://www.youtube.com/watch?v=SFapV5LXQ1A&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=28", "https://www.youtube.com/watch?v=pmcfL_qLhMo&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=29",
            "https://www.youtube.com/watch?v=3ZdnG60BiI8&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=30", "https://www.youtube.com/watch?v=86p3aLits1A&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=31", "https://www.youtube.com/watch?v=Hk_EZpqPUf8&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=32", "https://www.youtube.com/watch?v=3n2Nc1T8ico&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=25", "https://www.youtube.com/watch?v=y6120QOlsfU&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=24",
            "https://www.youtube.com/watch?v=585W28cfz6Y&list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI&index=23", "https://www.youtube.com/watch?v=4feUSTS21-8", "https://www.youtube.com/watch?v=L_jWHffIx5E", "https://www.youtube.com/watch?v=jhExvE5fvJw", "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "https://www.youtube.com/watch?v=YgGzAKP_HuM", "https://www.youtube.com/watch?v=CuvBSg2M5vE", "https://www.youtube.com/watch?v=ydFJe6WPg-k",
            "https://www.youtube.com/watch?v=5iuKGMTHqyE", "https://youtu.be/nllEGaoGBIM", "https://youtu.be/UKjkI_bWJq0", "https://youtu.be/88qd8FxS3AM", "https://youtu.be/pIzq5BmcKF4", "https://youtu.be/9qTmFnUqoLs", "https://youtu.be/K0tXhd7u56k", "https://youtu.be/RhR_Z5wVvJM", "https://youtu.be/EsoxfvwcLCE", "https://youtu.be/UwjWu3fNkQo", "https://youtu.be/SzKZl7SkNN0", "https://youtu.be/8jJJM_WYEx0", "https://youtu.be/RKW6rjnYEkc",
            "https://youtu.be/BJms0pQpW44", "https://youtu.be/txXoCP8xngQ", "https://youtu.be/sTt026NTQfE", "https://www.youtube.com/watch?v=s9SzKx5MhpM", "https://www.youtube.com/watch?v=EK_3Cb_mEh4", "https://youtu.be/sDXhJMHnrrg", "https://www.youtube.com/watch?v=PayvWj2piKg", "https://www.youtube.com/watch?v=w2go00Gjoa4", "https://www.youtube.com/watch?v=oLHU1Zmoh84", "https://www.youtube.com/watch?v=dgha9S39Y6M&list=PLjltEa94wx5yDPUNAjgxu0-NfdDOgYaCf&index=219",
            "https://www.youtube.com/watch?v=GnrwM7vFn_U&list=PLjltEa94wx5yDPUNAjgxu0-NfdDOgYaCf&index=20", "https://www.youtube.com/watch?v=dtER80sOjX4&list=PLjltEa94wx5yDPUNAjgxu0-NfdDOgYaCf&index=41", "https://www.youtube.com/watch?v=KDRAhiBtOrQ&list=PLjltEa94wx5yDPUNAjgxu0-NfdDOgYaCf&index=83", "https://www.youtube.com/watch?v=bdFk35yT0ac", "https://www.youtube.com/watch?v=Pg5rnIA0K1Y", "https://www.youtube.com/watch?v=equC7GEUt6k", "https://www.youtube.com/watch?v=j1nBHZGdGv4", "https://www.youtube.com/watch?v=cL3mYDMiUgM",
            "https://www.youtube.com/watch?v=mVg_l2Fbw6U", "https://www.youtube.com/watch?v=SjtyGDOPgRw", "https://www.youtube.com/watch?v=EhsctRzRx0s", "https://www.youtube.com/watch?v=rbcnKcyI7o4", "https://www.youtube.com/watch?v=Di0nAk2_Tpw", "https://www.youtube.com/watch?v=5EAlQKIfUKg", "https://www.youtube.com/watch?v=Y-PPpgwZq44", "https://www.youtube.com/watch?v=uT4rgTZ5GwA", "https://www.youtube.com/watch?v=KLGoiyTmko0", "https://www.youtube.com/watch?v=z_yWwBCSpSE",
            "https://www.youtube.com/watch?v=GjxTx-xPrds&list=PLjltEa94wx5yDPUNAjgxu0-NfdDOgYaCf&index=87", "https://www.youtube.com/watch?v=01Wpsc5-jxw", "https://www.youtube.com/watch?v=_aKuVAtYgv4&pbjreload=101", "https://www.youtube.com/watch?v=ndiNMhM9f7I", "https://www.youtube.com/watch?v=SaJz1cEiNVA", "https://www.youtube.com/watch?v=tqD9sMpbvYA", "https://www.youtube.com/watch?v=fHI8X4OXluQ", "https://www.youtube.com/watch?v=slGYJfPtW7c", "https://www.youtube.com/watch?v=8F47-nKaTGE", "https://www.youtube.com/watch?v=j-2DGYNXRx0",
            "https://www.youtube.com/watch?v=IeiPIINxgUs", "https://www.youtube.com/watch?v=EDIxTIi9Uzw", "https://www.youtube.com/watch?v=XyecOcRu7iM", "https://www.youtube.com/watch?v=8CdcCD5V-d8", "https://www.youtube.com/watch?v=T-PdoRXZ4Gs", "https://www.youtube.com/watch?v=MKxe1UEfRe8", "https://www.youtube.com/watch?v=AzaN7sFw9J0"];
        distube.playCustomPlaylist(message, songs, { title: "Nice :D", thumbnail: "https://wallpapercave.com/wp/wp1849755.jpg" });
    }
    if (command === "cool") {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        const playlistembed = new Discord.MessageEmbed()
            .setDescription(`<a:loading:751573466842529912> A carregar a playlist (demora em média 10s)...`)
            .setColor("RANDOM")
        message.channel.send(playlistembed).then(msg1 => {
            distube.on("playList", (message, queue, playlist, song) => {
                playlistembed.setDescription(`🎶 Playlist **${playlist.title}** carregada, com **${playlist.total_items}** músicas`)
                msg1.edit(playlistembed)
            })
            distube.on("addList", (message, queue, playlist, song) => {
                playlistembed.setDescription(`🎶 Playlist **${playlist.title}** carregada, com **${playlist.total_items}** músicas`)
                msg1.edit(playlistembed)
            })
        })
        let songs = ["https://www.youtube.com/watch?v=3n2Nc1T8ico&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=2&t=0s", "https://www.youtube.com/watch?v=7hT3imDoYfU&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=3&t=0s", "https://www.youtube.com/watch?v=ZLohS_HScwc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=4&t=0s", "https://www.youtube.com/watch?v=9qTmFnUqoLs&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=5&t=0s", "https://www.youtube.com/watch?v=4G6w-XJxYOc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=6&t=0s", "https://www.youtube.com/watch?v=GYFJjwXtsU4&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=7&t=0s", "https://www.youtube.com/watch?v=8Tu0lcl75yg&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=8&t=0s", "https://www.youtube.com/watch?v=AbIqBZWWiQQ&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=9&t=0s", "https://www.youtube.com/watch?v=yJg-Y5byMMw&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=10&t=0s", "https://www.youtube.com/watch?v=JSY6vBPunpY&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=11&t=0s", "https://www.youtube.com/watch?v=pIzq5BmcKF4&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=12&t=0s", "https://www.youtube.com/watch?v=DNwEk0gTPuc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=13&t=0s", "https://www.youtube.com/watch?v=XDNSPfIEX2o&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=14&t=0s", "https://www.youtube.com/watch?v=e4Uk22G1ASg&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=15&t=0s", "https://www.youtube.com/watch?v=gN6BQ311XV0&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=16&t=0s",
            "https://www.youtube.com/watch?v=LqD-uUZ8hFw&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=17&t=0s", "https://www.youtube.com/watch?v=nLRo25fBxGc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=18&t=0s", "https://www.youtube.com/watch?v=PbX5zPTfPXU&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=19&t=0s", "https://www.youtube.com/watch?v=rl9ES4jlUDc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=20&t=0s", "https://www.youtube.com/watch?v=wDgQdr8ZkTw&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=21&t=0s", "https://www.youtube.com/watch?v=KiaSHg6BsXg&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=22&t=0s", "https://www.youtube.com/watch?v=RKW6rjnYEkc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=23&t=0s", "https://www.youtube.com/watch?v=g-PtIjywmac&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=24&t=0s", "https://www.youtube.com/watch?v=UhVbNDEDc1k&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=25&t=0s", "https://www.youtube.com/watch?v=yDTvvOTie0w&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=26&t=0s", "https://www.youtube.com/watch?v=w9WwDddpHrg&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=27&t=0s", "https://www.youtube.com/watch?v=T4Gq9pkToS8&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=28&t=0s", "https://www.youtube.com/watch?v=iqoNoU-rm14&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=29&t=0s", "https://www.youtube.com/watch?v=RrtAC7UZOh0&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=30&t=0s", "https://www.youtube.com/watch?v=xzyRoshFFaA&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=31&t=0s", "https://www.youtube.com/watch?v=CUxAx0EWQek&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=32&t=0s", "https://www.youtube.com/watch?v=K0tXhd7u56k&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=33&t=0s",
            "https://www.youtube.com/watch?v=JkFUfjknQ6Q&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=34&t=0s", "https://www.youtube.com/watch?v=OVMuwa-HRCQ&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=35&t=0s", "https://www.youtube.com/watch?v=OkwFmybdG0Q&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=36&t=0s", "https://www.youtube.com/watch?v=cDVR6OtP9WI&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=37&t=0s", "https://www.youtube.com/watch?v=BJms0pQpW44&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=38&t=0s", "https://www.youtube.com/watch?v=qj5ZahqBfFE&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=39&t=0s", "https://www.youtube.com/watch?v=GudhUvWwe3c&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=40&t=0s", "https://www.youtube.com/watch?v=Uo6Nr1VEml8&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=41&t=0s", "https://www.youtube.com/watch?v=6jARhgo0cCA&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=42&t=0s", "https://www.youtube.com/watch?v=s20q_gJ3OXA&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=43&t=0s", "https://www.youtube.com/watch?v=7tvEFOupqn0&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=44&t=0s", "https://www.youtube.com/watch?v=X0jtXCuPw6Y&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=45&t=0s", "https://www.youtube.com/watch?v=lrpS69H1RRU&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=46&t=0s", "https://www.youtube.com/watch?v=fjM7NdnM_vc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=47&t=0s", "https://www.youtube.com/watch?v=kL8CyVqzmkc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=48&t=0s", "https://www.youtube.com/watch?v=6aWc_ZPvs9g&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=49&t=0s", "https://www.youtube.com/watch?v=4HX6nSlBGss&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=50&t=0s", "https://www.youtube.com/watch?v=88qd8FxS3AM&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=51&t=0s", "https://www.youtube.com/watch?v=U-xHQa9pPdY&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=52&t=0s",
            "https://www.youtube.com/watch?v=1doM0Q3il3M&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=53&t=0s", "https://www.youtube.com/watch?v=usXhiWE2Uc0&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=54&t=0s", "https://www.youtube.com/watch?v=Ivi1e-yCPcI&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=55&t=0s", "https://www.youtube.com/watch?v=djEBoSoiIPM&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=56&t=0s", "https://www.youtube.com/watch?v=C6HEP_jb6jc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=57&t=0s", "https://www.youtube.com/watch?v=BEmqYiutcOw&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=58&t=0s", "https://www.youtube.com/watch?v=iCHuWJpEUbM&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=59&t=0s", "https://www.youtube.com/watch?v=o0p9do2JO9c&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=60&t=0s", "https://www.youtube.com/watch?v=TGywzL-zCfQ&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=61&t=0s", "https://www.youtube.com/watch?v=OmWkLOku8pQ&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=62&t=0s", "https://www.youtube.com/watch?v=ElV5AKQpR1c&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=63&t=0s", "https://www.youtube.com/watch?v=RhR_Z5wVvJM&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=64&t=0s", "https://www.youtube.com/watch?v=8-gpAw17vhc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=65&t=0s", "https://www.youtube.com/watch?v=Xz0RUutaXN0&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=66&t=0s", "https://www.youtube.com/watch?v=N17omU8oykU&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=67&t=0s", "https://www.youtube.com/watch?v=CwOoheKKWV4&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=68&t=0s", "https://www.youtube.com/watch?v=pJSmc19NSgI&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=69&t=0s", "https://www.youtube.com/watch?v=3Q5tSQlJGBE&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=70&t=0s", "https://www.youtube.com/watch?v=8xnNsWl5QrA&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=71&t=0s", "https://www.youtube.com/watch?v=IatXU05oUE0&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=72&t=0s", "https://www.youtube.com/watch?v=_BWPNPtsZm8&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=73&t=0s", "https://www.youtube.com/watch?v=8jJJM_WYEx0&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=74&t=0s", "https://www.youtube.com/watch?v=srRGb5YbyNE&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=75&t=0s", "https://www.youtube.com/watch?v=UG3k1ZlIpAc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=76&t=0s",
            "https://www.youtube.com/watch?v=ZviwUUJA8wo&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=77&t=0s", "https://www.youtube.com/watch?v=BS3_WQERfww&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=78&t=0s", "https://www.youtube.com/watch?v=IFtC_Yf8smQ&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=79&t=0s", "https://www.youtube.com/watch?v=TZnHlEm_oG0&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=80&t=0s", "https://www.youtube.com/watch?v=9s5FhDPLOWM&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=81&t=0s", "https://www.youtube.com/watch?v=LfgzPpmjM0M&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=82&t=0s", "https://www.youtube.com/watch?v=TC_MtNC-SuM&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=83&t=0s", "https://www.youtube.com/watch?v=v4Za061pQac&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=84&t=0s", "https://www.youtube.com/watch?v=Rs96wQyBkxA&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=85&t=0s", "https://www.youtube.com/watch?v=BSW-Uiicg4c&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=86&t=0s", "https://www.youtube.com/watch?v=AiFhpjNqGNg&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=87&t=0s", "https://www.youtube.com/watch?v=jkE4JVoDK-0&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=88&t=0s", "https://www.youtube.com/watch?v=Y-dL1q_OHds&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=89&t=0s", "https://www.youtube.com/watch?v=Dlb9od9KksY&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=90&t=0s", "https://www.youtube.com/watch?v=UvOmSa6kvCc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=91&t=0s", "https://www.youtube.com/watch?v=MLB8tSA2GFA&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=92&t=0s", "https://www.youtube.com/watch?v=G7LZTnUhXPU&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=93&t=0s", "https://www.youtube.com/watch?v=ugqJaGTa_0o&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=94&t=0s", "https://www.youtube.com/watch?v=Y15C6oh16tM&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=95&t=0s", "https://www.youtube.com/watch?v=vr-JMCFHT-s&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=96&t=0s", "https://www.youtube.com/watch?v=Js1tkO4Pa4U&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=97&t=0s", "https://www.youtube.com/watch?v=EsoxfvwcLCE&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=98&t=0s", "https://www.youtube.com/watch?v=8UG1A2B8lZY&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=100&t=0s", "https://www.youtube.com/watch?v=M5SQFLnf77k&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=101&t=0s", "https://www.youtube.com/watch?v=GAYgd9BysxI&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=102&t=0s", "https://www.youtube.com/watch?v=qmGauoXbREY&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=103&t=0s", "https://www.youtube.com/watch?v=0DsgvTnGzFg&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=104&t=0s", "https://www.youtube.com/watch?v=34ECZ1CIexQ&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=105&t=0s", "https://www.youtube.com/watch?v=aWubvX-OreM&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=106&t=0s", "https://www.youtube.com/watch?v=kqWOyfNt5l8&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=107&t=0s", "https://www.youtube.com/watch?v=0ihtdOeTRqc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=108&t=0s", "https://www.youtube.com/watch?v=ZX3RSrOjMZg&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=109&t=0s", "https://www.youtube.com/watch?v=bwyylmUwKvA&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=110&t=0s", "https://www.youtube.com/watch?v=eakT0od-gY0&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=111&t=0s", "https://www.youtube.com/watch?v=yERNy9Dj8Pc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=112&t=0s", "https://www.youtube.com/watch?v=O_NP8RF2Owc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=113&t=0s", "https://www.youtube.com/watch?v=nsR3WDvCUdU&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=114&t=0s", "https://www.youtube.com/watch?v=KrKRr2esnyc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=115&t=0s", "https://www.youtube.com/watch?v=_PoVcAWtIeE&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=116&t=0s",
            "https://www.youtube.com/watch?v=bgEvPLDKrw8&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=117&t=0s", "https://www.youtube.com/watch?v=jgoSfG8HvaI&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=118&t=0s", "https://www.youtube.com/watch?v=atzxTaozLI0&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=119&t=0s", "https://www.youtube.com/watch?v=yxx3fXv1uY0&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=120&t=0s", "https://www.youtube.com/watch?v=nMbx8EurE0g&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=121&t=0s", "https://www.youtube.com/watch?v=fc1tg9qkGyI&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=122&t=0s", "https://www.youtube.com/watch?v=pWCXHQ6CCPU&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=123&t=0s", "https://www.youtube.com/watch?v=dFhDRo3247o&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=124&t=0s", "https://www.youtube.com/watch?v=02nX4Lh48us&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=125&t=0s", "https://www.youtube.com/watch?v=mPrxJMMrFFI&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=126&t=0s", "https://www.youtube.com/watch?v=OflRilRLAUs&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=127&t=0s", "https://www.youtube.com/watch?v=nesjYuYUhh4&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=128&t=0s", "https://www.youtube.com/watch?v=ZGr7hE4Ooqc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=129&t=0s", "https://www.youtube.com/watch?v=73YrXbuHzx8&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=130&t=0s", "https://www.youtube.com/watch?v=79AABrgMqMQ&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=131&t=0s", "https://www.youtube.com/watch?v=bCtCPUzPvgI&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=132&t=0s", "https://www.youtube.com/watch?v=BXgLQRSnMwc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=133&t=0s", "https://www.youtube.com/watch?v=hW5QIZvZE3g&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=134&t=0s", "https://www.youtube.com/watch?v=txXoCP8xngQ&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=135&t=0s", "https://www.youtube.com/watch?v=poWpo76mH_0&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=136&t=0s", "https://www.youtube.com/watch?v=v_qQxQJ8rUE&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=137&t=0s", "https://www.youtube.com/watch?v=UwjWu3fNkQo&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=138&t=0s", "https://www.youtube.com/watch?v=O6q1TpmnbWc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=139&t=0s", "https://www.youtube.com/watch?v=zqF0t0dRrOg&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=140&t=0s", "https://www.youtube.com/watch?v=UKjkI_bWJq0&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=141&t=0s", "https://www.youtube.com/watch?v=2zyH1A5fgyw&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=142&t=0s", "https://www.youtube.com/watch?v=q9LqCb8WnSw&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=143&t=0s", "https://www.youtube.com/watch?v=9HeWAuf8ucM&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=144&t=0s", "https://www.youtube.com/watch?v=ntyKeEjd46U&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=145&t=0s", "https://www.youtube.com/watch?v=3aeSiPZ9i9I&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=146&t=0s", "https://www.youtube.com/watch?v=dDJDwxsda3E&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=147&t=0s", "https://www.youtube.com/watch?v=nitJh_mDT_8&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=148&t=0s", "https://www.youtube.com/watch?v=4_QVIebdlGo&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=149&t=0s", "https://www.youtube.com/watch?v=0FWigSmSXHw&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=150&t=0s", "https://www.youtube.com/watch?v=2-uZplR-Mbk&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=151&t=0s", "https://www.youtube.com/watch?v=yInXkDjmE6o&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=152&t=0s", "https://www.youtube.com/watch?v=UzLcptic_r8&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=153&t=0s", "https://www.youtube.com/watch?v=85mPOfUvV00&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=154&t=0s", "https://www.youtube.com/watch?v=UyyA_DcqCfk&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=155&t=0s", "https://www.youtube.com/watch?v=69PRNh1WIBw&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=156&t=0s", "https://www.youtube.com/watch?v=5x2OoliPhOI&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=157&t=0s", "https://www.youtube.com/watch?v=KOJaHC3eEbc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=158&t=0s", "https://www.youtube.com/watch?v=3XrbWS5-5cU&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=159&t=0s", "https://www.youtube.com/watch?v=77eqdmxSKyI&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=160&t=0s", "https://www.youtube.com/watch?v=BZ8y0qx7fWE&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=161&t=0s",
            "https://www.youtube.com/watch?v=sTt026NTQfE&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=162&t=0s", "https://www.youtube.com/watch?v=5iuKGMTHqyE&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=163&t=0s", "https://www.youtube.com/watch?v=nWzj2YxsRSo&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=164&t=0s", "https://www.youtube.com/watch?v=aDJ-bqOkzqY&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=165&t=0s", "https://www.youtube.com/watch?v=4ZROUm581ys&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=166&t=0s", "https://www.youtube.com/watch?v=IZlsHSGKP6g&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=167&t=0s", "https://www.youtube.com/watch?v=ZPLKJOBD04M&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=168&t=0s", "https://www.youtube.com/watch?v=0X1Gnum_cEM&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=169&t=0s", "https://www.youtube.com/watch?v=8aehhy8Ei48&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=170&t=0s", "https://www.youtube.com/watch?v=UivNH-S7hkM&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=171&t=0s", "https://www.youtube.com/watch?v=qql97uZI0-M&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=172&t=0s", "https://www.youtube.com/watch?v=1-Hethihxh4&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=173&t=0s", "https://www.youtube.com/watch?v=983ocD7xwBg&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=174&t=0s", "https://www.youtube.com/watch?v=iya93XLERm0&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=175&t=0s", "https://www.youtube.com/watch?v=tOZNh8veU_Y&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=176&t=0s", "https://www.youtube.com/watch?v=SzKZl7SkNN0&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=177&t=0s", "https://www.youtube.com/watch?v=-Bb8YXoq91M&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=179&t=0s", "https://www.youtube.com/watch?v=hVwW3HHPSvE&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=180&t=0s", "https://www.youtube.com/watch?v=ZKwQOAH8-Ao&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=181&t=0s", "https://www.youtube.com/watch?v=dpxKDBk69sg&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=182&t=0s", "https://www.youtube.com/watch?v=nllEGaoGBIM&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=183&t=0s", "https://www.youtube.com/watch?v=sDXhJMHnrrg&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=184&t=38s", "https://www.youtube.com/watch?v=G6BaWPC4MQc&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=186&t=0s", "https://www.youtube.com/watch?v=SDiJiGuUeBo&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=187&t=0s", "https://www.youtube.com/watch?v=6y_NJg-xoeE&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=188&t=0s", "https://www.youtube.com/watch?v=bu9NYAEXnHQ&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=189&t=0s", "https://www.youtube.com/watch?v=wb7xqXciOnE&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=190&t=0s", "https://www.youtube.com/watch?v=9eZ_EEQxNNI&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=191&t=0s", "https://www.youtube.com/watch?v=lRNzBJ8sHak&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=192&t=0s", "https://www.youtube.com/watch?v=LdF0IYHFDZk&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=193&t=0s", "https://www.youtube.com/watch?v=F3B6qKchtzo&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=194&t=0s", "https://www.youtube.com/watch?v=OUkkaqSNduU&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=195&t=0s", "https://www.youtube.com/watch?v=4qqfoMKAmiA&list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN&index=196&t=0s"]
        distube.playCustomPlaylist(message, songs, { title: "COOL!!!" });

    }
    if (command === "reddit") {
        let Subreddit = message.content.slice(8);
        if (!Subreddit) {
            message.react(":X:748632517476745226")
            return message.channel.send(`**Não especificaste um Subreddit!**`);
        }
        let img = await api(Subreddit, true);
        const Embed = new Discord.MessageEmbed()
            .setTitle(`Um meme aleatório do r/${Subreddit}`)
            .setColor("RANDOM")
            .setImage(img)
            .setURL(`https://reddit.com/r/${Subreddit}`)
            .setTimestamp()
        message.channel.send(Embed);
    }
    if (command === "meme") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/memes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments}`)
            embed.setTimestamp()
            message.channel.send(embed);
        })
    }
    if (command === "facepalm") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/facepalm/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments}`)
            embed.setTimestamp()
            message.channel.send(embed);
        })
    }
    if (command === "sports") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/SportsMemes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments}`)
            embed.setTimestamp()
            message.channel.send(embed);
        })
    }
    if (command === "4chan") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/greentext/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments}`)
            embed.setTimestamp()
            message.channel.send(embed);
        })
    }
    if (command === "twitter") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/bestoftwitter/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments}`)
            embed.setTimestamp()
            message.channel.send(embed);
        })
    }
    if (command === "minecraftmeme") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/MinecraftMemes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments}`)
            embed.setTimestamp()
            message.channel.send(embed);
        })
    }
    if (command === "discordmeme") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/Discordmemes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments}`)
            embed.setTimestamp()
            message.channel.send(embed);
        })
    }
    if (command === "wholesome") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/wholesomememes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments}`)
            embed.setTimestamp()
            message.channel.send(embed);
        })
    }
    if (command === "cursed") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/cursedimages/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`Cursed! | 👍 ${memeUpvotes} | 💬 ${memeNumComments}`)
            embed.setTimestamp()
            message.channel.send(embed);
        })
    }
    if (command === "food") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/FoodPorn/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments}`)
            embed.setTimestamp()
            message.channel.send(embed);
        })
    }
    if (command === "comic") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/comics/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments}`)
            embed.setTimestamp()
            message.channel.send(embed);
        })
    }
    if (command === "meirl") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/me_irl/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments}`)
            embed.setTimestamp()
            message.channel.send(embed);
        })
    }
    if (command === "animais") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/aww/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments}`)
            embed.setTimestamp()
            message.channel.send(embed);
        })
    }
    if (command === "starwars") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/StarWarsMemes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} | 💬 ${memeNumComments}`)
            embed.setTimestamp()
            message.channel.send(embed);
        })
    }
    if (message.content === `${prefix}categorias`) {
        message.react(":tick:748569437589995731")
        const help = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle("Comandos do Bot dos Bostas")
            .setDescription("**Bot feito por: TonaS#9344**")
            .addFields(
                { name: "<:super_mega_laugh:738387807260770347> Fun:", value: `\`${prefix}help fun\``, inline: true },
                { name: ":wrench: Info e Mod:", value: `\`${prefix}help infomod\``, inline: true },
                { name: ":dog: Animais", value: `\`${prefix}help animais\``, inline: true },
                { name: "<:youtube:748576732642148472> Música", value: `\`${prefix}help música\``, inline: true },
                { name: "<:pepesad:749210746499498015> Meme", value: `\`${prefix}help meme\``, inline: true },
                { name: ":camera: Imagens", value: `\`${prefix}help imagens\``, inline: true },
            )
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(`Usa sempre ${prefix} antes de todos os comandos`, client.user.displayAvatarURL())
        message.channel.send(help)
    }
    if (message.content === `${prefix}help`) {
        message.react(":tick:748569437589995731")
        const ajuda = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Lista de comandos do Bot!")
            .setDescription("**Todas as categorias de comandos:**\n``` ℹ️  Info\n⚙️ Moderação\n📷 Imagens\n😆 Fun\n🤣 Memes\n🎵 Música\n🐶 Animais```")
            .setTimestamp()
            .setFooter(`Pedido por ${message.member.displayName}`, message.author.displayAvatarURL({Size: 32}))   
      message.channel.send(ajuda).then(msg => {
        msg.react('ℹ️').then(r => {
            msg.react('⚙️').then(r => {
                msg.react('😆').then(r => {
                    msg.react('🤣').then(r => {
                        msg.react('🎵').then(r => {
                            msg.react('🐶').then(r => {
                                msg.react('📷').then(r => {
                                })
                            })
                        })
                    })
                })
            })
        })
        const infosFilter = (reaction, user) => reaction.emoji.name === 'ℹ️' && user.id === message.author.id;
        const admFilter = (reaction, user) => reaction.emoji.name === '⚙️' && user.id === message.author.id;
        const funFilter = (reaction, user) => reaction.emoji.name === '😆' && user.id === message.author.id;
        const memFilter = (reaction, user) => reaction.emoji.name === '🤣' && user.id === message.author.id;
        const muFilter = (reaction, user) => reaction.emoji.name === '🎵' && user.id === message.author.id;
        const aniFilter = (reaction, user) => reaction.emoji.name === '🐶' && user.id === message.author.id;
        const imaFilter = (reaction, user) => reaction.emoji.name === '📷' && user.id === message.author.id;
        const infos = msg.createReactionCollector(infosFilter);
        const adm = msg.createReactionCollector(admFilter);
        const fun = msg.createReactionCollector(funFilter);
        const mem = msg.createReactionCollector(memFilter);
        const mu = msg.createReactionCollector(muFilter);
        const ani = msg.createReactionCollector(aniFilter);
        const ima = msg.createReactionCollector(imaFilter);
        adm.on('collect', (r2, user) => {
            r2.users.remove(user)
            ajuda.setTitle(":gear: • Mod [17]")
            ajuda.setDescription(`\`clear\`, \`poll\`, \`announce\`, \`report\`, \`ban\`, \`kick\`, \`mute\`, \`warn\`, \`lock\`, \`giveaway\`, \`giverole\`, \`delrole\`, \`hasrole\`, \`slowmode\`, \`setprefix\`, \`createticket\`, \`ticket close\`.`)
            msg.edit(ajuda)
        })
        infos.on('collect', (r2, user) => {
            r2.users.remove(user)
            ajuda.setTitle(":information_source: • Info [21]")
            ajuda.setDescription(`\`userinfo\`, \`ping\`, \`covid\`, \`uptime\`, \`steam\`, \`invite\`, \`help-eng\`, \`weather\`, \`instagram\`, \`stats\`, \`yt\`, \`math\`, \`urban\`, \`fortnite\`, \`kpop\`, \`name\`, \`define\`, \`acrónimo\`, \`rhymer\`, \`sobre\`, \`categorias\`.`)
            msg.edit(ajuda)
        })
        fun.on('collect', (r2, user) => {
            r2.users.remove(user)
            ajuda.setTitle("<:super_mega_laugh:738387807260770347> • Fun [28]")
            ajuda.setDescription(`\`randomfacts\`, \`8ball\`, \`slap\`, \`roast\`, \`neves\`, \`exposesezul\`, \`p!ng\`, \`pong\`, \`crepper\`, \`rps\`, \`flip\`, \`minesweeper\`, \`badjoke\`, \`advice\`, \`isretarded\`, \`say\`, \`isgamer\`, \`isgay\`, \`issimp\`, \`lenny\`, \`captcha\`, \`pp\`, \`isloli\`, \`iswaifu\`, \`isanimegirl\`, \`isdank\`, \`istoxic\`, \`no-u\`.`)
            msg.edit(ajuda)
        })
        mem.on('collect', (r2, user) => {
            r2.users.remove(user)
            ajuda.setTitle("<:pepesad:749210746499498015> • Meme [12]")
            ajuda.setDescription(`\`meme\`, \`reddit\`, \`twitter\`, \`meirl\`, \`comic\`, \`twitter\`, \`wholesome\`, \`discordmeme\`, \`minecraftmeme\`, \`4chan\`, \`sports\`, \`facepalm\`.`)
            msg.edit(ajuda)
        })
        mu.on('collect', (r2, user) => {
            r2.users.remove(user)
            ajuda.setTitle("<:youtube:748576732642148472> • Música [30]")
            ajuda.setDescription(`\`play ou p\`, \`search\`, \`stop ou leave\`, \`skip\`, \`pause\`, \`resume\`, \`autoplay\`, \`shuffle\`, \`queue ou q\`, \`volume\`, \`jump\`, \`repeat ou loop\`, \`playSkip\`, \`playlist\`, \`bitch\`, \`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`, \`haas\`, \`reverse\`, \`flanger\`, \`gate\`, \`np ou nowplaying\`, \`changevolume ou cv\`, \`loopnow\`, \`autoplaynow\`, \`clearqueue\`, \`remove\`.`)
            msg.edit(ajuda)
        })
        ani.on('collect', (r2, user) => {
            r2.users.remove(user)
            ajuda.setTitle(":dog: • Animais [10]")
            ajuda.setDescription(`\`dogs\`, \`cats\`, \`quacc\`, \`foxsays\`, \`mrlizard\`, \`panda\`, \`animais\`, \`snake\`, \`ferret\`, \`goose\`.`)
            msg.edit(ajuda)
        })
        ima.on('collect', (r2, user) => {
            r2.users.remove(user)
            ajuda.setTitle(":camera: • Imagens [18]")
            ajuda.setDescription(`\`inverse\`, \`wanted\`, \`minecraft\`, \`cursedimg\`, \`food\`, \`animepunch\`, \`shit\`, \`delete\`, \`trash\`, \`hitler\`, \`greyscale\`, \`deepfry\`, \`beautiful\`, \`affect\`, \`gif\`, \`randomgif\`, \`sticker\`, \`randomsticker\`.`)
            msg.edit(ajuda)
        })
      }) 
    }
    if (message.content === `${prefix}help all`) {
        message.react(":tick:748569437589995731") //131 comandos fds
        const userEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Lista de Comandos", client.user.displayAvatarURL())
            .setDescription(`<:discord1:748909489293492376> **Server de Suporte:** [Link](https://discord.gg/fnvdugV)\n<:botdosbostas:748908984181850172> **Invite do Bot:** [Link](https://discord.com/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot)\n<:github:748909140084129872> **Github Repository:** [Link](https://github.com/TonaS21/bot-dos-bostas)`)
            .addField(":information_source: • Info [21]", `\`userinfo\`, \`ping\`, \`covid\`, \`uptime\`, \`steam\`, \`invite\`, \`help-eng\`, \`weather\`, \`instagram\`, \`stats\`, \`yt\`, \`math\`, \`urban\`, \`fortnite\`, \`kpop\`, \`name\`, \`define\`, \`acrónimo\`, \`rhymer\`, \`sobre\`, \`categorias\`.`)
            .addField(":gear: • Mod [17]", `\`clear\`, \`poll\`, \`announce\`, \`report\`, \`ban\`, \`kick\`, \`mute\`, \`warn\`, \`lock\`, \`giveaway\`, \`giverole\`, \`delrole\`, \`hasrole\`, \`slowmode\`, \`setprefix\`, \`createticket\`, \`ticket close\`.`)
            .addField(":camera: • Imagens [18]", `\`inverse\`, \`wanted\`, \`minecraft\`, \`cursedimg\`, \`food\`, \`animepunch\`, \`shit\`, \`delete\`, \`trash\`, \`hitler\`, \`greyscale\`, \`deepfry\`, \`beautiful\`, \`affect\`, \`gif\`, \`randomgif\`, \`sticker\`, \`randomsticker\`.`)
            .addField("<:super_mega_laugh:738387807260770347> • Fun [28]", `\`randomfacts\`, \`8ball\`, \`slap\`, \`roast\`, \`neves\`, \`exposesezul\`, \`p!ng\`, \`pong\`, \`crepper\`, \`rps\`, \`flip\`, \`minesweeper\`, \`badjoke\`, \`advice\`, \`isretarded\`, \`say\`, \`isgamer\`, \`isgay\`, \`issimp\`, \`lenny\`, \`captcha\`, \`pp\`, \`isloli\`, \`iswaifu\`, \`isanimegirl\`, \`isdank\`, \`istoxic\`, \`no-u\`.`)
            .addField("<:pepesad:749210746499498015> • Meme [12]", `\`meme\`, \`reddit\`, \`twitter\`, \`meirl\`, \`comic\`, \`twitter\`, \`wholesome\`, \`discordmeme\`, \`minecraftmeme\`, \`4chan\`, \`sports\`, \`facepalm\`.`)
            .addField("<:youtube:748576732642148472> • Música [30]", `\`play ou p\`, \`search\`, \`stop ou leave\`, \`skip\`, \`pause\`, \`resume\`, \`autoplay\`, \`shuffle\`, \`queue ou q\`, \`volume\`, \`jump\`, \`repeat ou loop\`, \`playSkip\`, \`playlist\`, \`bitch\`, \`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`, \`haas\`, \`reverse\`, \`flanger\`, \`gate\`, \`np ou nowplaying\`, \`changevolume ou cv\`, \`loopnow\`, \`autoplaynow\`, \`clearqueue\`, \`remove\`.`)
            .addField(":dog: • Animais [10]", `\`dogs\`, \`cats\`, \`quacc\`, \`foxsays\`, \`mrlizard\`, \`panda\`, \`animais\`, \`snake\`, \`ferret\`, \`goose\`.`)
            .setFooter(`Pedido por(a): ${message.member.displayName}`, message.author.displayAvatarURL())
            .setTimestamp()
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help imagens`) {
        message.react(":tick:748569437589995731")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("Comandos:", `\`inverse\`, \`wanted\`, \`minecraft\`, \`cursedimg\`, \`food\`, \`animepunch\`, \`shit\`, \`delete\`, \`trash\`, \`hitler\`, \`greyscale\`, \`deepfry\`, \`beautiful\`, \`affect\`, \`gif\`, \`randomgif\`, \`sticker\`, \`randomsticker\`, \`blur\`.`)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help animais`) {
        message.react(":tick:748569437589995731")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("Comandos:", `\`dogs\`, \`cats\`, \`quacc\`, \`foxsays\`, \`mrlizard\`, \`panda\`, \`animais\`, \`snake\`, \`ferret\`, \`goose\`.`)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help infomod`) {
        message.react(":tick:748569437589995731")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("Comandos:", `\`userinfo\`, \`clear\`, \`poll\`, \`announce\`, \`ping\`, \`report\`, \`ban\`, \`kick\`, \`mute\`, \`warn\`, \`covid\`, \`uptime\`, \`steam\`, \`help-eng\`, \`invite\`, \`weather\`, \`instagram\`, \`lock\`, \`stats\`, \`yt\`, \`math\`, \`giveaway\`, \`giverole\`, \`delrole\`, \`hasrole\`, \`urban\`, \`fortnite\`, \`slowmode\`, \`kpop\`, \`name\`, \`define\`, \`acrónimo\`, \`rhymer\`, \`sobre\`, \`categorias\`.`)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help meme`) {
        message.react(":tick:748569437589995731")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("Comandos:", `\`meme\`, \`reddit\`, \`twitter\`, \`meirl\`, \`comic\`, \`twitter\`, \`wholesome\`, \`discordmeme\`, \`minecraftmeme\`, \`4chan\`, \`sports\`, \`facepalm\`.`)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help fun`) {
        message.react(":tick:748569437589995731")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("Comandos:", `\`randomfacts\`, \`8ball\`, \`slap\`, \`roast\`, \`neves\`, \`exposesezul\`, \`p!ng\`, \`pong\`, \`crepper\`, \`rps\`, \`flip\`, \`minesweeper\`, \`badjoke\`, \`advice\`, \`isretarded\`, \`say\`, \`isgamer\`, \`isgay\`, \`issimp\`, \`lenny\`, \`captcha\`, \`pp\`, \`isloli\`, \`iswaifu\`, \`isanimegirl\`, \`isdank\`, \`riccroll\`, \`bob\``)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help música`) {
        message.react(":tick:748569437589995731")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("Comandos de música:", `\`play ou p\`, \`join\`, \`search\`, \`stop ou leave\`, \`skip\`, \`pause\`, \`resume\`, \`autoplay\`, \`shuffle\`, \`queue ou q\`, \`volume\`, \`jump\`, \`repeat ou loop\`, \`playSkip\`, \`playlist\`, \`bitch\`, \`np ou nowplaying\`, \`changevolume ou cv\`, \`loopnow\`, \`autoplaynow\`, \`clearqueue\`.`)
            .addField("Filtros de música:", `\`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`, \`haas\`, \`reverse\`, \`flanger\`, \`gate\`.`)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help-eng`) {
        message.react(":tick:748569437589995731")
        const userEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Command List", client.user.displayAvatarURL())
            .setDescription(`<:discord1:748909489293492376> **Support Server:** [Link](https://discord.gg/fnvdugV)\n<:botdosbostas:748908984181850172> **Invite the bot:** [Link](https://discord.com/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot)\n<:github:748909140084129872> **Github Repository:** [Link](https://github.com/TonaS21/bot-dos-bostas)`)
            .addField(":information_source: Info", `\`userinfo\`, \`ping\`, \`covid\`, \`uptime\`, \`steam\`, \`invite\`, \`help-eng\`, \`weather\`, \`instagram\`, \`stats\`, \`yt\`, \`math\`, \`urban\`, \`fortnite\`, \`kpop\`, \`name\`, \`define\`, \`acrónimo\`, \`rhymer\`, \`sobre\`, \`categorias\``)
            .addField(":gear: Mod", `\`clear\`, \`poll\`, \`announce\`, \`report\`, \`ban\`, \`kick\`, \`mute\`, \`warn\`, \`lock\`, \`giveaway\`, \`giverole\`, \`delrole\`, \`hasrole\`, \`slowmode\`.`)
            .addField(":camera: Images", `\`inverse\`, \`wanted\`, \`minecraft\`, \`cursedimg\`, \`food\`, \`animepunch\`, \`shit\`, \`delete\`, \`trash\`, \`hitler\`, \`greyscale\`, \`deepfry\`, \`beautiful\`, \`affect\`, \`gif\`, \`randomgif\`, \`sticker\`, \`randomsticker\`.`)
            .addField("<:super_mega_laugh:738387807260770347> Fun", `\`randomfacts\`, \`8ball\`, \`slap\`, \`roast\`, \`neves\`, \`exposesezul\`, \`p!ng\`, \`pong\`, \`crepper\`, \`rps\`, \`flip\`, \`minesweeper\`, \`badjoke\`, \`advice\`, \`isretarded\`, \`say\`, \`isgamer\`, \`isgay\`, \`issimp\`, \`lenny\`, \`captcha\`, \`pp\`, \`isloli\`, \`iswaifu\`, \`isanimegirl\`, \`isdank\`.`)
            .addField("<:pepesad:749210746499498015> Meme", `\`meme\`, \`reddit\`, \`twitter\`, \`meirl\`, \`comic\`, \`twitter\`, \`wholesome\`, \`discordmeme\`, \`minecraftmeme\`, \`4chan\`, \`sports\`, \`facepalm\`.`)
            .addField("<:youtube:748576732642148472> Music", `\`play ou p\`, \`search\`, \`stop ou leave\`, \`skip\`, \`pause\`, \`resume\`, \`autoplay\`, \`shuffle\`, \`queue ou q\`, \`volume\`, \`jump\`, \`repeat ou loop\`, \`playSkip\`, \`playlist\`, \`bitch\`, \`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`, \`haas\`, \`reverse\`, \`flanger\`, \`gate\`, \`np ou nowplaying\`, \`clearqueue\`.`)
            .addField(":dog: Animals", `\`dogs\`, \`cats\`, \`quacc\`, \`foxsays\`, \`mrlizard\`, \`panda\`, \`animais\`.`)
            .setFooter(`Requested by: ${message.member.displayName}`, message.author.displayAvatarURL())
            .setTimestamp()
        message.channel.send(userEmbed);
    }
    if (command === "userinfo") {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        if (member.presence.status === 'dnd') member.presence.status = 'Não Incomodar';
        if (member.presence.status === 'online') member.presence.status = 'Online';
        if (member.presence.status === 'idle') member.presence.status = 'Ausente';
        if (member.presence.status === 'offline') member.presence.status = 'Offline';
        let x = Date.now() - member.createdAt;
        let y = Date.now() - message.guild.members.cache.get(member.id).joinedAt;
        const joined = Math.floor(y / 86400000);
        const joineddate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
        let status = member.presence.status;
        const userEmbed = new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setTimestamp()
            .setColor('RANDOM')
            .setImage(member.user.displayAvatarURL())
            .addField("Member ID", member.id)
            .addField('Roles', `<@&${member._roles.join('> <@&')}>`)
            .addField("Conta criada a:", ` ${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`, true)
            .addField('Entrou no server a:', `${joineddate} \n> ${joined} dia(s) `)
            .addField("Estado", status)
        message.channel.send(userEmbed);
    }
    if (["riccroll", "rickroll"].includes(command)) {
        message.channel.send("**Ah, You just got Ricc Rolled**\n\nWe're no strangers to love\nYou know the rules and so do I\nA full commitment's what I'm thinking of\nYou wouldn't get this from any other guy\nI just wanna tell you how I'm feeling\nGotta make you understand\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\nWe've known each other for so long\nYour heart's been aching but you're too shy to say it\nInside we both know what's been going on\nWe know the game and we're gonna play it\nAnd if you ask me how I'm feeling\nDon't tell me you're too blind to see\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\nNever gonna give, never gonna give\n(Give you up)\n(Ooh) Never gonna give, never gonna give\n(Give you up)\nWe've known each other for so long\nYour heart's been aching but you're too shy to say it\nInside we both know what's been going on\nWe know the game and we're gonna play it\nI just wanna tell you how I'm feeling\nGotta make you understand\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry")
    }
    if (command === "bob") {
        message.channel.send("░░░░░▄▄▄░░▄██▄░░░\n░░░░░▐▀█▀▌░░░░▀█▄░░░\n░░░░░▐█▄█▌░░░░░░▀█▄░░\n░░░░░░▀▄▀░░░▄▄▄▄▄▀▀░░\n░░░░▄▄▄██▀▀▀▀░░░░░░░\n░░░█▀▄▄▄█▀▀░░\n░░░▌░▄▄▄▐▌▀▀▀░░ Este é o Bob\n▄░▐░░░▄▄░█░▀▀ ░░\n▀█▌░░░▄░▀█▀▀ ░░ Copia-o e cola-o em todos os servers\n░░░░░░░▄▄▐▌▄▄░░░ Para que ele possa\n░░░░░░░▀███▀█░▄░░ Dominar o Discord\n░░░░░░▐▌▀▄▀▄▀▐▄░░ Só não o spames\n░░░░░░▐▀░░░░░░▐▌░░ \n░░░░░░█░░░░░░░░█░░░░░░░\n░░░░░░█░░░░░░░░█░░░░░░░\n░░░░░░█░░░░░░░░█░░░░░░░")
    }
    if (command == "randomfacts") {
        const messages = [
            "A Mona Lisa não tem sobrancelhas.",
            "Os bebés bocejam antes de nascerem.",
            "Mais de 480 milhões de pessoas já jogaram Monopólio.",
            "Foi Leonardo da Vinci que inventou a tesoura.",
            "Hipopotomonstrosesquipedaliofobia é o medo de palavras longas.",
            "O coração tem o tamanho aproximado da mão fechada.",
            "A Nutella foi reinventada durante a Segunda Guerra Mundial, quando um italiano adicionou avelãs ao chocolate para estender a validade do produto e diminuir o preço dessa delícia. O mundo inteiro agradece.",
            "Se um gato preto passar à tua frente, quer dizer que ele quer ir a um lado seu burro",
            "Um leão só consegue rugir a partir dos 2 anos de idade.",
            "Os ursos polares são canhotos.",
            "Um bocejo dura em media 6 segundos.",
            "A maior cebola do mundo pesava tanto quanto uma cabeça humana.",
            "Há um milhão de biliões de formigas na Terra.",
            "Fortnite é uma merda.",
            "O Ivo não sabe jogar CS.",
            "TF2 é o melhor jogo de sempre.",
            "Os creepers têm medo de gatos.",
            "Se olhares para um enderman com uma abóbora na cabeça, eles fogem.",
            "Skins=Skill in CS:GO.",
            "Se estiveres dentro de uma planta com dois blocos de altura, Mobs não te vêm.",
            "O TF2 passa-se pelos anos 60 e 70.",
            "O TF2 já teve 693 updates desde que foi lançado.",
            "O TF2 não tem um major update há 1 009 dias (21/7/2020).",
            "O primeiro IPhone não foi feito pela Apple.",
            `A palavra "mate" foi banida na Austrália durante um dia XDD.`,
            "A Arábia Saudita importa camelos da Austrália.",
            "Vacas matam mais Americanos do que tubarões.",
            "No total, existem 208 armas no TF2 (sem contar com skins e itens de outras qualidades).",
            "Neste momento (19:00, 24/7/2020), o Pewdiepie tem 26.198.340.914 visualizações em total no seu canal. Mas na altura que estás a ver isto já deve ter muito mais.",]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        message.channel.send(randomMessage)
    }
    if (command == "neves") {
        message.channel.send("<:Neves2:707889036341280809> O Neves é paneleiro, O Neves é gabiru, O Neves baixa as calças para apanhar no cu! <:Neves2:707889036341280809>")
    }
    if (command == "exposesezul") {
        message.channel.send(
            `TEXTO SOBRE O SEZUL: 

<:Neves2:707889036341280809> O Sezul // /̶S̶E̶Z̶U̶L̶\̶#4572 // Antonio Miranda // Instagram: @1__seven__1 , 
@seven_garagept // <:Neves1:707888837153652827>
        
Este rapaz com 16 anos tem uma vida numa aldeia em que vive em casa dos avós com 
2 cães e uns terrenos e 5 carros velhos podres que não andam ele diz que os conduz sem 
carta de condução por isso quem quiser fazer a denuncia ja sabe! [ahah] //PSP: 217 225 200//
        
Vamos lá continuar este rapaz é muito infeliz é mais um triste que queimou a sua imagem e o seu nome só por 30€.
        
Neste momento em nome da 5035 da comunidade de gaming e de imformatica podes 
te por no caralho! Ele decidiu roubar e roubar e roubar e tambem roubou uma pistola que tem por nome revolver fake: foi roubada 
no mascarilhas! [ahah] Quem também quiser fazer queixa: https://mascarilha.pt/
        
Pronto acho que é tudo agora podes ir meter as tuas lagrimas no rio que alegas que 
o teu avô comprou!
        
///////////////////////////////////////////////////////////////////////
        
**Disclaimer**
Este comando é só a gozar, foi um gajo estúpido que tentou dar expose ao Neves e 
pensava que sabia tudo ahaha.`
        )
    }
    if (command === "8ball") {
        let args = message.content.split(" ").slice(0);
        let question = args.slice(1).join(" ");
        if (!question) {
            message.react(":X:748632517476745226")
            return message.reply('Precisas de especificar uma pergunta!');
        } else {
            let answers = ["Sim.", "Não.", "Talvez.", "Claro!", "Não sei.", "Provavelmente.", "Provavelmente não.", "Claro que não!", "Não me digas :/.", "Fode-te.", "Snão.", "És gay."]
            let response = answers[Math.floor(Math.random() * answers.length)];
            let embed = new Discord.MessageEmbed()
                .setTitle("8ball")
                .setColor("RANDOM")
                .setThumbnail("https://i.ytimg.com/vi/ADjTcV8JIss/maxresdefault.jpg")
                .setImage(message.member.user.displayAvatarURL())
                .addField('Pergunta: ', question)
                .addField('Resposta: ', response);
            message.channel.send(embed);
        }
    }
    if (command === "slap") {
        let answers = ["https://media1.tenor.com/images/3c161bd7d6c6fba17bb3e5c5ecc8493e/tenor.gif?itemid=5196956", "https://media1.tenor.com/images/49de17c6f21172b3abfaf5972fddf6d6/tenor.gif?itemid=10206784", "https://tenor.com/view/slap-slow-motion-slap-gif-10048943", "https://media1.tenor.com/images/bc858e69d5022807b84554b2d4583c10/tenor.gif?itemid=5122019", "https://media1.tenor.com/images/725a604e470a6c2768149c64fd166292/tenor.gif?itemid=16095505", "https://media1.tenor.com/images/31f29b3fcc20a486f44454209914266a/tenor.gif?itemid=17942299", "https://media1.tenor.com/images/4c87273e872b4a7fc23a37868b3f3577/tenor.gif?itemid=15003911", "https://thumbs.gfycat.com/ForkedFamousGalapagoshawk-size_restricted.gif"]
        let response = answers[Math.floor(Math.random() * answers.length)];
        const personTagged = message.mentions.members.first();
        if (!personTagged) {
            message.react(":X:748632517476745226")
            return message.reply('Precisas de especificar uma pessoa para dares uma chapada!');
        }
        const userEmbed = new Discord.MessageEmbed()
            .setTitle(message.author.username + ' deu uma chapada a ' + personTagged.displayName)
            .setColor('RED')
            .setImage(response)
            .setFooter("Quem está a ler isto é gay hehe")
            .setTimestamp()
        message.channel.send(userEmbed);
    }
    if (command === "creeper") {
        message.channel.send("Awwwww Man!")
    }
    if (command === "p!ng") {
        message.channel.send("pong!")
    }
    if (command === "pong") {
        message.channel.send("ping!")
    }
    if (command == "roast") {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const messages = [
            `You all know ${member.user}\’s is my first and most longtime friend I have. What you may not know is that he’s also the first and most longtime customer of ProActive Acne Systems. `,
            `Good lord this is an ugly group of people. Holy shit, you know the crowd is ugly when we invited ${member.user}\’s as eye candy. `,
            `And ${member.user}\’s you’re looking pretty rough this evening. ${member.user} looks like if sweatpants were a person. `,
            `Getting married to you must’ve been rough. What was your wedding song? “How Much Is That Doggy In The Window?” `,
            `${member.user}\’s is so ugly he’s been the only one ever rejected from Queer Eye for the Straight guy. `,
            `${member.user}\’s is so ugly in October when he went to the haunted house they handed his an application. `,
            `${member.user}\’s psychiatrist said he was crazy and he said he wanted a second opinion. The psychiatrist said “Okay, you’re ugly too.” `,
            `${member.user}\’s nose is so big he Apple had to make a custom iPhone that unlocks using Nose ID. `,
            `${member.user} when are you gonna buy a new outfit?? `,
            `Everyday you wear the same jeans and same flannel patterned shirt.
You’re like if Al Borland from Home Improvement learned to program a computer.`,
            `The way ${member.user} dresses looks like the first half of a commercial for antidepressants. `,
            `${member.user} is actually pretty good looking, but has a boring personality. Good looks but boring personality, you’re like real life clickbait. `,
            `${member.user} has worn the same outfit for like 10 years. Holy shit….the only person who’s worn the same clothes longer than you is Bart Simpson. `,
            `${member.user} I’m glad you and your dull personality could be here. I’m excited to hear your speech at the wedding. With your personality, I’m sure your speech will combine the thrill of talking, with the excitement of standing there. `,
            `${member.user}\'s outfit was recently featured on the cover of Yawn Magazine. `,
            `We are doing this roast tonight to help ${member.user} live out one of his sexual fantasies, to have a room full of his friends shit all over him. `,
            `A little known fact is that a long time ago ${member.user} used to work at McDonald’s. It was the last time anyone said about your work, “I’m lovin’ it.” `,
            `This is exciting ${member.user} right?? Well tell your face. `,
            `${member.user} if laughter is the best medicine, your face must be curing the world. `,
            `It’s nice to see such a diverse crowd here today. We’ve got Indians, Jews, Whites, and whatever the fuck ${member.user} is.`,
            `But ${member.user} you’re really looking good nowadays. What he has lost in weight, he has also GAINED in weight.`,
            `${member.user} I checked your Facebook, and it turns out you used to be a bit chubby. I’m impressed that you’ve managed to lose so much weight. That’s right, he lost 30 pounds on Nutrisystem, and another 10 when he shaved his back.`,
            `${member.user} you're so fat and lazy the only exercise he gets is when his Restless Leg Syndrome starts flaring up.`,
            `${member.user} you look like if the fat kid from Stranger Things wished he was big.`,
            `The church didn’t accept ${member.user}\'s gay lifestyle. So he started his own religion: The Church of Latter Day Taints. It’s like a normal church, except you’re happy when the priest fucks you.`,
            `Me and ${member.user} are really good friends but we’ve had our ups and downs, one time he actually tried to sue me for $10,000. I got really defensive and was like “You’re suing me for $10,000?? Fuck you…you can suck my dick.” and he was like, “well OK if you want to settle out of court.”`,
            `When I heard that ${member.user} finally came out of the closet I wasn’t really surprised….dude you’re so gay MY ass hurts.`,
            `I once asked ${member.user} why he dresses so flamboyantly and he got upset and hit me with his purse.`,
            `Backstage before this speech I rolled a gigantic fatty. Because that was the only way we could get ${member.user} on to the stage.`]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        message.channel.send(randomMessage)
    }
    if (command === 'urban') {
        let image = "https://is4-ssl.mzstatic.com/image/thumb/Purple111/v4/7e/49/85/7e498571-a905-d7dc-26c5-33dcc0dc04a8/source/512x512bb.jpg"
        if (!args.length) {
            message.react(":X:748632517476745226")
            return message.channel.send('Precisas de especificar um termo!')
        }
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
        if (!list.length) {
            return message.channel.send(`Nenhum resultado para o termo: **${args.join(' ')}**.`)
        }
        try {
            var embed = new Discord.MessageEmbed()
                .setAuthor('Urban Dictionary', image)
                .setDescription(list[0].definition)
                .setColor("BLUE")
                .setTimestamp()
                .setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
            message.channel.send(embed);
        }
        catch (error) {
            console.log(error)
            return message.channel.send("Parece que estragaste esta bosta! Vai pó crl.")
        }
    }
    if (command === "clear") {
        const messageArray = message.content.split(' ');
        const args = messageArray.slice(1);
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send('Sem perms!');
        let deleteAmount;
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) { return message.reply('Por favor diz-me um número!') }
        if (parseInt(args[0]) > 100) {
            return message.reply('Só consegues deletar 100 mensagens de uma vez!')
        } else {
            deleteAmount = parseInt(args[0]);
        }
        message.channel.bulkDelete(deleteAmount + 1, true);
        message.reply(`**${deleteAmount} Mensagens Deletadas.**`)
    }
    if (command === "flip") {
        const messages = [`${message.member.user}, deu **Cara**!`, `${message.member.user}, deu **Coroa**!`]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        message.channel.send(randomMessage)
    }
    if (command === "report") {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send(`Não. Simplesmente não.`);
        let User = message.mentions.users.first() || null;
        if (User == null) {
            return message.channel.send(`Não mencionaste ninguém!`);
        } else {
            let Reason = message.content.slice(config.prefix.length + 22 + 7) || null;
            if (Reason == null) {
                return message.channel.send(
                    `Não especificaste uma razão para reportar!`
                );
            }
            let Avatar = User.displayAvatarURL();
            let Channel = message.guild.channels.cache.find(
                (ch) => ch.name === "logs" //podes mudar
            );
            if (!Channel)
                return message.channel.send(
                    `Não há nenhum canal chamado: \`logs\``
                );
            let channel1 = await client.channels.cache.get("746067012341596231");
            const embed1 = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(User.tag, User.displayAvatarURL())
                .setDescription(`:warning: ${User} foi reportado por ${message.author}.`)
                .setThumbnail(User.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .addField("Razão", `${Reason.slice(1)}`)
                .setFooter(`ID do usuário: ${User.id}`)
                .setTimestamp();
            channel1.send(embed1);
            let Embed = new Discord.MessageEmbed()
                .setTitle(`Novo Report!`)
                .setDescription(
                    `O Moderador \`${message.author.username}\` reportou o usuário \`${User.username}\`! `
                )
                .setColor(`RED`)
                .setThumbnail(Avatar)
                .setTimestamp()
                .addFields(
                    { name: "Mod ID", value: `${message.author.id}`, inline: true },
                    { name: "Mod Tag", value: `${message.author.tag}`, inline: true },
                    { name: "ID Reportado", value: `${User.id}`, inline: true },
                    { name: "Tag Reportada", value: `${User.tag}`, inline: true },
                    { name: "Razão", value: `\`${Reason.slice(1)}\``, inline: true },
                    {
                        name: "Date (D/M/A)",
                        value: `${new Intl.DateTimeFormat("PT").format(Date.now())}`,
                        inline: true,
                    }
                );
            Channel.send(Embed);
        }
    }
    if (command === "ping") {
        message.reply('A calcular o ping<a:loading2:751573442037284924>...').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            resultMessage.edit(`:ping_pong: Pong! :ping_pong:\n:signal_strength: | **Bot ping ➜ ${ping}ms**\n:incoming_envelope: | **API ping ➜ ${client.ws.ping}ms**`)
        })
    }
    if (command === "announce") {
        let rChannel = message.guild.channels.cache.get(args[0]);
        if (!rChannel) return message.channel.send(`Não especificaste um chat para mandar o announcement para!`);
        let MSG = message.content.split(`${config.prefix}announce ${rChannel.id} `).join("");
        if (!MSG) return message.channel.send(`Não especificaste uma mensagem para mandar!`);
        const _ = new Discord.MessageEmbed()
            .setTitle(`Novo announcement!`)
            .setDescription(`${MSG}`)
            .setTimestamp()
            .setColor("RED")
            .setTimestamp()
        rChannel.send(_);
        message.delete();
    };
    if (command === "dogs") {
        let msg = await message.channel.send("A procurar<a:loading2:751573442037284924>")
        let { body } = await superagent.get("https://dog.ceo/api/breeds/image/random")
        if (!{ body }) return message.channel.send("Tu estragaste-me! Tenta de novo.")
        let embed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setAuthor("DOGS!", message.guild.iconURL)
            .setImage(body.message)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        message.channel.send(embed)
        msg.delete();
    }
    if (command === "ban") {
        if (!message.member.hasPermission('BAN_MEMBERS', "KICK_MEMBERS")) return message.reply("Não podes usar isso!");
        var user = message.mentions.users.first();
        if (!user) return message.reply("Não mencionaste ninguém ou estás a tentar banir um bot");
        var member;
        try {
            member = await message.guild.members.fetch(user);
        } catch (err) {
            member = null;
        }
        if (member) {
            if (member.hasPermission('KICK_MEMBERS', "BAN_MEMBERS")) return message.reply("Não podes banir essa pessoa!");
        }
        var reason = args.splice(1).join(' ');
        if (!reason) return message.reply('Precisas de dar uma razão.');
        var channel = message.guild.channels.cache.find(c => c.name === 'logs'); //podes mudar
        var log = new Discord.MessageEmbed()
            .setTitle('Usuário Banido')
            .addField('Usuário:', user, true)
            .addField('Por:', message.author, true)
            .addField('Razão:', reason)
            .setColor("BLUE")
        channel.send(log);
        let channel1 = await client.channels.cache.get("746067012341596231");
        const embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(user.tag, user.displayAvatarURL())
            .setDescription(`:outbox_tray: ${user} foi banido por ${message.author}.`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .addField("Razão", `${reason}`)
            .setFooter(`ID do usuário: ${user.id}`)
            .setTimestamp();
        channel1.send(embed1);
        var embed = new Discord.MessageEmbed()
            .setTitle("Foste Banido!")
            .setDescription(reason)
            .setColor("#F93A2F")
        try {
            await user.send(embed);
        } catch (err) {
            console.warn(err);
        }
        message.guild.members.ban(user);
        channel.send(`**${user}** foi banido por **${message.author}**!`);
    }
    if (command === "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("Não podes usar isso!");
        var user = message.mentions.users.first();
        if (!user) return message.reply("Não mencionaste ninguém ou estás a tentar mutar um bot.");
        var member;
        try {
            member = await message.guild.members.fetch(user);
        } catch (err) {
            member = null;
        }
        if (!member) return message.reply('Essa pessoa não está no server.');
        if (member.hasPermission('KICK_MEMBERS', "BAN_MEMBERS")) return message.reply('Não consegues mutar essa pessoa.');
        var rawTime = args[1];
        var time = ms(rawTime);
        let mainrole = message.guild.roles.cache.find(role => role.name === "Membro"); //podes mudar o nome do role
        if (!time) return message.reply('Não especificaste um tempo!');
        var reason = args.splice(2).join(' ');
        if (!reason) return message.reply('Precisas de dar uma razão!');
        var channel = message.guild.channels.cache.find(c => c.name === 'logs'); // podes mudar o nome do canal
        var log = new Discord.MessageEmbed()
            .setTitle('Usuário Mutado')
            .addField('Usuário:', user, true)
            .addField('Por:', message.author, true)
            .addField('Expira:', rawTime)
            .addField('Razão:', reason)
            .setColor("BLUE")
        channel.send(log);
        let channel1 = await client.channels.cache.get("746067012341596231");
        const embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(user.tag, user.displayAvatarURL())
            .setDescription(`:warning: ${user} foi mutado por ${message.author} por ${rawTime}.`)
            .addField("Razão", `${reason}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .setFooter(`ID do usuário: ${user.id}`)
            .setTimestamp();
        channel1.send(embed1);
        var embed = new Discord.MessageEmbed()
            .setTitle('Foste Mutado!')
            .addField('Expira:', rawTime, true)
            .addField('Razão:', reason, true)
            .setColor("#F93A2F")
        try {
            user.send(embed);
        } catch (err) {
            console.warn(err);
        }
        var role = message.guild.roles.cache.find(r => r.name === 'Muted');
        member.roles.remove(mainrole)
        member.roles.add(role);
        setTimeout(() => {
            var channel = message.guild.channels.cache.find(c => c.name === 'logs'); // muda também aqui se quiseres
            member.roles.add(mainrole)
            member.roles.remove(role);
            channel.send(`**${user}** foi desmutado!`);
            let channel1 = client.channels.cache.get("746067012341596231");
            const embed2 = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(user.tag, user.displayAvatarURL())
                .setDescription(`:warning: ${user} foi desmutado.`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setFooter(`ID do usuário: ${user.id}`)
                .setTimestamp();
            channel1.send(embed2);
        }, time);
        channel.send(`**${user}** foi mutado por **${message.author}** por **${rawTime}**!`);
    }
    if (command === "kick") {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply("Não podes usar isso!");
        var user = message.mentions.users.first();
        if (!user) return message.reply('Não mencionaste ninguém!');
        var member;
        try {
            member = await message.guild.members.fetch(user);
        } catch (err) {
            member = null;
        }
        if (!member) return message.reply('Essa pessoa não está no server.');
        if (member.hasPermission('MANAGE_MESSAGES')) return message.reply('Não podes kickar essa pessoa!');
        var reason = args.splice(1).join(' ');
        if (!reason) return message.reply('Precisas de dar uma razão!');
        var channel = message.guild.channels.cache.find(c => c.name === 'logs'); //podes mudar
        var log = new Discord.MessageEmbed()
            .setTitle('Usuário Kickado')
            .addField('Usuário', user, true)
            .addField('Por:', message.author, true)
            .addField('Razão:', reason)
            .setColor("BLUE")
        channel.send(log);
        let channel1 = await client.channels.cache.get("746067012341596231");
        const embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(user.tag, user.displayAvatarURL())
            .setDescription(`:outbox_tray: ${user} foi kickado por ${message.author}.`)
            .addField("Razão", `${reason}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .setFooter(`ID do usuário: ${user.id}`)
            .setTimestamp();
        channel1.send(embed1);
        var embed = new Discord.MessageEmbed()
            .setTitle('Foste Kickado!')
            .setDescription(reason)
            .setColor("#F93A2F")
        try {
            await user.send(embed);
        } catch (err) {
            console.warn(err);
        }
        member.kick(reason);
        channel.send(`**${user}** foi kickado por **${message.author}**!`);
    }
    if (command === "warn") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("Não podes usar isso!");
        var user = message.mentions.users.first();
        if (!user) return message.reply('Não mencionaste niguém!');
        var member;
        try {
            member = await message.guild.members.fetch(user);
        } catch (err) {
            member = null;
        }
        if (!member) return message.reply('Essa pessoa não está no server!');
        var reason = args.splice(1).join(' ');
        if (!reason) return message.reply('Precisas de especificar uma razão!');
        var channel = message.guild.channels.cache.find(c => c.name === 'logs'); //podes mudar
        var log = new Discord.MessageEmbed()
            .setTitle('Usuário Avisado')
            .addField('Usuário:', user, true)
            .addField('Por:', message.author, true)
            .addField('Razão:', reason)
            .setColor("BLUE")
        channel.send(log);
        let channel1 = await client.channels.cache.get("746067012341596231");
        const embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(user.tag, user.displayAvatarURL())
            .setDescription(`:warning: ${user} foi avisado por ${message.author}.`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .setFooter(`ID do usuário: ${user.id}`)
            .setTimestamp();
        channel1.send(embed1);
        var embed = new Discord.MessageEmbed()
            .setTitle('Foste Avisado!')
            .setDescription('Só podes ser avisado 3 vezes, por isso tenta não ser')
            .setDescription(reason)
            .setColor("#F93A2F")
        try {
            user.send(embed);
        } catch (err) {
            console.warn(err);
        }
        channel.send(`**${user}** foi avisado por **${message.author}**!`);
    }
    if (["covid", "covid-19", "corona"].includes(command)) {
        let countries = args.join(" ");
        const noArgs = new Discord.MessageEmbed()
            .setTitle('Faltam argumentos!')
            .setColor("RANDOM")
            .setDescription(`Faltam-te alguns argumentos no comando (ex: ${prefix}covid all || ${prefix}covid Canada)`)
            .setTimestamp()
        if (!args[0]) return message.channel.send(noArgs);
        if (args[0] === "all") {
            fetch(`https://covid19.mathdro.id/api`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Estatísticas da Covid-19 no mundo 🌎`)
                        .addField('Casos Confirmados:', confirmed)
                        .addField('Recuperados:', recovered)
                        .addField('Mortes:', deaths)
                        .setTimestamp()
                        .setColor("RANDOM")
                    message.channel.send(embed)
                })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Estatísticas da Covid-19 em/no(a/s): **${countries}**`)
                        .addField('Casos Confirmados:', confirmed)
                        .addField('Recuperados:', recovered)
                        .addField('Mortes:', deaths)
                        .setColor("RANDOM")
                        .setTimestamp()
                    message.channel.send(embed)
                }).catch(_e => {
                    return message.channel.send('País Inválido!')
                })
        }
    }
    if (command === 'poll') {
        if (!message.member.permissions.has("ADMINISTRATOR"))
            return message.channel.send(
                `Não tens permissões de Admin, ${message.author.username}!`
            );
        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.slice(1).join(' ');
        let embedPoll = new Discord.MessageEmbed()
            .setTitle('😲 Nova Votação! 😲')
            .setDescription(`O Admin **${message.author.username}** começou uma votação: ` + `**${pollDescription}**`)
            .setColor('YELLOW')
            .setFooter("Reage com um dos emojis abaixo para votar!")
            .setTimestamp();
        let messageEmbed = await pollChannel.send(embedPoll);
        await messageEmbed.react(':tick:748569437589995731')
        await messageEmbed.react(':X:748632517476745226')
        message.delete();
    }
    if (command === "steam") {
        const token = "";
        if (!args[0]) return message.channel.send("Por favor especifica um nome de conta!");
        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(" ")}`;
        fetch(url).then(res => res.json()).then(body => {
            if (body.response.success === 42) return message.channel.send("Não consegui encontrar um perfil Steam com esse nome.");
            const id = body.response.steamid;
            const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
            const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
            const state = ["Offline", "Online", "Ocupado", "Ausente", "A dormir", "Looking to trade", "Looking to play"];
            fetch(summaries).then(res => res.json()).then(body => {
                if (!body.response) return message.channel.send("**Não consegui encontrar um profile com esse nome!**");
                const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated } = body.response.players[0];
                fetch(bans).then(res => res.json()).then(body => {
                    if (!body.players) return message.channel.send("**Não consegui encontrar um profile com esse nome!**");
                    const { NumberOfVACBans, NumberOfGameBans } = body.players[0];
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor(`Serviços Steam | ${personaname}`, avatarfull)
                        .setThumbnail(avatarfull)
                        .setDescription(`**Nome Real:** ${realname || "Sem conhecimento"}
                    **Estado:** ${state[personastate]}
                    **País:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}:
                    **Conta criada a:** ${dateFormat(timecreated * 1000, "d/mm/yyyy (h:MM:ss TT)")}
                    **Bans:** Vac: ${NumberOfVACBans}, Game: ${NumberOfGameBans}
                    **Link:** [link para o perfil](${profileurl})`)
                        .setTimestamp();
                    message.channel.send(embed)
                })
            })
        })
    }
    if (command === "uptime") {
        message.reply('A calcular o uptime...').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            resultMessage.edit(`**Estou online há: ${ms(client.uptime)}**`)
        })
    }
    if (command === "sobre") {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${message.member.user.username}, aqui está tudo sobre o ${client.user.username}!`, message.member.user.displayAvatarURL())
            .setDescription(`Olá, eu sou o **${client.user.username}**! Sou um Bot Multiusos feito pelo TonaS#9344! Sou feito com a library [Discord.js](https://discord.js.org/#/) e com o Module de música [Distube](https://distube.js.org/)! Escreve \`${prefix}help\` para veres os meus comandos.\n[Convida-me](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot) para o teu server!\n O Bot foi criado a - ${moment.utc(client.user.createdAt).format("dddd, MMMM Do YYYY")}.`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .addField("Tenho comandos de diversos tópicos, como:", "```\n🎶 de Música\n🤣 de Memes\n🐶 de Animais\n📷 de Imagens\n😆 de Entretenimento\n🔧 de Informação!```")
            .addFields(
                { name: "Com:", value: `${client.users.cache.size} pessoas`, inline: true },
                { name: "Em:", value: `${client.guilds.cache.size} servers`, inline: true },
                { name: "Com:", value: `${client.options.shards.length} shard(s)`, inline: true },
                { name: "Discord.js", value: `v12.2.0`, inline: true },
                { name: "Node.js", value: `v14.5.0`, inline: true },
                { name: "Distube", value: `v2.5.1`, inline: true }
            )
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed);
    }
    if (command === "invite") {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Convida o Bot!")
            .setDescription("Convida o bot para o teu server para o utilizares como quiseres!")
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .addField("\u200B", `**ENG**-If you want to invite **${client.user.username}** to other servers, here's the link: [Link](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot).\n
            **PT**- Se quiseres convidar o **${client.user.username}** para outro server, aqui está o link: [Link](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot).`);
        message.channel.send(embed);
    }
    if (command === "instagram") {
        const name = args.join(" ");
        if (!name) {
            message.react(":X:748632517476745226")
            return message.reply("Se calhar dava jeito procurares algum nome...!")
                .then(m => m.delete(5000));
        }
        const url = `https://instagram.com/${name}/?__a=1`;
        let res;
        try {
            res = await fetch(url).then(url => url.json());
        } catch (e) {
            return message.reply("Não consegui encontrar essa conta... :(")
                .then(m => m.delete(5000));
        }
        const account = res.graphql.user;
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(account.full_name)
            .setURL(`https://instagram.com/${name}`)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Informação do Perfil", `**- Username:** ${account.username}
            **- Nome Verdadeiro:** ${account.full_name}
            **- Biografia:** ${account.biography.length == 0 ? "none" : account.biography}
            **- Posts:** ${account.edge_owner_to_timeline_media.count}
            **- Followers:** ${account.edge_followed_by.count}
            **- Following:** ${account.edge_follow.count}
            **- Conta privada:** ${account.is_private ? "Sim 🔐" : "Não 🔓"}`);
        message.channel.send(embed);
    }
    if (command === "badjoke") {
        let data = await random.getJoke()
        message.channel.send(data)
    }
    if (command === "advice") {
        let data = await random.getAdvice()
        message.channel.send(data)
    }
    if (command === "animepunch") {
        let data = await random.getAnimeImgURL("punch")
        const embed = new Discord.MessageEmbed()
            .setAuthor("PUNCH!")
            .setImage(data)
            .setTimestamp()
            .setColor("RANDOM")
        message.channel.send(embed)
    }
    if (command === "kpop") {
        let data = await random.getKpop()
        message.channel.send(data)
    }
    if (command === "lock") {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Não podes usar isso!");
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[0] === 'on') {
            let channel1 = await client.channels.cache.get("746067012341596231");
            const embed2 = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setDescription(` O Admin ${member.user} deu lock ao server.`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setFooter(`ID do usuário: ${member.user.id}`)
                .setTimestamp();
            channel1.send(embed2);
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    channel.setName(channel.name += `🔒`)
                })
            })
            return message.channel.send('Todos os channels foram lock.');
        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                }).then(() => {
                    channel.setName(channel.name.replace('🔒', ''))
                }
                )
            })
            let channel1 = await client.channels.cache.get("746067012341596231");
            const embed1 = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setDescription(`${member.user} tirou os locks do server.`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setFooter(`ID do usuário: ${member.user.id}`)
                .setTimestamp();
            channel1.send(embed1);
            return message.channel.send('Todos os locks foram tirados.')
        }
    }
    if (command === "weather") {
        weather.find({ search: args.join(" "), degreeType: 'C' }, function (error, result) {
            if (error) return message.channel.send(error);
            if (!args[0]) {
                message.react(":X:748632517476745226")
                return message.channel.send('Por favor especifica um sítio!')
            }
            if (result === undefined || result.length === 0) return message.channel.send('**Cidade** Inválida!');
            var current = result[0].current;
            var location = result[0].location;
            const weatherinfo = new Discord.MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Temperatura em: ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor("RANDOM")
                .addField('Fuso Horário', `UTC${location.timezone}`, true)
                .addField('Unidade da Temperatura', 'Celsius', true)
                .addField('Temperatura', `${current.temperature}°`, true)
                .addField('Vento', current.winddisplay, true)
                .addField('Parece que estão', `${current.feelslike}°`, true)
                .addField('Humidade', `${current.humidity}%`, true)
            message.channel.send(weatherinfo)
        })
    }
    if (command === "rps") {
        const acceptedReplies = ['pedra', 'papel', 'tesoura'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];
        const choice = args[0];
        if (!choice) {
            message.react(":X:748632517476745226")
            return message.channel.send(`Como jogar: \`${prefix}rps <pedra|papel|tesoura>\``);
        }
        if (!acceptedReplies.includes(choice)) {
            message.react(":X:748632517476745226")
            return message.channel.send(`Só estas respostas são permitidas: \`${acceptedReplies.join(', ')}\``);
        }
        if (result === choice) return message.reply("**É um empate!** Tivemos a mesma opção.");
        switch (choice) {
            case 'pedra': {
                if (result === 'papel') return message.reply(`**Eu ganhei!** Eu tinha ${result}.`);
                else return message.reply(`**Tu ganhaste!** Eu tinha ${result}.`);
            }
            case 'papel': {
                if (result === 'tesoura') return message.reply(`**Eu ganhei!** Eu tinha ${result}.`);
                else return message.reply(`**Tu ganhaste!** Eu tinha ${result}.`);
            }
            case 'tesoura': {
                if (result === 'pedra') return message.reply(`**Eu ganhei!** Eu tinha ${result}.`);
                else return message.reply(`**Tu ganhaste!** Eu tinha ${result}.`);
            }
            default: {
                return message.channel.send(`Só estas respostas são permitidas: \`${acceptedReplies.join(', ')}\``);
            }
        }
    }
    if (command === "serverinfo") {
        const { guild } = message;
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
            .setThumbnail(guild.iconURL())
            .addField('Criado a', guild.createdAt.toLocaleString(), true)
            .addField('Dono do Server', guild.owner.user)
            .addField('Membros Totais', guild.memberCount, true)
            .addField('Membros Totais Reais', guild.members.cache.filter(member => !member.user.bot).size, true)
            .addField('Bots Totais', guild.members.cache.filter(member => member.user.bot).size, true)
            .addField('Channels Totais', guild.channels.cache.size, true)
            .addField('Chats de Texto', guild.channels.cache.filter(ch => ch.type === 'text').size, true)
            .addField('Voice Channels', guild.channels.cache.filter(ch => ch.type === 'voice').size, true)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
            .setDescription(`${guild.roles.cache.map(role => role.toString()).join(' ')}`);
        message.channel.send(embed);

    }
    if (command === "yt") {
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
    if (command === "delete") {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let image = await canva.delete(user.displayAvatarURL({ dynamic: false, format: 'png' }));
        let attachment = new Discord.MessageAttachment(image, "deleted.png");
        return message.channel.send(attachment);
    }
    if (command === "shit") {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.shit(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
    if (command === "wanted") {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.wanted(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
    if (command === "invert") {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.invert(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
    if (command === "trash") {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.trash(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
    if (command === "hitler") {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.hitler(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
    if (command === "blur") {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.blur(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
    if (command === "deepfry") {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.deepfry(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
    if (command === "beautiful") {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.beautiful(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
    if (command === "affect") {
        const user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.affect(avatar);
        let attachment = new Discord.MessageAttachment(image, "shit.png");
        return message.channel.send(attachment)
    }
    if (command === "math") {
        if (!args[0]) {
            message.react(":X:748632517476745226")
            return message.channel.send("Não especificaste o primeiro número!")
        }
        if (!args[1]) {
            message.react(":X:748632517476745226")
            return message.channel.send("Não especificaste o tipo de operação!")
        }
        if (!args[2]) {
            message.react(":X:748632517476745226")
            return message.channel.send("Não especificaste o segundo número!")
        }
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("A Resposta é:")
            .setDescription(calculator(args[0], args[1], args[2]))
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        message.channel.send(embed)
    }
    if (command === "giveaway") {
        if (!args[0]) {
            message.react(":X:748632517476745226")
            return message.channel.send(`Não especificaste o tempo do giveaway!`);
        }
        if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) {
            message.react(":X:748632517476745226")
            return message.channel.send(`Não usaste o formato correto do tempo!`);
        }
        if (isNaN(args[0][0])) {
            message.react(":X:748632517476745226")
            return message.channel.send(`Isso não é um número!`);
        }
        let channel = message.mentions.channels.first();
        if (!channel) {
            message.react(":X:748632517476745226")
            return message.channel.send(`Não consegui encontrar esse channel neste server!`);
        }
        let prize = args.slice(2).join(" ");
        if (!prize) {
            message.react(":X:748632517476745226")
            return message.channel.send(`Nenhum prémio especificado!`);
        }
        message.channel.send(`*Giveaway criado em ${channel}*`);
        let Embed = new Discord.MessageEmbed()
            .setTitle(`Giveaway novo!`)
            .setDescription(`O ${message.author} está a fazer um giveaway de: **${prize}**`)
            .setTimestamp(Date.now() + ms(args[0]))
            .setFooter(`O giveaway vai demorar ${args[0]}, acaba --------->`)
            .setColor(`RANDOM`);
        let m = await channel.send(Embed);
        m.react("🎉");
        setTimeout(() => {
            if (m.reactions.cache.get("🎉").count <= 1) {
                message.channel.send(`Reações: ${m.reactions.cache.get("🎉").count}`);
                return message.channel.send(`Poucas pessoas ou nenhumas reagiram à mensagem, então não há prémio!`);
            }
            let winner = m.reactions.cache
                .get("🎉")
                .users.cache.filter((u) => !u.bot)
                .random();
            const prizeembed = new Discord.MessageEmbed()
                .setAuthor("Fim do giveaway!")
                .setDescription(`O vencedor do giveaway para **${prize}** é... ${winner}! 🎉 Parabéns!`)
                .setTimestamp()
                .setColor("RANDOM")
            channel.send(prizeembed)
        }, ms(args[0]));
    }
    if (command === "fortnite") {
        if (!args[0]) return message.channel.send("Por favor especifica um nome.");
        if (args[1] && !["lifetime", "solo", "duo", "squad"].includes(args[1])) return message.channel.send(`Como usar: ${prefix}fortnite <username> <gametype>``\nModos de Jogo: Lifetime, Solo, Duo, Squad`);
        let gametype = args[1] ? args[1].toLowerCase() : "lifetime";
        let data = await Client.find(args[0])
        if (data && data.code === 404) return message.channel.send("Não consegui encontrar ninguém com esse nome.")
        const { image, url, username } = data;
        const { scorePerMin, winPercent, kills, score, wins, kd, matches } = data[gametype]
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Epic Games (Fortnite) | ${username}`, image)
            .setThumbnail(image)
            .setDescription(`**Modo de Jogo:** ${gametype.slice(0, 1).toUpperCase() + gametype.slice(1)}
                    **Kills:** ${kills || 0}
                    **Score:** ${score || 0}
                    **Score por minuto:** ${scorePerMin || 0}
                    **Wins:** ${wins || 0}
                    **Win Ratio:** ${winPercent || "0%"}
                    **KDR:** ${kd || 0}
                    **Jogos:** ${matches || 0}
                    **Link:** [link para o perfil](${url})`)
            .setTimestamp()
        message.channel.send(embed)
    }
    if (command === "giverole") {
        const targetUser = message.mentions.users.first()
        if (!targetUser) {
            message.react(":X:748632517476745226")
            message.reply('Por favor especifica alguém para dar o role.')
            return
        }
        args.shift()
        const roleName = args.join(' ')
        const { guild } = message
        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })
        if (!role) {
            message.react(":X:748632517476745226")
            message.reply(`Não há nenhum role chamado: **${roleName}**`)
            return
        }
        const member = guild.members.cache.get(targetUser.id)
        member.roles.add(role)
        message.reply(`o ${member.user} agora tem o role: **${roleName}**.`)
        let channel1 = await client.channels.cache.get("746067012341596231");
        const embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setDescription(`O ${message.author} deu um role a ${member.user}.`)
            .addField("Nome do Role", `${roleName}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .setFooter(`ID do usuário: ${member.user.id}`)
            .setTimestamp();
        channel1.send(embed1);
    }
    if (command === "delrole") {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Não podes usar isso!");
        const targetUser = message.mentions.users.first()
        if (!targetUser) {
            message.react(":X:748632517476745226")
            message.reply('Por favor especifica uma pessoa para tirar um role.')
            return
        }
        args.shift()
        const roleName = args.join(' ')
        const { guild } = message
        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })
        if (!role) {
            message.react(":X:748632517476745226")
            message.reply(`Não há nenhum role com o nome: **${roleName}**`)
            return
        }
        const member = guild.members.cache.get(targetUser.id)
        if (member.roles.cache.get(role.id)) {
            member.roles.remove(role)
            message.reply(`o ${member.user} já não tem o role: **${roleName}**.`)
            let channel1 = await client.channels.cache.get("746067012341596231");
            const embed1 = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setDescription(`O ${message.author} tirou um role a ${member.user}.`)
                .addField("Nome do Role", `${roleName}`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setFooter(`ID do usuário: ${member.user.id}`)
                .setTimestamp();
            channel1.send(embed1);
        } else {
            message.reply(`o ${member.user} não tem o role: **${roleName}**.`)
        }
    }
    if (command === "hasrole") {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Não podes usar isso!");
        const targetUser = message.mentions.users.first()
        if (!targetUser) {
            message.react(":X:748632517476745226")
            message.reply('Por favor especifica alguém para ver se tem um role.')
            return
        }
        args.shift()
        const roleName = args.join(' ')
        const { guild } = message
        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })
        if (!role) {
            message.react(":X:748632517476745226")
            message.reply(`Não há nenhum role com o nome: **"${roleName}"**.`)
            return
        }
        const member = guild.members.cache.get(targetUser.id)
        if (member.roles.cache.get(role.id)) {
            message.reply(`o ${member.user} tem o role: **${roleName}**.`)
        } else {
            message.reply(`o ${member.user} não tem o role: **${roleName}**.`)
        }
    }
    if (command === "issimp") {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const simp = Math.random() * 100;
        const simpIndex = Math.floor(simp / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Simp Machine 2020`)
            .setDescription(`${member.user.username} é ${Math.floor(simp)}% simp.`)
        message.channel.send(embed);
    }
    if (command === "isgay") {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const gay = Math.random() * 100;
        const gayIndex = Math.floor(gay / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`🏳️‍🌈 Gay Machine 2020 🏳️‍🌈`)
            .setDescription(`${member.user.username} é ${Math.floor(gay)}% gay.`)
        message.channel.send(embed);
    }
    if (command === "istoxic") {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const gay = Math.random() * 100;
        const gayIndex = Math.floor(gay / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Toxic Machine 2020`)
            .setDescription(`${member.user.username} é ${Math.floor(gay)}% tóxico.`)
        message.channel.send(embed);
    }
    if (command === "isgamer") {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const gamer = Math.random() * 100;
        const gamerIndex = Math.floor(gamer / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`⌨️ Gamer Machine 2020 🖱️`)
            .setDescription(`${member.user.username} é ${Math.floor(gamer)}% gamer. **Épico**!`)
        message.channel.send(embed);
    }
    if (command === "isretarded") {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const retard = Math.random() * 100;
        const retardIndex = Math.floor(retard / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Retards Machine 2020`)
            .setDescription(`${member.user.username} é ${Math.floor(retard)}% retardado lmao.`)
        message.channel.send(embed);
    }
    if (command === "isloli") {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const loli = Math.random() * 100;
        const loliIndex = Math.floor(loli / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Loli Machine 2020`)
            .setDescription(`${member.user.username} é ${Math.floor(loli)}% uma loli. 🤣`)
        message.channel.send(embed);
    }
    if (command === "isanimegirl") {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const animegirl = Math.random() * 100;
        const animegirlIndex = Math.floor(animegirl / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Loli Machine 2020`)
            .setDescription(`${member.user.username} é ${Math.floor(animegirl)}% uma anime girl. 💁`)
        message.channel.send(embed);
    }
    if (command === "iswaifu") {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const waifu = Math.random() * 100;
        const waifugirlIndex = Math.floor(waifu / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Loli Machine 2020`)
            .setDescription(`${member.user.username} é ${Math.floor(waifu)}% uma waifu. 😥`)
        message.channel.send(embed);
    }
    if (command === "isdank") {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        const dank = Math.random() * 100;
        const dankIndex = Math.floor(dank / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Dank Memer Machine 2020`)
            .setDescription(`${member.user.username} é ${Math.floor(dank)}% um dank memer xD.`)
        message.channel.send(embed);
    }
    if (command == "lenny") {
        const messages = ["( ͡° ͜ʖ ͡°)", "¯\_( ͡° ͜ʖ ͡°)_/¯", "( ͠° ͟ʖ ͡°)", "( ͡° ʖ̯ ͡°)", "( ಠ ͜ʖಠ)", "(╯ ͠° ͟ʖ ͡°)╯┻━┻", "(ง ͠° ͟ل͜ ͡°)ง", "( ͡°( ͡° ͜ʖ ͡°( ͡° ͜ʖ ͡°) ͡° ͜ʖ ͡°) ͡°)", "凸 ( ° ͜ʖ ° )凸", "( ͠° ͜ʖ͠° )", "( ͠° ‿‿͠° )", "(︡° ͜ʖ°︠)", " ° ͜ʖ ° ", " ͠° ͜ʖ ͡°", "( ͡° ͜ʖ ͡°)╭∩╮", "(͠≖ ͜ʖ͠≖)", "ᕦ( ͡° ͜ʖ ͡°)ᕤ", "(☞ ͡° ͜ʖ ͡°)☞", "ಥ_ಥ", "( ✧≖ ͜ʖ≖)", "(▀̿Ĺ̯▀̿ ̿)", "( ͡°Ĺ̯ ͡° )", "̿'̿'\̵͇̿̿\з=( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/'̿̿ ̿ ̿ ̿ ̿ ̿", '/╲/\╭( ͡° ͡° ͜ʖ ͡° ͡°)╮/\╱', "(° ͡ ͜ ͡ʖ ͡ °)", "( ͡°╭͜ʖ╮͡° )", "┬┴┬┴┤ ͜ʖ ͡°) ├┬┴┬┴", "(͡ ͡° ͜ つ ͡͡°)", "┬┴┬┴┤(･ω├┬┴┬┴", "( ̿ ̿ ̿ ̿ ̿ ̿ ̿ ̿°̿ ̿ ̿ ̿ ̿ ̿ ̿ ̿ ͜ʖ ̿ ̿ ̿ ̿ ̿ ̿ ̿°̿ ̿ ̿ ̿ ̿ ̿ ̿ )", "(̿ ̿ ̿ ̿ ̿'̿̿ ̿ ̿ ̿ ͜ʖ ̿ ̿ ̿ ̿ ̿ ̿'̿ ̿̿ ̿)"]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        message.channel.send(randomMessage)
    }
    if (message.content.startsWith(`${config.prefix}slowmode`)) {
        var time = message.content.split(" ").slice(1).join(" ")
        if (!time) {
            message.react(":X:748632517476745226")
            return message.reply("precisas de especificar o tempo para o slowmode!")
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(`O slowmode deste channel é agora ${time}.`)
            .setColor("RANDOM");
        message.channel.setRateLimitPerUser(time)
        message.channel.send(embed)
    }
    if (command === "acrónimo") {
        var text = args;
        if (args.length < 1) {
            message.react(":X:748632517476745226")
            message.reply("Por favor adiciona um termo para eu procurar. ^^\nEg: -acronym rofl");
        }
        else {
            var acronym = text;
            message.reply("A procurar na Database de Acrónimos: `" + `${acronym}` + "`")
            var acronym_uri = `http://acronyms.silmaril.ie/cgi-bin/xaa?${acronym}`;
            var acronym_meanings = [];
            request(acronym_uri, { json: true }, (err, _res, body) => {
                if (err) { return console.log(err); }
                var split_body = body.split("\n");
                var num_acronyms = split_body[4];
                if (num_acronyms.includes("0")) {
                    message.reply("Nenhum acrónimo existente como o que disseste.")
                }
                else {
                    var header = "```ml" + "\n" +
                        "Significado do Acrónimo: " + acronym + "👀 \n" +
                        "```"
                    for (var i = 6; i < split_body.length - 1; i += 4) {
                        var line = split_body[i]
                        line = line.trim()
                        var split_acr_array = line.split(" ");
                        var first_item = split_acr_array[0]
                        if (split_acr_array.length === 1) {
                            first_item = first_item.slice(7, first_item.length - 8)
                            split_acr_array[0] = first_item
                        }
                        else {
                            var strpd_item = first_item.slice(7, first_item.length + 5);
                            split_acr_array[0] = strpd_item;
                            var last_item = split_acr_array[split_acr_array.length - 1];
                            var strpd_last_item = last_item.slice(0, split_acr_array.length - 11);
                            split_acr_array[split_acr_array.length - 1] = strpd_last_item;
                        }
                        var final_acronym = split_acr_array.toString()
                        final_acronym = final_acronym.split(",").join(" ")
                        acronym_meanings.push(final_acronym)
                    }
                    message.channel.send({
                        embed: {
                            color: "RANDOM",
                            title: `Significado(s) do Acrónimo: ${acronym}`,
                            description: acronym_meanings.join("\n")
                        }
                    });
                }
            })
        }
    }
    if (command === "gif") {
        var text = args;
        if (args.length < 1) {
            message.react(":X:748632517476745226")
            message.reply("Especifica algum termo para eu procurar um gif. :grin:");
        }
        else {
            var limit = 5;
            var search_term = text;
            var giphy_endpoint = `https://api.giphy.com/v1/gifs/search?rating=g&api_key=${config.giphy_api_key}&limit=${limit}&q=${search_term}`
            fetch(giphy_endpoint)
                .then(res => res.json())
                .then((out) => {
                    if (out.data.length === 0) {
                        message.channel.send("Não consegui encontrar nenhum gif :(")
                    }
                    else {
                        var randomNumber = getRandomNumber(0, limit - 1)
                        var giphy_link = out.data[randomNumber].embed_url;
                        message.channel.send(giphy_link)
                            .catch(console.error);
                    }
                })
                .catch(err => { throw err });
        }
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
    if (command === "sticker") {
        var text = args;
        if (args.length < 1) {
            message.react(":X:748632517476745226")
            message.reply("Adiciona o termo para eu procurar depois do comando. ^^")
        }
        else {
            var search_term = text
            var limit = 3
            var giphy_endpoint = `https://api.giphy.com/v1/stickers/search?q=${search_term}&limit=${limit}&api_key=${config.giphy_api_key}`
            fetch(giphy_endpoint)
                .then(res => res.json())
                .then((out) => {
                    if (out.data.length === 0) {
                        message.channel.send("Não consegui encontrar nenhum sticker :(")
                    }
                    else {
                        var randomNumber = getRandomNumber(0, limit - 1);
                        var giphy_link = out.data[randomNumber].embed_url;
                        message.channel.send(giphy_link)
                            .catch(console.error);
                    }
                })
                .catch(err => { throw err });
        }
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
    if (command === "randomstickers") {
        message.reply("A procurar um sticker aleatório no GIPHY...")
        var giphy_endpoint = `https://api.giphy.com/v1/stickers/random?rating=g&api_key=${config.giphy_api_key}`
        fetch(giphy_endpoint)
            .then(res => res.json())
            .then((out) => {
                var giphy_link = out.data.embed_url;
                message.channel.send(giphy_link)
                    .catch(console.error);
            })
            .catch(err => { throw err });
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
    if (command === "randomgif") {
        message.channel.send("A procurar um gif aleatório no GIPHY...")
        var giphy_endpoint = `https://api.giphy.com/v1/gifs/random?rating=g&api_key=${config.giphy_api_key}`
        fetch(giphy_endpoint)
            .then(res => res.json())
            .then((out) => {
                var giphy_link = out.data.embed_url;
                message.channel.send(giphy_link)
                    .catch(console.error);
            })
            .catch(err => { throw err });
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
    if (command === "define") {
        var text = args;
        if (args.length < 1) {
            message.react(":X:748632517476745226")
            message.reply("Adiciona uma palavra depois do comando par eu saber o que queres que eu defina. \nEg: `-define technology`")
        }
        else {
            var search_term = text;
            search_term = "define" + search_term;
            var url_encoded_search_term = search_term.split(" ").join("%20")
            var ask_link = `http://api.wolframalpha.com/v2/query?appid=${config.wolfram_alpha_id}&input=${url_encoded_search_term}&output=json`
            fetch(ask_link)
                .then(res => res.json())
                .then((out) => {
                    var num_pods = out.queryresult.numpods;
                    if (num_pods === 0) {
                        message.channel.send("Desculpa, não consegui encontrar nada, podes tentar depois de novo? :D")
                    }
                    else {
                        var interpretation = out.queryresult.pods[0].subpods[0].plaintext;
                        var answer = out.queryresult.pods[1].subpods[0].plaintext;
                        message.channel.send({
                            embed: {
                                color: "RANDOM",
                                title: `${interpretation}`,
                                description: answer
                            }
                        });
                    }
                })
                .catch(err => { throw err });
        }
    }
    if (command === "name") {
        var text = args;
        if (args.length < 1) {
            message.react(":X:748632517476745226")
            message.reply("Adiciona um nome depois do comando para eu saber o que procurar. :eyes:\nEg: -name silvia")
        }
        else {
            var msg_array = text
            var name = msg_array[0];
            if (msg_array.length > 2) {
                message.channel.send("Só consigo procurar um nome de cada vez. ")
            }
            else {
                var name_query = message.content.slice(1, message.content.length);
                var name_query_encoded = name_query.split(" ").join("%20");
                var ask_link = `http://api.wolframalpha.com/v2/query?appid=${config.wolfram_alpha_id}&input=${name_query}&output=json`
                fetch(ask_link)
                    .then(res => res.json())
                    .then((out) => {
                        var num_pods = out.queryresult.numpods;
                        if (num_pods === 0) {
                            message.channel.send("Desculpa, não consegui encontrar nada. :(")
                        }
                        else {
                            var interpretation = out.queryresult.pods[0].subpods[0].plaintext;
                            var basic_details = out.queryresult.pods[1].subpods[0].plaintext;
                            var graph = out.queryresult.pods[0].subpods[0].img.src;
                            var historical_details = out.queryresult.pods[2].subpods[0];
                            var estimates = out.queryresult.pods[3].subpods[0];
                            var age_dist = out.queryresult.pods[4].subpods[0];
                            var alternate_names = out.queryresult.pods[5].subpods[0].plaintext;
                            if (alternate_names === "") {
                                alternate_names = "Nenhum nome alternativo"
                            }
                            var notable_ppl = out.queryresult.pods[6].subpods[0].plaintext;
                            message.channel.send({
                                embed: {
                                    color: "RANDOM",
                                    title: `${interpretation}`,
                                    description: basic_details,
                                    image: {
                                        url: graph
                                    },
                                    fields: [{
                                        name: "Nomes Alternativos",
                                        value: alternate_names
                                    },
                                    {
                                        name: `Pessoas Famosas`,
                                        value: notable_ppl
                                    }]
                                }
                            });
                        }
                    })
                    .catch(err => { throw err });
            }
        }
    }
    if (command === "captcha") {
        if (args.length < 1) {
            message.react(":X:748632517476745226")
            message.reply(`Precisas de pôr algum texto depois do comando para eu procurar. :eyes:\nEg: \`${config.prefix}captcha hi there\``);
        }
        else {
            var text = args;
            text = "captcha " + text;
            var captcha_encoded = text.split(" ").join("%20");
            var ask_link = `http://api.wolframalpha.com/v2/query?appid=${config.wolfram_alpha_id}&input=${captcha_encoded}&output=json`
            fetch(ask_link)
                .then(res => res.json())
                .then((out) => {
                    var img_link = out.queryresult.pods[1].subpods[0].img.src;
                    message.channel.send({
                        embed: {
                            image: {
                                url: img_link
                            },
                            color: "RANDOM",
                            title: `Captcha`,
                            description: "Texto ----> Captcha"
                        }
                    });
                })
                .catch(err => { throw err });
        }
    }
    if (command === "rhymer") {
        var text = args;
        if (args.length < 1) {
            message.react(":X:748632517476745226")
            message.reply(`Tenta incluir um palavra depois do comando, sendo a palavra inglesa.\`Eg: ${config.prefix}rhyme code\``);
        }
        else {
            var msg_array = text
            if (msg_array.length > 1) {
                message.channel.send("É recomendado que especifiques só uma palavra depois do comando.")
            }
            else {
                var search_term = msg_array[0];
                var ask_link = `http://api.wolframalpha.com/v2/query?appid=${config.wolfram_alpha_id}&input=rhymes%20with%20${search_term}&output=json`
                fetch(ask_link)
                    .then(res => res.json())
                    .then((out) => {
                        if (out.queryresult.success === false) {
                            message.channel.send("Não consegui encontrar nenhuma palavra :( ")
                        }
                        else {
                            var rhyming_words = out.queryresult.pods[1].subpods[0].plaintext
                            message.channel.send({
                                embed: {
                                    color: "RANDOM",
                                    title: `Rima com`,
                                    description: rhyming_words
                                }
                            });
                        }
                    })
                    .catch(err => { throw err });
            }
        }
    }
    if (command === "pp") {
        const love = Math.random() * 15;
        const loveIndex = Math.floor(love / 1);
        const loveLevel = "=".repeat(loveIndex)
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`PP Size`)
            .setDescription(`${message.member.user.username}\'s pp size:` + `\n8${loveLevel}D`);
        message.channel.send(embed);
    }
    if (command === 'minesweeper') {
        const rows = parseInt(args[0]);
        const columns = parseInt(args[1]);
        const mines = parseInt(args[2]);
        if (!rows) {
            message.react(":X:748632517476745226")
            return message.channel.send(':warning: Por favor especifica o número de filas.');
        }
        if (!columns) {
            message.react(":X:748632517476745226")
            return message.channel.send(':warning: Por favor especifica o número de colunas.');
        }
        if (!mines) {
            message.react(":X:748632517476745226")
            return message.channel.send(':warning: Por favor especifica um número de minas.');
        }
        const minesweeper = new Minesweeper({ rows, columns, mines });
        const matrix = minesweeper.start();
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Minesweeper`)
            .setDescription(matrix)
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
        return matrix
            ? message.channel.send(embed)
            : message.channel.send(':warning: You have provided invalid data.');
    }
    if (command === "die") {
        if (message.author.id !== "343491235975135243") {
            message.react(":X:748632517476745226") //mudas aqui o teu id, acho que podes pôr mais pessoas
            return message.channel.send("a:finger_wave:751573591929126967> Não és o owner do Bot! Achavas que ias conseguir desligar o bot hehehehe.") // para ninguém a não seres tu dar restart ao bot
        }
        await message.channel.send("A dar restart ao bot!")
        process.exit();
    }
    if (command === "kitty") {
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + "cute cats",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        }
        request(options, function (error, _reponse, responseBody) {
            if (error) {
                return;
            }
            $ = cheerio.load(responseBody);
            var links = $(".image a.link");
            var urls = new Array(links.length).fill(0).map((_v, i) => links.eq(i).attr("href"));
            if (!urls.length) {
                return;
            }
            const embed = new Discord.MessageEmbed()
                .setAuthor("CATS!", client.user.displayAvatarURL())
                .setImage(urls[Math.floor(Math.random() * urls.length)])
                .setTimestamp()
                .setColor("RANDOM")
            message.channel.send(embed)
        });
    }
    if (command === "mrlizard") {
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + "lizard",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        }
        request(options, function (error, _reponse, responseBody) {
            if (error) {
                return;
            }
            $ = cheerio.load(responseBody);
            var links = $(".image a.link");
            var urls = new Array(links.length).fill(0).map((_v, i) => links.eq(i).attr("href"));
            if (!urls.length) {
                return;
            }
            const embed = new Discord.MessageEmbed()
                .setAuthor("Mr_lizard na área!", client.user.displayAvatarURL())
                .setImage(urls[Math.floor(Math.random() * urls.length)])
                .setTimestamp()
                .setColor("RANDOM")
            message.channel.send(embed)
        });
    }
    if (command === "quacc") {
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + "duck",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        }
        request(options, function (error, _reponse, responseBody) {
            if (error) {
                return;
            }
            $ = cheerio.load(responseBody);
            var links = $(".image a.link");
            var urls = new Array(links.length).fill(0).map((_v, i) => links.eq(i).attr("href"));
            if (!urls.length) {
                return;
            }
            const embed = new Discord.MessageEmbed()
                .setAuthor("QUAAAAAACC!", client.user.displayAvatarURL())
                .setImage(urls[Math.floor(Math.random() * urls.length)])
                .setTimestamp()
                .setColor("RANDOM")
            message.channel.send(embed)
        });
    }
    if (command === "minecraft") {
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + "cursed minecraft",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        }
        request(options, function (error, _reponse, responseBody) {
            if (error) {
                return;
            }
            $ = cheerio.load(responseBody);
            var links = $(".image a.link");
            var urls = new Array(links.length).fill(0).map((_v, i) => links.eq(i).attr("href"));
            if (!urls.length) {
                return;
            }
            const embed = new Discord.MessageEmbed()
                .setAuthor("MINECRAFT! THE BEST GAME IN THE WORLD!", client.user.displayAvatarURL())
                .setImage(urls[Math.floor(Math.random() * urls.length)])
                .setTimestamp()
                .setColor("RANDOM")
            message.channel.send(embed)
        });
    }
    if (command === "foxsays") {
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + "fox",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        }
        request(options, function (error, _reponse, responseBody) {
            if (error) {
                return;
            }
            $ = cheerio.load(responseBody);
            var links = $(".image a.link");
            var urls = new Array(links.length).fill(0).map((_v, i) => links.eq(i).attr("href"));
            if (!urls.length) {
                return;
            }
            const embed = new Discord.MessageEmbed()
                .setAuthor("What The Fox Says?!", client.user.displayAvatarURL())
                .setImage(urls[Math.floor(Math.random() * urls.length)])
                .setTimestamp()
                .setColor("RANDOM")
            message.channel.send(embed)
        });
    }
    if (command === "panda") {
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + "cute panda",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        }
        request(options, function (error, _reponse, responseBody) {
            if (error) {
                return;
            }
            $ = cheerio.load(responseBody);
            var links = $(".image a.link");
            var urls = new Array(links.length).fill(0).map((_v, i) => links.eq(i).attr("href"));
            if (!urls.length) {
                return;
            }
            const embed = new Discord.MessageEmbed()
                .setAuthor("PANDAS!", client.user.displayAvatarURL())
                .setImage(urls[Math.floor(Math.random() * urls.length)])
                .setTimestamp()
                .setColor("RANDOM")
            message.channel.send(embed)
        });
    }
    if (command === "ferret") {
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + "ferret",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        }
        request(options, function (error, _reponse, responseBody) {
            if (error) {
                return;
            }
            $ = cheerio.load(responseBody);
            var links = $(".image a.link");
            var urls = new Array(links.length).fill(0).map((_v, i) => links.eq(i).attr("href"));
            if (!urls.length) {
                return;
            }
            const embed = new Discord.MessageEmbed()
                .setAuthor("FERRETS!", client.user.displayAvatarURL())
                .setImage(urls[Math.floor(Math.random() * urls.length)])
                .setTimestamp()
                .setColor("RANDOM")
            message.channel.send(embed)
        });
    }
    if (command === "goose") {
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + "goose",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        }
        request(options, function (error, _reponse, responseBody) {
            if (error) {
                return;
            }
            $ = cheerio.load(responseBody);
            var links = $(".image a.link");
            var urls = new Array(links.length).fill(0).map((_v, i) => links.eq(i).attr("href"));
            if (!urls.length) {
                return;
            }
            const embed = new Discord.MessageEmbed()
                .setAuthor("GOOSES!", client.user.displayAvatarURL())
                .setImage(urls[Math.floor(Math.random() * urls.length)])
                .setTimestamp()
                .setColor("RANDOM")
            message.channel.send(embed)
        });
    }
    if (command === "snake") {
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + "snakes",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        }
        request(options, function (error, _reponse, responseBody) {
            if (error) {
                return;
            }
            $ = cheerio.load(responseBody);
            var links = $(".image a.link");
            var urls = new Array(links.length).fill(0).map((_v, i) => links.eq(i).attr("href"));
            if (!urls.length) {
                return;
            }
            const embed = new Discord.MessageEmbed()
                .setAuthor("SNAKES!", client.user.displayAvatarURL())
                .setImage(urls[Math.floor(Math.random() * urls.length)])
                .setTimestamp()
                .setColor("RANDOM")
            message.channel.send(embed)
        });
    }
    if(command === "sugestão") {
        const { guild } = message;
        let MSG = args.join(" ")
        if (!MSG) return message.channel.send(`Não especificaste uma mensagem para mandar!`).then(msg => {
            msg.delete({timeout: 7500})
        })
        const _ = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | Quem enviou a sugestão`, message.author.displayAvatarURL())
            .setTitle(`<a:arrow:753238522995146793> Sugestão para ${guild.name}!`)
            .setDescription(`\`${MSG}\``)
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter("⬆️ - Concordas | ⬇️ - Discordas")
            .setTimestamp()
        message.channel.send(_).then(msg => {
            msg.react("⬆️")
            msg.react("⬇️")
        })
        message.delete();
    }
    if(command === "ticket") {
        if (args[0] === 'close') {
            if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, client.user.displayAvatarURL).setTimestamp().setDescription("You do not have permission to do this!"));
            if (message.channel.name.startsWith("ticket-")) {
                message.channel.delete();
            } else {
                message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, client.user.displayAvatarURL).setTimestamp().setDescription(message.author + ', that command can only be used in a ticket.'))
                return
            }
        }
    }
    if (command === "createticket") {
        if (args[0]) {
            message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription('O Ticket foi criado!\nVamos-te contactar em pouco tempo!').setTimestamp().setAuthor('Tickets', client.user.displayAvatarURL()))
            message.react(":tick:748569437589995731")
            message.guild.channels.create(`ticket-${data.id}`).then(async c => {
                let reason = args.join(" ");
                if (message.guild.channels.cache.find(c => c.name.toLowerCase() === '-= tickets =-')) {
                    if (message.guild.channels.find(c => c.name.toLowerCase() === '-= tickets =-').type === 'category') {
                        c.setParent(message.guild.channels.find(c => c.name.toLowerCase() === '-= tickets =-').id)
                    } else {
                        c.setParent(message.guild.channels.find(c => c.name.toLowerCase() === '-= tickets =-').id)
                    }
                    c.overwritePermissions(message.guild.defaultRole, {
                        VIEW_CHANNEL: false
                    })
                    c.overwritePermissions(message.member, {
                        VIEW_CHANNEL: true
                    })
                    c.overwritePermissions(message.guild.roles.find(r => r.name.toLowerCase() === 'Administrador'), {
                        VIEW_CHANNEL: true
                    })
                    c.overwritePermissions(message.guild.roles.find(r => r.name.toLowerCase() === 'Tipo Fixe'), {
                        VIEW_CHANNEL: true
                    })
                    c.overwritePermissions(message.guild.roles.find(r => r.name.toLowerCase() === 'Dono'), {
                        VIEW_CHANNEL: true
                    })
                    message.delete();
    
                }
                await c.send(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL()).setTimestamp().addField('Razão', `${reason}`).addField('Explica-te', "Explica o porquê de teres criado o ticket!" ).setDescription(`**Obrigado por teres criado o ticket.\nOs Admins vão-te ajudar !**`).setColor("RANDOM"))
            })
            data.id++;
            fs.writeFile('./tickets.json', '{\n"id":' + data.id + "\n}", (err) => {
                if (!err) return;
                console.error(err)
            })
        }
    }
    if (command === "no-u") {
        if(!args.join("")) {
            message.channel.send("Não.")
        }
        if(args.join(" ")){
            message.reply("no u.")
        }
    }
    if (command === "setprefix") {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("não podes usar isso")
        if (!args[0] || args[0] === "help") {
            const helpembed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(`Como usar: \`${prefix}setprefix <prefix que queres>\``)
                .setTimestamp()
                .setColor("RANDOM")
            return message.channel.send(helpembed)
        }
        let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"))
        prefixes[message.guild.id] = {
            prefixes: args[0]
        };
        fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
            if (err) console.log(err)
        });
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle("Successo!")
            .setDescription(`<:tick:748569437589995731> Mudaste o prefix do server para ➜ ${args[0]}`)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setColor("RANDOM")
        message.channel.send(embed)
    }
});
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
distube
    .on("playSong", async (message, queue, song) => {
        const userEmbed = new Discord.MessageEmbed()
            .setAuthor(`Agora a tocar em: ${queue.connection.channel.name}`, "https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png")
            .setDescription(`<:play:748576561837637703> **[${song.name}](${song.url})**\n❯ **Duração da Música: ${song.formattedDuration}**\n❯ **Filtro: ${queue.filter || "Nenhum"}**\n❯ **Duração do Queue: ${queue.formattedDuration} - ${queue.songs.length} música(s)**\n❯ **Pedido por: ${message.member.user}**`)
            .setThumbnail(song.thumbnail)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(`Volume: ${queue.volume}%`, "https://images.emojiterra.com/twitter/v13.0/512px/1f4e3.png")
        message.channel.send(userEmbed).then(msg => {
            msg.react('⏸').then(r => {
                msg.react('⏹️').then(r => {
                    msg.react('⏭️').then(r => {
                        msg.react("⏯️").then(r => {
                            msg.react("🔀").then(r => {
                                msg.react("📄").then(r => {
                                    msg.react("🔉").then(r => {
                                        msg.react("🔊").then(r => {   
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
            const infosFilter = (reaction, user) => reaction.emoji.name === '⏸' && user.id === message.author.id
            const imagensFilter = (reaction, user) => reaction.emoji.name === '⏹️' && user.id === message.author.id;
            const funFilter = (reaction, user) => reaction.emoji.name === '⏭️' && user.id === message.author.id;
            const resumeFilter = (reaction, user) => reaction.emoji.name === '⏯️' && user.id === message.author.id;
            const musicaFilter = (reaction, user) => reaction.emoji.name === '🔀' && user.id === message.author.id;
            const animaisFilter = (reaction, user) => reaction.emoji.name === '📄' && user.id === message.author.id;
            const volumeFilter = (reaction, user) => reaction.emoji.name === '🔉' && user.id === message.author.id;
            const volumemaisFilter = (reaction, user) => reaction.emoji.name === '🔊' && user.id === message.author.id;
            const infos = msg.createReactionCollector(infosFilter);
            const imagens = msg.createReactionCollector(imagensFilter);
            const resume = msg.createReactionCollector(resumeFilter);
            const fun = msg.createReactionCollector(funFilter);
            const musica = msg.createReactionCollector(musicaFilter);
            const animais = msg.createReactionCollector(animaisFilter);
            const volume = msg.createReactionCollector(volumeFilter);
            const volumemais = msg.createReactionCollector(volumemaisFilter);
            infos.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (!message.member.voice.channel) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
                if (message.member.voice.channel) {
                    distube.pause(message)
                    let queue = distube.getQueue(message)
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`Pausei: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                        .setColor("RANDOM")
                    message.channel.send(embed1)
                }
            })
            resume.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (!message.member.voice.channel) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
                if (message.member.voice.channel) {
                    distube.resume(message)
                    let queue = distube.getQueue(message)
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`Voltei a tocar: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                        .setColor("RANDOM")
                    message.channel.send(embed1)
                }
            })
            animais.on('collect', async (r2, user) => {
                r2.users.remove(user)
                let queue = distube.getQueue(message.guild.id);
                if (!queue) return message.reply("⚠️ Não está nada a tocar!"); // Tell the user no song is being played
                const pageBack = "⏪";
                const pageForward = "⏩";
                const trash = "🗑️";
                const num_per_page = 10; // Number of songs to show in a page
                let queuedVideos = queue.songs.slice(); // Make a copy of the queue by value
                let pageContents = []; // This array will contain arrays with length of number of songs to show in a page
                while (queuedVideos.length > 0) {
                    pageContents.push(queuedVideos.splice(0, num_per_page))
                }
                let num_pages = pageContents.length; // The number of pages is the number of arrays in the pageContent arrays
                let currentPage = 0; // Page starts at 0 because array index starts at 0
                let currentListNum = ((currentPage + 1) * num_per_page) - num_per_page; // Calculate the last item's position in a page
                let title = queue.songs.length > 1 ? `Queue Atual ➜ ${queue.songs.length} músicas - ${queue.formattedDuration}` : `Queue Atual - ${queue.songs.length} música`;
                let description = `🎵 **Agora a tocar: [${queue.songs[0].name}](${queue.songs[0].url})**\n\n${pageContents[currentPage].map((song, index) =>
                    `**${currentListNum + (index + 1)} - [${song.name}](${song.url})**`).join('\n')}\n\n`;
                description += `**Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "Todo o queue" : "Esta música" : "Desligado"}**`;
                const embed = new Discord.MessageEmbed()
                    .setTitle(title)
                    .setColor('RANDOM')
                    .setThumbnail(queue.songs[0].thumbnail)
                    .setDescription(description)
                    .setFooter(`Página ${currentPage + 1} de ${num_pages} | Pedido por: ${message.author.tag}`)
                    .setTimestamp();
                const msg = await message.channel.send(embed);
                if (num_pages <= 1) return;
                msg.react(pageBack);
                msg.react(pageForward);
                const filter = (reaction) => reaction.emoji.name === pageBack || reaction.emoji.name === pageForward;
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
                    switch (reaction.emoji.name) {
                        case pageBack: {
                            currentPage = currentPage == 0 ? pageContents.length - 1 : currentPage -= 1;
                            break;
                        }
                        case pageForward: {
                            currentPage = currentPage == pageContents.length - 1 ? 0 : currentPage += 1;
                            break;
                        }
                        case trash: {
                            msg.reactions.removeAll()
                            break;
                        }
                    }
                    reaction.users.remove(user);
                    currentListNum = ((currentPage + 1) * num_per_page) - num_per_page;
                    let description = `🎵 **Agora a tocar: [${queue.songs[0].name}](${queue.songs[0].url})**\n\n${pageContents[currentPage].map((video, index) =>
                        `**${currentListNum + (index + 1)} - [${video.name}](${video.url})**`).join('\n')}\n\n`;
                    description += `**Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "Todo o queue" : "Esta música" : "Desligado"}**`;
                    embed.setTitle(title);
                    embed.setDescription(description);
                    embed.setFooter(`Página ${currentPage + 1} de ${num_pages} | Pedido por: ${message.author.tag}`);
                    msg.edit(embed);
                });
                if (!message.member.voice.channel && client.voice.connections) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
            })
            musica.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (message.member.voice.channel) {
                    let queue = distube.getQueue(message);
                    distube.shuffle(message)
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`:twisted_rightwards_arrows: Misturei as **${queue.songs.length} músicas** que estão no queue!`)
                        .setColor("RANDOM")
                    message.channel.send(embed1)
                }
                if (!message.member.voice.channel && client.voice.connections) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
            })
            imagens.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (message.member.voice.channelID) {
                    distube.stop(message)
                    msg.reactions.removeAll().then(msg1 => {
                        const embed = new Discord.MessageEmbed()
                            .setTitle("Stop!")
                            .setColor("RANDOM")
                            .setDescription(`Parei a música e saí do voice channel!\nPedido por(a): ${message.member.user}\nObrigado por usares o **Bot dos Bostas!**`)
                            .addFields(
                                { name: "Links Importantes:", value: "[Github Repository](https://github.com/TonaS21/bot-dos-bostas)\n[Convida o bot](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot)\n[Server de Suporte](https://discord.gg/DRnnZPS)", inline: false }
                            )
                            .setTimestamp()
                            .setFooter(client.user.username, client.user.displayAvatarURL())
                        msg1.channel.send(embed)
                    })
                }
                if (!message.member.voice.channelID && client.voice.connections) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
            })
            fun.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (message.member.voice.channelID) {
                    distube.skip(message);
                    let queue = distube.getQueue(message)
                    const vidNext = queue.songs.length > 1 ? `**Agora a tocar: [${queue.songs[1].name}](${queue.songs[1].url})**` : "**Queue vazio ➜ A sair do voice channel!**";
                    const embed1 = new Discord.MessageEmbed()
                        .setTitle("Skip!")
                        .setThumbnail(queue.songs[0].thumbnail)
                        .setDescription(`**Dei skip a: [${queue.songs[0].name}](${queue.songs[0].url})**\n${vidNext}\n**Pedido por:** ${message.author}`)
                        .setFooter(client.user.username, client.user.displayAvatarURL())
                        .setTimestamp()
                        .setColor("RANDOM")
                    message.channel.send(embed1).then(msg2 => {
                        msg2.delete({ timeout: 30000 })
                    })
                    if (queue.dispatcher.destroy) {
                        msg.reactions.removeAll()
                    }
                }
                if (!message.member.voice.channelID) {
                    message.react(":X:748632517476745226")
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`Precisas de estar num voice chat para dares skip à música!`)
                        .setTimestamp()
                    return message.channel.send(embed)
                }
            })
            volume.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (message.member.voice.channel) {
                    distube.setVolume(message, queue.volume - 10)
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`:sound: O volume da música está agora a: **${queue.volume}%**`)
                        .setColor("RANDOM")
                    message.channel.send(embed1).then(msg1 => {
                        msg1.delete({ timeout: 15000 })
                    })
                }
                if (!message.member.voice.channelID) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
            })
            volumemais.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (message.member.voice.channel) {
                    distube.setVolume(message, queue.volume + 10)
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`:loud_sound: O volume da música está agora a: **${queue.volume}%**`)
                        .setColor("RANDOM")
                    message.channel.send(embed1).then(msg1 => {
                        msg1.delete({ timeout: 15000 })
                    })
                }
                if (!message.member.voice.channelID) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
            })
            distube.on("empty", (song) => {
                msg.reactions.removeAll()
            })
            queue.connection.dispatcher.on("finish", () => {
                msg.reactions.removeAll()
            });
            queue.connection.on("disconnect", () => {
                msg.reactions.removeAll()
            });
        })
    })
    .on("addSong", (message, queue, song) => {
        const userEmbed = new Discord.MessageEmbed()
            .setAuthor(`Adicionado ao Queue`, "https://emoji.gg/assets/emoji/9663_icons_eight_ok.png")
            .setDescription(`<:play:748576561837637703> **[${song.name}](${song.url})**\n❯ **Duração da Música: ${song.formattedDuration}**\n❯ **Filtro: ${queue.filter || "Nenhum"}**\n❯ **Duração do Queue: ${queue.formattedDuration} - ${queue.songs.length} música(s)**\n❯ **Pedido por: ${message.member.user}**`)
            .setThumbnail(song.thumbnail)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(`Volume: ${queue.volume}%`, "https://images.emojiterra.com/twitter/v13.0/512px/1f4e3.png")
        message.channel.send(userEmbed)
    })
    .on("playList", async (message, queue, playlist, song) => {
        const userEmbed = new Discord.MessageEmbed()
            .setAuthor(`Agora a tocar em: ${queue.connection.channel.name}`, "https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png")
            .setDescription(`**${playlist.title} playlist - (${playlist.total_items} músicas)\n<:play:748576561837637703> Agora a tocar ➜ [${song.name}](${song.url})**\n❯ **Duração da Música: ${song.formattedDuration}**\n❯ **Filtros: ${queue.filter || "Nenhum"}**\n❯ **Duração do Queue: ${queue.formattedDuration} - ${queue.songs.length} música(s)**\n❯ **Pedido por: ${message.member.user}**`)
            .setThumbnail(playlist.thumbnail)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(`Volume: ${queue.volume}%`, "https://images.emojiterra.com/twitter/v13.0/512px/1f4e3.png")
        message.channel.send(userEmbed).then(msg => {
            msg.react('⏸').then(r => {
                msg.react('⏹️').then(r => {
                    msg.react('⏭️').then(r => {
                        msg.react("⏯️").then(r => {
                            msg.react("🔀").then(r => {
                                msg.react("📄").then(r => {
                                    msg.react("🔉").then(r => {
                                        msg.react("🔊").then(r => {
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
            const infosFilter = (reaction, user) => reaction.emoji.name === '⏸' && user.id === message.author.id;
            const imagensFilter = (reaction, user) => reaction.emoji.name === '⏹️' && user.id === message.author.id;
            const funFilter = (reaction, user) => reaction.emoji.name === '⏭️' && user.id === message.author.id;
            const resumeFilter = (reaction, user) => reaction.emoji.name === '⏯️' && user.id === message.author.id;
            const musicaFilter = (reaction, user) => reaction.emoji.name === '🔀' && user.id === message.author.id;
            const animaisFilter = (reaction, user) => reaction.emoji.name === '📄' && user.id === message.author.id;
            const volumeFilter = (reaction, user) => reaction.emoji.name === '🔉' && user.id === message.author.id;
            const volumemaisFilter = (reaction, user) => reaction.emoji.name === '🔊' && user.id === message.author.id;
            const volume = msg.createReactionCollector(volumeFilter);
            const volumemais = msg.createReactionCollector(volumemaisFilter);
            const infos = msg.createReactionCollector(infosFilter);
            const imagens = msg.createReactionCollector(imagensFilter);
            const resume = msg.createReactionCollector(resumeFilter);
            const fun = msg.createReactionCollector(funFilter);
            const musica = msg.createReactionCollector(musicaFilter);
            const animais = msg.createReactionCollector(animaisFilter);
            infos.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (!message.member.voice.channelID) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
                if (message.member.voice.channelID) {
                    distube.pause(message)
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`Pausei: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                        .setColor("RANDOM")
                    message.channel.send(embed1)
                }
            })
            resume.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (!message.member.voice.channelID) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
                if (message.member.voice.channel) {
                    distube.resume(message)
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`Voltei a tocar: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                        .setColor("RANDOM")
                    message.channel.send(embed1)
                }
            })
            animais.on('collect', async (r2, user) => {
                r2.users.remove(user)
                let queue = distube.getQueue(message.guild.id);
                if (!queue) return message.reply("<:X:748632517476745226> Não está nada a tocar!"); // Tell the user no song is being played
                const pageBack = "⏪";
                const pageForward = "⏩";
                const trash = "🗑️";
                const num_per_page = 10; // Number of songs to show in a page
                let queuedVideos = queue.songs.slice(); // Make a copy of the queue by value
                let pageContents = []; // This array will contain arrays with length of number of songs to show in a page
                while (queuedVideos.length > 0) {
                    pageContents.push(queuedVideos.splice(0, num_per_page))
                }
                let num_pages = pageContents.length; // The number of pages is the number of arrays in the pageContent arrays
                let currentPage = 0; // Page starts at 0 because array index starts at 0
                let currentListNum = ((currentPage + 1) * num_per_page) - num_per_page; // Calculate the last item's position in a page
                let title = queue.songs.length > 1 ? `Queue Atual ➜ ${queue.songs.length} músicas - ${queue.formattedDuration}` : `Queue Atual - ${queue.songs.length} música`;
                let description = `🎵 **Agora a tocar: [${queue.songs[0].name}](${queue.songs[0].url})**\n\n${pageContents[currentPage].map((song, index) =>
                    `**${currentListNum + (index + 1)} - [${song.name}](${song.url})**`).join('\n')}\n\n`;
                description += `**Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "Todo o queue" : "Esta música" : "Desligado"}**`;
                const embed = new Discord.MessageEmbed()
                    .setTitle(title)
                    .setColor('RANDOM')
                    .setThumbnail(queue.songs[0].thumbnail)
                    .setDescription(description)
                    .setFooter(`Página ${currentPage + 1} de ${num_pages} | Pedido por: ${message.author.tag}`)
                    .setTimestamp();
                const msg = await message.channel.send(embed);
                if (num_pages <= 1) return;
                msg.react(pageBack);
                msg.react(pageForward);
                msg.react(trash);
                const filter = (reaction) => reaction.emoji.name === pageBack || reaction.emoji.name === pageForward || reaction.emoji.name === trash;
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
                    switch (reaction.emoji.name) {
                        case pageBack: {
                            currentPage = currentPage == 0 ? pageContents.length - 1 : currentPage -= 1;
                            break;
                        }
                        case pageForward: {
                            currentPage = currentPage == pageContents.length - 1 ? 0 : currentPage += 1;
                            break;
                        }
                        case trash: {
                            msg.reactions.removeAll()
                            break;
                        }
                    }
                    reaction.users.remove(user);
                    currentListNum = ((currentPage + 1) * num_per_page) - num_per_page;
                    let description = `🎵 **Agora a tocar: [${queue.songs[0].name}](${queue.songs[0].url})**\n\n${pageContents[currentPage].map((video, index) =>
                        `**${currentListNum + (index + 1)} - [${video.name}](${video.url})**`).join('\n')}\n\n`;
                    description += `**Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "Todo o queue" : "Esta música" : "Desligado"}**`;
                    embed.setTitle(title);
                    embed.setDescription(description);
                    embed.setFooter(`Página ${currentPage + 1} de ${num_pages} | Pedido por: ${message.author.tag}`);
                    msg.edit(embed);
                });
                if (!message.member.voice.channel && client.voice.connections) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
            })
            musica.on('collect', (r2, user) => {
                r2.users.remove(user)
                let queue = distube.getQueue(message);
                if (message.member.voice.channel) {
                    distube.shuffle(message)
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`:twisted_rightwards_arrows: Misturei as **${queue.songs.length} músicas** que estão no queue!`)
                        .setColor("RANDOM")
                    message.channel.send(embed1)
                }
                if (!message.member.voice.channel && client.voice.connections) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
            })
            imagens.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (message.member.voice.channel) {
                    distube.stop(message)
                    msg.reactions.removeAll().then(msg1 => {
                        const embed = new Discord.MessageEmbed()
                            .setTitle("Stop!")
                            .setColor("RANDOM")
                            .setDescription(`Parei a música e saí do voice channel!\nPedido por(a): ${message.member.user}\nObrigado por usares o **Bot dos Bostas!**`)
                            .addFields(
                                { name: "Links Importantes:", value: "[Github Repository](https://github.com/TonaS21/bot-dos-bostas)\n[Convida o bot](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot)\n[Server de Suporte](https://discord.gg/DRnnZPS)", inline: false }
                            )
                            .setTimestamp()
                            .setFooter(client.user.username, client.user.displayAvatarURL())
                        msg1.channel.send(embed)
                    })
                }
                if (!message.member.voice.channelID) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
            })
            fun.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (message.member.voice.channelID) {
                    distube.skip(message);
                    let queue = distube.getQueue(message)
                    const vidNext = queue.songs.length > 1 ? `**Agora a tocar: [${queue.songs[1].name}](${queue.songs[1].url})**` : "**Queue vazio ➜ A sair do voice channel!**";
                    const embed1 = new Discord.MessageEmbed()
                        .setTitle("Skip!")
                        .setThumbnail(queue.songs[0].thumbnail)
                        .setDescription(`**Dei skip a: [${queue.songs[0].name}](${queue.songs[0].url})**\n${vidNext}\n**Pedido por:** ${message.author}`)
                        .setFooter(client.user.username, client.user.displayAvatarURL())
                        .setTimestamp()
                        .setColor("RANDOM")
                    message.channel.send(embed1).then(msg2 => {
                        msg2.delete({ timeout: 30000 })
                    })
                    if (queue.dispatcher.destroy) {
                        msg.reactions.removeAll()
                    }
                }
                if (!message.member.voice.channelID) {
                    message.react(":X:748632517476745226")
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`Precisas de estar num voice chat para dares skip à música!`)
                        .setTimestamp()
                    return message.channel.send(embed)
                }
            })
            volume.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (message.member.voice.channel) {
                    distube.setVolume(message, queue.volume - 10)
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`:sound: O volume da música está agora a: **${queue.volume}%**`)
                        .setColor("RANDOM")
                    message.channel.send(embed1).then(() => {
                        message.delete({ timeout: 20000 })
                    })
                }
                if (!message.member.voice.channelID) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
            })
            volumemais.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (message.member.voice.channel) {
                    distube.setVolume(message, queue.volume + 10)
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`:loud_sound: O volume da música está agora a: **${queue.volume}%**`)
                        .setColor("RANDOM")
                    message.channel.send(embed1).then(() => {
                        message.delete({ timeout: 20000 })
                    })
                }
                if (!message.member.voice.channelID) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
            })
            distube.on("empty", (song) => {
                msg.reactions.removeAll()
            })
            queue.connection.dispatcher.on("finish", () => {
                msg.reactions.removeAll()
            });
            queue.connection.on("disconnect", () => {
                msg.reactions.removeAll()
            });
        })
    })
    .on("addList", (message, queue, playlist) => {
        const userEmbed = new Discord.MessageEmbed()
            .setAuthor(`Adicionado ao Queue`, "https://emoji.gg/assets/emoji/9663_icons_eight_ok.png")
            .setDescription(`<:play:748576561837637703> **${playlist.title} playlist - (${playlist.total_items} músicas)**\n❯ **Duração da Playlist: ${playlist.formattedDuration}**\n❯ **Filtro: ${queue.filter || "Nenhum"}**\n❯ **Duração do Queue: ${queue.formattedDuration} - ${queue.songs.length} música(s)**\n❯ **Pedido por: ${message.member.user}**`)
            .setThumbnail(playlist.thumbnail)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(`Volume: ${queue.volume}%`, "https://images.emojiterra.com/twitter/v13.0/512px/1f4e3.png")
        message.channel.send(userEmbed)
    })
    .on("searchResult", (message, result) => {
        let i = 0;
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.member.user.username}, Escolhe uma opção abaixo:`, message.member.user.displayAvatarURL())
            .setDescription(`\n${result.map(song => `**${++i}** - [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n")}\n`)
            .setColor("RANDOM")
            .setFooter(`Escreve uma coisa qualquer nada haver ou espera 60 segundos para cancelar.`)
        message.channel.send(embed).then(msg1 => {
            distube.on("playSong", (message, queue, song) => {
                msg1.delete()
            })
            distube.on("addSong", (message, queue, song) => {
                msg1.delete()
            })
        })
    })
    .on("searchCancel", (message) => {
        const embed = new Discord.MessageEmbed()
            .setDescription("Procura cancelada. Não escreveste a tempo ou escreveste alguma coisa sem sentido.")
            .setColor("RANDOM")
        message.channel.send(embed)
    })
    .on("error", (message, err) => {
        console.log(err);
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`<:X:748632517476745226> Ocorreu um erro <:X:748632517476745226>`)
            .setDescription("```\n" + "Ocorreu um erro: " + err + "```")
            .setColor("RANDOM")
            .setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed)
    })
    .on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 50;
    })
    .on("finish", message => {
        const userEmbed = new Discord.MessageEmbed()
            .setAuthor("Mais nenhuma música no queue, A sair do voice channel.", client.user.displayAvatarURL())
            .setColor("RANDOM")
        message.channel.send(userEmbed);
    })
    .on("empty", message => {
        const embed = new Discord.MessageEmbed()
            .setAuthor("Saí do voice channel porque ninguém estava nele!", client.user.displayAvatarURL())
            .setColor("RANDOM")
        message.channel.send(embed)
    })
    .on("noRelated", message => {
        const embed = new Discord.MessageEmbed()
            .setDescription("Não consegui encontrar nenhuma música. Parei de tocar música.")
            .setColor("RANDOM")
        message.channel.send(embed)
    })
client.login(config.token);
