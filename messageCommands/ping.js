const path = require("node:path");
const { dirname } = require("path");
const root = path.dirname(__dirname);

const { randomEmojiList } = require(path.join(root, 'database', 'emojiLinks.js'))

const { getRandomColor, getRandomElementFromArray } = require(path.join(root, "utility_functions","randomSelection.js"));
const { makeColored } = require(path.join(root, 'utility_functions', 'text.js'));

// Return an embed for ping command can be reused (JSON format this time)
function pingEmbed(msg) {

  embedColor = getRandomColor();
  textColor = getRandomElementFromArray(['yellow', 'cyan', 'orange']);
  
  topleft_iconurl = getRandomElementFromArray(randomEmojiList.animated)
  guildIcon = `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png?size=1024`

  const embed = {
    color: embedColor,
    author: {
      name: "Yes vro alive.",
      iconURL: topleft_iconurl
    },
    decription: `Yes vro alive`,
    timestamp: new Date().toISOString(),
    fields: [
        {
            name: 'Latency',
            value: makeColored(`${Date.now() - msg.createdTimestamp} ms.`, textColor),
            inline: true
        },
        {
            name: 'API Latency',
            value: makeColored(`${Math.round(msg.client.ws.ping)} ms.`, textColor),
            inline: true
        }
    ],
    footer: {
        text: msg.guild.name,
        icon_url: guildIcon
    }
  };

  return embed;
}

module.exports = {
    pingEmbed,
}