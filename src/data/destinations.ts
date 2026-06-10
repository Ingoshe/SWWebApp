export interface Attraction {
  id: string;
  name: string;
  category: "Nature" | "Culture" | "Architecture" | "Food" | "History" | "Adventure" | "Art" | "Wellness";
  description: string;
  rating: number;       // editorial default rating 1-5
  photo: string;        // Unsplash source URL
  discoverUrl: string;  // external link
  lat: number;
  lng: number;
}

export interface City {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  heroPhoto: string;
  attractions: Attraction[];
}

export const DESTINATIONS: City[] = [
  /* ─────────────────────────────────────────────────────────
     FRANCE
  ───────────────────────────────────────────────────────── */
  {
    id: "paris",
    name: "Paris",
    country: "France",
    countryCode: "FR",
    heroPhoto: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    attractions: [
      {
        id: "eiffel-tower",
        name: "Eiffel Tower",
        category: "Architecture",
        description:
          "Standing 330 metres tall, the Eiffel Tower is the most-visited paid monument in the world. Built by Gustave Eiffel for the 1889 World's Fair, it offers breathtaking panoramic views of Paris from three observation decks.",
        rating: 4.8,
        photo: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=600&q=80",
        discoverUrl: "https://www.toureiffel.paris/en",
        lat: 48.8584,
        lng: 2.2945,
      },
      {
        id: "louvre",
        name: "Louvre Museum",
        category: "Art",
        description:
          "The world's largest art museum and historic monument, home to over 35,000 works including the Mona Lisa and Venus de Milo. The iconic glass pyramid entrance is itself a work of modern architectural art.",
        rating: 4.7,
        photo: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=600&q=80",
        discoverUrl: "https://www.louvre.fr/en",
        lat: 48.8606,
        lng: 2.3376,
      },
      {
        id: "montmartre",
        name: "Montmartre & Sacré-Cœur",
        category: "Culture",
        description:
          "A historic hilltop neighbourhood crowned by the gleaming white Sacré-Cœur Basilica. Cobblestone streets wind past artists' studios, cabarets, and charming cafés that inspired Picasso, Van Gogh, and countless others.",
        rating: 4.6,
        photo: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80",
        discoverUrl: "https://en.wikipedia.org/wiki/Montmartre",
        lat: 48.8867,
        lng: 2.3431,
      },
      {
        id: "versailles",
        name: "Palace of Versailles",
        category: "History",
        description:
          "The opulent royal château that served as the political centre of France from 1682 to 1789. The Hall of Mirrors, manicured gardens, and Grand Canal make it one of the finest examples of French Baroque architecture.",
        rating: 4.8,
        photo: "https://images.unsplash.com/photo-1597168902843-6a82d4f5f7ec?w=600&q=80",
        discoverUrl: "https://en.chateauversailles.fr",
        lat: 48.8049,
        lng: 2.1204,
      },
    ],
  },
  {
    id: "nice",
    name: "Nice",
    country: "France",
    countryCode: "FR",
    heroPhoto: "https://images.unsplash.com/photo-1491166617655-0723a8b3f3af?w=800&q=80",
    attractions: [
      {
        id: "promenade-anglais",
        name: "Promenade des Anglais",
        category: "Nature",
        description:
          "The jewel of the French Riviera, this iconic 7-kilometre seafront promenade stretches along the azure Baie des Anges. Lined with belle époque hotels, it is perfect for morning walks and watching the Mediterranean sunset.",
        rating: 4.5,
        photo: "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=600&q=80",
        discoverUrl: "https://en.nicetourisme.com",
        lat: 43.6961,
        lng: 7.2661,
      },
      {
        id: "castle-hill-nice",
        name: "Castle Hill (Colline du Château)",
        category: "Nature",
        description:
          "Rising 92 metres above the old town, this parkland promontory offers spectacular 360° views over Nice, the coastline, and the Alps. A stunning waterfall and ruined medieval castle add to its romantic character.",
        rating: 4.4,
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
        discoverUrl: "https://en.wikipedia.org/wiki/Castle_Hill,_Nice",
        lat: 43.6958,
        lng: 7.2819,
      },
      {
        id: "old-town-nice",
        name: "Vieux-Nice (Old Town)",
        category: "Culture",
        description:
          "A labyrinth of narrow baroque streets painted in vivid ochre, terracotta, and yellow. The morning Cours Saleya market bursts with flowers and Provençal produce, while evening brings locals and visitors to its lively restaurants.",
        rating: 4.6,
        photo: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80",
        discoverUrl: "https://en.nicetourisme.com/vieux-nice",
        lat: 43.6965,
        lng: 7.2791,
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────
     JAPAN
  ───────────────────────────────────────────────────────── */
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    countryCode: "JP",
    heroPhoto: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    attractions: [
      {
        id: "sensoji",
        name: "Senso-ji Temple",
        category: "Culture",
        description:
          "Tokyo's oldest and most visited temple, founded in 628 AD in the heart of Asakusa. The iconic Kaminarimon Thunder Gate and the 250-metre Nakamise shopping street leading to the main hall are unmissable cultural landmarks.",
        rating: 4.7,
        photo: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
        discoverUrl: "https://www.senso-ji.jp/english/",
        lat: 35.7147,
        lng: 139.7967,
      },
      {
        id: "shibuya-crossing",
        name: "Shibuya Crossing",
        category: "Culture",
        description:
          "Often called the world's busiest pedestrian crossing, up to 3,000 people cross simultaneously from all directions when the lights change. The surrounding neon-lit district is the epicentre of Tokyo's youth fashion and pop culture.",
        rating: 4.5,
        photo: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=80",
        discoverUrl: "https://en.wikipedia.org/wiki/Shibuya_Crossing",
        lat: 35.6595,
        lng: 139.7004,
      },
      {
        id: "teamlab-planets",
        name: "teamLab Planets",
        category: "Art",
        description:
          "An extraordinary immersive digital art museum in Toyosu where you walk barefoot through rooms filled with infinite mirrors, floating flowers, and crystalline light installations. A genuinely otherworldly experience.",
        rating: 4.8,
        photo: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&q=80",
        discoverUrl: "https://planets.teamlab.art/tokyo/",
        lat: 35.6448,
        lng: 139.7894,
      },
    ],
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    countryCode: "JP",
    heroPhoto: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    attractions: [
      {
        id: "fushimi-inari",
        name: "Fushimi Inari Taisha",
        category: "Culture",
        description:
          "Thousands of vermillion torii gates wind through forested hillside trails at this iconic Shinto shrine dedicated to Inari, the god of rice and commerce. The full hike to the summit takes about two hours and rewards with stunning city views.",
        rating: 4.9,
        photo: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600&q=80",
        discoverUrl: "http://inari.jp/en/",
        lat: 34.9671,
        lng: 135.7727,
      },
      {
        id: "arashiyama",
        name: "Arashiyama Bamboo Grove",
        category: "Nature",
        description:
          "One of Japan's most photographed landscapes — towering bamboo stalks create a cathedral-like canopy along a walking path in western Kyoto. The surrounding area includes the Tenryu-ji Zen garden and the enchanting Monkey Park.",
        rating: 4.7,
        photo: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
        discoverUrl: "https://en.wikipedia.org/wiki/Arashiyama",
        lat: 35.0094,
        lng: 135.6728,
      },
      {
        id: "kinkakuji",
        name: "Kinkaku-ji (Golden Pavilion)",
        category: "Architecture",
        description:
          "A Zen Buddhist temple whose top two floors are completely covered in gold leaf, shimmering above a tranquil mirror pond. Originally built as a retirement villa for a shogun in 1397, it is one of Japan's most universally recognised icons.",
        rating: 4.8,
        photo: "https://images.unsplash.com/photo-1490761668535-35497d44d1be?w=600&q=80",
        discoverUrl: "https://www.shokoku-ji.jp/en/kinkakuji/",
        lat: 35.0394,
        lng: 135.7292,
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────
     ITALY
  ───────────────────────────────────────────────────────── */
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    countryCode: "IT",
    heroPhoto: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    attractions: [
      {
        id: "colosseum",
        name: "The Colosseum",
        category: "History",
        description:
          "The largest amphitheatre ever built, completed in 80 AD and capable of holding up to 80,000 spectators for gladiatorial contests. An enduring symbol of the Roman Empire's engineering genius and cultural ambition.",
        rating: 4.8,
        photo: "https://images.unsplash.com/photo-1499426600726-2d8e61a4af9b?w=600&q=80",
        discoverUrl: "https://www.colosseo.it/en/",
        lat: 41.8902,
        lng: 12.4922,
      },
      {
        id: "vatican",
        name: "Vatican Museums & Sistine Chapel",
        category: "Art",
        description:
          "Among the world's greatest collections of art and historical artefacts, culminating in Michelangelo's breathtaking ceiling frescoes in the Sistine Chapel. Over 70,000 works span Egyptian mummies to Renaissance masterpieces.",
        rating: 4.7,
        photo: "https://images.unsplash.com/photo-1568797629192-789acf8e4df3?w=600&q=80",
        discoverUrl: "https://www.museivaticani.va/content/museivaticani/en.html",
        lat: 41.9029,
        lng: 12.4534,
      },
      {
        id: "trevi-fountain",
        name: "Trevi Fountain",
        category: "Architecture",
        description:
          "The largest and most spectacular Baroque fountain in Rome, completed in 1762. Tradition holds that tossing a coin over your left shoulder ensures a return to Rome — approximately €1.4 million is collected annually for charity.",
        rating: 4.6,
        photo: "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=600&q=80",
        discoverUrl: "https://en.wikipedia.org/wiki/Trevi_Fountain",
        lat: 41.9009,
        lng: 12.4833,
      },
    ],
  },
  {
    id: "venice",
    name: "Venice",
    country: "Italy",
    countryCode: "IT",
    heroPhoto: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80",
    attractions: [
      {
        id: "st-marks-basilica",
        name: "St. Mark's Basilica",
        category: "Architecture",
        description:
          "A breathtaking fusion of Byzantine, Gothic, and Islamic architecture adorned with over 8,000 square metres of golden mosaics. Built to house the relics of St. Mark, it has anchored the spiritual life of Venice since 828 AD.",
        rating: 4.8,
        photo: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80",
        discoverUrl: "https://www.basilicasanmarco.it/?lang=en",
        lat: 45.4345,
        lng: 12.3397,
      },
      {
        id: "grand-canal",
        name: "Grand Canal Gondola Ride",
        category: "Adventure",
        description:
          "Gliding along Venice's main artery by gondola remains one of travel's most romantic and singular experiences. The 3.8-kilometre S-shaped canal is flanked by over 170 palaces and churches built between the 13th and 18th centuries.",
        rating: 4.7,
        photo: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80",
        discoverUrl: "https://en.veniceconnected.com",
        lat: 45.4408,
        lng: 12.3155,
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────
     UAE
  ───────────────────────────────────────────────────────── */
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    countryCode: "AE",
    heroPhoto: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    attractions: [
      {
        id: "burj-khalifa",
        name: "Burj Khalifa",
        category: "Architecture",
        description:
          "The world's tallest building at 828 metres, the Burj Khalifa's observation decks on floors 124 and 148 offer unrivalled views across the desert, city, and Arabian Gulf. At night the façade transforms into a stunning light canvas.",
        rating: 4.8,
        photo: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80",
        discoverUrl: "https://www.burjkhalifa.ae/en/",
        lat: 25.1972,
        lng: 55.2744,
      },
      {
        id: "dubai-mall",
        name: "Dubai Mall & Aquarium",
        category: "Adventure",
        description:
          "One of the world's largest shopping centres, housing an enormous indoor aquarium with a tunnel walkthrough, an Olympic-sized ice rink, and a 10-metre indoor waterfall. The Dubai Fountain outside dances to music every evening.",
        rating: 4.5,
        photo: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=600&q=80",
        discoverUrl: "https://www.thedubaimall.com/en",
        lat: 25.1985,
        lng: 55.2796,
      },
      {
        id: "palm-jumeirah",
        name: "Palm Jumeirah",
        category: "Architecture",
        description:
          "An extraordinary feat of engineering — an artificial archipelago shaped like a palm tree extending 5 kilometres into the Arabian Gulf. Home to the iconic Atlantis hotel, luxury villas, and the immersive Aquaventure Waterpark.",
        rating: 4.6,
        photo: "https://images.unsplash.com/photo-1533395427226-788cee25cc7b?w=600&q=80",
        discoverUrl: "https://www.visitdubai.com/en/places-to-visit/palm-jumeirah",
        lat: 25.1124,
        lng: 55.1390,
      },
      {
        id: "dubai-desert-safari",
        name: "Desert Safari & Dune Bashing",
        category: "Adventure",
        description:
          "An exhilarating 4x4 ride over towering golden dunes at sunset, followed by a Bedouin camp experience with camel riding, falconry, and a feast under the stars. The Arabian desert landscape is achingly beautiful at dusk.",
        rating: 4.7,
        photo: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=600&q=80",
        discoverUrl: "https://www.visitdubai.com/en/articles/desert-safari",
        lat: 24.9857,
        lng: 55.4272,
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────
     USA
  ───────────────────────────────────────────────────────── */
  {
    id: "new-york",
    name: "New York City",
    country: "USA",
    countryCode: "US",
    heroPhoto: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&q=80",
    attractions: [
      {
        id: "central-park",
        name: "Central Park",
        category: "Nature",
        description:
          "An 843-acre green oasis in the heart of Manhattan, designed by Frederick Law Olmsted and Calvert Vaux. The park hosts the Metropolitan Museum of Art, the Jacqueline Kennedy Onassis Reservoir, and countless film locations.",
        rating: 4.8,
        photo: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80",
        discoverUrl: "https://www.centralparknyc.org",
        lat: 40.7851,
        lng: -73.9683,
      },
      {
        id: "met-museum",
        name: "The Metropolitan Museum of Art",
        category: "Art",
        description:
          "One of the world's great encyclopaedic museums with over 1.5 million works spanning 5,000 years of human creativity — from ancient Egyptian temples to contemporary American art. The rooftop bar offers stunning Central Park views.",
        rating: 4.8,
        photo: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&q=80",
        discoverUrl: "https://www.metmuseum.org",
        lat: 40.7794,
        lng: -73.9632,
      },
      {
        id: "statue-of-liberty",
        name: "Statue of Liberty",
        category: "History",
        description:
          "A universal symbol of freedom and democracy, gifted by France and dedicated in 1886. The ferry journey from Battery Park offers spectacular views of Lower Manhattan, and the crown observation deck is worth every step of the 377-stair climb.",
        rating: 4.7,
        photo: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&q=80",
        discoverUrl: "https://www.nps.gov/stli/index.htm",
        lat: 40.6892,
        lng: -74.0445,
      },
    ],
  },
  {
    id: "san-francisco",
    name: "San Francisco",
    country: "USA",
    countryCode: "US",
    heroPhoto: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
    attractions: [
      {
        id: "golden-gate",
        name: "Golden Gate Bridge",
        category: "Architecture",
        description:
          "The Art Deco suspension bridge spanning the Golden Gate strait is one of the most photographed structures on earth. Walking or cycling across its 2.7-kilometre span while bay fog swirls around the 227-metre towers is unforgettable.",
        rating: 4.9,
        photo: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=600&q=80",
        discoverUrl: "https://www.goldengate.org",
        lat: 37.8199,
        lng: -122.4783,
      },
      {
        id: "alcatraz",
        name: "Alcatraz Island",
        category: "History",
        description:
          "The notorious federal penitentiary that housed Al Capone and Machine Gun Kelly sits on a dramatic island in San Francisco Bay. The audio tour narrated by former inmates and guards is hauntingly compelling.",
        rating: 4.6,
        photo: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=600&q=80",
        discoverUrl: "https://www.nps.gov/alca/index.htm",
        lat: 37.8270,
        lng: -122.4230,
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────
     AUSTRALIA
  ───────────────────────────────────────────────────────── */
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    countryCode: "AU",
    heroPhoto: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
    attractions: [
      {
        id: "opera-house",
        name: "Sydney Opera House",
        category: "Architecture",
        description:
          "Jørn Utzon's expressionist masterpiece is one of the 20th century's most distinctive buildings. The interlocking shell-shaped roof structures house multiple performance venues and the building was awarded UNESCO World Heritage status in 2007.",
        rating: 4.9,
        photo: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80",
        discoverUrl: "https://www.sydneyoperahouse.com",
        lat: -33.8568,
        lng: 151.2153,
      },
      {
        id: "bondi-beach",
        name: "Bondi Beach",
        category: "Nature",
        description:
          "Australia's most famous beach is a crescent of golden sand flanked by dramatic sandstone cliffs just 7 kilometres from the CBD. The Bondi to Coogee Coastal Walk offers six kilometres of breathtaking ocean scenery.",
        rating: 4.7,
        photo: "https://images.unsplash.com/photo-1523263685509-57c1d050d19b?w=600&q=80",
        discoverUrl: "https://www.sydney.com/destinations/sydney/sydney-east/bondi",
        lat: -33.8915,
        lng: 151.2767,
      },
      {
        id: "harbour-bridge",
        name: "Sydney Harbour Bridge",
        category: "Architecture",
        description:
          "The world's largest steel arch bridge, completed in 1932 and nicknamed 'The Coathanger' by locals. The BridgeClimb experience takes visitors to the summit 134 metres above sea level for unrivalled harbour panoramas.",
        rating: 4.8,
        photo: "https://images.unsplash.com/photo-1524293581917-878a6d017c71?w=600&q=80",
        discoverUrl: "https://www.bridgeclimb.com",
        lat: -33.8523,
        lng: 151.2108,
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────
     BRAZIL
  ───────────────────────────────────────────────────────── */
  {
    id: "rio-de-janeiro",
    name: "Rio de Janeiro",
    country: "Brazil",
    countryCode: "BR",
    heroPhoto: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80",
    attractions: [
      {
        id: "christ-redeemer",
        name: "Christ the Redeemer",
        category: "Architecture",
        description:
          "The 30-metre Art Deco statue atop Corcovado mountain is one of the New Seven Wonders of the World, with outstretched arms spanning 28 metres. The view of Rio's coastline, Sugarloaf Mountain, and Guanabara Bay is extraordinary.",
        rating: 4.9,
        photo: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80",
        discoverUrl: "https://corcovado.com.br/en/",
        lat: -22.9519,
        lng: -43.2105,
      },
      {
        id: "copacabana",
        name: "Copacabana Beach",
        category: "Nature",
        description:
          "A 4-kilometre arc of white sand backed by the iconic black-and-white wave-patterned promenade, Copacabana is the beating heart of Rio's beach culture. The mosaic boardwalk, designed by Roberto Burle Marx, is itself a work of art.",
        rating: 4.6,
        photo: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=600&q=80",
        discoverUrl: "https://www.visitbrasil.com/en/rio-de-janeiro/",
        lat: -22.9711,
        lng: -43.1823,
      },
      {
        id: "sugarloaf",
        name: "Sugarloaf Mountain",
        category: "Nature",
        description:
          "Two cable-car rides bring visitors to the 396-metre granite monolith jutting dramatically into Guanabara Bay. Sunset from the summit — watching the city lights come on over Christ the Redeemer across the bay — is genuinely magical.",
        rating: 4.7,
        photo: "https://images.unsplash.com/photo-1567889900546-88a834eb1e3a?w=600&q=80",
        discoverUrl: "https://bondinho.com.br/en/home/",
        lat: -22.9488,
        lng: -43.1574,
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────
     MOROCCO
  ───────────────────────────────────────────────────────── */
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    countryCode: "MA",
    heroPhoto: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80",
    attractions: [
      {
        id: "djemaa-el-fna",
        name: "Djemaa el-Fna Square",
        category: "Culture",
        description:
          "UNESCO-listed as Intangible Cultural Heritage, this ancient square transforms throughout the day from a market of juice sellers and snake charmers into a vast open-air theatre of storytellers, musicians, and food stalls at night.",
        rating: 4.7,
        photo: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&q=80",
        discoverUrl: "https://en.wikipedia.org/wiki/Djemaa_el-Fna",
        lat: 31.6259,
        lng: -7.9891,
      },
      {
        id: "majorelle-garden",
        name: "Majorelle Garden & YSL Museum",
        category: "Art",
        description:
          "A botanical masterpiece created by French painter Jacques Majorelle and later restored by Yves Saint Laurent, featuring striking cobalt blue buildings, over 300 plant species, and the compelling Berber Museum.",
        rating: 4.6,
        photo: "https://images.unsplash.com/photo-1548813395-eb7d42ae6e91?w=600&q=80",
        discoverUrl: "https://www.jardinmajorelle.com/ang/",
        lat: 31.6416,
        lng: -8.0036,
      },
      {
        id: "medina-souks",
        name: "Medina Souks",
        category: "Culture",
        description:
          "Getting lost in the ancient medina's labyrinthine souks is one of travel's great sensory adventures — a maze of alleyways organised by trade, from spice merchants and leather tanners to brassware artisans and carpet weavers.",
        rating: 4.5,
        photo: "https://images.unsplash.com/photo-1559087867-ce4c91325525?w=600&q=80",
        discoverUrl: "https://www.visitmorocco.com/en/travel/marrakech",
        lat: 31.6310,
        lng: -7.9869,
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────
     INDIA
  ───────────────────────────────────────────────────────── */
  {
    id: "agra",
    name: "Agra",
    country: "India",
    countryCode: "IN",
    heroPhoto: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
    attractions: [
      {
        id: "taj-mahal",
        name: "Taj Mahal",
        category: "Architecture",
        description:
          "Commissioned by Mughal emperor Shah Jahan as a mausoleum for his beloved wife Mumtaz Mahal, this UNESCO World Heritage ivory-white marble complex is universally regarded as the world's most perfect building.",
        rating: 5.0,
        photo: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",
        discoverUrl: "https://www.tajmahal.gov.in",
        lat: 27.1751,
        lng: 78.0421,
      },
      {
        id: "agra-fort",
        name: "Agra Fort",
        category: "History",
        description:
          "A UNESCO-listed red sandstone citadel on the banks of the Yamuna River, the Agra Fort served as the main residence of Mughal emperors for generations. Shah Jahan spent his final years imprisoned here, gazing at the Taj Mahal.",
        rating: 4.6,
        photo: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80",
        discoverUrl: "https://www.agrafort.gov.in",
        lat: 27.1795,
        lng: 78.0211,
      },
      {
        id: "fatehpur-sikri",
        name: "Fatehpur Sikri",
        category: "History",
        description:
          "A ghost city of extraordinary beauty — Emperor Akbar's perfectly preserved 16th-century capital, abandoned after just 14 years due to water scarcity. The Jama Masjid and Buland Darwaza gateway are masterpieces of Mughal architecture.",
        rating: 4.5,
        photo: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80",
        discoverUrl: "https://www.incredibleindia.org/content/incredible-india-v2/en/destinations/agra/fatehpur-sikri.html",
        lat: 27.0945,
        lng: 77.6632,
      },
    ],
  },
  {
    id: "jaipur",
    name: "Jaipur",
    country: "India",
    countryCode: "IN",
    heroPhoto: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800&q=80",
    attractions: [
      {
        id: "hawa-mahal",
        name: "Hawa Mahal (Palace of Winds)",
        category: "Architecture",
        description:
          "The extraordinary five-storey honeycomb façade with 953 small windows was designed so royal ladies could observe street life without being seen. Built in 1799 in pink sandstone, it is the defining image of the Pink City.",
        rating: 4.6,
        photo: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=600&q=80",
        discoverUrl: "https://www.rajasthantourism.gov.in/destination/jaipur.html",
        lat: 26.9239,
        lng: 75.8267,
      },
      {
        id: "amber-fort",
        name: "Amber Fort",
        category: "History",
        description:
          "Perched dramatically on a hillside 11 kilometres from Jaipur, this magnificent Rajput fort blends Hindu and Mughal architectural styles with stunning effect. The Sheesh Mahal mirror palace glitters like a sky full of stars in candlelight.",
        rating: 4.8,
        photo: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80",
        discoverUrl: "https://www.amberfort.org",
        lat: 26.9855,
        lng: 75.8513,
      },
    ],
  },
];

export const COUNTRIES = [...new Set(DESTINATIONS.map((d) => d.country))].sort();
export const getCitiesByCountry = (country: string) =>
  DESTINATIONS.filter((d) => d.country === country);
export const getCityById = (id: string) =>
  DESTINATIONS.find((d) => d.id === id);

/* ─────────────────────────────────────────────────────────
   City coordinates for Google Places API (lat/lng)
───────────────────────────────────────────────────────── */
export const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "paris":           { lat: 48.8566,  lng: 2.3522   },
  "nice":            { lat: 43.7102,  lng: 7.2620   },
  "tokyo":           { lat: 35.6762,  lng: 139.6503 },
  "kyoto":           { lat: 35.0116,  lng: 135.7681 },
  "rome":            { lat: 41.9028,  lng: 12.4964  },
  "venice":          { lat: 45.4408,  lng: 12.3155  },
  "dubai":           { lat: 25.2048,  lng: 55.2708  },
  "new-york":        { lat: 40.7128,  lng: -74.0060 },
  "san-francisco":   { lat: 37.7749,  lng: -122.4194},
  "sydney":          { lat: -33.8688, lng: 151.2093 },
  "rio-de-janeiro":  { lat: -22.9068, lng: -43.1729 },
  "marrakech":       { lat: 31.6295,  lng: -7.9811  },
  "agra":            { lat: 27.1767,  lng: 78.0081  },
  "jaipur":          { lat: 26.9124,  lng: 75.7873  },
};