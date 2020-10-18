const Discord = require("discord.js")
const { Random } = require("something-random-on-discord")
const random = new Random();

module.exports = {
    name: "animepunch",
    aliases: ["Animepunch", "AnimePunch", "ANIMEPUNCH", " animepunch", " Animepunch", " AnimePunch", " ANIMEPUNCH"],
    run: async (client, message, args) => {
        let data = await random.getAnimeImgURL("punch")
        const embed = new Discord.MessageEmbed()
            .setAuthor("PUNCH!")
            .setImage(data)
            .setTimestamp()
            .setColor("RANDOM")
        message.channel.send(embed)
    }
}