const Discord = require('discord.js');
const DisTube = require('distube')
const client = new Discord.Client();
const fs = require("fs")
const { formatDate } = require("./functions");
const cooldowns = new Discord.Collection();
const config = require("./config.json")

const DBL = require("dblapi.js");
const dbl = new DBL(config.dbl_token, client);
dbl.on('posted', () => {
  	console.log('Server count posted!');
});
dbl.on('error', e => {
 	console.log(`Oops! ${e}`);
});

const BFDAPI = require("bfdapi.js");
const bfd = new BFDAPI("733694571866882098", config.bfd_token);

bfd.postServerCount(`${client.guilds.cache.size}`).then((res) => console.log(res));

client.db = require("quick.db")
client.config = require("./config.json")
client.distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, highWaterMark: 1 << 24, youtubeCookie: "Cookie do Youtube aqui" }) //cookie é opcional
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
const Canvas = require("discord-canvas"),
    goodbyeCanvas = new Canvas.Goodbye(),
    welcomeCanvas = new Canvas.Welcome()

//Eventos

const winston = require("winston")
const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log' }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

client.on('ready', async () => { logger.log('info', `${client.user.tag} está pronto para ser usado, com ${client.commands.size} comandos no total!`); client.user.setActivity(`${config.prefix}help`, { type: "WATCHING" })});

client.on('debug', m => logger.log('debug', m));
client.on('warn', m => logger.log('warn', m));
client.on('error', m => logger.log('error', m));
process.on('uncaughtException', error => logger.log('error', error));
process.on("unhandledRejection", error => logger.log('error', error));

