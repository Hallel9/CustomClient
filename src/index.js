const Client = require("./Build/Client");
const config = require("../config.json");

const client = new Client(config);
client.start();
client.connect();
