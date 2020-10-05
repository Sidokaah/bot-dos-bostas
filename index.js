const Discord = require('discord.js'),
    DisTube = require('distube')
const client = new Discord.Client();
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, highWaterMark: 1 << 24, youtubeCookie: "VISITOR_INFO1_LIVE=sTPPpUUKGuY; HSID=AaxFP4U4da2vlvz9P; SSID=AOB5Qg-Aq-K9cyeJ5; APISID=sEDvPOYp5tGQFgZA/AAinim2LxloS9wvc1; SAPISID=E3OiqZDhcBPf2vVp/AxyHLfZUq5m7PlzuH; __Secure-3PAPISID=E3OiqZDhcBPf2vVp/AxyHLfZUq5m7PlzuH; LOGIN_INFO=AFmmF2swRAIgRPjJqjUVLSkepkSmF49iLZyAdnSGuSJtpiXPTtmvwFkCIAR3xrUYEp1SIpj2nN4Wmp0qkAUIcjJrA1LCDsmFv4Um:QUQ3MjNmendtNWszc1o2ZnFyRl9xTldYMEk3UGQtZWdLa3A1ZGdwZHJCRTR0NHJ4SzA2LUhOakVYMHdBazlCUjNhQVBuR0tFclRUQWN2TG8yeXJXZkh5SEkxZTFhc29PSmxQcTc0TkF6NHQzakFvOFM4R0J5ZE1mWERmcFA0M1hfNWN0a3E3R0ZkLVE5WVZhWk5hMUN4TmFPQjlmb2NWVHdwbFB4TGRhRko5Nno2UW5Xa0FKS1Rr; NID=204=xHFWuJ6rwvDlMRpxUXgrG8V8QisopDaJesogwSpclfHpzbvrb1otUPsZ_RR0fb-bXO9bym-Z0bxi_93TLG7E7ECvtUld2CIxRFXp101SrkTAEOg7C8xFi_W3ZkhC4JTo8Yp1QBeUeNhrebUT7gSCN6mUAPnz8GijGmXYxk68k78; CONSENT=YES+PT.en+V9+BX; SID=1wfXO5Q2CHh1PNxoywtLPmAS9hbPvjqypxyLZyGFEienh_PkU70uPW-mS9nsnlnkF6n5yQ.; __Secure-3PSID=1wfXO5Q2CHh1PNxoywtLPmAS9hbPvjqypxyLZyGFEienh_PkTNoIzMyABfiJvl93mv4Z3Q.; PREF=f1=50000000&al=pt-PT&f5=20030&f6=40000400; YSC=pIr0qpp52kg; wide=1; SIDCC=AJi4QfGo8spc7AT6odnZqty4AY-zU-e388cLg3vDlcKtNGRIp0P2ksnM0QOlnOd26bO4I8Zgdi4; __Secure-3PSIDCC=AJi4QfEYRt-czfo5X6FI8HXs0nG6NYpA2oJJu5K8DbyXbq_azKQAuXZxWp_wdNKcf0ZHkIrf_70" });
const Minesweeper = require('discord.js-minesweeper');
const fetch = require('node-fetch');
const config = require("./config.json")
const fecth = require('node-superfetch');
const cheerio = require("cheerio");
const request = require("request");
const moment = require("moment");
const version = "v2.4.1" //também podes mudar para a que quiseres
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
const striptags = require('striptags');//const mongo = require("./mongo")
const { calculator, formatDate } = require("./functions");
const fortnite = require("simple-fortnite-api")
const Client = new fortnite("7f72eb91-2fb4-4143-b75d-a0d0fa6d1306");//token da api do fortnite-tracker
const got = require("got");
const utils = require("./utils/util.js");
const data = require('./tickets.json')
const util = new utils.Utils(client, process.cwd());
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const axios = require("axios");
const SnakeGame = require('./games/snake-game');
const HangmanGame = require('./games/hangman-game');
const snakeGame = new SnakeGame(client);
const hangman = new HangmanGame(client);
const TicTacToe = require('discord-tictactoe');
client.once("ready", async () => {
    let totalMembers = 0
    for (const guild of client.guilds.cache) {
      totalMembers += (await guild[1].members.fetch()).size
    }
    console.log(`${client.user.tag} está pronto para ser usado! ${version}`);
    const statuses = [{ text: `${totalMembers} users | ${config.prefix}help`, type: 'LISTENING' },{ text: `${client.guilds.cache.size} servers | ${config.prefix}help`, type: 'LISTENING' },]
	client.setInterval(() => {
		const activity = statuses[Math.floor(Math.random() * statuses.length)];
		const text = typeof activity.text === 'function' ? activity.text() : activity.text;
		client.user.setActivity(text, { type: activity.type });
    }, 20000);
    //await mongo().then((mongoose) => {//try {//console.log('Conectado ao mongodb!')//} finally {// mongoose.connection.close()//}//})
});
client.on('guildCreate', async (guild) => {
    let joinLeaveChannel = await client.channels.cache.get("746067012341596231");
    let totalMembers = 0
    for (const guild of client.guilds.cache) {
      totalMembers += (await guild[1].members.fetch()).size
    }
	if (joinLeaveChannel) {
		const embed = new Discord.MessageEmbed()
			.setColor("RANDOM")
            .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
			.setTitle(`Entrei em ${guild.name}!`)
			.setFooter(`ID: ${guild.id}`)
			.setTimestamp()
			.setDescription(`**❯ Membros: ${guild.memberCount}\n❯ Estou agora em: ${client.guilds.cache.size} servers\n❯ Com: ${totalMembers} pessoas**`);
		await joinLeaveChannel.send(embed)
	}
});
client.on("guildDelete", async (guild) => {
    let totalMembers = 0
    for (const guild of client.guilds.cache) {
      totalMembers += (await guild[1].members.fetch()).size
    }
    let joinLeaveChannel = await client.channels.cache.get("746067012341596231");
	if (joinLeaveChannel) {
		const embed = new Discord.MessageEmbed()
			.setColor("RANDOM")
            .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
			.setTitle(`Saí de ${guild.name}!`)
			.setFooter(`ID: ${guild.id}`)
			.setTimestamp()
			.setDescription(`**❯ Membros: ${guild.memberCount}\n❯ Estou agora em: ${client.guilds.cache.size} servers\n❯ Com: ${totalMembers} pessoas**`);
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
        return;
    } else {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setTitle(`${emoji} Bem-vindo! ${emoji}`)
            .setDescription(`${member.user}, Bem-vindo(a) ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, espero que te     divirtas connosco! ${emoji1}`)
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
        return;
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
    if(command === "move") {
        if (isNaN(args[0])) return message.channel.send('<:X:748632517476745226> Número inválido.');
		if (args[0] === 0) return message.channel.send(`<:X:748632517476745226> Não consigo mover uma música que já estou a tocar!`);
        let queue = distube.getQueue(message.guild.id);
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
		if ((args[0] > queue.songs.length) || (args[0] && !queue.songs[args[0]])) return message.channel.send('<:X:748632517476745226> Nenhuma música encontrada.');
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
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
            } else {
                message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if(command === "lyrics") {
        let queue = distube.getQueue(message.guild.id);
		var msg = await message.channel.send(`A procurar. . .`)
		if (args.join(" ")) {
			var res = await fetch(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(args.join(" "))}`)
			var lyrics = await res.json()
			if (lyrics.error) return message.channel.send('<:X:748632517476745226> Não está nada a tocar!')
		if (lyrics.lyrics.length >= 2048) {
			    var cut = lyrics.lyrics.length - 2000
			    lyrics.lyrics = lyrics.lyrics.slice(0,0 - cut) + "..."
			}
			var lyricembed = new Discord.MessageEmbed()
			    .setTitle("Letra de " + lyrics.title)
                .setDescription(lyrics.lyrics)
                .setColor("RANDOM")
			message.channel.send(lyricembed) 
	    } else {
            if (!queue) return message.channel.send(`<:X:748632517476745226> Não está nada a tocar!`)
		    var res = await fetch(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(queue.songs[0].name)}`)
		    var lyrics = await res.json()
		    if (lyrics.error) return message.reply('não consegui encontrar a música que estava a tocar.')
		    if (lyrics.lyrics.length >= 2048) {
			    var cut = lyrics.lyrics.length - 2000
			    lyrics.lyrics = lyrics.lyrics.slice(0,-cut) + "..."
			    }
		    var lyricembed = new Discord.MessageEmbed()
		        .setTitle("Letra de " + lyrics.title)
                .setDescription(lyrics.lyrics)
                .setColor("RANDOM")
		    message.channel.send(lyricembed)
        }
    }
    if (["loopnow", "Loopnow", "LoopNow", "LOOPNOW"].includes(command)) {
        let queue = distube.getQueue(message);
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        const embed = new Discord.MessageEmbed()
            .setDescription(`Repeat mode está: **${queue.repeatMode ? queue.repeatMode == 2 ? "Todo o Queue" : "Esta música" : "Desligado"}**`)
            .setColor("RANDOM")
        message.channel.send(embed)
    }
    if (["autoplaynow", "Autoplaynow", "AutoPlayNow", "AUTOPLAYNOW"].includes(command)) {
        let queue = distube.getQueue(message);
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
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
            return message.channel.send(embed)
        }
        voice.channel.join()
        message.channel.send("<:tick:748569437589995731> | Entrei no voice channel!")
    }
    if (["remove", "Remove", "REMOVE"].includes(command)) {
        let queue = distube.getQueue(message.guild.id);
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        if (args[0] < 1 && args[0] >= queue.songs.length) {
            return message.reply('por favor especifica um número válido.');
        }
        var voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('Entra num voice channel e tenta outra vez.');
        if (
            typeof queue.dispatcher == 'undefined' || queue.dispatcher == null
        ) {
            return message.reply('<:X:748632517476745226> Não está nada a tocar!');
        } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
            message.reply(`Precisas de estar no mesmo voice channel do Bot para usares o comando!`);
            return;
        }
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            queue.songs.splice(args[0] - 1, 1);
            const removeembed = new Discord.MessageEmbed()
                .setDescription(`Música número **${args[0]}** removida do queue.`)
                .setColor("RANDOM")
            return message.channel.send(removeembed)
            } else {
                message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (["play", "Play", "PLAY", "p", "P"].includes(command)) {
        distube.options.searchSongs = false
        if (!message.member.voice.channel) {
            message.react("X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para tocares música!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        if (!args.join(" ")) {
            message.react(":X:748632517476745226")
            message.channel.send("<:X:748632517476745226> | Diz-me alguma coisa para eu procurar!")
        }
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel || userVoiceChannel && !clientVoiceConnection.channel) {
            try {
                distube.play(message, args.join(" "))
            } catch (e) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                    .setTitle(`<:X:748632517476745226> Ocorreu um erro`)
                    .setDescription("```\n" + "Ocorreu um erro: " + e + "```")
                	.setColor("RANDOM")
                	.setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
                	.setTimestamp()
            	message.channel.send(embed)
            }
            if(!args.join(" ")) {
                return;
            } else {
                const playembed = new Discord.MessageEmbed()
            	    .setDescription(`<:youtube1:748576732642148472> A procurar no Youtube: **${args.join(" ")}.**`)
            	    .setColor("RANDOM")
        	    message.channel.send(playembed).then(msg1 => {
            	    distube.on("playSong", (message, queue, song) => {
                	    playembed.setDescription(`<:youtube1:748576732642148472> Encontrado no Youtube: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                	    msg1.edit(playembed)
            	    })
            	    distube.on("playList", (message, queue, playlist, song) => {
                	    playembed.setDescription(`<:youtube1:748576732642148472> Encontrado no Youtube: **[${playlist.title}](${playlist.url})** com **${playlist.total_items}** músicas`)
                	    msg1.edit(playembed)
            	    })
            	    distube.on("addSong", (message, queue, song) => {
                	    playembed.setDescription(`<:youtube1:748576732642148472> Adicionado ao queue: **[${song.name}](${song.url})**`)
                	    msg1.edit(playembed)
            	    })
                })
            }
            if(!args.join(" ")) {
                return;
            } else {
                const { voice } = message.member
        	    const connection = await voice.channel.join()
        	    await connection.voice.setSelfDeaf(true)
            }
            } else {
                message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (["search", "Search", "SEARCH"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        if (!args.join(" ")) {
            message.react(":X:748632517476745226")
            message.channel.send("<:X:748632517476745226> | Diz-me alguma coisa para eu procurar!")
        }
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel || userVoiceChannel && !clientVoiceConnection.channel) {
            try {
                distube.play(message, args.join(" "))
            } catch (e) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                    .setTitle(`<:X:748632517476745226> Ocorreu um erro`)
                    .setDescription("```\n" + "Ocorreu um erro: " + e + "```")
                	.setColor("RANDOM")
                	.setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
                	.setTimestamp()
            	message.channel.send(embed)
            }
            if(!args.join(" ")) {
                return;
            } else {
                const playembed = new Discord.MessageEmbed()
            	    .setDescription(`<:youtube1:748576732642148472> A procurar no Youtube: **${args.join(" ")}.**`)
            	    .setColor("RANDOM")
        	    message.channel.send(playembed).then(msg1 => {
            	    distube.on("playSong", (message, queue, song) => {
                	    playembed.setDescription(`<:youtube1:748576732642148472> Encontrado no Youtube: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                	    msg1.edit(playembed)
            	    })
            	    distube.on("playList", (message, queue, playlist, song) => {
                	    playembed.setDescription(`<:youtube1:748576732642148472> Encontrado no Youtube: **[${playlist.title}](${playlist.url})** com **${playlist.total_items}** músicas`)
                	    msg1.edit(playembed)
            	    })
            	    distube.on("addSong", (message, queue, song) => {
                	    playembed.setDescription(`<:youtube1:748576732642148472> Adicionado ao queue: **[${song.name}](${song.url})**`)
                	    msg1.edit(playembed)
            	    })
                })
            }
            } else {
                message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (command === "clearqueue") {
        let queue = distube.getQueue(message.guild.id);
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        if (!message.member.voice.channelID) return message.channel.send("<:X:748632517476745226> Precisas de estar num voice channel para usares o comando!")
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
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
                message.channel.send(clearembed1)
                return; 
            }
            queue.songs = [queue.songs[0]];
            const clearembed = new Discord.MessageEmbed()
                .setDescription(`🗑️ O queue foi removido! Adiciona mais músicas ou o playback vai acabar quando acabar esta música.`)
                .setColor("RANDOM")
            message.channel.send(clearembed)
            } else {
                message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (["np", "NP", "Np", "nowplaying", "Nowplaying", "NowPlaying", "NOWPLAYING", "current", "Current", "CURRENT"].includes(command)) {
        let queue = distube.getQueue(message.guild.id);
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
            } else {
                message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (["repeat", "loop", "Repeat", "Loop", "REPEAT", "LOOP"].includes(command)) {
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
            let mode = distube.setRepeatMode(message, parseInt(args[0]));
            mode = mode ? mode == 2 ? "Repetir o queue" : "Repetir a música" : "Desligado";
            const embed = new Discord.MessageEmbed()
                .setDescription("O Loop agora está agora: `" + mode + "`")
                .setColor("RANDOM")
            message.channel.send(embed)
            } else {
                message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (["stop", "leave", "Stop", "Leave", "STOP", "LEAVE", "disconnect", "Disconnect", "DISCONNECT"].includes(command)) {
        let queue = distube.getQueue(message.guild.id)
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`<:X:748632517476745226> Precisas de estar num voice chat para parares música!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
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
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (["skip", "Skip", "SKIP"].includes(command)) {
        let queue = distube.getQueue(message.guild.id)
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
            distube.skip(message);
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
    if (["pause", "Pause", "PAUSE"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para pausares música!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        let queue = distube.getQueue(message.guild.id)
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        if(distube.isPlaying = false){
            const cembed = new Discord.MessageEmbed()
                .setDescription("A música já não está a tocar!")
                .setColor("RANDOM")
            return message.channel.send(cembed)
        }
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            distube.pause(message);
            const embed1 = new Discord.MessageEmbed()
                .setDescription(`Pausei: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                .setColor("RANDOM")
            message.channel.send(embed1)
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (["resume", "Resume", "RESUME"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        let queue = distube.getQueue(message.guild.id)
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        if(distube.isPlaying = true){
            const cembed = new Discord.MessageEmbed()
                .setDescription("A música já está a tocar!")
                .setColor("RANDOM")
            return message.channel.send(cembed)
        }
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            distube.resume(message);
            const embed1 = new Discord.MessageEmbed()
                .setDescription(`Voltei a tocar: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                .setColor("RANDOM")
            message.channel.send(embed1)
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `haas`, `flanger`, `gate`, `reverse`].includes(command)) {
        let queue = distube.getQueue(message.guild.id)
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para mudares filters!`)
            return message.channel.send(embed)
        }
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            let filter = distube.setFilter(message, command);
            message.channel.send("Filtro do queue atual: " + (filter || "Off"));
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (["queue", "Queue", "QUEUE", "q", "Q"].includes(command)) {
        let queue = distube.getQueue(message.guild.id)
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            const pageBack = "⏪";
            const pageForward = "⏩";
            const trash = "🗑️";
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
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if ([`volume`, `Volume`, `VOLUME`, `v`, `V`].includes(command)) {
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
        let queue = distube.getQueue(message.guild.id)
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            distube.setVolume(message, args[0]);
            if (args[0] > 200) {
                distube.setVolume(message, 200);
                const errembed = new Discord.MessageEmbed()
                    .setDescription(`<:X:748632517476745226> O máximo de volume é **200%**, então pus o volume a **200%** e não **${args[0]}%**.`)
                    .setColor("RANDOM")
                message.channel.send(errembed)
            } else {
                distube.setVolume(message, args[0]);
                const embed1 = new Discord.MessageEmbed()
                    .setDescription(`:loud_sound: O volume da música está agora a: **${queue.volume}%**`)
                    .setColor("RANDOM")
                message.channel.send(embed1)
            }
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (["shuffle", "Shuffle", "SHUFFLE"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para misturares o queue!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        let queue = distube.getQueue(message.guild.id)
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            if(queue.songs.length < 3) {
                const embed2 = new Discord.MessageEmbed()
                    .setDescription(`<:X:748632517476745226> Só existem **${queue.songs.length} música(s)** no queue, por isso não vou dar shuffle!`)
                    .setColor("RANDOM")
                message.channel.send(embed2)
            }
            if(queue.songs.length >= 3) {
                distube.shuffle(message)
                const embed1 = new Discord.MessageEmbed()
                    .setDescription(`:twisted_rightwards_arrows: Misturei as **${queue.songs.length} músicas** que estão no queue!`)
                    .setColor("RANDOM")
                message.channel.send(embed1)
            }
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (["jumpto", "JumpTo", "JUMPTO", "skipto", "SkipTo", "SKIPTO"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para passares para outra música!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        if (!args.length){
            const erroembed = new Discord.MessageEmbed()
                .setDescription("<:X:748632517476745226> Precisas de especificar um número para saltares.")
                .setColor("RANDOM")
            message.channel.send(erroembed)
        }
        if (isNaN(args[0])) {
            const erroembed = new Discord.MessageEmbed()
                .setDescription("<:X:748632517476745226> Isso não é um número.")
                .setColor("RANDOM")
            message.channel.send(erroembed)
        }
        let queue = distube.getQueue(message.guild.id)
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        if (args[0] > queue.songs.length) return message.reply(`Só estão **${queue.songs.length} músicas** no queue, por isso não dá para usares o comando!`)
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            queue.playing = true;
            if (queue.repeatMode) {
                for (let i = 0; i < args[0] - 2; i++) {
                queue.songs.push(queue.songs.shift());
            }
            } else {
                queue.songs = queue.songs.slice(args[0] - 2);
            }
            queue.connection.dispatcher.end();
            const embed1 = new Discord.MessageEmbed()
                .setDescription(`⬆️ Saltei para o número **${parseInt(args[0])}** no queue!`)
                .setColor("RANDOM")
            message.channel.send(embed1)
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (["jump", "Jump", "JUMP", "j", "J"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para passares para outra música!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        if (!parseInt(args[0])) {
            const erroembed = new Discord.MessageEmbed()
                .setDescription("Precisas de especificar um número para saltares.")
                .setColor("RANDOm")
            message.channel.send(erroembed)
        }
        if (isNaN(args[0])) {
            const erroembed = new Discord.MessageEmbed()
                .setDescription("Isso não é um número.")
                .setColor("RANDOm")
            message.channel.send(erroembed)
        }
        let queue = distube.getQueue(message.guild.id)
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            distube.jump(message, parseInt(args[0]))
            const embed1 = new Discord.MessageEmbed()
                .setDescription(`⬆️ Saltei **${parseInt(args[0])} músicas** no queue!`)
                .setColor("RANDOM")
            message.channel.send(embed1)
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (["autoplay", "Autoplay", "AUTOPLAY", "ap", "AP"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para usares autoplay!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        let queue = distube.getQueue(message.guild.id)
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        let mode = distube.toggleAutoplay(message);
        message.channel.send("Autoplay está agora: `" + (mode ? "On" : "Off") + "`");
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            let mode = distube.toggleAutoplay(message);
            message.channel.send("Autoplay está agora: `" + (mode ? "On" : "Off") + "`");
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (["playSkip", "PlaySkip", "playskip", "PLAYSKIP"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        let queue = distube.getQueue(message.guild.id)
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel || userVoiceChannel && !clientVoiceConnection.channel) {
            distube.options.searchSongs = true
            distube.playSkip(message, args.join(" "));
            const embed = new Discord.MessageEmbed()
                .setDescription(`:track_next: Vou dar skip à música que está a tocar e começar a tocar a que escolheres!`)
                .setColor("RANDOM")
            message.channel.send(embed)
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (command === "bitch") {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel || userVoiceChannel && !clientVoiceConnection.channel) {
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
        	let songs = ["https://www.youtube.com/watch?v=6Dh-RL__uN4", "https://www.youtube.com/watch?v=YNNXTs6adIs", "https://www.youtube.com/watch?v=BuNmXYmTRQE", "https://www.youtube.com/watch?v=0oq7805Fxfw", "https://www.youtube.com/watch?v=Z9uLwuGTTFk", "https://www.youtube.com/watch?v=uoww4ou3Ark", "https://www.youtube.com/watch?v=KprzFp9A0kc", "https://www.youtube.com/watch?v=eoK-Ew_0Nw8", "https://www.youtube.com/watch?v=i20TUj4d8sw", "https://www.youtube.com/watch?v=34WnaTTGIKw", "https://www.youtube.com/watch?v=5FusviCrZOk", "https://www.youtube.com/watch?v=52_hLibBRzY", "https://www.youtube.com/watch?v=0uCgyy1pjyo", "https://www.youtube.com/watch?v=qlZvOytosLc"];
            distube.playCustomPlaylist(message, songs, { title: "Bitch Lasagna Playlist" });
        	} else {
            	message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (["playlist", "plist", "nice", "pl"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 25000 })
            })
        }
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel || userVoiceChannel && !clientVoiceConnection.channel) {
        	const link = "https://www.youtube.com/playlist?list=PLoghuztPHEOmUOvxezqqgswuKteWkqMqI"
        	const playembed = new Discord.MessageEmbed()
            	.setDescription(`<:youtube1:748576732642148472> A procurar no Youtube: **${link}**`)
            	.setColor("RANDOM")
        	message.channel.send(playembed).then(msg1 => {
            	distube.on("playList", (message, queue, playlist, song) => {
                	playembed.setDescription(`<:youtube1:748576732642148472> Encontrado no Youtube: **[${playlist.title}](${playlist.url})** com 	**${playlist.total_items}** músicas`)
                	msg1.edit(playembed)
            	})
            	distube.on("addList", (message, queue, playlist, song) => {
                	playembed.setDescription(`<:youtube1:748576732642148472> Adicionado ao queue: **[${playlist.title}](${playlist.url})** com **${playlist.total_items}** músicas`)
                	msg1.edit(playembed)
            	})
        	})
        	const { voice } = message.member
        	const connection = await voice.channel.join()
        	await connection.voice.setSelfDeaf(true)
        	distube.play(message, link);
        	} else {
            	message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (command === "cool") {
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
            return message.channel.send(embed)
        }
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel || userVoiceChannel && !clientVoiceConnection.channel) {
        	const link = "https://www.youtube.com/playlist?list=PLmqDeXnpymEVIOC83A3coUEY6P9u-1MNN"
        	const playembed = new Discord.MessageEmbed()
            	.setDescription(`<:youtube1:748576732642148472> A procurar no Youtube: **${link}**`)
            	.setColor("RANDOM")
        	message.channel.send(playembed).then(msg1 => {
            	distube.on("playList", (message, queue, playlist, song) => {
                	playembed.setDescription(`<:youtube1:748576732642148472> Encontrado no Youtube: **[${playlist.title}](${playlist.url})** com 	**${playlist.total_items}** músicas`)
                	msg1.edit(playembed)
            	})
            	distube.on("addList", (message, queue, playlist, song) => {
                	playembed.setDescription(`<:youtube1:748576732642148472> Adicionado ao queue: **[${playlist.title}](${playlist.url})** com **${playlist.total_items}** músicas`)
                	msg1.edit(playembed)
            	})
        	})
        	const { voice } = message.member
        	const connection = await voice.channel.join()
        	await connection.voice.setSelfDeaf(true)
        	distube.play(message, link);
        	} else {
            	message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
    if (command === "reddit") {
        let Subreddit = message.content.slice(8);
        if(message.channel.nsfw) {
            process.on("unhandledRejection", (err) => {
                message.channel.send(`Houve um erro:\n` + "```" + err + "```")
            })
            let img = await api(Subreddit, true);
            const Embed = new Discord.MessageEmbed()
                .setTitle(`Um meme aleatório do r/${Subreddit}`)
                .setColor("RANDOM")
                .setImage(img)
                .setURL(`https://reddit.com/r/${Subreddit}`)
                .setTimestamp()
            message.channel.send(Embed);
        } else {
            message.channel.send(`<:X:748632517476745226> Este comando só pode ser usado em canais de NSFW!`)
        }
        if (!Subreddit) {
            message.react(":X:748632517476745226")
            return message.channel.send(`**Não especificaste um Subreddit!**`);
        }
    }
    if (command === "meme") {
        const subreddits = ["https://www.reddit.com/r/meme/random/.json", "https://www.reddit.com/r/dankmemes/random/.json", "https://www.reddit.com/r/memes/random/.json"]
        const randomMessage = subreddits[Math.floor(Math.random() * subreddits.length)];
        got(randomMessage).then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "amongus") {
        process.on("unhandledRejection", (err) => {
            message.channel.send(`Houve um erro:\n` + "```" + err + "```")
        })
        got('https://www.reddit.com/r/AmongUs/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "facepalm") {
        process.on("unhandledRejection", (err) => {
            message.channel.send(`Houve um erro:\n` + "```" + err + "```")
        })
        got('https://www.reddit.com/r/facepalm/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "sports") {
        got('https://www.reddit.com/r/SportsMemes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "4chan") {
        got('https://www.reddit.com/r/greentext/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "twitter") {
        got('https://www.reddit.com/r/bestoftwitter/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "minecraftmeme") {
        got('https://www.reddit.com/r/MinecraftMemes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "discordmeme") {
        got('https://www.reddit.com/r/Discordmemes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "wholesome") {
        got('https://www.reddit.com/r/wholesomememes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "cursed") {
        got('https://www.reddit.com/r/cursedimages/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "food") {
        got('https://www.reddit.com/r/FoodPorn/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} | 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "comic") {
        got('https://www.reddit.com/r/comics/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "meirl") {
        got('https://www.reddit.com/r/me_irl/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "animais") {
        got('https://www.reddit.com/r/aww/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "starwars") {
        got('https://www.reddit.com/r/StarWarsMemes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "kitty") {
        got('https://www.reddit.com/r/CatsBeingCats/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "lizardboi") {
        got('https://www.reddit.com/r/Lizards/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "snakes") {
        got('https://www.reddit.com/r/snakes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "quacc") {
        got('https://www.reddit.com/r/duck/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "cursedminecraft") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/CursedMinecraft/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "foxsays") {
        got('https://www.reddit.com/r/Fox/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "panda") {
        got('https://www.reddit.com/r/PandasBeingClumsy/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "ferret") {
        got('https://www.reddit.com/r/ferrets/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
    if (command === "goose") {
        got('https://www.reddit.com/r/geese/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
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
            .setDescription("**Todas as categorias de comandos:**\n\n" + `**O prefix atual do server é ➜ ${prefix}**`+ "\n``` ℹ️  Info\n⚙️ Moderação\n📷 Imagens\n😆 Fun\n🤣 Memes\n🎵 Música\n🐶 Animais```")
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
            ajuda.setTitle(":gear: • __Mod__ [14]")
            ajuda.setDescription(`\`clear\`, \`poll\`, \`announce\`, \`report\`, \`ban\`, \`kick\`, \`giverole\`, \`delrole\`, \`hasrole\`, \`slowmode\`, \`setprefix\`, \`createticket\`, \`ticket close\`, \`sugestão\`.`)
            msg.edit(ajuda)
        })
        infos.on('collect', (r2, user) => {
            r2.users.remove(user)
            ajuda.setTitle(":information_source: • __Info__ [23]")
            ajuda.setDescription(`\`userinfo\`, \`ping\`, \`covid\`, \`uptime\`, \`steam\`, \`invite\`, \`help-eng\`, \`weather\`, \`instagram\`, \`serverinfo\`, \`yt\`, \`math\`, \`urban\`, \`fortnite\`, \`kpop\`, \`name\`, \`define\`, \`acrónimo\`, \`rhymer\`, \`sobre\`, \`categorias\`, \`wiki\`, \`csgo\`.`)
            msg.edit(ajuda)
        })
        fun.on('collect', (r2, user) => {
            r2.users.remove(user)
            ajuda.setTitle("<:super_mega_laugh:738387807260770347> • __Fun__ [31]")
            ajuda.setDescription(`\`randomfacts\`, \`8ball\`, \`slap\`, \`roast\`, \`neves\`, \`exposesezul\`, \`crepper\`, \`rps\`, \`flip\`, \`minesweeper\`, \`badjoke\`, \`advice\`, \`isretarded\`, \`say\`, \`isgamer\`, \`isgay\`, \`issimp\`, \`lenny\`, \`captcha\`, \`pp\`, \`isloli\`, \`iswaifu\`, \`isanimegirl\`, \`isdank\`, \`istoxic\`, \`no-u\`, \`chat\`, \`emojify\`, \`snake-game\`, \`hangman\`, \`tic-tac-toe\`.`)
            msg.edit(ajuda)
        })
        mem.on('collect', (r2, user) => {
            r2.users.remove(user)
            ajuda.setTitle("<:pepesad:749210746499498015> • __Meme__ [14]")
            ajuda.setDescription(`\`meme\`, \`reddit\`, \`twitter\`, \`meirl\`, \`comic\`, \`twitter\`, \`wholesome\`, \`discordmeme\`, \`minecraftmeme\`, \`4chan\`, \`sports\`, \`facepalm\`, \`starwars\`, \`amongus\`.`)
            msg.edit(ajuda)
        })
        mu.on('collect', (r2, user) => {
            r2.users.remove(user)
            ajuda.setTitle("<:youtube:748576732642148472> • __Música__ [31]")
            ajuda.setDescription(`\`play ou p\`, \`search\`, \`stop ou leave\`, \`skip\`, \`pause\`, \`resume\`, \`autoplay\`, \`shuffle\`, \`queue ou q\`, \`volume\`, \`jump\`, \`repeat ou loop\`, \`playSkip\`, \`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`, \`haas\`, \`reverse\`, \`flanger\`, \`gate\`, \`np ou nowplaying\`, \`loopnow\`, \`autoplaynow\`, \`clearqueue\`, \`remove\`, \`cool\`, \`lyrics\`, \`skipto\`, \`move\`.`)
            msg.edit(ajuda)
        })
        ani.on('collect', (r2, user) => {
            r2.users.remove(user)
            ajuda.setTitle(":dog: • __Animais__ [10]")
            ajuda.setDescription(`\`dogs\`, \`kitty\`, \`quacc\`, \`foxsays\`, \`lizardboi\`, \`panda\`, \`animais\`, \`snake\`, \`ferret\`, \`goose\`.`)
            msg.edit(ajuda)
        })
        ima.on('collect', (r2, user) => {
            r2.users.remove(user)
            ajuda.setTitle(":camera: • __Imagens__ [24]")
            ajuda.setDescription(`\`inverse\`, \`wanted\`, \`cursedimg\`, \`cursedminecraft\`, \`food\`, \`animepunch\`, \`shit\`, \`delete\`, \`trash\`, \`hitler\`, \`greyscale\`, \`deepfry\`, \`beautiful\`, \`affect\`, \`gif\`, \`randomgif\`, \`sticker\`, \`randomsticker\`, \`blur\`, \`changemymind\`, \`clyde\`, \`supreme\`, \`tweet\`, \`trumptweet\`.`)
            msg.edit(ajuda)
        })
      }) 
    }
    if (message.content === `${prefix}help all`) {
        message.react(":tick:748569437589995731")
        const userEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Lista de Comandos", client.user.displayAvatarURL())
            .setDescription(`<:discord1:748909489293492376> **Server de Suporte:** [Link](https://discord.gg/fnvdugV)\n<:paulbot:759341625167839232> **Invite do Bot:** [Link](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=271969366&scope=bot)\n<:github:748909140084129872> **Github Repository:** [Link](https://github.com/TonaS21/bot-dos-bostas)\n\n**O prefix atual do server é ➜ ${prefix}**`)
            .addField(":information_source: • __Info__ [23]", `\`userinfo\`, \`ping\`, \`covid\`, \`uptime\`, \`steam\`, \`invite\`, \`help-eng\`, \`weather\`, \`instagram\`, \`serverinfo\`, \`yt\`, \`math\`, \`urban\`, \`fortnite\`, \`kpop\`, \`name\`, \`define\`, \`acrónimo\`, \`rhymer\`, \`sobre\`, \`categorias\`, \`wiki\`, \`csgo\`.`)
            .addField(":gear: • __Mod__ [14]", `\`clear\`, \`poll\`, \`announce\`, \`report\`, \`ban\`, \`kick\`, \`giverole\`, \`delrole\`, \`hasrole\`, \`slowmode\`, \`setprefix\`, \`createticket\`, \`ticket close\`, \`sugestão\`.`)
            .addField(":camera: • __Imagens__ [24]", `\`inverse\`, \`wanted\`, \`cursedminecraft\`, \`cursedimg\`, \`food\`, \`animepunch\`, \`shit\`, \`delete\`, \`trash\`, \`hitler\`, \`greyscale\`, \`deepfry\`, \`beautiful\`, \`affect\`, \`gif\`, \`randomgif\`, \`sticker\`, \`randomsticker\`, \`blur\`, \`changemymind\`, \`clyde\`, \`supreme\`, \`tweet\`, \`trumptweet\`.`)
            .addField("<:super_mega_laugh:738387807260770347> • __Fun__ [31]", `\`randomfacts\`, \`8ball\`, \`slap\`, \`roast\`, \`neves\`, \`exposesezul\`, \`crepper\`, \`rps\`, \`flip\`, \`minesweeper\`, \`badjoke\`, \`advice\`, \`isretarded\`, \`say\`, \`isgamer\`, \`isgay\`, \`issimp\`, \`lenny\`, \`captcha\`, \`pp\`, \`isloli\`, \`iswaifu\`, \`isanimegirl\`, \`isdank\`, \`istoxic\`, \`no-u\`, \`chat\`, \`emojify\`, \`snake-game\`, \`hangman\`, \`tic-tac-toe\`.`)
            .addField("<:pepesad:749210746499498015> • __Meme__ [14]", `\`meme\`, \`reddit\`, \`twitter\`, \`meirl\`, \`comic\`, \`twitter\`, \`wholesome\`, \`discordmeme\`, \`minecraftmeme\`, \`4chan\`, \`sports\`, \`facepalm\`, \`starwars\`, \`amongus\`.`)
            .addField("<:youtube:748576732642148472> • __Música__ [31]", `\`play ou p\`, \`search\`, \`stop ou leave\`, \`skip\`, \`pause\`, \`resume\`, \`autoplay\`, \`shuffle\`, \`queue ou q\`, \`volume\`, \`jump\`, \`repeat ou loop\`, \`playSkip\`, \`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`, \`haas\`, \`reverse\`, \`flanger\`, \`gate\`, \`np ou nowplaying\`, \`loopnow\`, \`autoplaynow\`, \`clearqueue\`, \`remove\`, \`cool\`, \`lyrics\`, \`skipto\`, \`move\`.`)
            .addField(":dog: • __Animais__ [10]", `\`dogs\`, \`kitty\`, \`quacc\`, \`foxsays\`, \`lizardboi\`, \`panda\`, \`animais\`, \`snake\`, \`ferret\`, \`goose\`.`)
            .setFooter(`Pedido por(a): ${message.member.displayName}`, message.author.displayAvatarURL())
            .setTimestamp()
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help imagens`) {
        message.react(":tick:748569437589995731")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("__Comandos:__", `\`inverse\`, \`wanted\`, \`cursedimg\`, \`cursedminecraft\`, \`food\`, \`animepunch\`, \`shit\`, \`delete\`, \`trash\`, \`hitler\`, \`greyscale\`, \`deepfry\`, \`beautiful\`, \`affect\`, \`gif\`, \`randomgif\`, \`sticker\`, \`randomsticker\`, \`blur\`.`)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help animais`) {
        message.react(":tick:748569437589995731")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("__Comandos:__", `\`dogs\`, \`kitty\`, \`quacc\`, \`foxsays\`, \`lizardboi\`, \`panda\`, \`animais\`, \`snake\`, \`ferret\`, \`goose\`.`)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help infomod`) {
        message.react(":tick:748569437589995731")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("__Comandos:__", `\`userinfo\`, \`clear\`, \`poll\`, \`announce\`, \`ping\`, \`report\`, \`ban\`, \`kick\`, \`covid\`, \`uptime\`, \`steam\`, \`help-eng\`, \`invite\`, \`weather\`, \`instagram\`, \`lock\`, \`serverinfo\`, \`yt\`, \`math\`, \`giverole\`, \`delrole\`, \`hasrole\`, \`urban\`, \`fortnite\`, \`slowmode\`, \`kpop\`, \`name\`, \`define\`, \`acrónimo\`, \`rhymer\`, \`sobre\`, \`categorias\`, \`csgo\`.`)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help meme`) {
        message.react(":tick:748569437589995731")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("__Comandos:__", `\`meme\`, \`reddit\`, \`twitter\`, \`meirl\`, \`comic\`, \`twitter\`, \`wholesome\`, \`discordmeme\`, \`minecraftmeme\`, \`4chan\`, \`sports\`, \`facepalm\`, \`starwars\`, \`amongus\`.`)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help fun`) {
        message.react(":tick:748569437589995731")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("__Comandos:__", `\`randomfacts\`, \`8ball\`, \`slap\`, \`roast\`, \`neves\`, \`exposesezul\`, \`p!ng\`, \`pong\`, \`crepper\`, \`rps\`, \`flip\`, \`minesweeper\`, \`badjoke\`, \`advice\`, \`isretarded\`, \`say\`, \`isgamer\`, \`isgay\`, \`issimp\`, \`lenny\`, \`captcha\`, \`pp\`, \`isloli\`, \`iswaifu\`, \`isanimegirl\`, \`isdank\`, \`istoxic\`, \`no-u\`, \`chat\`, \`emojify\`, \`snake-game\`, \`hangman\`, \`tic-tac-toe\`.`)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help música`) {
        message.react(":tick:748569437589995731")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("__Comandos de música:__", `\`play ou p\`, \`search\`, \`stop ou leave\`, \`skip\`, \`pause\`, \`resume\`, \`autoplay\`, \`shuffle\`, \`queue ou q\`, \`volume\`, \`jump\`, \`repeat ou loop\`, \`playSkip\`, \`np ou nowplaying\`, \`loopnow\`, \`autoplaynow\`, \`clearqueue\`, \`remove\`, \`cool\`, \`lyrics\`, \`skipto\`, \`move\`.`)
            .addField("__Filtros de música:__", `\`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`, \`haas\`, \`reverse\`, \`flanger\`, \`gate\`.`)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help-eng`) {
        message.react(":tick:748569437589995731")
        const userEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Command List", client.user.displayAvatarURL())
            .setDescription(`<:discord1:748909489293492376> **Support Server:** [Link](https://discord.gg/fnvdugV)\n<:paulbot:759341625167839232> **Invite the Bot:** [Link](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=271969366&scope=bot)\n<:github:748909140084129872> **Github Repository:** [Link](https://github.com/TonaS21/bot-dos-bostas)\n\n**The server's current prefix is ➜ ${prefix}**`)
            .addField(":information_source: • __Info__ [23]", `\`userinfo\`, \`ping\`, \`covid\`, \`uptime\`, \`steam\`, \`invite\`, \`help-eng\`, \`weather\`, \`instagram\`, \`serverinfp\`, \`yt\`, \`math\`, \`urban\`, \`fortnite\`, \`kpop\`, \`name\`, \`define\`, \`acrónimo\`, \`rhymer\`, \`sobre\`, \`categorias\`, \`wiki\`, \`csgo\`.`)
            .addField(":gear: • __Mod__ [14]", `\`clear\`, \`poll\`, \`announce\`, \`report\`, \`ban\`, \`kick\`, \`giverole\`, \`delrole\`, \`hasrole\`, \`slowmode\`, \`setprefix\`, \`createticket\`, \`ticket close\`, \`sugestão\`.`)
            .addField(":camera: • __Images__ [23]", `\`inverse\`, \`wanted\`, \`cursedimg\`, \`food\`, \`animepunch\`, \`shit\`, \`delete\`, \`trash\`, \`hitler\`, \`greyscale\`, \`deepfry\`, \`beautiful\`, \`affect\`, \`gif\`, \`randomgif\`, \`sticker\`, \`randomsticker\`, \`blur\`, \`changemymind\`, \`clyde\`, \`supreme\`, \`tweet\`, \`trumptweet\`.`)
            .addField("<:super_mega_laugh:738387807260770347> • __Fun__ [31]", `\`randomfacts\`, \`8ball\`, \`slap\`, \`roast\`, \`neves\`, \`exposesezul\`, \`crepper\`, \`rps\`, \`flip\`, \`minesweeper\`, \`badjoke\`, \`advice\`, \`isretarded\`, \`say\`, \`isgamer\`, \`isgay\`, \`issimp\`, \`lenny\`, \`captcha\`, \`pp\`, \`isloli\`, \`iswaifu\`, \`isanimegirl\`, \`isdank\`, \`istoxic\`, \`no-u\`, \`chat\`, \`emojify\`, \`snake-game\`, \`hangman\`, \`tic-tac-toe\`.`)
            .addField("<:pepesad:749210746499498015> • __Meme__ [14]", `\`meme\`, \`reddit\`, \`twitter\`, \`meirl\`, \`comic\`, \`twitter\`, \`wholesome\`, \`discordmeme\`, \`minecraftmeme\`, \`4chan\`, \`sports\`, \`facepalm\`, \`starwars\`, \`amongus\`.`)
            .addField("<:youtube:748576732642148472> • __Music__ [31]", `\`play ou p\`, \`search\`, \`stop ou leave\`, \`skip\`, \`pause\`, \`resume\`, \`autoplay\`, \`shuffle\`, \`queue ou q\`, \`volume\`, \`jump\`, \`repeat ou loop\`, \`playSkip\`, \`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`, \`haas\`, \`reverse\`, \`flanger\`, \`gate\`, \`np ou nowplaying\`, \`loopnow\`, \`autoplaynow\`, \`clearqueue\`, \`remove\`, \`cool\`, \`lyrics\`, \`skipto\`, \`emojify\`.`)
            .addField(":dog: • __Animals__ [10]", `\`dogs\`, \`kitty\`, \`quacc\`, \`foxsays\`, \`lizardboi\`, \`panda\`, \`animais\`, \`snake\`, \`ferret\`, \`goose\`.`)
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
            "A Nutella foi reinventada durante a Segunda Guerra Mundial, quando um italiano adicionou avelãs ao chocolate para estender a validade do produto e diminuir o preço dessa delícia. O mundo inteiro agradece.", "Se um gato preto passar à tua frente, quer dizer que ele quer ir a um lado seu burro", "Um leão só consegue rugir a partir dos 2 anos de idade.", "Os ursos polares são canhotos.", "Um bocejo dura em media 6 segundos.",
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
        
__**Disclaimer**__
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
            `${member.user} is actually pretty good looking, but has a boring personality. Good looks but boring personality, you’re like real life clickbait.`, `${member.user} has worn the same outfit for like 10 years. Holy shit….the only person who’s worn the same clothes longer than you is Bart Simpson. `, `${member.user} I’m glad you and your dull personality could be here. I’m excited to hear your speech at the wedding. With your personality, I’m sure your speech will combine the thrill of talking, with the excitement of standing there. `, `${member.user}\'s outfit was recently featured on the cover of Yawn Magazine. `,
            `We are doing this roast tonight to help ${member.user} live out one of his sexual fantasies, to have a room full of his friends shit all over him. `, `A little known fact is that a long time ago ${member.user} used to work at McDonald’s. It was the last time anyone said about your work, “I’m lovin’ it.” `, `This is exciting ${member.user} right?? Well tell your face. `, `${member.user} if laughter is the best medicine, your face must be curing the world. `, `It’s nice to see such a diverse crowd here today. We’ve got Indians, Jews, Whites, and whatever the fuck ${member.user} is.`, `But ${member.user} you’re really looking good nowadays. What he has lost in weight, he has also GAINED in weight.`,
            `${member.user} I checked your Facebook, and it turns out you used to be a bit chubby. I’m impressed that you’ve managed to lose so much weight. That’s right, he lost 30 pounds on Nutrisystem, and another 10 when he shaved his back.`, `${member.user} you're so fat and lazy the only exercise he gets is when his Restless Leg Syndrome starts flaring up.`, `${member.user} you look like if the fat kid from Stranger Things wished he was big.`, `The church didn’t accept ${member.user}\'s gay lifestyle. So he started his own religion: The Church of Latter Day Taints. It’s like a normal church, except you’re happy when the priest fucks you.`,
            `Me and ${member.user} are really good friends but we’ve had our ups and downs, one time he actually tried to sue me for $10,000. I got really defensive and was like “You’re suing me for $10,000?? Fuck you…you can suck my dick.” and he was like, “well OK if you want to settle out of court.”`, `When I heard that ${member.user} finally came out of the closet I wasn’t really surprised….dude you’re so gay MY ass hurts.`, `I once asked ${member.user} why he dresses so flamboyantly and he got upset and hit me with his purse.`, `Backstage before this speech I rolled a gigantic fatty. Because that was the only way we could get ${member.user} on to the stage.`]
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
        if(message.channel.nsfw) {
            try {
                var embed = new Discord.MessageEmbed()
                    .setAuthor(`Urban Dictionary ➜ Resultado para: [${args.join()}]`, image)
                    .setTitle(list[0].word.toUpperCase())
                    .setURL(list[0].permalink)
                    .setDescription(`**Definição de __${list[0].word}__**\n${list[0].definition}\n\n**Exemplo para __${list[0].word}__**\n${list[0].example}\n\n`)
                    .addField(`Autor`, `${list[0].author}`)
                    .addField(`Rating`, `👍 ${list[0].thumbs_up.toLocaleString()} | 👎 ${list[0].thumbs_down.toLocaleString()}`)
                    .setColor("BLUE")
                    .setTimestamp()
                    .setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
                message.channel.send(embed);
            }
            catch (error) {
                console.log(error)
                return message.channel.send("Parece que estragaste esta bosta! Vai pó crl.")
            }
        } else {
            message.channel.send(`<:X:748632517476745226> Este comando só pode ser usado em canais de NSFW!`)
        }
    }
    if (command === "clear") {
        const messageArray = message.content.split(' ');
        const args = messageArray.slice(1);
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`<:X:748632517476745226> Falta-me permissão para apagar mensagens!`)
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
        const messages = [`${message.member.user}, deu **Cara**! <:cara:755159085070155936>`, `${message.member.user}, deu **Coroa**! <:coroa:755158379768578169>`]
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
        message.reply('A calcular o ping <a:loading2:751573442037284924>...').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            resultMessage.edit("Pong! `" + `${ping}ms` + "`")
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
        let msg = await message.channel.send("A procurar <a:loading2:751573442037284924>")
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
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`<:X:748632517476745226> Não tenho permissões para banir pessoas!`)
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
        if(message.guild.id === "577155568699965444") {
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
        }
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
        if(message.guild.id === "577155568699965444") return channel.send(`<:tick:748569437589995731> ${user} foi banido por ${message.author}\n**Reason**: ${reason}`)
        else {
            message.channel.send(`<:tick:748569437589995731> ${user} foi banido por ${message.author}\n**Reason**: ${reason}`)
        }
    }
    if (command === "mute") {
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`<:X:748632517476745226> Não tenho permissões para gerir Roles!`)
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("Não podes usar isso!");
        var user = message.mentions.users.first();
        if (!user) return message.reply("Não mencionaste ninguém ou estás a tentar mutar um bot.");
        var member;
        try { member = await message.guild.members.fetch(user); } catch (err) {
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
            if(message.guild.id === "577155568699965444") {
            	const embed2 = new Discord.MessageEmbed()
                	.setColor("RANDOM")
                	.setAuthor(user.tag, user.displayAvatarURL())
                	.setDescription(`:warning: ${user} foi desmutado.`)
                	.setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                	.setFooter(`ID do usuário: ${user.id}`)
                	.setTimestamp();
            	channel1.send(embed2);
            }
        }, time);
        message.channel.send(`:warning: ${user} foi mutado por ${message.author} por **${rawTime}.**\n**Razão**: ${reason}.`)
    }
    if (command === "kick") {
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(`<:X:748632517476745226> Não tenho permissões para kickar pessoas!`)
        if (!message.member.hasPermission('BAN_MEMBERS', "KICK_MEMBERS")) return message.reply("Não podes usar isso!");
        var user = message.mentions.users.first();
        if (!user) return message.reply("Não mencionaste ninguém ou estás a tentar kickar um bot");
        var member;
        try {
            member = await message.guild.members.fetch(user);
        } catch (err) {
            member = null;
        }
        if (member) {
            if (member.hasPermission('KICK_MEMBERS', "BAN_MEMBERS")) return message.reply("Não podes kickar essa pessoa!");
        }
        var reason = args.splice(1).join(' ');
        if (!reason) return message.reply('Precisas de dar uma razão.');
        if(message.guild.id === "577155568699965444") {
        	let channel1 = await client.channels.cache.get("746067012341596231");
        	const embed1 = new Discord.MessageEmbed()
            	.setColor("RANDOM")
            	.setAuthor(user.tag, user.displayAvatarURL())
            	.setDescription(`:outbox_tray: ${user} foi kickado por ${message.author}.`)
            	.setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            	.addField("Razão", `${reason}`)
            	.setFooter(`ID do usuário: ${user.id}`)
            	.setTimestamp();
        	channel1.send(embed1);
        }
        var embed = new Discord.MessageEmbed()
            .setTitle("Foste Kickado!")
            .setDescription(reason)
            .setColor("#F93A2F")
        try {
            await user.send(embed);
        } catch (err) {
            console.warn(err);
        }
        member.kick(user);
        var channel = message.guild.channels.cache.find(c => c.name === 'logs');
        if(message.guild.id === "577155568699965444") return channel.send(`<:tick:748569437589995731> ${user} foi kickado por ${message.author}\n**Reason**: ${reason}`)
        else {
            message.channel.send(`<:tick:748569437589995731> ${user} foi kickado por ${message.author}\n**Reason**: ${reason}`)
        }
        
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
            .setDescription('Só podes ser avisado 3 vezes, por isso tenta o não ser mais vezes!')
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
        const baseUrl = "https://corona.lmao.ninja/v2";
        let url, response, corona;
        try {
            url = args[0] ? `${baseUrl}/countries/${args[0]}`:`${baseUrl}/all`
            response = await axios.get(url)
            corona = response.data
        } catch (error) {
            const noArgs = new Discord.MessageEmbed()
                .setTitle('Erro!')
                .setColor("RANDOM")
                .setDescription(`__**${args[0]}**__ não existe, ou a API não está a responder.`)
                .setTimestamp()
            message.channel.send(noArgs)
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(args[0] ? ` Estatísticas da Covid-19 em/no(a/s): ${args[0].toUpperCase()}` : 'Estatísticas da Covid-19 no Mundo 🌎')
            .setColor('RANDOM')
            .setThumbnail(args[0] ? corona.countryInfo.flag : 'https://www.jdv.com.br/midias/artigos/Imagens/1200px-sars-cov-2_without_background.png')
            .addFields(
                { name: 'Casos Confirmados:', value: `${corona.cases.toLocaleString()}`, inline: true },
                { name: 'Mortes:', value: `${corona.deaths.toLocaleString()}\n(${((corona.deaths / corona.cases) * 100).toFixed(2)}%)`, inline: true },
                { name: 'Recuperados:', value: `${corona.recovered.toLocaleString()}\n(${((corona.recovered / corona.cases) * 100).toFixed(2)}%)`, inline: true },
                { name: 'Casos Ativos:', value: `${corona.active.toLocaleString()}\n(${((corona.active / corona.cases) * 100).toFixed(2)}%)`, inline: true },
                { name: 'Testes:', value: `${corona.tests.toLocaleString()}`, inline: true },
                { name: 'Cuidados Intensi.:', value: `${corona.critical.toLocaleString()}\n(${((corona.critical / corona.cases) * 100).toFixed(2)}%)`, inline: true },
                { name: 'Casos Hoje:', value: `${corona.todayCases.toLocaleString()}`, inline: true },
                { name: 'Mortes Hoje:', value: `${corona.todayDeaths.toLocaleString()}`, inline: true },
                { name: 'Hoje Recuperados:', value: `${corona.todayRecovered.toLocaleString().replace("-", "")}`, inline: true })
        await message.channel.send(embed)
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
        pollChannel.send(embedPoll).then(msg2 => {
            msg2.react(':tick:748569437589995731')
        	msg2.react(':X:748632517476745226')
        })
        message.delete();
    }
    if (command === "steam") {
        const token = "F8BEC15D1BCE2CBB0F182E8F47B6D683";
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
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const uptime = new Discord.MessageEmbed()
            .setTitle("Uptime")
            .setDescription(duration)
            .setTimestamp()
        	.setColor("RANDOM")
        message.channel.send(uptime)
    }
    if (command === "sobre") {
        let totalMembers = 0
        for (const guild of client.guilds.cache) {
            totalMembers += (await guild[1].members.fetch()).size
        }
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${message.member.user.username}, aqui está tudo sobre o ${client.user.username}!`, message.member.user.displayAvatarURL())
            .setDescription(`Olá, eu sou o **${client.user.username}**! Sou um Bot Multiusos feito pelo TonaS#9344! Sou feito com a library [Discord.js](https://discord.js.org/#/) e com o Module de música [DisTube](https://distube.js.org/)! Escreve \`${prefix}help\` para veres os meus comandos.\n[Convida-me](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=271969366&scope=bot) para o teu server!\n O Bot foi criado a - ${moment.utc(client.user.createdAt).format("dddd, MMMM Do YYYY")}.`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .addField("Tenho comandos de diversos tópicos, como:", "```\n🎶 de Música\n🤣 de Memes\n🐶 de Animais\n📷 de Imagens\n😆 de Entretenimento\n🔧 de Informação\n⚙️ de Moderação!```")
        	.addField("Uptime", "```" + duration + "```")
            .addFields(
                { name: "Users:", value: "```" + `${totalMembers}` + "```", inline: true },
                { name: "Servers:", value: "```" + `${client.guilds.cache.size}` + "```", inline: true },
                { name: "Shards:", value: "```" + `${client.options.shards.length}` + "```", inline: true },
                { name: "Discord.js", value: "```" + `v12.2.0` + "```", inline: true },
                { name: "Node.js", value: "```" + process.version + "```", inline: true },
                { name: "DisTube", value: "```" + `v${distube.version}` + "```", inline: true }
            )
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed);
    }
    if(command === "guilds") {
        if(!message.author.id === "343491235975135243") return message.channel.send("Não podes usar este comando por este ser exclusivo ao Owner do Bot!")
        if(message.author.id === "343491235975135243") {
            const embed = new Discord.MessageEmbed()
                .setDescription(client.guilds.cache.map((guild) => `**${guild.name}** - ${guild.memberCount} membros`).join("\n"))
                .setColor("RANDOM")
            message.channel.send(embed)
        }
    }
    if (command === "invite") {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Convida o Bot!")
            .setDescription("Convida o bot para o teu server para o utilizares como quiseres!")
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .addField("\u200B", `**ENG**-If you want to invite **${client.user.username}** to other servers, here's the link: [Link](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=271969366&scope=bot).\n
            **PT**- Se quiseres convidar o **${client.user.username}** para outro server, aqui está o link: [Link](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=271969366&scope=bot).`);
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
                .setDescription(`__**${current.skytext}**__`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setTitle(`Temperatura em: ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor("RANDOM")
                .addField('Fuso Horário:', `UTC${location.timezone}`, true)
                .addField('Unidade Temp.:', 'Celsius', true)
                .addField('Temperatura:', `${current.temperature}°`, true)
                .addField('Vento:', `${current.winddisplay}`, true)
                .addField('Parece que estão:', `${current.feelslike}°`, true)
                .addField('Humidade:', `${current.humidity}%`, true)
                .addField('Atualizado a:', `${current.observationtime}`, true)
                .addField('Data:', `${current.day}, ${current.date}`, true)
                .addField('Sky Code:', `${current.skycode}`, true)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp()
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
        const members = message.guild.members.cache;
        const { guild } = message;
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
            .setThumbnail(guild.iconURL())
            .addField('Criado a', guild.createdAt.toLocaleString())
            .addField('Dono do Server', guild.owner.user.tag, true)
            .addField('Região', guild.region, true)
            .addField('Membros Totais', guild.memberCount, true)
            .addField('Membros Totais Reais', guild.members.cache.filter(member => !member.user.bot).size, true)
            .addField('Bots Totais', guild.members.cache.filter(member => member.user.bot).size, true)
            .addField('Channels Totais', guild.channels.cache.size, true)
            .addField('Chats de Texto', `<:text:757184168244543499> ${guild.channels.cache.filter(ch => ch.type === 'text').size}`, true)
            .addField('Voice Channels', `<:voice:757184156882174031> ${guild.channels.cache.filter(ch => ch.type === 'voice').size}`, true)
            .addField('Boosts', `<:boost:757181670758547456> ${guild.premiumSubscriptionCount}` || `0`, true)
            .addField("Presença", `<:online:757181609643474964>${members.filter(member => member.presence.status === "online").size}\n<:status_idle:757181623652581416> ${members.filter(member => member.presence.status === "idle").size}\n<:dnd:757181634050261092> ${members.filter(member => member.presence.status === "dnd").size}\n<:offline:757181657504546847> ${members.filter(member => member.presence.status === "offline").size}`, true)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
            .setDescription(`**Roles**\n${guild.roles.cache.map(role => role.toString()).join(' ')}`);
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
    if (command === "inverse") {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let image = await canva.invert(user.displayAvatarURL({ dynamic: false, format: 'png' }));
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
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`<:X:748632517476745226> Não tenho permissões para gerir Roles!`)
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
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`<:X:748632517476745226> Não tenho permissões para gerir Roles!`)
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
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("<:X:748632517476745226> Não tenho permissões gerir canais!")
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("<:X:748632517476745226> Não tens permissões para usar este comando!")
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
        if(message.channel.nsfw) {
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
        } else {
            message.channel.send(`<:X:748632517476745226> Este comando só pode ser usado em canais de NSFW!`)
        }
    }
    if (command === "sticker") {
        if(message.channel.nsfw) {
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
        } else {
            message.channel.send(`<:X:748632517476745226> Este comando só pode ser usado em canais de NSFW!`)
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
    if(command === "sugestão") {
        const { guild } = message;
        let MSG = args.join(" ")
        if (!MSG) return message.channel.send(`Não especificaste uma mensagem para mandar!`).then(msg => {
            msg.delete({timeout: 7500})
        })
        const _ = new Discord.MessageEmbed()
            .setAuthor(`Nova sugestão feita para ${guild.name}`, guild.iconURL())
            .addField("Sugestão", `> **${MSG}**`)
            .addField("Quem fez a sugestão", `> ${message.author}`)
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter("⬆️ - Concordar | ⬇️ - Discordar")
            .setTimestamp()
        message.channel.send(_).then(msg => {
            msg.react("⬆️")
            msg.react("⬇️")
        })
        message.delete();
    }
    if(command === "ticket") {
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Faltam-me permissões para usar este comando!")
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
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Faltam-me permissões para usar este comando!")
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
                await c.send(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL()).setTimestamp().addField('Razão', `${reason}`).addField('Explica-te', "Explica o porquê de teres criado o ticket!" ).setDescription(`Obrigado por teres criado o ticket.\nOs Admins já te vão ajudar!`).setColor("RANDOM"))
            })
            data.id++;
            fs.writeFile('./tickets.json', '{\n"id":' + data.id + "\n}", (err) => {
                if (!err) return;
                console.error(err)
            })
        }
        if(!args[0]) {
            message.channel.send("Especifica a razão para criares o ticket.")
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
    if(command === "wiki") {
        let msg = message.content.split(" ");
        let messagefull = "";
        for (var i = 1; i < msg.length; i++) {
			messagefull = messagefull + msg[i] + " "
		}
		let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${messagefull}&utf8=&format=json`
		request({
			url: url,
			json: true
		}, function getteamdata(error, response, body) {
			if (!error && response.statusCode === 200 && body.query.search[0]) {
				let finalurl = `http://en.wikipedia.org/?curid=${body.query.search[0].pageid}`
				let snippet = striptags(body.query.search[0].snippet)
				let embed = new Discord.MessageEmbed()
					.setTitle(`<:wikipedia:753608078343274627> ${body.query.search[0].title}`)
					.setAuthor(message.author.tag, message.author.displayAvatarURL())
					.setDescription(`${snippet} ➜ [Lê mais](${finalurl})`)
					.setColor("RANDOM")
					.addField('Número de Palavras', `**➜ ${body.query.search[0].wordcount}**`, true)
                    .setFooter(`Artigo da Wikipédia procurado a`, client.user.displayAvatarURL())
                    .setTimestamp()
				message.channel.send({embed});
			} else {
				message.reply(`O termo \`${messagefull}\` não tem nenhum resultado.`);
			}
		})
		return;
    }
    if(command === "supreme") {
        const text = args.join(" ");
        if (!text) return message.channel.send("Please provide text!");
        const image = `https://api.alexflipnote.dev/supreme?text=${encodeURIComponent(text)}`;
        message.channel.send(image)
    }
    if(command === "changemymind") {
        const text = args.join(" ");
        if (!text) return message.channel.send("Please provide text");
        const sendMsg = await message.channel.send("⚙ Processing Image..");
        const data = await fetch(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`).then((res) =>
            res.json()
        );
        sendMsg.delete();
        message.channel.send(data.message);
    }
    if(command === "clyde") {
        const text = args.join(" ");
        if (!text) return message.channel.send("Please provide text");
        const sendMsg = await message.channel.send("⚙ Processing Image..");
        const data = await fetch(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`).then((res) =>
            res.json()
        );
        sendMsg.delete();
        message.channel.send(data.message);
    }
    if(command === "tweet") {
        const text = args.join(" ");
        const { username } = message.author;
        if (!text) return message.channel.send("Please provide text");
        const sendMsg = await message.channel.send("⚙ Processing Image..");
        const data = await fetch(
            `https://nekobot.xyz/api/imagegen?type=tweet&text=${text}&username=${username}`
        )
        .then((res) => res.json())
        .catch(() => {
            message.channel.send("Something went wrong!");
        });
        sendMsg.delete();
        message.channel.send(data.message);
    }
    if(command === "trumptweet") {
        const text = args.join(" ");
        if (!text) return message.channel.send("Please provide text");
        const sendMsg = await message.channel.send("⚙ Processing Image..");
        const data = await fetch(
            `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`
        )
        .then((res) => res.json())
        .catch(() => {
            message.channel.send("Something went wrong!");
        });
        sendMsg.delete();
        message.channel.send(data.message);
    }
    if(command === "csgo") {
        function getStatData(location , $){
            var selector = $('.segment-stats .value').eq(location).text();
            var stat_array = $.parseHTML(selector);
            var stat = 0;
            if(stat_array == null || stat_array.lengh == 0){
                return -1;
            }else{
                stat = stat_array[0].data;
            }
        
            return stat;
        } 
        var UR_L = "https://tracker.gg/csgo/profile/steam/" + args[0] + "/overview";
        if(!args[0]){
            return message.channel.send("Please Enter a valid STEAMID64");
        }
        request(UR_L, function(err, resp, body){
            $ = cheerio.load(body);
            var KD = getStatData(0, $);
            if(KD == -1){
                return message.channel.send("Invalid, make sure your profile is not private and you have entered a valid STEAMID64!");
            }
            var KILLS = getStatData(1, $);
            var WIN = getStatData(2, $);
            var MVP = getStatData(3, $);
            var HS = getStatData(4, $);
            var DEATHS = getStatData(5, $);
            var aa = getStatData(6, $);
            var bb = getStatData(7, $);
            var SCORE = getStatData(8, $);
            var MONEY = getStatData(9, $);
            var dd = getStatData(10, $);
            var ss = getStatData(11, $);
            var BS = getStatData(12, $);
            var BD = getStatData(13, $);
            var HR = getStatData(14, $);
            var embed = new Discord.MessageEmbed()
                .setTitle("__***CSGO Stats***__")
                .setURL(UR_L)
                .setDescription("__**Estatísticas atuais**__")
                .addFields(
                    { name: "KD Ratio: " , value: "__" + KD + "__" + "\n" ,inline: true },
                    { name: "Precisão dos Tiros: ", value: "__" + ss + "__" + "\n",inline: true },
                    { name: "Dano Total Infrigido: ", value: "__" + dd + "__" + "\n",inline: true },
                    { name: "Derrotas Totais: ", value: "__" + bb + "__" + "\n",inline: true },
                    { name: "Vitórias Totais: ", value: "__" + aa + "__" + "\n",inline: true },
                    { name: "Percentagem Vitórias: ", value: "__" + WIN + "__" + "\n",inline: true },
                    { name: "MVPs Totais: ", value: "__" + MVP + "__" + "\n",inline: true },
                    { name: "Score Total: ", value: "__" + SCORE + "__" + "\n",inline: true },
                    { name: "Kills Totais: ", value: "__" + KILLS + "__" + "\n",inline: true },
                    { name: "Mortes Totais: ", value: "__" + DEATHS + "__" + "\n",inline: true },
                    { name: "Bombas Plantadas: ", value: "__" + BS + "__" + "\n",inline: true },
                    { name: "Bombas Defusadas: ", value: "__" + BD + "__" + "\n",inline: true },
                    { name: "Headshots Totais: ", value: "__" + HS + "__" + "\n",inline: true },
                    { name: "Dinheiro Recebido: ", value: "__" + MONEY + "__" + "\n",inline: true },
                    { name: "Hostages Resgatados: ", value: "__" + HR + "__" + "\n",inline: true },
                )
                .setTimestamp()
                .setFooter("Powered by: tracker.gg/csgo", client.user.displayAvatarURL())
                .setThumbnail("https://www.digitalhot.com.br/wp-content/uploads/2018/01/LOGO-CSGO-SKINS.png")
                .setColor("RANDOM");
            message.channel.send(embed);
        })
    }
    if(command === "chat") {
        let mesg = args.join(" ");
        if (!mesg) return message.channel.send("Please say something.");
        message.channel.startTyping()
        const response = await fetch(`https://some-random-api.ml/chatbot?message=${encodeURIComponent(mesg)}`)
        const json = await response.json()
        message.channel.send(json.response);
        return message.channel.stopTyping(true)
    }
    if(command === "emojify") {
        const numberMap = {'0': ':zero:', '1': ':one:', '2': ':two:', '3': ':three:', '4': ':four:', '5': ':five:', '6': ':six:', '7': ':seven:', '8': ':eight:', '9': ':nine:',};
        if (!args[0]) return message.channel.send('Por favor especifica uma mensagem para tornar em emoji!');
        let msg = message.content.slice(message.content.indexOf(args[0]), message.content.length);
        msg = msg.split('').map(c => {
            if (c === ' ') return c;
            else if (/[0-9]/.test(c)) return numberMap[c];
            else return (/[a-zA-Z]/.test(c)) ? ':regional_indicator_' + c.toLowerCase() + ':' : '';
        }).join('');
        if (msg.length > 2048) {
            msg = msg.slice(0, msg.length - (msg.length - 2033)); 
            msg = msg.slice(0, msg.lastIndexOf(':')) + '**...**';
        }
        message.channel.send(msg);
    }
    if (command === 'snake-game') {
        snakeGame.newGame(message);
    }
    if (command === 'hangman') {
        hangman.newGame(message);
    }
    new TicTacToe({
        language: 'pt',
        command: `${prefix}tic-tac-toe`,
    }, client);
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
                if (!message.member.voice.channelID) {
                    message.react(":X:748632517476745226")
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`Precisas de estar num voice chat para pausares música!`)
                    return message.channel.send(embed).then(msg => {
                        msg.delete({ timeout: 25000 })
                    })
                }
                let queue = distube.getQueue(message.guild.id)
                if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
                if(distube.isPlaying = false){
                    const cembed = new Discord.MessageEmbed()
                        .setDescription("A música já não está a tocar!")
                        .setColor("RANDOM")
                    return message.channel.send(cembed)
                }
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
                    distube.pause(message);
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`Pausei: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                        .setColor("RANDOM")
                    message.channel.send(embed1)
                } else {
                    message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                }
            })
            resume.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (!message.member.voice.channelID) {
                    message.react(":X:748632517476745226")
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`Precisas de estar num voice chat para resumires música!`)
                    return message.channel.send(embed).then(msg => {
                        msg.delete({ timeout: 25000 })
                    })
                }
                let queue = distube.getQueue(message.guild.id)
                if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
                if(distube.isPlaying = true){
                    const cembed = new Discord.MessageEmbed()
                        .setDescription("A música já está a tocar!")
                        .setColor("RANDOM")
                    return message.channel.send(cembed)
                }
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
                    distube.resume(message);
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`Voltei a tocar: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                        .setColor("RANDOM")
                    message.channel.send(embed1)
                } else {
                    message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                }
            })
            animais.on('collect', async (r2, user) => {
                r2.users.remove(user)
                let queue = distube.getQueue(message.guild.id)
                if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
                    const pageBack = "⏪";
                    const pageForward = "⏩";
                    const trash = "🗑️";
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
                } else {
                    message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                }
            })
            musica.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (!message.member.voice.channelID) {
                    message.react(":X:748632517476745226")
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`Precisas de estar num voice chat para misturares o queue!`)
                    return message.channel.send(embed).then(msg => {
                        msg.delete({ timeout: 25000 })
                    })
                }
                let queue = distube.getQueue(message.guild.id)
                if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
                    if(queue.songs.length < 3) {
                        const embed2 = new Discord.MessageEmbed()
                            .setDescription(`<:X:748632517476745226> Só existem **${queue.songs.length} música(s)** no queue, por isso não vou dar shuffle!`)
                            .setColor("RANDOM")
                        message.channel.send(embed2)
                    }
                    if(queue.songs.length >= 3) {
                        distube.shuffle(message)
                        const embed1 = new Discord.MessageEmbed()
                            .setDescription(`:twisted_rightwards_arrows: Misturei as **${queue.songs.length} músicas** que estão no queue!`)
                            .setColor("RANDOM")
                        message.channel.send(embed1)
                    }
                } else {
                    message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                }
            })
            imagens.on('collect', (r2, user) => {
                r2.users.remove(user)
                let queue = distube.getQueue(message.guild.id)
                if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
                if (!message.member.voice.channelID) {
                    message.react(":X:748632517476745226")
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`<:X:748632517476745226> Precisas de estar num voice chat para parares música!`)
                    return message.channel.send(embed).then(msg => {
                        msg.delete({ timeout: 25000 })
                    })
                }
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
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
                } else {
                    message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                }
            })
            fun.on('collect', (r2, user) => {
                r2.users.remove(user)
                let queue = distube.getQueue(message.guild.id)
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
                    distube.skip(message);
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
            })
            volume.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (!message.member.voice.channelID) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
                    distube.setVolume(message, queue.volume - 10)
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`:loud_sound: O volume da música está agora a: **${queue.volume}%**`)
                        .setColor("RANDOM")
                    message.channel.send(embed1).then(msg1 => {
                        msg1.delete({ timeout: 25000 })
                    })
                } else {
                    message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                }
            })
            volumemais.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (!message.member.voice.channelID) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
                    distube.setVolume(message, queue.volume + 10)
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`:loud_sound: O volume da música está agora a: **${queue.volume}%**`)
                        .setColor("RANDOM")
                    message.channel.send(embed1).then(msg1 => {
                        msg1.delete({ timeout: 25000 })
                    })
                } else {
                    message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                }
            })
            distube.on("empty", (song) => {
                msg.reactions.removeAll()
            })
            queue.connection.dispatcher.on("finish", () => {
                msg.reactions.removeAll()
                volume.stop()
                volumemais.stop()
                fun.stop()
                imagens.stop()
                musica.stop()
                animais.stop()
                resume.stop()
                infos.stop()
            });
            queue.connection.on("disconnect", () => {
                msg.reactions.removeAll()
                volume.stop()
                volumemais.stop()
                fun.stop()
                imagens.stop()
                musica.stop()
                animais.stop()
                resume.stop()
                infos.stop()
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
            .setDescription(`**[${playlist.title}](${playlist.url}) playlist - (${playlist.total_items} músicas)\n<:play:748576561837637703> Agora a tocar ➜ [${song.name}](${song.url})**\n❯ **Duração da Música: ${song.formattedDuration}**\n❯ **Filtros: ${queue.filter || "Nenhum"}**\n❯ **Duração do Queue: ${queue.formattedDuration} - ${queue.songs.length} música(s)**\n❯ **Pedido por: ${message.member.user}**`)
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
                    message.react(":X:748632517476745226")
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`Precisas de estar num voice chat para pausares música!`)
                    return message.channel.send(embed).then(msg => {
                        msg.delete({ timeout: 25000 })
                    })
                }
                let queue = distube.getQueue(message.guild.id)
                if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
                if(distube.isPlaying = false){
                    const cembed = new Discord.MessageEmbed()
                        .setDescription("A música já não está a tocar!")
                        .setColor("RANDOM")
                    return message.channel.send(cembed)
                }
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
                    distube.pause(message);
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`Pausei: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                        .setColor("RANDOM")
                    message.channel.send(embed1)
                } else {
                    message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                }
            })
            resume.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (!message.member.voice.channelID) {
                    message.react(":X:748632517476745226")
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`Precisas de estar num voice chat para resumires música!`)
                    return message.channel.send(embed).then(msg => {
                        msg.delete({ timeout: 25000 })
                    })
                }
                let queue = distube.getQueue(message.guild.id)
                if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
                if(distube.isPlaying = true){
                    const cembed = new Discord.MessageEmbed()
                        .setDescription("A música já está a tocar!")
                        .setColor("RANDOM")
                    return message.channel.send(cembed)
                }
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
                    distube.resume(message);
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`Voltei a tocar: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                        .setColor("RANDOM")
                    message.channel.send(embed1)
                } else {
                    message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                }
            })
            animais.on('collect', async (r2, user) => {
                r2.users.remove(user)
                let queue = distube.getQueue(message.guild.id)
                if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
                    const pageBack = "⏪";
                    const pageForward = "⏩";
                    const trash = "🗑️";
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
                } else {
                    message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                }
            })
            musica.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (!message.member.voice.channelID) {
                    message.react(":X:748632517476745226")
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`Precisas de estar num voice chat para misturares o queue!`)
                    return message.channel.send(embed).then(msg => {
                        msg.delete({ timeout: 25000 })
                    })
                }
                let queue = distube.getQueue(message.guild.id)
                if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
                    if(queue.songs.length < 3) {
                        const embed2 = new Discord.MessageEmbed()
                            .setDescription(`<:X:748632517476745226> Só existem **${queue.songs.length} música(s)** no queue, por isso não vou dar shuffle!`)
                            .setColor("RANDOM")
                        message.channel.send(embed2)
                    }
                    if(queue.songs.length >= 3) {
                        distube.shuffle(message)
                        const embed1 = new Discord.MessageEmbed()
                            .setDescription(`:twisted_rightwards_arrows: Misturei as **${queue.songs.length} músicas** que estão no queue!`)
                            .setColor("RANDOM")
                        message.channel.send(embed1)
                    }
                } else {
                    message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                }
            })
            imagens.on('collect', (r2, user) => {
                r2.users.remove(user)
                let queue = distube.getQueue(message.guild.id)
                if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
                if (!message.member.voice.channelID) {
                    message.react(":X:748632517476745226")
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`<:X:748632517476745226> Precisas de estar num voice chat para parares música!`)
                    return message.channel.send(embed).then(msg => {
                        msg.delete({ timeout: 25000 })
                    })
                }
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
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
                } else {
                    message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                }
            })
            fun.on('collect', (r2, user) => {
                r2.users.remove(user)
                let queue = distube.getQueue(message.guild.id)
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
                    distube.skip(message);
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
            })
            volume.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (!message.member.voice.channelID) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
                    distube.setVolume(message, queue.volume - 10)
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`:loud_sound: O volume da música está agora a: **${queue.volume}%**`)
                        .setColor("RANDOM")
                    message.channel.send(embed1).then(msg1 => {
                        msg1.delete({ timeout: 25000 })
                    })
                } else {
                    message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                }
            })
            volumemais.on('collect', (r2, user) => {
                r2.users.remove(user)
                if (!message.member.voice.channelID) {
                    message.channel.send("<:X:748632517476745226> | Precisas de estar no voice channel para usares isto.")
                }
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
                    distube.setVolume(message, queue.volume + 10)
                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`:loud_sound: O volume da música está agora a: **${queue.volume}%**`)
                        .setColor("RANDOM")
                    message.channel.send(embed1).then(msg1 => {
                        msg1.delete({ timeout: 25000 })
                    })
                } else {
                    message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                }
            })
            distube.on("empty", (song) => {
                msg.reactions.removeAll()
            })
            queue.connection.dispatcher.on("finish", () => {
                msg.reactions.removeAll()
                volume.stop()
                volumemais.stop()
                fun.stop()
                imagens.stop()
                musica.stop()
                animais.stop()
                resume.stop()
                infos.stop()
            });
            queue.connection.on("disconnect", () => {
                msg.reactions.removeAll()
                volume.stop()
                volumemais.stop()
                fun.stop()
                imagens.stop()
                musica.stop()
                animais.stop()
                resume.stop()
                infos.stop()
            });
        })
    })
    .on("addList", (message, queue, playlist) => {
        const userEmbed = new Discord.MessageEmbed()
            .setAuthor(`Adicionado ao Queue`, "https://emoji.gg/assets/emoji/9663_icons_eight_ok.png")
            .setDescription(`<:play:748576561837637703> **[${playlist.title}](${playlist.url}) playlist - (${playlist.total_items} músicas)**\n❯ **Duração da Playlist: ${playlist.formattedDuration}**\n❯ **Filtro: ${queue.filter || "Nenhum"}**\n❯ **Duração do Queue: ${queue.formattedDuration} - ${queue.songs.length} música(s)**\n❯ **Pedido por: ${message.member.user}**`)
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
        message.channel.send(embed)
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