const Command = require("../../Build/Command");

const answers = [
  "Maybe.",
  "Certainly not.",
  "I hope so.",
  "Not in your wildest dreams.",
  "There is a good chance.",
  "Quite likely.",
  "I think so.",
  "I hope not.",
  "I hope so.",
  "Never!",
  "Fuhgeddaboudit.",
  "Ahaha! Really?!?",
  "Pfft.",
  "Sorry, bucko.",
  "Hell, yes.",
  "Hell to the no.",
  "The future is bleak.",
  "The future is uncertain.",
  "I would rather not say.",
  "Who cares?",
  "Possibly.",
  "Never, ever, ever.",
  "There is a small chance.",
  "Yes!",
];

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      cooldown: 5000,
    });
  }
  async run(message, ...question) {
    return message.channel.send(
      question.join(" ").endsWith("?")
        ? `🎱 ${answers[Math.floor(Math.random() * answers.length)]}`
        : "🎱 That doesn't seem to be a question, please try again."
    );
  }
};
