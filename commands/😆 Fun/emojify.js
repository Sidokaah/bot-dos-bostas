module.exports = {
    name: "emojify",
    aliases: ["Emojify", "EMOJIFY", " emojify", " Emojify", " EMOJIFY"],
    usage: ["[alguma coisa]"],
    description: "Passa texto para emojis.",
    clientPermissions: ["SEND_MESSAGES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const numberMap = {'0': ':zero:', '1': ':one:', '2': ':two:', '3': ':three:', '4': ':four:', '5': ':five:', '6': ':six:', '7': ':seven:', '8': ':eight:', '9': ':nine:',};
        if (!args[0]) return message.channel.send('<:X:748632517476745226> Por favor especifica uma mensagem para tornar em emoji!');
        let msg = message.content.slice(message.content.indexOf(args[0]), message.content.length);
        msg = msg.split('').map(c => {
            if (c === ' ') return c;
            else if (/[0-9]/.test(c)) return numberMap[c];
            else return (/[a-zA-Z]/.test(c)) ? ':regional_indicator_' + c.toLowerCase() + ':' : '';
        }).join('');
        if (msg.length > 2048) {
            msg = msg.slice(0, msg.length - (msg.length - 2033)); 
            msg = msg.slice(0, msg.lastIndexOf(':')) + '**...**';
        }
        message.channel.send(msg);
    }
}