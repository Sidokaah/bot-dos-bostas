const fetch = require("node-fetch")

module.exports = {
    name: "changemymind",
    aliases: ["Changemymind", "CHANGEMYMIND", " changemymind", " Changemymind", " CHANGEMYMIND"],
    usage: ["[algum texto]"],
    description: "Responde com o texto que quiseres no meme `Change my Mind`",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const text = args.join(" ");
        if (!text) return message.channel.send("<:X:748632517476745226> Por favor especifica algum texto!");
        const sendMsg = await message.channel.send("⚙ A processar imagem...");
        const data = await fetch(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`).then((res) =>
            res.json()
        );
        sendMsg.delete();
        message.channel.send(data.message);
    }
}