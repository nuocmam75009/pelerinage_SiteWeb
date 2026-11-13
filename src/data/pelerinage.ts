/**
 * Contenu éditorial du site.
 * Tout le texte modifiable se trouve ici : pas besoin de toucher aux composants.
 */

export const site = {
  nom: 'Pèlerinage cycliste',
  titre: 'Pèlerinage cycliste Paris - Chartres',
  author: 'Eglise Saint-Vincent de Paul',
  description:
    'Deuxième édition du pèlerinage cycliste Paris - Chartres, le samedi 12 juin 2027. 100 km de Saint-Vincent-de-Paul à la cathédrale Notre-Dame de Chartres.',
  url: 'https://pelerinagecycliste.fr',
  email: 'contact@pelerinagecycliste.fr',
  lienInscription:
    'https://docs.google.com/forms/d/e/1FAIpQLSc0i8DCelH7zccjhrcIZ17hhL6Ve10KCn5RjLvNzbhixsLUPg/viewform',
};

export const edition = {
  accroche: 'Bravo aux 40 participants du 1ᵉʳ pèlerinage cycliste Paris - Chartres !',
  annonce: 'Rendez-vous en 2027 pour la deuxième édition :',
  date: 'le samedi 12 juin 2027',
  dateISO: '2027-06-12',
  statutInscriptions: 'Inscriptions à venir',
};

export const parcours = {
  titre: 'Le parcours',
  texte:
    'De l’Eglise Saint-Vincent-de-Paul à la Cathédrale Notre-Dame de Chartres, 100 km par la vallée de Chevreuse et la forêt de Rambouillet. Deux ravitaillements sont prévus sur la route.',
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
  //{ valeur: '49 €', libelle: 'de frais d’inscription' },
];

export const etapes = [
  {
    id: 'depart',
    surtitre: 'Le départ du pèlerinage',
    heure: '7h00',
    lieu: 'Parvis de l’Eglise Saint-Vincent-de-Paul',
    adresse: 'Square Cavaillé-Coll, 75010 Paris',
    lienCarte: 'https://maps.app.goo.gl/QZhXKN6B7t3FjCXs6',
    libelleLien: 'Point de départ',
    image: 'depart' as const,
    alt: 'Les pèlerins rassemblés devant l’Eglise Saint-Vincent-de-Paul au départ',
  },
  {
    id: 'arrivee',
    surtitre: 'L’arrivée du pèlerinage',
    heure: '12h00',
    lieu: 'Cathédrale Notre-Dame de Chartres',
    adresse: '16, Cloître Notre-Dame, 28000 Chartres',
    lienCarte: 'https://maps.app.goo.gl/Dehc5pfAAjdbFxfk9',
    libelleLien: 'Point d’arrivée',
    image: 'arrivee' as const,
    alt: 'Les pèlerins à l’arrivée devant la Cathédrale Notre-Dame de Chartres',
  },
];

export const entrainements = {
  titre: 'Les sessions d’entraînement',
  texte:
    'Pour préparer le pèlerinage, des sorties collectives sont organisées au départ de la place Franz Liszt.',
  lieu: 'Place Franz Liszt, 75010 Paris',
  distance: '60-70 km',
  dates: ['14 novembre', '28 novembre', '16 janvier', '6 mars', '24 mai'],
};

export const programme = [
  { heure: '6h30', texte: 'Rendez-vous devant l’Eglise Saint-Vincent-de-Paul' },
  { heure: '6h45', texte: 'Bénédiction des pèlerins' },
  { heure: '7h00', texte: 'Départ des groupes de 10 personnes toutes les 3 minutes' },
  { heure: '12h00', texte: 'Arrivée à Chartres et déjeuner' },
  { heure: '14h30', texte: 'Messe dans la Cathédrale de Chartres' },
  { heure: '15h00', texte: 'Visite de la Cathédrale et retour à Paris libre' },
];

export const conditions = [
  'Pouvoir rouler avec une moyenne d’au moins 20 km/h sur 100 km, ou opter pour l’option Paris - Rambouillet en train puis vélo de Rambouillet jusqu’à Chartres (43 km)',
  'Porter un casque de cyclisme',
  'Porter le maillot du pèlerinage',
  'Respecter le code de la route',
  'Avoir une assurance responsabilité civile',
  'Être majeur(e)'
];

/**
 * Une réponse peut contenir un texte, une liste à puces, ou les deux.
 * Les adresses web (https://…) dans le texte deviennent des liens cliquables.
 */
type QuestionFaq = { question: string; reponse?: string; liste?: string[] };

