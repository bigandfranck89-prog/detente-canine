# Détente Canine — site vitrine

Salon de toilettage canin, créations paracorde faites main et élevage de goldens
retrievers « du Hameau des Nymphes » — Angélique Di Martino, Verlin (89).

## Ce que contient ce dépôt

Le site est un **fichier unique**, `index.html`, qui embarque sa mise en forme,
son catalogue et ses scripts. Aucune compilation, aucune dépendance : on ouvre
le fichier, on modifie, on enregistre.

    index.html                 le site entier
    photos/                    toutes les images (produits, avant/après, élevage, BD)
    netlify.toml, _redirects   configuration Netlify (hébergement de secours)
    netlify/functions/rdv.js   relais serveur du formulaire, utilisé seulement sur Netlify
    .nojekyll                  demande à GitHub Pages de servir les fichiers tels quels

## Régler le site sans toucher au code

Tout ce qui change souvent est regroupé en tête du bloc `<script>`, dans l'objet
`CONFIG` : le téléphone et son affichage, le prix du chiot, le texte de la portée
à venir, le catalogue des modèles paracorde avec leurs tarifs, et l'adresse où
part le formulaire.

## Où part le formulaire de rendez-vous

Les demandes rejoignent un webhook n8n qui trie le sujet et prévient Angélique
sur Telegram. Le chemin dépend de l'hébergeur :

- sur **Netlify**, le navigateur appelle `/api/rdv`, une fonction serveur qui
  relaie vers n8n ;
- sur **GitHub Pages** ou un domaine propre, le navigateur appelle n8n
  directement. Ce cas exige que le nœud Webhook de n8n autorise l'origine du
  site (réglage *Allowed Origins (CORS)*).

Le basculement est automatique, il est écrit dans `CONFIG.WEBHOOK_URL`.

## Publication

Toute modification poussée sur `main` est mise en ligne par GitHub Pages en une
à deux minutes.
