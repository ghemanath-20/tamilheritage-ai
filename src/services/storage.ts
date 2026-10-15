/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Book, HistoricalPlace, AuditEntry, PublicSuggestion, Role, StrictnessLevel } from '../types';

// தமிழ்நாட்டின் 16 வரலாற்று, அகழாய்வு மற்றும் ஏட்டுச் சுவடி மையங்கள் (விரிவான வரலாற்றுத் தரவுகளுடன்)
export const INITIAL_HISTORICAL_PLACES: HistoricalPlace[] = [
  {
    id: 'p1',
    name: 'தஞ்சாவூர் சரஸ்வதி மகால் & பெரிய கோவில்',
    district: 'தஞ்சாவூர்',
    lat: 10.787,
    lng: 79.1378,
    mapX: 63,
    mapY: 52,
    era: 'சோழர் காலம் & நாயக்கர் காலம் (10 - 18-ஆம் நூற்றாண்டு)',
    scriptType: 'பழந்தமிழ், கிரந்தம், தெலுங்கு, தேவநாகரி',
    description: 'ஆசியாவின் மிகத் தொன்மையான நூலகங்களில் ஒன்றான தஞ்சை சரஸ்வதி மகால் நூலகத்தில் நாற்பதாயிரத்துக்கும் மேற்பட்ட அரிய ஓலைச்சுவடிகளும், முதலாம் ராஜராஜ சோழனின் கல்வெட்டு ஆவணங்களும் பேணப்படுகின்றன. மருத்துவக் குறிப்புகள், சங்கீத சாத்திரங்கள், இலக்கண நூல்கள் இங்கு மூல ஏடுகளாக உள்ளன.',
    notableManuscripts: ['திருக்குறள் பழைய உரைச்சுவடி', 'சரபேந்திர பூபால குறவஞ்சி', 'சித்த மருத்துவ ரகசிய ஏடுகள்', 'சங்கீத ரத்னாகரம்'],
    manuscriptCount: 42000,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p2',
    name: 'மாமல்லபுரம் பாறைச் சாசனங்கள் & கடற்கரைக் கோயில்',
    district: 'செங்கல்பட்டு',
    lat: 12.6269,
    lng: 80.1927,
    mapX: 74,
    mapY: 22,
    era: 'பல்லவர் காலம் (7 - 8-ஆம் நூற்றாண்டு)',
    scriptType: 'பல்லவ கிரந்தம் & தொடக்க காலத் தமிழ் கல்வெட்டு வடிவம்',
    description: 'முதலாம் நரசிம்மவர்மன் மற்றும் இரண்டாம் நரசிம்மவர்மன் காலத்திய குடைவரைக் கோயில்களில் பொறிக்கப்பட்டுள்ள கல்வெட்டுகள் பழந்தமிழ்ச் சொற்களின் அச்சு வடிவத்திற்கு அடிப்படை சான்றுகளாகும். கடல்சார் வணிக ஆவணங்களும் சிற்ப சாத்திர ஓலைகளும் இங்கு கண்டெடுக்கப்பட்டன.',
    notableManuscripts: ['பல்லவ சாசனப் பிரதிகள்', 'சிற்ப சாத்திர ஏடுகள்', 'கடல்சார் வணிகக் குறிப்புகள்'],
    manuscriptCount: 1850,
    image: 'https://images.unsplash.com/photo-1600100397608-f010f443b794?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p3',
    name: 'மதுரை நான்காம் தமிழ்ச் சங்கம் & மீனாட்சி கோவில்',
    district: 'மதுரை',
    lat: 9.9195,
    lng: 78.1193,
    mapX: 47,
    mapY: 68,
    era: 'சங்க காலம் & பாண்டியர் காலம்',
    scriptType: 'தமிழ் பிராமி, வட்டெழுத்து & பழந்தமிழ் எழுத்துக்கள்',
    description: 'பாண்டித்துரைத் தேவர், உ.வே.சா, மற்றும் ராகவ அய்யங்கார் ஆகியோரால் மீட்டெடுக்கப்பட்ட பல்லாயிரக்கணக்கான செந்தமிழ் ஓலைச்சுவடிகள் மதுரை நான்காம் தமிழ்ச் சங்க நூலகத்தில் தொகுக்கப்பட்டன. சங்க இலக்கிய மூல ஏடுகள் பலவும் இங்குதான் மறுபதிப்பு கண்டன.',
    notableManuscripts: ['பரிபாடல் மூல ஏடு', 'கலித்தொகை சுவடி', 'மதுரைக் காஞ்சி ஏட்டுப் பிரதி', 'திருவிளையாடல் புராண மூல ஏடு'],
    manuscriptCount: 28000,
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p4',
    name: 'கீழடி அகழாய்வு ஆவண மையம்',
    district: 'சிவகங்கை',
    lat: 9.8624,
    lng: 78.1887,
    mapX: 52,
    mapY: 71,
    era: 'கி.மு. 6-ஆம் நூற்றாண்டு (சங்க காலத் தொடக்கம்)',
    scriptType: 'தமிழ் பிராமி (தமிழி வரிவடிவம்)',
    description: 'வைகை நதிக்கரையில் அமைந்துள்ள கீழடி அகழாய்வில் 56-க்கும் மேற்பட்ட மண்பாண்டங்களில் தமிழ்ப் பிராமி எழுத்துப் பொறிப்புகள் கண்டறியப்பட்டுள்ளன. ஆதன், குவிரன் ஆதன் போன்ற தமிழ்ப் பெயர்கள் பொறிக்கப்பட்ட இப்பானை ஓடுகள் தமிழர்கள் எழுத்தறிவு பெற்றிருந்ததை 2600 ஆண்டுகளுக்கு முன்பே உறுதி செய்கின்றன.',
    notableManuscripts: ['ஆதன் மண்பாண்டப் பொறிப்பு', 'குவிரன் ஆதன் வரிவடிவம்', 'திசன் எழுத்துப் பானை ஓடு'],
    manuscriptCount: 1250,
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p5',
    name: 'ஆதிச்சநல்லூர் தொல்லியல் மையம்',
    district: 'தூத்துக்குடி',
    lat: 8.6272,
    lng: 77.8732,
    mapX: 41,
    mapY: 89,
    era: 'கி.மு. 1000 - கி.மு. 600 (இரும்புக்காலம் & பெருங்கற்காலம்)',
    scriptType: 'தொடக்கக் குறியீடுகள் & தொல் தமிழ் வரிவடிவம்',
    description: 'தாமிரபரணி ஆற்றங்கரையில் அமைந்துள்ள ஆதிச்சநல்லூர் இடுகாட்டில் ஆயிரக்கணக்கான முதுமக்கள் தாழிகளும், எழுத்துக் குறியீடுகள் கொண்ட வெண்கலப் பொருட்களும் கண்டெடுக்கப்பட்டுள்ளன. தமிழர் பண்பாட்டின் ஆதி வேர்களை விளக்கும் முதன்மைத் தொல்லியல் களம் இதுவாகும்.',
    notableManuscripts: ['முதுமக்கள் தாழி எழுத்துக்குறிகள்', 'வெண்கலக் கிண்ணப் பொறிப்புகள்'],
    manuscriptCount: 920,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p6',
    name: 'கொடுமணல் அகழ்வு ஆவண மையம்',
    district: 'ஈரோடு',
    lat: 11.1112,
    lng: 77.5843,
    mapX: 38,
    mapY: 45,
    era: 'கி.மு. 4-ஆம் நூற்றாண்டு (பதிற்றுப்பத்துக் காலம்)',
    scriptType: 'தமிழ் பிராமி (தமிழி)',
    description: 'நொய்யல் நதிக்கரையில் அமைந்துள்ள கொடுமணல் சங்க இலக்கியமான பதிற்றுப்பத்தில் "கொடுமணம்" எனக் குறிப்பிடப்படும் தொழில் நகரமாகும். இங்கு கண்டெடுக்கப்பட்ட 500-க்கும் மேற்பட்ட மண்பாண்டங்களில் தமிழ் பிராமி எழுத்துக்கள் பொறிக்கப்பட்டுள்ளன. ரத்தினக் கற்கள் பட்டை தீட்டும் தொழிலும் சங்க காலத்தில் செழித்திருந்தது.',
    notableManuscripts: ['கொடுமணம் வணிகப் பானைப் பொறிப்பு', 'மணிசெய் தொழிலாளர் பெயர்ப் பொறிப்புகள்'],
    manuscriptCount: 1100,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p7',
    name: 'பூம்புகார் காவிரிப்பூம்பட்டினம் கடற்கரை அகழ்வு மையம்',
    district: 'மயிலாடுதுறை',
    lat: 11.1485,
    lng: 79.8559,
    mapX: 72,
    mapY: 48,
    era: 'சங்க காலம் & சோழர் காலம் (சிலப்பதிகாரக் காலம்)',
    scriptType: 'பழந்தமிழ் & உரோமானிய வரிவடிவம்',
    description: 'காவிரி ஆறு வங்கக் கடலில் கலக்கும் முகத்துவாரத்தில் அமைந்த பூம்புகார் சோழப் பேரரசின் சர்வதேச துறைமுகமாகும். சிலப்பதிகாரத்தில் விவரிக்கப்படும் புகார் நகரின் செங்கல் கட்டுமானங்கள், கப்பல் துறைகள் மற்றும் வெளிநாட்டு நாணயங்கள் கடலடி மற்றும் தரை அகழாய்வுகளில் கிடைத்துள்ளன.',
    notableManuscripts: ['சிலப்பதிகார மூல ஏட்டுப் பிரதிகள்', 'புகார் வணிக முத்திரை ஓலைகள்'],
    manuscriptCount: 2400,
    image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p8',
    name: 'சிதம்பரம் தில்லை நடராஜர் கோவில் ஏட்டுக் கூடம்',
    district: 'கடலூர்',
    lat: 11.3992,
    lng: 79.6934,
    mapX: 68,
    mapY: 40,
    era: 'சோழர் காலம் (ராஜராஜ சோழன் - 11-ஆம் நூற்றாண்டு)',
    scriptType: 'சோழர் காலத் தமிழ் வரிவடிவம்',
    description: 'ராஜராஜ சோழனும் நம்பியாண்டார் நம்பியும் கரையான்களால் மூடியிருந்த பூட்டிய அறையிலிருந்து திருமுறை ஏடுகளை மீட்டெடுத்து உலகுக்கு அளித்த வரலாற்றுப் புகழ் பெற்ற தலம். தேவாரப் பாடல்களின் மூல ஓலைச்சுவடிகள் இங்கிருந்தே மீட்டெடுக்கப்பட்டன.',
    notableManuscripts: ['தேவாரம் திருமுறை ஏடுகள்', 'திருவாசக மூலச் சுவடி', 'கோயிற் புராண ஓலைகள்'],
    manuscriptCount: 8900,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p9',
    name: 'சென்னை உ.வே.சா. நூல் நிலையம் & கன்னிமாரா',
    district: 'சென்னை',
    lat: 13.0827,
    lng: 80.2707,
    mapX: 78,
    mapY: 14,
    era: 'நவீன மறுமலர்ச்சிக் காலம் (19 - 20-ஆம் நூற்றாண்டு)',
    scriptType: 'பழைய அச்சுத் தமிழ் & சுவடி வரிவடிவம்',
    description: 'தமிழ்த்தாத்தா உ.வே.சாமிநாதையர் அவர்கள் வாழ்நாள் முழுவதும் ஊர் ஊராகச் சென்று திரட்டிய சங்க இலக்கிய மூல ஓலைச்சுவடிகள், அரிய 19-ஆம் நூற்றாண்டு முதல் பதிப்புகள் இங்கு பாதுகாக்கப்படுகின்றன. புறநானூறு, சிலப்பதிகாரம் முதல் பதிப்புகள் இங்கு மூல ஆவணங்களாக உள்ளன.',
    notableManuscripts: ['சீவக சிந்தாமணி மூல ஏடு', 'புறநானூறு முதற்பதிப்பு ஆவணம்', 'சிலப்பதிகாரம் அடியார்க்குநல்லார் உரைச்சுவடி'],
    manuscriptCount: 15400,
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p10',
    name: 'திருநெல்வேலி நெல்லையப்பர் கோவில் சுவடிக் காப்பகம்',
    district: 'திருநெல்வேலி',
    lat: 8.7139,
    lng: 77.7567,
    mapX: 39,
    mapY: 87,
    era: 'பாண்டியர் காலம் (12 - 17-ஆம் நூற்றாண்டு)',
    scriptType: 'வட்டெழுத்து & பிற்காலத் தமிழ்',
    description: 'தாமிரபரணி ஆற்றங்கரையில் அமைந்த நெல்லையப்பர் கோவிலின் ஏட்டு அறையில் சைவ சித்தாந்த சாத்திரங்கள், நாட்டிய சாத்திர ஏடுகள், மற்றும் பாரம்பரிய சித்த மருத்துவ ஓலைச்சுவடிகள் ஆயிரக்கணக்கில் பேணிப் பாதுகாக்கப்படுகின்றன.',
    notableManuscripts: ['திருவிளையாடல் புராணச் சுவடி', 'தாமிரபரணி மகாத்மியம்', 'சித்த மருத்துவ நாடி ஏடுகள்'],
    manuscriptCount: 11200,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p11',
    name: 'காஞ்சிபுரம் கைலாசநாதர் & வைகுண்டப் பெருமாள் கோவில்',
    district: 'காஞ்சிபுரம்',
    lat: 12.8342,
    lng: 79.7036,
    mapX: 70,
    mapY: 19,
    era: 'பல்லவர் காலம் (8-ஆம் நூற்றாண்டு)',
    scriptType: 'பல்லவ கிரந்தம் & தமிழ் வரிவடிவம்',
    description: 'தென்னிந்தியாவின் தொன்மையான கல்வி நகரமான காஞ்சியில் பல்லவ மன்னர்களின் பட்டயங்களும், சமணக் காஞ்சி சுவடிகளும், பௌத்த தத்துவ ஏடுகளும் பெருமளவில் பாதுகாக்கப்பட்டு வந்தன. நந்திகலம்பகம் போன்ற இலக்கியச் சுவடிகள் இங்கு பாதுகாக்கப்படுகின்றன.',
    notableManuscripts: ['நந்திகலம்பக ஏட்டுப் பிரதி', 'காஞ்சிப் புராண மூல ஏடு', 'பல்லவ பட்டய நகல்கள்'],
    manuscriptCount: 6400,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p12',
    name: 'பொருந்தல் தொல்லியல் ஆவண மையம்',
    district: 'திண்டுக்கல்',
    lat: 10.4521,
    lng: 77.5124,
    mapX: 42,
    mapY: 60,
    era: 'கி.மு. 5-ஆம் நூற்றாண்டு (சங்க கால வேளாண்மை ஆவணம்)',
    scriptType: 'தமிழ் பிராமி',
    description: 'பழனிக்கு அருகிலுள்ள பொருந்தல் அகழாய்வில் கண்டறியப்பட்ட மண்பாண்டங்களில் தமிழ் பிராமி எழுத்துக்களுடன் நெல்மணிகள் நிறைக்கப்பட்டிருந்தன. கரிமப் பகுப்பாய்வில் இது கி.மு. 490 என கால நிர்ணயம் செய்யப்பட்டு சங்கத் தமிழரின் எழுத்தறிவு காலத்தை உலகிற்கு பறைசாற்றியது.',
    notableManuscripts: ['வயிரவன் பானைப் பொறிப்பு', 'பொருந்தல் நெல் தாழி சாசனம்'],
    manuscriptCount: 480,
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p13',
    name: 'அழகன்குளம் வரலாற்றுத் துறைமுகம்',
    district: 'ராமநாதபுரம்',
    lat: 9.3512,
    lng: 78.9612,
    mapX: 59,
    mapY: 76,
    era: 'சங்க காலம் & உரோமானிய வணிகக் காலம் (கி.மு. 300 - கி.பி. 500)',
    scriptType: 'தமிழ் பிராமி & உரோமானிய வரிவடிவம்',
    description: 'வைகை நதி கடலில் கலக்கும் முகத்துவாரப் பகுதியில் அமைந்த அழகன்குளம் சர்வதேச வணிகத் துறைமுகமாகும். இங்கு கண்டெடுக்கப்பட்ட ஆயிரக்கணக்கான தமிழ் பிராமி பானை ஓடுகளும் உரோமானிய நாணயங்களும் உலக நாடுகளுடன் தமிழருக்கு இருந்த கடல் வர்த்தகத்தை விளக்குகின்றன.',
    notableManuscripts: ['உரோமானியப் பானை தமிழ் பிராமி பொறிப்புகள்', 'கப்பல் சித்திரப் பானை ஓடுகள்'],
    manuscriptCount: 860,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p14',
    name: 'சிவகளை தொல்லியல் களம்',
    district: 'தூத்துக்குடி',
    lat: 8.6531,
    lng: 77.9821,
    mapX: 44,
    mapY: 88,
    era: 'கி.மு. 1155 (பழமையான நெல்மணிகள் & இரும்புக்காலம்)',
    scriptType: 'தொல் தமிழ் வரிவடிவக் குறியீடுகள்',
    description: 'சிவகளை அகழாய்வில் கண்டெடுக்கப்பட்ட முதுமக்கள் தாழிகளில் இருந்த நெல்மணிகளை அமெரிக்க பீட்டா ஆய்வகத்தில் கார்பன் ஆய்வு செய்ததில் கி.மு. 1155 ஆம் ஆண்டு என உறுதி செய்யப்பட்டது. இதன் மூலம் தாமிரபரணி நாகரிகம் 3175 ஆண்டுகள் பழைமையானது என நிரூபிக்கப்பட்டுள்ளது.',
    notableManuscripts: ['சிவகளை தாழி எழுத்துக்குறிகள்', 'பழைய நெல் கலயப் பொறிப்புகள்'],
    manuscriptCount: 650,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p15',
    name: 'மயிலாடும்பாறை நடுகல் ஆவண மையம்',
    district: 'கிருஷ்ணகிரி',
    lat: 12.5213,
    lng: 78.2145,
    mapX: 52,
    mapY: 21,
    era: 'கி.மு. 2172 (தொல் இரும்புக்காலம்)',
    scriptType: 'தொல் தமிழ் நடுகல் எழுத்து வடிவம்',
    description: 'மயிலாடும்பாறை அகழாய்வில் தமிழ்நாட்டில் இரும்பின் பயன்பாடு கி.மு. 2172 ஆண்டுகளுக்கு முன்பே (4200 ஆண்டுகள் முன்) தொடங்கியது என உறுதி செய்யப்பட்டுள்ளது. வீரர்களுக்கு வைக்கப்பட்ட நடுகற்கள் மற்றும் தொடக்க காலத் தமிழ் வடிவங்கள் இங்கு கண்டறியப்பட்டன.',
    notableManuscripts: ['மயிலாடும்பாறை நடுகல் வாசகங்கள்', 'கற்பதுக்கை பொறிப்புகள்'],
    manuscriptCount: 390,
    image: 'https://images.unsplash.com/photo-1600100397608-f010f443b794?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p16',
    name: 'கும்பகோணம் சாரங்கபாணி & பாணாதுறை சுவடி மையம்',
    district: 'தஞ்சாவூர்',
    lat: 10.9602,
    lng: 79.3845,
    mapX: 64,
    mapY: 49,
    era: 'சோழர் காலம் & நாயக்கர் காலம்',
    scriptType: 'பழந்தமிழ் & மணிப்பிரவாள நடை',
    description: 'காவிரி ஆற்றின் கரையில் உள்ள கும்பகோணம் தமிழ் அறிஞர்களின் உறைவிடமாக விளங்கியது. நாலாயிர திவ்வியப் பிரபந்த உரைகள், தர்க்க சாத்திரங்கள், இலக்கண உரைகளின் மூல ஓலைச்சுவடிகள் இங்குள்ள மடங்களிலும் காப்பகங்களிலும் பாதுகாக்கப்படுகின்றன.',
    notableManuscripts: ['நாலாயிர திவ்வியப் பிரபந்த மூல ஏடு', 'திருக்கோவையார் பழைய உரை', 'வீரசோழியம் ஏட்டுப் பிரதி'],
    manuscriptCount: 9800,
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
  },
];

