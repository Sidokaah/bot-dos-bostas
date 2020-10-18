const Discord = require('discord.js');
const DisTube = require('distube')
const client = new Discord.Client({partials: ["MESSAGE", "USER", "REACTION"]});
const config = require("./config.json")
const fs = require("fs")
const db = require("quick.db")
const { formatDate } = require("./functions");
const cooldowns = new Discord.Collection();

client.config = require("./config.json")
client.distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, highWaterMark: 1 << 23, youtubeCookie: "VISITOR_INFO1_LIVE=sTPPpUUKGuY; HSID=AaxFP4U4da2vlvz9P; SSID=AOB5Qg-Aq-K9cyeJ5; APISID=sEDvPOYp5tGQFgZA/AAinim2LxloS9wvc1; SAPISID=E3OiqZDhcBPf2vVp/AxyHLfZUq5m7PlzuH; __Secure-3PAPISID=E3OiqZDhcBPf2vVp/AxyHLfZUq5m7PlzuH; LOGIN_INFO=AFmmF2swRAIgRPjJqjUVLSkepkSmF49iLZyAdnSGuSJtpiXPTtmvwFkCIAR3xrUYEp1SIpj2nN4Wmp0qkAUIcjJrA1LCDsmFv4Um:QUQ3MjNmendtNWszc1o2ZnFyRl9xTldYMEk3UGQtZWdLa3A1ZGdwZHJCRTR0NHJ4SzA2LUhOakVYMHdBazlCUjNhQVBuR0tFclRUQWN2TG8yeXJXZkh5SEkxZTFhc29PSmxQcTc0TkF6NHQzakFvOFM4R0J5ZE1mWERmcFA0M1hfNWN0a3E3R0ZkLVE5WVZhWk5hMUN4TmFPQjlmb2NWVHdwbFB4TGRhRko5Nno2UW5Xa0FKS1Rr; NID=204=xHFWuJ6rwvDlMRpxUXgrG8V8QisopDaJesogwSpclfHpzbvrb1otUPsZ_RR0fb-bXO9bym-Z0bxi_93TLG7E7ECvtUld2CIxRFXp101SrkTAEOg7C8xFi_W3ZkhC4JTo8Yp1QBeUeNhrebUT7gSCN6mUAPnz8GijGmXYxk68k78; CONSENT=YES+PT.en+V9+BX; SID=1wfXO5Q2CHh1PNxoywtLPmAS9hbPvjqypxyLZyGFEienh_PkU70uPW-mS9nsnlnkF6n5yQ.; __Secure-3PSID=1wfXO5Q2CHh1PNxoywtLPmAS9hbPvjqypxyLZyGFEienh_PkTNoIzMyABfiJvl93mv4Z3Q.; PREF=f1=50000000&al=pt-PT&f5=20030&f6=40000400; YSC=pIr0qpp52kg; wide=1; SIDCC=AJi4QfGo8spc7AT6odnZqty4AY-zU-e388cLg3vDlcKtNGRIp0P2ksnM0QOlnOd26bO4I8Zgdi4; __Secure-3PSIDCC=AJi4QfEYRt-czfo5X6FI8HXs0nG6NYpA2oJJu5K8DbyXbq_azKQAuXZxWp_wdNKcf0ZHkIrf_70" })
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
const Canvas = require("discord-canvas"),
    goodbyeCanvas = new Canvas.Goodbye(),
    welcomeCanvas = new Canvas.Welcome()

