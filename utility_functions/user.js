const { breakInSmallParts, makeColored } = require("./text.js");

// Get user's status (offline, online, dnd, idle)
function getUserStatus(guild, id) {
  let member = guild.members.cache.get(id);
  return member?.presence?.status;
}

// Get user's custom status (activity)
function getUserActivityCustomStatus(guild, id) {
  let member = guild.members.cache.get(id);
  let activity = member.presence?.activities?.at(0);
  
  res = "";
  if (activity && activity.emoji) res += activity.emoji?.name + " ";

  if (activity && activity.state && activity.state.length !== 0) {
    res += (activity.state);
  } else {
    res += "No Custom Status";
  }

  return makeColored(res, "yellow");
}

// Get user's custom status for other stuff
function getUserActivityOthers(guild, id)
{
  let member = guild.members.cache.get(id);
  let activity = member.presence?.activities?.at(0);
  
  res = "";
  if (activity && activity.emoji) 
    res += activity.emoji?.name + " ";
  if (activity?.name)
    res += activity.name + "\n";
  else
    res += "No Custom Status"
  if (activity?.details)
    res += activity.details + "\n";
  if (activity?.state)
    res += activity.state;

  return makeColored(res, "yellow");
}

// Get user status
function getUserActivity(guild, id)
{
  let member = guild.members.cache.get(id);
  let activity = member.presence?.activities?.at(0);

  if (activity?.name === "Custom Status")
    return getUserActivityCustomStatus(guild, id);
  else
    return getUserActivityOthers(guild, id);
}

// Get user avatar link or return default avatar which that user is assigned by discord
function getAvatar(user) {
  if (!user.avatar)
    return `https://cdn.discordapp.com/embed/avatars/${
      user.discriminator % 5
    }.png`;

  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpeg?size=1024`;
}

module.exports = {
  getUserStatus,
  getUserActivity,
  getAvatar,
};