client.on("message", async (message) => {
    let prefix = client.db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = client.config.prefix;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    if (!cooldowns.has(cmd.name)) {
		cooldowns.set(cmd.name, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(cmd.name);
	const cooldownAmount = (cmd.cooldown || 3) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.channel.send(`<:X:748632517476745226> Estás num cooldown! Espera mais ${timeLeft.toFixed(1)} segundos antes de voltares a usar o comando!`);
		}
	}
    timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    if(cmd.clientPermissions.length > 0) {
    	let clientChannelPermissions = message.channel.permissionsFor(client.user);
   		clientChannelPermissions = new Discord.Permissions(clientChannelPermissions.bitfield);
    	if(!clientChannelPermissions.has(cmd.clientPermissions)) {
        	let missingPermissions = cmd.clientPermissions.filter(perm => clientChannelPermissions.has(perm) === false).join(', ')
        	return message.channel.send("<:X:748632517476745226> Preciso desta(s) permissões que me faltam para executar o comando: " + "`" + missingPermissions + "`")
    	}
	}
    if(cmd.userPermissions.length > 0) {
    	let clientChannelPermissions = message.channel.permissionsFor(message.member);
   		clientChannelPermissions = new Discord.Permissions(clientChannelPermissions.bitfield);
    	if(!clientChannelPermissions.has(cmd.userPermissions)) {
        	let missingPermissions = cmd.userPermissions.filter(perm => clientChannelPermissions.has(perm) === false).join(', ')
        	return message.channel.send("<:X:748632517476745226> Precisas desta(s) permissões que te faltam para executar o comando: " + "`" + missingPermissions + "`")
    	}
	}
    if(cmd.ownerOnly && message.author.id !== "343491235975135243") {
       	return message.channel.send("<:X:748632517476745226> Este comando está restringido ao Owner do Bot!")
	}
    if(cmd.nsfw && !message.channel.nsfw) {
       	return message.channel.send("<:X:748632517476745226> Este comando só pode ser usado em canais de NSFW!")
	}
    try {
        cmd.run(client, message, args)
        client.db.add("comandos_usados", 1)
    }
    catch (e) {
        logger.log('error', e)
        message.reply("Error: " + e)
    }
});
client.on("guildMemberAdd", async (member) => {
    let chx = client.db.get(`welchannel_${member.guild.id}`)   
    let image = await welcomeCanvas
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(member.user.displayAvatarURL({ format: "jpg" }))
        .setColor("border", "#8015EA")
        .setColor("username-box", "#8015EA")
        .setColor("discriminator-box", "#8015EA")
        .setColor("message-box", "#8015EA")
        .setColor("title", "#8015EA")
        .setColor("avatar", "#8015EA")
        .setText("title", "bem-vindo!")
        .setText("message", "Bem-vindo ao {server}")
        .setText("member-count", "-{count}º membro")
        .setBackground("https://mcdn.wallpapersafari.com/medium/40/42/Og6CAh.png")
        .toAttachment()
    let attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");
    try {
    	client.channels.cache.get(chx).send(`Bem-vindo ao servidor **${member.guild.name}**, ${member.user.tag}! Somos agora ${member.guild.memberCount}!`, attachment);
    } catch {
        return;
    }
});
client.on("guildMemberRemove", async (member) => {
    let chx = client.db.get(`leavchannel_${member.guild.id}`)
    let image = await goodbyeCanvas
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(member.user.displayAvatarURL({ format: "jpg" }))
        .setColor("border", "#8015EA")
        .setColor("username-box", "#8015EA")
        .setColor("discriminator-box", "#8015EA")
        .setColor("message-box", "#8015EA")
        .setColor("title", "#8015EA")
        .setColor("avatar", "#8015EA")
        .setText("title", "adeus!")
        .setText("message", "Saiu do server {server}")
        .setText("member-count", "-{count}º membro")
        .setBackground("https://mcdn.wallpapersafari.com/medium/40/42/Og6CAh.png")
        .toAttachment()
        let attachment = new Discord.MessageAttachment(image.toBuffer(), "goodbye-image.png");
     try {
         client.channels.cache.get(chx).send(`Adeus ${member.user.tag}, espero que te tenhas divertido :( Somos agora ${member.guild.memberCount}`, attachment);
     } catch {
         return;
     }
});
client.on("guildCreate", async (guild) => {
    let joinLeaveChannel = await client.channels.cache.get("746067012341596231");
	const embed = new Discord.MessageEmbed()
		.setColor("RANDOM")
        .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
		.setTitle(`Entrei em ${guild.name}!`)
		.setFooter(`ID: ${guild.id}`)
		.setTimestamp()
		.setDescription(`**❯ Membros: ${guild.memberCount}\n❯ Estou agora em: ${client.guilds.cache.size} servers\n❯ Com: ${client.users.cache.size} pessoas**`);
	joinLeaveChannel.send(embed)
});
client.on("guildDelete", async (guild) => {
    let joinLeaveChannel = await client.channels.cache.get("746067012341596231");
	const embed = new Discord.MessageEmbed()
		.setColor("RANDOM")
        .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
		.setTitle(`Saí de ${guild.name}!`)
		.setFooter(`ID: ${guild.id}`)
		.setTimestamp()
		.setDescription(`**❯ Membros: ${guild.memberCount}\n❯ Estou agora em: ${client.guilds.cache.size} servers\n❯ Com: ${client.users.cache.size} pessoas**`);
	joinLeaveChannel.send(embed)
});

