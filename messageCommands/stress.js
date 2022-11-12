const path = require("node:path");
const { dirname } = require("path");
const root = path.dirname(__dirname);

const { getAvatar } = require("../utility_functions/user.js");
const { getRandomElementFromArray, getRandomColor, getRandomEmoji } = require(path.join(root, "utility_functions","randomSelection.js"));
const {stressList} = require("./../database/stressList.js"); 

// Return an embed for ping command can be reused (JSON format this time)
function stressEmbed(msg) {
  
  embedColor = getRandomColor();
  textColor = getRandomElementFromArray(['yellow', 'cyan', 'orange']);
  
  topleft_iconurl = getRandomEmoji()
  guildIcon = `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png?size=1024`

//   userName = msg.author.username
//   discriminator = msg.author.discriminator

  const embed = {
    color: embedColor,
    author: {
      name: `DEADLINES`,
      iconURL: topleft_iconurl
    },
    decription: `Deadlines and Stuff`,
    timestamp: new Date().toISOString(),
    fields: stressList,
    footer: {
        text: "Bot Prefix: _\u0020",
        icon_url: guildIcon
    }
  };

  return embed;
}

module.exports = {
    stressEmbed,
}