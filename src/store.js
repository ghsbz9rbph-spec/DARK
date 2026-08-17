const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "data", "store.json");

function load() {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}

function player(id) {
  const data = load();

  if (!data.players[id]) {
    data.players[id] = {
      materials: {
        plastic: 0,
        iron: 0,
        stone: 0,
        aluminum: 0
      },
      items: {}
    };

    save(data);
  }

  return data.players[id];
}

module.exports = {
  load,
  save,
  player
};