// தொடக்க சொற்களஞ்சியங்கள் (செந்தமிழ், தற்காலம், இந்நூல்)
export const INITIAL_LEXICONS = {
  classical: [
    'அகரமுதல்', 'எழுத்ததிகாரம்', 'தொல்காப்பியம்', 'னகரவிறுவாய்', 'முப்பஃதென்ப', 'சார்ந்துவரன்',
    'மரபின', 'மூன்றலங்', 'கடையே', 'செந்தமிழ்', 'நற்றமிழ்', 'புறநானூறு', 'அகநானூறு', 'குறுந்தொகை',
    'நற்றிணை', 'ஐங்குறுநூறு', 'பதிற்றுப்பத்து', 'பரிபாடல்', 'கலித்தொகை', 'திருக்குறள்', 'முப்பால்',
    'அறத்துப்பால்', 'பொருட்பால்', 'காமத்துப்பால்', 'கடவுள்வாழ்த்து', 'வான்சிறப்பு', 'நீத்தார்பெருமை',
    'அறன்வலியுறுத்தல்', 'இல்வாழ்க்கை', 'வாழ்க்கைத்துணைநலம்', 'புதல்வரைப்பெறுதல்', 'அன்புடைமை',
    'விருந்தோம்பல்', 'இனியவைகூறல்', 'செய்ந்நன்றியறிதல்', 'நடுவுநிலைமை', 'அடக்கமுடைமை', 'ஒழுக்கமுடைமை',
  ],
  modern: [
    'தமிழ்நாடு', 'பதிவேற்றம்', 'ஆவணம்', 'நூலகம்', 'பல்கலைக்கழகம்', 'பரிசீலனை', 'செயற்கை',
    'நுண்ணறிவு', 'கணினி', 'வரைபடம்', 'பாதுகாப்பு', 'எழுத்துரு', 'பக்கங்கள்', 'அறிக்கை',
    'மேற்பார்வையாளர்', 'நிர்வாகி', 'அமைப்புகள்', 'முடிவுகள்', 'தரவுகள்', 'குறிப்புகள்',
  ],
  bookSpecific: [
    'வட்டெழுத்து', 'ஓலைச்சுவடி', 'எழுத்தாணி', 'பனையோலை', 'மைபூச்சு', 'துளைக்கயிறு',
    'படிமவடிவம்', 'அச்சுக்கருவி', 'கற்கோயில்', 'செப்பேடு', 'சாசனம்', 'மெய்க்கீர்த்தி',
  ],
};

