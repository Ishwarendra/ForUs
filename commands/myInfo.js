const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const moment = require("moment");
const { statusColor } = require("./../database/colors.js");

const { get12HourFormat } = require("./../utility_functions/time.js");
const { makeColored } = require("./../utility_functions/text.js");
const { getAvatar, getUserActivity, getUserStatus } = require("./../utility_functions/user.js")
const { daysPassedSince } = require("./../utility_functions/date.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("myinfo")
    .setDescription("Sends an Embed with your info"),

  async execute(interaction) {
    guild = interaction.guild;

    // User Info
    username = interaction.user.username;
    userid = interaction.user.id;
    discriminator = interaction.user.discriminator;
    userColor = interaction.member.displayHexColor;
    avatarUrl = getAvatar(interaction.user);
    nickname = interaction.member.nickname;

    // Role info
    roles = interaction.member._roles;

    // Time stamp info (Joining a server and creating account)
    joinedTimestamp = interaction.member.joinedTimestamp;
    const joinDate = new Date(joinedTimestamp);
    const createDate = new Date(
      moment.utc(guild.members.cache.get(userid).user.createdAt).local()
    );

    const diffJoinDays = daysPassedSince(joinDate);
    const diffCreateDays = daysPassedSince(createDate);

    date = joinDate.toDateString();
    time = get12HourFormat(joinDate);
    cDate = createDate.toDateString();
    cTime = get12HourFormat(createDate);

    // Server info
    var serverInfo = interaction.member.guild;
    serverName = serverInfo.name;
    serverUrl = serverInfo.iconURL();

    // Status
    userStatus = getUserStatus(guild, userid);
    userActivity = getUserActivity(guild, userid);

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
          value: `${makeColored(nickname, "cyan")}`,
          inline: true,
        },
        {
          name: "Total Roles",
          value: `${makeColored(roles.length, "blue")}`,
          inline: true,
        }
      )
      .addFields({ name: `User Status`, value: `${userActivity}` })
      .addFields(
        {
          name: `Joined "${serverName}" on`,
          value: `${makeColored(
            time + "  " + date + "\n" + diffJoinDays + " days ago."
          )}`,
        },
        {
          name: `Account Created on`,
          value: makeColored(`${cTime}  ${cDate}\n${diffCreateDays} days ago.`),
        }
      )
      .setFooter({
        text: `${statusColor.get(userStatus)}`,
        iconURL: serverUrl,
      });

    await interaction.reply({ embeds: [userInfoEmbed] });
  },
};
