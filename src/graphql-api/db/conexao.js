var mongoose = require("mongoose");
const config = require("../config");

function iniciar() {
  const url = config.get("mongoUrl");
  return mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  iniciar,
};
