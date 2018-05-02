
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const BossSchema = Schema({
  username:  String,
  password:  String,
});

const Boss = mongoose.model("Boss", BossSchema);


module.exports = Boss;