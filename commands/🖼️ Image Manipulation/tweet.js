const fetch = require("node-fetch")

module.exports = {
    name: "tweet",
    aliases: ["Tweet", "TWEET", " tweet", " Tweet", " TWEET"],
    usage: ["[algum texto]"],
    description: "Responde com uma imagem de um tweet com o texto que quiseres",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const text = args.join(" ");
        const { username } = message.author;
        if (!text) return message.channel.send("<:X:748632517476745226> Por favor especifica algum texto!");
        const sendMsg = await message.channel.send("⚙ A processar imagem...");
        const data = await fetch(
            `https://nekobot.xyz/api/imagegen?type=tweet&text=${text}&username=${username}`
        )
        .then((res) => res.json())
        .catch(() => {
            message.channel.send("Houve algum erro! Tenta de novo mais tarde!");
        });
        sendMsg.delete();
        message.channel.send(data.message);
    }
}