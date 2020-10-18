const TicTacToe = require('discord-tictactoe');
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
    name: "tic-tac-toe",
    aliases: [],
    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = config.prefix;
        if(!message.guild.me.hasPermission("ADD_REACTIONS")) return message.channel.send("<:X:748632517476745226> Não tenho permissões para usar adicionar reações a mensagens!")       
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<:X:748632517476745226> Não tenho permissões para usar editar imagens (`MANAGE_MESSAGES`)!")
        new TicTacToe({
            language: 'pt',
            command: `${prefix}tic-tac-toe`,
        }, client);
    }
}