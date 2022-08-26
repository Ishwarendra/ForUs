const { Client, Collection, GatewayIntentBits } = require("discord.js");
const keepAlive = require("./server.js");
const path = require("node:path");
const fs = require("node:fs");

const { token } = require("./config.json");
// On Repl it
// const token = process.env['token']

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Map();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js")); 

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

// Events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const eventPath = path.join(eventsPath, file);
  const event = require(eventPath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.on('ready', () => {
  console.log(client.user)
})

client.login(token);
keepAlive() // on REPLit