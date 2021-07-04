const Command = require("../../Build/Command");
const Embed = require("../../Build/Embed");
const fetch = require("node-fetch");

const subreddits = [
  "memes",
  "DeepFriedMemes",
  "boneHurtingJuice",
  "Surrealmemes",
  "dankmemes",
  "meirl",
  "me_irl",
  "funny",
];

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: "Sends memes",
      category: "Fun",
    });
  }
  async run(message) {
    const data = await fetch(
      `https://imgur.com/r/${
        subreddits[Math.floor(Math.random() * subreddits.length)]
      }/hot.json`
    )
      .then((res) => res.json())
      .then((body) => body.data);
    const selected = data[Math.floor(Math.random() * data.length)];
    return message.channel.send(
      new Embed().setImage(
        `https://imgur.com/${selected.hash}${selected.ext.replace(
          /\?.*/,
          "** **"
        )}`
      )
    );
  }
};
