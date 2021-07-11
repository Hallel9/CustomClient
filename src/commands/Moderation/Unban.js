const Command = require("../../Build/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      userPerms: ["BAN_MEMBERS"],
      botPerms: ["BAN_MEMBERS"],
      description: "Unbans a user",
      category: "Moderation",
    });
  }

  async run(message, args) {
    const { guild } = message;
    const userId = args[0];

    if (!userId) return message.channel.send("Please specify a valid userID");

    guild.members.unban(userId);
    message.channel.send(`Successfully unbanned the user.`);
  }
};
