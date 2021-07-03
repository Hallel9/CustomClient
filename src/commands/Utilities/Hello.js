const Command = require("../../Build/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["hey"],
      cooldown: 20,
			category: 'Utilities'
    });
  }
  async run(message, args) {
    message.channel.send(
      `Message from ${this.client.user.username}: **Hello!**`
    );
  }
};
