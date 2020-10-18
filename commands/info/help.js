const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
    name: "help",
    aliases: [],
    run: async (client, message, args) => {
     	let prefix = db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = config.prefix;
        if(args[0] === "música") {
            message.react(":tick:748569437589995731")
            const userEmbed = new Discord.MessageEmbed()
                .setTimestamp()
                .setColor('RANDOM')
                .addField("__Comandos de música:__", `\`play ou p\`, \`search\`, \`stop ou leave\`, \`skip\`, \`pause\`, \`resume\`, \`autoplay\`, \`shuffle\`, \`queue ou q\`, \`volume\`, \`jump\`, \`repeat ou loop\`, \`playSkip\`, \`np ou nowplaying\`, \`loopnow\`, \`autoplaynow\`, \`clearqueue\`, \`remove\`, \`cool\`, \`lyrics\`, \`skipto\`, \`move\`.`)
                .addField("__Filtros de música:__", `\`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`, \`haas\`, \`reverse\`, \`flanger\`, \`gate\`.`)
                .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
            message.channel.send(userEmbed);
        } else if(args[0] === "fun") {
            message.react(":tick:748569437589995731")
            const userEmbed = new Discord.MessageEmbed()
                .setTimestamp()
                .setColor('RANDOM')
                .addField("__Comandos:__", `\`randomfacts\`, \`8ball\`, \`slap\`, \`roast\`, \`neves\`, \`exposesezul\`, \`crepper\`, \`rps\`, \`flip\`, \`badjoke\`, \`advice\`, \`isretarded\`, \`say\`, \`isgamer\`, \`isgay\`, \`issimp\`, \`lenny\`, \`captcha\`, \`pp\`, \`isloli\`, \`iswaifu\`, \`isanimegirl\`, \`isdank\`, \`istoxic\`, \`no-u\`, \`chat\`, \`emojify\`, \`snake-game\`, \`hangman\`, \`tic-tac-toe\`, \`clap\`, \`doot\`, \`akistart\`.`)
                .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
            message.channel.send(userEmbed);
        } else if(args[0] === "economia") {
            message.react(":tick:748569437589995731")
            const userEmbed = new Discord.MessageEmbed()
                .setTimestamp()
                .setColor('RANDOM')
                .addField("__Comandos:__", `\`deposit\`, \`daily\`, \`work\`, \`withdraw\`, \`balance\`, \`leaderboard\`, \`roulette\`, \`rob\`, \`sell\`, \`beg\`, \`store\`, \`pay\`, \`weekly\`, \`slots\`.`)
                .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
            message.channel.send(userEmbed);
        } else if(args[0] === "imagens") {
            message.react(":tick:748569437589995731")
            const userEmbed = new Discord.MessageEmbed()
                .setTimestamp()
                .setColor('RANDOM')
                .addField("__Comandos:__", `\`inverse\`, \`wanted\`, \`cursedimg\`, \`cursedminecraft\`, \`food\`, \`animepunch\`, \`shit\`, \`delete\`, \`trash\`, \`hitler\`, \`greyscale\`, \`deepfry\`, \`beautiful\`, \`affect\`, \`gif\`, \`randomgif\`, \`sticker\`, \`randomsticker\`, \`blur\`.`)
                .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
            message.channel.send(userEmbed);
        } else if(args[0] === "animais") {
            message.react(":tick:748569437589995731")
            const userEmbed = new Discord.MessageEmbed()
                .setTimestamp()
                .setColor('RANDOM')
                .addField("__Comandos:__", `\`dogs\`, \`kitty\`, \`quacc\`, \`foxsays\`, \`lizardboi\`, \`panda\`, \`animais\`, \`snake\`, \`ferret\`, \`goose\`.`)
                .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
            message.channel.send(userEmbed);
        } else if(args[0] === "meme") {
            message.react(":tick:748569437589995731")
            const userEmbed = new Discord.MessageEmbed()
                .setTimestamp()
                .setColor('RANDOM')
                .addField("__Comandos:__", `\`meme\`, \`reddit\`, \`twitter\`, \`meirl\`, \`comic\`, \`twitter\`, \`wholesome\`, \`discordmeme\`, \`minecraftmeme\`, \`4chan\`, \`sports\`, \`facepalm\`, \`starwars\`, \`amongus\`.`)
                .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
            message.channel.send(userEmbed);
        } else if(args[0] === "infomod") {
            message.react(":tick:748569437589995731")
            const userEmbed = new Discord.MessageEmbed()
                .setTimestamp()
                .setColor('RANDOM')
                .addField("__Comandos:__", `\`userinfo\`, \`clear\`, \`poll\`, \`ping\`, \`ban\`, \`kick\`, \`covid\`, \`ticket-setup\`, \`close\`, \`uptime\`, \`steam\`, \`help-eng\`, \`invite\`, \`weather\`, \`instagram\`, \`lock\`, \`serverinfo\`, \`yt\`, \`math\`, \`giverole\`, \`delrole\`, \`hasrole\`, \`urban\`, \`fortnite\`, \`slowmode\`, \`kpop\`, \`name\`, \`define\`, \`acrónimo\`, \`rhymer\`, \`sobre\`, \`categorias\`, \`csgo\`, \`setwelcome\`, \`disablewelcome\`, \`warn\`, \`warnings\`, \`reset-warnings\`, \`setgoodbye\`, \`disablegoodbye\`, \`djsdocs\`, \`translate\`.`)
                .setFooter(`Usa sempre ${prefix} para usares os comandos do bot.`)
            message.channel.send(userEmbed);
        } else if(args[0] === "all") {
            message.react(":tick:748569437589995731")
            const userEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor("Lista de Comandos", client.user.displayAvatarURL())
                .setDescription(`<:discord1:748909489293492376> **Server de Suporte:** [Link](https://discord.gg/fnvdugV)\n<:paulbot:759341625167839232> **Invite do Bot:** [Link](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=271969366&scope=bot)\n<:github:748909140084129872> **Github Repository:** [Link](https://github.com/TonaS21/bot-dos-bostas)\n\n**O prefix atual do server é ➜ ${prefix}**`)
                .addField(":information_source: • __Info__ [25]", `\`userinfo\`, \`ping\`, \`covid\`, \`uptime\`, \`steam\`, \`invite\`, \`help-eng\`, \`weather\`, \`instagram\`, \`serverinfo\`, \`yt\`, \`math\`, \`urban\`, \`fortnite\`, \`kpop\`, \`name\`, \`define\`, \`acrónimo\`, \`rhymer\`, \`sobre\`, \`categorias\`, \`wiki\`, \`csgo\`, \`djsdocs\`, \`translate\`.`)
                .addField(":gear: • __Mod__ [19]", `\`clear\`, \`poll\`, \`ban\`, \`kick\`, \`giverole\`, \`delrole\`, \`hasrole\`, \`slowmode\`, \`setprefix\`, \`ticket-setup\`, \`close\`, \`sugestão\`, \`setwelcome\`, \`disablewelcome\`, \`warn\`, \`warnings\`, \`reset-warnings\`, \`setgoodbye\`, \`disablegoodbye\`.`)
                .addField(":camera: • __Imagens__ [24]", `\`inverse\`, \`wanted\`, \`cursedminecraft\`, \`cursedimg\`, \`food\`, \`animepunch\`, \`shit\`, \`delete\`, \`trash\`, \`hitler\`, \`greyscale\`, \`deepfry\`, \`beautiful\`, \`affect\`, \`gif\`, \`randomgif\`, \`sticker\`, \`randomsticker\`, \`blur\`, \`changemymind\`, \`clyde\`, \`supreme\`, \`tweet\`, \`trumptweet\`.`)
                .addField("<:super_mega_laugh:738387807260770347> • __Fun__ [33]", `\`randomfacts\`, \`8ball\`, \`slap\`, \`roast\`, \`neves\`, \`exposesezul\`, \`creeper\`, \`rps\`, \`flip\`, \`badjoke\`, \`advice\`, \`isretarded\`, \`say\`, \`isgamer\`, \`isgay\`, \`issimp\`, \`lenny\`, \`captcha\`, \`pp\`, \`isloli\`, \`iswaifu\`, \`isanimegirl\`, \`isdank\`, \`istoxic\`, \`no-u\`, \`chat\`, \`emojify\`, \`snake-game\`, \`hangman\`, \`tic-tac-toe\`, \`clap\`, \`doot\`, \`akistart\`.`)
                .addField("<:coroa:755158379768578169> • __Economia__ [14]", `\`deposit\`, \`daily\`, \`work\`, \`withdraw\`, \`balance\`, \`leaderboard\`, \`roulette\`, \`rob\`, \`sell\`, \`beg\`, \`store\`, \`pay\`, \`weekly\`, \`slots\`.`)
                .addField("<:pepesad:749210746499498015> • __Meme__ [14]", `\`meme\`, \`reddit\`, \`twitter\`, \`meirl\`, \`comic\`, \`twitter\`, \`wholesome\`, \`discordmeme\`, \`minecraftmeme\`, \`4chan\`, \`sports\`, \`facepalm\`, \`starwars\`, \`amongus\`.`)
                .addField("<:youtube:748576732642148472> • __Música__ [31]", `\`play ou p\`, \`search\`, \`stop ou leave\`, \`skip\`, \`pause\`, \`resume\`, \`autoplay\`, \`shuffle\`, \`queue ou q\`, \`volume\`, \`jump\`, \`repeat ou loop\`, \`playSkip\`, \`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`, \`haas\`, \`reverse\`, \`flanger\`, \`gate\`, \`np ou nowplaying\`, \`loopnow\`, \`autoplaynow\`, \`clearqueue\`, \`remove\`, \`cool\`, \`lyrics\`, \`skipto\`, \`move\`.`)
                .addField(":dog: • __Animais__ [10]", `\`dogs\`, \`kitty\`, \`quacc\`, \`foxsays\`, \`lizardboi\`, \`panda\`, \`animais\`, \`snake\`, \`ferret\`, \`goose\`.`)
                .setFooter(`Pedido por(a): ${message.member.displayName}`, message.author.displayAvatarURL())
                .setTimestamp()
            message.channel.send(userEmbed);
        }
        if(!args[0]) {
            message.react(":tick:748569437589995731")
            const ajuda = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Lista de comandos do Bot!")
                .setDescription("**Todas as categorias de comandos:**\n\n" + `**O prefix atual do server é ➜ ${prefix}**`+ "\n``` ℹ️  Info\n⚙️ Moderação\n📷 Imagens\n😆 Fun\n🤣 Memes\n🎵 Música\n🐶 Animais\n💸 Economia```")
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
                                            msg.react('💸').then(r => {
                                        })
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
            const ecoFilter = (reaction, user) => reaction.emoji.name === '💸' && user.id === message.author.id;
            const infos = msg.createReactionCollector(infosFilter);
            const adm = msg.createReactionCollector(admFilter);
            const fun = msg.createReactionCollector(funFilter);
            const mem = msg.createReactionCollector(memFilter);
            const mu = msg.createReactionCollector(muFilter);
            const ani = msg.createReactionCollector(aniFilter);
            const ima = msg.createReactionCollector(imaFilter);
            const eco = msg.createReactionCollector(ecoFilter);
            adm.on('collect', (r2, user) => {
                r2.users.remove(user)
                ajuda.setTitle(":gear: • __Mod__ [19]")
                ajuda.setDescription(`\`clear\`, \`poll\`, \`ban\`, \`kick\`, \`giverole\`, \`delrole\`, \`hasrole\`, \`slowmode\`, \`setprefix\`, \`ticket-setup\`, \`close\`, \`sugestão\`, \`setwelcome\`, \`disablewelcome\`, \`warn\`, \`warnings\`, \`reset-warnings\`, \`setgoodbye\`, \`disablegoodbye\`.`)
                msg.edit(ajuda)
            })
            infos.on('collect', (r2, user) => {
                r2.users.remove(user)
                ajuda.setTitle(":information_source: • __Info__ [24]")
                ajuda.setDescription(`\`userinfo\`, \`ping\`, \`covid\`, \`uptime\`, \`steam\`, \`invite\`, \`help-eng\`, \`weather\`, \`instagram\`, \`serverinfo\`, \`yt\`, \`math\`, \`urban\`, \`fortnite\`, \`kpop\`, \`name\`, \`define\`, \`acrónimo\`, \`rhymer\`, \`sobre\`, \`categorias\`, \`wiki\`, \`csgo\`, \`djsdocs\`.`)
                msg.edit(ajuda)
            })
            fun.on('collect', (r2, user) => {
                r2.users.remove(user)
                ajuda.setTitle("<:super_mega_laugh:738387807260770347> • __Fun__ [33]")
                ajuda.setDescription(`\`randomfacts\`, \`8ball\`, \`slap\`, \`roast\`, \`neves\`, \`exposesezul\`, \`creeper\`, \`rps\`, \`flip\`, \`badjoke\`, \`advice\`, \`isretarded\`, \`say\`, \`isgamer\`, \`isgay\`, \`issimp\`, \`lenny\`, \`captcha\`, \`pp\`, \`isloli\`, \`iswaifu\`, \`isanimegirl\`, \`isdank\`, \`istoxic\`, \`no-u\`, \`chat\`, \`emojify\`, \`snake-game\`, \`hangman\`, \`tic-tac-toe\`, \`clap\`, \`doot\`, \`akistart\`.`)
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
            eco.on('collect', (r2, user) => {
                r2.users.remove(user)
                ajuda.setTitle("<:coroa:755158379768578169> • __Economia__ [14]")
                ajuda.setDescription(`\`deposit\`, \`daily\`, \`work\`, \`withdraw\`, \`balance\`, \`leaderboard\`, \`roulette\`, \`rob\`, \`sell\`, \`beg\`, \`store\`, \`pay\`, \`weekly\`, \`slots\`.`)
                msg.edit(ajuda)
            })
          }) 
        }
    }
}