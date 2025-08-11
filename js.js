document.addEventListener('DOMContentLoaded', function() {
    const poemContainer = document.getElementById('poemContainer');
    const highlightBtn = document.getElementById('highlightBtn');
    const increaseFontBtn = document.getElementById('increaseFontBtn');
    const decreaseFontBtn = document.getElementById('decreaseFontBtn');
    const boldBtn = document.getElementById('boldBtn');
    const resetLayoutBtn = document.getElementById('resetLayoutBtn');
    const randomLayoutBtn = document.getElementById('randomLayoutBtn');
    const saveLayoutBtn = document.getElementById('saveLayoutBtn');
    const savedLayoutsContainer = document.getElementById('savedLayouts');
    const promptBox = document.getElementById('randomPrompt');promptBox.style.display = 'none';    
    const newPromptBtn = document.getElementById('newPromptBtn');
    const firstPageBtn = document.getElementById('firstPageBtn');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const pageIndicator = document.getElementById('pageIndicator');
    const aboutBtn     = document.getElementById('aboutBtn');
    const aboutPage    = document.getElementById('aboutPage');
    const mainContent  = document.getElementById('mainContent');
    const englishBtn = document.getElementById('englishBtn');
    const frenchBtn = document.getElementById('frenchBtn');
    const italicBtn = document.getElementById('italicBtn');

let currentPage = 0; 
let currentLanguage = 'french'; 
let isPlainTextMode = false; 

    englishBtn.addEventListener('click', () => {
    currentLanguage = 'english';
    if (isPlainTextMode) {
        renderPage(-1);
    } else {
        renderPage(currentPage);
    }
});

    frenchBtn.addEventListener('click', () => {
    currentLanguage = 'french';
    if (isPlainTextMode) {
        renderPage(-1);
    } else {
        renderPage(currentPage);
    }
});


aboutBtn.addEventListener('click', e => {
  e.preventDefault();
  const showingAbout = aboutPage.classList.toggle('active');
  mainContent.classList.toggle('hidden', showingAbout);
  // swap link text
  aboutBtn.textContent = showingAbout ? 'Home' : 'About';
});

const closeAboutBtn = document.getElementById('closeAboutBtn');
if (closeAboutBtn) { 
    closeAboutBtn.addEventListener('click', function() {
        aboutPage.classList.remove('active');
        mainContent.classList.remove('hidden');
        aboutBtn.textContent = 'About';
    });
}

    firstPageBtn.addEventListener('click', () => {
        poemContainer.classList.remove('plain-text-mode');
        isPlainTextMode = false; 
    currentPage = 0;
    renderPage(currentPage);
  });
    
  
    let savedLayoutsByPage = {};

      let highlightMode = false;
      let selectedWord  = null;
      let dragEl,startX;   

function bindDrag() {
  document.querySelectorAll('.word').forEach(el => {
    el.addEventListener('mousedown', function(e) {
      selectedWord = this;
      this.classList.add('selected');

      dragEl = this;                              
      const initialLeft = parseFloat(getComputedStyle(dragEl).left);
      const parent      = dragEl.parentElement;
      const maxLeft     = parent.clientWidth - dragEl.offsetWidth;
      startX            = e.clientX;              

      function horizontalDrag(ev) {
        let deltaX  = ev.clientX - startX;
        let newLeft = initialLeft + deltaX;
        newLeft     = Math.max(0, Math.min(newLeft, maxLeft));
        dragEl.style.left = newLeft + 'px';
      }

      document.addEventListener('mousemove', horizontalDrag);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', horizontalDrag);
        dragEl = null;
      }, { once: true });

      e.preventDefault();
    });
  });
}

const page1Words = [
    { text: "UN COUP DE DÉS", translation: "A THROW OF THE DICE", left: 685, top: 155, fontSize: 43, isItalic: false },
];

const page2Words = [
    { text: "JAMAIS", translation: "NEVER", left: 721, top: 425, fontSize: 39, isItalic: false },
    { text: "QUAND BIEN MÊME LANCÉ DANS DES CIRCONSTANCES", translation: "EVEN WHEN TRULY CAST IN THE CIRCUMSTANCE", left: 696, top: 530, fontSize: 13, isItalic: false },
    { text: "ÉTERNELLES", translation: "ETERNAL", left: 666, top: 561, fontSize: 13, isItalic: false },
    { text: "DU FOND D'UN NAUFRAGE", translation: "OF A SHIPWRECK'S DEPTH", left: 751, top: 629, fontSize: 13, isItalic: false },
];

const page3Words = [
    { text: "SOIT", translation: "Can be only", left: 186, top: 104, fontSize: 15, isItalic: false },
    { text: "que", translation: "the", left: 218, top: 121, fontSize: 12, isItalic: false },
    { text: "l'Abîme", translation: "Abyss", left: 282, top: 153, fontSize: 13, isItalic: false },
    { text: "blanchi", translation: "raging, whitened,", left: 209, top: 198, fontSize: 12, isItalic: false },
    { text: "étale", translation: "stalled", left: 250, top: 217, fontSize: 12, isItalic: false },
    { text: "furieux", translation: "beneath", left: 271, top: 231, fontSize: 12, isItalic: false },
    { text: "sous une inclinaison", translation: "the desperately sloping", left: 328, top: 246, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "plane désespérément", translation: "incline", left: 375, top: 265, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "d'aile", translation: "of its own wing", left: 479, top: 294, fontSize: 12, isItalic: false },
    { text: "la sienne", translation: "through an", left: 456, top: 326, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "par", translation: "advance", left: 524, top: 346, fontSize: 12, isItalic: false },
    { text: "avance retombée d'un mal à dresser le vol", translation: "falling back from ill to take flight", left: 683, top: 346, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "et couvrant les jaillissements", translation: "and veiling the gushers", left: 817, top: 360, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "coupant au ras les bonds", translation: "restraining the surges", left: 859, top: 374, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "très à l'intérieur résume", translation: "gathered far within", left: 739, top: 424, fontSize: 12, isItalic: false, wordspacing: 3 },
    { text: "l'ombre enfouie dans la profondeur par cette voile alternative", translation: "the shadow buried deep by that alternative sail", left: 684, top: 453, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "jusqu'adapter", translation: "almost matching", left: 844, top: 485, fontSize: 12, isItalic: false },
    { text: "à l'envergure", translation: "its yawning depth to the wingspan", left: 883, top: 503, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "sa béante profondeur en tant que la coque", translation: "like a hull", left: 765, top: 533, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "d'un bâtiment", translation: "of a vessel", left: 856, top: 563, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "penché de l'un ou l'autre bord", translation: "rocked from side to side", left: 828, top: 598, fontSize: 12, isItalic: false, wordspacing: 2 }
];

