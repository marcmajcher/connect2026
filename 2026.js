const num_entries = 46;

let score = 0;
let mistakes = 0;
let selected = 0; // The currently selected button, if any.

// A list of (word, category) pairs
const wordlist = [];

// The categories
const cats = {

	"Activists": ["Mother Jones", "Toussaint Louverture", "Amílcar Cabral", "Rosa Parks", "Harriet Tubman", "Leo Tolstoy", "Lech Wałęsa", "Kwame Nkrumah", "Gloria Steinem", "Martin Luther King Jr.", "W. E. B. Du Bois", "Emmeline Pankhurst", "Jane Addams", "Nelson Mandela", "Karl Marx", "Fannie Lou Hamer", "Andrei Sakharov", "Simone de Beauvoir", "Audre Lorde", "Mahatma Gandhi", "Rosa Luxemburg", "Frederick Douglass", "Thomas Sankara", "Eugene V. Debs", "Ida B. Wells", "Angela Davis", "Susan B. Anthony", "Chico Mendes", "Frantz Fanon", "Dorothy Day", "César Chávez", "Václav Havel", "Sojourner Truth", "bell hooks", "Ella Baker", "John Lewis", "Rachel Carson", "Hannah Arendt", "A. Philip Randolph", "Wangari Maathai", "Mary Wollstonecraft", "Thich Nhat Hanh", "Malcolm X", "Greta Thunberg", "William Lloyd Garrison", "Friedrich Engels"],
	"Cities in Michigan": ["Detroit", "Grand Rapids", "Sterling Heights", "Ann Arbor", "Lansing", "Dearborn", "Livonia", "Macomb", "Westland", "Farmington Hills", "Flint", "Wyoming", "Kalamazoo", "Pontiac", "Taylor", "Dearborn Heights", "St. Clair Shores", "Royal Oak", "Kentwood", "Battle Creek", "Roseville", "Chesterfield", "East Lansing", "Saginaw", "Midland", "Lincoln Park", "Muskegon", "Eastpointe", "Bay City", "Bedford", "Jackson", "Burton", "Southgate", "Oak Park", "Port Huron", "Madison Heights", "Allen Park", "Hamtramck", "Inkster", "Norton Shores", "Wyandotte", "Frenchtown", "Mount Pleasant", "Ypsilanti", "Ferndale", "Trenton"],
	"Animorph Titles": ["Invasion", "Visitor", "Encounter", "Message", "Predator", "Capture", "Stranger", "Secret", "Android", "Forgotten", "Reaction", "Andalite Chronicles", "Elfangor's Journey", "Alloran's Choice", "An Alien Dies", "Warning", "Underground", "Decision", "Departure", "Discovery", "Hork-Bajir Chronicles", "Pretender", "Suspicion", "Extreme", "Exposed", "Experiment", "Sickness", "Reunion", "Conspiracy", "Separation", "Illusion", "Prophecy", "Proposal", "Visser", "Mutation", "Weakness", "Familiar", "Unexpected", "Revelation", "Deception", "Resistance", "Ellimist Chronicles", "Diversion", "Ultimate", "Absolute", "Sacrifice"],
	"Kitchen Items": ["Aeropress", "Anban", "Blender", "Bottle Opener", "Bread Warmer", "Butter Bell", "Can opener", "Cherry Pitter", "Cookie Sheet", "Daunglan", "Decanter", "Dipper Well", "Egg Timer", "Flattop Grill", "Food Processor", "Honing Steel", "Immersion Blender", "Jar Opener", "Juicer", "Karuwa", "Knife Block", "Lemon Squeezer", "Magic Bullet", "Makitra", "Mandoline", "Mixer", "Mortar", "Kettle", "Oven Squirrel", "Oyster Glove", "Paila", "Pastry brush", "Pie bird", "Potholder", "Pudding Cloth", "Roasting Pan", "Salad Spinner", "Salt Pig", "Scotch hands", "Slow Cooker", "Strainer", "Spoon Rest", "Stock Pot", "Tortilla Warmer", "Vacuum Sealer", "Vegetable Peeler"],
	"Arts and Crafts Supplies": ["Acrylic Paint", "Buttons", "Cardstock", "Charcoal Stick", "Clothespins", "Colored Pencils", "Construction Paper", "Crayons", "Cutting Mat", "Elastic Cord", "Embroidery Floss", "Feathers", "Felt sheets", "Glitter", "Glue sticks", "Googly Eyes", "Hole Punch", "Hot Glue", "Ink Roller", "Jewelry Wire", "Markers", "Masking Tape", "Mod Podge", "Modeling Clay", "Oil Pastels", "Paint Brush", "Pipe Cleaners", "Plaster of Paris", "Plastic Beads", "Pom-Poms", "Popsicle Sticks", "Protractor", "PVA Glue", "Ribbon", "Scissors", "Sculpey", "Sculpting Tools", "Sequins", "Spray Adhesive", "Stencils", "Stickers", "Tracing Paper", "Washi Tape", "Watercolor Paint", "X-Acto Knife", "Yarn"],
	"Board Games": ["Agricola", "Arkham Horror", "Azul", "Backgammon", "Bohnanza", "Carcassonne", "Chess", "Codenames", "Concordia", "Cosmic Encounter", "Diplomacy", "Dixit", "Dominion", "Dune", "Gloomhaven", "Hanabi", "Hive", "John Company", "Kemet", "King of Tokyo", "Le Havre", "Lords of Vegas", "Monikers", "Monopoly", "Mysterium", "Reversi", "Pandemic", "Pax Pamir", "Power Grid", "Quoridor", "Race for the Galaxy", "Risk", "Root", "Scout", "Scrabble", "Spirit Island", "Splendor", "Stratego", "Tak", "Terra Mystica", "Through the Ages", "Tichu", "Ticket to Ride", "Twilight Imperium", "War of the Ring", "Wavelength"],
	"Bones": ["Atlas", "Axis", "Calcaneus", "Capitate", "Clavicle", "Coccyx", "Cuboid", "Ethmoid", "Femur", "Fibula", "Frontal", "Hamate", "Humerus", "Hyoid", "Ilium", "Incus", "Ischium", "Lacrimal", "Lunate", "Malleus", "Mandible", "Manubrium", "Maxilla", "Nasal", "Navicular", "Occipital", "Palatine", "Parietal", "Patella", "Pisiform", "Radius", "Sacrum", "Scaphoid", "Scapula", "Sphenoid", "Stapes", "Sternum", "Talus", "Temporal", "Tibia", "Trapezium", "Triquetrum", "Ulna", "Vomer", "Xiphoid", "Zygomatic"],
	"British Sitcoms": ["Fawlty Towers", "Dad’s Army", "Steptoe and Son", "Only Fools and Horses", "Yes Minister", "Open All Hours", "Are You Being Served?", "The Good Life", "Keeping Up Appearances", "Blackadder", "To the Manor Born", "Absolutely Fabulous", "The Vicar of Dibley", "One Foot in the Grave", "Drop the Dead Donkey", "Father Ted", "Goodness Gracious Me", "Coupling", "Spaced", "Stath Lets Flats", "Nighty Night", "Garth Marenghi’s Darkplace", "Nathan Barley", "The Mighty Boosh", "Psychoville", "League of Gentlemen", "Brass Eye", "Ghosts", "Fleabag", "Derry Girls", "Catastrophe", "Alma’s Not Normal", "Ever Decreasing Circles", "Love Thy Neighbour", "The Young Ones", "Filthy Rich & Catflap", "The IT Crowd", "Black Books", "Fresh Meat", "Bad Education", "Raised by Wolves", "Monty Python’s Flying Circus", "A Bit of Fry & Laurie", "The Catherine Tate Show", "The League of Gentlemen", "That Mitchell and Webb Look"],
	"Butterflies": ["Monarch", "Painted Lady", "Red Admiral", "Mourning Cloak", "Cabbage White", "Orange Sulphur", "Brimstone", "Zebra Longwing", "Gulf Fritillary", "Common Buckeye", "American Lady", "Question Mark", "Comma", "Viceroy", "Small Tortoiseshell", "Gatekeeper", "Ringlet", "Meadow Brown", "Speckled Wood", "Grayling", "Wall Brown", "Marbled White", "Glasswing", "Blue Morpho", "Malachite", "Leafwing", "Swallowtail", "Buckeye", "Hairstreak", "Skipper", "Metalmark", "Admiral", "Empress", "Sister", "Eggfly", "Rajah", "Begum", "Jezebel", "Wanderer", "Lacewing", "Sergeant", "Sailor", "Crow", "Glassy Tiger", "Clip­per", "Nawab"],
	"Candy": ["Snickers", "Milky Way", "Twix", "Kit Kat", "Skittles", "Starburst", "Butterfinger", "Baby Ruth", "3 Musketeers", "Almond Joy", "Mounds", "Skor", "Whoppers", "Milk Duds", "Tootsie Roll", "Charleston Chew", "Sugar Daddy", "Bit-O-Honey", "Zagnut", "Valomilk", "Caramello", "Rolo", "100 Grand", "Krackel", "Nerds", "Gobstoppers", "Laffy Taffy", "Bottle Caps", "Spree", "Pop Rocks", "Pixy Stix", "Fun Dip", "Swedish Fish", "Sour Patch Kids", "Gummy Worms", "Jelly Beans", "Mike and Ike", "Hot Tamales", "Twizzlers", "Turkish Delight", "Violet Crumble", "Aero", "Smarties", "Toblerone", "Pocky", "Hi-Chew"],
	"Chess Openings": ["Alapin", "Albin", "Alekhine", "Amar", "Anderssen", "Averbakh", "Balogh", "Barnes", "Benko", "Benoni", "Botvinnik", "Caro-Kann", "Chigorin", "Clemenz", "Colle", "Double Fianchetto", "Durkin", "Giuoco Piano", "Grob", "Grünfeld", "Keres", "Larsen", "Maroczy Bind", "Najdorf", "Nimzowitsch", "Panov", "Petroff", "Philidor", "Pirc", "Ponziani", "Réti", "Rubinstein", "Ruy Lopez", "Sämisch", "Saragossa", "Scheveningen", "Semi-Slav", "Spielmann", "Sveshnikov", "Taimanov", "Tarrasch", "Torre", "Trompowsky", "Van’t Kruijs", "Veresov", "Winawer"],
	"Comics": ["Maus", "Persepolis", "Ghost World", "Eightball", "Love and Rockets", "Asterios Polyp", "Palookaville", "Groo the Wanderer", "Daytripper", "Underwater Welder", "Good-Bye, Chunky Rice", "Scott Pilgrim", "On a Sunbeam", "Y: The Last Man", "Paper Girls", "Ex Machina", "The Walking Dead", "Invincible", "Black Science", "Deadly Class", "Monstress", "Descender", "Gideon Falls", "The Department of Truth", "Something Is Killing the Children", "The Nice House on the Lake", "Killadelphia", "Uzumaki", "My Favorite Thing Is Monsters", "Lucifer", "Hellblazer", "The Invisibles", "Doom Patrol", "American Splendor", "The Fabulous Furry Freak Brothers", "Omaha the Cat Dancer", "Cerebus", "Stray Bullets", "King-Cat Comics", "Watchmen", "Astro City", "Akira", "Lone Wolf and Cub", "Tekkonkinkreet", "Blacksad", "V For Vendetta"],
	"Constellations": ["Andromeda", "Antlia", "Aquarius", "Aries", "Boötes", "Camelopardalis", "Cancer", "Canis Major", "Capricornus", "Cassiopeia", "Centaurus", "Cetus", "Chamaeleon", "Cygnus", "Delphinus", "Dorado", "Draco", "Equuleus", "Eridanus", "Fornax", "Gemini", "Horologium", "Lacerta", "Leo", "Libra", "Lyra", "Musca", "Octans", "Ophiuchus", "Orion", "Pavo", "Corina", "Perseus", "Pictor", "Pisces", "Puppis", "Pyxis", "Reticulum", "Sagittarius", "Scorpius", "Serpens", "Taurus", "Tucana", "Virgo", "Volans", "Vulpecula"],
	"Dinosaurs and Megafauna": ["Tyrannosaurus", "Velociraptor", "Allosaurus", "Spinosaurus", "Carnotaurus", "Dilophosaurus", "Ceratosaurus", "Deinonychus", "Baryonyx", "Suchomimus", "Compsognathus", "Coelophysis", "Mononykus", "Archaeopteryx", "Anchiornis", "Yutyrannus", "Brachiosaurus", "Apatosaurus", "Diplodocus", "Camarasaurus", "Mamenchisaurus", "Iguanodon", "Hadrosaurus", "Lambeosaurus", "Corythosaurus", "Maiasaura", "Ankylosaurus", "Nodosaurus", "Triceratops", "Styracosaurus", "Protoceratops", "Stygimoloch", "Dracorex", "Stegosaurus", "Pteranodon", "Rhamphorhynchus", "Mosasaurus", "Plesiosaurus", "Ichthyosaurus", "Dimetrodon", "Cynognathus", "Megalodon", "Dunkleosteus", "Smilodon", "Megatherium", "Glyptodon"],
	"Dragons": ["Fafnir", "Níðhöggr", "Ladon", "Typhon", "Vritra", "Tiamat", "Bakunawa", "Glaurung", "Ancalagon", "Scatha", "Smaug", "The Lambton Worm", "Saphira", "Firnen", "Iskierka", "Mnementh", "Faranth", "Vermithrax Pejorative", "Toothless", "Falkor", "Bahamut", "Ashardalon", "Klauth", "Iymrith", "Beryllinthranox", "Khisanth", "Onysablet", "Malystryx", "Khellendros", "Gellidus", "Balerion", "Vhagar", "Meraxes", "Drogon", "Rhaegal", "Viserion", "Caraxes", "Syrax", "Meleys", "Sunfyre", "Alduin", "Paarthurnax", "Rathalos", "Shenron", "Mushu", "Orochi"],
	"Emotions": ["Happiness", "Delight", "Pleasure", "Elation", "Excitement", "Love", "Affection", "Tenderness", "Fondness", "Gratitude", "Appreciation", "Confidence", "Optimism", "Relief", "Contentment", "Peacefulness", "Tranquility", "Comfort", "Sadness", "Sorrow", "Grief", "Melancholy", "Loneliness", "Despair", "Hopelessness", "Guilt", "Shame", "Embarrassment", "Disappointment", "Frustration", "Irritation", "Annoyance", "Anger", "Rage", "Resentment", "Bitterness", "Jealousy", "Envy", "Distrust", "Contempt", "Disgust", "Revulsion", "Fear", "Terror", "Unease", "Apprehension"],
	"Extinct Animals": ["Atlas Bear", "Aurochs", "Bachman’s Warbler", "Bluebuck", "Bonin Thrush", "Bramble Cay Melomys", "Bubal Hartebeest", "Bulldog Rat", "Cape Verde Giant Skink", "Caribbean Monk Seal", "Carolina Parakeet", "Caspian Tiger", "Chinese Paddlefish", "Cuban Macaw", "Dodo", "Elephant Bird", "Golden Toad", "Great Auk", "Harelip Sucker", "Heath Hen", "Honshu Wolf", "Imperial Woodpecker", "Jamaican Giant Galliwasp", "Japanese Sea Lion", "Labrador Duck", "Laughing Owl", "Maclear’s Rat", "Moa", "Passenger Pigeon", "Pig-footed Bandicoot", "Pyrenean Ibex", "Quagga", "Reunion Ibis", "Rodrigues Solitaire", "Round Island Burrowing Boa", "Saint Helena Giant Earwig", "Sea Mink", "Slender-billed Curlew", "Steller’s Sea Cow", "Tarpan", "Tasmanian Tiger", "Tecopa Pupfish", "Thicktail Chub", "Toolache Wallaby", "Western Black Rhinoceros", "Yangtze River Dolphin"],
	"Fairy Tales": ["The Boots of Buffalo Leather", "Bremen Town Musicians", "Brother Lustig", "The Clever Little Tailor", "The Crumbs on the Table", "Death's Messengers", "The Devil's Sooty Brother", "Doctor Know-all", "Donkey Cabbages", "The Dragon and his Grandmother", "The Elves and the Shoemaker", "The Fisherman and His Wife", "Fitcher's Bird", "Frau Trude", "The Frog Prince", "The Girl Without Hands", "The Glass Coffin", "Godfather Death", "Hans My Hedgehog", "Hansel and Gretel", "The Hare's Bride", "The Hut in the Forest", "Iron John", "The Iron Stove", "King Thrushbeard", "Lazy Henry", "Looking for a Bride", "Maid Maleen", "Mother Hulda", "The Nixie of the Mill-Pond", "Old Hildrebrand", "The Old Woman in the Wood", "The Pied Piper of Hamelin", "Rapunzel", "The Robber Bridegroom", "Rumpelstiltskin", "The Sea-Hare", "The Singing Bone", "Snow White", "The Spirit in the Bottle", "Sweet Porridge", "Sweetheart Roland", "Thousandfurs", "Trusty John", "The Turnip", "The Wedding of Mrs. Fox"],
	"Famous Buildings": ["Eiffel Tower", "Fallingwater", "Leaning Tower of Pisa", "Burj Khalifa", "Empire State Building", "Sydney Opera House", "Notre-Dame Cathedral", "The Shard", "The Louvre", "Pompidou Centre", "Colosseum", "One World Trade Center", "Hearst Castle", "The Taj Mahal", "Big Ben", "Cathedral of Brasilia", "Edificio Metropolis", "Chrysler Building", "Kunsthaus Graz", "Heydar Aliyev Center", "The White House", "Gherkin Tower", "Sagrada Familia", "Petronas Towers", "Flatiron Building", "Sacre-Coeur Basilica", "Space Needle", "Tower Bridge", "Dancing House", "The Guggenheim", "Marina Bay Sands", "Reichstag Building", "Transamerica Pyramid", "Radio City Music Hall", "Lotus Temple", "Frost Tower", "Dome of the Rock", "Hagia Sophia", "Saint Basil's Cathedral", "Dresden Frauenkirche", "St Peter's Basilica", "CN Tower", "Brandenburg Gate", "Bibliotheca Alexandrina", "Burj Al Arab", "Angkor Wat"],
	"Female Scifi Authors": ["Octavia E. Butler", "Ursula K. Le Guin", "N. K. Jemisin", "Anne McCaffrey", "Margaret Atwood", "Connie Willis", "James Tiptree Jr.", "Becky Chambers", "Mary Shelley", "Joanna Russ", "Nnedi Okorafor", "Andre Norton", "C. J. Cherryh", "Martha Wells", "Ann Leckie", "Lois McMaster Bujold", "Suzanne Collins", "Tomi Adeyemi", "Leigh Bardugo", "Ariel Djanikian", "Madeleine L'Engle", "Sharon Shinn", "Pamela Sargent", "S. A. Chakraborty", "Maggie Stiefvater", "Julian May", "Marion Zimmer Bradley", "Mary Robinette Kowal", "Kelly Link", "Veronica Roth", "Kameron Hurley", "Elizabeth Moon", "Malka Older", "Mercedes Lackey", "Sheri S. Tepper", "Mary Doria Russell", "Gwyneth Jones", "Katherine Arden", "Pat Cadigan", "Melissa Scott", "Emily Tesh", "Rebecca M. Meluch", "Seanan McGuire", "Naomi Novik", "Nancy Kress", "R.F. Kuang"],
	"Pirates": ["Edward Teach", "Calico Jack", "Anne Bonny", "Mary Read", "Henry Morgan", "William Kidd", "Bartholomew Roberts", "Charles Vane", "Stede Bonnet", "Edward Low", "Thomas Tew", "Christopher Condent", "Olivier Levasseur", "Jean Lafitte", "Zheng Yi", "Cheung Po Tsai", "Hayreddin Barbarossa", "Sayyida al-Hurra", "Laurens de Graaf", "Michel de Grammont", "Roche Braziliano", "Daniel Montbars", "Jean-David Nau", "Benito de Soto", "Nathaniel Gordon", "Jean Fleury", "Klaus Störtebeker", "Gödeke Michels", "Howell Davis", "Richard Worley", "Thomas Anstis", "George Lowther", "Long John Silver", "Captain Flint", "Billy Bones", "Israel Hands", "Captain Hook", "Mr. Smee", "Jack Sparrow", "Hector Barbossa", "Will Turner", "Monkey D. Luffy", "Buggy the Clown", "Captain Blood", "Yellowbeard", "The Dread Pirate Roberts"],
	"Cannabis Strains": ["Acapulco Gold", "Afghan Kush", "Durban Poison", "Maui Wowie", "Panama Red", "Lamb’s Bread", "Northern Lights", "Super Silver Haze", "Jack Herer", "Trainwreck", "White Rhino", "Purple Kush", "Platinum OG", "Sour Diesel", "Blue Dream", "Purple Urkle", "Sunset Sherbet", "Wedding Cake", "Zkittlez", "Strawberry Cough", "Pineapple Express", "Tangie", "Lemon Skunk", "Orange Bud", "Wedding Pie", "Death Star", "Black Mamba", "Grape Ape", "LA Confidential", "Critical Mass", "Charlotte’s Web", "Cannatonic", "Pennywise", "Newer Designer Strains", "Permanent Marker", "Gary Payton", "London Pound Cake", "Cereal Milk", "Gelonade", "Tropicana Cookies", "Forbidden Fruit", "Miracle Alien Cookies", "Slurricane", "Jungle Cake", "Motorbreath", "Wedding Crasher"],
	"Herbs and Spices": ["Basil", "Oregano", "Thyme", "Rosemary", "Sage", "Parsley", "Cilantro", "Dill", "Tarragon", "Marjoram", "Bay leaf", "Lemon balm", "Sorrel", "Epazote", "Shiso", "Culantro", "Coriander", "Cumin", "Caraway", "Fennel", "Anise", "Star anise", "Fenugreek", "Ajwain", "Black pepper", "Allspice", "Clove", "Cinnamon", "Cassia", "Nutmeg", "Cardamom", "Mahleb", "Turmeric", "Ginger", "Galangal", "Saffron", "Annatto", "Paprika", "Cayenne", "Chili powder", "Gochugaru", "Sumac", "Za’atar", "Garam masala", "Curry powder", "Pandan"],
	"Islands": ["New Guinea", "Borneo", "Madagascar", "Sumatra", "Honshu", "Sulawesi", "Cuba", "Iceland", "Mindanao", "Hokkaido", "Sakhalin", "Sri Lanka", "Tasmania", "Svalbard", "Sardinia", "Sicily", "Corsica", "Crete", "Cyprus", "Rhodes", "Lesbos", "Ibiza", "Malta", "Fuerteventura", "Madeira", "Porto Santo", "São Miguel", "Terceira", "Bermuda", "Jamaica", "Puerto Rico", "Guadeloupe", "Dominica", "Martinique", "Saint Lucia", "Barbados", "Grenada", "Trinidad", "Tobago", "Aruba", "Bonaire", "Tahiti", "Bora Bora", "Vanua Levu", "Bali", "Timor"],
	"Knots": ["Alpine Butterfly", "Angler’s Loop", "Bachmann", "Bowline", "Buntline Hitch", "Carrick Bend", "Cat’s Paw", "Chinese Button", "Clove Hitch", "Cow Hitch", "Crown and Wall", "Double Coin", "Figure-Eight", "Fisherman’s Eye", "Flemish Bend", "Half Hitch", "Harness Loop", "Highwayman’s Hitch", "Hunter’s Bend", "Icicle Hitch", "Jug Sling", "Klemheist", "Lark’s Head", "Magnus Hitch", "Marlinespike Hitch", "Matthew Walker", "Monkey’s Fist", "Munter Hitch", "Noose", "Overhand", "Perfection Loop", "Prusik", "Reef Knot", "Rolling Hitch", "Sailor’s Knife", "Shakehands Bend", "Sheepshank", "Sheet Bend", "Square Lashing", "Stevedore", "Surgeon’s Loop", "Taut-Line Hitch", "Timber Hitch", "Turk’s Head", "West Country Whipping", "Zeppelin Bend"],
	"Languages": ["Icelandic", "Breton", "Basque", "Hungarian", "Romanian", "Bulgarian", "Serbian", "Croatian", "Albanian", "Arabic", "Hebrew", "Farsi", "Kurdish", "Hindi", "Urdu", "Punjabi", "Marathi", "Tamil", "Telugu", "Kannada", "Malayalam", "Malay", "Tagalog", "Mandarin", "Cantonese", "Swahili", "Amharic", "Yoruba", "Igbo", "Xhosa", "Hausa", "Quechua", "Aymara", "Nahuatl", "Klingon", "Dothraki", "High Valyrian", "Quenya", "Sindarin", "Black Speech", "Huttese", "Simlish", "Nadsat", "Esperanto", "Lojban", "Toki Pona"],
	"Martial Arts Styles": ["Aikido", "Baguazhang", "Bajiquan", "Bartitsu", "Boxing", "Brazilian Jiu-Jitsu", "Bujinkan Budo Taijutsu", "Dim Mak", "Drunken Boxing", "Eagle Claw", "Engolo", "Eskrima", "Five Animals Style", "Gatka", "Hapkido", "Hung Gar", "Iaido", "Istunka", "Jeet Kune Do", "Kajukenbo", "Kalaripayattu", "Kendo", "Krabi-Krabong", "Krav Maga", "Kuk Sool Won", "Kyudo", "Luta Livre", "Mardani Khel", "Monkey Kung Fu", "Muay Boran", "Ninjutsu", "Pencak Silat", "Pradal Serey", "Savate", "Seven Star Praying Mantis", "Shorinji Kempo", "Shuai Jiao", "Silat Harimau", "Systema", "Taekwondo", "Tai Chi", "Tang Soo Do", "Vajra Mushti", "White Crane", "Wing Chun", "Xingyiquan"],
	"Mushrooms": ["Amber Jelly", "Artist’s Conk", "Bear’s Head Tooth", "Bitter Bolete", "Black Trumpet", "Bleeding Tooth", "Brick Cap", "Charcoal Burner", "Chicken of the Woods", "Comb Tooth", "Cremini", "Crown-Tipped Coral", "Death Cap", "Destroying Angel", "Devil’s Fingers", "Dryad’s Saddle", "Fly Agaric", "Fool’s Webcap", "Funeral Bell", "Giant Funnel", "Giant Puffball", "Glistening Inkcap", "Golden Chanterelle", "Golden Teacher", "Green-Spored Parasol", "Indigo Milk Cap", "Jack-o’-Lantern", "Jelly Ear", "Lantern Stinkhorn", "Liberty Cap", "Lion’s Mane", "Maitake", "Morel", "Oak Bracket", "Porcini", "Portobello", "Psilocybe cubensis", "Scaly Hedgehog", "Scarlet Elf Cup", "Shaggy Mane", "Shiitake", "Turkey Tail", "Velvet Shank", "Witch’s Butter", "Wood Blewit", "Yellow Knight"],
	"Disney Villains": ["Queen Grimhilde", "Maleficent", "Lady Tremaine", "Honest John", "The Queen of Hearts", "Cruella de Vil", "Shere Khan", "Prince John", "Madam Mim", "Madame Medusa", "Professor Ratigan", "Ursula", "Gaston", "Jafar", "Scar", "Governor Ratcliffe", "Claude Frollo", "Hades", "Shan Yu", "Yzma", "Alameda Slim", "Dr. Facilier", "Mother Gothel", "Bellwether", "King Candy", "Tamatoa", "Te Kā", "Chernabog", "The Horned King", "Edgar Balthazar", "Percival C. McLeach", "Professor Robert Callaghan", "Bill Sykes", "Clayton", "Commander Lyle Rourke", "Helga Sinclair", "Shenzi", "Banzai", "King Magnifico", "Ernesto de la Cruz", "Prince Hans", "Evelyn Deavor", "Syndrome", "Sid Phillips", "Emperor Zurg", "Michael Yagoobian"],
	"Swords": ["Excalibur", "Caliburn", "Durandal", "Joyeuse", "Curtana", "Balmung", "Tyrfing", "Dáinsleif", "Mistilteinn", "Kusanagi-no-Tsurugi", "Zulfiqar", "Crocea Mors", "Fragarach", "Claíomh Solais", "Caladbolg", "Andúril", "Narsil", "Sting", "Glamdring", "Orcrist", "Anglachel", "Gurthang", "Ringil", "Galatine", "Arondight", "Carnwennan", "Secace", "Stormbringer", "Mournblade", "Dragnipur", "Grayswandir", "Werewindle", "Terminus Est", "Longclaw", "Needle", "Heartsbane", "Oathkeeper", "Widow’s Wail", "Blackfyre", "Dark Sister", "Frostmourne", "Ashbringer", "Soul Calibur", "Darksaber", "Sword of Omens", "Vorpal Sword"],
	"Web Colors": ["AliceBlue", "AntiqueWhite", "Bisque", "BlanchedAlmond", "BurlyWood", "CadetBlue", "Chartreuse", "CornflowerBlue", "Cornsilk", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "GoldenRod", "HoneyDew", "HotPink", "IndianRed", "LavenderBlush", "LawnGreen", "LemonChiffon", "LimeGreen", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "OldLace", "Orchid", "PapayaWhip", "PeachPuff", "PowderBlue", "RebeccaPurple", "RosyBrown", "SaddleBrown", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "SkyBlue", "SpringGreen", "SteelBlue", "Thistle", "Wheat", "WhiteSmoke"],
	"Mountain Goats Songs": ["Going to Dade County", "Prana Ferox", "Alpha Rat's Nest", "Going to Georgia", "Baboon", "Game Shows Touch Our Lives", "Pure Love", "Alpha Sun Hat", "Night Light", "Tollund Man", "Going to Japan", "Golden Boy", "Trick Mirror", "Woke Up New", "Age of Kings", "Fall of the Star High School Running Back", "Downtown Seoul", "The Water Song", "Source Decay", "Elijah", "Dilaudid", "Heretic Pride", "Hast Thou Considered the Tetrapod?", "Michael Myers Resplendent", "Up the Wolves", "Damn These Vampires", "In the Craters on the Moon", "Oceanographer's Choice", "Attention All Pickpockets", "Lion's Teeth", "Home Again Garden Grove", "Lovecraft in Brooklyn", "Seed Song", "Family Happiness", "Estate Sale Sign", "The Mess Inside", "Dance Music", "Autoclave", "No Children", "Pale Green Things", "Love Love Love", "Against Pollution", "Jaipur", "The Best Ever Death Metal Band in Denton", "This Year", "Cotton"],
	"Words for Snow": ["Akelrorak", "Aniusarpoq", "Apingaut", "Apulaitok", "Aputainnarowok", "Ariloqaq", "Hlluktorpok", "Igadug", "Kaiyuglak", "Kalutoganiq", "Kanevcir", "Kaniktshaq", "Kanut", "Karakartanaq", "Katiksugnik", "Kiksrukak", "Kimaugruk", "Mangokpok", "Mauyasiropok", "Natatgo Naq", "Navcaq", "Navcite", "Nittaalaq", "Nittaatsuq", "Nutagaq", "Nutaryuk", "Pirsuq", "Pirta", "Pirtuk", "Pokaktok", "Pukaangajuq", "Pukajaw", "Pukak", "Qaniit", "Qanipalaat", "Qanir", "Qanisqineq", "Qannirsuq", "Qanugglir", "Qanunge", "Qinuq", "Sillik", "Siqoq", "Sissuk", "Sullarniq", "Upsik"],
	"National Parks": ["Badlands", "Big Bend", "Biscayne", "Black Canyon of the Gunnison", "Bryce Canyon", "Capitol Reef", "Carlsbad Caverns", "Channel Islands", "Congaree", "Crater Lake", "Cuyahoga Valley", "Death Valley", "Dry Tortugas", "Everglades", "Gates of the Arctic", "Gateway Arch", "Glacier Bay", "Grand Canyon", "Great Sand Dunes", "Guadalupe Mountains", "Haleakalā", "Hot Springs", "Indiana Dunes", "Isle Royale", "Joshua Tree", "Katmai", "Kenai Fjords", "Kings Canyon", "Kobuk Valley", "Lake Clark", "Lassen Volcanic", "Mammoth Cave", "Mesa Verde", "Mount Rainier", "New River Gorge", "North Cascades", "Petrified Forest", "Rocky Mountain", "Shenandoah", "Theodore Roosevelt", "Virgin Islands", "Voyageurs", "White Sands", "Wind Cave", "Yellowstone", "Yosemite"],
	"Pokémon": ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina", "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras"],
	"Queer Media": ["All About My Mother", "Blue Is the Warmest Color", "Bound", "Boys Don’t Cry", "Brokeback Mountain", "But I’m a Cheerleader", "C.R.A.Z.Y.", "Call Me by Your Name", "Edge of Seventeen", "Euphoria", "Everything’s Gonna Be Okay", "Feel Good", "Fire Island", "Funeral Parade of Roses", "Harley Quinn", "Hazbin Hotel", "Heartstopper", "Heated Rivalry", "Hedwig and the Angry Inch", "Helluva Boss", "I May Destroy You", "My Own Private Idaho", "Nimona", "Orlando", "Our Flag Means Death", "Paris Is Burning", "Portrait of a Lady on Fire", "Priscilla, Queen of the Desert", "Rafiki", "Schitt’s Creek", "Sense8", "She-Ra and the Princesses of Power", "Shiva Baby", "Steven Universe", "Tangerine", "The Adventures of Priscilla, Queen of the Desert", "The Birdcage", "The Death and Life of Marsha P. Johnson", "The Hunger", "The L Word", "The Miseducation of Cameron Post", "The Owl House", "Rocky Horror Picture Show", "The Watermelon Woman", "Torch Song Trilogy", "Velvet Goldmine"],
	"Rabbit Breeds": ["American Sable", "Angora", "Argente de Champagne", "Belgian Hare", "Blanc de Hotot", "Britannia Petite", "Checkered Giant", "Crème d’Argent", "English Spot", "Flemish Giant", "Florida White", "Harlequin", "Holland Lop", "Jersey Wooly", "Lionhead", "Rhinelander", "Silver Fox", "Silver Marten", "Standard Chinchilla", "Thrianta", "Cashmere", "Continental Giant", "Dwarf Lop", "English Silver", "Fox Rabbit", "Giant Papillon", "Gotland Rabbit", "Holland Dwarf", "Jamora", "Japanese Harlequin", "Meissner Lop", "New Zealand Red", "Sallander", "Silver Grey Dwarf", "Swiss Fox", "Teddy Dwarf", "Trianta", "Velveteen", "Vienna Blue", "Weynette", "White Vienna", "Würger", "Zemmouri", "Czech Spotted Rabbit", "Danish White", "Deilenaar"],
	"Rivers": ["Nile", "Amazon", "Yangtze", "Mississippi", "Yenisei", "Paraná", "Lena", "Mekong", "Mackenzie", "Volga", "Danube", "Zambezi", "Indus", "Brahmaputra", "Ganges", "Tigris", "Euphrates", "Rio Grande", "Saint Lawrence", "Potomac", "Hudson", "Chattahoochee", "Apalachicola", "Tombigbee", "Brazos", "Pecos", "Thames", "Rhine", "Vistula", "Dnieper", "Rhone", "Loire", "Seine", "Garonne", "Guadalquivir", "Tiber", "Litani", "Orontes", "Irtysh", "Salween", "Irrawaddy", "Dniester", "Limpopo", "Jubba", "Shabelle", "Waikato"],
	"Robots": ["R2-D2", "C-3PO", "BB-8", "K-2SO", "WALL-E", "Johnny 5", "Gort", "Bender", "Gigolo Joe", "Necron 99", "Terminator", "T-1000", "RoboCop", "Optimus Prime", "Megatron", "Bumblebee", "Soundwave", "Shockwave", "Voltron", "Astro Boy", "Calculon", "Ultron", "Vision", "Baymax", "Iron Giant", "Claptrap", "HK-47", "IG-88", "K-9", "Kryten", "Marvin the Paranoid Android", "Andrew Martin", "BMO", "Tachikoma", "Chappie", "Battle Angel Alita", "Tom Servo", "Skynet", "Dot Matrix", "Twiki", "Robbie the Robot", "Mechagodzilla", "Gigantor", "Metal Sonic", "E-102 Gamma", "Asimo"],
	"Shakespeare Characters": ["Hamlet", "Claudius", "Gertrude", "Ophelia", "Polonius", "Laertes", "Macbeth", "Lady Macbeth", "Banquo", "Macduff", "Duncan", "Malcolm", "Juliet", "Romeo", "Mercutio", "Tybalt", "Benvolio", "Friar Laurence", "Othello", "Roderigo", "King Lear", "Goneril", "Prospero", "Caliban", "Alonso", "Gonzalo", "Bassanio", "Nerissa", "Calpurnia", "Enobarbus", "Oberon", "Titania", "Puck", "Lysander", "Hermia", "Demetrius", "Falstaff", "Prince Hal", "Pericles", "Cymbeline", "Leonato", "Beatrice", "Benedick", "Don Pedro", "Orsino", "Malvolio"],
	"Spaceships": ["A-Wing", "Andromeda Ascendant", "Arcadia", "Bebop", "Bird-of-Prey", "Challenger", "Dark Aster", "Pegasus", "Defiant", "Akatsuki", "Apollo", "Eagle Transporter", "Ebon Hawk", "Enterprise", "Event Horizon", "Excelsior", "Forward Unto Dawn", "Galactica", "Heart of Gold", "Lexx", "Millennium Falcon", "Moya", "Normandy SR-1", "Nostromo", "Pillar of Autumn", "Raider", "Razor Crest", "Red Dwarf", "Reliant", "Rocinante", "Serenity", "Shadow Battlecrab", "Star Destroyer", "Stargazer", "Sulaco", "Swordfish II", "Tantive IV", "TARDIS", "TIE Fighter", "USCSS Covenant", "Viper", "Voyager", "White Star", "X-Wing", "Y-Wing", "Yamato"],
	"Star Trek Characters": ["Adira Tal", "Alexander Rozhenko", "Benjamin Sisko", "Christine Chapel", "Christopher Pike", "Deanna Troi", "Erica Ortegas", "Gabriel Lorca", "Geordi La Forge", "Gowron", "Guinan", "Gul Dukat", "Harry Kim", "Harry Mudd", "Hikaru Sulu", "Jadzia Dax", "Jonathan Archer", "Joseph M’Benga", "Joseph Sisko", "Julian Bashir", "Khan Noonien Singh", "Kira Nerys", "Leonard McCoy", "Lwaxana Troi", "Martok", "Michael Burnham", "Miles O’Brien", "Montgomery Scott", "Neelix", "Nyota Uhura", "Odo", "Paul Stamets", "Pavel Chekov", "Q", "Quark", "Sarek", "Sylvia Tilly", "T’Pol", "T’Pring", "Tasha Yar", "Tomalak", "Tuvok", "Una Chin-Riley", "Wesley Crusher", "William Riker", "Worf"],
	"Tools": ["Air compressor", "Allen wrench", "Auger", "Band saw", "Bar clamp", "Belt sander", "Bench grinder", "Block plane", "Bolt cutters", "Box cutter", "Calipers", "Chisel", "Circular saw", "Claw hammer", "Combination square", "Crimping tool", "Crowbar", "Drill bit", "Drill press", "Hacksaw", "Hand saw", "Hex key", "Impact driver", "Jack plane", "Jigsaw", "Lathe", "Mallet", "Milling machine", "Multimeter", "Nail gun", "Needle-nose pliers", "Pickaxe", "Pipe wrench", "Plumb bob", "Putty knife", "Ratchet", "Screwdriver", "Sledgehammer", "Socket wrench", "Soldering iron", "Spokeshave", "Stud finder", "Table saw", "Tape measure", "Wire cutters", "Wire stripper"],
	"Types of Bread": ["Arepa", "Bagel", "Baguette", "Bannock", "Batard", "Bauernbrot", "Boule", "Brioche", "Brotchen", "Challah", "Chapati", "Ciabatta", "Cornbread", "Dinner roll", "Flatbread", "Focaccia", "Hamburger bun", "Hot dog bun", "Injera", "Johnnycake", "Khubz", "Kifli", "Kulcha", "Laffa", "Lembas", "Mantou", "Marble rye", "Matzo", "Miche", "Milk bun", "Monkey bread", "Naan", "Pane carasau", "Panettone", "Paratha", "Parotta", "Paska", "Pita", "Pullman loaf", "Pumpernickel", "Roggenbrot", "Scotch baps", "Shaobing", "Sourdough", "Tortilla", "Tsoureki"],
	"Vehicles": ["Aircraft carrier", "Ambulance", "Bicycle", "Cable car", "Canoe", "Covered wagon", "Cruise ship", "Dirigible", "Dog sled", "Dragster", "Dump truck", "Dune buggy", "Ferry", "Fire engine", "Fishing boat", "Forklift", "Freight train", "Garbage truck", "Go-kart", "Golf cart", "Helicopter", "Horse carriage", "Hot air balloon", "Hovercraft", "Jet ski", "Kayak", "Lifeboat", "Locomotive", "Lunar rover", "Monorail", "Motorcycle", "Pickup truck", "Rickshaw", "Rowboat", "Sailboat", "Scooter", "Skateboard", "Snowmobile", "Speedboat", "Stagecoach", "Steamroller", "Submarine", "Tractor", "Train", "Tuk-tuk", "Yacht"],
	"Video Game Consoles": ["", "Magnavox Odyssey", "Odyssey 2", "Atari 2600", "Fairchild Channel F", "Bally Astrocade", "ColecoVision", "Intellivision", "Vectrex", "Emerson Arcadia 2001", "Nintendo Entertainment System", "Super Nintendo", "Nintendo 64", "Nintendo GameCube", "Wii", "Nintendo Switch", "Game Boy Advance", "Nintendo DS", "Sega Genesis", "Sega Dreamcast", "Sony PlayStation", "Xbox 360", "TurboGrafx-16", "Neo Geo", "WonderSwan", "SwanCrystal", "Apple Pippin", "Gizmondo", "N-Gage", "Ouya", "Nvidia Shield", "Playdate", "Evercade", "Polymega", "Speak & Spell", "Little Professor", "Mattel Aquarius", "LeapPad", "Microvision", "Merlin handheld", "3DO Interactive Multiplayer", "Amstrad GX4000", "FM Towns Marty", "Hyperscan", "Game Gear", "Atari Lynx"],

};

