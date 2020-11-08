module.exports = {
    name: "snake-game",
    aliases: ["Snake-game", "SNAKE-GAME", " snake-game", " Snake-game", " SNAKE-GAME"],
    description: "Jogo do Snake dos Nokias antigos",
    clientPermissions: ["SEND_MESSAGES", "MANAGE_MESSAGES", "ADD_REACTIONS"],
    userPermissions: [],
    run: async (client, message, args) => {
        const SnakeGame = require('../../games/snake-game');
        const snakeGame = new SnakeGame(client);
        snakeGame.newGame(message);
    }
}