import type { ImageName } from './imageManifest'

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Our Story' },
  { id: 'experience', label: 'Experience' },
  { id: 'menu', label: 'Menu' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'reservations', label: 'Reservations' },
] as const

export type SectionId = (typeof navLinks)[number]['id'] | 'visit'

/** Placeholder venue details — LAVÈRE is a fictional concept, not an operating business. */
export const venue = {
  name: 'LAVÈRE',
  tagline: 'Above the Ordinary.',
  established: 'MMXXIV',
  floor: 'Level 52',
  building: 'The Aurelia Tower (fictional)',
  street: 'Ayala Avenue',
  city: 'Makati City, Metro Manila',
  coordinates: '14°33′N · 121°01′E',
  phone: '+63 2 8000 0000',
  phoneHref: 'tel:+63280000000',
  email: 'hello@lavere.example',
  directionsHref: 'https://www.google.com/maps/search/?api=1&query=Ayala+Avenue+Makati+City',
  hours: [
    { days: 'Monday – Thursday', time: '5:00 PM – 12:00 AM' },
    { days: 'Friday – Saturday', time: '5:00 PM – 2:00 AM' },
    { days: 'Sunday', time: '4:00 PM – 11:00 PM' },
  ],
  kitchen: 'Kitchen closes at 11:00 PM nightly',
  socials: [
    { label: 'Instagram', handle: '@lavere.mnl' },
    { label: 'Facebook', handle: '/lavere.mnl' },
    { label: 'TikTok', handle: '@lavere.mnl' },
  ],
}

export type Experience = {
  index: string
  title: string
  italic: string
  body: string
  meta: string
  image: ImageName
  alt: string
}

export const experiences: Experience[] = [
  {
    index: '01',
    title: 'Elevated',
    italic: 'Dining',
    body: 'A considered à la carte menu built around premium cuts, line-caught seafood and the best of the Philippine season — plated with restraint, finished tableside, and paced to the light outside.',
    meta: 'Dinner · 6:00 PM – 11:00 PM',
    image: 'plating',
    alt: 'A delicately plated fine-dining course being served at a candlelit table',
  },
  {
    index: '02',
    title: 'Signature',
    italic: 'Cocktails',
    body: 'Classic technique, contemporary conviction. Our bar clarifies, infuses and barrel-rests in-house — weaving calamansi, pandan and native botanicals into drinks that reward a second glance.',
    meta: 'Bar · 5:00 PM – Late',
    image: 'pour',
    alt: 'A bartender pouring an amber cocktail over a single clear ice block',
  },
  {
    index: '03',
    title: 'Rooftop',
    italic: 'Evenings',
    body: 'Fifty-two floors up, the skyline becomes the room. Low light, an open sky, and resident selectors easing the night from golden hour to the last glass.',
    meta: 'Thursday – Saturday · Live sets from 9:00 PM',
    image: 'towers',
    alt: 'Illuminated city towers seen from a rooftop terrace at night',
  },
]

export type MenuItem = {
  name: string
  description: string
  price: number
  image: ImageName
  alt: string
  note?: string
}

export const signatureMenu: { label: string; items: MenuItem[] }[] = [
  {
    label: 'From the Kitchen',
    items: [
      {
        name: 'Truffle Butter Tenderloin',
        description: '220g grain-fed tenderloin, black truffle butter, pommes purée, Bordelaise jus.',
        price: 3850,
        image: 'tenderloin',
        alt: 'Sliced medium-rare tenderloin with a glossy crust',
        note: "Chef's signature",
      },
      {
        name: 'Seared Atlantic Salmon',
        description: 'Crisp-skinned fillet, champagne beurre blanc, charred leek, ikura.',
        price: 2450,
        image: 'salmon',
        alt: 'Seared salmon fillet topped with a bright herb and vegetable salsa',
      },
      {
        name: 'Wild Mushroom Risotto',
        description: 'Carnaroli, Benguet mushrooms, 24-month Parmigiano, parmesan crisp.',
        price: 1680,
        image: 'risotto',
        alt: 'Creamy wild mushroom risotto finished with a parmesan crisp',
      },
      {
        name: 'Champagne Poached Pear',
        description: 'Vanilla and champagne poached pear, mascarpone, cinnamon tuile.',
        price: 890,
        image: 'pear',
        alt: 'A whole poached pear glazed in syrup on a white plate',
      },
    ],
  },
  {
    label: 'From the Bar',
    items: [
      {
        name: 'LAVÈRE Signature Martini',
        description: 'Gin, lemongrass-infused dry vermouth, olive brine, Castelvetrano.',
        price: 780,
        image: 'martini',
        alt: 'A crystal-clear martini garnished with three olives',
        note: 'House classic',
      },
      {
        name: 'Golden Hour Spritz',
        description: 'Aperitivo, calamansi cordial, prosecco, blood orange.',
        price: 690,
        image: 'spritz',
        alt: 'A glowing orange spritz with orange slices in a wine glass',
      },
    ],
  },
]

