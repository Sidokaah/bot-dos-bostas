const Discord = require("discord.js")

module.exports = {
    name: "8ball",
    aliases: ["8Ball", "8BALL", "8ball", "8Ball", "8BALL"],
    run: async (client, message, args) => {
        let args1 = message.content.split(" ").slice(0);
        let question = args1.slice(1).join(" ");
        if (!question) {
            message.react(":X:748632517476745226")
            return message.reply('Precisas de especificar uma pergunta!');
        } else {
            let answers = ["Sim.", "Não.", "Talvez.", "Claro!", "Não sei.", "Provavelmente.", "Provavelmente não.", "Claro que não!", "Não me digas :/.", "Fode-te.", "Snão.", "És gay."]
            let response = answers[Math.floor(Math.random() * answers.length)];
            let embed = new Discord.MessageEmbed()
                .setTitle("8ball")
                .setColor("RANDOM")
                .setThumbnail("https://i.ytimg.com/vi/ADjTcV8JIss/maxresdefault.jpg")
                .setImage(message.member.user.displayAvatarURL())
                .addField('Pergunta: ', question)
                .addField('Resposta: ', response);
            message.channel.send(embed);
        } 
    }
}