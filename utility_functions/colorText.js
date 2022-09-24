colorLanguage = new Map([
  ["yellow", "fix\n"],
  ["orange", "arm\n"],
  ["cyan", "yaml\n"],
  ["blue", "md\n#"],
  ["red", "diff\n-"],
]);

function makeColored(s, color = "") {
  if (colorLanguage.has(color))
    return `\`\`\`${colorLanguage.get(color)}${s}\`\`\``;

  return `\`\`\`${s}\`\`\``;
}

module.exports = {
    makeColored,
}