const HantoniiClient = require("./Build/Client");
const config = require("../config.json");

const client = new HantoniiClient(config);
client.start();
client.connect();
