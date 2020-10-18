module.exports = {
    name: "clear",
    aliases: ["Clear", "CLEAR", " clear", " Clear", " CLEAR"],
    run: async (client, message, args) => {
        const messageArray = message.content.split(' ');
        const args1 = messageArray.slice(1);
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`<:X:748632517476745226> Falta-me permissão para apagar mensagens!`)
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send('Sem perms!');
        let deleteAmount;
        if (isNaN(args1[0]) || parseInt(args1[0]) <= 0) { return message.reply('Por favor diz-me um número!') }
        if (parseInt(args1[0]) > 100) {
            return message.reply('Só consegues deletar 100 mensagens de uma vez!')
        } else {
            deleteAmount = parseInt(args1[0]);
        }
        message.channel.bulkDelete(deleteAmount + 1, true);
        message.reply(`**${deleteAmount} Mensagens Deletadas.**`)
    }
}