const page4Words = [
    { text: "LE MAÎTRE", translation: "THE MASTER", left: 397, top: 95, fontSize: 16, isItalic: false, wordspacing: 4 },
    { text: "hors d'anciens calculs", translation: "beyond former calculations", left: 754, top: 97, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "où la manœuvre avec l'âge oubliée", translation: "where the lost manoeuvre with the age", left: 736, top: 111, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "surgi", translation: "rose", left: 307, top: 142, fontSize: 12, isItalic: false },
    { text: "inférant", translation: "implying", left: 332, top: 160, fontSize: 12, isItalic: false },
    { text: "jadis il empoignait la barre", translation: "that formerly he grasped the helm", left: 805, top: 159, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "de cette conflagration", translation: "of this conflagration", left: 416, top: 191, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "à ses pieds", translation: "of the concerted horizon at his feet", left: 690, top: 191, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "de l'horizon unanime", translation: "that readies itself", left: 749, top: 208, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "que se", translation: "moves", left: 449, top: 240, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "prépare", translation: "and merges", left: 692, top: 236, fontSize: 12, isItalic: false },
    { text: "s'agite et mêle", translation: "with the blow that grips it", left: 704, top: 253, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "au poing qui l'étreindrait", translation: "as one threatens", left: 724, top: 271, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "comme on menace", translation: "fate and the winds", left: 429, top: 288, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "un destin et les vents", translation: "the unique Number", left: 691, top: 286, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "l'unique Nombre qui ne peut pas", translation: "which cannot", left: 343, top: 316, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "être un autre", translation: "be another", left: 692, top: 316, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "Esprit", translation: "Spirit", left: 780, top: 347, fontSize: 13, isItalic: false },
    { text: "pour le jeter", translation: "to hurl it", left: 813, top: 363, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "dans la tempête", translation: "into the storm", left: 886, top: 378, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "en reployer la division et passer fier", translation: "relinquish the cleaving there, and pass proudly", left: 850, top: 395, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "hésite", translation: "hesitates", left: 503, top: 425, fontSize: 12, isItalic: false },
    { text: "cadavre par le bras", translation: "a corpse pushed back by the arm", left: 427, top: 442, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "écarté du secret qu'il détient", translation: "from the secret", left: 693, top: 442, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "plutôt", translation: "rather than", left: 258, top: 459, fontSize: 12, isItalic: false },
    { text: "que de jouer", translation: "taking sides", left: 297, top: 473, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "en maniaque chenu", translation: "a hoary madman", left: 336, top: 490, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "la partie", translation: "on behalf", left: 402, top: 504, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "au nom des flots", translation: "of the waves", left: 372, top: 521, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "un", translation: "one", left: 522, top: 537, fontSize: 12, isItalic: false },
    { text: "envahit le chef", translation: "overwhelms the head", left: 696, top: 538, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "coule en barbe soumise", translation: "flows through the submissive beard", left: 696, top: 553, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "naufrage cela", translation: "straight shipwreck", left: 462, top: 584, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "direct de l'homme", translation: "that, of the man", left: 695, top: 584, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "sans nef", translation: "without a vessel", left: 741, top: 614, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "n'importe", translation: "empty", left: 766, top: 630, fontSize: 12, isItalic: false },
    { text: "où vaine", translation: "no matter where", left: 831, top: 644, fontSize: 12, isItalic: false, wordspacing: 2 }
];

const page5Words = [
    { text: "ancestralement à n'ouvrir pas la main", translation: "ancestrally never to open the fist", left: 155, top: 91, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "crispée", translation: "clenched", left: 353, top: 108, fontSize: 12, isItalic: false },
    { text: "par delà l'inutile tête", translation: "beyond the helpless head", left: 311, top: 124, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "legs en la disparition", translation: "a legacy, in vanishing", left: 198, top: 155, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "à quelqu'un", translation: "to someone", left: 316, top: 188, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "ambigu", translation: "ambiguous", left: 384, top: 205, fontSize: 12, isItalic: false },
    { text: "l'ultérieur démon immémorial", translation: "the immemorial ulterior demon", left: 270, top: 235, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "ayant", translation: "having", left: 156, top: 269, fontSize: 12, isItalic: false },
    { text: "de contrées nulles", translation: "from non-existent regions", left: 197, top: 285, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "induit", translation: "led", left: 300, top: 301, fontSize: 12, isItalic: false },
    { text: "le vieillard vers cette conjonction suprême avec la probabilité", translation: "the old man towards this ultimate meeting with probability", left: 159, top: 317, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "celui", translation: "this", left: 356, top: 348, fontSize: 12, isItalic: false },
    { text: "son ombre puérile", translation: "his childlike shade", left: 385, top: 364, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "caressée et polie et rendue et lavée", translation: "caressed and smoothed and rendered", left: 158, top: 380, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "assouplie par la vague et soustraite", translation: "supple by the wave, and shielded", left: 282, top: 395, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "aux durs os perdus entre les ais", translation: "from hard bone lost between the planks", left: 268, top: 409, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "né", translation: "born", left: 389, top: 444, fontSize: 12, isItalic: false },
    { text: "d'un ébat", translation: "of a frolic", left: 405, top: 457, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "la mer par l'aïeul tentant ou l'aïeul contre la mer", translation: "the sea through the old man or the old man against the sea", left: 160, top: 474, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "une chance oiseuse", translation: "making a vain attempt", left: 254, top: 491, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "Fiançailles", translation: "an Engagement", left: 496, top: 522, fontSize: 13, isItalic: false },
    { text: "dont", translation: "whose", left: 157, top: 539, fontSize: 12, isItalic: false },
    { text: "le voile d'illusion rejaillit leur hantise", translation: "dread the veil of illusion rejected", left: 198, top: 552, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "ainsi que le fantôme d'un geste", translation: "as the phantom of a gesture", left: 198, top: 571, fontSize: 12, isItalic: false, wordspacing: 2 },
    { text: "chancellera", translation: "will tremble", left: 327, top: 600, fontSize: 12, isItalic: false },
    { text: "s'affalera", translation: "collapse", left: 327, top: 617, fontSize: 12, isItalic: false },
    { text: "folie", translation: "madness", left: 386, top: 650, fontSize: 12, isItalic: false },
    { text: "N'ABOLIRA", translation: "WILL NEVER ABOLISH", left: 723, top: 658, fontSize: 38, isItalic: false, wordspacing: 6 }
];

const page6Words = [
    { text: "COMME SI", translation: "AS IF", left: 224, top: 194, fontSize: 14.5, isItalic: true },
    { text: "Une insinuation", translation: "A simple insinuation", left: 461, top: 238, fontSize: 12, isItalic: true },
    { text: "simple", translation: "into silence", left: 699, top: 240, fontSize: 12, isItalic: true },
    { text: "au silence", translation: "entwined", left: 493, top: 273, fontSize: 12, isItalic: true },
    { text: "enroulée avec ironie", translation: "with irony", left: 700, top: 272, fontSize: 12, isItalic: true },
    { text: "ou", translation: "or", left: 799, top: 288, fontSize: 12, isItalic: true },
    { text: "le mystère", translation: "the mystery", left: 808, top: 304, fontSize: 12, isItalic: true },
    { text: "précipité", translation: "hurled", left: 856, top: 319, fontSize: 12, isItalic: true },
    { text: "hurlé", translation: "howled", left: 899, top: 335, fontSize: 12, isItalic: true },
    { text: "dans quelque proche", translation: "in some close", left: 435, top: 369, fontSize: 12, isItalic: true },
    { text: "tourbillon d'hilarité et d'horreur", translation: "swirl of mirth and terror", left: 698, top: 367, fontSize: 12, isItalic: true },
    { text: "voltige", translation: "whirls", left: 513, top: 414, fontSize: 12, isItalic: true },
    { text: "autour du gouffre", translation: "round the abyss", left: 697, top: 414, fontSize: 12, isItalic: true },
    { text: "sans le joncher", translation: "without scattering", left: 818, top: 431, fontSize: 12, isItalic: true },
    { text: "ni fuir", translation: "or dispersing", left: 903, top: 446, fontSize: 12, isItalic: true },
    { text: "et en berce le vierge indice", translation: "and cradles the virgin index there", left: 806, top: 477, fontSize: 12, isItalic: true },
    { text: "COMME SI", translation: "AS IF", left: 1019, top: 522, fontSize: 14.5, isItalic: true }
];

