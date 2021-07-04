const Command = require("../../Build/Command");
const Embed = require("../../Build/Embed");
const { GuildMember } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: "Sends the member's avatar",
      category: "Fun",
      aliases: ["av"],
    });
  }

  async run(message, args) {
    let user =
      message.mentions.users.first() ||
      this.client.users.cache.get(args[0]) ||
      this.client.users.cache.find(
        (e) =>
          e.username.includes(args.join(" ")) || e.tag.includes(args.join(" "))
      ) ||
      (message.guild
        ? this.client.users.cache.find((e) => e.nickname === args.join(" "))
        : undefined) ||
      (args[0]
        ? await this.client.users.fetch(args[0]).catch(() => {})
        : undefined) ||
      message.author;
    if (!user) return; // return something if no user found
    if (user instanceof GuildMember) {
      user = user.user;
    }

    message.channel.send(
      new Embed()
        .setTitle(`${user.tag}'s avatar`)
        .setImage(user.displayAvatarURL({ dynamic: true }))
        .setColor("RANDOM")
        .setTimestamp()
    );
  }
};
