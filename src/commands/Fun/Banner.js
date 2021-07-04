const Command = require("../../Build/Command");
const figlet = require("util").promisify(require("figlet"));

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: "Sends text in banner form",
      category: "Fun",
    });
  }
  async run(message, ...banner) {
    return message.channel.send(await figlet(banner), { code: true });
  }
};
