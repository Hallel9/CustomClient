const Event = require("../../Build/Event");
const Embed = require("../../Build/Embed");
const Schema = require("../../Models/ModLogSchema");

module.exports = class extends Event {
  async run(message) {
    if (message.content.toLowerCase().includes("say")) return;
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

    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (!data) return;
      const member = message.mentions.members.first();
      if (member) {
        if (member.id === message.author.id) return;
        if (message.author.bot) return;
        message.channel.send(
          new Embed()
            .setTitle("Ghost Ping Detected")
            .addField("Author", message.author.tag, true)
            .addField("Content", message.content, true)
            .setColor("RANDOM")
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        );
      }
    });
  }
};
