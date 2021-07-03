const HantoniiClient = require("./Build/Client");
const config = require("../config.jsonc");

const client = new HantoniiClient(config);
client.start();
client.connect();
