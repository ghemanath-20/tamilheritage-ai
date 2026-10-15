/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// தமிழ் மாதங்கள்
export const TAMIL_MONTHS = [
  'சித்திரை',
  'வைகாசி',
  'ஆனி',
  'ஆடி',
  'ஆவணி',
  'புரட்டாசி',
  'ஐப்பசி',
  'கார்த்திகை',
  'மார்கழி',
  'தை',
  'மாசி',
  'பங்குனி',
];

export function getTamilFormattedDate(dateStr?: string | Date): string {
  const date = dateStr ? new Date(dateStr) : new Date();
  const day = date.getDate();
  const monthIdx = (date.getMonth() + 9) % 12; // approximate Tamil solar calendar align
  const monthName = TAMIL_MONTHS[monthIdx];
  const year = date.getFullYear();
  return `${day} ${monthName} (${day}.${date.getMonth() + 1}.${year})`;
}

// தமிழ் சொல் களஞ்சியங்கள் மற்றும் சொற்கூறுகள்
export const TAMIL_STRINGS = {
  appName: 'நூல் மீட்பு',
  appTagline: 'நூற்றாண்டு பழைமையான தமிழ் நூல்களைக் கற்பனைச் சொற்கள் இன்றி மீட்டெடுக்கும் உயர்தர எண்மியக் கட்டமைப்பு',
  
  // நுழைவு வாயில்கள்
  publicPortal: 'பொதுமக்கள் நுழைவு',
  officialPortal: 'அதிகாரிகள் நுழைவு',
  switchPortal: 'நுழைவு வாயிலை மாற்று',
  
  // பாத்திரங்கள்
  roles: {
    public: 'பொதுமக்கள்',
    librarian: 'நூலகர்',
    reviewer: 'திருத்துநர்',
    supervisor: 'தலைமை மேற்பார்வையாளர்',
    admin: 'நிர்வாகி',
  },

  // வழிசெலுத்தல்
  nav: {
    dashboard: 'முகப்புப் பலகை',
    pageReview: 'பக்க மதிப்பாய்வு',
    batchReview: 'தொகுப்பு மதிப்பாய்வு',
    imageRestoration: 'படச் சீரமைப்பு',
    constrainedCorrection: 'கட்டுப்பாட்டுத் திருத்தம்',
    upload: 'புத்தகப் பதிவேற்றம்',
    jobQueue: 'பணி வரிசை',
    historicalMap: 'தமிழ்நாட்டு வரலாற்று வரைபடம்',
    auditLog: 'தணிக்கைப் பதிவு',
    lexicons: 'சொற்களஞ்சியங்கள்',
    signedModels: 'மாதிரிகள் & கையொப்பங்கள்',
    evaluations: 'மதிப்பீட்டுக் கூடம்',
    syntheticGenerator: 'செயற்கைப் பக்க உருவாக்கம்',
    apiDocs: 'நிரலாக்க இடைமுகம்',
    searchBooks: 'நூல்கள் தேடல்',
    myFiles: 'என் பதிவேற்றங்கள்',
    suggestions: 'திருத்தப் பரிந்துரைகள்',
  },

  // பொத்தான்கள்
  buttons: {
    accept: 'ஏற்கிறேன்',
    reject: 'நிராகரி',
    edit: 'திருத்து',
    save: 'சேமி',
    cancel: 'ரத்து செய்',
    upload: 'பதிவேற்று',
    captureCamera: 'நேரலை நிழற்படக் கருவி',
    autoCapture: 'தானியங்கிப் படம் எடு',
    startOcr: 'எழுத்துணரி ஆய்வு தொடங்கு',
    autoStraighten: 'தானியங்கி நேராக்கு',
    undo: 'செயல்தவிர்',
    redo: 'மீண்டும் செய்',
    verify: 'சரிபார்',
    verified: 'சரிபார்க்கப்பட்டது',
    downloadPdf: 'காப்பக வடிவ ஆவணம் பதிவிறக்கு',
    downloadTei: 'கட்டமைப்பு கோப்பு பதிவிறக்கு',
    downloadTxt: 'எளிய உரை பதிவிறக்கு',
    downloadData: 'பக்கத் தரவுக் கோப்பு பதிவிறக்கு',
    login: 'உள்நுழை',
    logout: 'வெளியேறு',
    testErase: 'அழிக்கப்பட்ட எழுத்து சோதனை',
    explorePlace: 'சுவடிகளை ஆராய்க',
    listenAudio: 'குரல் வழியே கேள்',
    addWord: 'சொல் சேர்',
    close: 'மூடு',
    apply: 'செயல்படுத்து',
    resume: 'தொடங்கு',
    pause: 'நிறுத்து',
    generateSynthetic: 'செயற்கைப் பக்கம் உருவாக்கு',
    next: 'அடுத்தது',
    previous: 'முந்தையது',
    finish: 'நிறைவு',
  },

  // கட்டுப்பாட்டு நிலைகள்
  strictness: {
    ultra: {
      label: 'மிகக் கடுமை',
      desc: 'எந்தவித ஊகமும் இன்றி பழஞ்சொற்களஞ்சியத்தில் முழுமையாகப் பொருந்தினால் மட்டுமே ஏற்கும்.',
    },
    strict: {
      label: 'கடுமை',
      desc: 'சொற்களஞ்சியத்தில் உள்ள சொற்களுக்கு அதிக முன்னுரிமை அளித்து திருத்தங்களை முன்மொழியும்.',
    },
    balanced: {
      label: 'சமநிலை',
      desc: 'சூழல் பொருள் பொருந்தி வரும் சொற்களை மனிதப் பார்வைக்கு வழிகாட்டும்.',
    },
  },

  // சொற்களஞ்சிய அடுக்குகள்
  lexiconTiers: {
    classical: 'செந்தமிழ் சொற்களஞ்சியம்',
    modern: 'தற்காலத் தமிழ்',
    bookSpecific: 'இந்நூல் சொற்கள்',
  },

  // நிலைகள்
  status: {
    highConfidence: 'உயர் நம்பகத்தன்மை',
    mediumConfidence: 'நடுத்தர நம்பகத்தன்மை',
    lowConfidence: 'குறைந்த நம்பகத்தன்மை',
    sentToReview: 'மனித மதிப்பாய்வுக்கு அனுப்பப்பட்டது',
    uncertain: '[உறுதியில்லை]',
    notFilled: 'நிரப்பப்படவில்லை',
    airGapped: 'முழுவதும் தனிமைப்படுத்திய பயன்முறை',
    offlineMode: 'இணையமில்லா முறை',
    onlineMode: 'நிகழ்நேர இணையத் தொடர்பு',
    cachedAssets: 'சேமிக்கப்பட்ட மாதிரிகள் & களஞ்சியங்கள் தயார்',
    noAccessTitle: 'அனுமதி இல்லை',
    noAccessDesc: 'இந்தப் பக்கத்தைப் பார்வையிட உங்கள் அதிகார வரம்பிற்கு அனுமதி வழங்கப்படவில்லை.',
  },

  // விழிப்பூட்டல்கள்
  toasts: {
    lexiconUpdated: 'இந்நூல் சொற்களஞ்சியம் மேம்பட்டது',
    wordAccepted: 'சொல் ஏற்றுக்கொள்ளப்பட்டது',
    wordRejected: 'சொல் நிராகரிக்கப்பட்டது',
    ocrSuccess: 'எழுத்துணரி ஆய்வு வெற்றிகரமாக நிறைவுற்றது',
    hashVerified: 'ஆவணக் கைரேகை மற்றும் கையொப்பம் உறுதி செய்யப்பட்டது',
    airGapActive: 'முழு தனிமைப்படுத்திய பயன்முறை செயல்பாட்டில் உள்ளது (தரவு வெளியேறாது)',
  },

  // அளவீடுகள்
  metrics: {
    cer: 'எழுத்துப்பிழை விகிதம்',
    wer: 'சொற்பிழை விகிதம்',
    inventionRate: 'கற்பனைச் சொல் விகிதம்',
    confidence: 'நம்பகத்தன்மை',
    targetZero: 'பூச்சிய இலக்கு (கற்பனை இல்லாத நிலை)',
    pagesDone: 'நிறைவுற்ற பக்கங்கள்',
    wordsPending: 'நிலுவையில் உள்ள சொற்கள்',
    estimatedTime: 'மதிப்பிடப்பட்ட நேரம்',
    speed: 'மணிக்கு திருத்தப்பட்ட சொற்கள்',
  },
};