export const fullMenu: { label: string; items: { name: string; description: string; price: number }[] }[] = [
  {
    label: 'To Begin',
    items: [
      { name: 'Hamachi Crudo', description: 'Calamansi ponzu, green chili, radish, shiso.', price: 1150 },
      { name: 'Burrata & Heirloom Tomato', description: 'Aged balsamic, basil oil, sourdough crisp.', price: 1080 },
      { name: 'Wagyu Tartare', description: 'Cured yolk, cornichon, smoked mayonnaise, toast.', price: 1450 },
      { name: 'Oysters, Half Dozen', description: 'Mignonette, lemon, Tabasco granita.', price: 1600 },
    ],
  },
  {
    label: 'Mains',
    items: [
      { name: 'Truffle Butter Tenderloin', description: 'Black truffle butter, pommes purée, Bordelaise.', price: 3850 },
      { name: 'Seared Atlantic Salmon', description: 'Champagne beurre blanc, charred leek, ikura.', price: 2450 },
      { name: 'Herb-Crusted Lamb Rack', description: 'Pistachio crumb, smoked eggplant, lamb jus.', price: 3250 },
      { name: 'Wild Mushroom Risotto', description: 'Benguet mushrooms, 24-month Parmigiano.', price: 1680 },
    ],
  },
  {
    label: 'Desserts',
    items: [
      { name: 'Champagne Poached Pear', description: 'Mascarpone, cinnamon tuile.', price: 890 },
      { name: 'Dark Chocolate Délice', description: '70% Davao cacao, salted caramel, gold leaf.', price: 820 },
      { name: 'Ube Mille-Feuille', description: 'Ube crème, caramelised puff pastry, coconut.', price: 780 },
    ],
  },
  {
    label: 'Cocktails',
    items: [
      { name: 'LAVÈRE Signature Martini', description: 'Gin, lemongrass vermouth, Castelvetrano.', price: 780 },
      { name: 'Golden Hour Spritz', description: 'Aperitivo, calamansi cordial, prosecco.', price: 690 },
      { name: 'Smoked Old Fashioned', description: 'Bourbon, muscovado, bitters, oak smoke.', price: 820 },
      { name: 'Pandan Negroni', description: 'Pandan gin, Campari, sweet vermouth.', price: 760 },
      { name: 'Champagne, by the Glass', description: 'Ask for this evening’s house pour.', price: 1200 },
    ],
  },
]

export type GalleryItem = {
  image: ImageName
  caption: string
  alt: string
  layout: string
}

export const gallery: GalleryItem[] = [
  {
    image: 'lights',
    caption: 'The Terrace, blue hour',
    alt: 'A rooftop terrace strung with warm lights against a deep blue evening sky',
    layout: 'g-a',
  },
  {
    image: 'salon',
    caption: 'The Salon',
    alt: 'A dim, intimate dining room with set tables beside tall windows',
    layout: 'g-b',
  },
  {
    image: 'oldfashioned',
    caption: 'Smoked Old Fashioned',
    alt: 'An amber cocktail with a dried orange wheel and rosemary on a dark bar',
    layout: 'g-c',
  },
  {
    image: 'citylights',
    caption: 'Makati, after dark',
    alt: 'An expansive city lit up at night beneath a dusky sky',
    layout: 'g-d',
  },
  {
    image: 'chef',
    caption: 'At the pass, 7:40 PM',
    alt: 'A chef in an apron carefully plating a dish under warm pendant lights',
    layout: 'g-e',
  },
  {
    image: 'bar',
    caption: 'The Gold Bar',
    alt: 'A glowing back bar lined with bottles beneath hanging filament lights',
    layout: 'g-f',
  },
  {
    image: 'toast',
    caption: 'Evenings worth raising a glass to',
    alt: 'Friends raising wine glasses together in a toast',
    layout: 'g-g',
  },
  {
    image: 'dessert',
    caption: 'The final course',
    alt: 'A plated dessert drizzled with caramel against a dark background',
    layout: 'g-h',
  },
]

export const formatPHP = (value: number) => `₱${value.toLocaleString('en-PH')}`
