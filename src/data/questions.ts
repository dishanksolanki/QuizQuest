import { CategoryInfo, Question } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'general-knowledge',
    name: 'General Knowledge',
    tagline: 'World Trivia & Curiosities',
    description: 'Explore global geography, arts, pop culture, monuments, and fascinating world facts.',
    iconName: 'Globe',
    colorScheme: {
      badge: 'text-[#760F20] bg-[#F9EBD0] border-[#E1BC72]/60',
      accent: 'text-[#760F20]',
      cardBorder: 'hover:border-[#C18A36]',
      cardBg: 'bg-[#FFFCF7]',
      glow: 'hover:shadow-[0_8px_22px_rgba(58,8,16,0.08)]',
    },
  },
  {
    id: 'science',
    name: 'Science',
    tagline: 'Cosmos, Physics & Nature',
    description: 'From atomic particles and cellular biology to stellar constellations and quantum laws.',
    iconName: 'Atom',
    colorScheme: {
      badge: 'text-[#981B2B] bg-[#F9EBD0] border-[#E1BC72]/60',
      accent: 'text-[#981B2B]',
      cardBorder: 'hover:border-[#C18A36]',
      cardBg: 'bg-[#FFFCF7]',
      glow: 'hover:shadow-[0_8px_22px_rgba(58,8,16,0.08)]',
    },
  },
  {
    id: 'technology',
    name: 'Technology',
    tagline: 'Computing, Code & Innovation',
    description: 'Unpack the history of computing, silicon innovations, software architecture, and the digital frontier.',
    iconName: 'Cpu',
    colorScheme: {
      badge: 'text-[#A87526] bg-[#F9EBD0] border-[#E1BC72]/60',
      accent: 'text-[#A87526]',
      cardBorder: 'hover:border-[#C18A36]',
      cardBg: 'bg-[#FFFCF7]',
      glow: 'hover:shadow-[0_8px_22px_rgba(58,8,16,0.08)]',
    },
  },
  {
    id: 'history',
    name: 'History',
    tagline: 'Civilizations, Empires & Milestones',
    description: 'Relive ancient empires, pivotal treaties, epic revolutions, and discoveries that shaped humanity.',
    iconName: 'Landmark',
    colorScheme: {
      badge: 'text-[#570D18] bg-[#F9EBD0] border-[#E1BC72]/60',
      accent: 'text-[#570D18]',
      cardBorder: 'hover:border-[#C18A36]',
      cardBg: 'bg-[#FFFCF7]',
      glow: 'hover:shadow-[0_8px_22px_rgba(58,8,16,0.08)]',
    },
  },
];

