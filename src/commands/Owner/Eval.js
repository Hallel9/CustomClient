const Command = require("../../Build/Command");
const Embed = require("../../Build/Embed");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["e"],
      ownerOnly: true,
      description: "Evaluates code",
      category: "Owner",
    });
  }
  async run(message, args) {
    const send = (txt) => message.channel.send(txt).catch(() => {});
    try {
      let Eval;
      if (args.join(" ").includes("await"))
        Eval = await eval("(async () => {" + args.join(" ") + "})()");
      else Eval = await eval(args.join(" "));
      if (args.join(" ").includes("token")) return;
      function str(obj) {
        let a = JSON.stringify(obj);
        a = JSON.stringify(obj, null, 4);
        return a;
      }
      function substr(str) {
        if (str?.length >= 1000) {
          str = str.substring(0, 1000);
          return str + "...";
        } else return str;
      }
      let a;
      if (typeof (await Eval) == "object")
        a = `\`\`\`json\n${str(await Eval)}\`\`\``;
      else a = await Eval;
      if (a?.length >= 1000) substr(a);
      if (!a) a = "Nothing¿";
      const embed = new Embed()
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor("GREEN")
        .addField("To Eval:", "```js\n" + args.join(" ") + "```")
        .addField("Evaluated:", substr(a))
        .addField("Type", (await Eval) ? typeof Eval : "None")
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
      await message.channel.send(embed);
    } catch (err) {
      const embed = new Embed()
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor("RED")
        .setTitle(err.name)
        .setTimestamp()
        .setDescription(err)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
      await message.channel.send(embed);
      console.log(err);
    }
  }
};
