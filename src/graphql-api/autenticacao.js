const axios = require("axios");
const jwt = require("jsonwebtoken");
const config = require("./config");

const authUrl = config.get("auth");
let authCert;

async function iniciar() {
  if (!authUrl) return;

  const response = await axios.get(`${authUrl}/cert`, {
    headers: {
      Accept: "text/plain",
    },
  });

  authCert = response.data;
}

function validar(token) {
  return jwt.verify(token, authCert);
}

module.exports = {
  iniciar,
  validar,
};
