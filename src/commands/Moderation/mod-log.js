const Command = require("../../Build/Command");
const Schema = require("../../Models/ModLogSchema");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      userPerms: ["MANAGE_GUILD"],
    });
  }
  async run(message) {
    const channel = message.mentions.channels.first();

    if (!channel) return message.channel.send("Please specify a channel");

    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (data) {
        data = data.Channel;
        data.save();
      } else {
        new Schema({
          Guild: message.guild.id,
          Channel: channel.id,
        }).save();
      }
      message.channel.send(`Channel has been set to ${channel}`);
    });
  }
};
