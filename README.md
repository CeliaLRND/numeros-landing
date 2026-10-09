# Site NŪMEROS

Landing et pages légales de l'app, en HTML et CSS sans build. Servi par GitHub Pages.

- `index.html` : la landing
- `conditions.html` : conditions d'utilisation et d'abonnement, mentions légales
- `confidentialite.html` : politique de confidentialité
- `style.css` : le design de l'app (voir `DESIGN.md`)
- `site.js` : le mouvement de la landing (le contenu reste lisible sans lui)
- `analytics.js` : PostHog, inactif tant que la clé est vide

## Mettre en ligne

1. Dépôt **public** `CeliaLRND/numeros-landing`.
2. Y copier le contenu de ce dossier, à la racine, puis pousser sur `main`.
3. Settings → Pages → Source : « Deploy from a branch », branche `main`, dossier `/ (root)`.
4. Le site arrive sur `https://numeros.hellocelia.fr/` (fichier `CNAME`, à garder dans chaque copie).

L'app pointe vers `https://numeros.hellocelia.fr/conditions.html` et `…/confidentialite.html`
(`src/features/paywall/offer.ts`).
Les mêmes URL vont dans App Store Connect (URL de la politique de confidentialité, et EULA si besoin).

## Avant la sortie

- `index.html` : remplacer le bouton « Bientôt sur l'App Store » par le lien de la fiche (`href`, et retirer
  `aria-disabled`).

## PostHog

L'app utilise PostHog (UE, sans identify) et la politique de confidentialité le décrit, section
« Mesure d'audience et diagnostic ». Le site n'a pas de mesure : `analytics.js` reste inactif (clé vide).
Pour l'activer un jour, coller la clé du projet dans `POSTHOG_KEY` et mettre à jour la section « Ce site »
de `confidentialite.html`.
