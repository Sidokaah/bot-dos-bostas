module.exports = {
    name: "supreme",
    aliases: ["Supreme", "SUPREME", " supreme", " Supreme", " SUPREME"],
    usage: ["[algum texto]"],
    description: "Responde com uma imagem do logo da Supreme com o texto que quiseres",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const text = args.join(" ");
        if (!text) return message.channel.send("<:X:748632517476745226> Por favor especifica algum texto!");
        const image = `https://api.alexflipnote.dev/supreme?text=${encodeURIComponent(text)}`;
        message.channel.send(image)
    }
}