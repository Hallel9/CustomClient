const Command = require("../../Build/Command");
const fetch = require("node-fetch");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["djs"],
      description:
        "Displays information about a specific part of the discord.js documentation",
      category: "Information",
      usage: "<searchQuery>",
      botPerms: ["ADD_REACTIONS", "MANAGE_MESSAGES"],
    });
  }
  async run(message, ...query) {
    const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      query
    )}`;

    const docFetch = await fetch(uri);
    const embed = await docFetch.json();

    if (!embed || embed.error) {
      return message.channel.send(
        `*${query}* couldn't be found within the discord.js documentation. (<https://discord.js.org/>).`
      );
    }
    if (!message.guild) {
      return message.channel.send({ embed });
    }

    const msg = await message.channel.send({ embed });
    msg.react("🗑️");

    let react;

    try {
      react = await msg.awaitReactions(
        (reaction, user) =>
          reation.emoji.name === "🗑️" && user.id === message.author.id,
        { max: 1, time: 10000, errors: ["time"] }
      );
    } catch (err) {
      msg.reactions.removeAll();
    }

    if (react && react.first()) {
      message.delete();
    }
    return message;
  }
};
