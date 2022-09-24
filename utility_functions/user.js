const { breakInSmallParts, makeColored } = require("./text.js");

// Get user's status (offline, online, dnd, idle)
function getUserStatus(guild, id) {
  let member = guild.members.cache.get(id);
  return member?.presence?.status;
}

// Get user's custom status (activity)
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

// Get user avatar link or return default avatar which that user is assigned by discord
function getAvatar(user) {
  if (!user.avatar)
    return `https://cdn.discordapp.com/embed/avatars/${
      user.discriminator % 5
    }.png`;

  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpeg`;
}

module.exports = {
  getUserStatus,
  getUserActivity,
  getAvatar,
};
