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

const commandsPath = path.join(__dirname, "commands");

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

client.once("ready", () => {
  console.log(`✅ البوت اشتغل: ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp("❌ حدث خطأ.");
    } else {
      await interaction.reply("❌ حدث خطأ.");
    }
  }
});

client.login(process.env.TOKEN);