const page7Words = [
    { text: "plume solitaire éperdue", translation: "a solitary plume overwhelmed", left: 289, top: 206, fontSize: 12, isItalic: true },
    { text: "sauf", translation: "untouched", left: 515, top: 331, fontSize: 12, isItalic: true },
    { text: "que la rencontre ou l'effleure une toque de minuit", translation: "that a cap of midnight grazes, or encounters", left: 698, top: 324, fontSize: 12, isItalic: true },
    { text: "et immobilise", translation: "and fixes", left: 830, top: 337, fontSize: 12, isItalic: true },
    { text: "au velours chiffonné par un esclaffement sombre", translation: "in crumpled velvet with a sombre burst of laughter", left: 765, top: 353, fontSize: 12, isItalic: true },
    { text: "cette blancheur rigide", translation: "that rigid whiteness", left: 784, top: 419, fontSize: 12, isItalic: true },
    { text: "dérisoire", translation: "derisory", left: 699, top: 452, fontSize: 12, isItalic: true },
    { text: "en opposition au ciel", translation: "in opposition to the heavens", left: 808, top: 465, fontSize: 12, isItalic: true },
    { text: "trop", translation: "too much so", left: 754, top: 482, fontSize: 12, isItalic: true },
    { text: "pour ne pas marquer", translation: "not to signal", left: 787, top: 500, fontSize: 12, isItalic: true },
    { text: "exiguëment", translation: "closely", left: 884, top: 515, fontSize: 12, isItalic: true },
    { text: "quiconque", translation: "any", left: 915, top: 528, fontSize: 12, isItalic: true },
    { text: "prince amer de l'écueil", translation: "bitter prince of the reef", left: 817, top: 561, fontSize: 12, isItalic: true },
    { text: "s'en coiffe comme de l'héroïque", translation: "heroically adorned with it", left: 805, top: 589, fontSize: 12, isItalic: true },
    { text: "irrésistible mais contenu", translation: "indomitable, but contained", left: 836, top: 607, fontSize: 12, isItalic: true },
    { text: "par sa petite raison virile", translation: "by his petty reason, virile", left: 819, top: 624, fontSize: 12, isItalic: true },
    { text: "en foudre", translation: "in lightning", left: 991, top: 636, fontSize: 12, isItalic: true }
];

const page8Words = [
    { text: "soucieux", translation: "anxious", left: 161, top: 87, fontSize: 12, isItalic: true },
    { text: "expiatoire et pubère", translation: "expiatory and pubescent", left: 231, top: 104, fontSize: 12, isItalic: true },
    { text: "muet", translation: "dumb", left: 427, top: 121, fontSize: 12, isItalic: true },
    { text: "rire", translation: "laughter", left: 788, top: 115, fontSize: 12, isItalic: true },
    { text: "que", translation: "that", left: 827, top: 150, fontSize: 12, isItalic: true },
    { text: "SI", translation: "IF", left: 856, top: 203, fontSize: 18, isItalic: true },
    { text: "La lucide et seigneuriale aigrette", translation: "the lucid and lordly crest", left: 357, top: 326, fontSize: 12, isItalic: true },
    { text: "de vertige", translation: "of vertigo", left: 698, top: 322, fontSize: 12, isItalic: true },
    { text: "au front invisible", translation: "on the invisible brow", left: 425, top: 343, fontSize: 12, isItalic: true },
    { text: "scintille", translation: "sparkles", left: 386, top: 359, fontSize: 12, isItalic: true },
    { text: "puis ombrage", translation: "then shades", left: 426, top: 374, fontSize: 12, isItalic: true },
    { text: "debout", translation: "a slim dark tallness, upright", left: 699, top: 386, fontSize: 12, isItalic: true },
    { text: "une stature mignonne ténébreuse", translation: "in its siren coiling", left: 362, top: 390, fontSize: 12, isItalic: true },
    { text: "le temps", translation: "at the moment", left: 724, top: 416, fontSize: 12, isItalic: true },
    { text: "en sa torsion de sirène", translation: "of striking", left: 398, top: 406, fontSize: 12, isItalic: true },
    { text: "de souffleter", translation: "through impatient", left: 748, top: 432, fontSize: 12, isItalic: true },
    { text: "bifurquées", translation: "ultimate scales, bifurcated", left: 701, top: 449, fontSize: 12, isItalic: true },
    { text: "par d'impatientes squames ultimes", translation: "a rock", left: 352, top: 456, fontSize: 12, isItalic: true },
    { text: "un roc", translation: "a deceptive manor", left: 749, top: 482, fontSize: 12, isItalic: true },
    { text: "faux manoir", translation: "suddenly", left: 721, top: 512, fontSize: 12, isItalic: true },
    { text: "tout de suite", translation: "evaporating in fog", left: 769, top: 528, fontSize: 12, isItalic: true },
    { text: "évaporé en brumes", translation: "that imposed", left: 797, top: 543, fontSize: 12, isItalic: true },
    { text: "qui imposa", translation: "limits on the infinite", left: 790, top: 574, fontSize: 12, isItalic: true },
    { text: "une borne à l'infini", translation: "", left: 821, top: 592, fontSize: 12, isItalic: true }
];


