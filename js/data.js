/* ================================================================
   CulturAI — Data Layer
   India-First Cultural Dataset
   ================================================================ */

const CULTURAI_DATA = {

  /* ── Destinations ─────────────────────────────────────── */
  destinations: [
    { id: 'rajasthan', name: 'Rajasthan', emoji: '🏰', region: 'North India', tagline: 'Land of Kings & Living Legends', vibe: ['mystical','festivals','colonial'] },
    { id: 'kerala',    name: 'Kerala',    emoji: '🌴', region: 'South India', tagline: 'Where Spice Meets Serenity',     vibe: ['culinary','mystical','art'] },
    { id: 'varanasi',  name: 'Varanasi',  emoji: '🪔', region: 'North India', tagline: 'The Eternal City on the Ganga', vibe: ['mystical','festivals','art'] },
    { id: 'hampi',     name: 'Hampi',     emoji: '🗿', region: 'South India', tagline: 'Empire Frozen in Stone',        vibe: ['forgotten','colonial','art'] },
    { id: 'ladakh',    name: 'Ladakh',    emoji: '⛰️', region: 'North India', tagline: 'Roof of the World',            vibe: ['mystical','forgotten','culinary'] },
    { id: 'kolkata',   name: 'Kolkata',   emoji: '🎨', region: 'East India',  tagline: 'City of Joy & Intellect',      vibe: ['art','festivals','colonial'] },
  ],

  /* ── Places ───────────────────────────────────────────── */
  places: {
    rajasthan: [
      {
        id: 'mehrangarh',
        name: 'Mehrangarh Fort',
        location: 'Jodhpur, Rajasthan',
        emoji: '🏰',
        lat: 26.2980, lng: 73.0188,
        type: 'Heritage Fort',
        vibes: ['mystical', 'colonial'],
        tags: ['Mughal Wars', 'Rajput Architecture', 'Panoramic Views', 'Haunted Legends'],
        rating: 4.9,
        isHiddenGem: false,
        shortDesc: 'Rising 400 feet above Jodhpur on a rocky hill, Mehrangarh\'s walls contain centuries of betrayal, resilience, and royal opulence.',
        whisper: [
          "I am Mehrangarh. In 1459, when Rao Jodha climbed this barren hill seeking refuge from his enemies, he did not see rock. He saw prophecy. His chieftain whispered: 'This height will outlast empires.' So they built me — not with mortar, but with ambition compressed into stone.",
          "Within my walls, I held the screams of queens during Johar, when fire became more merciful than conquest. I held the silence of musicians playing for kings who knew their last sunrise. I held the laughter of children who grew into warriors who returned to me, broken or victorious, always home.",
          "Today, when the Blue City spreads below me like a sapphire fallen from the sky, I remember: I was not built to last forever. I was built to remember everything that happened before forever came."
        ],
        timeline: [
          { year: '1459 CE', text: 'Rao Jodha founds Jodhpur and begins construction of Mehrangarh on Bhaurcheeria hill.' },
          { year: '1678 CE', text: 'Maharaja Jaswant Singh enlarges the fort; elaborate jharokhas and palace chambers added.' },
          { year: '1806 CE', text: 'Mehrangarh withstands siege by Maratha forces. The outer cannon marks remain.' },
          { year: '1972 CE', text: 'Converted to a museum — one of India\'s finest — preserving royal palanquins, armory, and miniature paintings.' },
        ],
        guides: [
          { name: 'Vikram Singh', role: 'Royal Historian & Storyteller', rating: '4.9 ⭐', avatar: '🧔‍♂️' },
          { name: 'Meera Rathore', role: 'Rajput Heritage Expert', rating: '5.0 ⭐', avatar: '👩' },
        ]
      },
      {
        id: 'jaisalmer',
        name: 'Jaisalmer — The Living Fort',
        location: 'Jaisalmer, Rajasthan',
        emoji: '🌅',
        lat: 26.9124, lng: 70.9072,
        type: 'Living Citadel',
        vibes: ['mystical', 'culinary'],
        tags: ['Desert Trade Routes', 'Living Fort', 'Haveli Architecture', 'Silk Road Legacy'],
        rating: 4.8,
        isHiddenGem: false,
        shortDesc: 'One of the world\'s last inhabited forts — where 3,000 people still live inside 12th-century golden sandstone walls.',
        whisper: [
          "I am Jaisalmer, and I am still breathing. While other forts became museums, I remained a city. Merchants still grind cumin on my courtyards. Children chase pigeons through my arched gates. Old women sing at dusk from windows that have heard the same song for eight hundred years.",
          "I was born from the silk road's dust. Camel caravans from Persia, Central Asia, and China rested within me. They left behind spices, languages, music — and I absorbed them all into my golden sandstone pores. The color of my walls at sunset is not paint. It is memory, made visible by light.",
          "Stand at my battlements when the Thar Desert exhales after midnight. You will hear what the merchants heard: absolute silence, and somewhere within it, the exact sound of the universe deciding to continue."
        ],
        timeline: [
          { year: '1156 CE', text: 'Rao Jaisal founds the fort city on Trikuta Hill. Trade caravans make it prosperous.' },
          { year: '14th c.', text: 'Repeated sieges by Delhi Sultanate. Johar — mass self-immolation — occurs twice.' },
          { year: '17th c.', text: 'Golden age: wealthy Jain merchants build elaborate multi-story havelis.' },
          { year: 'Today', text: 'The only fully inhabited fort in the world. 3,000 residents live inside its walls.' },
        ],
        guides: [
          { name: 'Arjun Bhati', role: 'Desert Culture & Trade Route Expert', rating: '4.8 ⭐', avatar: '🧑‍🦲' },
        ]
      },
      {
        id: 'pushkar',
        name: 'Pushkar\'s Sacred Ghats',
        location: 'Pushkar, Rajasthan',
        emoji: '🪷',
        lat: 26.4899, lng: 74.5518,
        type: 'Sacred Town',
        vibes: ['mystical', 'festivals'],
        tags: ['Brahma Temple', 'Sacred Lake', 'Sufi Music', 'Camel Fair'],
        rating: 4.7,
        isHiddenGem: false,
        shortDesc: 'One of the world\'s five holy dhams — a sacred lake ringed by 52 ghats where priests have performed rituals for over 2,000 years.',
        whisper: [
          "I am Pushkar Lake, and I did not form — I fell. From the lotus of Lord Brahma, three petals dropped, and where each landed, water appeared. For over two thousand years, priests have waded into me at dawn to perform rituals that predate written language.",
          "In October, when the desert fills with camels and the air smells of marigold and smoke, I watch the world's oldest carnival unfold. Tribes from the Rann of Kutch bring their painted camels. Sufi singers sit at my ghats and make the stars vibrate. For one full moon, I am the center of the universe.",
          "Come to my edge before dawn. Sit with the priests who wash sins away with my water. I cannot promise the sins leave. But I can promise the stillness you feel in that hour — that is real. That is mine to give."
        ],
        timeline: [
          { year: '2000 BCE', text: 'Ancient texts mention Pushkar as a pilgrimage site for sages and kings.' },
          { year: '14th c.', text: 'Mughal emperor Aurangzeb destroys the original Brahma Temple; rebuilt by Marathas.' },
          { year: '1740 CE', text: 'Pushkar Camel Fair formalized, drawing traders from across the Thar Desert.' },
          { year: 'Today',   text: 'One of the world\'s largest camel fairs; 200,000 visitors during Kartik Purnima.' },
        ],
        guides: [
          { name: 'Priya Sharma', role: 'Vedic Ritual & Sacred Geography', rating: '4.9 ⭐', avatar: '👩‍🦱' },
        ]
      },
    ],

    kerala: [
      {
        id: 'alleppey',
        name: 'Alleppey Backwaters',
        location: 'Alappuzha, Kerala',
        emoji: '🛶',
        lat: 9.4981, lng: 76.3388,
        type: 'Waterway Ecosystem',
        vibes: ['culinary', 'mystical'],
        tags: ['Houseboat Culture', 'Toddy Shops', 'Rice Paddy Art', 'Chinese Fishing Nets'],
        rating: 4.8,
        isHiddenGem: false,
        shortDesc: 'A labyrinth of 900 km of waterways where time moves by the rhythm of paddles and monsoon rains.',
        whisper: [
          "I am the backwaters of Kerala, and I have no beginning. I flow into myself, turn back, and flow again. For centuries, fishermen have read me like scripture — which channel floods in August, where the fish go when the rains come early, how the coir smells different before a storm.",
          "The kettuvallams — the great rice boats — were once the freight trains of this land. Now they carry travelers searching for the silence I have always offered. I don't mind. Silence, I have endless amounts of.",
          "When a houseboat drifts through me at 5 AM and a lone farmer stands knee-deep transplanting paddy while egrets circle overhead — that image has been happening here for a thousand years. You are not witnessing scenery. You are witnessing ceremony."
        ],
        timeline: [
          { year: '900 CE',  text: 'Kerala\'s backwater trade routes established under the Chera dynasty.' },
          { year: '14th c.', text: 'Chinese traders introduce fishing nets (still used today) along the Vembanad Lake.' },
          { year: '1800s',   text: 'British develop coconut coir industry; backwater economy flourishes.' },
          { year: 'Today',   text: 'Alleppey houseboat industry generates 40% of Kerala\'s tourism revenue.' },
        ],
        guides: [
          { name: 'Jose Kuriakose', role: 'Backwater Ecology & Coir Heritage', rating: '4.9 ⭐', avatar: '👨' },
        ]
      },
      {
        id: 'theyyam',
        name: 'Theyyam Ritual Grounds',
        location: 'Kannur, Kerala',
        emoji: '🎭',
        lat: 11.8745, lng: 75.3704,
        type: 'Living Ritual',
        vibes: ['mystical', 'art'],
        tags: ['Possession Ritual', 'Tribal Art', 'Oral Tradition', '400+ Forms'],
        rating: 4.9,
        isHiddenGem: true,
        shortDesc: 'A 2,000-year-old shamanistic ritual where performers become living deities — witnessed by few outsiders.',
        whisper: [
          "I am Theyyam, and I do not perform. I become. When the drumbeats begin and the dancer's headdress rises twenty feet above the ground, something that cannot be explained by language enters the body of a man who was making coconut chutney three hours ago.",
          "The tribal communities of Malabar did not invent me to entertain. They invented me to communicate directly with ancestors who refuse to leave. I am grief transformed into costume. I am prayer transformed into dance. I am the insistence that the dead deserve more than silence.",
          "If you come to witness Theyyam, leave your camera outside your mind first. Come in with your full nervous system. Let the drums work on your chest cavity for twenty minutes. Then tell me whether what you see is performance."
        ],
        timeline: [
          { year: '800 CE',  text: 'Theyyam rituals documented in ancient Malayalam texts as shamanistic practices.' },
          { year: '14th c.', text: 'Over 400 distinct Theyyam forms develop across 1,200 sacred groves in Kannur.' },
          { year: '1960s',   text: 'Feared to be dying under modernization; community-led revival begins.' },
          { year: 'Today',   text: 'Active in 800+ locations from November to May. Still practiced by hereditary performers.' },
        ],
        guides: [
          { name: 'Rajan Parayi', role: '3rd Generation Theyyam Performer & Scholar', rating: '5.0 ⭐', avatar: '🧔' },
        ]
      }
    ],

    varanasi: [
      {
        id: 'manikarnika',
        name: 'Manikarnika Ghat',
        location: 'Varanasi, Uttar Pradesh',
        emoji: '🪔',
        lat: 25.3087, lng: 83.0105,
        type: 'Sacred Cremation Ground',
        vibes: ['mystical', 'art'],
        tags: ['Eternal Fire', 'Funeral Rites', 'Life & Death', 'Moksha'],
        rating: 4.9,
        isHiddenGem: false,
        shortDesc: 'The burning ghat where the funeral pyres have not extinguished for over 3,500 years — the oldest continuously maintained fire on earth.',
        whisper: [
          "I am Manikarnika, and I have not slept in 3,500 years. The fire that burns here has never been extinguished. Not during floods that swallowed the steps. Not during invasions. Not when the priests themselves were dying. The fire continued.",
          "People come here afraid of death, and I make them afraid of wasting life instead. The smoke that rises from my pyres is not tragedy. It is conclusion. Every Hindu who is cremated here believes they achieve moksha — final liberation from the cycle of rebirth. What I offer is not an ending. It is graduation.",
          "Sit at my steps before dawn. Watch the boatman who has rowed these waters for forty years, watching the same fires he watched when his father rowed here. And understand: continuity itself is a form of sacred. The ordinary, repeated with devotion, becomes holy."
        ],
        timeline: [
          { year: '1500 BCE', text: 'Varanasi established as sacred Shiva territory; cremation grounds documented in Vedas.' },
          { year: '500 BCE',  text: 'Gautama Buddha gives his first sermon at nearby Sarnath; Varanasi becomes crossroads of faiths.' },
          { year: '1194 CE',  text: 'Muhammad Ghori sacks Varanasi; all temples destroyed. Ghats remain active through occupation.' },
          { year: 'Today',    text: '32,000 cremations annually. Fire maintained 24/7. Electric crematoriums refused by most families.' },
        ],
        guides: [
          { name: 'Pandit Ram Narayan', role: 'Vedic Scholar & Ghat Historian', rating: '5.0 ⭐', avatar: '🧓' },
          { name: 'Kavita Mishra',      role: 'Craft & Textile Heritage of Varanasi', rating: '4.8 ⭐', avatar: '👩‍🦳' },
        ]
      }
    ],

    hampi: [
      {
        id: 'virupaksha',
        name: 'Virupaksha Temple Complex',
        location: 'Hampi, Karnataka',
        emoji: '🗿',
        lat: 15.3350, lng: 76.4600,
        type: 'Empire Ruins',
        vibes: ['forgotten', 'art'],
        tags: ['Vijayanagara Empire', 'Dravidian Architecture', 'Elephant Stables', 'Stone Chariot'],
        rating: 4.9,
        isHiddenGem: false,
        shortDesc: 'The ruins of the Vijayanagara Empire — once one of the world\'s largest cities with a million inhabitants, now silent boulder-strewn landscape.',
        whisper: [
          "I am Hampi, and I was the second-largest city in the world in 1500 CE. One million souls lived within my walls. The Portuguese merchants who visited wrote home that I made Lisbon look like a village. Then in 1565, a coalition of Deccan sultanates came, and in six months of burning, they reduced a century of civilization to what you see today.",
          "But listen carefully to the silence here. It is not empty silence. It is an archive. Every boulder has been touched by hands that also built temples and traded spices and danced at festivals I remember but cannot describe without weeping.",
          "The stone chariot in front of the Vittala Temple still has its wheels. Touch them. The craftsman who carved those wheels in 1513 was thinking about eternity. He was right about that — just wrong about which empire would host it."
        ],
        timeline: [
          { year: '1336 CE', text: 'Harihara I founds the Vijayanagara Empire at Hampi on the Tungabhadra River.' },
          { year: '1510 CE', text: 'At its peak: population 500,000–1.7 million. Largest empire south of the Vindhyas.' },
          { year: '1565 CE', text: 'Battle of Talikota. Deccan Sultanates defeat and destroy Vijayanagara over 6 months.' },
          { year: '1986 CE', text: 'UNESCO World Heritage Site designation. 1,600 monuments documented across 4,100 hectares.' },
        ],
        guides: [
          { name: 'Dr. Suresh Bellary', role: 'Vijayanagara Archaeological Expert', rating: '4.9 ⭐', avatar: '👨‍🏫' },
        ]
      }
    ],
  },

  /* ── Hidden Gems ──────────────────────────────────────── */
  hiddenGems: {
    rajasthan: [
      { id: 'bundi', name: 'Bundi — The Forgotten Blue City', emoji: '💙', lat: 25.4395, lng: 75.6493, desc: 'A crumbling palace city with step-wells older than the Taj — visited by only 2,000 tourists a year vs. 8 million at Jodhpur.' },
      { id: 'osian', name: 'Osian Temple Cluster', emoji: '⛩️', lat: 26.7318, lng: 72.9014, desc: 'Jain and Brahminical temples from the 8th century in a living desert village — no entrance fees, no crowds, no ticket counters.' },
      { id: 'khimsar', name: 'Khimsar Sand Dunes', emoji: '🏜️', lat: 27.0162, lng: 73.9840, desc: 'The Thar Desert experience, minus the tourist infrastructure — village families who\'ve lived among dunes for 600 years.' },
      { id: 'ramdevra', name: 'Ramdevra Pilgrimage Town', emoji: '🕌', lat: 27.0383, lng: 71.8880, desc: 'Every August, 1.5 million pilgrims walk barefoot across the desert to this town. Absolutely unknown to international travelers.' },
    ],
    kerala: [
      { id: 'wayanad-kuruva', name: 'Kuruva Island River Delta', emoji: '🌿', lat: 11.8101, lng: 76.1366, desc: 'A protected river delta accessible only by bamboo raft — home to 200+ bird species and Adivasi tribal families.' },
      { id: 'kalpetta-whisper', name: 'Edakkal Caves Petroglyphs', emoji: '🪨', lat: 11.5183, lng: 76.0905, desc: 'Neolithic and Mesolithic carvings — 6,000 years old — in a cave that requires climbing boulders to find. Maps don\'t work here.' },
    ],
    varanasi: [
      { id: 'sarnath', name: 'Sarnath Excavation Gardens', emoji: '☸️', lat: 25.3814, lng: 83.0238, desc: 'Where Buddha gave his first sermon. The actual Dhamekha Stupa is older than the Roman Colosseum. Locals picnic here.' },
      { id: 'lalita-ghat', name: 'Lalita Ghat at 4 AM', emoji: '🌅', lat: 25.3157, lng: 83.0115, desc: 'The one ghat untouched by tourist boats. A Nepali temple, a widow\'s prayer, and absolute silence before dawn.' },
    ],
    hampi: [
      { id: 'anegundi', name: 'Anegundi — Kishkinda Kingdom', emoji: '🐒', lat: 15.3524, lng: 76.4705, desc: 'Across the river from Hampi — the mythological site of the monkey kingdom from the Ramayana. Completely unrestored.' },
      { id: 'daroji', name: 'Daroji Sloth Bear Sanctuary', emoji: '🐻', lat: 15.1667, lng: 76.5167, desc: 'A sanctuary where sloth bears come to a specific boulder every evening at 5 PM. Discovered by local shepherds.' },
    ],
  },

  /* ── Events ───────────────────────────────────────────── */
  events: [
    {
      id: 'pushkar-camel',
      name: 'Pushkar Camel Fair',
      location: 'Pushkar, Rajasthan',
      emoji: '🐪',
      date: 'Nov 1–9, 2026',
      vibe: 'festivals',
      badge: 'badge-gold',
      context: 'The world\'s largest camel fair began as a livestock trading event in the 12th century. Today, 50,000 camels and 200,000 people converge on Pushkar for one sacred full-moon night — a collision of commerce, devotion, music, and desert mythology that has no parallel on Earth.',
      category: 'Annual Festival',
      attendance: '200,000+',
    },
    {
      id: 'theyyam-season',
      name: 'Theyyam Season Opens',
      location: 'Kannur, Kerala',
      emoji: '🎭',
      date: 'Nov 15, 2026',
      vibe: 'mystical',
      badge: 'badge-purple',
      context: 'From mid-November to mid-May, the 2,000-year-old Theyyam possession ritual begins across 800+ sacred groves in northern Kerala. Each performance invokes a different deity through hereditary performers who undergo days of fasting and preparation. The boundary between ritual and reality dissolves.',
      category: 'Living Ritual Season',
      attendance: 'Intimate — Village Scale',
    },
    {
      id: 'varanasi-dev-diwali',
      name: 'Dev Diwali — Varanasi',
      location: 'Varanasi, Uttar Pradesh',
      emoji: '🪔',
      date: 'Nov 5, 2026',
      vibe: 'mystical',
      badge: 'badge-amber',
      context: 'Fifteen days after regular Diwali, Varanasi celebrates Dev Diwali — when the gods themselves descend to bathe in the Ganga. One million oil lamps are lit simultaneously across all 88 ghats while fireworks reflect on the river. It is the most visually overwhelming spectacle in Indian religious life.',
      category: 'Sacred Festival',
      attendance: '~1,000,000',
    },
    {
      id: 'rann-utsav',
      name: 'Rann Utsav — White Desert',
      location: 'Kutch, Gujarat',
      emoji: '🌕',
      date: 'Nov 1, 2026 – Feb 28, 2027',
      vibe: 'art',
      badge: 'badge-teal',
      context: 'During winter, the Great Rann of Kutch — the world\'s largest salt desert — transforms into an open-air museum of Kutchi tribal art. Under full moon nights, the white salt flats become surreal. Artisans from 18 craft traditions sell directly from their villages. A three-month festival of the world\'s most underrated craft culture.',
      category: 'Cultural Festival',
      attendance: 'Rolling — 4 months',
    },
    {
      id: 'hampi-utsav',
      name: 'Hampi Utsav — Ruins Come Alive',
      location: 'Hampi, Karnataka',
      emoji: '🎪',
      date: 'Nov 3–5, 2026',
      vibe: 'art',
      badge: 'badge-sage',
      context: 'For three nights, classical Carnatic music, Bharatanatyam dance, and traditional Vijayanagara folk performances are staged among the actual ruins of the 500-year-old empire. The ancient stone chariot serves as a backdrop. This is what history feels like when it decides to breathe again.',
      category: 'Heritage Festival',
      attendance: '15,000',
    },
    {
      id: 'onam-kerala',
      name: 'Onam — Kerala\'s Grand Harvest',
      location: 'Thrissur, Kerala',
      emoji: '🌸',
      date: 'Aug 27, 2027',
      vibe: 'culinary',
      badge: 'badge-rose',
      context: 'Onam celebrates the mythical return of the benevolent demon-king Mahabali, who loved his people so deeply that the gods grew jealous. For ten days, elaborate flower carpets (pookalam) are crafted daily, the Vallamkali snake boat race draws 100,000 spectators, and every household serves a 26-dish vegetarian feast on a banana leaf.',
      category: 'National Harvest Festival',
      attendance: 'State-Wide',
    },
  ],

  /* ── Cultural DNA Config ──────────────────────────────── */
  dnaTraits: [
    { id: 'heritage', label: 'Heritage Seeker',     emoji: '🏛️', color: '#C9A96E', pct: 62, fill: 'linear-gradient(90deg,#C9A96E,#D4773A)' },
    { id: 'culinary', label: 'Culinary Explorer',   emoji: '🍛', color: '#E8627A', pct: 48, fill: 'linear-gradient(90deg,#E8627A,#D4773A)' },
    { id: 'mystical', label: 'Mystical Wanderer',   emoji: '🔮', color: '#8B7CF6', pct: 71, fill: 'linear-gradient(90deg,#8B7CF6,#6B5CE7)' },
    { id: 'art',      label: 'Art & Culture Seeker',emoji: '🎨', color: '#4ECDC4', pct: 55, fill: 'linear-gradient(90deg,#4ECDC4,#44B3A8)' },
    { id: 'hidden',   label: 'Hidden Gem Finder',   emoji: '💎', color: '#7FB069', pct: 83, fill: 'linear-gradient(90deg,#7FB069,#5E9948)' },
    { id: 'story',    label: 'Story Collector',      emoji: '📜', color: '#E8C47A', pct: 66, fill: 'linear-gradient(90deg,#E8C47A,#C9A96E)' },
  ],

  savedTrails: [
    { name: 'Rajasthan Mystical Circuit', emoji: '🏰', places: 7,  date: 'Saved Jun 2026' },
    { name: 'Kerala Coastal Culture',     emoji: '🌴', places: 5,  date: 'Saved May 2026' },
    { name: 'Varanasi Dawn Experience',   emoji: '🪔', places: 4,  date: 'Saved Apr 2026' },
    { name: 'Hampi Empire Ruins Walk',    emoji: '🗿', places: 6,  date: 'Saved Mar 2026' },
  ],

  /* ── Vibe Config ──────────────────────────────────────── */
  vibes: [
    { id: 'mystical',   emoji: '🔮', name: 'Mystical & Spiritual',    desc: 'Sacred sites, rituals & timeless devotion',  cls: 'vibe-mystical' },
    { id: 'art',        emoji: '🎨', name: 'Art & Street Culture',    desc: 'Folk art, craft villages & living traditions', cls: 'vibe-art'      },
    { id: 'culinary',   emoji: '🍛', name: 'Culinary Heritage',       desc: 'Ancient recipes & dying food traditions',     cls: 'vibe-culinary' },
    { id: 'forgotten',  emoji: '🏚️', name: 'Forgotten & Abandoned',  desc: 'Lost empires & off-the-map ruins',            cls: 'vibe-forgotten'},
    { id: 'festivals',  emoji: '🎭', name: 'Festivals & Rituals',     desc: 'Ceremonies that predate written history',     cls: 'vibe-festivals'},
    { id: 'colonial',   emoji: '📜', name: 'Colonial & Conflict',     desc: 'Layers of conquest, resistance & rebuilding', cls: 'vibe-colonial' },
  ],

  /* ── Gemini Story Prompts (used in mock + real API) ───── */
  generateStoryPrompt(placeName, context) {
    return `You are a poetic AI narrator for CulturAI, a cultural travel platform. Generate a deeply immersive "Whisper of the Place" — a first-person narrative written as if ${placeName} itself is speaking to a visitor.

The narrative must:
- Be written in first person as the place itself ("I am ${placeName}...")  
- Be 3 paragraphs, each 4-6 sentences
- Weave in specific historical events, cultural significance, and sensory details
- Have a profound, literary quality — inspired by Pico Iyer and Amitav Ghosh
- End with a direct, intimate invitation or observation to the visitor
- Context: ${context}

Return only the 3 paragraphs. No titles or labels.`;
  },

  generateTrailPrompt(destination, vibe) {
    return `Generate a curated cultural trail for ${destination}, India, focused on the "${vibe}" cultural vibe. Include 5-6 places, mixing well-known heritage sites with 1-2 hidden gems. For each place, provide: name, type, a one-line evocative description, and 3 relevant tags. Return as JSON array.`;
  }
};

// Export for use
if (typeof module !== 'undefined') module.exports = CULTURAI_DATA;
