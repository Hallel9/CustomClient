const Command = require("../../Build/Command");
const ms = require("ms");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["ut"],
      description: "This provides the current uptime of the bot",
      category: "Utilities",
    });
  }
  async run(message) {
    const msg = await message.channel.send("Finding bot's uptime...");
    msg.edit(`My uptime is \`${ms(this.client.uptime, { long: true })}\``);
  }
};