// தொடக்க 3 அசல் நூல்கள் (உண்மையான பழந்தமிழ் சுவடி படங்கள்)
export const INITIAL_BOOKS: Book[] = [
  {
    id: 'b1',
    title: 'திருக்குறள் பழைய உரைப்பதிப்பு (1812)',
    author: 'ஞானப்பிரகாசர் அச்சுப் பதிப்பு',
    year: '1812',
    location: 'தஞ்சாவூர் சரஸ்வதி மகால் ஆவணம்',
    totalPages: 12,
    completedPages: 9,
    status: 'மதிப்பாய்வில்',
    hallucinationRate: 0.0,
    bookLexicon: ['திருக்குறள்', 'அகரமுதல்', 'எழுத்தெல்லாம்', 'ஆதி', 'பகவன்', 'முதற்றே', 'உலகு'],
    createdAt: '2026-10-01',
    pages: [
      {
        id: 'p1-1',
        pageNumber: 1,
        // அசல் பழந்தமிழ் ஏட்டுப் பிரதி படம்
        originalImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1400&q=85',
        // செயற்கை நுண்ணறிவால் சீரமைக்கப்பட்ட தெளிவான படம்
        enhancedImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1400&q=85',
        status: 'மதிப்பாய்வில்',
        contrast: 85,
        stainRemoval: 90,
        denoise: 75,
        fadeRecovery: 80,
        straighten: 0,
        autoEnhanced: true,
        words: [
          {
            id: 'w1',
            originalText: 'அகர',
            confidence: 99,
            tier: 'செந்தமிழ் சொற்களஞ்சியம்',
            damaged: false,
            missingGlyph: false,
            glyphTemplate: null,
            glyphMatchPercent: 100,
            candidates: ['அகர'],
            engineScores: [99, 98, 100, 99],
            morphologyScore: 99,
            contextScore: 99,
            status: 'accepted',
          },
          {
            id: 'w2',
            originalText: 'முதல',
            confidence: 98,
            tier: 'செந்தமிழ் சொற்களஞ்சியம்',
            damaged: false,
            missingGlyph: false,
            glyphTemplate: null,
            glyphMatchPercent: 99,
            candidates: ['முதல', 'முதல்'],
            engineScores: [98, 97, 98, 99],
            morphologyScore: 97,
            contextScore: 98,
            status: 'accepted',
          },
          {
            id: 'w3',
            originalText: 'எழுத்தெல்லாம்',
            confidence: 96,
            tier: 'செந்தமிழ் சொற்களஞ்சியம்',
            damaged: false,
            missingGlyph: false,
            glyphTemplate: null,
            glyphMatchPercent: 98,
            candidates: ['எழுத்தெல்லாம்'],
            engineScores: [96, 95, 97, 96],
            morphologyScore: 96,
            contextScore: 95,
            status: 'accepted',
          },
          {
            id: 'w4',
            originalText: 'ஆதி',
            confidence: 95,
            tier: 'செந்தமிழ் சொற்களஞ்சியம்',
            damaged: false,
            missingGlyph: false,
            glyphTemplate: null,
            glyphMatchPercent: 97,
            candidates: ['ஆதி'],
            engineScores: [95, 94, 96, 95],
            morphologyScore: 95,
            contextScore: 94,
            status: 'accepted',
          },
          {
            id: 'w5',
            originalText: 'பகவன்',
            confidence: 89,
            tier: 'செந்தமிழ் சொற்களஞ்சியம்',
            damaged: true,
            missingGlyph: true,
            glyphTemplate: 'க',
            glyphMatchPercent: 92,
            candidates: ['பகவன்'],
            engineScores: [89, 88, 91, 89],
            morphologyScore: 91,
            contextScore: 90,
            status: 'review',
          },
          {
            id: 'w6',
            originalText: 'முதற்றே',
            confidence: 94,
            tier: 'செந்தமிழ் சொற்களஞ்சியம்',
            damaged: false,
            missingGlyph: false,
            glyphTemplate: null,
            glyphMatchPercent: 95,
            candidates: ['முதற்றே'],
            engineScores: [94, 93, 95, 94],
            morphologyScore: 94,
            contextScore: 93,
            status: 'accepted',
          },
          {
            id: 'w7',
            originalText: 'உலகு',
            confidence: 99,
            tier: 'செந்தமிழ் சொற்களஞ்சியம்',
            damaged: false,
            missingGlyph: false,
            glyphTemplate: null,
            glyphMatchPercent: 100,
            candidates: ['உலகு'],
            engineScores: [99, 99, 99, 99],
            morphologyScore: 99,
            contextScore: 99,
            status: 'accepted',
          },
          {
            id: 'w8',
            originalText: '[உறுதியில்லை]',
            confidence: 41,
            tier: 'இந்நூல் சொற்கள்',
            damaged: true,
            missingGlyph: true,
            glyphTemplate: null,
            glyphMatchPercent: 44,
            candidates: [],
            engineScores: [41, 39, 43, 40],
            morphologyScore: 35,
            contextScore: 38,
            status: 'flagged',
          },
        ],
      },
    ],
  },
  {
    id: 'b2',
    title: 'தொல்காப்பியம் உரைச்சுவடி (1868)',
    author: 'சி.வை.தாமோதரம்பிள்ளை உரைப் பதிப்பு',
    year: '1868',
    location: 'சென்னை உ.வே.சா. ஆவணக் காப்பகம்',
    totalPages: 16,
    completedPages: 16,
    status: 'நிறைவுற்றது',
    hallucinationRate: 0.0,
    bookLexicon: ['தொல்காப்பியம்', 'எழுத்ததிகாரம்', 'நூல்மரபு', 'மொழிமரபு', 'பிறப்பியல்'],
    createdAt: '2026-09-25',
    pages: [],
  },
  {
    id: 'b3',
    title: 'சீவக சிந்தாமணி உ.வே.சா. முதல் பதிப்பு (1887)',
    author: 'மகாவித்துவான் மீனாட்சிசுந்தரம் பிள்ளை & உ.வே.சா.',
    year: '1887',
    location: 'மதுரை நான்காம் தமிழ்ச் சங்கம்',
    totalPages: 12,
    completedPages: 6,
    status: 'செயலாக்கத்தில்',
    hallucinationRate: 0.0,
    bookLexicon: ['சீவகசிந்தாமணி', 'நாமகளிலம்பகம்', 'ஏமாங்கதம்', 'சச்சந்தன்', 'விசயை'],
    createdAt: '2026-10-10',
    pages: [],
  },
];

