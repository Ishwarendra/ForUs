const {colorLanguage} = require("./../database/colors.js")

// Colors up text (only few color supported check database/colors.js for more info)
function makeColored(s, color = "") {
  if (colorLanguage.has(color))
    return `\`\`\`${colorLanguage.get(color)}${s}\`\`\``;

  return `\`\`\`${s}\`\`\``;
}

// Breaks words into lines.
function breakInSmallParts(text, max_count = 6) {
  text = text.trim();
  words = text.split(/\s+/);

  res = "";
  counter = 0;
  for (let i = 0; i < words.length; i++) {
    word = words[i];
    if (counter < max_count) {
      res += word + " ";
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