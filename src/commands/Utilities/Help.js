const Command = require("../../Build/Command");
const Embed = require("../../Build/Embed");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["cmds", "commands"],
      description: "Displays all the commands in the bot",
      category: "Utilities",
      usage: "[command]",
    });
  }
  async run(message, [command]) {
    const embed = new Embed()
      .setColor("BLUE")
      .setAuthor(
        `${message.guild.name} Help Menu`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();

    if (command) {
      const cmd =
        this.client.commands.get(command) ||
        this.client.commands.get(this.client.aliases.get(command));

      if (!cmd)
        return message.channel.send(`Invalid Command named. \`${command}\``);

      embed.setAuthor(
        `${this.client.utils.capitalize(cmd.name)} Command Help`,
        this.client.user.displayAvatarURL()
      );
      embed.setDescription([
        `**❯ Aliases:** ${
          cmd.aliases.length
            ? cmd.aliases.map((alias) => `\`${alias}\``).join(" ")
            : "No Aliases"
        }`,
        `**> Description:** ${cmd.description}`,
        `**> Category:** ${cmd.category}`,
        `**> Usage:** ${cmd.usage}`,
				`**>  Examples:** ${cmd.examples.length ? cmd.examples.map((ex) => `\`${ex}\``).join(", ") : "No Examples"}`
      ]);
      return message.channel.send(embed);
    } else {
      embed.setDescription([
        `These are the available commands for ${message.guild.name}`,
        `The bot's prefix is: ${this.client.prefix}`,
        `Command parameters: \`<>\` is strict & \`[]\` is optional`,
      ]);
      let categories;
      if (!this.client.owners.includes(message.author.id)) {
        categories = this.client.utils.removeDuplicates(
          this.client.commands
            .filter((cmd) => cmd.category !== "Owner")
            .map((cmd) => cmd.category)
        );
      } else {
        categories = this.client.utils.removeDuplicates(
          this.client.commands.map((cmd) => cmd.category)
        );
      }

      for (const category of categories) {
        embed.addField(
          `**${this.client.utils.capitalize(category)}**`,
          this.client.commands
            .filter((cmd) => cmd.category === category)
            .map((cmd) => `\`${cmd.name}\``)
            .join(" ")
        );
      }
      return message.channel.send(embed);
    }
  }
};
