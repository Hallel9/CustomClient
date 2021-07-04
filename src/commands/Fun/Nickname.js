const Command = require("../../Build/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["Nick", "nick"],
      description: "Sets a user's nickname",
      category: "Fun",
      userPerms: ["MANAGE_NICKNAMES"],
      botPerms: ["MANAGE_NICKNAMES"],
    });
  }
  async run(message, args) {
    const member = message.mentions.members.first();

    if (!member) return message.channel.send("Specify a member.");
    const nick = args.slice(1).join(" ");

    if (!nick) return message.channel.send("Specify a nickname.");
    member
      .setNickname(nick)
      .catch((e) =>
        message.channel.send(`Couldn't change this user's nickname.`)
      );
  }
};
