const {
  Client,
  GatewayIntentBits,
  Collection
} = require("discord.js");

const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

const commandsPath = __dirname;

const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith(".js") && file !== "index.js");

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));

  if (!command.data || !command.execute || !command.data.name) {
    console.log(`⚠️ تم تجاهل الملف: ${file}`);
    continue;
  }

  client.commands.set(command.data.name, command);
}

module.exports = client;
