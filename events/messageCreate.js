const prefix = "_";
const fs = require("fs");
const path = require("node:path");
const { dirname } = require("path");

function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

function writeInDB(newData, dbPath) {
  fs.writeFile(dbPath, newData, async (err) => {
    if (err) throw err;
  });
}

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(msg) {
    if (msg.author.bot || !msg.content.startsWith(prefix)) return;
    
    var dbPath = path.dirname(__dirname);
    dbPath = path.join(dbPath, "database", "ttData.json");
    var ttData = requireUncached(dbPath);

    // Make lower case and remove extra spaces between messages
    var command = msg.content.toLowerCase();
    command = command.replace(/\s+/g, " ").trim();

    // remove prefix
    command = command.substring(1);
    const userId = msg.author.id;
    const userToken = "_" + userId + "_";

    // Time Table command
    if (command === "tt") {
      // If present in database
      try {
        if (ttData[userToken] === true) {
          await msg.reply(ttData[userId]);
          return;
        }
      } catch (err) {
        await msg.reply({ content: `\`${err}\``, ephemeral: true });
      }
      await msg.reply(
        "https://cdn.discordapp.com/attachments/864017045675048990/1017300465047847015/unknown.png"
      );
      await msg.channel.send(
        "https://cdn.discordapp.com/attachments/864018442516168774/1017301178243104839/unknown.png"
      );
    }

    // ping command
    else if (command === "ping") {
      await msg.channel.send(`😢 Yes vro alive.
        \`Latency:\` ${Date.now() - msg.createdTimestamp} ms.
        \`API Latency:\` ${Math.round(msg.client.ws.ping)} ms.`);
    }

    // Add your own Timetable
    else if (command === "ttadd" || command === "add tt" || command === "tt add") {
      if (msg.attachments.size !== 1) {
        await msg.reply(
          `😶‍🌫️ Hemlo vro nothing added.\nAdd **exactly 1** attachment(image) pls.`
        );
      } else {
        var userData = fs.readFileSync(dbPath, "utf-8");
        var data = JSON.parse(userData);

        try {
          var reply = "";
          // Make appropriate reply and make new Data
          try {
            if (ttData[userToken] === true) {
              reply = `Updated Time Table for ${msg.author.username}`;
            } else {
              data[userToken] = true;
              reply = `Added Custom Time Table ${msg.author.username}`;
            }

            data[userId] = msg.attachments.first()?.url;

            var newData = JSON.stringify(data);
            fs.writeFile(dbPath, newData, async (err) => {
              if (err) throw err;
            });
          } catch (error) {
            reply = `Somry ${msg.author.username} vro, data **not** added ╯︿╰.\n${error} :: Contact Ishwar#7126. ||(on discord only!)||`;
          }

          await msg.reply(reply);
          ttData = requireUncached(dbPath);
        } catch (error) {
          await msg.channel.send({
            content: `\`"${error}" ::\`  error occured ＞︿＜.`,
            ephemeral: true,
          });
        }
      }
    }

    // reset command
    else if (
      command === "resettt" ||
      command === "reset tt" ||
      command === "resettimetable") {

      var userData = fs.readFileSync(dbPath, "utf-8");
      var data = JSON.parse(userData);
      
      data[userToken] = false;
      var newData = JSON.stringify(data);
      writeInDB(newData, dbPath);

      await msg.reply("Time Table **reset** to default!");
      ttData = requireUncached(dbPath);
    }
  },
};
