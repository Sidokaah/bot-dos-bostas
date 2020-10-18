const Discord = require("discord.js")
const { calculator, formatDate } = require("../../functions");

module.exports = {
    name: "math",
    aliases: ["Math", "MATH", " math", " Math", " MATH"],
    run: async (client, message, args) => {
        if (!args[0]) {
            message.react(":X:748632517476745226")
            return message.channel.send("Não especificaste o primeiro número!")
        }
        if (!args[1]) {
            message.react(":X:748632517476745226")
            return message.channel.send("Não especificaste o tipo de operação!")
        }
        if (!args[2]) {
            message.react(":X:748632517476745226")
            return message.channel.send("Não especificaste o segundo número!")
        }
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("A Resposta é:")
            .setDescription(calculator(args[0], args[1], args[2]))
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        message.channel.send(embed)
    }
}