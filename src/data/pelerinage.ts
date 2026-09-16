/**
 * Contenu éditorial du site.
 * Tout le texte modifiable se trouve ici : pas besoin de toucher aux composants.
 */

export const site = {
  nom: 'Pèlerinage cycliste',
  titre: 'Pèlerinage cycliste Paris — Chartres',
  description:
    'Deuxième édition du pèlerinage cycliste Paris — Chartres, le samedi 12 juin 2027. 100 km de Saint-Vincent-de-Paul à la cathédrale Notre-Dame de Chartres.',
  url: 'https://pelerinagecycliste.fr',
  email: 'contact@pelerinagecycliste.fr',
  lienInscription:
    'https://docs.google.com/forms/d/e/1FAIpQLSc0i8DCelH7zccjhrcIZ17hhL6Ve10KCn5RjLvNzbhixsLUPg/viewform',
};

export const edition = {
  accroche: 'Bravo aux 40 participants du 1ᵉʳ pèlerinage cycliste Paris-Chartres !',
  annonce: 'Rendez-vous en 2027 pour la deuxième édition :',
  date: 'le samedi 12 juin 2027',
  dateISO: '2027-06-12',
  statutInscriptions: 'Inscriptions à venir',
};

export const parcours = {
  titre: 'Le parcours',
  texte:
    'De l’église Saint-Vincent-de-Paul à la cathédrale de Chartres, 100 km par la vallée de Chevreuse et la forêt de Rambouillet. Deux ravitaillements sont prévus sur la route.',
  /**
   * Le GPX lui-même est importé dans Parcours.astro (Vite exige un chemin
   * littéral). Ici, seulement le nom proposé au visiteur qui le télécharge.
   */
  nomFichierTelecharge: 'pelerinage-cycliste-paris-chartres.gpx',
};

export const maillot = {
  titre: 'Le maillot du pèlerinage',
  devise: 'La roue tourne, la Croix demeure.',
  texte:
    'Chaque pèlerin porte le maillot de l’édition, compris dans les frais d’inscription. Il permet de reconnaître le groupe sur la route et d’assurer la sécurité de tous.',
};

export const chiffres = [
  { valeur: '100 km', libelle: 'de Paris à Chartres' },
  { valeur: '20 km/h', libelle: 'de moyenne minimum' },
  { valeur: '5 h', libelle: 'de route, 7h → 12h' },
  { valeur: '49 €', libelle: 'de frais d’inscription' },
];

export const etapes = [
  {
    id: 'depart',
    surtitre: 'Le départ du pèlerinage',
    heure: '7h00',
    lieu: 'Parvis de l’église Saint-Vincent-de-Paul',
    adresse: 'Square Cavaillé-Coll — 75010 Paris',
    lienCarte: 'https://maps.app.goo.gl/QZhXKN6B7t3FjCXs6',
    libelleLien: 'Point de départ',
    image: 'depart' as const,
    alt: 'Les pèlerins rassemblés devant l’église Saint-Vincent-de-Paul au départ',
  },
  {
    id: 'arrivee',
    surtitre: 'L’arrivée du pèlerinage',
    heure: '12h00',
    lieu: 'Cathédrale Notre-Dame de Chartres',
    adresse: '16, Cloître Notre-Dame — 28000 Chartres',
    lienCarte: 'https://maps.app.goo.gl/Dehc5pfAAjdbFxfk9',
    libelleLien: 'Point d’arrivée',
    image: 'arrivee' as const,
    alt: 'Les pèlerins à l’arrivée devant la cathédrale Notre-Dame de Chartres',
  },
];

export const programme = [
  { heure: '6h30', texte: 'Rendez-vous devant l’église Saint-Vincent-de-Paul' },
  { heure: '6h45', texte: 'Bénédiction des pèlerins' },
  { heure: '7h00', texte: 'Départ des groupes de 10 personnes toutes les 3 minutes' },
  { heure: '12h00', texte: 'Arrivée à Chartres et déjeuner' },
  { heure: '14h30', texte: 'Messe dans la cathédrale de Chartres' },
  { heure: '15h00', texte: 'Visite de la cathédrale et retour à Paris libre' },
];

export const conditions = [
  'Pouvoir rouler avec une moyenne d’au moins 20 km/h sur 100 km, ou opter pour l’option Paris-Rambouillet en train puis vélo de Rambouillet jusqu’à Chartres (43 km)',
  'Porter un casque de cyclisme',
  'Porter le maillot du pèlerinage',
  'Respecter le code de la route',
  'Avoir une assurance responsabilité civile',
  'Régler les frais d’inscription de 49 € (maillot, gourde, pique-nique, voiture balai, etc.). Ces frais ne comprennent pas les éventuels billets de train.',
];

export const navigation = [
  { href: '#depart', libelle: 'Le départ' },
  { href: '#arrivee', libelle: 'L’arrivée' },
  { href: '#parcours', libelle: 'Le parcours' },
  { href: '#programme', libelle: 'Programme' },
  { href: '#maillot', libelle: 'Le maillot' },
  { href: '#conditions', libelle: 'Conditions' },
];
