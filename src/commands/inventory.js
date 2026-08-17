const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { player } = require("../store");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("يعرض أغراضك"),

  async execute(interaction) {
    const p = player(interaction.user.id);

    const items = Object.entries(p.items)
      .filter(([, amount]) => amount > 0)
      .map(([item, amount]) => `📦 ${item}: **${amount}**`)
      .join("\n");

    const embed = new EmbedBuilder()
      .setTitle("🎒 حقيبتك")
      .setDescription(items || "حقيبتك فارغة.");

    await interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
};
