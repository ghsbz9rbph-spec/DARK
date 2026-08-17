const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { player } = require("../store");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("materials")
    .setDescription("يعرض موادك الخام"),

  async execute(interaction) {
    const p = player(interaction.user.id);

    const embed = new EmbedBuilder()
      .setTitle("📦 موادك الخام")
      .setDescription(
        `🧴 بلاستيك: **${p.materials.plastic}**\n` +
        `⛓️ حديد: **${p.materials.iron}**\n` +
        `🪨 حجر: **${p.materials.stone}**\n` +
        `🔩 ألمنيوم: **${p.materials.aluminum}**`
      );

    await interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
};
