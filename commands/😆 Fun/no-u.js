module.exports = {
    name: "no-u",
    aliases: ["No-u", "NO-U", " no-u", " No-u", " NO-U"],
    description: "no u",
    usage: ["[alguma coisa]"],
    clientPermissions: ["SEND_MESSAGES"],
    userPermissions: [],
    run: async (client, message, args) => {
        if(!args.join(" ")) {
            message.channel.send("Não.")
        }
        if(args.join(" ")){
            message.reply("no u.")
        }
    }
}