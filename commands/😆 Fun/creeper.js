module.exports = {
    name: "creeper",
    clientPermissions: ["SEND_MESSAGES"],
    description: "Awwwwwwwww Maaaaan!",
    userPermissions: [],
    run: async (client, message, args) => {
        message.channel.send("Awwwww Man!")
    }
}