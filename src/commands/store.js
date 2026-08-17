const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "data.json");

function load() {
  if (!fs.existsSync(file)) {
    const data = {
      players: {}
    };

    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    return data;
  }

  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function player(userId) {
  const data = load();

  if (!data.players[userId]) {
    data.players[userId] = {
      materials: {
        plastic: 0,
        iron: 0,
        stone: 0,
        aluminum: 0
      }
    };

    save(data);
  }

  return data.players[userId];
}

module.exports = {
  load,
  save,
  player
};
