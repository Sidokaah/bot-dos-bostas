const Discord = require("discord.js")
const weather = require("weather-js")

module.exports = {
    name: "weather",
    aliases: ["Weather", "WEATHER", " weather", " Weather", " WEATHER"],
    usage: ["[cidade]"],
    description: "Responde com as condições metereológicas da cidade especificada",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
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
}