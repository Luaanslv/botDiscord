const { Intents, Client } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./config.json");



client.on("ready", () => {
    console.log(`Bot foi iniciado, com ${client.users.cache.size} usuarios, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`);
    client.user.setActivity(`Eu estou em ${client.guilds.cache.size} servidores`)
});

client.on("guildCreate", guild => {
    console.log(`O bot entrou nos servidaor ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} menbros!`);
    client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`)
});

client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});


client.on("message", async message => {
    if (message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLocaleLowerCase();

    if (comando === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! A latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latência da API é ${Math.round(client.ws.ping)}ms`);
    }
    if (comando == "clear") {
        const clear = parseInt(args[0], 10)
        if (!clear || clear <1 || clear > 100)
            return message.reply("Coloque o numero de até 100 mensagens a serem deletadas na frente do comando");
    
            const fetched = await message.channel.messages.fetch({ limit: clear + 1 });
            message.channel
                .bulkDelete(fetched)
        message.channel.send(`${args[0]} menssagens limpas nesse chat`);   
    }
});



client.login(config.token);