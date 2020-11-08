module.exports = {
    name: "lenny",
    aliases: ["Lenny", "LENNY", " lenny", " Lenny", " LENNY"],
    description: "Responde com uma lenny face aleatória ( ͡° ͜ʖ ͡°)",
    clientPermissions: ["SEND_MESSAGES"],
    userPermissions: [],
    run: async (client, message, args) => {
        const messages = ["( ͡° ͜ʖ ͡°)", "¯\_( ͡° ͜ʖ ͡°)_/¯", "( ͠° ͟ʖ ͡°)", "( ͡° ʖ̯ ͡°)", "( ಠ ͜ʖಠ)", "(╯ ͠° ͟ʖ ͡°)╯┻━┻", "(ง ͠° ͟ل͜ ͡°)ง", "( ͡°( ͡° ͜ʖ ͡°( ͡° ͜ʖ ͡°) ͡° ͜ʖ ͡°) ͡°)", "凸 ( ° ͜ʖ ° )凸", "( ͠° ͜ʖ͠° )", "( ͠° ‿‿͠° )", "(︡° ͜ʖ°︠)", " ° ͜ʖ ° ", " ͠° ͜ʖ ͡°", "( ͡° ͜ʖ ͡°)╭∩╮", "(͠≖ ͜ʖ͠≖)", "ᕦ( ͡° ͜ʖ ͡°)ᕤ", "(☞ ͡° ͜ʖ ͡°)☞", "ಥ_ಥ", "( ✧≖ ͜ʖ≖)", "(▀̿Ĺ̯▀̿ ̿)", "( ͡°Ĺ̯ ͡° )", "̿'̿'\̵͇̿̿\з=( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/'̿̿ ̿ ̿ ̿ ̿ ̿", '/╲/\╭( ͡° ͡° ͜ʖ ͡° ͡°)╮/\╱', "(° ͡ ͜ ͡ʖ ͡ °)", "( ͡°╭͜ʖ╮͡° )", "┬┴┬┴┤ ͜ʖ ͡°) ├┬┴┬┴", "(͡ ͡° ͜ つ ͡͡°)", "┬┴┬┴┤(･ω├┬┴┬┴", "( ̿ ̿ ̿ ̿ ̿ ̿ ̿ ̿°̿ ̿ ̿ ̿ ̿ ̿ ̿ ̿ ͜ʖ ̿ ̿ ̿ ̿ ̿ ̿ ̿°̿ ̿ ̿ ̿ ̿ ̿ ̿ )", "(̿ ̿ ̿ ̿ ̿'̿̿ ̿ ̿ ̿ ͜ʖ ̿ ̿ ̿ ̿ ̿ ̿'̿ ̿̿ ̿)"]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        message.channel.send(randomMessage)
    }
}