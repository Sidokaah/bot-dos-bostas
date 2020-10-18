module.exports = {
    name: "supreme",
    aliases: ["Supreme", "SUPREME", " supreme", " Supreme", " SUPREME"],
    run: async (client, message, args) => {
        const text = args.join(" ");
        if (!text) return message.channel.send("<:X:748632517476745226> Por favor especifica algum texto!");
        const image = `https://api.alexflipnote.dev/supreme?text=${encodeURIComponent(text)}`;
        message.channel.send(image)
    }
}