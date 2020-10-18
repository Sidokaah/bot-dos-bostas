module.exports = {
    name: "no-u",
    aliases: ["No-u", "NO-U", " no-u", " No-u", " NO-U"],
    run: async (client, message, args) => {
        if(!args.join("")) {
            message.channel.send("Não.")
        }
        if(args.join(" ")){
            message.reply("no u.")
        }
    }
}