const page9Words = [
        { text: "C'ÉTAIT", translation: "IT WAS", left: 469, top: 90, fontSize: 18, isItalic: true },
        { text: "issu stellaire", translation: "stellar outcome", left: 478, top: 109, fontSize: 10, isItalic: true },
        { text: "LE NOMBRE", translation: "THE NUMBER", left: 924, top: 92, fontSize: 18, isItalic: true },
        { text: "EXISTÂT-IL", translation: "WERE IT TO HAVE EXISTED", left: 912, top: 136, fontSize: 15, isItalic: false },
        { text: "autrement qu'hallucination éparse d'agonie", translation: "other than as a fragmented, agonised hallucination", left: 885, top: 151, fontSize: 10, isItalic: false },
        { text: "COMMENÇÂT-IL ET CESSÂT-IL", translation: "WERE IT TO HAVE BEGUN AND ENDED", left: 862, top: 181, fontSize: 15, isItalic: false },
        { text: "sourdant que nié et clos quand apparu", translation: "a surging that denied, and closed, when visible", left: 848, top: 196, fontSize: 10, isItalic: false },
        { text: "enfin", translation: "at last", left: 906, top: 207, fontSize: 10, isItalic: false },
        { text: "par quelque profusion répandue en rareté", translation: "by some profusion spreading in sparseness", left: 880, top: 217, fontSize: 10, isItalic: false },
        { text: "SE CHIFFRÂT-IL", translation: "WERE IT TO HAVE AMOUNTED", left: 970, top: 233, fontSize: 15, isItalic: false },
        { text: "évidence de la somme pour peu qu'une", translation: "to the fact of the total, though as little as one", left: 887, top: 267, fontSize: 10, isItalic: true },
        { text: "ILLUMINÂT-IL", translation: "WERE IT TO HAVE LIGHTED", left: 965, top: 284, fontSize: 15, isItalic: false },
        { text: "CE SERAIT", translation: "IT WOULD BE", left: 155, top: 383, fontSize: 18, isItalic: true },
        { text: "pire", translation: "worse", left: 218, top: 403, fontSize: 10, isItalic: true },
        { text: "non", translation: "no", left: 272, top: 413, fontSize: 10, isItalic: true },
        { text: "davantage ni moins", translation: "more nor less", left: 308, top: 424, fontSize: 10, isItalic: true },
        { text: "indifféremment mais autant", translation: "indifferently but as much", left: 427, top: 435, fontSize: 10, isItalic: true },
        { text: "LE HASARD", translation: "CHANCE", left: 814, top: 428, fontSize: 40, isItalic: false, wordspacing: 10 },
        { text: "Choit", translation: "Falls", left: 759, top: 534, fontSize: 13, isItalic: true },
        { text: "la plume", translation: "the plume", left: 787, top: 549, fontSize: 13, isItalic: true },
        { text: "rythmique suspens du sinistre", translation: "rhythmic suspense of the disaster", left: 824, top: 564, fontSize: 13, isItalic: true },
        { text: "s'ensevelir", translation: "to bury itself", left: 995, top: 583, fontSize: 13, isItalic: true },
        { text: "aux écumes originelles", translation: "in the original foam", left: 924, top: 598, fontSize: 13, isItalic: true },
        { text: "naguères d'où sursauta son délire jusqu'à une cime", translation: "from which its delirium formerly leapt to the summit", left: 779, top: 612, fontSize: 13, isItalic: true },
        { text: "flétrie", translation: "faded", left: 968, top: 628, fontSize: 13, isItalic: true },
        { text: "par la neutralité identique du gouffre", translation: "by the same neutrality of abyss", left: 841, top: 644, fontSize: 13, isItalic: true }
    ];

    const page10Words = [
        { text: "RIEN", translation: "NOTHING", left: 364, top: 312, fontSize: 15, isItalic: false },
        { text: "de la mémorable crise", translation: "of the memorable crisis", left: 413, top: 377, fontSize: 12, isItalic: false, wordspacing: 5 },
        { text: "ou se fût", translation: "where", left: 461, top: 391, fontSize: 12, isItalic: false, wordspacing: 5 },
        { text: "l'événement", translation: "the event", left: 488, top: 407, fontSize: 12, isItalic: false },
        { text: "accompli en vue de tout résultat nul", translation: "matured, accomplished in sight of all non-existent", left: 693, top: 409, fontSize: 12, isItalic: false, wordspacing: 4.5 },
        { text: "humain", translation: "human outcomes", left: 915, top: 424, fontSize: 12, isItalic: false },
        { text: "N'AURA EU LIEU", translation: "WILL HAVE TAKEN PLACE", left: 826, top: 454, fontSize: 15, isItalic: false, wordspacing: 5 },
        { text: "une élévation ordinaire verse l'absence", translation: "a commonplace elevation pours out absence", left: 805, top: 472, fontSize: 12, isItalic: false, wordspacing: 5.5 },
        { text: "QUE LE LIEU", translation: "BUT THE PLACE", left: 975, top: 504, fontSize: 15, isItalic: false, wordspacing: 5 },
        { text: "inférieur clapotis quelconque comme pour disperser l'acte vide", translation: "some lapping below, as if to scatter the empty act", left: 695, top: 520, fontSize: 12, isItalic: false, wordspacing: 4 },
        { text: "abruptement qui sinon", translation: "abruptly, that otherwise", left: 848, top: 535, fontSize: 12, isItalic: false, wordspacing: 4 },
        { text: "par son mensonge", translation: "by its falsity", left: 831, top: 552, fontSize: 12, isItalic: false, wordspacing: 4 },
        { text: "eût fondé", translation: "would have plumbed", left: 882, top: 566, fontSize: 12, isItalic: false },
        { text: "la perdition", translation: "perdition", left: 869, top: 581, fontSize: 12, isItalic: false, wordspacing: 4 },
        { text: "dans ces parages", translation: "in this region", left: 693, top: 613, fontSize: 12, isItalic: false, wordspacing: 4 },
        { text: "du vague", translation: "of vagueness", left: 801, top: 628, fontSize: 12, isItalic: false, wordspacing: 4 },
        { text: "en quoi toute réalité se dissout", translation: "in which all reality dissolves", left: 854, top: 642, fontSize: 12, isItalic: false, wordspacing: 4 },
    ];

    const page11Words = [
        { text: "EXCEPTÉ", translation: "EXCEPT", left: 212, top: 103, fontSize: 15, isItalic: false },
        { text: "à l'altitude", translation: "at the altitude", left: 272, top: 118, fontSize: 12, isItalic: false },
        { text: "PEUT-ÊTRE", translation: "PERHAPS", left: 329, top: 132, fontSize: 15, isItalic: false },
        { text: "aussi loin qu'un endroit", translation: "as far as a place", left: 417, top: 150, fontSize: 12, isItalic: false },
        { text: "fusionne avec au delà", translation: "fuses with, beyond", left: 692, top: 160, fontSize: 12, isItalic: false },
        { text: "hors l'intérêt", translation: "outside the interest", left: 828, top: 190, fontSize: 12, isItalic: false },
        { text: "quant à lui signalé", translation: "signalled regarding it", left: 801, top: 205, fontSize: 12, isItalic: false },
        { text: "en général", translation: "in general", left: 911, top: 225, fontSize: 12, isItalic: false },
        { text: "selon telle obliquité par telle déclivité", translation: "in accord with such obliquity, through such declination", left: 692, top: 239, fontSize: 12, isItalic: false },
        { text: "de feux", translation: "of fire", left: 924, top: 257, fontSize: 12, isItalic: false },
        { text: "vers", translation: "towards", left: 736, top: 286, fontSize: 12, isItalic: false },
        { text: "ce doit être", translation: "what must be", left: 757, top: 302, fontSize: 12, isItalic: false },
        { text: "le Septentrion aussi Nord", translation: "the Wain also North", left: 787, top: 319, fontSize: 12, isItalic: false },
        { text: "UNE CONSTELLATION", translation: "A CONSTELLATION", left: 907, top: 348, fontSize: 15, isItalic: false },
        { text: "froide d'oubli et de désuétude", translation: "cold with neglect and desuetude", left: 779, top: 382, fontSize: 12, isItalic: false },
        { text: "pas tant", translation: "not so much", left: 905, top: 397, fontSize: 12, isItalic: false },
        { text: "qu'elle n'énumère", translation: "though that it fails to enumerate", left: 894, top: 412, fontSize: 12, isItalic: false },
        { text: "sur quelque surface vacante et supérieure", translation: "on some vacant and superior surface", left: 814, top: 429, fontSize: 12, isItalic: false },
        { text: "le heurt successif", translation: "the consecutive clash", left: 890, top: 443, fontSize: 12, isItalic: false },
        { text: "sidéralement", translation: "sidereally", left: 976, top: 458, fontSize: 12, isItalic: false },
        { text: "d'un compte total en formation", translation: "of a final account in formation", left: 813, top: 476, fontSize: 12, isItalic: false },
        { text: "veillant", translation: "attending", left: 696, top: 507, fontSize: 12, isItalic: false },
        { text: "doutant", translation: "doubting", left: 750, top: 523, fontSize: 12, isItalic: false },
        { text: "roulant", translation: "rolling", left: 806, top: 537, fontSize: 12, isItalic: false },
        { text: "brillant et méditant", translation: "shining and meditating", left: 842, top: 553, fontSize: 12, isItalic: false },
        { text: "avant de s'arrêter", translation: "before stopping", left: 905, top: 584, fontSize: 12, isItalic: false },
        { text: "à quelque point dernier qui le sacre", translation: "at some last point that crowns it", left: 837, top: 600, fontSize: 12, isItalic: false },
        { text: "Toute Pensée émet un Coup de Dés", translation: "All Thought expresses a Throw of the Dice", left: 839, top: 642, fontSize: 13, isItalic: false }
    ];