// தொடக்க தணிக்கை பதிவுகள்
export function generateInitialAuditLogs(): AuditEntry[] {
  const actions = [
    'உண்மையான சுவடிப் பக்கப் படம் பதிவேற்றப்பட்டது',
    'தானியங்கிப் படச் சீரமைப்பு செயல்படுத்தப்பட்டது',
    'எழுத்துணரி கருதுகோள்கள் பகுப்பாய்வு நிறைவுற்றது',
    'செந்தமிழ் சொற்களஞ்சிய ஒப்பீடு சரிபார்க்கப்பட்டது',
    'மனித திருத்துநரால் சொல் உறுதி செய்யப்பட்டது',
    'கற்பனைச் சொல் விகிதம் பூச்சியமாகச் சோதிக்கப்பட்டது',
    'டிஜிட்டல் கையொப்பத்துடன் காப்பக கோப்பு வெளியிடப்பட்டது',
    'சொற்களஞ்சியத்தில் புதிய சொல் சேர்க்கப்பட்டது',
  ];

  const actors = ['அமுதன் (திருத்துநர்)', 'கயல்விழி (நூலகர்)', 'இளங்கோவன் (தலைமை மேற்பார்வையாளர்)', 'தமிழரசி (நிர்வாகி)'];
  const roles: Role[] = ['திருத்துநர்', 'நூலகர்', 'தலைமை மேற்பார்வையாளர்', 'நிர்வாகி'];

  const logs: AuditEntry[] = [];
  for (let i = 1; i <= 60; i++) {
    const actorIdx = i % actors.length;
    logs.push({
      id: `தணிக்கை-${1000 + i}`,
      timestamp: `2026-10-${String((i % 14) + 1).padStart(2, '0')} 10:${String((i * 3) % 60).padStart(2, '0')}`,
      actor: actors[actorIdx],
      role: roles[actorIdx],
      action: actions[i % actions.length],
      targetArtifact: `ஏடு-பக்கம்-${(i % 12) + 1}`,
      fingerprint: `ஷா256-தமிழ்-${(i * 987654).toString(16).substring(0, 8)}`,
      verified: true,
    });
  }
  return logs;
}

