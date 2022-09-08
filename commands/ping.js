const {
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Packet Inter Network Groper"),

  async execute(interaction) {
    await interaction.reply({
      content: `😢 Yes vro alive.
        \`Latency:\` ${Date.now() - interaction.createdTimestamp} ms.
        \`API Latency:\` ${Math.round(interaction.client.ws.ping)} ms.`,
    });
  },
};
