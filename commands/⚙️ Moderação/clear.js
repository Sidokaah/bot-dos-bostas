module.exports = {
    name: "clear",
    aliases: ["Clear", "CLEAR", " clear", " Clear", " CLEAR"],
    usage: ["[quantidade]"],
    description: "Apaga o número de mensagens que quiseres",
    clientPermissions: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
    userPermissions: ["MANAGE_MESSAGES"],
    run: async (client, message, args) => {
        const messageArray = message.content.split(' ');
        const args1 = messageArray.slice(1);
        let deleteAmount;
        if (isNaN(args1[0]) || parseInt(args1[0]) <= 0) { return message.reply('Por favor diz-me um número para deletar mensagens!') }
        if (parseInt(args1[0]) > 100) {
            return message.reply('Só consegues deletar 100 mensagens de uma vez!')
        } else {
            deleteAmount = parseInt(args1[0]);
        }
        message.channel.bulkDelete(deleteAmount + 1, true);
        message.reply(`**${deleteAmount} Mensagens Deletadas.**`)
    }
}