checkCategories();
setUpBoard();
loadState();

function deselect() {
	if (selected != 0) {
		selected.style = "";
		selected = 0;
		document.getElementById("deselect").disabled = true;
	}
}

function finishCategory(b) {
	b.innerHTML = '<b>' + b.category + '</b>';
	b.disabled = true;
	b.style.background = stringToLightColor(b.category);
}

function saveState() {
	localStorage.clear();
	localStorage.setItem('score', score + '');
	localStorage.setItem('mistakes', mistakes + '');

	var t = document.getElementById('the_table');
	for (let i = 0; i < t.rows.length; i++) {
		let row = t.rows[i];
		for (let j = 0; j < row.cells.length; j++) {
			let cell = row.cells[j];
			let button = cell.firstChild;
			localStorage.setItem(`${i}_${j}_category`, button.category);
			localStorage.setItem(`${i}_${j}_cluster`, JSON.stringify(button.cluster));
			localStorage.setItem(`${i}_${j}_innerHTML`, button.innerHTML);
			localStorage.setItem(`${i}_${j}_title`, button.title);
		}
	}
}

function putWordsInBoard() {
	// shuffleArray(wordlist);
	var currentWordIndex = 0;
	var table = document.getElementById("the_table");
	for (let i = 0, row; row = table.rows[i]; i++) {
		for (let j = 0, col; col = row.cells[j]; j++) {
			var button = col.firstElementChild;
			button.textContent = wordlist[currentWordIndex][0];
			button.category = wordlist[currentWordIndex][1];
			button.cluster = [button.textContent];
			currentWordIndex += 1;
		}
	}
}