export const QUESTION_BANK: Question[] = [
  // ================= GENERAL KNOWLEDGE =================
  // Easy (5)
  {
    id: 'gk-e-01',
    category: 'general-knowledge',
    difficulty: 'easy',
    question: 'Which is the largest ocean on Earth by surface area?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
    correctAnswer: 'Pacific Ocean',
    explanation: 'The Pacific Ocean spans over 63 million square miles, covering more than 30% of Earth’s surface.',
  },
  {
    id: 'gk-e-02',
    category: 'general-knowledge',
    difficulty: 'easy',
    question: 'What is the capital city of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correctAnswer: 'Canberra',
    explanation: 'Canberra was selected as Australia’s federal capital in 1908 as a compromise between rivals Sydney and Melbourne.',
  },
  {
    id: 'gk-e-03',
    category: 'general-knowledge',
    difficulty: 'easy',
    question: 'How many continents are there on planet Earth according to standard geographic conventions?',
    options: ['5', '6', '7', '8'],
    correctAnswer: '7',
    explanation: 'The seven continents are Asia, Africa, North America, South America, Antarctica, Europe, and Australia.',
  },
  {
    id: 'gk-e-04',
    category: 'general-knowledge',
    difficulty: 'easy',
    question: 'In which European city would you find the world-famous Louvre Museum?',
    options: ['Rome', 'Paris', 'Madrid', 'Vienna'],
    correctAnswer: 'Paris',
    explanation: 'The Louvre, home to Leonardo da Vinci’s Mona Lisa, is located on the Right Bank of the Seine in Paris, France.',
  },
  {
    id: 'gk-e-05',
    category: 'general-knowledge',
    difficulty: 'easy',
    question: 'Which currency is officially used across Japan?',
    options: ['Yen', 'Won', 'Yuan', 'Baht'],
    correctAnswer: 'Yen',
    explanation: 'The Japanese Yen (JPY) was adopted under the Meiji government in 1871 and is represented by the symbol ¥.',
  },
  // Medium (5)
  {
    id: 'gk-m-01',
    category: 'general-knowledge',
    difficulty: 'medium',
    question: 'What is the only country in the world that borders both the Caspian Sea and the Persian Gulf?',
    options: ['Iraq', 'Iran', 'Azerbaijan', 'Turkmenistan'],
    correctAnswer: 'Iran',
    explanation: 'Iran is flanked by the Caspian Sea along its northern coast and the Persian Gulf along its southern coast.',
  },
  {
    id: 'gk-m-02',
    category: 'general-knowledge',
    difficulty: 'medium',
    question: 'Which country has the most natural lakes in the world, containing over 60% of all global lakes?',
    options: ['Russia', 'United States', 'Canada', 'Finland'],
    correctAnswer: 'Canada',
    explanation: 'Canada is home to an estimated 2 million lakes, holding approximately 20% of the world’s surface freshwater.',
  },
  {
    id: 'gk-m-03',
    category: 'general-knowledge',
    difficulty: 'medium',
    question: 'Which archipelago nation consists of more than 17,000 distinct islands?',
    options: ['Philippines', 'Indonesia', 'Japan', 'Maldives'],
    correctAnswer: 'Indonesia',
    explanation: 'Indonesia is the world’s largest island state, spanning over 17,500 islands across Southeast Asia and Oceania.',
  },
  {
    id: 'gk-m-04',
    category: 'general-knowledge',
    difficulty: 'medium',
    question: 'What is the highest mountain peak outside of the Asian continent?',
    options: ['Mount Kilimanjaro', 'Mount Elbrus', 'Aconcagua', 'Denali'],
    correctAnswer: 'Aconcagua',
    explanation: 'Aconcagua in the Argentine Andes stands at 6,961 meters (22,838 ft), making it the highest peak in the Western and Southern Hemispheres.',
  },
  {
    id: 'gk-m-05',
    category: 'general-knowledge',
    difficulty: 'medium',
    question: 'What color is the bullseye ring on a standard regulation target archery board?',
    options: ['Red', 'Gold / Yellow', 'Blue', 'White'],
    correctAnswer: 'Gold / Yellow',
    explanation: 'A standard FITA archery target features a central yellow (gold) circle worth 9 and 10 points, encircled by red, blue, black, and white rings.',
  },
  // Hard (5)
  {
    id: 'gk-h-01',
    category: 'general-knowledge',
    difficulty: 'hard',
    question: 'Which nation has an entirely non-rectangular national flag?',
    options: ['Switzerland', 'Vatican City', 'Nepal', 'Bhutan'],
    correctAnswer: 'Nepal',
    explanation: 'Nepal’s unique national flag consists of two stacked pennants, making it the only sovereign state without a quadrilateral flag.',
  },
  {
    id: 'gk-h-02',
    category: 'general-knowledge',
    difficulty: 'hard',
    question: 'What is the driest non-polar desert on planet Earth, where some weather stations have recorded zero rain for decades?',
    options: ['Sahara Desert', 'Gobi Desert', 'Atacama Desert', 'Kalahari Desert'],
    correctAnswer: 'Atacama Desert',
    explanation: 'The Atacama Desert in northern Chile is situated between the Andes and the Chilean Coastal Range, creating a double rain shadow.',
  },
  {
    id: 'gk-h-03',
    category: 'general-knowledge',
    difficulty: 'hard',
    question: 'In international nautical communication, what does raising the "Oscar" maritime signal flag signify?',
    options: ['Vessel is taking on water', 'Man overboard', 'Fire aboard ship', 'Requesting medical assistance'],
    correctAnswer: 'Man overboard',
    explanation: 'The Oscar flag (divided diagonally into red and yellow triangles) universally signals "Man overboard".',
  },
  {
    id: 'gk-h-04',
    category: 'general-knowledge',
    difficulty: 'hard',
    question: 'Which African city is famously known as the "City of a Thousand Minarets"?',
    options: ['Casablanca', 'Cairo', 'Marrakech', 'Tunis'],
    correctAnswer: 'Cairo',
    explanation: 'Cairo was coined the "City of a Thousand Minarets" due to its dense, magnificent array of historic Islamic architecture.',
  },
  {
    id: 'gk-h-05',
    category: 'general-knowledge',
    difficulty: 'hard',
    question: 'What is the rarest naturally occurring gemstone on Earth, found almost exclusively in the San Benito County of California?',
    options: ['Tanzanite', 'Benitoite', 'Painite', 'Alexandrite'],
    correctAnswer: 'Benitoite',
    explanation: 'Benitoite is a rare barium titanium silicate discovered in 1907 near the headwaters of the San Benito River, displaying vivid sapphire-blue brilliance.',
  },

  // ================= SCIENCE =================
  // Easy (5)
  {
    id: 'sci-e-01',
    category: 'science',
    difficulty: 'easy',
    question: 'What primary chemical gas do green plants absorb from the atmosphere during photosynthesis?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Methane'],
    correctAnswer: 'Carbon Dioxide',
    explanation: 'Plants use chlorophyll to convert carbon dioxide and water into glucose and oxygen using sunlight energy.',
  },
  {
    id: 'sci-e-02',
    category: 'science',
    difficulty: 'easy',
    question: 'What is the chemical symbol for the element Gold on the periodic table?',
    options: ['Ag', 'Au', 'Fe', 'Gd'],
    correctAnswer: 'Au',
    explanation: 'The chemical symbol Au comes from "aurum", the Latin word meaning "shining dawn".',
  },
  {
    id: 'sci-e-03',
    category: 'science',
    difficulty: 'easy',
    question: 'Which human organ is primarily responsible for filtering waste fluids from blood to create urine?',
    options: ['Liver', 'Kidneys', 'Pancreas', 'Spleen'],
    correctAnswer: 'Kidneys',
    explanation: 'The kidneys contain millions of microscopic units called nephrons that filter waste and extra water from blood.',
  },
  {
    id: 'sci-e-04',
    category: 'science',
    difficulty: 'easy',
    question: 'What is the closest planet to our Sun in the solar system?',
    options: ['Venus', 'Mercury', 'Mars', 'Earth'],
    correctAnswer: 'Mercury',
    explanation: 'Mercury orbits closest to the Sun at an average distance of approximately 58 million kilometers.',
  },
  {
    id: 'sci-e-05',
    category: 'science',
    difficulty: 'easy',
    question: 'At sea level, at what temperature does pure water freeze into solid ice?',
    options: ['0°C (32°F)', '10°C (50°F)', '-10°C (14°F)', '4°C (39°F)'],
    correctAnswer: '0°C (32°F)',
    explanation: 'Pure water crystallizes into hexagonal ice crystals at 0 degrees Celsius (32 degrees Fahrenheit) under standard atmospheric pressure.',
  },
  // Medium (5)
  {
    id: 'sci-m-01',
    category: 'science',
    difficulty: 'medium',
    question: 'What subatomic particle carries a negative electric charge?',
    options: ['Proton', 'Neutron', 'Electron', 'Positron'],
    correctAnswer: 'Electron',
    explanation: 'Electrons carry an elementary charge of -1 and orbit the dense nucleus composed of protons and neutrons.',
  },
  {
    id: 'sci-m-02',
    category: 'science',
    difficulty: 'medium',
    question: 'What cellular organelle is universally referred to as the "powerhouse of the cell" for generating ATP?',
    options: ['Endoplasmic Reticulum', 'Golgi Apparatus', 'Mitochondria', 'Ribosome'],
    correctAnswer: 'Mitochondria',
    explanation: 'Mitochondria generate most of the cell’s chemical energy through oxidative phosphorylation, synthesizing adenosine triphosphate (ATP).',
  },
  {
    id: 'sci-m-03',
    category: 'science',
    difficulty: 'medium',
    question: 'Approximately how fast does light travel in a vacuum?',
    options: ['150,000 km/s', '300,000 km/s', '500,000 km/s', '1,000,000 km/s'],
    correctAnswer: '300,000 km/s',
    explanation: 'The speed of light in vacuum (c) is precisely 299,792,458 meters per second (approx. 300,000 km/s or 186,000 miles/s).',
  },
  {
    id: 'sci-m-04',
    category: 'science',
    difficulty: 'medium',
    question: 'What is the most abundant gas by volume in Earth’s atmosphere?',
    options: ['Oxygen', 'Nitrogen', 'Argon', 'Carbon Dioxide'],
    correctAnswer: 'Nitrogen',
    explanation: 'Nitrogen makes up roughly 78.08% of dry atmosphere, while oxygen accounts for approximately 20.95%.',
  },
  {
    id: 'sci-m-05',
    category: 'science',
    difficulty: 'medium',
    question: 'Which layer of Earth’s atmosphere contains the ozone layer that absorbs harmful solar ultraviolet rays?',
    options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'],
    correctAnswer: 'Stratosphere',
    explanation: 'The stratosphere extends from roughly 10 to 50 km altitude and houses the protective ozone (O3) concentration.',
  },
  // Hard (5)
  {
    id: 'sci-h-01',
    category: 'science',
    difficulty: 'hard',
    question: 'Which fundamental physical constant relates the energy of a photon directly to its electromagnetic frequency?',
    options: ['Avogadro’s constant', 'Planck’s constant', 'Boltzmann’s constant', 'Euler’s constant'],
    correctAnswer: 'Planck’s constant',
    explanation: 'Formulated by Max Planck, E = h·ν where h is Planck’s constant (approximately 6.626 × 10^-34 J·s).',
  },
  {
    id: 'sci-h-02',
    category: 'science',
    difficulty: 'hard',
    question: 'What is the name of the theoretical boundary surrounding a black hole beyond which nothing, not even light, can escape?',
    options: ['Ergosphere', 'Event Horizon', 'Accretion Disk', 'Photon Sphere'],
    correctAnswer: 'Event Horizon',
    explanation: 'The event horizon defines the boundary of spacetime from which escape velocity strictly exceeds the speed of light.',
  },
  {
    id: 'sci-h-03',
    category: 'science',
    difficulty: 'hard',
    question: 'Which chemical element has the highest melting point of all non-alloy metals at 3,422°C (6,192°F)?',
    options: ['Titanium', 'Platinum', 'Tungsten', 'Osmium'],
    correctAnswer: 'Tungsten',
    explanation: 'Tungsten (symbol W, from Wolfram) has the highest melting point and highest tensile strength among pure metals.',
  },
  {
    id: 'sci-h-04',
    category: 'science',
    difficulty: 'hard',
    question: 'In genetics, which nitrogenous base is found in RNA molecules as a replacement for DNA’s Thymine?',
    options: ['Adenine', 'Cytosine', 'Guanine', 'Uracil'],
    correctAnswer: 'Uracil',
    explanation: 'In RNA, Uracil (U) pairs with Adenine (A), replacing Thymine (T) used in double-stranded DNA.',
  },
  {
    id: 'sci-h-05',
    category: 'science',
    difficulty: 'hard',
    question: 'What is the only known bodily tissue in adult humans that receives no direct supply from blood vessels?',
    options: ['Cornea of the eye', 'Ear cartilage', 'Enamel of teeth', 'Hair follicle'],
    correctAnswer: 'Cornea of the eye',
    explanation: 'The cornea is avascular to remain completely transparent, receiving oxygen and nourishment directly from ambient air and tears.',
  },

  // ================= TECHNOLOGY =================
  // Easy (5)
  {
    id: 'tech-e-01',
    category: 'technology',
    difficulty: 'easy',
    question: 'In web addresses, what does the acronym "HTTP" stand for?',
    options: [
      'HyperText Transfer Protocol',
      'High Tech Transmission Process',
      'Hyperlink Technical Transit Path',
      'Host Terminal Transport Platform',
    ],
    correctAnswer: 'HyperText Transfer Protocol',
    explanation: 'HTTP is the foundational protocol used by the World Wide Web to transmit hypermedia documents between clients and web servers.',
  },
  {
    id: 'tech-e-02',
    category: 'technology',
    difficulty: 'easy',
    question: 'Which global company developed the open-source Android mobile operating system?',
    options: ['Apple', 'Microsoft', 'Google', 'Samsung'],
    correctAnswer: 'Google',
    explanation: 'Google acquired Android Inc. in 2005 and officially launched the Android mobile platform with the HTC Dream in 2008.',
  },
  {
    id: 'tech-e-03',
    category: 'technology',
    difficulty: 'easy',
    question: 'In digital computing, how many bits make up one standard byte?',
    options: ['4 bits', '8 bits', '16 bits', '32 bits'],
    correctAnswer: '8 bits',
    explanation: 'A byte is a unit of digital information that most commonly consists of eight binary digits (bits).',
  },
  {
    id: 'tech-e-04',
    category: 'technology',
    difficulty: 'easy',
    question: 'What does "RAM" stand for in personal computer hardware specifications?',
    options: [
      'Random Access Memory',
      'Rapid Array Module',
      'Read Access Mechanism',
      'Recorded Active Microchip',
    ],
    correctAnswer: 'Random Access Memory',
    explanation: 'RAM provides volatile, ultra-fast temporary storage that allows data items to be read or written in almost equal time regardless of physical location.',
  },
  {
    id: 'tech-e-05',
    category: 'technology',
    difficulty: 'easy',
    question: 'Which programming language is predominantly known as the primary interactive scripting language of web browsers?',
    options: ['Python', 'C++', 'JavaScript', 'Java'],
    correctAnswer: 'JavaScript',
    explanation: 'Created by Brendan Eich in 1995, JavaScript executes natively inside all modern web browsers to provide dynamic, responsive experiences.',
  },
  // Medium (5)
  {
    id: 'tech-m-01',
    category: 'technology',
    difficulty: 'medium',
    question: 'Who is widely credited as the world’s first computer programmer for writing an algorithm for Babbage’s Analytical Engine?',
    options: ['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Charles Babbage'],
    correctAnswer: 'Ada Lovelace',
    explanation: 'In 1843, mathematician Ada Lovelace published notes describing an algorithm to compute Bernoulli numbers on Charles Babbage’s proposed mechanical engine.',
  },
  {
    id: 'tech-m-02',
    category: 'technology',
    difficulty: 'medium',
    question: 'Which company introduced the first commercially available microprocessor, the 4004, in 1971?',
    options: ['IBM', 'Intel', 'Texas Instruments', 'Motorola'],
    correctAnswer: 'Intel',
    explanation: 'Designed by Federico Faggin, Ted Hoff, and Stanley Mazor, the 4-bit Intel 4004 launched the microprocessor revolution.',
  },
  {
    id: 'tech-m-03',
    category: 'technology',
    difficulty: 'medium',
    question: 'In software development and version control, what does the command "git merge" do?',
    options: [
      'Combines multiple commit histories into one branch',
      'Deletes obsolete repositories',
      'Copies files to remote cloud storage',
      'Reverts all recent file modifications',
    ],
    correctAnswer: 'Combines multiple commit histories into one branch',
    explanation: 'In Git, merge joins two or more development histories together, integrating changes from one branch into another.',
  },
  {
    id: 'tech-m-04',
    category: 'technology',
    difficulty: 'medium',
    question: 'What is the default TCP network port number used for secure HTTPS web traffic?',
    options: ['21', '80', '443', '8080'],
    correctAnswer: '443',
    explanation: 'Port 80 is used for unencrypted HTTP traffic, while port 443 is universally designated for SSL/TLS encrypted HTTPS traffic.',
  },
  {
    id: 'tech-m-05',
    category: 'technology',
    difficulty: 'medium',
    question: 'What observation formulated in 1965 states that the number of transistors on an integrated circuit doubles approximately every two years?',
    options: ['Amdahl’s Law', 'Moore’s Law', 'Metcalfe’s Law', 'Shannon’s Theorem'],
    correctAnswer: 'Moore’s Law',
    explanation: 'Co-founder of Intel Gordon Moore predicted the exponential scaling of microchip transistor density, known as Moore’s Law.',
  },
  // Hard (5)
  {
    id: 'tech-h-01',
    category: 'technology',
    difficulty: 'hard',
    question: 'In asymmetric public-key cryptography, what mathematical problem forms the security backbone of the RSA encryption algorithm?',
    options: [
      'Prime factorization of large composite integers',
      'Discrete logarithm in elliptic curves',
      'Polynomial knot theory',
      'Traveling salesperson shortest path',
    ],
    correctAnswer: 'Prime factorization of large composite integers',
    explanation: 'RSA relies on the computational difficulty of factoring the product of two enormous prime numbers.',
  },
  {
    id: 'tech-h-02',
    category: 'technology',
    difficulty: 'hard',
    question: 'What was the revolutionary name of the precursor network established by the US Department of Defense in 1969 that pioneered packet switching?',
    options: ['USENET', 'ARPANET', 'CYCLADES', 'ALOHANET'],
    correctAnswer: 'ARPANET',
    explanation: 'ARPANET (Advanced Research Projects Agency Network) was the first operational network to implement TCP/IP and packet switching.',
  },
  {
    id: 'tech-h-03',
    category: 'technology',
    difficulty: 'hard',
    question: 'In deep learning neural networks, what does the "T" stand for in the widely adopted "Transformer" architecture introduced by Google in 2017?',
    options: ['Transformer (self-attention model)', 'Turing', 'Tensor', 'Translational'],
    correctAnswer: 'Transformer (self-attention model)',
    explanation: 'Introduced in the seminal paper "Attention Is All You Need", Transformers rely on multi-head self-attention mechanisms rather than recurrence.',
  },
  {
    id: 'tech-h-04',
    category: 'technology',
    difficulty: 'hard',
    question: 'Which UNIX command-line utility was originally created by Ken Thompson using regular expressions, named after the ed editor command g/re/p?',
    options: ['awk', 'sed', 'grep', 'find'],
    correctAnswer: 'grep',
    explanation: 'grep stands for "globally search for a regular expression and print matching lines" (g/re/p) from the UNIX text editor ed.',
  },
  {
    id: 'tech-h-05',
    category: 'technology',
    difficulty: 'hard',
    question: 'What consensus mechanism does the Bitcoin blockchain rely upon to prevent double spending and validate transaction blocks?',
    options: ['Proof of Stake', 'Proof of Work', 'Proof of Authority', 'Delegated Byzantine Fault Tolerance'],
    correctAnswer: 'Proof of Work',
    explanation: 'Bitcoin uses Proof of Work (PoW) with the SHA-256 cryptographic hash function to reach distributed consensus across decentralized nodes.',
  },

  // ================= HISTORY =================
  // Easy (5)
  {
    id: 'hist-e-01',
    category: 'history',
    difficulty: 'easy',
    question: 'In which year did Christopher Columbus make his historic landfall in the Americas?',
    options: ['1492', '1512', '1453', '1776'],
    correctAnswer: '1492',
    explanation: 'Columbus sailed across the Atlantic with three ships (Niña, Pinta, Santa María), landing in the Bahamas in October 1492.',
  },
  {
    id: 'hist-e-02',
    category: 'history',
    difficulty: 'easy',
    question: 'Who served as the very first President of the United States under the US Constitution?',
    options: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Alexander Hamilton'],
    correctAnswer: 'George Washington',
    explanation: 'George Washington was unanimously elected president by electors in 1789, serving two terms until 1797.',
  },
  {
    id: 'hist-e-03',
    category: 'history',
    difficulty: 'easy',
    question: 'Which ancient wonder of the world still stands proudly on the Giza plateau in Egypt?',
    options: [
      'The Great Pyramid of Giza',
      'The Colossus of Rhodes',
      'The Hanging Gardens of Babylon',
      'The Lighthouse of Alexandria',
    ],
    correctAnswer: 'The Great Pyramid of Giza',
    explanation: 'Built for Pharaoh Khufu circa 2560 BC, the Great Pyramid is the oldest and only surviving monument among the Seven Ancient Wonders.',
  },
  {
    id: 'hist-e-04',
    category: 'history',
    difficulty: 'easy',
    question: 'What historical monument was torn down in Germany in 1989, symbolizing the end of the Cold War in Europe?',
    options: ['The Berlin Wall', 'The Brandenburg Gate', 'Checkpoint Charlie', 'The Reichstag'],
    correctAnswer: 'The Berlin Wall',
    explanation: 'Erected in 1961 to divide East and West Berlin, the fall of the Berlin Wall in November 1989 catalyzed German reunification.',
  },
  {
    id: 'hist-e-05',
    category: 'history',
    difficulty: 'easy',
    question: 'Who was the famous queen of France executed by guillotine during the French Revolution?',
    options: ['Marie Antoinette', 'Catherine de Medici', 'Eleanor of Aquitaine', 'Mary Queen of Scots'],
    correctAnswer: 'Marie Antoinette',
    explanation: 'Wife of King Louis XVI, Marie Antoinette was convicted of treason by the revolutionary tribunal and executed in October 1793.',
  },
  // Medium (5)
  {
    id: 'hist-m-01',
    category: 'history',
    difficulty: 'medium',
    question: 'The Magna Carta, a landmark document limiting royal monarchy power, was signed by King John of England in what year?',
    options: ['1066', '1215', '1348', '1415'],
    correctAnswer: '1215',
    explanation: 'English barons forced King John to grant the Great Charter (Magna Carta) at Runnymede in June 1215, laying foundations for constitutional rights.',
  },
  {
    id: 'hist-m-02',
    category: 'history',
    difficulty: 'medium',
    question: 'Which empire was ruled by Suleiman the Magnificent during its golden age of expansion and culture?',
    options: ['Persian Empire', 'Ottoman Empire', 'Mughal Empire', 'Byzantine Empire'],
    correctAnswer: 'Ottoman Empire',
    explanation: 'Suleiman I reigned from 1520 to 1566 over the Ottoman Empire, expanding across Southeast Europe, Western Asia, and North Africa.',
  },
  {
    id: 'hist-m-03',
    category: 'history',
    difficulty: 'medium',
    question: 'What major naval engagement in 1805 solidified Britain’s supremacy of the seas against Napoleon’s combined French and Spanish fleets?',
    options: ['Battle of Waterloo', 'Battle of Trafalgar', 'Battle of Jutland', 'Battle of the Nile'],
    correctAnswer: 'Battle of Trafalgar',
    explanation: 'Led by Admiral Horatio Nelson aboard HMS Victory, the British fleet won a decisive victory off Cape Trafalgar without losing a single ship.',
  },
  {
    id: 'hist-m-04',
    category: 'history',
    difficulty: 'medium',
    question: 'Who was the Carthaginian general famous for marching war elephants across the Alps to invade ancient Rome during the Second Punic War?',
    options: ['Scipio Africanus', 'Hannibal Barca', 'Hamilcar Barca', 'Hasdrubal'],
    correctAnswer: 'Hannibal Barca',
    explanation: 'Hannibal famously crossed the Pyrenees and the Alps in 218 BC, defeating Roman legions at Trebia, Lake Trasimene, and Cannae.',
  },
  {
    id: 'hist-m-05',
    category: 'history',
    difficulty: 'medium',
    question: 'What treaty signed in 1919 officially concluded World War I and imposed heavy reparations on Germany?',
    options: ['Treaty of Versailles', 'Treaty of Utrecht', 'Treaty of Ghent', 'Congress of Vienna'],
    correctAnswer: 'Treaty of Versailles',
    explanation: 'Signed in the Hall of Mirrors at Versailles, the treaty redrew European borders and established the League of Nations.',
  },
  // Hard (5)
  {
    id: 'hist-h-01',
    category: 'history',
    difficulty: 'hard',
    question: 'In what year did the Eastern Roman (Byzantine) Empire fall when Constantinople was conquered by Sultan Mehmed II?',
    options: ['1204', '1453', '1492', '1571'],
    correctAnswer: '1453',
    explanation: 'On May 29, 1453, Ottoman forces breached Constantinople’s walls, bringing an end to over a millennium of Byzantine imperial history.',
  },
  {
    id: 'hist-h-02',
    category: 'history',
    difficulty: 'hard',
    question: 'Which treaty divided the newly discovered non-European lands between the Spanish Empire and Portuguese Empire in 1494?',
    options: ['Treaty of Tordesillas', 'Treaty of Zaragoza', 'Treaty of Westphalia', 'Treaty of Madrid'],
    correctAnswer: 'Treaty of Tordesillas',
    explanation: 'The Treaty of Tordesillas drew a meridian 370 leagues west of the Cape Verde islands, awarding territories west to Spain and east to Portugal.',
  },
  {
    id: 'hist-h-03',
    category: 'history',
    difficulty: 'hard',
    question: 'Which Chinese dynasty was founded by Kublai Khan in 1271, establishing Mongol rule over all of China?',
    options: ['Song Dynasty', 'Yuan Dynasty', 'Ming Dynasty', 'Tang Dynasty'],
    correctAnswer: 'Yuan Dynasty',
    explanation: 'Kublai Khan proclaimed the Yuan Dynasty in 1271, uniting China under Mongol control and welcoming travelers like Marco Polo.',
  },
  {
    id: 'hist-h-04',
    category: 'history',
    difficulty: 'hard',
    question: 'What 1648 series of peace treaties concluded the catastrophic Thirty Years’ War in Central Europe and birthed modern state sovereignty?',
    options: ['Peace of Augsburg', 'Peace of Westphalia', 'Treaty of Utrecht', 'Edict of Nantes'],
    correctAnswer: 'Peace of Westphalia',
    explanation: 'Signed in Münster and Osnabrück, Westphalia established the principle of national sovereignty and non-interference in domestic affairs.',
  },
  {
    id: 'hist-h-05',
    category: 'history',
    difficulty: 'hard',
    question: 'Who was the Roman statesman and orator whose speeches against Catiline and Mark Antony are regarded as masterpieces of classical rhetoric?',
    options: ['Seneca the Younger', 'Marcus Tullius Cicero', 'Tacitus', 'Quintilian'],
    correctAnswer: 'Marcus Tullius Cicero',
    explanation: 'Cicero was a renowned consul whose philosophical treatises and Philippics shaped Latin literature and Western political thought.',
  },
];

/**
 * Validates the question bank to ensure integrity:
 * - Every question has exactly 4 options
 * - Correct answer exists inside the options
 * - All IDs are unique
 */
export function validateQuestionBank(bank: Question[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const seenIds = new Set<string>();

  for (const q of bank) {
    if (seenIds.has(q.id)) {
      errors.push(`Duplicate question ID detected: ${q.id}`);
    }
    seenIds.add(q.id);

    if (!q.options || q.options.length !== 4) {
      errors.push(`Question "${q.id}" does not have exactly 4 options.`);
    }

    if (!q.options.includes(q.correctAnswer)) {
      errors.push(`Question "${q.id}" correct answer "${q.correctAnswer}" is not in its options.`);
    }

    if (!q.question.trim()) {
      errors.push(`Question "${q.id}" has empty question text.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Self-check validation at import
const validation = validateQuestionBank(QUESTION_BANK);
if (!validation.isValid) {
  console.error('[QuizQuest] Question bank validation failed:', validation.errors);
} else {
  // verified
}
