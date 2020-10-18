const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
    name: "help-eng",
    aliases: [],
    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = config.prefix;
        message.react(":tick:748569437589995731")
        const userEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Command List", client.user.displayAvatarURL())
            .setDescription(`<:discord1:748909489293492376> **Support Server:** [Link](https://discord.gg/fnvdugV)\n<:paulbot:759341625167839232> **Invite the Bot:** [Link](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=271969366&scope=bot)\n<:github:748909140084129872> **Github Repository:** [Link](https://github.com/TonaS21/bot-dos-bostas)\n\n**The server's current prefix is ➜ ${prefix}**`)
            .addField(":information_source: • __Info__ [25]", `\`userinfo\`, \`ping\`, \`covid\`, \`uptime\`, \`steam\`, \`invite\`, \`help-eng\`, \`weather\`, \`instagram\`, \`serverinfp\`, \`yt\`, \`math\`, \`urban\`, \`fortnite\`, \`kpop\`, \`name\`, \`define\`, \`acrónimo\`, \`rhymer\`, \`sobre\`, \`categorias\`, \`wiki\`, \`csgo\`, \`djsdocs\`, \`translate\`.`)
            .addField(":gear: • __Mod__ [19]", `\`clear\`, \`poll\`, \`ban\`, \`kick\`, \`giverole\`, \`delrole\`, \`hasrole\`, \`slowmode\`, \`setprefix\`, \`ticket-setup\`, \`close\`, \`sugestão\`, \`setwelcome\`, \`disablewelcome\`, \`warn\`, \`warnings\`, \`reset-warnings\`, \`setgoodbye\`, \`disablegoodbye\`.`)
            .addField(":camera: • __Images__ [23]", `\`inverse\`, \`wanted\`, \`cursedimg\`, \`food\`, \`animepunch\`, \`shit\`, \`delete\`, \`trash\`, \`hitler\`, \`greyscale\`, \`deepfry\`, \`beautiful\`, \`affect\`, \`gif\`, \`randomgif\`, \`sticker\`, \`randomsticker\`, \`blur\`, \`changemymind\`, \`clyde\`, \`supreme\`, \`tweet\`, \`trumptweet\`.`)
            .addField("<:super_mega_laugh:738387807260770347> • __Fun__ [33]", `\`randomfacts\`, \`8ball\`, \`slap\`, \`roast\`, \`neves\`, \`exposesezul\`, \`crepper\`, \`rps\`, \`flip\`, \`badjoke\`, \`advice\`, \`isretarded\`, \`say\`, \`isgamer\`, \`isgay\`, \`issimp\`, \`lenny\`, \`captcha\`, \`pp\`, \`isloli\`, \`iswaifu\`, \`isanimegirl\`, \`isdank\`, \`istoxic\`, \`no-u\`, \`chat\`, \`emojify\`, \`snake-game\`, \`hangman\`, \`tic-tac-toe\`, \`clap\`, \`doot\`, \`akistart\`.`)
            .addField("<:coroa:755158379768578169> • __Economy__ [14]", `\`deposit\`, \`daily\`, \`work\`, \`withdraw\`, \`balance\`, \`leaderboard\`, \`roulette\`, \`rob\`, \`sell\`, \`beg\`, \`store\`, \`pay\`, \`weekly\`, \`slots\`.`)
            .addField("<:pepesad:749210746499498015> • __Meme__ [14]", `\`meme\`, \`reddit\`, \`twitter\`, \`meirl\`, \`comic\`, \`twitter\`, \`wholesome\`, \`discordmeme\`, \`minecraftmeme\`, \`4chan\`, \`sports\`, \`facepalm\`, \`starwars\`, \`amongus\`.`)
            .addField("<:youtube:748576732642148472> • __Music__ [31]", `\`play ou p\`, \`search\`, \`stop ou leave\`, \`skip\`, \`pause\`, \`resume\`, \`autoplay\`, \`shuffle\`, \`queue ou q\`, \`volume\`, \`jump\`, \`repeat ou loop\`, \`playSkip\`, \`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`, \`haas\`, \`reverse\`, \`flanger\`, \`gate\`, \`np ou nowplaying\`, \`loopnow\`, \`autoplaynow\`, \`clearqueue\`, \`remove\`, \`cool\`, \`lyrics\`, \`skipto\`, \`move\`.`)
            .addField(":dog: • __Animals__ [10]", `\`dogs\`, \`kitty\`, \`quacc\`, \`foxsays\`, \`lizardboi\`, \`panda\`, \`animais\`, \`snake\`, \`ferret\`, \`goose\`.`)
            .setFooter(`Requested by: ${message.member.displayName}`, message.author.displayAvatarURL())
            .setTimestamp()
        message.channel.send(userEmbed);
    }
}