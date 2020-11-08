const Discord = require("discord.js");
const request = require('node-superfetch');
const { shuffle, list } = require('../../util/Util');
const difficulties = ['easy', 'medium', 'hard'];
const choices = ['A', 'B', 'C', 'D'];

module.exports = {
    name: "quiz",
    description: "Faz perguntas de diversos tópicos",
    cooldown: "5",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
		try {
            const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
			const { body } = await request
				.get('https://opentdb.com/api.php')
				.query({
					amount: 1,
					type: 'multiple',
					encode: 'url3986',
					difficulty
				});
			if (!body.results) return message.channel.send('A questão não foi encontrada! Tenta de novo mais tarde!');
			const answers = body.results[0].incorrect_answers.map(answer => decodeURIComponent(answer.toLowerCase()));
			const correct = decodeURIComponent(body.results[0].correct_answer.toLowerCase());
			answers.push(correct);
			const shuffled = shuffle(answers);
            const embed1 = new Discord.MessageEmbed()
            	.setAuthor(`${message.author.username}, aqui está a tua questão`, message.author.displayAvatarURL())
            	.setDescription(`**${decodeURIComponent(body.results[0].question)}**\n*Tens 15 segundos para responder com a letra correta.*\n\n${shuffled.map((answer, i) => "**" + choices[i] + ".** " + answer).join('\n')}`)
            	.addFields(
                    { name: "Categoria", value: `\`${decodeURIComponent(body.results[0].category)}\``, inline: true },
                    { name: "Dificuldade", value: `\`${decodeURIComponent(body.results[0].difficulty)}\``, inline: true },
                )
            	.setColor("RANDOM")
			await message.channel.send(embed1)
			const filter = res => res.author.id === message.author.id && choices.includes(res.content.toUpperCase());
			const msgs = await message.channel.awaitMessages(filter, {
				max: 1,
				time: 15000
			});
			if (!msgs.size) return message.channel.send(`Desculpa, o tempo acabou. A resposta certa era \`${correct}\`.`);
			const win = shuffled[choices.indexOf(msgs.first().content.toUpperCase())] === correct;
			if (!win) return message.channel.send(`A resposta está errada. A resposta certa era: \`${correct}\`.`);
			return message.channel.send('Muito bem! Acertaste!');
		} catch (err) {
			return message.channel.send(`Ocorreu um erro ao executar o comando: \`${err.message}\`. Tenta de novo mais tarde!`);
		}
    }
}