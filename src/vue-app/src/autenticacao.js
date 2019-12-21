/* global __AUTH_URL__ */

const tokenKey = "authToken";

function extrairTokenHash() {
  // Token é recebido via # na url. Ex: http://localhost:3000#token=xxxx
  const token = window.location.hash.split("=")[1];

  // Reseta URL para remover token recebido
  window.history.replaceState(
    {},
    window.document.title,
    window.location.origin + window.location.pathname,
  );

  return token;
}

export function carregarToken() {
  let token = sessionStorage.getItem(tokenKey);

  if (!token) {
    if (window.location.hash) {
      token = extrairTokenHash();
      sessionStorage.setItem(tokenKey, token);
    } else {
      window.location = `${__AUTH_URL__}?redirect=${encodeURI(
        window.location.href,
      )}`;

      return null;
    }
  }

  return token;
}