// LocalStorage Helper
export const StorageService = {
  getBooks(): Book[] {
    const data = localStorage.getItem('நூல்_மீட்பு_புத்தகங்கள்');
    if (!data) {
      localStorage.setItem('நூல்_மீட்பு_புத்தகங்கள்', JSON.stringify(INITIAL_BOOKS));
      return INITIAL_BOOKS;
    }
    return JSON.parse(data);
  },

  saveBooks(books: Book[]): void {
    localStorage.setItem('நூல்_மீட்பு_புத்தகங்கள்', JSON.stringify(books));
  },

  getAuditLogs(): AuditEntry[] {
    const data = localStorage.getItem('நூல்_மீட்பு_தணிக்கை');
    if (!data) {
      const initial = generateInitialAuditLogs();
      localStorage.setItem('நூல்_மீட்பு_தணிக்கை', JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  },

  addAuditLog(entry: Omit<AuditEntry, 'id' | 'timestamp' | 'verified'>): AuditEntry {
    const logs = this.getAuditLogs();
    const newEntry: AuditEntry = {
      ...entry,
      id: `தணிக்கை-${1000 + logs.length + 1}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      verified: true,
    };
    logs.unshift(newEntry);
    localStorage.setItem('நூல்_மீட்பு_தணிக்கை', JSON.stringify(logs));
    return newEntry;
  },

  getStrictness(): StrictnessLevel {
    return (localStorage.getItem('நூல்_மீட்பு_கட்டுப்பாடு') as StrictnessLevel) || 'ultra';
  },

  setStrictness(level: StrictnessLevel): void {
    localStorage.setItem('நூல்_மீட்பு_கட்டுப்பாடு', level);
  },

  getAirGapped(): boolean {
    return localStorage.getItem('நூல்_மீட்பு_தனிமைப்படுத்தல்') === 'true';
  },

  setAirGapped(val: boolean): void {
    localStorage.setItem('நூல்_மீட்பு_தனிமைப்படுத்தல்', String(val));
  },

  getPublicSuggestions(): PublicSuggestion[] {
    const data = localStorage.getItem('நூல்_மீட்பு_பரிந்துரைகள்');
    if (!data) return [];
    return JSON.parse(data);
  },

  addPublicSuggestion(suggestion: Omit<PublicSuggestion, 'id' | 'submittedAt' | 'status'>): void {
    const list = this.getPublicSuggestions();
    const item: PublicSuggestion = {
      ...suggestion,
      id: `பரிந்துரை-${list.length + 1}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'பரிசீலனையில்',
    };
    list.unshift(item);
    localStorage.setItem('நூல்_மீட்பு_பரிந்துரைகள்', JSON.stringify(list));
  },
};
