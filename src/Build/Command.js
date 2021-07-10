const { Permissions } = require("discord.js");

class Command {
  constructor(client, name, options = {}) {
    this.client = client;
    this.name = options.name || name;
    this.aliases = options.aliases || [];
    this.description = options.description || "No description Specified.";
    this.category = options.category || "General";
    this.usage = `${this.client.prefix}${this.name} ${
      options.usage || ""
    }`.trim();
    this.cooldown = "cooldown" in options ? options.cooldown : 5 || 5;
    this.disabled = options.disabled || false;
    this.userPerms = new Permissions(options.userPerms).freeze();
    this.botPerms = new Permissions(options.botPerms).freeze();
    this.guildOnly = options.guildOnly || false;
    this.ownerOnly = options.ownerOnly || false;
    this.nsfw = options.nsfw || false;
    this.args = options.args || false;
    this.examples = options.examples || [];
  }
  async run(message, args) {
    throw new Error(`Command ${this.name} doesn't have a run method.`);
  }
}

module.exports = Command;
