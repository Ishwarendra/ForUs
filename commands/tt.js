const { SlashCommandBuilder } = require("discord.js");
const ttMap = require('./../database/ttData.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timetable")
    .setDescription("Shows TimeTable. (under construction)"),

  async execute(interaction) {

    const userId = interaction.user.id;
    const userToken = "_" + userId + "_";

    if (ttMap[userToken]) {
      try {
      await interaction.reply({content: ttMap[userId], ephemeral: true})
      return;
      } catch (error) {
        await interaction.channel.send({content: `"\`${error}" ::\`  error occured ＞︿＜.`, ephemeral: true})
        return;
      }
    }

    await interaction.reply({content: "https://cdn.discordapp.com/attachments/864017045675048990/1017115482001780766/unknown.png", ephemeral: true})
    await interaction.followUp({content: "https://cdn.discordapp.com/attachments/864017045675048990/1017115529175109682/unknown.png", ephemeral: true});
  },
};