const allPagesData = [page1Words, page2Words, page3Words, page4Words, page5Words, page6Words, page7Words, page8Words, page9Words, page10Words, page11Words];
const plainTextPage = {
   words: [
        { text: "UN COUP DE DÉS JAMAIS", translation: "A THROW OF THE DICE NEVER", left: 50, top: 50, fontSize: 14, isItalic: false },
        { text: "QUAND BIEN MÊME LANCÉ DANS DES CIRCONSTANCES ÉTERNELLES", translation: "EVEN WHEN TRULY CAST IN THE ETERNAL CIRCUMSTANCE", left: 50, top: 80, fontSize: 14, isItalic: false },
        { text: "DU FOND D'UN NAUFRAGE", translation: "OF A SHIPWRECK'S DEPTH", left: 50, top: 110, fontSize: 14, isItalic: false },
        { text: "Soit que l'Abîme blanchi, étale, furieux", translation: "Can be only the Abyss raging, whitened, stalled", left: 50, top: 150, fontSize: 12, isItalic: false },
        { text: "sous une inclinaison planche désespérément d'aile, la sienne,", translation: "beneath the desperately sloping incline of its own wing,", left: 50, top: 175, fontSize: 12, isItalic: false },
        { text: "par avance retombée d'un mal à dresser le vol", translation: "through an advance falling back from ill to take flight,", left: 50, top: 200, fontSize: 12, isItalic: false },
        { text: "et couvrant les jaillissements, coupant au ras les bonds", translation: "and veiling the gushers, restraining the surges,", left: 50, top: 225, fontSize: 12, isItalic: false },
        { text: "très à l'intérieur résume l'ombre enfouie dans la profondeur,", translation: "gathered far within the shadow buried deep", left: 50, top: 250, fontSize: 12, isItalic: false },
        { text: "par cette voile alternative jusqu'adapter à l'envergure", translation: "by that alternative sail, almost matching its yawning depth to the wingspan,", left: 50, top: 275, fontSize: 12, isItalic: false },
        { text: "sa béante profondeur entant que la coque d'un bâtiment", translation: "like a hull of a vessel", left: 50, top: 300, fontSize: 12, isItalic: false },
        { text: "penché de l'un ou l'autre bord", translation: "rocked from side to side", left: 50, top: 325, fontSize: 12, isItalic: false },
        { text: "LE MAÎTRE", translation: "THE MASTER", left: 50, top: 365, fontSize: 14, isItalic: false },
        { text: "hors d'anciens calculs, où la manoeuvre avec l'âge oubliée", translation: "beyond former calculations, where the lost manoeuvre with the age", left: 50, top: 395, fontSize: 12, isItalic: false },
        { text: "surgi jadis, il empoignait la barre", translation: "rose implying that formerly he grasped the helm", left: 50, top: 420, fontSize: 12, isItalic: false },
        { text: "inférant de cette conflagration à ses pieds", translation: "of this conflagration of the concerted horizon at his feet,", left: 50, top: 445, fontSize: 12, isItalic: false },
        { text: "de l'horizon unanime, que se prépare s'agite et mêle", translation: "that readies itself; moves; and merges", left: 50, top: 470, fontSize: 12, isItalic: false },
        { text: "au poing qui l'étreindrait, comme on menace un destin et les vents,", translation: "with the blow that grips it, as one threatens fate and the winds,", left: 50, top: 495, fontSize: 12, isItalic: false },
        { text: "l'unique Nombre, qui ne peut pas être un autre Esprit,", translation: "the unique Number, which cannot be another Spirit,", left: 50, top: 520, fontSize: 12, isItalic: false },
        { text: "pour le jeter dans la tempête en reployer la division et passer fier;", translation: "to hurl it into the storm, relinquish the cleaving there, and pass proudly;", left: 50, top: 545, fontSize: 12, isItalic: false },
        { text: "hésite", translation: "hesitates,", left: 50, top: 580, fontSize: 12, isItalic: false },
        { text: "cadavre par le bras écarté du secret qu'il détient", translation: "a corpse pushed back by the arm from the secret,", left: 50, top: 610, fontSize: 12, isItalic: false },
        { text: "plutôt que de jouer, en maniaque: chenu", translation: "rather than taking sides, a hoary madman,", left: 50, top: 635, fontSize: 12, isItalic: false },
        { text: "la partie au nom des flots, un envahit le chef,", translation: "on behalf of the waves: one overwhelms the head,", left: 50, top: 660, fontSize: 12, isItalic: false },
        { text: "coule en barbe, soumise naufrage, cela", translation: "flows through the submissive beard, straight shipwreck that,", left: 50, top: 685, fontSize: 12, isItalic: false },
        { text: "direct de l'homme sans nef, n'importe où vaine", translation: "of the man without a vessel, empty no matter where", left: 50, top: 710, fontSize: 12, isItalic: false },
        { text: "ancestralement à n'ouvrir pas la main crispée", translation: "ancestrally never to open the fist clenched", left: 50, top: 745, fontSize: 12, isItalic: false },
        { text: "par delà l'inutile tête, legs en la disparition,", translation: "beyond the helpless head, a legacy, in vanishing,", left: 50, top: 770, fontSize: 12, isItalic: false },
        { text: "à quelqu'un ambigu, l'ultérieur démon immémorial,", translation: "to someone ambiguous, the immemorial ulterior demon", left: 50, top: 795, fontSize: 12, isItalic: false },
        { text: "ayant de contrées nulles induit le vieillard", translation: "having, from non-existent regions, led the old man", left: 50, top: 820, fontSize: 12, isItalic: false },
        { text: "vers cette conjonction suprême avec la probabilité,", translation: "towards this ultimate meeting with probability,", left: 50, top: 845, fontSize: 12, isItalic: false },
        { text: "celui son ombre puérile caressée et polie et rendue et lavée", translation: "this his childlike shade caressed and smoothed and rendered", left: 50, top: 880, fontSize: 12, isItalic: false },
        { text: "assouplie par la vague, et soustraite aux durs os perdus entre les ais", translation: "supple by the wave, and shielded from hard bone lost between the planks", left: 50, top: 905, fontSize: 12, isItalic: false },
        { text: "né d'un ébat, la mer par l'aïeul tentant ou l'aïeul contre la mer,", translation: "born of a frolic, the sea through the old man or the old man against the sea,", left: 50, top: 930, fontSize: 12, isItalic: false },
        { text: "une chance oiseuse,", translation: "making a vain attempt,", left: 50, top: 955, fontSize: 12, isItalic: false },
        { text: "Fiançailles dont le voile d'illusion rejailli leur hantise,", translation: "an Engagement whose dread the veil of illusion rejected,", left: 50, top: 990, fontSize: 12, isItalic: false },
        { text: "ainsi que le fantôme d'un geste", translation: "as the phantom of a gesture", left: 50, top: 1015, fontSize: 12, isItalic: false },
        { text: "chancellera, s'affalera, folie", translation: "will tremble, collapse, madness,", left: 50, top: 1040, fontSize: 12, isItalic: false },
        { text: "N'ABOLIRA", translation: "WILL NEVER ABOLISH", left: 50, top: 1080, fontSize: 14, isItalic: false },
        { text: "COMME SI", translation: "AS IF", left: 50, top: 1120, fontSize: 14, isItalic: false },
        { text: "Une insinuation simple au silence, enroulée avec ironie,", translation: "A simple insinuation into silence, entwined with irony,", left: 50, top: 1150, fontSize: 12, isItalic: false },
        { text: "ou le mystère précipité, hurlé,", translation: "or the mystery hurled, howled,", left: 50, top: 1175, fontSize: 12, isItalic: false },
        { text: "dans quelque proche tourbillon d'hilarité et d'horreur,", translation: "in some close swirl of mirth and terror,", left: 50, top: 1200, fontSize: 12, isItalic: false },
        { text: "voltige autour du gouffre sans le joncher ni fuir", translation: "whirls round the abyss without scattering or dispersing", left: 50, top: 1225, fontSize: 12, isItalic: false },
        { text: "et en berce le vierge indice", translation: "and cradles the virgin index there", left: 50, top: 1250, fontSize: 12, isItalic: false },
        { text: "COMME SI", translation: "AS IF", left: 50, top: 1285, fontSize: 14, isItalic: false },
        { text: "plume solitaire éperdue", translation: "a solitary plume overwhelmed,", left: 50, top: 1315, fontSize: 12, isItalic: false },
        { text: "sauf que la rencontre ou l'effleure une toque de minuit", translation: "untouched, that a cap of midnight grazes, or encounters,", left: 50, top: 1350, fontSize: 12, isItalic: false },
        { text: "et immobilise au velours chiffonné par un esclaffement sonore,", translation: "and fixes, in crumpled velvet with a sombre burst of laughter,", left: 50, top: 1375, fontSize: 12, isItalic: false },
        { text: "cette blancheur rigide, dérisoire en opposition au ciel,", translation: "that rigid whiteness, derisory, in opposition to the heavens,", left: 50, top: 1400, fontSize: 12, isItalic: false },
        { text: "trop pour ne pas marquer exigüment quiconque", translation: "too much so not to signal closely any", left: 50, top: 1425, fontSize: 12, isItalic: false },
        { text: "prince amer de l'écueil, s'en coiffe comme de l'héroïque,", translation: "bitter prince of the reef, heroically adorned with it,", left: 50, top: 1450, fontSize: 12, isItalic: false },
        { text: "irrésistible mais contenu par sa petite raison, virile", translation: "indomitable, but contained by his petty reason, virile", left: 50, top: 1475, fontSize: 12, isItalic: false },
        { text: "en foudre", translation: "in lightning", left: 50, top: 1500, fontSize: 12, isItalic: false },
        { text: "soucieux expiatoire et pubère", translation: "anxious expiatory and pubescent", left: 50, top: 1535, fontSize: 12, isItalic: false },
        { text: "muet", translation: "dumb", left: 50, top: 1560, fontSize: 12, isItalic: false },
        { text: "rire", translation: "laughter", left: 50, top: 1585, fontSize: 12, isItalic: false },
        { text: "que", translation: "that", left: 50, top: 1610, fontSize: 12, isItalic: false },
        { text: "SI", translation: "IF", left: 50, top: 1645, fontSize: 14, isItalic: false },
        { text: "La lucide et seigneuriale aigrette de vertige", translation: "the lucid and lordly crest of vertigo", left: 50, top: 1675, fontSize: 12, isItalic: false },
        { text: "au front invisible scintille, puis ombrage,", translation: "on the invisible brow sparkles, then shades,", left: 50, top: 1700, fontSize: 12, isItalic: false },
        { text: "une stature mignonne ténébreuse en sa torsion de sirène,", translation: "a slim dark tallness, upright in its siren coiling,", left: 50, top: 1725, fontSize: 12, isItalic: false },
        { text: "le temps de souffleter, par d'impatientes squames ultimes,", translation: "at the moment of striking, through impatient ultimate scales,", left: 50, top: 1750, fontSize: 12, isItalic: false },
        { text: "bifurquées, un roc faux manoir", translation: "bifurcated, a rock a deceptive manor", left: 50, top: 1775, fontSize: 12, isItalic: false },
        { text: "tout de suite évaporé en brumes", translation: "suddenly evaporating in fog", left: 50, top: 1800, fontSize: 12, isItalic: false },
        { text: "qui imposa une borne à l'infini", translation: "that imposed limits on the infinite", left: 50, top: 1825, fontSize: 12, isItalic: false },
        { text: "C'ÉTAIT LE NOMBRE", translation: "IT WAS THE NUMBER,", left: 50, top: 1865, fontSize: 14, isItalic: false },
        { text: "issu stellaire", translation: "stellar outcome,", left: 50, top: 1895, fontSize: 12, isItalic: false },
        { text: "EXISTÂT-IL", translation: "WERE IT TO HAVE EXISTED", left: 50, top: 1930, fontSize: 14, isItalic: false },
        { text: "autrement qu'hallucination éparse, d'agonie;", translation: "other than as a fragmented, agonised hallucination;", left: 50, top: 1960, fontSize: 12, isItalic: false },
        { text: "COMMENÇÂT-IL ET CESSÂT-IL", translation: "WERE IT TO HAVE BEGUN AND ENDED,", left: 50, top: 1995, fontSize: 14, isItalic: false },
        { text: "sourdant que nié, et clos, quand apparu enfin,", translation: "a surging that denied, and closed, when visible at last,", left: 50, top: 2025, fontSize: 12, isItalic: false },
        { text: "par quelque profusion répandue en rareté;", translation: "by some profusion spreading in sparseness;", left: 50, top: 2050, fontSize: 12, isItalic: false },
        { text: "SE CHIFFRÂT-IL", translation: "WERE IT TO HAVE AMOUNTED", left: 50, top: 2085, fontSize: 14, isItalic: false },
        { text: "évidence de la somme, pour peu qu'une;", translation: "to the fact of the total, though as little as one;", left: 50, top: 2115, fontSize: 12, isItalic: false },
        { text: "ILLUMINÂT-IL", translation: "WERE IT TO HAVE LIGHTED,", left: 50, top: 2150, fontSize: 14, isItalic: false },
        { text: "CE SERAIT", translation: "IT WOULD BE,", left: 50, top: 2185, fontSize: 14, isItalic: false },
        { text: "pire non davantage ni moins indifféremment mais autant", translation: "worse no more nor less indifferently but as much,", left: 50, top: 2215, fontSize: 12, isItalic: false },
        { text: "LE HASARD", translation: "CHANCE", left: 50, top: 2250, fontSize: 14, isItalic: false },
        { text: "Choit la plume, rythmique suspens du sinistre,", translation: "Falls the plume, rhythmic suspense of the disaster,", left: 50, top: 2285, fontSize: 12, isItalic: false },
        { text: "s'ensevelir aux écumes originelles naguères,", translation: "to bury itself in the original foam,", left: 50, top: 2310, fontSize: 12, isItalic: false },
        { text: "d'où sursauta son délire jusqu'à une cime", translation: "from which its delirium formerly leapt to the summit", left: 50, top: 2335, fontSize: 12, isItalic: false },
        { text: "flétrie par la neutralité identique du gouffre", translation: "faded by the same neutrality of abyss", left: 50, top: 2360, fontSize: 12, isItalic: false },
        { text: "RIEN", translation: "NOTHING", left: 50, top: 2400, fontSize: 14, isItalic: false },
        { text: "de la mémorable crise où se fût l'événement accompli,", translation: "of the memorable crisis where the event matured, accomplished", left: 50, top: 2430, fontSize: 12, isItalic: false },
        { text: "en vue de tout résultat nul humain,", translation: "in sight of all non-existent human outcomes,", left: 50, top: 2455, fontSize: 12, isItalic: false },
        { text: "N'AURA EU LIEU", translation: "WILL HAVE TAKEN PLACE", left: 50, top: 2490, fontSize: 14, isItalic: false },
        { text: "une élévation ordinaire verse l'absence", translation: "a commonplace elevation pours out absence", left: 50, top: 2520, fontSize: 12, isItalic: false },
        { text: "QUE LE LIEU", translation: "BUT THE PLACE", left: 50, top: 2555, fontSize: 14, isItalic: false },
        { text: "inférieur clapotis quelconque, comme pour disperser l'acte vide", translation: "some lapping below, as if to scatter the empty act", left: 50, top: 2585, fontSize: 12, isItalic: false },
        { text: "abruptement, qui sinon par son mensonge eût fondé la perdition,", translation: "abruptly, that otherwise by its falsity would have plumbed perdition,", left: 50, top: 2610, fontSize: 12, isItalic: false },
        { text: "dans ces parages du vague, en quoi toute réalité se dissout", translation: "in this region of vagueness, in which all reality dissolves", left: 50, top: 2635, fontSize: 12, isItalic: false },
        { text: "EXCEPTÉ", translation: "EXCEPT", left: 50, top: 2675, fontSize: 14, isItalic: false },
        { text: "à l'altitude", translation: "at the altitude", left: 50, top: 2705, fontSize: 12, isItalic: false },
        { text: "PEUT-ÊTRE", translation: "PERHAPS,", left: 50, top: 2740, fontSize: 14, isItalic: false },
        { text: "aussi loin qu'un endroit fusionne avec au-delà,", translation: "as far as a place fuses with, beyond,", left: 50, top: 2770, fontSize: 12, isItalic: false },
        { text: "hors l'intérêt quant à lui signalé, en général,", translation: "outside the interest signalled regarding it, in general,", left: 50, top: 2795, fontSize: 12, isItalic: false },
        { text: "selon telle obliquité, par telle déclivité de feux,", translation: "in accord with such obliquity, through such declination of fire,", left: 50, top: 2820, fontSize: 12, isItalic: false },
        { text: "vers ce doit être le Septentrion aussi Nord", translation: "towards what must be the Wain also North", left: 50, top: 2845, fontSize: 12, isItalic: false },
        { text: "UNE CONSTELLATION", translation: "A CONSTELLATION", left: 50, top: 2880, fontSize: 14, isItalic: false },
        { text: "froide d'oubli et de désuétude, pas tant qu'elle n'énumère,", translation: "cold with neglect and desuetude, not so much though that it fails to enumerate,", left: 50, top: 2910, fontSize: 12, isItalic: false },
        { text: "sur quelque surface vacante et supérieure,", translation: "on some vacant and superior surface,", left: 50, top: 2935, fontSize: 12, isItalic: false },
        { text: "le heurt successif, sidéralement,", translation: "the consecutive clash, sidereally,", left: 50, top: 2960, fontSize: 12, isItalic: false },
        { text: "d'un compte total en formation,", translation: "of a final account in formation,", left: 50, top: 2985, fontSize: 12, isItalic: false },
        { text: "veillant, doutant, roulant, brillant et méditant", translation: "attending, doubting, rolling, shining and meditating", left: 50, top: 3010, fontSize: 12, isItalic: false },
        { text: "avant de s'arrêter à quelque point dernier qui le sacre", translation: "before stopping at some last point that crowns it", left: 50, top: 3035, fontSize: 12, isItalic: false },
        { text: "Toute pensée émet un Coup de Dés", translation: "All Thought expresses a Throw of the Dice", left: 50, top: 3070, fontSize: 14, isItalic: false }
]
}


    function renderPage(pageIndex) {
  poemContainer.innerHTML = 
    '<div class="half left-half"></div>' +
    '<div class="half right-half"></div>';
  const leftHalf  = poemContainer.querySelector('.left-half');
  const rightHalf = poemContainer.querySelector('.right-half');

  const words = pageIndex === -1 ? currentWords : allPagesData[pageIndex];
  if (!words) return;

  const lineHeights = [...new Set(words.map(w => w.top))];
  lineHeights.forEach(h => {
    const m = document.createElement('div');
    m.className = 'line-marker';
    m.style.top = (h + 12) + 'px';
    poemContainer.appendChild(m);
  });

  const halfWidth = poemContainer.clientWidth / 2;
words.forEach(w => {
    if (!w || typeof w.left !== 'number' || typeof w.top !== 'number') {
        console.error('Invalid', w);
        return; 
    }
    const el = document.createElement('div');
    el.className       = 'word poem-text';
    el.textContent = (currentLanguage === 'french') ? w.text : (w.translation || w.text);

    el.style.fontSize = w.fontSize + 'px';
    el.style.left = (w.left < halfWidth ? w.left : w.left - halfWidth) + 'px';
    el.style.top = w.top + 'px';
    if (w.isItalic) el.style.fontStyle = 'italic';
    if (w.wordspacing) el.style.wordSpacing = w.wordspacing + 'px';

    el.dataset.originalFontSize  = w.fontSize + 'px';
    el.dataset.originalFontStyle = w.isItalic ? 'italic' : 'normal';
    el.dataset.originalLeft      = el.style.left;
    el.dataset.originalTop       = el.style.top;

    el.addEventListener('click', handleWordClick);

    if (w.left < halfWidth) leftHalf.appendChild(el);
    else                    rightHalf.appendChild(el);
});

if (pageIndicator) { 
      if (pageIndex === -1) { 
          pageIndicator.textContent = 'Plain Text View';
            poemContainer.classList.add('plain-text-mode');
      } else { 
          const languageLabel = (currentLanguage === 'french') ? 'Français' : 'English';
          pageIndicator.textContent = `Page ${pageIndex + 1} / ${allPagesData.length} (${languageLabel})`;
           poemContainer.classList.remove('plain-text-mode'); 
      }
  }

  updateLayoutDisplay(currentPage);

bindDrag();

updateContainerHeight();
}


