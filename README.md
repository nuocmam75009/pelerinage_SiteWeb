# Pèlerinage cycliste Paris — Chartres

Site vitrine de la deuxième édition du pèlerinage cycliste Paris — Chartres,
**samedi 12 juin 2027**.

Site statique construit avec [Astro](https://astro.build) et
[Tailwind CSS](https://tailwindcss.com). Aucune base de données, aucun serveur :
le résultat est un dossier de fichiers HTML/CSS/images à déposer chez
n'importe quel hébergeur statique.

## Démarrer

```sh
npm install      # une seule fois
npm run dev      # http://localhost:4321
npm run build    # génère le site dans dist/client/
npm run preview  # prévisualise le résultat de build
```

## Modifier le contenu

**Tous les textes du site sont dans un seul fichier :
[`src/data/pelerinage.ts`](src/data/pelerinage.ts).**

| À modifier | Où |
| --- | --- |
| Date, accroche, statut des inscriptions | `edition` |
| Lien du formulaire d'inscription, e-mail de contact | `site` |
| Chiffres clés (100 km, 20 km/h, 49 €…) | `chiffres` |
| Départ et arrivée (heures, adresses, liens Google Maps) | `etapes` |
| Texte du parcours, chemin du GPX | `parcours` |
| Horaires de la journée | `programme` |
| Maillot et devise | `maillot` |
| Conditions d'inscription | `conditions` |
| Entrées du menu | `navigation` |

Les photos sont dans [`src/assets/`](src/assets/). Pour en changer une, remplacez
le fichier en gardant le même nom : Astro régénère automatiquement les versions
WebP et les tailles adaptées à chaque écran.

## Le parcours et la carte

La trace GPX ([`src/assets/parcours-paris-chartres.gpx`](src/assets/parcours-paris-chartres.gpx),
export Komoot) est intégrée au bundle par un import `?raw` dans
[`Parcours.astro`](src/components/Parcours.astro), puis analysée **au moment du
build** par [`src/lib/gpx.ts`](src/lib/gpx.ts), qui en tire :

- la distance (100,1 km) et le dénivelé positif (587 m), recalculés depuis les
  points — donc toujours cohérents avec le fichier ;
- une trace simplifiée (Douglas-Peucker) : 1 993 points ramenés à ~530, soit
  10 ko envoyés au visiteur au lieu de 270 ko ;
- les waypoints du GPX, dont les ravitaillements, affichés sur la carte ;
- le profil altimétrique, dessiné en SVG côté serveur (aucun JavaScript).

La carte utilise [Leaflet](https://leafletjs.com) et les tuiles OpenStreetMap,
libres et sans clé d'API. Le zoom à la molette ne s'active qu'après un clic,
pour ne pas bloquer le défilement de la page.

Le fichier n'est jamais lu depuis le disque au moment du rendu : les imports
`?raw` (contenu) et `?url` (copie téléchargeable) l'embarquent dans le bundle.
C'est ce qui permet au build de passer aussi dans les environnements sans
système de fichiers, comme le bac à sable workerd utilisé par l'adaptateur
Cloudflare.

**Pour changer de parcours** : remplacez
`src/assets/parcours-paris-chartres.gpx` en gardant le même nom. Distance,
dénivelé, profil, carte et fichier téléchargeable se mettent à jour tout seuls —
il n'y a qu'un seul exemplaire du fichier, ils ne peuvent pas diverger.

## Structure

```
src/
├── data/pelerinage.ts     ← tout le contenu éditorial
├── lib/gpx.ts             ← lecture du GPX au build (distance, D+, profil)
├── pages/index.astro      ← l'ordre des sections de la page
├── layouts/Layout.astro   ← <head>, métadonnées, polices
├── components/            ← Header, Hero, Etape, Parcours, Programme,
│                             Maillot, Conditions, Inscription, Footer, Bouton
├── styles/global.css      ← couleurs de marque et polices
└── assets/                ← photos et bannière
```

## Identité visuelle

| Couleur | Valeur | Usage |
| --- | --- | --- |
| Rose | `#fd97c6` | fonds, boutons, accents |
| Rose clair | `#ffeaf3` | fonds de section alternés |
| Rose foncé | `#e35c9d` | titres, liens, survol |
| Encre | `#2a1b22` | texte courant |

Polices : **Fraunces** pour les titres (proche du lettrage de la bannière),
**Inter** pour le texte.

## Mise en ligne

Le site est 100 % statique — l'hébergement est gratuit chez Cloudflare Pages.

1. Pousser ce dossier sur un dépôt GitHub.
2. Connecter le dépôt à l'hébergeur.
3. Commande de build : `npm run build` — dossier à publier : **`dist/client`**.
4. Brancher le domaine `pelerinagecycliste.fr` sur l'hébergeur
   (il pointe aujourd'hui vers WordPress.com).

Le fichier `.node-version` impose Node 22 : Astro 7 exige au moins la 22.12,
alors que les hébergeurs démarrent souvent sur une version plus ancienne.

### L'adaptateur Cloudflare

L'environnement de build de Cloudflare ajoute `@astrojs/cloudflare` de lui-même,
même s'il est absent du dépôt. Il est donc déclaré explicitement dans
[`astro.config.mjs`](astro.config.mjs), afin d'en choisir la configuration.

Le réglage qui compte est `imageService: 'compile'`. Par défaut l'adaptateur
bascule sur **Cloudflare Images** : aucun WebP n'est produit au build, et les
`<img>` pointent vers un point d'entrée dynamique `/_image?href=…` servi par un
Worker qui réclame un binding `IMAGES` sur le projet. Sans ce binding, toutes
les images du site renvoient une erreur. En `'compile'`, elles sont optimisées
au build, comme dans n'importe quel site statique.

Conséquence : le site est généré dans `dist/client/` (et non `dist/`), avec un
`dist/server/` à côté. C'est ce premier dossier qu'il faut publier.

## Inscriptions

Le bouton « S'inscrire » pointe vers le formulaire Google existant
(`site.lienInscription`). Pour encaisser les 49 € en ligne, **HelloAsso** est
l'option recommandée : gratuit, français, conçu pour les associations, avec
billetterie et reçus. Il suffira alors de remplacer l'URL dans
`src/data/pelerinage.ts`.
