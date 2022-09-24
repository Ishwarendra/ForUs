const {colorLanguage} = require("./../database/colors.js")

function makeColored(s, color = "") {
  if (colorLanguage.has(color))
    return `\`\`\`${colorLanguage.get(color)}${s}\`\`\``;

  return `\`\`\`${s}\`\`\``;
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

module.exports = {
    makeColored,
    breakInSmallParts,
}