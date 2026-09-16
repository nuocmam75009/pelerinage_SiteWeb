// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://pelerinagecycliste.fr',

  /*
    L'environnement de build de Cloudflare ajoute cet adaptateur de lui-même.
    On le déclare donc explicitement, pour choisir sa configuration plutôt que
    de subir ses valeurs par défaut.

    `imageService: 'compile'` est le réglage décisif. Par défaut, l'adaptateur
    bascule sur Cloudflare Images : il ne génère aucun WebP au build et remplace
    les <img> par un point d'entrée dynamique `/_image?href=…`, servi par un
    Worker qui exige un binding `IMAGES` sur le projet. Sans ce binding, toutes
    les images renvoient une erreur. En 'compile', les images sont optimisées au
    build comme dans un site statique classique : ce sont de simples fichiers,
    sans dépendance à l'exécution.

    Conséquence à connaître : avec l'adaptateur, le site est généré dans
    `dist/client/` et non `dist/`.
  */
  adapter: cloudflare({ imageService: 'compile' }),

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});
