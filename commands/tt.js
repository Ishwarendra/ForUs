const { SlashCommandBuilder  } = require("discord.js");

const ttMap = new Map();
ttMap.set("797112895539249163", "https://cdn.discordapp.com/attachments/981855994340597810/1011935829758849094/Screenshot_2022-08-24_at_3.21.29_PM.png");
ttMap.set("760777560463769610", "https://cdn.discordapp.com/attachments/935406786209534063/1012617588397850714/unknown.png");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timetable")
    .setDescription("TimeTable (only visible to you)!"),

  async execute(interaction) {

    const userId = interaction.user.id;
    console.log(interaction.nickname, ttMap.has(userId))
    if (ttMap.has(userId))
    {
      await interaction.reply(ttMap.get(userId))
      return;
    }

    await interaction.reply("https://cdn.discordapp.com/attachments/864017045675048990/1011672657420357742/unknown.png")
    await interaction.channel.send("https://cdn.discordapp.com/attachments/864017045675048990/1012635462155903047/unknown.png");
  },
};
