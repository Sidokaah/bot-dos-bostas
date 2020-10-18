const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../../config.json")
module.exports = {
    name: "categorias",
    aliases: [],
    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = config.prefix;
        message.react(":tick:748569437589995731")
        const help = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setTitle(`Comandos do ${client.user.username}`)
            .setDescription("**Bot feito por: TonaS#9344**")
            .addFields(
                { name: "<:super_mega_laugh:738387807260770347> Fun:", value: `\`${prefix}help fun\``, inline: true },
                { name: ":wrench: Info e Mod:", value: `\`${prefix}help infomod\``, inline: true },
                { name: ":dog: Animais", value: `\`${prefix}help animais\``, inline: true },
                { name: "<:youtube:748576732642148472> Música", value: `\`${prefix}help música\``, inline: true },
                { name: "<:pepesad:749210746499498015> Meme", value: `\`${prefix}help meme\``, inline: true },
                { name: ":camera: Imagens", value: `\`${prefix}help imagens\``, inline: true },
                { name: "<:coroa:755158379768578169> Economia", value: `\`${prefix}help economia\``, inline: true },
            )
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(`Usa sempre ${prefix} antes de todos os comandos`, client.user.displayAvatarURL())
        message.channel.send(help)
    }
}