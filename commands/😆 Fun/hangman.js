module.exports = {
    name: "hangman",
    aliases: ["Hangman", "HANGMAN", " hangman", " Hangman", " HANGMAN"],
    description: "Podes jogar o jogo da forca",
    clientPermissions: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const HangmanGame = require('../../games/hangman-game');
        const hangman = new HangmanGame(client);
        hangman.newGame(message);
    }
}