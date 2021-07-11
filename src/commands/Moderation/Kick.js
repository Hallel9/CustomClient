const Command = require("../../Build/Command");
const Embed = require("../../Build/Embed");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      userPerms: ["KICK_MEMBERS"],
      botPerms: ["KICK_MEMBERS"],
      description: "Kick a user from the server",
      category: "Moderation",
    });
  }

  async run(message, args) {
    let member = message.mentions.members.first();
    if (!member) return message.channel.send("Specify a user");
    let reason = args.slice(1).join(" ") || "No reason specified.";
    member
      .send(
        new Embed()
          .setTitle("You have been kicked.")
          .addField("Reason", reason)
          .setColor("RANDOM")
          .setTimestamp()
      )
      .catch((e) => message.channel.send("Unable to dm this user."));
    await member.kick({ reason: reason });
    message.channel.send(
      new Embed()
        .setTitle(`Member kicked`)
        .addField("User", member)
        .addField("Moderator", message.author)
        .addField("Reason", reason)
    );
  }
};