function updateContainerHeight() {
    const container = document.getElementById('poemContainer');
    const leftHalf = container.querySelector('.left-half'); 


    if (!container.classList.contains('plain-text-mode')) {
        leftHalf.style.height = ''; // 
        return; 
    }

    let maxBottom = 0;
    const words = container.querySelectorAll('.word');
    if (words.length === 0) {
        leftHalf.style.height = '0px';
        return;
    }

    words.forEach(el => {
        const bottom = el.offsetTop + el.offsetHeight;
        if (bottom > maxBottom) {
            maxBottom = bottom;
        }
    });
    leftHalf.style.height = (maxBottom + 20) + 'px';
}

function changePage(direction) {
     poemContainer.classList.remove('plain-text-mode');
     isPlainTextMode = false;
  const newPage = currentPage + direction;      
  if (newPage >= 0 && newPage < allPagesData.length) {
    currentPage = newPage;                     
    renderPage(currentPage); 
    promptBox.style.display = 'none';
                 
  }
}

const plainTextBtn = document.getElementById('plainTextBtn');

plainTextBtn.addEventListener('click', function() {
    console.log('showPlainText called');
    console.log('plainTextPage:', plainTextPage);
    console.log('plainTextPage.words:', plainTextPage.words);
    
    currentWords = [...plainTextPage.words];
    console.log('currentWords after setting:', currentWords);
    poemContainer.classList.add('plain-text-mode');
    isPlainTextMode = true;
    renderPage(-1);
    
    if (pageIndicator) {
        pageIndicator.textContent = 'Plain Text View';
    }
});

