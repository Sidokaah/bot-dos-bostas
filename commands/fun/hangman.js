module.exports = {
    name: "hangman",
    aliases: ["Hangman", "HANGMAN", " hangman", " Hangman", " HANGMAN"],
    run: async (client, message, args) => {
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<:X:748632517476745226> Não tenho permissões para usar esse comando!")
        const HangmanGame = require('../../games/hangman-game');
        const hangman = new HangmanGame(client);
        hangman.newGame(message);
    }
}