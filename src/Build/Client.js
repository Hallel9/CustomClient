const { supportsColor } = require("chalk");
const { Client, Collection, Permissions } = require("discord.js");
const Util = require("./Util");
const mongoose = require("mongoose");

module.exports = class HantoniClient extends Client {
  constructor(options = {}) {
    super({
      disableMentions: "everyone",
    });
    this.validate(options);
    this.commands = new Collection();
    this.events = new Collection();
    this.aliases = new Collection();
    this.utils = new Util(this);
    this.owners = options.owners;
  }
  validate(options) {
    if (typeof options !== "object")
      throw new TypeError("Options should be a type of Object");
    if (!options.token)
      throw new TypeError(
        "You must pass your token as an option for the client."
      );
    this.token = options.token;
    if (!options.prefix)
      throw new TypeError("You must pass a prefix as an option for the client");
    if (typeof options.prefix !== "string")
      throw new TypeError("Prefix must be a type of String");
    this.prefix = options.prefix;

    if (!options.defaultPerms)
      throw new TypeError("You must pass default perm(s) for the client.");
    this.defaultPerms = new Permissions(options.defaultPerms).freeze();

    if (!options.mongo)
      throw new TypeError(
        "You must pass your mongodb connection string for the client."
      );
    this.mongo = options.mongo;
  }
  async start(token = this.token) {
    this.utils.loadCommands();
    this.utils.loadEvents();

    await super.login(token);
  }
  async connect(str = this.mongo) {
    mongoose
      .connect(str, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => console.log("Connected to mongo!"))
      .catch((e) => console.log(`Error connecting to mongodb: ${e.message}`));
  }
};
