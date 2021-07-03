const Event = require("../../Build/Event");
const Embed = require("../../Build/Embed");
const {
  Util: { escapeMarkdown },
} = require("discord.js");
const { diffWordsWithSpace } = require("diff");
const Schema = require("../../Models/ModLogSchema");

module.exports = class extends Event {
  async run(old, message) {
    if (!message.guild || old.content === message.content || message.author.bot)
      return;

    const embed = new Embed()
      .setColor("BLUE")
      .setAuthor(old.author.tag, this.client.user.displayAvatarURL())
      .setTitle("Message Updated")
      .setDescription([
        `**> Message ID:** ${old.id}`,
        `**> Channel:** ${old.channel}`,
        `**> Author:** ${old.author.tag} (${old.author.id})`,
      ])
      .setURL(old.url)
      .splitFields(
        diffWordsWithSpace(
          escapeMarkdown(old.content),
          escapeMarkdown(message.content)
        )
          .map((res) =>
            res.added
              ? `**${res.value}**`
              : res.removed
              ? `~~${res.value}~~`
              : res.value
          )
          .join(" ")
      );

    Schema.findOne({ Guild: old.guild.id }, async (err, data) => {
      const channel = message.guild.channels.cache.get(data.Channel);

      channel.send(embed);
    });
  }
};
