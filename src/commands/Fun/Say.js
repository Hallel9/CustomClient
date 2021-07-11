const Command = require("../../Build/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: "Says something",
      botPerms: ["SEND_MESSAGES"],
      category: "Fun",
    });
  }
  async run(message, args) {
    let msg = args.join(" ");
    if (!msg)
      return message.channel.send("Please specify a message to repeat.");
    message.delete();
    message.channel.send(msg);
  }
};
