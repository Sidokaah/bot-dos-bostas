const TicTacToe = require('discord-tictactoe');

module.exports = {
    name: "tic-tac-toe",
    description: "Jogas o jogo do galo contra o Bot ou contra outra pessoa",
    clientPermissions: ["SEND_MESSAGES", "ADD_REACTIONS", "MANAGE_MESSAGES"],
    userPermissions: [],
    run: async (client, message, args) => {
        let prefix = client.db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = client.config.prefix;
        new TicTacToe({
            language: 'pt-br',
            command: `${prefix}tic-tac-toe`,
        }, client);
    }
}