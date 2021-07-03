const { Collection, Permissions } = require("discord.js");
const Event = require("../../Build/Event");

module.exports = class extends Event {
  constructor(...args) {
    super(...args);

    this.impliedPermissions = new Permissions([
      "VIEW_CHANNEL",
      "SEND_MESSAGES",
      "SEND_TTS_MESSAGES",
      "EMBED_LINKS",
      "ATTACH_FILES",
      "READ_MESSAGE_HISTORY",
      "MENTION_EVERYONE",
      "USE_EXTERNAL_EMOJIS",
      "ADD_REACTIONS",
    ]);

    this.ratelimits = new Collection();
    this.profileData = new Collection();
  }

  async run(message) {
    try {
      const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
      const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);

      if (message.author.bot) return;

      if (message.content.match(mentionRegex))
        message.channel.send(
          `My prefix for ${message.guild.name} is \`${this.client.prefix}\`.`
        );

      const prefix = message.content.match(mentionRegexPrefix)
        ? message.content.match(mentionRegexPrefix)[0]
        : this.client.prefix;

      if (!message.content.startsWith(prefix)) return;

      const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

      const command =
        this.client.commands.get(cmd.toLowerCase()) ||
        this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
      if (command) {
        if (
          command.ownerOnly &&
          !this.client.utils.checkOwner(message.author.id)
        ) {
          return message.reply(
            "Sorry, this command can only be used by the bot owners."
          );
        }

        if (command.guildOnly && !message.guild) {
          return message.reply(
            "Sorry, this command can only be used in a discord server."
          );
        }

        if (command.nsfw && !message.channel.nsfw) {
          return message.reply(
            "Sorry, this command can only be ran in a NSFW marked channel."
          );
        }

        if (command.disabled) {
          return message.reply(
            "Sorry, this command has been disabled by the owner."
          );
        }

        if (command.args && !args.length) {
          return message.reply(
            `Sorry, this command requires arguments to function. Usage: ${
              command.usage
                ? `${this.client.prefix + command.name} ${command.usage}`
                : "This command doesn't have a usage format"
            }`
          );
        }

        if (message.guild) {
          const userPermCheck = command.userPerms
            ? this.client.defaultPerms.add(command.userPerms)
            : this.client.defaultPerms;
          if (userPermCheck) {
            const missing = message.channel
              .permissionsFor(message.member)
              .missing(userPermCheck);
            if (missing.length) {
              return message.reply(
                `You are missing ${this.client.utils.formatArray(
                  missing.map(this.client.utils.formatPerms)
                )} permissions, you need them to use this command!`
              );
            }
          }

          const botPermCheck = command.botPerms
            ? this.client.defaultPerms.add(command.botPerms)
            : this.client.defaultPerms;
          if (botPermCheck) {
            const missing = message.channel
              .permissionsFor(this.client.user)
              .missing(botPermCheck);
            if (missing.length) {
              return message.reply(
                `I am missing ${this.client.utils.formatArray(
                  missing.map(this.client.utils.formatPerms)
                )} permissions, I need them to run this command!`
              );
            }
          }
        }

        command.run(message, args).catch((e) => message.channel.send(e));
      }
      const rateLimit = this.ratelimit(message, cmd);

      let number = Math.floor(Math.random() * 10 + 1);
      if (typeof rateLimit === "string")
        return message.channel
          .send(
            `Please wait **${rateLimit}** before running the **${cmd}** command again - ${
              message.author
            }\n\n${
              number === 1
                ? "*Did You know that Pogy has its own dashboard? `https://pogy.xyz/dashboard`*"
                : ""
            }${
              number === 2
                ? "*You can check our top.gg page at `https://vote.pogy.xyz`*"
                : ""
            }`
          )
          .then((s) => {
            message.delete().catch(() => {});
            s.delete({ timeout: 4000 }).catch(() => {});
          })
          .catch(() => {});
    } catch (e) {
      console.log(e);
    }
  }

  ratelimit(message, cmd) {
    try {
      const command =
        this.client.commands.get(cmd.toLowerCase()) ||
        this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
      if (message.author.permLevel > 4) return false;

      const cooldown = command.cooldown * 1000;
      const ratelimits = this.ratelimits.get(message.author.id) || {}; // get the ENMAP first.
      if (!ratelimits[command.name])
        ratelimits[command.name] = Date.now() - cooldown; // see if the command has been run before if not, add the ratelimit
      const difference = Date.now() - ratelimits[command.name]; // easier to see the difference
      if (difference < cooldown) {
        // check the if the duration the command was run, is more than the cooldown
        return moment
          .duration(cooldown - difference)
          .format("D [days], H [hours], m [minutes], s [seconds]", 1); // returns a string to send to a channel
      } else {
        ratelimits[command.name] = Date.now(); // set the key to now, to mark the start of the cooldown
        this.ratelimits.set(message.author.id, ratelimits); // set it
        return true;
      }
    } catch (e) {
      this.client.emit("fatalError", e, message);
    }
  }
};
