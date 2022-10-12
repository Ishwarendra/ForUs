const allCommands = [
  // {
  //   name: "aaa",
  //   value: "a",
  //   inline: false,
  // },

  {
    name: "\nhelp",
    value: "📝 `Shows Command List and it's use.`",
    inline: false,
  },
  {
    name: "ping/pong",
    value:
      "🏓  `Shows API Latency and Latency. (Can be used to check if bot is faking it's online status or not).`",
  },
  {
    name: "tt",
    value: "📃  `Shows default TimeTable (or the one you have set using ttadd).`",
    inline: false,
  },
  {
    name: "ttadd/addtt (only through message)",
    value:
      "<:forus_plus:1029695897803702333>  `Adds Timetable for you if not present, otherwise updates the Timetable.`",
    inline: false,
  },
  {
    name: "resettt/resettimetable/ttreset (only through message)",
    value:
      "<:forus_minus:1029697117234671636>  `Deletes the custom timetable and resets it to default.`",
    inline: false,
  },
  {
    name: "myinfo (only through interaction)",
    value: "<:moj2:871088855414104124>  `Shows your discord profile.`",
    inline: false,
  },

  // {
  //   name: "\u200b",
  //   value: "\u200b",
  //   inline: true,
  // },
];

module.exports = { allCommands };
