const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")
const translate = require('@k3rn31p4nic/google-translate-api');

module.exports = {
    name: "translate",
    aliases: ["Translate", "TRANSLATE", " translate", " Translate", " TRANSLATE"],
    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = config.prefix;
        try {
            if (args.length < 2) {
              return message.channel.send("Como usar:" + "`" + `${prefix}translate <língua> <texto>` + "`")
            }
            const result = await translate(args.slice(1).join(' '), { to: args[0] });
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor('RANDOM')
                .addField("Texto Original", args.slice(1).join(' '))
                .addField("Texto Traduzido", result.text)
                .setFooter(`Traduzido de ${result.from.language.iso.toUpperCase()} to ${args[0].toUpperCase()}`);
            message.channel.send({ embed });
        } catch (err) {
            return message.channel.send(`<:X:748632517476745226> Ocorreu um erro: \`${err.message}\`.`);
        }
    }
}