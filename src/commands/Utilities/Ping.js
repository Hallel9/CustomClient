const Command = require("../../Build/Command");
const Embed = require("../../Build/Embed");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      category: "Utilities",
    });
  }
  async run(message, args) {
    const msg = await message.channel.send("🏓 Pinging...");
    const embed = new Embed()
      .setTitle("🏓 Pong!")
      .addField("Bot Ping", this.client.ws.ping)
      .addField("Message Edit", msg.createdAt - message.createdAt)
      .setColor("RANDOM");
    msg.delete();
    await message.channel.send(embed);
  }
};
