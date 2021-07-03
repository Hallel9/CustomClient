const Event = require("../Build/Event");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: true,
    });
  }
  run() {
    console.log(
      [
        `Logged in as ${this.client.user.tag}`,
        `Loaded ${this.client.commands.size} commands!`,
        `Loaded ${this.client.events.size} events!`,
        console.log(
          this.client.guilds.cache.forEach((a) => console.log(a.name))
        ),
      ].join("\n")
    );

    const activities = [
      `${this.client.guilds.cache.size} servers`,
      `${this.client.channels.cache.size} channels`,
      `${this.client.guilds.cache.reduce(
        (a, b) => a + b.memberCount,
        0
      )} users!`,
      `Command ${this.client.prefix}help`,
      "Fatal Fury 2",
      `On Maintence`,
    ];
    let i = 0;
    setInterval(() => {
      this.client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING",
      });
    }, 15000);
  }
};
