const Command = require("../../Build/Command");
const Embed = require("../../Build/Embed");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      userPerms: ["BAN_MEMBERS"],
      botPerms: ["BAN_MEMBERS"],
      category: "Moderation",
      description: "Bans a user",
    });
  }

  async run(message, args) {
    let member = message.mentions.members.first();
    if (!member) return message.channel.send("Specify a user");
    let reason = args.slice(1).join(" ") || "No reason specified.";
    member
      .send(
        new Embed()
          .setTitle("You have been Banned.")
          .addField("Reason", reason)
          .setColor("RANDOM")
          .setTimestamp()
      )
      .catch((e) => message.channel.send("Unable to dm this user."));
    await member.ban({ reason: reason });
    message.channel.send(
      new Embed()
        .setTitle(`Member Banned`)
        .addField("User", member)
        .addField("Moderator", message.author)
        .addField("Reason", reason)
    );
  }
};
