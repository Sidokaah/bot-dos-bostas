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
var version = "v.2.3.5" //também podes mudar para a que quiseres
//const mongo = require("./mongo")
const superagent = require("superagent");
const ms = require("ms");
const querystring = require("querystring");
const { search } = require('superagent');
var dateFormat = require('dateformat');
const api = require("imageapi.js");
const weather = require("weather-js")
const { Random } = require("something-random-on-discord")
const random = new Random();
const Canvacord = require("canvacord");
const canva = new Canvacord();
const fs = require("fs")
const { calculator, formatDate } = require("../Bot dos Bostas/functions");
const fortnite = require("simple-fortnite-api")
const Client = new fortnite("7f72eb91-2fb4-4143-b75d-a0d0fa6d1306");//token da api do fortnite-tracker
const got = require("got");
client.once("ready", async () => {
    console.log(`${client.user.tag} está pronto para ser usado! ${version}`);
    setInterval(() => { //podes mudar os estados
        const statuses = [
            `Counter Strike: Global Offensive | ${config.prefix}help`,
            `Team Fortress 2 | ${config.prefix}help`,
            `Super Smash Bros. Ultimate | ${config.prefix}help`,
            `Minecraft | ${config.prefix}help`,
            `Grand Theft Auto V | ${config.prefix}help`,
            `Rocket League | ${config.prefix}help`
        ]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, { type: "PLAYING" })
    }, 5000)
    //await mongo().then((mongoose) => {
    //    try {
    //      console.log('Conectado ao mongodb!')
    //    } finally {
    //      mongoose.connection.close()
    //    }
    //})
});
client.on('guildCreate', guild => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text') //não te aconselho a mudares isto
    const embed = new Discord.MessageEmbed()
        .setAuthor("Bot dos Bostas:")
        .setColor("#F93A2F")
        .setDescription(`Sup everyone, eu sou o **Bot dos Bostas**. Obrigado por me adicionarem ao vosso server. Para verem os comandos em português, faz ${config.prefix}help. Para os veres em inglês, faz ${config.prefix}help-eng.`)
        .addField("Coisas importantes:", "❯ [Server de Suporte](https://discord.gg/DRnnZPS) - Caso tenhas alguma dúvida ou esteja a haver algum erro ou bug, estás à vontade para entrar no server!")
        .addField("❯ Discord.js:", `[Site](https://discord.js.org/#/) - Library em que o bot foi baseado.!`)
        .addField("❯ Criador: TonaS#9344", "Disfruta dos mais de 120 comandos!")
        .setTimestamp()
    channel.send(embed)
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
            .setFooter("Bot dos Bostas", client.user.displayAvatarURL())
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
            .setFooter("Bot dos Bostas", client.user.displayAvatarURL())
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
    const query = querystring.stringify({ term: args.join(' ') });
    if(command === "setprefix") {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("não podes usar isso")
        if(!args[0] || args[0 == "help"]) return message.channel.send("Como usar: -setprefix (prefix)")
        let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"))
        prefixes[message.guild.id] = {
            prefixes: args[0]
        };
        fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
            if(err) console.log(err)
        });
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle("Successo!")
            .setDescription(`Mudaste o prefix do server para: ${args[0]}`)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setColor("RANDOM")
        message.channel.send(embed)
    }
    if (["play", "Play", "PLAY", "p", "P"].includes(command)) {
        distube.options.searchSongs = false
        if (!message.member.voice.channelID) {
            message.react("❌")
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        if (!args.join(" ")) {
            message.react("❌")
            message.channel.send("❌ | Diz-me alguma coisa para eu procurar!")
        }
        try {
            distube.play(message, args.join(" "))
        } catch (e) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(`❌ Ocorreu um erro ❌`)
                .setDescription("```\n" + "Ocorreu um erro: " + err + "```")
                .setColor("#F93A2F")
                .setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
                .setTimestamp()
            message.channel.send(embed)
        }
        message.channel.send(`🎶 A procurar no Youtube: **${args.join(" ")}.** 🎶`)
    }
    if (["search", "Search", "SEARCH"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react("❌")
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        if (!args.join(" ")) {
            message.react("❌")
            message.channel.send("❌ | Diz-me alguma coisa para eu procurar!")
        }
        try {
            distube.play(message, args.join(" "))
        } catch (e) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                .setTitle(`❌ Ocorreu um erro ❌`)
                .setDescription("```\n" + "Ocorreu um erro: " + err + "```")
                .setColor("#F93A2F")
                .setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
                .setTimestamp()
            message.channel.send(embed)
        }
        message.channel.send(`🎶 A procurar no Youtube: **${args.join(" ")}.** 🎶`)
    }
    if (["np", "NP", "Np", "nowplaying", "Nowplaying", "NowPlaying", "NOWPLAYING", "current", "Current", "CURRENT"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react("❌")
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para veres o que está a tocar!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        let queue = distube.getQueue(message);
        if (!distube.guildQueues) return message.channel.send(`❌ | Não está nada a tocar!`)
        const npembed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(queue.songs[0].name)
            .setDescription(queue.songs.map((song) => `▶️ ▬▬▬🔘▬▬▬▬▬▬▬▬ \`[0:00/${song.formattedDuration}]\` :loud_sound:`))
            .addFields(
                { name: "Pedido por(a):", value: `${message.member.user}`, inline: true },
                { name: 'Duração:', value: queue.songs.map((song) => `\`${song.formattedDuration}\``), inline: true },
                { name: 'Queue:', value: `${queue.songs.length} música(s) - \`${queue.formattedDuration}\``, inline: true }
            )
            .setColor("RANDOM")
        message.channel.send(npembed)
    }
    if (["repeat", "loop", "Repeat", "Loop", "REPEAT", "LOOP"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react("❌")
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para repetires música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        let mode = distube.setRepeatMode(message, parseInt(args[0]));
        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
        mode = distube.setRepeatMode(message, mode);
        message.channel.send("Repeat mode está agora no modo: **" + mode + "**");
    }
    if (["stop", "leave", "Stop", "Leave", "STOP", "LEAVE", "disconnect", "Disconnect", "DISCONNECT"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react("❌")
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para parares música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        distube.stop(message);
        const embed = new Discord.MessageEmbed()
            .setTitle("Stop!")
            .setColor("#F93A2F")
            .setDescription(`Parei a música e saí do voice channel!\nPedido por(a): ${message.member.user}\nObrigado por usares o **Bot dos Bostas!**`)
            .addFields(
                { name: "Links Importantes:", value: "[Github Repository](https://github.com/TonaS21/bot-dos-bostas)\n[Convida o bot](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot)\n[Server de Suporte](https://discord.gg/DRnnZPS)", inline: false }
            )
            .setTimestamp()
            .setFooter("Bot dos Bostas", client.user.displayAvatarURL())
        message.channel.send(embed)
            .catch(_err => {
                const embed1 = new Discord.MessageEmbed()
                    .setColor("#F93A2F")
                    .setDescription("Precisas de estar num voice chat para parares música ou nada está a tocar!")
                    .setTimestamp()
                message.channel.send(embed1)
            })
    }
    if (["skip", "Skip", "SKIP"].includes(command)) {
        distube.skip(message);
        message.channel.send(":track_next: | Dei skip à música!")
        if (!message.member.voice.channelID) {
            message.react("❌")
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para dares skip à música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        if (!distube.isPlaying(message)) return message.channel.send("❌ | Não está nada a tocar!")
    }
    if (["pause", "Pause", "PAUSE"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react("❌")
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para pausares música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        distube.pause(message);
        message.channel.send("⏸ | Pausei a música!")
    }
    if (["resume", "Resume", "RESUME"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react("❌")
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        distube.resume(message);
        message.channel.send(":play_pause: | Voltei a tocar a música!")
    }
    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `haas`, `flanger`, `gate`, `reverse`].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react("❌")
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para mudares filters!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        let filter = distube.setFilter(message, command);
        message.channel.send("Filtro do queue atual: " + (filter || "Off"));
    }
    if(["queue", "Queue", "QUEUE", "q", "Q"].includes(command)) {
        let queue = distube.getQueue(message);
        if (message.member.voice.channel) {
            message.channel.send(`🎶 Queue Atual | ${queue.songs.length} música(s) | \`${queue.formattedDuration}\` | 🎶`)
            const embed = new Discord.MessageEmbed()
                .setTitle("📄 Queue 📄")
                .setDescription('\n' + queue.songs.map((song, id) => `**${id + 1}** - [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n"))
                .setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
                .setTimestamp()
                .setColor("#F93A2F")
            message.channel.send(embed)
        } 
    }
    if ([`changevolume`, `ChangeVolume`, `CHANGEVOLUME`, `cv`, `CV`].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react("❌")
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para mudares o volume música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        if (!distube.isPlaying(message)) return message.channel.send("❌ | Não está nada a tocar!")
        if (isNaN(args[0])) {
            message.react("❌")
            return message.channel.send("❌ | Por favor espeficifica um número")
        }
        distube.setVolume(message, args[0]);
        if (args[0] > 200) {
            distube.setVolume(message, 200);
            message.channel.send(`❌ | O máximo de volume é **200%**, então pus o volume a **200%** e não **${args[0]}%**.`)
        } else {
            distube.setVolume(message, args[0]);
            message.channel.send(`:loud_sound: | Mudei o volume para: **${args[0]}%**`)
        }
    }
    if ([`volume`, `Volume`, `VOLUME`, `v`, `V`].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react("❌")
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para veres o volume da música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        let queue = distube.getQueue(message);
        message.channel.send(`:loud_sound: | O volume da música está a: **${queue.volume}%**`)
    }
    if (["shuffle", "Shuffle", "SHUFFLE"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react("❌")
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para misturares o queue!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        let queue = distube.getQueue(message);
        distube.shuffle(message)
        message.channel.send(`:twisted_rightwards_arrows: | Misturei as **${queue.songs.length} músicas** que estão no queue!`)
    }
    if (["jump", "Jump", "JUMP"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react("❌")
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para passares para outra música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        message.channel.send(`⬆️ | Saltei para o número ${parseInt(args[0])} no queue!`)
        distube.jump(message, parseInt(args[0]))
            .catch(_err => message.channel.send(":warning: | Número inválido para saltar."));
    }
    if (["autoplay", "Autoplay", "AUTOPLAY", "ap", "AP"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react("❌")
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para usares autoplay!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        let mode = distube.toggleAutoplay(message);
        message.channel.send("Autoplay está agora: `" + (mode ? "On" : "Off") + "`");
    }
    if (["playSkip", "PlaySkip", "playskip", "PLAYSKIP"].includes(command)) {
        if (!message.member.voice.channelID) {
            message.react("❌")
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        distube.playSkip(message, args.join(" "));
        message.channel.send(":track_next: | Vou dar skip à música que está a tocar e começar a tocar a que escolheres!")
    }
    if (command === "bitch") {
        if (!message.member.voice.channelID) {
             message.react("❌")
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        message.channel.send('🎶 | A carregar a playlist...').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            resultMessage.edit(`🎶 | Playlist carregada: **Bitch Lasagna Playlist**!`)
        })
        let songs = ["https://www.youtube.com/watch?v=6Dh-RL__uN4", "https://www.youtube.com/watch?v=YNNXTs6adIs", "https://www.youtube.com/watch?v=BuNmXYmTRQE", "https://www.youtube.com/watch?v=0oq7805Fxfw", "https://www.youtube.com/watch?v=Z9uLwuGTTFk", "https://www.youtube.com/watch?v=uoww4ou3Ark",
            "https://www.youtube.com/watch?v=KprzFp9A0kc", "https://www.youtube.com/watch?v=eoK-Ew_0Nw8", "https://www.youtube.com/watch?v=i20TUj4d8sw", "https://www.youtube.com/watch?v=34WnaTTGIKw", "https://www.youtube.com/watch?v=5FusviCrZOk", "https://www.youtube.com/watch?v=52_hLibBRzY", "https://www.youtube.com/watch?v=0uCgyy1pjyo", "https://www.youtube.com/watch?v=qlZvOytosLc"];
        distube.playCustomPlaylist(message, songs, { title: "Bitch Lasagna Playlist" });
    }
    if (command === "playlist") {
        message.react("❌")
        if (!message.member.voice.channelID) {
            const embed = new Discord.MessageEmbed()
                .setColor("#F93A2F")
                .setDescription(`Precisas de estar num voice chat para resumires música!`)
                .setTimestamp()
            return message.channel.send(embed)
        }
        message.channel.send('🎶 | A carregar a playlist (demora em média 5 a 10s)...')
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
            "https://www.youtube.com/watch?v=IeiPIINxgUs", "https://www.youtube.com/watch?v=EDIxTIi9Uzw", "https://www.youtube.com/watch?v=XyecOcRu7iM"];
        distube.playCustomPlaylist(message, songs, { title: "Nice :D", thumbnail: "https://wallpapercave.com/wp/wp1849755.jpg" });
    }
    if (command === "reddit") {
        let Subreddit = message.content.slice(8);
        if (!Subreddit) {
            message.react("❌")
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
        if (data.isNullOrUndefined) {
            message.channel.send("Ocorreu um erro")
        }
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
    if (message.content === `${prefix}categorias`) {
        message.react("✅")
        const help = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle("Comandos do Bot dos Bostas")
            .setDescription("**Bot feito por: TonaS#9344**")
            .addFields(
                { name: ":laughing: Fun:", value: `\`${prefix}help fun\``, inline: true },
                { name: ":wrench: Info e Mod:", value: `\`${prefix}help infomod\``, inline: true },
                { name: ":dog: Animais", value: `\`${prefix}help animais\``, inline: true },
                { name: ":musical_note: Música", value: `\`${prefix}help música\``, inline: true },
                { name: ":rofl: Meme", value: `\`${prefix}help meme\``, inline: true },
                { name: ":camera: Imagens", value: `\`${prefix}help imagens\``, inline: true },
            )
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(`Usa sempre - antes de todos os comandos`, client.user.displayAvatarURL())
        message.channel.send(help)
    }
    if (message.content === `${prefix}help`) {
        message.react("✅")
        const userEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Lista de Comandos", client.user.displayAvatarURL())
            .setDescription(`❯ **Server de Suporte:** [Link](https://discord.gg/fnvdugV)\n❯ **Invite do Bot:** [Link](https://discord.com/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot)\n❯ **Github Repository:** [Link](https://github.com/TonaS21/bot-dos-bostas)`)
            .addField(":information_source: Info", `\`userinfo\`, \`ping\`, \`covid\`, \`uptime\`, \`steam\`, \`invite\`, \`help-eng\`, \`weather\`, \`instagram\`, \`stats\`, \`yt\`, \`math\`, \`urban\`, \`fortnite\`, \`kpop\`, \`name\`, \`define\`, \`acrónimo\`, \`rhymer\`, \`sobre\`, \`categorias\``)
            .addField(":gear: Mod", `\`clear\`, \`poll\`, \`announce\`, \`report\`, \`ban\`, \`kick\`, \`mute\`, \`warn\`, \`help-eng\`, \`lock\`, \`giveaway\`, \`giverole\`, \`delrole\`, \`hasrole\`, \`slowmode\`, \`setprefix\`.`)
            .addField(":camera: Imagens", `\`inverse\`, \`wanted\`, \`minecraft\`, \`cursedimg\`, \`food\`, \`animepunch\`, \`shit\`, \`delete\`, \`trash\`, \`hitler\`, \`greyscale\`, \`deepfry\`, \`beautiful\`, \`affect\`, \`gif\`, \`randomgif\`, \`sticker\`, \`randomsticker\`.`)
            .addField(":laughing: Fun", `\`randomfacts\`, \`8ball\`, \`slap\`, \`roast\`, \`neves\`, \`exposesezul\`, \`p!ng\`, \`pong\`, \`crepper\`, \`rps\`, \`flip\`, \`minesweeper\`, \`badjoke\`, \`advice\`, \`isretarded\`, \`say\`, \`isgamer\`, \`isgay\`, \`issimp\`, \`lenny\`, \`captcha\`, \`pp\`, \`isloli\`, \`iswaifu\`, \`isanimegirl\`, \`isdank\`.`)
            .addField(":rofl: Meme", `\`meme\`, \`reddit\`, \`twitter\`, \`meirl\`, \`comic\`, \`twitter\`, \`wholesome\`, \`discordmeme\`, \`minecraftmeme\`, \`4chan\`, \`sports\`, \`facepalm\`.`)
            .addField(":musical_note: Música", `\`play ou p\`, \`search\`, \`stop ou leave\`, \`skip\`, \`pause\`, \`resume\`, \`autoplay\`, \`shuffle\`, \`queue ou q\`, \`volume\`, \`jump\`, \`repeat ou loop\`, \`playSkip\`, \`playlist\`, \`bitch\`, \`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`, \`haas\`, \`reverse\`, \`flanger\`, \`gate\`, \`np ou nowplaying\`.`)
            .addField(":dog: Animais", `\`dogs\`, \`cats\`, \`quacc\`, \`foxsays\`, \`mrlizard\`, \`panda\`, \`animais\`, \`snake\`, \`ferret\`, \`goose\`.`)
            .setFooter(`Pedido por(a): ${message.member.displayName}`, message.author.displayAvatarURL())
            .setTimestamp()
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help imagens`) {
        message.react("✅")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("Comandos:", `\`inverse\`, \`wanted\`, \`minecraft\`, \`cursedimg\`, \`food\`, \`animepunch\`, \`shit\`, \`delete\`, \`trash\`, \`hitler\`, \`greyscale\`, \`deepfry\`, \`beautiful\`, \`affect\`, \`gif\`, \`randomgif\`, \`sticker\`, \`randomsticker\`.`)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help animais`) {
        message.react("✅")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("Comandos:", `\`dogs\`, \`cats\`, \`quacc\`, \`foxsays\`, \`mrlizard\`, \`panda\`, \`animais\`, \`snake\`, \`ferret\`, \`goose\`.`)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help infomod`) {
        message.react("✅")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("Comandos:", `\`userinfo\`, \`clear\`, \`poll\`, \`announce\`, \`ping\`, \`report\`, \`ban\`, \`kick\`, \`mute\`, \`warn\`, \`covid\`, \`uptime\`, \`steam\`, \`help-eng\`, \`invite\`, \`weather\`, \`instagram\`, \`lock\`, \`stats\`, \`yt\`, \`math\`, \`giveaway\`, \`giverole\`, \`delrole\`, \`hasrole\`, \`urban\`, \`fortnite\`, \`slowmode\`, \`kpop\`, \`name\`, \`define\`, \`acrónimo\`, \`rhymer\`, \`sobre\`.`)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help meme`) {
        message.react("✅")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("Comandos:", `\`meme\`, \`reddit\`, \`twitter\`, \`meirl\`, \`comic\`, \`twitter\`, \`wholesome\`, \`discordmeme\`, \`minecraftmeme\`, \`4chan\`, \`sports\`, \`facepalm\`.`)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help fun`) {
        message.react("✅")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("Comandos:", `\`randomfacts\`, \`8ball\`, \`slap\`, \`roast\`, \`neves\`, \`exposesezul\`, \`p!ng\`, \`pong\`, \`crepper\`, \`rps\`, \`flip\`, \`minesweeper\`, \`badjoke\`, \`advice\`, \`isretarded\`, \`say\`, \`isgamer\`, \`isgay\`, \`issimp\`, \`lenny\`, \`captcha\`, \`pp\`, \`isloli\`, \`iswaifu\`, \`isanimegirl\`, \`isdank\`, \`riccroll\`, \`bob\``)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help música`) {
        message.react("✅")
        const userEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField("Comandos de música:", `\`play ou p\`, \`search\`, \`stop ou leave\`, \`skip\`, \`pause\`, \`resume\`, \`autoplay\`, \`shuffle\`, \`queue ou q\`, \`volume\`, \`jump\`, \`repeat ou loop\`, \`playSkip\`, \`playlist\`, \`bitch\`, \`np ou nowplaying\`.`)
            .addField("Filtros de música:", `\`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`, \`haas\`, \`reverse\`, \`flanger\`, \`gate\`.`)
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
        message.channel.send(userEmbed);
    }
    if (message.content === `${prefix}help-eng`) {
        message.react("✅")
        const userEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Command List", client.user.displayAvatarURL())
            .setDescription(`❯ **Support Server:** [Link](https://discord.gg/fnvdugV)\n❯ **Invite the bot:** [Link](https://discord.com/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot)\n❯ **Github Repository:** [Link](https://github.com/TonaS21/bot-dos-bostas)`)
            .addField(":information_source: Info", `\`userinfo\`, \`ping\`, \`covid\`, \`uptime\`, \`steam\`, \`invite\`, \`help-eng\`, \`weather\`, \`instagram\`, \`stats\`, \`yt\`, \`math\`, \`urban\`, \`fortnite\`, \`kpop\`, \`name\`, \`define\`, \`acrónimo\`, \`rhymer\`, \`sobre\`, \`categorias\``)
            .addField(":gear: Mod", `\`clear\`, \`poll\`, \`announce\`, \`report\`, \`ban\`, \`kick\`, \`mute\`, \`warn\`, \`help-eng\`, \`lock\`, \`giveaway\`, \`giverole\`, \`delrole\`, \`hasrole\`, \`slowmode\`.`)
            .addField(":camera: Images", `\`inverse\`, \`wanted\`, \`minecraft\`, \`cursedimg\`, \`food\`, \`animepunch\`, \`shit\`, \`delete\`, \`trash\`, \`hitler\`, \`greyscale\`, \`deepfry\`, \`beautiful\`, \`affect\`, \`gif\`, \`randomgif\`, \`sticker\`, \`randomsticker\`.`)
            .addField(":laughing: Fun", `\`randomfacts\`, \`8ball\`, \`slap\`, \`roast\`, \`neves\`, \`exposesezul\`, \`p!ng\`, \`pong\`, \`crepper\`, \`rps\`, \`flip\`, \`minesweeper\`, \`badjoke\`, \`advice\`, \`isretarded\`, \`say\`, \`isgamer\`, \`isgay\`, \`issimp\`, \`lenny\`, \`captcha\`, \`pp\`, \`isloli\`, \`iswaifu\`, \`isanimegirl\`, \`isdank\`.`)
            .addField(":rofl: Meme", `\`meme\`, \`reddit\`, \`twitter\`, \`meirl\`, \`comic\`, \`twitter\`, \`wholesome\`, \`discordmeme\`, \`minecraftmeme\`, \`4chan\`, \`sports\`, \`facepalm\`.`)
            .addField(":musical_note: Music", `\`play ou p\`, \`search\`, \`stop ou leave\`, \`skip\`, \`pause\`, \`resume\`, \`autoplay\`, \`shuffle\`, \`queue ou q\`, \`volume\`, \`jump\`, \`repeat ou loop\`, \`playSkip\`, \`playlist\`, \`bitch\`, \`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`, \`haas\`, \`reverse\`, \`flanger\`, \`gate\`, \`np ou nowplaying\`.`)
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
            "Neste momento (19:00, 24/7/2020), o Pewdiepie tem 26.198.340.914 visualizações em total no seu canal. Mas na altura que estás a ver isto já deve ter muito mais.",
            ""
        ]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        message.channel.send(randomMessage)
    }
    if (command == "neves") {
        message.channel.send("O Neves é paneleiro, O Neves é gabiru, O Neves baixa as calças para apanhar no cu!")
    }
    if (command == "exposesezul") {
        message.channel.send(
            `TEXTO SOBRE O SEZUL: 

O Sezul // /̶S̶E̶Z̶U̶L̶\̶#4572 // Antonio Miranda // Instagram: @1__seven__1 , 
@seven_garagept //
        
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
            message.react("❌")
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
        let answers = ["https://media1.tenor.com/images/3c161bd7d6c6fba17bb3e5c5ecc8493e/tenor.gif?itemid=5196956", "https://media1.tenor.com/images/49de17c6f21172b3abfaf5972fddf6d6/tenor.gif?itemid=10206784", "https://tenor.com/view/slap-slow-motion-slap-gif-10048943", "https://media1.tenor.com/images/bc858e69d5022807b84554b2d4583c10/tenor.gif?itemid=5122019"
        , "https://media1.tenor.com/images/725a604e470a6c2768149c64fd166292/tenor.gif?itemid=16095505", "https://media1.tenor.com/images/31f29b3fcc20a486f44454209914266a/tenor.gif?itemid=17942299", "https://media1.tenor.com/images/4c87273e872b4a7fc23a37868b3f3577/tenor.gif?itemid=15003911", "https://thumbs.gfycat.com/ForkedFamousGalapagoshawk-size_restricted.gif"]
        let response = answers[Math.floor(Math.random() * answers.length)];
        const personTagged = message.mentions.members.first();
        if(!personTagged) {
            message.react("❌")
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
        const messages = [
            `You all know ${message.member.user}\’s is my first and most longtime friend I have. What you may not know is that he’s also the first and most longtime customer of ProActive Acne Systems. `,
            `Good lord this is an ugly group of people. Holy shit, you know the crowd is ugly when we invited ${message.member.user}\’s as eye candy. `,
            `And ${message.member.user}\’s you’re looking pretty rough this evening. ${message.member.user} looks like if sweatpants were a person. `,
            `Getting married to you must’ve been rough. What was your wedding song? “How Much Is That Doggy In The Window?” `,
            `${message.member.user}\’s is so ugly he’s been the only one ever rejected from Queer Eye for the Straight guy. `,
            `${message.member.user}\’s is so ugly in October when he went to the haunted house they handed his an application. `,
            `${message.member.user}\’s psychiatrist said he was crazy and he said he wanted a second opinion. The psychiatrist said “Okay, you’re ugly too.” `,
            `${message.member.user}\’s nose is so big he Apple had to make a custom iPhone that unlocks using Nose ID. `,
            `${message.member.user} when are you gonna buy a new outfit?? `,
            `Everyday you wear the same jeans and same flannel patterned shirt.
You’re like if Al Borland from Home Improvement learned to program a computer.`,
            `The way ${message.member.user} dresses looks like the first half of a commercial for antidepressants. `,
            `${message.member.user} is actually pretty good looking, but has a boring personality. Good looks but boring personality, you’re like real life clickbait. `,
            `${message.member.user} has worn the same outfit for like 10 years. Holy shit….the only person who’s worn the same clothes longer than you is Bart Simpson. `,
            `${message.member.user} I’m glad you and your dull personality could be here. I’m excited to hear your speech at the wedding. With your personality, I’m sure your speech will combine the thrill of talking, with the excitement of standing there. `,
            `${message.member.user}\'s outfit was recently featured on the cover of Yawn Magazine. `,
            `We are doing this roast tonight to help ${message.member.user} live out one of his sexual fantasies, to have a room full of his friends shit all over him. `,
            `A little known fact is that a long time ago ${message.member.user} used to work at McDonald’s. It was the last time anyone said about your work, “I’m lovin’ it.” `,
            `This is exciting ${message.member.user} right?? Well tell your face. `,
            `${message.member.user} if laughter is the best medicine, your face must be curing the world. `,
            `It’s nice to see such a diverse crowd here today. We’ve got Indians, Jews, Whites, and whatever the fuck ${message.member.user} is.`,
            `But ${message.member.user} you’re really looking good nowadays. What he has lost in weight, he has also GAINED in weight.`,
            `${message.member.user} I checked your Facebook, and it turns out you used to be a bit chubby. I’m impressed that you’ve managed to lose so much weight. That’s right, he lost 30 pounds on Nutrisystem, and another 10 when he shaved his back.`,
            `${message.member.user} you're so fat and lazy the only exercise he gets is when his Restless Leg Syndrome starts flaring up.`,
            `${message.member.user} you look like if the fat kid from Stranger Things wished he was big.`,
            `The church didn’t accept ${message.member.user}\'s gay lifestyle. So he started his own religion: The Church of Latter Day Taints. It’s like a normal church, except you’re happy when the priest fucks you.`,
            `Me and ${message.member.user} are really good friends but we’ve had our ups and downs, one time he actually tried to sue me for $10,000. I got really defensive and was like “You’re suing me for $10,000?? Fuck you…you can suck my dick.” and he was like, “well OK if you want to settle out of court.”`,
            `When I heard that ${message.member.user} finally came out of the closet I wasn’t really surprised….dude you’re so gay MY ass hurts.`,
            `I once asked ${message.member.user} why he dresses so flamboyantly and he got upset and hit me with his purse.`,
            `Backstage before this speech I rolled a gigantic fatty. Because that was the only way we could get ${message.member.user} on to the stage.`,]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        message.channel.send(randomMessage)
    }
    if (command === 'urban') {
        let image = "https://is4-ssl.mzstatic.com/image/thumb/Purple111/v4/7e/49/85/7e498571-a905-d7dc-26c5-33dcc0dc04a8/source/512x512bb.jpg"
        if (!args.length) {
            message.react("❌")
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
        message.reply('A calcular o ping...').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            resultMessage.edit(`**Bot ping: ${ping}, API ping: ${client.ws.ping}**`)
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
        let msg = await message.channel.send("A procurar...")
        let { body } = await superagent.get("https://dog.ceo/api/breeds/image/random")
        if (!{ body }) return message.channel.send("Tu estragaste-me! Tenta de novo.")
        let embed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setAuthor("DOGS!", message.guild.iconURL)
            .setImage(body.message)
            .setTimestamp()
            .setFooter("Bot dos Bostas", client.user.displayAvatarURL())
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
            .setColor(0xFF0000)
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
        await messageEmbed.react('✅')
        await messageEmbed.react('❎')
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
        message.reply('A calcular o uptime...').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            resultMessage.edit(`**Estou online há: ${ms(client.uptime)}**`)
        })
    }
    if (command === "sobre") {
        const embed = new Discord.MessageEmbed()
            .setColor("#F93A2F")
            .setAuthor(`${message.member.user.username}, aqui está tudo sobre o ${client.user.username}!`, message.member.user.displayAvatarURL())
            .setDescription(`Olá, eu sou o **${client.user.username}**! Sou um Bot Multiusos feito pelo TonaS#9344! Sou feito com a library [Discord.js](https://discord.js.org/#/) e com o Module de música [Distube](https://distube.js.org/)! Escreve \`${prefix}help\` para veres os meus comandos.\n[Convida-me](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot) para o teu server!\n O Bot foi criado a - ${moment.utc(client.user.createdAt).format("dddd, MMMM Do YYYY")}.`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .addField("Tenho comandos de diversos tópicos, como:", "```\n🎶 de Música\n🤣 de Memes\n🐶 de Animais\n📷 de Imagens\n😆 de Entretenimento\n🔧 de Informação!```")
            .addFields(
                { name: "Com:", value: `${client.users.cache.size} pessoas`, inline: true },
                { name: "Em:", value: `${client.guilds.cache.size} servers`, inline: true },
                { name: "Com:", value: `${client.options.shards.length} shard(s)`, inline: true }
            )
            .setFooter("Bot dos Bostas", client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed);
    }
    if (command === "invite") {
        const embed = new Discord.MessageEmbed()
            .setColor("#F93A2F")
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
            message.react("❌")
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
                message.react("❌")
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
            message.react("❌")
            return message.channel.send(`Como jogar: \`${prefix}rps <pedra|papel|tesoura>\``);
        }
        if (!acceptedReplies.includes(choice)) {
            message.react("❌")
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
            message.react("❌")
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
            message.react("❌")
            return message.channel.send("Não especificaste o primeiro número!")
        }
        if (!args[1]) {
            message.react("❌")
            return message.channel.send("Não especificaste o tipo de operação!")
        }
        if (!args[2]) {
            message.react("❌")
            return message.channel.send("Não especificaste o segundo número!")
        }
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("A Resposta é:")
            .setDescription(calculator(args[0], args[1], args[2]))
            .setTimestamp()
            .setFooter("Bot dos Bostas", client.user.displayAvatarURL())
        message.channel.send(embed)
    }
    if (command === "giveaway") {
        if (!args[0]) {
            message.react("❌")
            return message.channel.send(`Não especificaste o tempo do giveaway!`);
        }
        if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) {
            message.react("❌")
            return message.channel.send(`Não usaste o formato correto do tempo!`);
        }
        if (isNaN(args[0][0])) {
            message.react("❌")
            return message.channel.send(`Isso não é um número!`);
        }
        let channel = message.mentions.channels.first();
        if (!channel) {
            message.react("❌")
            return message.channel.send(`Não consegui encontrar esse channel neste server!`);
        }
        let prize = args.slice(2).join(" ");
        if (!prize) {
            message.react("❌")
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
                return message.channel.send(
                    `Poucas pessoas ou nenhumas reagiram à mensagem, então não há prémio!`
                );
            }
            let winner = m.reactions.cache
                .get("🎉")
                .users.cache.filter((u) => !u.bot)
                .random();
            channel.send(
                `O vencedor do giveaway para **${prize}** é... ${winner}! 🎉Congratulations!`
            );
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
            message.react("❌")
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
            message.react("❌")
            message.reply(`Não há nenhum role chamado: "${roleName}"`)
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
            message.react("❌")
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
            message.react("❌")
            message.reply(`Não há nenhum role com o nome: **"${roleName}"**`)
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
            message.react("❌")
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
            message.react("❌")
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
        const simp = Math.random() * 100;
        const simpIndex = Math.floor(simp / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Simp Machine 2020`)
            .setDescription(`${message.member.user.username} é ${Math.floor(simp)}% simp.`)
        message.channel.send(embed);
    }
    if (command === "isgay") {
        const gay = Math.random() * 100;
        const gayIndex = Math.floor(gay / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`🏳️‍🌈 Gay Machine 2020 🏳️‍🌈`)
            .setDescription(`${message.member.user.username} é ${Math.floor(gay)}% gay.`)
        message.channel.send(embed);
    }
    if (command === "isgamer") {
        const gamer = Math.random() * 100;
        const gamerIndex = Math.floor(gamer / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`⌨️ Gamer Machine 2020 🖱️`)
            .setDescription(`${message.member.user.username} é ${Math.floor(gamer)}% gamer. **Épico**!`)
        message.channel.send(embed);
    }
    if (command === "isretarded") {
        const retard = Math.random() * 100;
        const retardIndex = Math.floor(retard / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Retards Machine 2020`)
            .setDescription(`${message.member.user.username} é ${Math.floor(retard)}% retardado lmao.`)
        message.channel.send(embed);
    }
    if (command === "isloli") {
        const loli = Math.random() * 100;
        const loliIndex = Math.floor(loli / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Loli Machine 2020`)
            .setDescription(`${message.member.user.username} é ${Math.floor(loli)}% uma loli. 🤣`)
        message.channel.send(embed);
    }
    if (command === "isanimegirl") {
        const animegirl = Math.random() * 100;
        const animegirlIndex = Math.floor(animegirl / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Loli Machine 2020`)
            .setDescription(`${message.member.user.username} é ${Math.floor(animegirl)}% uma anime girl. 💁`)
        message.channel.send(embed);
    }
    if (command === "iswaifu") {
        const waifu = Math.random() * 100;
        const waifugirlIndex = Math.floor(waifu / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Loli Machine 2020`)
            .setDescription(`${message.member.user.username} é ${Math.floor(waifu)}% uma waifu. 😥`)
        message.channel.send(embed);
    }
    if (command === "isdank") {
        const dank = Math.random() * 100;
        const dankIndex = Math.floor(dank / 0);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Dank Memer Machine 2020`)
            .setDescription(`${message.member.user.username} é ${Math.floor(dank)}% um dank memer xD.`)
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
            message.react("❌")
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
            message.react("❌")
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
            message.react("❌")
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
            message.react("❌")
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
            message.react("❌")
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
            message.react("❌")
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
            message.react("❌")
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
            message.react("❌")
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
            message.react("❌")
            return message.channel.send(':warning: Por favor especifica o número de filas.');
        }
        if (!columns) {
            message.react("❌")
            return message.channel.send(':warning: Por favor especifica o número de colunas.');
        }
        if (!mines) {
            message.react("❌")
            return message.channel.send(':warning: Por favor especifica um número de minas.');
        }
        const minesweeper = new Minesweeper({ rows, columns, mines });
        const matrix = minesweeper.start();
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Minesweeper`)
            .setDescription(matrix)
            .setFooter("Bot dos Bostas", client.user.displayAvatarURL())
            .setTimestamp()
        return matrix
            ? message.channel.send(embed)
            : message.channel.send(':warning: You have provided invalid data.');
    }
    if (command === "die") {
        if (message.author.id !== "343491235975135243") {
            message.react("❌") //mudas aqui o teu id, acho que podes pôr mais pessoas
            return message.channel.send("Não és o owner do Bot! Achavas que ias conseguir desligar o bot hehehehe.") // para ninguém a não seres tu dar restart ao bot
        }
        await message.channel.send("A dar restart ao bot!")
        process.exit();
    }
    if(command === "kitty") {
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
    if(command === "mrlizard"){
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
    if(command === "quacc"){
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
    if(command === "minecraft"){
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
    if(command === "foxsays") {
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
    if(command === "panda") {
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
    if(command === "ferret") {
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
    if(command === "goose") {
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
    if(command === "snake") {
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
});
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
distube
    .on("playSong", (message, queue, song) => {
        const userEmbed = new Discord.MessageEmbed()
            .setTitle(`🎶 Agora a tocar 🎶`)
            .setDescription(`[${song.name}](${song.url})`)
            .setThumbnail(song.thumbnail)
            .addFields(
                { name: 'Pedido por(a):', value: `${message.member.user}`, inline: true },
                { name: 'Duração da Música:', value: `\`${song.formattedDuration}\``, inline: true },
                { name: 'Queue:', value: `${queue.songs.length} música(s) - \`${queue.formattedDuration}\``, inline: true },
                { name: 'Volume:', value: `\`${queue.volume}%\``, inline: true },
                { name: 'Filtros:', value: `\`${queue.filter || "Off"}\``, inline: true },
                { name: 'Loop:', value: `\`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\``, inline: true },
                { name: 'Autoplay:', value: `\`${queue.autoplay ? "On" : "Off"}\``, inline: true },
                { name: 'Bitrate:', value: `\`256kbps\``, inline: true },
                { name: 'Convida o Bot:', value: `[Link](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot)`, inline: true },
            )
            .setColor("#F93A2F")
            .setTimestamp()
            .setFooter("Bot dos Bostas", client.user.displayAvatarURL())
        message.channel.send(userEmbed).then(msg => {
            msg.react('⏸').then(r => {
                msg.react('⏹️').then(r => {
                    msg.react('⏭️').then(r => {
                        msg.react("⏯️").then(r => {
                            msg.react("🔁").then(r => {
                                msg.react("🔀").then(r => {
                                    msg.react("📄").then(r => {
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
            const repeatFilter = (reaction, user) => reaction.emoji.name === '🔁' && user.id === message.author.id;
            const musicaFilter = (reaction, user) => reaction.emoji.name === '🔀' && user.id === message.author.id;
            const animaisFilter = (reaction, user) => reaction.emoji.name === '📄' && user.id === message.author.id;
            const infos = msg.createReactionCollector(infosFilter);
            const imagens = msg.createReactionCollector(imagensFilter);
            const resume = msg.createReactionCollector(resumeFilter);
            const fun = msg.createReactionCollector(funFilter);
            const musica = msg.createReactionCollector(musicaFilter);
            const animais = msg.createReactionCollector(animaisFilter);
            const repeat = msg.createReactionCollector(repeatFilter);
            infos.on('collect', r2 => {
                if (!message.member.voice.channel) {
                    message.channel.send("❌ | Precisas de estar no voice channel para usares isto.")
                }
                if (message.member.voice.channel) {
                    distube.pause(message)
                    message.channel.send("⏸ | Pausei a música!")
                }
            })
            repeat.on('collect', r2 => {
                if (!message.member.voice.channel) {
                    message.channel.send("❌ | Precisas de estar no voice channel para usares isto.")
                }
                if (message.member.voice.channel) {
                    let mode = distube.setRepeatMode(message);
                    mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
                    mode = distube.setRepeatMode(message, mode);
                    message.channel.send("Repeat mode está agora no modo: **" + mode + "**");
                }
            })
            resume.on('collect', r2 => {
                if (!message.member.voice.channel) {
                    message.channel.send("❌ | Precisas de estar no voice channel para usares isto.")
                }
                if (message.member.voice.channel) {
                    distube.resume(message)
                    message.channel.send(":play_pause: | Voltei a tocar a música!")
                }
            })
            animais.on('collect', r2 => {
                let queue = distube.getQueue(message);
                if (!queue) return message.channel.send(`❌ | Não está nada a tocar!`)
                if (message.member.voice.channel) {
                    message.channel.send(`🎶 Queue Atual | ${queue.songs.length} música(s) | \`${queue.formattedDuration}\` | 🎶`)
                    const embed = new Discord.MessageEmbed()
                        .setTitle("📄 Queue 📄")
                        .setDescription('\n' + queue.songs.map((song, id) => `**${id + 1}** - [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n"))
                        .setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
                        .setTimestamp()
                        .setColor("#F93A2F")
                    message.channel.send(embed)
                }
                if (!message.member.voice.channel && client.voice.connections) {
                    message.channel.send("❌ | Precisas de estar no voice channel para usares isto.")
                }
            })
            musica.on('collect', r2 => {
                let queue = distube.getQueue(message);
                if (message.member.voice.channel) {
                    distube.shuffle(message)
                    message.channel.send(`:twisted_rightwards_arrows: | Misturei as **${queue.songs.length} músicas** que estão no queue!`)
                }
                if (!message.member.voice.channel && client.voice.connections) {
                    message.channel.send("❌ | Precisas de estar no voice channel para usares isto.")
                }
            })
            imagens.on('collect', r2 => {
                if (message.member.voice.channel) {
                    distube.stop(message)
                    msg.delete().then(msg1 => {
                        const embed = new Discord.MessageEmbed()
                            .setTitle("Stop!")
                            .setColor("#F93A2F")
                            .setDescription(`Parei a música e saí do voice channel!\nPedido por(a): ${message.member.user}\nObrigado por usares o **Bot dos Bostas!**`)
                            .addFields(
                                { name: "Links Importantes:", value: "[Github Repository](https://github.com/TonaS21/bot-dos-bostas)\n[Convida o bot](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot)\n[Server de Suporte](https://discord.gg/DRnnZPS)", inline: false }
                            )
                            .setTimestamp()
                            .setFooter("Bot dos Bostas", client.user.displayAvatarURL())
                        msg1.channel.send(embed)
                    })
                }
                if (!message.member.voice.channel && client.voice.connections) {
                    message.channel.send("❌ | Precisas de estar no voice channel para usares isto.")
                }
            })
            fun.on('collect', r2 => {
                if (message.member.voice.channel) {
                    distube.skip(message)
                    message.channel.send(":track_next: | Dei skip à música!")
                    if (queue.dispatcher.destroy) {
                        msg.delete()
                    }
                }
                if (!message.member.voice.channel && client.voice.connections) {
                    message.channel.send("❌ | Precisas de estar no voice channel para usares isto.")
                }
            })
        })
    })
    .on("addSong", (message, queue, song) => {
        const userEmbed = new Discord.MessageEmbed()
            .setTitle(`🎶 Adicionado ao Queue 🎶`)
            .setDescription(`[${song.name}](${song.url})`)
            .addFields(
                { name: 'Pedido por(a):', value: `${message.member.user}`, inline: true },
                { name: 'Duração da Música:', value: `\`${song.formattedDuration}\``, inline: true },
                { name: 'Queue:', value: `${queue.songs.length} música(s) - \`${queue.formattedDuration}\``, inline: true },
            )
            .setThumbnail(song.thumbnail)
            .setColor("#F93A2F")
            .setFooter("Bot dos Bostas", client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(userEmbed);
    })
    .on("playList", (message, queue, playlist, song) => {
        const userEmbed = new Discord.MessageEmbed()
            .setTitle(`${playlist.title} playlist - (${playlist.total_items} músicas)`)
            .setDescription(`🎶 [Agora a tocar: ${song.name}](${song.url}) 🎶`)
            .setThumbnail(playlist.thumbnail)
            .setColor("#F93A2F")
            .setFooter("Bot dos Bostas", client.user.displayAvatarURL())
            .setTimestamp()
            .addFields(
                { name: 'Pedido por(a):', value: `${message.member.user}`, inline: true },
                { name: 'Duração da Música:', value: `\`${song.formattedDuration}\``, inline: true },
                { name: 'Duração da Playlist:', value: `\`${playlist.formattedDuration}\``, inline: true },
                { name: 'Volume', value: `\`${queue.volume}%\``, inline: true },
                { name: 'Queue:', value: `${queue.songs.length} música(s) - \`${queue.formattedDuration}\``, inline: true },
                { name: 'Filtros:', value: `\`${queue.filter || "Off"}\``, inline: true },
                { name: 'Loop:', value: `\`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\``, inline: true },
                { name: 'Autoplay:', value: `\`${queue.autoplay ? "On" : "Off"}\``, inline: true },
                { name: 'Bitrate:', value: `\`256kbps\``, inline: true },
                { name: 'Convida o Bot:', value: `[Link](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot)`, inline: true },
            )
        message.channel.send(userEmbed).then(msg => {
            msg.react('⏸').then(r => {
                msg.react('⏹️').then(r => {
                    msg.react('⏭️').then(r => {
                        msg.react("⏯️").then(r => {
                            msg.react("🔁").then(r => {
                                msg.react("🔀").then(r => {
                                    msg.react("📄").then(r => {
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
            const repeatFilter = (reaction, user) => reaction.emoji.name === '🔁' && user.id === message.author.id;
            const musicaFilter = (reaction, user) => reaction.emoji.name === '🔀' && user.id === message.author.id;
            const animaisFilter = (reaction, user) => reaction.emoji.name === '📄' && user.id === message.author.id;
            const infos = msg.createReactionCollector(infosFilter);
            const imagens = msg.createReactionCollector(imagensFilter);
            const resume = msg.createReactionCollector(resumeFilter);
            const fun = msg.createReactionCollector(funFilter);
            const musica = msg.createReactionCollector(musicaFilter);
            const animais = msg.createReactionCollector(animaisFilter);
            const repeat = msg.createReactionCollector(repeatFilter);
            infos.on('collect', r2 => {
                if (!message.member.voice.channelID) {
                    message.channel.send("❌ | Precisas de estar no voice channel para usares isto.")
                }
                if (message.member.voice.channelID) {
                    distube.pause(message)
                    message.channel.send("⏸ | Pausei a música!")
                }
            })
            repeat.on('collect', r2 => {
                if (!message.member.voice.channelID) {
                    message.channel.send("❌ | Precisas de estar no voice channel para usares isto.")
                }
                if (message.member.voice.channel) {
                    let mode = distube.setRepeatMode(message);
                    mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
                    mode = distube.setRepeatMode(message, mode);
                    message.channel.send("Repeat mode está agora no modo: **" + mode + "**");
                }
            })
            resume.on('collect', r2 => {
                if (!message.member.voice.channelID) {
                    message.channel.send("❌ | Precisas de estar no voice channel para usares isto.")
                }
                if (message.member.voice.channel) {
                    distube.resume(message)
                    message.channel.send(":play_pause: | Voltei a tocar a música!")
                }
            })
            animais.on('collect', r2 => {
                let queue = distube.getQueue(message);
                if (!queue) return message.channel.send(`❌ | Não está nada a tocar!`)
                if (message.member.voice.channel) {
                    message.channel.send(`🎶 Queue Atual | ${queue.songs.length} música(s) | \`${queue.formattedDuration}\` | 🎶`)
                    const embed = new Discord.MessageEmbed()
                        .setTitle("📄 Queue 📄")
                        .setDescription('\n' + queue.songs.map((song, id) => `**${id + 1}** - [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n"))
                        .setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
                        .setTimestamp()
                        .setColor("#F93A2F")
                    message.channel.send(embed)
                }
                if (!message.member.voice.channel && client.voice.connections) {
                    message.channel.send("❌ | Precisas de estar no voice channel para usares isto.")
                }
            })
            musica.on('collect', r2 => {
                let queue = distube.getQueue(message);
                if (message.member.voice.channel) {
                    distube.shuffle(message)
                    message.channel.send(`:twisted_rightwards_arrows: | Misturei as **${queue.songs.length} músicas** que estão no queue!`)
                }
                if (!message.member.voice.channel && client.voice.connections) {
                    message.channel.send("❌ | Precisas de estar no voice channel para usares isto.")
                }
            })
            imagens.on('collect', r2 => {
                if (message.member.voice.channel) {
                    distube.stop(message)
                    msg.delete().then(msg1 => {
                        const embed = new Discord.MessageEmbed()
                            .setTitle("Stop!")
                            .setColor("#F93A2F")
                            .setDescription(`Parei a música e saí do voice channel!\nPedido por(a): ${message.member.user}\nObrigado por usares o **Bot dos Bostas!**`)
                            .addFields(
                                { name: "Links Importantes:", value: "[Github Repository](https://github.com/TonaS21/bot-dos-bostas)\n[Convida o bot](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot)\n[Server de Suporte](https://discord.gg/DRnnZPS)", inline: false }
                            )
                            .setTimestamp()
                            .setFooter("Bot dos Bostas", client.user.displayAvatarURL())
                        msg1.channel.send(embed)
                    })
                }
                if (!message.member.voice.channelID) {
                    message.channel.send("❌ | Precisas de estar no voice channel para usares isto.")
                }
            })
            fun.on('collect', r2 => {
                if (message.member.voice.channelID) {
                    distube.skip(message)
                    message.channel.send(":track_next: | Dei skip à música!")
                    if (queue.dispatcher.destroy) {
                        msg.delete()
                    }
                }
                if (!message.member.voice.channel && client.voice.connections) {
                    message.channel.send("❌ | Precisas de estar no voice channel para usares isto.")
                }
            })
        })
    })
    .on("addList", (message, queue, playlist) => {
        const userEmbed = new Discord.MessageEmbed()
            .setTitle(`🎶 Adicionado ao Queue 🎶`)
            .setDescription(`${playlist.title} playlist - (${playlist.total_items} músicas)`)
            .addFields(
                { name: 'Pedido por(a):', value: `${message.member.user}`, inline: true },
                { name: 'Duração da Playlist:', value: `\`${playlist.formattedDuration}\``, inline: true },
                { name: 'Queue:', value: `${queue.songs.length} música(s) - \`${queue.formattedDuration}\``, inline: true },
            )
            .setThumbnail(playlist.thumbnail)
            .setColor("#F93A2F")
            .setFooter("Bot dos Bostas", client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(userEmbed);
    })
    .on("searchResult", (message, result) => {
        let i = 0;
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.member.user.username}, Escolhe uma opção abaixo:`, message.member.user.displayAvatarURL())
            .setDescription(`\n${result.map(song => `**${++i}** - [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n")}\n`)
            .setColor("#F93A2F")
            .setFooter(`Escreve uma coisa qualquer nada haver ou espera 60 segundos para cancelar.`)
        message.channel.send(embed)
    })
    .on("searchCancel", (message) => {
        const embed = new Discord.MessageEmbed()
            .setDescription("Procura cancelada. Não escreveste a tempo ou escreveste alguma coisa sem sentido.")
            .setColor("#F93A2F")
        message.channel.send(embed)
    })
    .on("error", (message, err) => {
        console.log(err);
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`❌ Ocorreu um erro ❌`)
            .setDescription("```\n" + "Ocorreu um erro: " + err + "```")
            .setColor("#F93A2F")
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
            .setDescription("Mais nenhuma música no queue, A sair do voice channel.")
            .setColor("#F93A2F")
        message.channel.send(userEmbed);
    })
    .on("empty", message => {
        const embed = new Discord.MessageEmbed()
            .setDescription("Voice channel está vazio. A sair!")
            .setColor("#F93A2F")
        message.channel.send(embed)
    })
    .on("noRelated", message => {
        const embed = new Discord.MessageEmbed()
            .setDescription("❌ Não consegui encontrar nenhuma música ❌. Parei de tocar música.")
            .setColor("#F93A2F")
        message.channel.send(embed)
    })
client.login(config.token);