export const faq: { titre: string; rubriques: { titre: string; questions: QuestionFaq[] }[] } = {
  titre: 'FAQ – Pèlerinage cycliste (Paris → Chartres)',
  rubriques: [
    {
      titre: 'Le parcours',
      questions: [
        {
          question: 'Quelle est la distance et le dénivelé ?',
          reponse: '100 km avec 790 m de dénivelé positif.',
        },
        {
          question: 'Combien de temps faut-il compter ?',
          reponse:
            'Environ 4h30 à allure modérée (23 km/h). Les plus détendus rouleront à 20 km/h, et les cyclistes un peu plus à l’aise iront facilement au-delà de 23 km/h. Cette durée ne comprend ni les pauses (2 pauses de 10 min chacune) ni les imprévus (ex : crevaison).',
        },
        {
          question: 'Quel niveau faut-il avoir ?',
          reponse: 'Il est recommandé d’avoir déjà roulé 100 km en vélo de route.',
        },
        {
          question: 'Y a-t-il une trace GPX ?',
          reponse: 'Oui, la trace GPX du parcours est fournie.',
        },
        {
          question: 'Comment les pèlerins s’organisent-ils ?',
          reponse:
            'Le parcours se fait par groupes de niveau. Les membres de chaque groupe attendent les retardataires en haut des côtes ou lors de toute autre difficulté.',
        },
      ],
    },
    {
      titre: 'Sécurité et règles de conduite',
      questions: [
        {
          question: 'Quelles sont les règles obligatoires ?',
          reponse:
            'Le port du casque est obligatoire et le code de la route doit être respecté, notamment les feux rouges.',
        },
        {
          question: 'Comment se placer sur la route ?',
          reponse:
            'On roule le plus à droite possible sur sa voie, avec au maximum deux cyclistes de front. On emprunte autant que possible les pistes cyclables. Pas de prise de risque dans les descentes : il convient de maîtriser sa vitesse et de ne jamais sortir large dans les virages.',
        },
        {
          question: 'Comment rouler sur les routes plates périurbaines ?',
          reponse:
            'Il est recommandé de rouler en ligne, les uns derrière les autres, en prenant des relais. Pas de demi-roue, afin d’éviter tout risque d’accident.',
        },
        {
          question: 'Comment signaler les dangers ?',
          reponse:
            'On avertit les autres des obstacles par la voix et/ou par des gestes (stop, trou, voiture, piéton, etc.).',
        },
      ],
    },
    {
      titre: 'Équipement',
      questions: [
        {
          question: 'Le maillot de l’épreuve est-il obligatoire ?',
          reponse: 'Oui, son port est obligatoire.',
        },
        {
          question: 'Que faut-il emporter ?',
          liste: [
            'De quoi réparer une crevaison : 2 chambres à air, une pompe à main et des démonte-pneus',
            'Des en-cas : barres de céréales, pâtes de fruits, pâtes d’amandes, gels énergétiques…',
            '2 bidons d’eau',
          ],
        },
        {
          question: 'Faut-il préparer son vélo ?',
          reponse:
            'Il est recommandé de le réviser avant la sortie, a minima la pression des pneus et les freins.',
        },
      ],
    },
    {
      titre: 'À l’arrivée à Chartres',
      questions: [
        {
          question: 'Peut-on se changer à l’arrivée ?',
          reponse:
            'Oui, pour ceux qui le souhaitent, il est possible de laisser la veille du départ un petit sac à son nom avec des vêtements secs.',
        },
        {
          question: 'Quels sont les horaires de train pour rentrer à Paris ?',
          reponse: 'Départs de la gare de Chartres à 15h36, 16h46 et 17h35.',
        },
        {
          question: 'Combien coûte le trajet en train ?',
          reponse: 'Compter 21 € le trajet.',
        },
        {
          question: 'Faut-il réserver une place pour le vélo ?',
          reponse:
            'Oui, la réservation est obligatoire dans ces trains et s’ajoute au prix du billet (1 €). Elle se fait sur https://resa.velo-centrevaldeloire.fr (accepter les cookies pour que la réservation fonctionne).',
        },
      ],
    },
  ],
};

export const navigation = [
  { href: '#depart', libelle: 'Le départ' },
  { href: '#arrivee', libelle: 'L’arrivée' },
  { href: '#parcours', libelle: 'Le parcours' },
  { href: '#programme', libelle: 'Programme' },
  { href: '#entrainements', libelle: 'Entraînements' },
  { href: '#maillot', libelle: 'Le maillot' },
  //{ href: '#conditions', libelle: 'Conditions' },
  { href: '#faq', libelle: 'FAQ' },
];