nextPageBtn.addEventListener('click', () => changePage(1));
prevPageBtn.addEventListener('click', () => changePage(-1));

   
    function handleWordClick(e) {
        if (highlightMode) {
            this.classList.toggle('highlighted');
            e.preventDefault();
        }
    }
    

    highlightBtn.addEventListener('click', function() {
        highlightMode = !highlightMode;
        this.textContent = highlightMode ? 'Exit Highlight Mode' : 'Toggle Highlight Mode';
        poemContainer.style.cursor = highlightMode ? 'pointer' : 'default';
    });
    
    increaseFontBtn.addEventListener('click', function() {
        if (selectedWord) {
            const currentSize = parseFloat(window.getComputedStyle(selectedWord).fontSize);
            selectedWord.style.fontSize = (currentSize + 2) + 'px';
        }
    });
    
    decreaseFontBtn.addEventListener('click', function() {
        if (selectedWord) {
            const currentSize = parseFloat(window.getComputedStyle(selectedWord).fontSize);
            if (currentSize > 8) {
                selectedWord.style.fontSize = (currentSize - 2) + 'px';
            }
        }
    });
    
    boldBtn.addEventListener('click', function() {
        if (selectedWord) {
            const currentWeight = window.getComputedStyle(selectedWord).fontWeight;
            selectedWord.style.fontWeight = (currentWeight === '700' || currentWeight === 'bold') ? 'normal' : 'bold';
        }
    });

    italicBtn.addEventListener('click', function() {
    if (selectedWord) {
        const currentStyle = window.getComputedStyle(selectedWord).fontStyle;
        selectedWord.style.fontStyle = (currentStyle === 'italic') ? 'normal' : 'italic';
    }
});

    
    resetLayoutBtn.addEventListener('click', function() {
        const words = poemContainer.querySelectorAll('.word');
        words.forEach(word => {
            word.style.left = word.dataset.originalLeft;
            word.style.top       = word.dataset.originalTop;
            word.style.fontSize = word.dataset.originalFontSize;
            word.style.fontWeight = 'normal';
            word.style.fontStyle = word.dataset.originalFontStyle;
            word.classList.remove('highlighted');
        });
        if (selectedWord) {
            selectedWord.classList.remove('selected');
            selectedWord = null;
        }
    });


      randomLayoutBtn.addEventListener('click', () => {
  document.querySelectorAll('.half').forEach(half => {
    const W = half.clientWidth;
    half.querySelectorAll('.word').forEach(el => {
      if (el) { 
        const w = el.offsetWidth;
        const maxLeft = W - w;
        const randomLeft = Math.random() * maxLeft;
        el.style.left = randomLeft + 'px';
      }
    });
  });
});
 

    function updateLayoutDisplay(pageIndex) {
        const layoutsForPage = savedLayoutsByPage[pageIndex] || [];
        const title = savedLayoutsContainer.querySelector('h3');
        savedLayoutsContainer.innerHTML = '';
        if (title) savedLayoutsContainer.appendChild(title);

        const caveat = document.createElement('p');
        caveat.className = 'layout-caveat';
        caveat.textContent = 'Please note: The “Save Layout” feature only persists in your current browser session and will be lost if you refresh, close the page, or switch between the two languages. Be sure to take screenshots of each layout to avoid losing your work.';
        savedLayoutsContainer.appendChild(caveat);

        if (layoutsForPage.length === 0) {
            const noSavedMsg = document.createElement('div');
            noSavedMsg.id = 'noSavedLayouts';
            noSavedMsg.textContent ='You have not saved anything yet.';
            savedLayoutsContainer.appendChild(noSavedMsg);
        } else {
            layoutsForPage.forEach((layout, index) => {
                const layoutDiv = document.createElement('div');
                layoutDiv.className = 'saved-layout';
                layoutDiv.innerHTML = `
                    <strong>Layout ${index + 1}</strong>
                    <p>${layout.date}</p>
                    <button class="load-layout-btn">Load Layout</button>
                    <button class="delete-layout-btn">Delete</button>
                `;
                layoutDiv.querySelector('.load-layout-btn').addEventListener('click', () => loadLayout(layout.state));
                layoutDiv.querySelector('.delete-layout-btn').addEventListener('click', function() {
                layoutsForPage.splice(index, 1);
                updateLayoutDisplay(pageIndex);
});
                savedLayoutsContainer.appendChild(layoutDiv);
            });
        }
    }
    
    saveLayoutBtn.addEventListener('click', function() {
        if (!savedLayoutsByPage[currentPage]) {
            savedLayoutsByPage[currentPage] = [];
        }
        
        const layoutState = {
            words: [],
        };
        const words = poemContainer.querySelectorAll('.word');
        words.forEach((word, idx)=> {
            layoutState.words.push({
                seq: idx,
                text: word.textContent,
                className: word.className.replace(/word|highlighted|selected/g, '').trim(),
                left: word.style.left,
                top: word.style.top,
                fontSize: word.style.fontSize,
                fontWeight: word.style.fontWeight,
                fontStyle: word.style.fontStyle,
                highlighted: word.classList.contains('highlighted'),
            });
        });
        
        savedLayoutsByPage[currentPage].push({
            state: layoutState,
            date: new Date().toLocaleString(),
        });

        updateLayoutDisplay(currentPage);   
    });
    
    function loadLayout(state) {
  const wordsNow = Array.from(poemContainer.querySelectorAll('.word'));

  state.words.forEach(wordData => {
    const el = wordsNow[wordData.seq]; 
    if (!el) return;

    el.style.left = wordData.left;
    el.style.top = wordData.top;
    el.style.fontSize = wordData.fontSize;
    el.style.fontWeight = wordData.fontWeight;
    el.style.fontStyle = wordData.fontStyle;
    el.classList.toggle('highlighted', !!wordData.highlighted);
  });
} 
    const prompts = [
        "Position text to create the longest possible reading path across the spread.",
        "Arrange the poem as if the words themselves were drowning.",
        "Create maximum contrast using only size variations (no repositioning).",
        "Arrange all text along diagonal lines to suggest falling or sinking.",
        "Create visual echoes by placing similar phrases in parallel positions across facing pages.",
        "Isolate all words relating to numbers/counting.",
        "Make the smallest words the most visually dominant through positioning alone.",
        "Arrange text to form a visual wave or tide across the spread.",
        "Arrange the poem as if strong wind were blowing the words to one side.",
        "Create a layout that forces the slowest possible reading experience."
    ];
    
    newPromptBtn.addEventListener('click', function() {
        promptBox.style.display = 'block';
        const randomIndex = Math.floor(Math.random() * prompts.length);
        promptBox.textContent = prompts[randomIndex];
        promptBox.style.backgroundColor = '#ccdaffff';
    });

    
    renderPage(0);
});