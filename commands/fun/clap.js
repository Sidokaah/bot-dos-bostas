module.exports = {
    name: "clap",
    aliases: ["Clap", "CLAP"],
    run: async (client, message, args) => {
        let text = args.join(" ")
        if(!text) {
            message.channel.send("👏 Especifica 👏 texto 👏 para 👏 passar 👏 para 👏 este 👏 formato 👏")
        } else {
         	return message.channel.send(text.replace(/ /g, ' 👏 '));  
        }
    }
}