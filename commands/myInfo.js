const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const moment = require("moment");

const e = require("express");
const { get12HourFormat } = require("./../utility_functions/time.js");
const { makeColored } = require("./../utility_functions/text.js");

statusColor = new Map([
  ["offline", " ⚪ "],
  ["dnd", " ⛔ "],
  ["online", " 🟢 "],
  ["idle", " 🌙 "],
]);

function getAvatar(user) {
  if (!user.avatar)
    return `https://cdn.discordapp.com/embed/avatars/${
      user.discriminator % 5
    }.png`;

  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpeg`;
}

function getUserStatus(guild, id) {
  let member = guild.members.cache.get(id);
  return member?.presence?.status;
}

function breakInSmallParts(text, max_count = 6) {
  text = text.trim();
  words = text.split("/s+/");

  res = "";
  counter = 0;
  for (let i = 0; i < words.length; i++) {
    word = words[i];
    if (counter < max_count) {
      res += word;
      counter++;
    } else {
      res += "\n" + word;
      counter = 1;
    }
  }

  return res;
}

function getUserActivity(guild, id) {
  let member = guild.members.cache.get(id);
  let activity = member.presence?.activities?.at(0);

  res = "";
  if (activity.emoji.name) res += activity.emoji.name + " ";

  if (activity.state.length !== 0) {
    res += breakInSmallParts(activity.state);
  } else {
    res += "No Custom Status";
  }

  return makeColored(res, "yellow");
}

function daysPassedSince(joinDate) {
  const todayDate = new Date();
  const diffTime = Math.abs(todayDate - joinDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

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