fs.readdir("./commands/🎵 Música/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/🎵 Música/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})
fs.readdir("./commands/🐶 Animais/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/🐶 Animais/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})
fs.readdir("./commands/💸 Economia/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/💸 Economia/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})
fs.readdir("./commands/😆 Fun/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/😆 Fun/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})
fs.readdir("./commands/📷 Imagens/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/📷 Imagens/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})
fs.readdir("./commands/ℹ️ Info/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/ℹ️ Info/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})
fs.readdir("./commands/🤣 Meme/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/🤣 Meme/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})
fs.readdir("./commands/⚙️ Moderação/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/⚙️ Moderação/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})
fs.readdir("./commands/🖼️ Image Manipulation/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/🖼️ Image Manipulation/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})

//Parte do DisTube

client.distube
    .on("playSong", async (message, queue, song) => {
        try {
            if(!message.guild.me.hasPermission("ADD_REACTIONS")) return message.channel.send("<:X:748632517476745226> Não tenho permissão para adicionar reações a mensagens!")
            client.db.add("music_played", 1)
            const img = song.youtube ? "https://logodownload.org/wp-content/uploads/2014/10/youtube-logo-6-2.png" : message.member.user.displayAvatarURL()
            const color = song.youtube ? "ff0000" : "#00ffdd"
            const userEmbed = new Discord.MessageEmbed()
                .setAuthor(`Agora a tocar em: ${queue.connection.channel.name}`, img)
                .setDescription(`<:play:748576561837637703> **[${song.name}](${song.url})**\n❯ **Duração da Música: ${song.formattedDuration}**\n❯ **Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "Todo o Queue" : "Esta música" : "Desligado"}**\n❯ **Filtro: ${queue.filter || "Nenhum"}**\n❯ **Duração do Queue: ${queue.formattedDuration} - ${queue.songs.length} música(s)**\n❯ **Pedido por: ${message.member.user}**`)
                .setThumbnail(song.thumbnail)
                .setColor(color)
                .setTimestamp()
                .setFooter(`Volume: ${queue.volume}%`, "https://images.emojiterra.com/twitter/v13.0/512px/1f4e3.png")
            message.channel.send(userEmbed).then(msg => {
                msg.react(':pause:772391602332631050').then(r => {
                    msg.react(':stop:772391560595505162').then(r => {
                        msg.react(':skip:777678145025343529').then(r => {
                                msg.react(":shuffle:779829491207897158").then(r => {
                                    msg.react(":repeat:779662600996782090").then(r => {
                                    	msg.react(":queue:772391486960566272").then(r => {
                                        	msg.react(":volumedown:772391690383917068").then(r => {
                                            	msg.react(":volumeup:772391748999577600").then(r => {
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
                const infosFilter = (reaction, user) => reaction.emoji.id === '772391602332631050' && user.id === message.author.id
                const imagensFilter = (reaction, user) => reaction.emoji.id === '772391560595505162' && user.id === message.author.id;
                const funFilter = (reaction, user) => reaction.emoji.id === '777678145025343529' && user.id === message.author.id;
                const musicaFilter = (reaction, user) => reaction.emoji.id === '779829491207897158' && user.id === message.author.id;
                const animaisFilter = (reaction, user) => reaction.emoji.id === '772391486960566272' && user.id === message.author.id;
                const volumeFilter = (reaction, user) => reaction.emoji.id === '772391690383917068' && user.id === message.author.id;
                const repeatFilter = (reaction, user) => reaction.emoji.id === '779662600996782090' && user.id === message.author.id;
                const volumemaisFilter = (reaction, user) => reaction.emoji.id === '772391748999577600' && user.id === message.author.id;
                const infos = msg.createReactionCollector(infosFilter);
                const imagens = msg.createReactionCollector(imagensFilter);
                const fun = msg.createReactionCollector(funFilter);
                const musica = msg.createReactionCollector(musicaFilter);
                const animais = msg.createReactionCollector(animaisFilter);
                const volume = msg.createReactionCollector(volumeFilter);
                const volumemais = msg.createReactionCollector(volumemaisFilter);
                const repeat = msg.createReactionCollector(repeatFilter);
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
                    let queue = client.distube.getQueue(message.guild.id)
                    if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
                    let userVoiceChannel = message.member.voice.channel;
                    let clientVoiceConnection = message.guild.me.voice;
                    if (userVoiceChannel === clientVoiceConnection.channel) {
                         if(client.distube.isPlaying(message) == false){
                            client.distube.resume(message);
                            const cembed = new Discord.MessageEmbed()
                                .setDescription(`Voltei a tocar: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                                .setColor("RANDOM")
                            return message.channel.send(cembed)
                        } else if (client.distube.isPlaying(message) == true) {
                            client.distube.pause(message);
                            const embed1 = new Discord.MessageEmbed()
                                .setDescription(`Pausei: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                                .setColor("RANDOM")
                            message.channel.send(embed1) 
                        }
                    } else {
                        message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                    }
                })
                animais.on('collect', async (r2, user) => {
                    r2.users.remove(user)
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
                    let queue = client.distube.getQueue(message.guild.id)
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
                            client.distube.shuffle(message)
                            const embed1 = new Discord.MessageEmbed()
                                .setDescription(`<:shuffle:779829491207897158> Misturei as **${queue.songs.length} músicas** que estão no queue!`)
                                .setColor("RANDOM")
                            message.channel.send(embed1)
                        }
                    } else {
                         message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                    }
                })
                imagens.on('collect', (r2, user) => {
                    r2.users.remove(user)
                    let queue = client.distube.getQueue(message.guild.id)
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
                        client.distube.stop(message);
                        const embed = new Discord.MessageEmbed()
                            .setTitle("Stop!")
                            .setColor("RANDOM")
                            .setDescription(`Parei a música e saí do voice channel!\nPedido por(a): ${message.member.user}\nObrigado por usares o **${client.user.username}!**`)
                            .addFields(
                                { name: "Links Importantes:", value: "[Github Repository](https://github.com/TonaS21/bot-dos-bostas)\n[Convida o Bot](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot)\n[Server de Suporte](https://discord.gg/DRnnZPS)", inline: false }
                            )
                            .setTimestamp()
                            .setFooter(client.user.username, client.user.displayAvatarURL())
                        message.channel.send(embed)
                    } else {
                        message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                    }
                })
                fun.on('collect', (r2, user) => {
                    r2.users.remove(user)
                    let queue = client.distube.getQueue(message.guild.id)
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
                        client.distube.skip(message);
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
                        client.distube.setVolume(message, queue.volume - 10)
                        const embed1 = new Discord.MessageEmbed()
                            .setDescription(`<:volumedown:772391690383917068> O volume da música está agora a: **${queue.volume}%**`)
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
                        client.distube.setVolume(message, queue.volume + 10)
                        const embed1 = new Discord.MessageEmbed()
                            .setDescription(`<:volumeup:772391748999577600> O volume da música está agora a: **${queue.volume}%**`)
                            .setColor("RANDOM")
                        message.channel.send(embed1).then(msg1 => {
                            msg1.delete({ timeout: 25000 })
                        })
                    } else {
                        message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                    }
                })
                repeat.on('collect', (r2, user) => {
                    r2.users.remove(user)
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
                        mode = mode ? mode == 2 ? "Repetir o queue" : "Repetir música" : "Desligado";
    					mode = client.distube.setRepeatMode(message, mode);
        				const embed = new Discord.MessageEmbed()
        					.setDescription("O Loop agora está: `" + mode + "`")
        					.setColor("RANDOM")
      					message.channel.send(embed)
    				} else {
      					message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
    				}
                })
                client.distube.on("empty", (song) => {
                    volume.stop()
                	volumemais.stop()
                	fun.stop()
                	imagens.stop()
                	musica.stop()
                	animais.stop()
                	infos.stop()
                })
                queue.connection.dispatcher.on("finish", () => {
                    volume.stop()
                	volumemais.stop()
                	fun.stop()
                	imagens.stop()
                	musica.stop()
                	animais.stop()
                	infos.stop()
                });
                queue.connection.on("disconnect", () => {
                    volume.stop()
                	volumemais.stop()
                	fun.stop()
                	imagens.stop()
                	musica.stop()
                	animais.stop()
                	infos.stop()
                });
            })
        } catch {
            return;
        }
    })
    .on("addSong", (message, queue, song) => {
        const userEmbed = new Discord.MessageEmbed()
            .setAuthor(`Adicionado ao Queue`, "https://emoji.gg/assets/emoji/9663_icons_eight_ok.png")
            .setDescription(`<:play:748576561837637703> **[${song.name}](${song.url})**\n❯ **Duração da Música: ${song.formattedDuration}**\n❯ **Filtro: ${queue.filter || "Nenhum"}**\n❯ **Duração do Queue: ${queue.formattedDuration} - ${queue.songs.length} música(s)**\n❯ **Pedido por: ${message.member.user}**`)
            .setThumbnail(song.thumbnail)
            .setColor("#0ee848")
            .setTimestamp()
            .setFooter(`Volume: ${queue.volume}%`, "https://images.emojiterra.com/twitter/v13.0/512px/1f4e3.png")
        message.channel.send(userEmbed)
    })
    .on("playList", async (message, queue, playlist, song) => {
        try {
            if(!message.guild.me.hasPermission("ADD_REACTIONS")) return message.channel.send("<:X:748632517476745226> Não tenho permissão para adicionar reações a mensagens!")
            client.db.add("music_played", 1)
            const img = song.youtube ? "https://logodownload.org/wp-content/uploads/2014/10/youtube-logo-6-2.png" : message.member.user.displayAvatarURL()
            const color = song.youtube ? "ff0000" : "#00ffdd"
            const userEmbed = new Discord.MessageEmbed()
                .setAuthor(`Agora a tocar em: ${queue.connection.channel.name}`, img)
                .setDescription(`**[${playlist.name}](${playlist.url}) playlist - (${playlist.songs.length} músicas)\n<:play:748576561837637703> [${song.name}](${song.url})**\n❯ **Duração da Música: ${song.formattedDuration}**\n❯ **Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "Todo o Queue" : "Esta música" : "Desligado"}**\n❯ **Filtro: ${queue.filter || "Nenhum"}**\n❯ **Duração do Queue: ${queue.formattedDuration} - ${queue.songs.length} música(s)**\n❯ **Pedido por: ${message.member.user}**`)
                .setThumbnail(playlist.thumbnail)
                .setColor(color)
                .setTimestamp()
                .setFooter(`Volume: ${queue.volume}%`, "https://images.emojiterra.com/twitter/v13.0/512px/1f4e3.png")
            message.channel.send(userEmbed).then(msg => {
                msg.react(':pause:772391602332631050').then(r => {
                    msg.react(':stop:772391560595505162').then(r => {
                        msg.react(':skip:777678145025343529').then(r => {
                                msg.react(":shuffle:779829491207897158").then(r => {
                                    msg.react("<:repeat:779662600996782090>").then(r => {
                                    	msg.react(":queue:772391486960566272").then(r => {
                                        	msg.react(":volumedown:772391690383917068").then(r => {
                                            	msg.react(":volumeup:772391748999577600").then(r => {
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
                const infosFilter = (reaction, user) => reaction.emoji.id === '772391602332631050' && user.id === message.author.id
                const imagensFilter = (reaction, user) => reaction.emoji.id === '772391560595505162' && user.id === message.author.id;
                const funFilter = (reaction, user) => reaction.emoji.id === '777678145025343529' && user.id === message.author.id;
                const musicaFilter = (reaction, user) => reaction.emoji.id === '779829491207897158' && user.id === message.author.id;
                const animaisFilter = (reaction, user) => reaction.emoji.id === '772391486960566272' && user.id === message.author.id;
                const volumeFilter = (reaction, user) => reaction.emoji.id === '772391690383917068' && user.id === message.author.id;
                const repeatFilter = (reaction, user) => reaction.emoji.id === '779662600996782090' && user.id === message.author.id;
                const volumemaisFilter = (reaction, user) => reaction.emoji.id === '772391748999577600' && user.id === message.author.id;
                const infos = msg.createReactionCollector(infosFilter);
                const imagens = msg.createReactionCollector(imagensFilter);
                const fun = msg.createReactionCollector(funFilter);
                const musica = msg.createReactionCollector(musicaFilter);
                const animais = msg.createReactionCollector(animaisFilter);
                const volume = msg.createReactionCollector(volumeFilter);
                const volumemais = msg.createReactionCollector(volumemaisFilter);
                const repeat = msg.createReactionCollector(repeatFilter);
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
                    let queue = client.distube.getQueue(message.guild.id)
                    if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
                    let userVoiceChannel = message.member.voice.channel;
                    let clientVoiceConnection = message.guild.me.voice;
                    if (userVoiceChannel === clientVoiceConnection.channel) {
                         if(client.distube.isPlaying(message) === false){
                            client.distube.resume(message);
                            const cembed = new Discord.MessageEmbed()
                                .setDescription(`Voltei a tocar: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                                .setColor("RANDOM")
                            return message.channel.send(cembed)
                        } else if (client.distube.isPlaying(message) === true) {
                            client.distube.pause(message);
                            const embed1 = new Discord.MessageEmbed()
                                .setDescription(`Pausei: **[${queue.songs[0].name}](${queue.songs[0].url})**`)
                                .setColor("RANDOM")
                            message.channel.send(embed1) 
                        }
                    } else {
                        message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                    }
                })
                animais.on('collect', async (r2, user) => {
                    r2.users.remove(user)
                    let queue = client.distube.getQueue(message.guild.id)
                    if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
                    let userVoiceChannel = message.member.voice.channel;
                    let clientVoiceConnection = message.guild.me.voice;
                    if (userVoiceChannel === clientVoiceConnection.channel) {
                        const pageBack = "778721943318036510";
                        const trash = "778721979061633035";
          				const pageForward = "778721875290357780";
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
                        msg.react(trash)
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
                    let queue = client.distube.getQueue(message.guild.id)
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
                            client.distube.shuffle(message)
                            const embed1 = new Discord.MessageEmbed()
                                .setDescription(`<:shuffle:779829491207897158> Misturei as **${queue.songs.length} músicas** que estão no queue!`)
                                .setColor("RANDOM")
                            message.channel.send(embed1)
                        }
                    } else {
                         message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                    }
                })
                imagens.on('collect', (r2, user) => {
                    r2.users.remove(user)
                    let queue = client.distube.getQueue(message.guild.id)
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
                        client.distube.stop(message);
                        const embed = new Discord.MessageEmbed()
                            .setTitle("Stop!")
                            .setColor("RANDOM")
                            .setDescription(`Parei a música e saí do voice channel!\nPedido por(a): ${message.member.user}\nObrigado por usares o **${client.user.username}!**`)
                            .addFields(
                                { name: "Links Importantes:", value: "[Github Repository](https://github.com/TonaS21/bot-dos-bostas)\n[Convida o Bot](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot)\n[Server de Suporte](https://discord.gg/DRnnZPS)", inline: false }
                            )
                            .setTimestamp()
                            .setFooter(client.user.username, client.user.displayAvatarURL())
                        message.channel.send(embed)
                    } else {
                        message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                    }
                })
                fun.on('collect', (r2, user) => {
                    r2.users.remove(user)
                    let queue = client.distube.getQueue(message.guild.id)
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
                        client.distube.skip(message);
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
                        client.distube.setVolume(message, queue.volume - 10)
                        const embed1 = new Discord.MessageEmbed()
                            .setDescription(`<:volumedown:772391690383917068> O volume da música está agora a: **${queue.volume}%**`)
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
                        client.distube.setVolume(message, queue.volume + 10)
                        const embed1 = new Discord.MessageEmbed()
                            .setDescription(`<:volumeup:772391748999577600> O volume da música está agora a: **${queue.volume}%**`)
                            .setColor("RANDOM")
                        message.channel.send(embed1).then(msg1 => {
                            msg1.delete({ timeout: 25000 })
                        })
                    } else {
                        message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
                    }
                })
                repeat.on('collect', (r2, user) => {
                    r2.users.remove(user)
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
                        mode = mode ? mode == 2 ? "Repetir o queue" : "Repetir música" : "Desligado";
    					mode = client.distube.setRepeatMode(message, mode);
        				const embed = new Discord.MessageEmbed()
        					.setDescription("O Loop agora está: `" + mode + "`")
        					.setColor("RANDOM")
      					message.channel.send(embed)
    				} else {
      					message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
    				}
                })
                client.distube.on("empty", (song) => {
                    volume.stop()
                	volumemais.stop()
                	fun.stop()
                	imagens.stop()
                	musica.stop()
                	animais.stop()
                	infos.stop()
                })
                queue.connection.dispatcher.on("finish", () => {
                    volume.stop()
                	volumemais.stop()
                	fun.stop()
                	imagens.stop()
                	musica.stop()
                	animais.stop()
                	infos.stop()
                });
                queue.connection.on("disconnect", () => {
                    volume.stop()
                	volumemais.stop()
                	fun.stop()
                	imagens.stop()
                	musica.stop()
                	animais.stop()
                	infos.stop()
                });
            })
        } catch {
            return;
        }
    })
    .on("addList", (message, queue, playlist) => {
        const userEmbed = new Discord.MessageEmbed()
            .setAuthor(`Adicionado ao Queue`, "https://emoji.gg/assets/emoji/9663_icons_eight_ok.png")
            .setDescription(`<:play:748576561837637703> **[${playlist.name}](${playlist.url}) playlist - (${playlist.songs.length} músicas)**\n❯ **Duração da Playlist: ${playlist.formattedDuration}**\n❯ **Filtro: ${queue.filter || "Nenhum"}**\n❯ **Duração do Queue: ${queue.formattedDuration} - ${queue.songs.length} música(s)**\n❯ **Pedido por: ${message.member.user}**`)
            .setThumbnail(playlist.thumbnail)
            .setColor("#0ee848")
            .setTimestamp()
            .setFooter(`Volume: ${queue.volume}%`, "https://images.emojiterra.com/twitter/v13.0/512px/1f4e3.png")
        message.channel.send(userEmbed)
    })
    .on("searchResult", (message, result) => {
        let i = 0;
        const embed = new Discord.MessageEmbed()
            .setTitle(`<:youtube2:780204479445991444> A procurar no Youtube <:youtube2:780204479445991444>`)
            .setDescription(`\n${result.map(song => `**${++i} -** **[${song.name}](${song.url})** - \`[${song.formattedDuration}]\``).join("\n")}\n`)
            .setColor("ff0000")
            .setFooter(`Escreve uma coisa qualquer nada haver ou espera 60 segundos para cancelar.`)
        message.channel.send(embed)
    })
    .on("searchCancel", (message) => {
        const embed = new Discord.MessageEmbed()
            .setDescription("Procura cancelada. Não escreveste a tempo ou escreveste alguma coisa sem sentido.")
            .setColor("ff0000")
        message.channel.send(embed)
    })
    .on("error", (message, err) => {
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`<:X:748632517476745226> Ocorreu um erro <:X:748632517476745226>`)
            .setDescription("Se erro continua a acontecer, entra no **[Servidor de Suporte](https://discord.gg/25RTJnNbmS)**" + "\n" + "```\n" + "Ocorreu um erro: " + err + "```")
            .setColor("ff0000")
            .setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed)
    })
    .on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 50;
    })
    .on("finish", message => {
    	let prefix = client.db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = client.config.prefix;
        const userEmbed = new Discord.MessageEmbed()
        	.setDescription(`Mais nenhuma música no queue.\nFaz \`${prefix}leave\` para eu sair do voice channel\nFaz \`${prefix}play\` para voltar a tocar alguma coisa`)
        	.setFooter(client.user.username)
        	.setTimestamp()
            .setColor("RANDOM")
        message.channel.send(userEmbed);
    })
    .on("empty", message => {
        const embed = new Discord.MessageEmbed()
            .setAuthor("Saí do voice channel porque ninguém estava nele!", client.user.displayAvatarURL())
            .setColor("#00ffdd")
        message.channel.send(embed)
    })
    .on("noRelated", message => {
        const embed = new Discord.MessageEmbed()
            .setDescription("Não consegui encontrar nenhuma música. Parei de tocar música.")
            .setColor("ff0000")
        message.channel.send(embed)
    })
client.login(client.config.token);