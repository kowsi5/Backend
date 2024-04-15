// models/GameData.js
const mongoose = require('mongoose');

const gameDataSchema = new mongoose.Schema({
  player1: String,
  player2: String,
  rounds: Array,
});

const GameData = mongoose.model('GameData', gameDataSchema);

module.exports = GameData;
