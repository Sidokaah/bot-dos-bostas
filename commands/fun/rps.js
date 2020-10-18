const db = require("quick.db")
const config = require("../../config.json")

module.exports = {
    name: "rps",
    aliases: ["Rps", "RPS"],
    run: async (client, message, args) => {
        const acceptedReplies = ['pedra', 'papel', 'tesoura'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];
        const choice = args[0];
        let prefix = db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = config.prefix;
        if (!choice) {
            message.react(":X:748632517476745226")
            return message.channel.send(`Como jogar: \`${prefix}rps <pedra|papel|tesoura>\``);
        }
        if (!acceptedReplies.includes(choice)) {
            message.react(":X:748632517476745226")
            return message.channel.send(`Só estas respostas são permitidas: \`${acceptedReplies.join(', ')}\``);
        }
        if (result === choice) return message.reply("**É um empate!** Tivemos a mesma opção.");
        switch (choice) {
            case 'pedra': {
                if (result === 'papel') return message.reply(`**Eu ganhei!** Eu tinha ${result}.`);
                else return message.reply(`**Tu ganhaste!** Eu tinha ${result}.`);
            }
            case 'papel': {
                if (result === 'tesoura') return message.reply(`**Eu ganhei!** Eu tinha ${result}.`);
                else return message.reply(`**Tu ganhaste!** Eu tinha ${result}.`);
            }
            case 'tesoura': {
                if (result === 'pedra') return message.reply(`**Eu ganhei!** Eu tinha ${result}.`);
                else return message.reply(`**Tu ganhaste!** Eu tinha ${result}.`);
            }
            default: {
                return message.channel.send(`Só estas respostas são permitidas: \`${acceptedReplies.join(', ')}\``);
            }
        }
    }
}