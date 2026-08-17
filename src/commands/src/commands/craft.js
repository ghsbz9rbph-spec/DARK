const { SlashCommandBuilder } = require("discord.js");
const { load, save, player } = require("../store");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("craft")
    .setDescription("تصنيع أغراض")
    .addStringOption(option =>
      option
        .setName("item")
        .setDescription("اختر الغرض")
        .setRequired(true)
        .addChoices(
          { name: "🔧 Lockpick", value: "lockpick" },
          { name: "📻 راديو", value: "radio" }
        )
    ),

  async execute(interaction) {
    const data = load();
    const item = interaction.options.getString("item");
    const recipe = data.recipes[item];
    const p = player(interaction.user.id);

    for (const [material, amount] of Object.entries(recipe.cost)) {
      if ((p.materials[material] || 0) < amount) {
        return interaction.reply({
          content: `❌ ما عندك مواد كافية لصناعة ${recipe.name}.`,
          ephemeral: true
        });
      }
    }

    for (const [material, amount] of Object.entries(recipe.cost)) {
      p.materials[material] -= amount;
    }

    p.items[item] = (p.items[item] || 0) + recipe.result;

    data.players[interaction.user.id] = p;
    save(data);

    await interaction.reply(
      `🛠️ تم تصنيع **${recipe.name}** بنجاح!\n` +
      `📦 تمت إضافة الغرض إلى حقيبتك.`
    );
  }
};
