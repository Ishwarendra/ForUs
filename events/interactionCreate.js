module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction)
    {
        if (!interaction || !interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        // Test
        try {
          await command.execute(interaction);
        } catch (error) {
          console.log(error);
          await interaction.reply({
            content: `"error occured ＞︿＜.\n\`:: ${error}" ::\``,
            ephemeral: true,
          });
        }
    },
}