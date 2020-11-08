const fetch = require("node-fetch")

module.exports = {
    name: "trumptweet",
    aliases: ["Trumptweet", "TRUMPTWEET", " trumpwtweet", " Trumptweet", " TRUMPTWEET"],
    usage: ["[algum texto]"],
    description: "Responde com uma imagem de um tweet do Trump com o texto que quiseres",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const text = args.join(" ");
        if (!text) return message.channel.send("<:X:748632517476745226> Por favor especifica algum texto!");
        const sendMsg = await message.channel.send("⚙ A processar imagem...");
        const data = await fetch(
            `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`
        )
        .then((res) => res.json())
        .catch(() => {
            message.channel.send("Houve algum erro! Tenta de novo mais tarde!");
        });
        sendMsg.delete();
        message.channel.send(data.message);
    }
}