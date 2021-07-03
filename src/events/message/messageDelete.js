const Event = require("../../Build/Event");
const Embed = require("../../Build/Embed");
const Schema = require("../../Models/ModLogSchema");

module.exports = class extends Event {
  async run(message) {
    if (!message.guild || message.author.bot) return;
    const attachments = message.attachments.size
      ? message.attachments.map((attachment) => attachment.proxyURL)
      : null;
    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      const channel = message.guild.channels.cache.get(data.Channel);

      const embed = new Embed()
        .setTitle("Message Deleted")
        .setDescription([
          `**> Message ID:** ${message.id}`,
          `**> Channel:** ${message.channel}`,
          `**> Author:** ${message.author.tag}`,
          `**> Message:** ${message.content}`,
        ])
        .setColor("BLUE")
        .setTimestamp();
      channel.send(embed);
    });
  }
};
