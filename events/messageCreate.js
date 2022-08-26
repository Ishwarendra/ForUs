const prefix = "_";
// const { ownerId } = require("./../config.json")
// const ownerId = process.env['ownerId']

const ttMap = new Map();
ttMap.set("797112895539249163", "https://cdn.discordapp.com/attachments/981855994340597810/1011935829758849094/Screenshot_2022-08-24_at_3.21.29_PM.png");
ttMap.set("760777560463769610", "https://cdn.discordapp.com/attachments/935406786209534063/1012617588397850714/unknown.png");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(msg) {
    if (msg.author.bot || !msg.content.startsWith(prefix)) return;

    var command = msg.content.toLowerCase();
    command = command.substring(1);
    
    if (command === "tt") {
      const userId = msg.author.id;
      if (ttMap.has(userId))
      {
        await msg.reply(ttMap.get(userId));
        return;
      }

      await msg.reply(
        "https://cdn.discordapp.com/attachments/864017045675048990/1011672657420357742/unknown.png"
      );
      await msg.channel.send(
        "https://cdn.discordapp.com/attachments/864017045675048990/1012635462155903047/unknown.png"
      );
    } else if (command === "ping") {
      await msg.channel.send(`😢 Yes vro alive.
        \`Latency:\` ${Date.now() - msg.createdTimestamp} ms.
        \`API Latency:\` ${Math.round(msg.client.ws.ping)} ms.`);
    }
  },
};
