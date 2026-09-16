export interface Point {
  lat: number;
  lon: number;
  ele: number;
}

export interface Balise {
  nom: string;
  lat: number;
  lon: number;
}

export interface Parcours {
  nom: string;
  /** Trace simplifiée, prête à être envoyée au navigateur : [lat, lon][] */
  trace: [number, number][];
  /** Waypoints du GPX (ravitaillements, points remarquables) */
  balises: Balise[];
  distanceKm: number;
  denivelePositifM: number;
  altitudeMinM: number;
  altitudeMaxM: number;
  /** Profil altimétrique échantillonné : [distance en km, altitude en m][] */
  profil: [number, number][];
}

const RAYON_TERRE_M = 6_371_000;

function distanceM(a: Point, b: Point): number {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLon = (b.lon - a.lon) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * RAYON_TERRE_M * Math.asin(Math.sqrt(h));
}

/** Distance perpendiculaire d'un point au segment [debut, fin], en degrés projetés. */
function distancePerpendiculaire(p: Point, debut: Point, fin: Point): number {
  // Projection équirectangulaire locale : suffisante à cette échelle.
  const k = Math.cos((debut.lat * Math.PI) / 180);
  const px = p.lon * k;
  const py = p.lat;
  const ax = debut.lon * k;
  const ay = debut.lat;
  const bx = fin.lon * k;
  const by = fin.lat;

  const dx = bx - ax;
  const dy = by - ay;
  const longueur2 = dx * dx + dy * dy;

  if (longueur2 === 0) return Math.hypot(px - ax, py - ay);

  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / longueur2));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** Simplification Douglas-Peucker, itérative pour ne pas saturer la pile. */
function simplifier(points: Point[], tolerance: number): Point[] {
  if (points.length < 3) return points;

  const garder = new Uint8Array(points.length);
  garder[0] = 1;
  garder[points.length - 1] = 1;

  const pile: [number, number][] = [[0, points.length - 1]];

  while (pile.length > 0) {
    const [debut, fin] = pile.pop()!;
    let distanceMax = 0;
    let indexMax = -1;

    for (let i = debut + 1; i < fin; i++) {
      const d = distancePerpendiculaire(points[i], points[debut], points[fin]);
      if (d > distanceMax) {
        distanceMax = d;
        indexMax = i;
      }
    }

    if (indexMax !== -1 && distanceMax > tolerance) {
      garder[indexMax] = 1;
      pile.push([debut, indexMax], [indexMax, fin]);
    }
  }

  return points.filter((_, i) => garder[i] === 1);
}

/**
 * Analyse le contenu d'un GPX et en extrait la trace, les waypoints
 * et les statistiques. Appelée au moment du build : rien de tout ceci
 * ne tourne dans le navigateur, seul le résultat (quelques kilo-octets)
 * est envoyé au visiteur.
 *
 * Le XML est passé en argument plutôt que lu sur le disque : l'import
 * `?raw` l'intègre au bundle, ce qui fonctionne aussi bien en build
 * statique que dans les environnements sans accès au système de
 * fichiers (workerd chez Cloudflare, par exemple).
 */
export function analyserGpx(xml: string, toleranceDegres = 0.00008): Parcours {
  const nom = xml.match(/<metadata>[\s\S]*?<name>([^<]*)<\/name>/)?.[1]?.trim() ?? 'Parcours';

  const points: Point[] = [];
  const regexTrkpt = /<trkpt[^>]*lat="([^"]+)"[^>]*lon="([^"]+)"[^>]*>([\s\S]*?)<\/trkpt>/g;
  for (const m of xml.matchAll(regexTrkpt)) {
    points.push({
      lat: Number(m[1]),
      lon: Number(m[2]),
      ele: Number(m[3].match(/<ele>([^<]+)<\/ele>/)?.[1] ?? 0),
    });
  }

  if (points.length === 0) {
    throw new Error('Aucun point de trace trouvé dans le GPX fourni.');
  }

  const balises: Balise[] = [];
  const regexWpt = /<wpt[^>]*lat="([^"]+)"[^>]*lon="([^"]+)"[^>]*>([\s\S]*?)<\/wpt>/g;
  for (const m of xml.matchAll(regexWpt)) {
    balises.push({
      nom: m[3].match(/<name>([^<]*)<\/name>/)?.[1]?.trim() ?? '',
      lat: Number(m[1]),
      lon: Number(m[2]),
    });
  }

  // Distance et profil sur la trace complète, pour rester exact.
  let distanceTotaleM = 0;
  const profilComplet: [number, number][] = [[0, points[0].ele]];
  for (let i = 1; i < points.length; i++) {
    distanceTotaleM += distanceM(points[i - 1], points[i]);
    profilComplet.push([distanceTotaleM / 1000, points[i].ele]);
  }

  // D+ : on lisse l'altitude puis on ignore les micro-variations du GPS.
  const fenetre = 5;
  const seuilM = 2;
  const lisse = points.map((_, i) => {
    const debut = Math.max(0, i - fenetre);
    const fin = Math.min(points.length, i + fenetre + 1);
    let somme = 0;
    for (let j = debut; j < fin; j++) somme += points[j].ele;
    return somme / (fin - debut);
  });

  let denivelePositifM = 0;
  let reference = lisse[0];
  for (const altitude of lisse) {
    const ecart = altitude - reference;
    if (ecart > seuilM) {
      denivelePositifM += ecart;
      reference = altitude;
    } else if (ecart < -seuilM) {
      reference = altitude;
    }
  }

  const altitudes = points.map((p) => p.ele);

  // Profil réduit à ~120 points : largement assez pour un graphique.
  const pas = Math.max(1, Math.ceil(profilComplet.length / 120));
  const profil = profilComplet.filter((_, i) => i % pas === 0 || i === profilComplet.length - 1);

  return {
    nom,
    trace: simplifier(points, toleranceDegres).map((p) => [
      Number(p.lat.toFixed(5)),
      Number(p.lon.toFixed(5)),
    ]),
    balises,
    distanceKm: Math.round(distanceTotaleM / 100) / 10,
    denivelePositifM: Math.round(denivelePositifM),
    altitudeMinM: Math.round(Math.min(...altitudes)),
    altitudeMaxM: Math.round(Math.max(...altitudes)),
    profil: profil.map(([d, a]) => [Number(d.toFixed(2)), Math.round(a)]),
  };
}
