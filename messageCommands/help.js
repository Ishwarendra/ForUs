const path = require("node:path");
const { dirname } = require("path");
const root = path.dirname(__dirname);

const { getAvatar } = require("../utility_functions/user.js");
const { randomEmojiList } = require(path.join(root, 'database', 'emojiLinks.js'))
const { getRandomElementFromArray } = require(path.join(root, "utility_functions","randomSelection.js"));
const {allCommands} = require("./../database/commandList.js"); 


// Return an embed for ping command can be reused (JSON format this time)
function helpEmbed(msg) {
  
  embedColor = 0xD22B2B;
  textColor = getRandomElementFromArray(['yellow', 'cyan', 'orange']);
  
  topleft_iconurl = getAvatar(msg.author)
  guildIcon = `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png?size=1024`

  userName = msg.author.username
  discriminator = msg.author.discriminator

  const embed = {
    color: embedColor,
    author: {
      name: `HELP | ${userName + '#' + discriminator}`,
      iconURL: topleft_iconurl
    },
    decription: `Help description`,
    timestamp: new Date().toISOString(),
    fields: allCommands,
    footer: {
        text: "Bot Prefix: _\u0020",
        icon_url: guildIcon
    }
  };

  return embed;
}

module.exports = {
    helpEmbed,
}