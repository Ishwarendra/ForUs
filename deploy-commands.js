const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const fs = require("node:fs");
const path = require("node:path");
const { clientId, guildIds, token } = require("./config.json");

/*// On replit
const token = process.env['token']
const clientId = process.env['clientId']
var guildIds = process.env['guildIds']
*/

var commands = [];
const commandsPath = path.join(__dirname, "commands"); 
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

for (const guildId of guildIds) {
  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
}
