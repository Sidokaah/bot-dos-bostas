module.exports = {
    name: "close",
    aliases: [],
    run: async (client, message, args) => {
        if (!message.channel.name.includes("ticket-")) return message.channel.send("<:X:748632517476745226> Não podes usar isso aqui!");
        let channel = message.channel
        channel.messages.fetch({limit:80})
        .then(function(messages) {
            let content = messages.map(message => message.content && message.content).join("\n");
            message.channel.send(`Mandei para aqui um ficheiro com tudo o que estava no channel. A apagar o channel em 25 segundos!`)
            message.channel.send({ files: [{ name: "test.txt", attachment: Buffer.from(content) }] });  
        })
        setTimeout(function() {
            message.channel.delete();
        }, 25000);
    }
}