// Proxy du formulaire de rendez-vous : navigateur -> Netlify -> webhook n8n (pod PikaPods).
// Évite tout blocage CORS et masque l'URL du pod au visiteur.
// N'est utilisé QUE sur Netlify. Sur GitHub Pages, le site appelle le webhook directement.
const WEBHOOK = 'https://venomous-numbat.pikapod.net/webhook/detente-canine-rdv';

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS' } };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ ok: false, message: 'Méthode non autorisée' }) };
  }
  try {
    const r = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
      body: event.body
    });
    const texte = await r.text();
    return {
      statusCode: r.status,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: texte || JSON.stringify({ ok: r.ok })
    };
  } catch (e) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, message: "Le service de demande de rendez-vous est momentanément indisponible.", detail: String(e) })
    };
  }
};
