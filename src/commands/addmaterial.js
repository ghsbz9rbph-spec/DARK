const {
  SlashCommandBuilder,
  PermissionFlagsBits
} = require("discord.js");

const { load, save, player } = require("../store");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addmaterial")
    .setDescription("إضافة مواد للاعب")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)

    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("اختر اللاعب")
        .setRequired(true)
    )

    .addStringOption(option =>
      option
        .setName("material")
        .setDescription("اختر المادة")
        .setRequired(true)
        .addChoices(
          { name: "🧴 بلاستيك", value: "plastic" },
          { name: "⛓️ حديد", value: "iron" },
          { name: "🪨 حجر", value: "stone" },
          { name: "🔩 ألمنيوم", value: "aluminum" }
        )
    )

    .addIntegerOption(option =>
      option
        .setName("amount")
        .setDescription("الكمية")
        .setMinValue(1)
        .setRequired(true)
    ),

  async execute(interaction) {
    const data = load();

    const user = interaction.options.getUser("user");
    const material = interaction.options.getString("material");
    const amount = interaction.options.getInteger("amount");

    const p = player(user.id);

    p.materials[material] += amount;

    data.players[user.id] = p;
    save(data);

    await interaction.reply(
      `✅ تمت إضافة **${amount}** من **${material}** إلى ${user}.`
    );
  }
};
