const Discord = require("discord.js")

module.exports = {
    name: "filterlist",
    description: "Lista de filtros de música",
    cooldown: "5",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        let prefix = client.db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = client.config.prefix;
        const command = args.join(" ")
        const embed = new Discord.MessageEmbed()
            .addField(`__Filtros de Música__`, "\`surround\`, \`subboost\`, \`treble\`, \`normalizer\`, \`pulsator\`, \`mcompand\`, \`tremolo\`, \`vibrato\`, \`3d\`, \`bassboost\`, \`echo\`, \`nightcore\`, \`vaporwave\`, \`haas\`, \`reverse\`, \`flanger\`, \`earwax\`, \`8d\`.")
           	.setColor("RANDOM")
            .setFooter(`Usa sempre ${prefix} para usares os comandos do bot`)
            .setTimestamp()
        message.channel.send(embed)
    }
}