function setUpBoard() {
	// Just sets up the dom elements; does not put words in them.
	var b = document.getElementById("board");
	const table = document.createElement('table');
	table.id = 'the_table';
	for (let i = 0; i < num_entries; i++) {
		const tr = document.createElement('tr');
		tr.classList.add('.row');
		for (let j = 0; j < num_entries; j++) {
			const td = document.createElement('td');
			td.class = "bigbut";
			const button = document.createElement('button');
			button.class = "bigbut";
			button.onclick = function () {
				if (selected == button) {
					deselect();
					return;
				}
				button.style = "filter: invert(100%)";

				if (selected == 0) {
					selected = button;
					document.getElementById("deselect").disabled = false;
					return;
				}

				document.getElementById("deselect").disabled = true;

				if (button.category == selected.category) {

					firstbut = button;
					secondbut = selected;

					// Deselect
					selected.style = "";
					button.style = "";
					selected = 0;
					score = score + 1;

					// Merge
					firstbut.cluster = firstbut.cluster.concat(secondbut.cluster);
					// console.log(firstbut.cluster);
					if (firstbut.cluster.length == 2) {
						firstbut.innerHTML = '<b>' + firstbut.cluster.join('; ') + '</b>';
					} else {
						firstbut.innerHTML = '<b>' + firstbut.cluster.slice(0, 2).join(', ') + ', ... <span class="red">[' + firstbut.cluster.length + ']</span></b>';
						firstbut.title = firstbut.cluster.join('\n');
					}
					if (firstbut.cluster.length == num_entries) {
						finishCategory(firstbut);
					}

					document.getElementById("score").textContent = score;
					// Remove the button for the eliminated word.
					secondbut.title = '';
					secondbut.textContent = '';
					secondbut.disabled = true;
					secondbut.parentElement.remove();

				} else {
					mistakes = mistakes + 1;
					document.getElementById("mistakes").textContent = mistakes;
					// Shake it
					button.classList.add('shake');
					selected.classList.add('shake');

					button.addEventListener('animationend', () => {
						button.classList.remove('shake');
						button.style = "";
					}
						, {
							once: true
						});

					old_selected = selected;
					old_selected.addEventListener('animationend', () => {
						old_selected.classList.remove('shake');
						old_selected.style = "";
					}
						, {
							once: true
						});

					selected = 0;
				}
				saveState();
				if (score == num_entries * (num_entries - 1)) {
					window.alert("You win!!");
					startFireworks();
				}
			}
				;
			td.appendChild(button);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	document.getElementById("board").appendChild(table);
}

function loadState() {
	s = localStorage.getItem('score');
	if (s == null) {
		putWordsInBoard();
		return;
	}
	score = Number(s);
	document.getElementById("score").textContent = score;

	s = localStorage.getItem('mistakes');
	if (s == null) {
		putWordsInBoard();
		return;
	}
	mistakes = Number(s);
	document.getElementById("mistakes").textContent = mistakes;

	var currentWordIndex = 0;
	var table = document.getElementById("the_table");
	var cells_to_remove = [];
	for (let i = 0, row; row = table.rows[i]; i++) {
		for (let j = 0, col; col = row.cells[j]; j++) {
			var button = col.firstElementChild;
			// button.pos = currentWordIndex;
			button.category = localStorage.getItem(`${i}_${j}_category`);
			button.cluster = JSON.parse(localStorage.getItem(`${i}_${j}_cluster`));
			if (Array.isArray(button.cluster) && button.cluster.length == num_entries) {
				finishCategory(button);
			}
			button.innerHTML = localStorage.getItem(`${i}_${j}_innerHTML`);
			button.title = localStorage.getItem(`${i}_${j}_title`);
			currentWordIndex += 1;
			if (button.innerHTML == '') {
				// No word here, remove the whole <td>
				cells_to_remove.push(col);
			}
		}
	}
	for (let i = 0; i < cells_to_remove.length; i++) {
		cells_to_remove[i].remove();
	}
}

// helper functions
function stringToLightColor(str) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}

	const h = Math.abs(hash) % 360;
	const s = 70;
	const l = 80 + (Math.abs(hash) % 10);

	const lDev = l / 100;
	const a = (s * Math.min(lDev, 1 - lDev)) / 100;

	const f = (n) => {
		const k = (n + h / 30) % 12;
		const color = lDev - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color).toString(16).padStart(2, "0");
	};

	return `#${f(0)}${f(8)}${f(4)}`;
}


function checkCategories() {
	const wordDict = new Map();
	// Check that each category has the right number of entries.
	for (const [key, value] of Object.entries(cats)) {
		if (value.length < num_entries) {
			alert(`Entry for ${key} has length ${value.length}`);
		}
		for (let i = 0; i < num_entries; i++) {
			wordlist.push([value[i], key]);
			if (wordDict.has(value[i])) {
				alert(`Duplicate word ${value[i]}`);
			} else {
				wordDict.set(value[i], true);
			}
		}
	}
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