client.on("ready", async () => {
    let totalMembers = 0
    for (const guild of client.guilds.cache) {
      totalMembers += (await guild[1].members.fetch()).size
    }
    console.log(`${client.user.tag} está pronto para ser usado!`);
    const statuses = [{ text: `${totalMembers} users | ${config.prefix}help`, type: 'LISTENING' },{ text: `${client.guilds.cache.size} servers | ${config.prefix}help`, type: 'LISTENING' },]
	client.setInterval(() => {
		const activity = statuses[Math.floor(Math.random() * statuses.length)];
		const text = typeof activity.text === 'function' ? activity.text() : activity.text;
		client.user.setActivity(text, { type: activity.type });
    }, 20000);
});
client.on("message", async (message) => {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = config.prefix;
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
    try {
        cmd.run(client, message, args)
    }
    catch (e) {
        console.error(e)
        message.reply("Error: " + e)
    }
});
client.on("messageReactionAdd", async (reaction, user) => {
    if (user.partial) await user.fetch();
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();
    if (user.bot) return;
    let ticketid = await db.get(`${reaction.message.guild.id}-ticket`);
    if (!ticketid) return;
    if (reaction.message.id == ticketid && reaction.emoji.name == "🎫") {
      reaction.users.remove(user);
      reaction.message.guild.channels
        .create(`ticket-${user.username}`, {
          permissionOverwrites: [
            {
              id: user.id,
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
            },
            {
              id: reaction.message.guild.roles.everyone,
              deny: ["VIEW_CHANNEL"]
            },
            {
              id: reaction.message.guild.roles.cache.find(
                role => role.name === "Support Team"
              ),
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
            }
          ],
          type: "text"
        })
        .then(async channel => {
          channel.send(
            `<@${user.id}>`,
            new Discord.MessageEmbed()
              .setTitle("Bem-vindo ao teu Ticket!")
              .setDescription("A Equipa de Suporte estará aqui brevemente.")
              .setColor("RANDOM")
              .addField(
                "**Links**",
                "**[Convida-me](https://discord.com/oauth2/authorize?client_id=745926398212046878&scope=bot&permissions=8) | " +
                  "[Server de Suporte](https://discord.gg/Jqu9puj)**"
              )
          );
        });
    }
});
client.on("guildMemberAdd", async (member) => {
    let chx = db.get(`welchannel_${member.guild.id}`);
    let channel1 = await client.channels.cache.get("746067012341596231");
    let guild1 = await client.guilds.cache.get("577155568699965444");
    if (guild1 != member.guild) {
        return;
    } else {
        const created = formatDate(member.user.createdAt);
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
        .toAttachment();
        let attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");
    client.channels.cache.get(chx).send(`Bem-vindo ao servidor **${member.guild.name}**, ${member.user.tag}! Somos agora ${member.guild.memberCount}!`, attachment);
});
client.on("guildMemberRemove", async (member) => {
    let chx = db.get(`leavchannel_${member.guild.id}`);
    let channel1 = await client.channels.cache.get("746067012341596231");
    let guild = await client.guilds.cache.get("577155568699965444");
    if (guild != member.guild) {
        return;
    } else {
        const created = formatDate(member.user.createdAt);
        const embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .addField("Conta criada", `${created}`)
            .setDescription(`:outbox_tray: ${member.user} **saiu do server.**`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .setFooter(`ID do usuário: ${member.user.id}`)
            .setTimestamp();
        channel1.send(embed1);
    }
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
        .toAttachment();
        let attachment = new Discord.MessageAttachment(image.toBuffer(), "goodbye-image.png");
    client.channels.cache.get(chx).send(`Adeus ${member.user.tag}, espero que te tenhas divertido :( Somos agora ${member.guild.memberCount}`, attachment);
  
});
client.on("guildCreate", async (guild) => {
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
client.on("guildRemove", async (guild) => {
    let joinLeaveChannel = await client.channels.cache.get("746067012341596231");
    let totalMembers = 0
    for (const guild of client.guilds.cache) {
      totalMembers += (await guild[1].members.fetch()).size
    }
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

fs.readdir("./commands/musica/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/musica/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
    console.log("Loaded all the commands from the `musica` folder!")
})
fs.readdir("./commands/animais/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/animais/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
    console.log("Loaded all the commands from the `animais` folder!")
})
fs.readdir("./commands/economy/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/economy/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
    console.log("Loaded all the commands from the `economy` folder!")
})
fs.readdir("./commands/fun/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/fun/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
    console.log("Loaded all the commands from the `fun` folder!")
})
fs.readdir("./commands/imagens/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/imagens/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
    console.log("Loaded all the commands from the `imagens` folder!")
})
fs.readdir("./commands/info/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/info/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
    console.log("Loaded all the commands from the `info` folder!")
})
fs.readdir("./commands/meme/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/meme/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
    console.log("Loaded all the commands from the `meme` folder!")
})
fs.readdir("./commands/moderation/", (err, files) => {
    let jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach((file) => {
        let cmd = require(`./commands/moderation/${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
    console.log("Loaded all the commands from the `moderation` folder!")
})

const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
client.distube
    .on("playSong", async (message, queue, song) => {
        const img = song.youtube ? "https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png" : message.member.user.displayAvatarURL()
        const userEmbed = new Discord.MessageEmbed()
            .setAuthor(`Agora a tocar em: ${queue.connection.channel.name}`, img)
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
                let queue = client.distube.getQueue(message.guild.id)
                if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
                if(client.distube.isPlaying = false){
                    const cembed = new Discord.MessageEmbed()
                        .setDescription("A música já não está a tocar!")
                        .setColor("RANDOM")
                    return message.channel.send(cembed)
                }
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
                    client.distube.pause(message);
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
                if(client.distube.isPlaying = true){
                    const cembed = new Discord.MessageEmbed()
                        .setDescription("A música já está a tocar!")
                        .setColor("RANDOM")
                    return message.channel.send(cembed)
                }
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
                    client.distube.resume(message);
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
                let queue = client.distube.getQueue(message.guild.id)
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
                    client.distube.setVolume(message, queue.volume + 10)
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
            client.distube.on("empty", (song) => {
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
        const img = song.youtube ? "https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png" : message.member.user.displayAvatarURL()
        const userEmbed = new Discord.MessageEmbed()
            .setAuthor(`Agora a tocar em: ${queue.connection.channel.name}`, img)
            .setDescription(`**[${playlist.name}](${playlist.url}) playlist - (${playlist.songs.length} músicas)\n<:play:748576561837637703> Agora a tocar ➜ [${song.name}](${song.url})**\n❯ **Duração da Música: ${song.formattedDuration}**\n❯ **Filtros: ${queue.filter || "Nenhum"}**\n❯ **Duração do Queue: ${queue.formattedDuration} - ${queue.songs.length} música(s)**\n❯ **Pedido por: ${message.member.user}**`)
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
                let queue = client.distube.getQueue(message.guild.id)
                if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
                if(client.distube.isPlaying = false){
                    const cembed = new Discord.MessageEmbed()
                        .setDescription("A música já não está a tocar!")
                        .setColor("RANDOM")
                    return message.channel.send(cembed)
                }
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
                    client.distube.pause(message);
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
                let queue = client.distube.getQueue(message.guild.id)
                if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
                if(client.distube.isPlaying = true){
                    const cembed = new Discord.MessageEmbed()
                        .setDescription("A música já está a tocar!")
                        .setColor("RANDOM")
                    return message.channel.send(cembed)
                }
                let userVoiceChannel = message.member.voice.channel;
                let clientVoiceConnection = message.guild.me.voice;
                if (userVoiceChannel === clientVoiceConnection.channel) {
                    client.distube.resume(message);
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
                let queue = client.distube.getQueue(message.guild.id)
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
                    client.distube.setVolume(message, queue.volume + 10)
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
            client.distube.on("empty", (song) => {
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
            .setDescription(`<:play:748576561837637703> **[${playlist.name}](${playlist.url}) playlist - (${playlist.songs.length} músicas)**\n❯ **Duração da Playlist: ${playlist.formattedDuration}**\n❯ **Filtro: ${queue.filter || "Nenhum"}**\n❯ **Duração do Queue: ${queue.formattedDuration} - ${queue.songs.length} música(s)**\n❯ **Pedido por: ${message.member.user}**`)
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
client.login(client.config.token);