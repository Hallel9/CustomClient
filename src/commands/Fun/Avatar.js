const Command = require("../../Build/Command");
const Embed = require("../../Build/Embed");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: "Sends the member's avatar",
      category: "Fun",
      aliases: ["av"],
    });
  }

  async run(message) {
    const member = message.mentions.members.first() || message.member;

    message.channel.send(
      new Embed()
        .setTitle(`${member.user.tag}'s avatar`)
        .setImage(member.user.displayAvatarURL({ dynamic: true }))
        .setColor("RANDOM")
        .setTimestamp()
    );
  }
};
