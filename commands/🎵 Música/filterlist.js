const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../../config.json")

module.exports = {
    name: "filterlist",
    description: "Lista de filtros de música",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = config.prefix;
        const command = args.join(" ")
        const embed = new Discord.MessageEmbed()
            .addField(`__Filtros de Música__`, "\`surround\`, \`subboost\`, \`treble\`, \`normalizer\`, \`pulsator\`, \`mcompand\`, \`tremolo\`, \`vibrato\`, \`3d\`, \`bassboost\`, \`echo\`, \`nightcore\`, \`vaporwave\`, \`haas\`, \`reverse\`, \`flanger\`")
           	.setColor("RANDOM")
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot`)
            .setTimestamp()
        message.channel.send(embed)
    }
}