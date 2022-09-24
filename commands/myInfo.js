const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const {get12HourFormat} = require("./../utility_functions/time.js");
const {makeColored} = require("./../utility_functions/colorText.js");

statusColor = new Map([
  ["offline", '⚪'],
  ["dnd", "⛔"],
  ["online", "🟢"],
  ["idle", "🍌"]
])

function userStatus(user)
{
  var a = user.presence.status;
  console.log(a);
  return "1";
}

function getAvatar(user)
{
  if (!user.avatar)
    return `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png`
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpeg`;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("myinfo")
    .setDescription("Sends an Embed with your info"),

  async execute(interaction) {
    // User Info
    username = interaction.user.username;
    discriminator = interaction.user.discriminator;
    userColor = interaction.member.displayHexColor;
    avatarUrl = getAvatar(interaction.user);
    nickname = interaction.member.nickname;

    // Role info
    roles = interaction.member._roles;

    // Time stamp info
    joinedTimestamp = interaction.member.joinedTimestamp;
    const d = new Date(joinedTimestamp);
    date = d.toDateString();
    time = get12HourFormat(d);

    // Server info
    var serverInfo = interaction.member.guild;
    serverName = serverInfo.name;
    serverUrl = serverInfo.iconURL();
    
    // Status
    // console.log(interaction.member.guild.presences)

    const userInfoEmbed = new EmbedBuilder()
      .setColor(userColor)
      .setAuthor({
        name: `About ${username}#${discriminator}`,
        iconURL: avatarUrl,
      })
      .setTimestamp()
      .setThumbnail(avatarUrl)
      .addFields(
        {
          name: "Nickname",
          value: `${makeColored(nickname, 'cyan')}`,
          inline: true,
        },
        { name: "Total Roles", value: `${makeColored(roles.length, 'blue')}`, inline: true }
      )
      .addFields({
        name: `Joined "${serverName}" on`,
        value: `${makeColored(time + "\n" + date)}`,
      })
      .setFooter({text: `${statusColor.get('online')}`, iconURL: serverUrl})

    await interaction.reply({ embeds: [userInfoEmbed] });
  },
};
