module.exports = {
    name: "randomfacts",
    aliases: ["Randomfacts", "RandomFacts", "RANDOMFACTS", " randomfacts", " Randomfacts", " RandomFacts", " RANDOMFACTS"],
    run: async (client, message, args) => {
        const messages = [
            "A Mona Lisa não tem sobrancelhas.", "Os bebés bocejam antes de nascerem.", "Mais de 480 milhões de pessoas já jogaram Monopólio.", "Foi Leonardo da Vinci que inventou a tesoura.", "Hipopotomonstrosesquipedaliofobia é o medo de palavras longas.", "O coração tem o tamanho aproximado da mão fechada.",
            "A Nutella foi reinventada durante a Segunda Guerra Mundial, quando um italiano adicionou avelãs ao chocolate para estender a validade do produto e diminuir o preço dessa delícia. O mundo inteiro agradece.", "Se um gato preto passar à tua frente, quer dizer que ele quer ir a um lado seu burro", "Um leão só consegue rugir a partir dos 2 anos de idade.", "Os ursos polares são canhotos.", "Um bocejo dura em media 6 segundos.", "A maior cebola do mundo pesava tanto quanto uma cabeça humana.",
            "Há um milhão de biliões de formigas na Terra.", "Fortnite é uma merda.", "O Ivo não sabe jogar CS.", "TF2 é o melhor jogo de sempre.", "Os creepers têm medo de gatos.","Se olhares para um enderman com uma abóbora na cabeça, eles fogem.",
            "Skins=Skill in CS:GO.", "Se estiveres dentro de uma planta com dois blocos de altura, Mobs não te vêm.", "O TF2 passa-se pelos anos 60 e 70.", "O TF2 já teve 693 updates desde que foi lançado.", "O TF2 não tem um major update há 1 009 dias (21/7/2020).", "O primeiro IPhone não foi feito pela Apple.",
            `A palavra "mate" foi banida na Austrália durante um dia XDD.`, "A Arábia Saudita importa camelos da Austrália.", "Vacas matam mais Americanos do que tubarões.", "No total, existem 208 armas no TF2 (sem contar com skins e itens de outras qualidades).", "Neste momento (19:00, 24/7/2020), o Pewdiepie tem 26.198.340.914 visualizações em total no seu canal. Mas na altura que estás a ver isto já deve ter muito mais.",]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        message.channel.send(randomMessage)
    }
}