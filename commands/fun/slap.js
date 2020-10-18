const Discord = require("discord.js")

module.exports = {
    name: "slap",
    aliases: ["Slap", "SLAP", " slap", " Slap", " SLAP"],
    run: async (client, message, args) => {
        let answers = ["https://media1.tenor.com/images/3c161bd7d6c6fba17bb3e5c5ecc8493e/tenor.gif?itemid=5196956", "https://media1.tenor.com/images/49de17c6f21172b3abfaf5972fddf6d6/tenor.gif?itemid=10206784", "https://tenor.com/view/slap-slow-motion-slap-gif-10048943", "https://media1.tenor.com/images/bc858e69d5022807b84554b2d4583c10/tenor.gif?itemid=5122019", "https://media1.tenor.com/images/725a604e470a6c2768149c64fd166292/tenor.gif?itemid=16095505", "https://media1.tenor.com/images/31f29b3fcc20a486f44454209914266a/tenor.gif?itemid=17942299", "https://media1.tenor.com/images/4c87273e872b4a7fc23a37868b3f3577/tenor.gif?itemid=15003911", "https://thumbs.gfycat.com/ForkedFamousGalapagoshawk-size_restricted.gif"]
        let response = answers[Math.floor(Math.random() * answers.length)];
        const personTagged = message.mentions.members.first();
        if (!personTagged) {
            message.react(":X:748632517476745226")
            return message.reply('Precisas de especificar uma pessoa para dares uma chapada!');
        }
        const userEmbed = new Discord.MessageEmbed()
            .setTitle(message.author.username + ' deu uma chapada a ' + personTagged.displayName)
            .setColor('RED')
            .setImage(response)
            .setFooter("Quem está a ler isto é gay hehe")
            .setTimestamp()
        message.channel.send(userEmbed);
    }
}