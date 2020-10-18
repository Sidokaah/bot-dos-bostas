module.exports = {
    name: "snake-game",
    aliases: ["Snake-game", "SNAKE-GAME", " snake-game", " Snake-game", " SNAKE-GAME"],
    run: async (client, message, args) => {
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<:X:748632517476745226> Não tenho permissões para usar adicionar reações a mensagens!")       
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<:X:748632517476745226> Não tenho permissões para usar editar imagens (`MANAGE_MESSAGES`)!")
        const SnakeGame = require('../../games/snake-game');
        const snakeGame = new SnakeGame(client);
        snakeGame.newGame(message);
    }
}