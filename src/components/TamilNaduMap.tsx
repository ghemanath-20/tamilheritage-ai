/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HistoricalPlace } from '../types';
import { INITIAL_HISTORICAL_PLACES } from '../services/storage';
import {
  MapPin,
  BookOpen,
  Volume2,
  Calendar,
  Award,
  Compass,
  Search,
  Sparkles,
  Layers,
  CheckCircle2,
  Maximize2,
} from 'lucide-react';

interface TamilNaduMapProps {
  onSelectPlaceForManuscript?: (place: HistoricalPlace) => void;
}

export const TamilNaduMap: React.FC<TamilNaduMapProps> = ({ onSelectPlaceForManuscript }) => {
  const [places] = useState<HistoricalPlace[]>(INITIAL_HISTORICAL_PLACES);
  const [selectedPlace, setSelectedPlace] = useState<HistoricalPlace | null>(places[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('அனைத்தும்');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showRivers, setShowRivers] = useState<boolean>(true);
  const [showDistricts, setShowDistricts] = useState<boolean>(true);

  // வடிகட்டுதல் வகைகள்
  const categories = [
    'அனைத்தும்',
    'அகழாய்வுத் தளங்கள்',
    'சுவடிக் காப்பகங்கள்',
    'கோவில் சாசனங்கள்',
  ];

  const filteredPlaces = places.filter((p) => {
    const matchesSearch =
      p.name.includes(searchQuery) ||
      p.district.includes(searchQuery) ||
      p.era.includes(searchQuery) ||
      p.description.includes(searchQuery);

    if (!matchesSearch) return false;

    if (selectedCategory === 'அனைத்தும்') return true;
    if (selectedCategory === 'அகழாய்வுத் தளங்கள்') {
      return (
        p.name.includes('அகழாய்வு') ||
        p.name.includes('அகழ்வு') ||
        p.name.includes('தொல்லியல்') ||
        p.name.includes('களம்')
      );
    }
    if (selectedCategory === 'சுவடிக் காப்பகங்கள்') {
      return (
        p.name.includes('சரஸ்வதி மகால்') ||
        p.name.includes('நூல் நிலையம்') ||
        p.name.includes('சங்கம்') ||
        p.name.includes('சுவடி')
      );
    }
    if (selectedCategory === 'கோவில் சாசனங்கள்') {
      return (
        p.name.includes('கோவில்') ||
        p.name.includes('கோயில்') ||
        p.name.includes('சாசனங்கள்')
      );
    }
    return true;
  });

  // குரல் வழியே வரலாற்று விவரங்களை வாசித்தல்
  const handleReadAloud = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ta-IN';
      utterance.rate = 0.88;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  /**
   * துல்லியமான புவியியல் அட்சரேகை/தீர்க்கரேகையை (GPS Coordinates)
   * தமிழ்நாடு வரைபடத்தின் 0-100 சதவீத அளவுக்கு மாற்றும் கணித சூத்திரம்
   * தமிழ்நாடு எல்லைகள்: Lat: 8.08° to 13.55° N, Lng: 76.24° to 80.35° E
   */
  const getMarkerPosition = (place: HistoricalPlace) => {
    const minLng = 76.2;
    const maxLng = 80.4;
    const minLat = 8.0;
    const maxLat = 13.6;

    const x = ((place.lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - place.lat) / (maxLat - minLat)) * 100;

    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <div className="bg-[#FBF6EA] dark:bg-[#181412] text-[#2B1D14] dark:text-[#F5EFEB] rounded-2xl border-2 border-[#D9A441]/40 p-4 sm:p-6 shadow-xl font-tamil">
      {/* தலைப்பு & விளக்கம் */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#D9A441]/25">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-6 h-6 text-[#7A1F2B] dark:text-[#D9A441]" />
            <h2 className="text-xl sm:text-2xl font-bold font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441]">
              தமிழ்நாட்டு அசல் வரலாற்று & அகழாய்வு வரைபடம்
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#2B1D14]/80 dark:text-[#F5EFEB]/80">
            தமிழ்நாட்டின் துல்லியமான புவியியல் அமைப்போடு 16 வரலாற்று மையங்கள், அகழாய்வுத் தளங்கள் மற்றும் சுவடிக் காப்பகங்கள்
          </p>
        </div>

        {/* தேடல் & கட்டுப்பாடுகள் */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#2B1D14]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="தலம் அல்லது மாவட்டம் தேடுக..."
              className="pl-8 pr-3 py-1.5 bg-white dark:bg-[#201A16] border border-[#D9A441]/40 rounded-lg text-xs"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#7A1F2B] text-white shadow-sm'
                    : 'bg-[#D9A441]/20 hover:bg-[#D9A441]/40 text-[#2B1D14] dark:text-[#F5EFEB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        {/* தமிழ்நாடு துல்லிய புவியியல் வரைபடம் (Geographically Accurate Real Tamil Nadu SVG Map) */}
        <div className="lg:col-span-7 bg-[#2B1D14]/5 dark:bg-black/60 rounded-2xl p-4 border border-[#D9A441]/30 relative overflow-hidden flex flex-col items-center shadow-inner">
          {/* வரைபட அடுக்குக் கட்டுப்பாடுகள் */}
          <div className="w-full flex justify-between items-center text-xs text-[#2B1D14]/70 dark:text-[#F5EFEB]/70 mb-2 font-semibold">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showRivers}
                  onChange={(e) => setShowRivers(e.target.checked)}
                  className="rounded text-[#1F6F78]"
                />
                <span>ஆறுகள்</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDistricts}
                  onChange={(e) => setShowDistricts(e.target.checked)}
                  className="rounded text-[#7A1F2B]"
                />
                <span>மண்டலங்கள்</span>
              </label>
            </div>
            <span className="text-[#7A1F2B] dark:text-[#D9A441]">வங்காள விரிகுடா (கிழக்கு)</span>
          </div>

          {/* துல்லியமான தமிழ்நாடு வரைபட வரைவுப் பெட்டி */}
          <div className="relative w-full max-w-[540px] aspect-[4/5] my-2 select-none">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-2xl"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* நிலப்பரப்பு சாய்வு வண்ணம் (Heritage Land Gradient) */}
                <linearGradient id="tnLandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5E8D0" />
                  <stop offset="50%" stopColor="#ECD5B3" />
                  <stop offset="100%" stopColor="#DFBF92" />
                </linearGradient>

                <linearGradient id="tnLandDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2E241E" />
                  <stop offset="50%" stopColor="#231B16" />
                  <stop offset="100%" stopColor="#1B1410" />
                </linearGradient>

                {/* கடல் பின்னணி அலை வடிவம் */}
                <pattern id="seaPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 0 5 Q 2.5 3 5 5 T 10 5" fill="none" stroke="#1F6F78" strokeWidth="0.3" opacity="0.25" />
                </pattern>
              </defs>

              {/* கடல் பரப்பு / நீர்நிலை பின்னணி */}
              <rect width="100" height="100" fill="url(#seaPattern)" />

              {/* அயல் மாநிலங்களின் எல்லைக் குறிப்புகள் */}
              {/* ஆந்திர எல்லை */}
              <path d="M 38 15 L 70 10 L 96 2" stroke="#8A7A6D" strokeWidth="0.6" strokeDasharray="1.5 1" fill="none" />
              <text x="56" y="8" className="text-[2.2px] fill-[#8A7A6D] font-bold">ஆந்திரப் பிரதேசம்</text>

              {/* கர்நாடக எல்லை */}
              <path d="M 6 37 L 21 34 L 38 15" stroke="#8A7A6D" strokeWidth="0.6" strokeDasharray="1.5 1" fill="none" />
              <text x="14" y="24" className="text-[2.2px] fill-[#8A7A6D] font-bold">கர்நாடகம்</text>

              {/* கேரள எல்லை (மேற்குத் தொடர்ச்சி மலைப்பாதை) */}
              <path d="M 6 37 L 16 49 L 18 58 L 24 63 L 26 68 L 25 82 L 23 95 L 32 98" stroke="#8A7A6D" strokeWidth="0.6" strokeDasharray="1.5 1" fill="none" />
              <text x="6" y="65" className="text-[2.2px] fill-[#8A7A6D] font-bold">கேரளம்</text>

              {/* =========================================================================
                  அசல் தமிழ்நாடு புவியியல் வெளி எல்லை (Accurate Real Geography Outer Path)
                  - பழவேற்காடு ஏரி (Pulicat Lake) 13.45°N, 80.25°E
                  - சென்னை & மாமல்லபுரம் கடற்கரை
                  - காவிரி டெல்டா மற்றும் கோடியக்கரை (Point Calimere) கூம்பு முனை
                  - பாக் வளைகுடா & மண்டபம் / பாம்பன் தீவு (Rameswaram)
                  - மன்னார் வளைகுடா, தூத்துக்குடி, திருச்செந்தூர்
                  - கன்னியாகுமரி முனை (Cape Comorin 8.08°N, 77.55°E)
                  - மேற்குத் தொடர்ச்சி மலை எல்லை & நீலகிரி உச்சி
                  - ஓசூர் / கிருஷ்ணகிரி வடக்கு பீடபூமி
                  ========================================================================= */}
              <path
                d="M 96.4 2.7
                   C 97.2 6.5, 97.5 9.5, 97.1 11.5
                   C 96.5 14.5, 95.8 17.5, 94.8 21.0
                   C 93.0 26.0, 89.5 29.5, 87.5 33.5
                   C 85.5 37.0, 86.5 40.5, 87.2 44.0
                   C 87.5 48.0, 87.2 52.0, 87.4 56.5
                   C 87.5 59.0, 86.0 60.5, 82.0 60.0
                   C 76.5 59.5, 73.0 63.0, 71.0 66.0
                   C 68.5 70.0, 65.5 73.5, 68.0 76.5
                   C 70.5 78.0, 75.5 77.5, 77.0 77.8
                   C 78.5 78.2, 74.0 80.5, 68.5 80.5
                   C 60.0 80.5, 54.0 82.5, 48.0 86.0
                   C 45.0 88.0, 44.5 91.5, 43.5 94.0
                   C 41.5 96.0, 36.0 98.0, 32.1 98.6
                   C 29.5 99.0, 26.5 97.5, 23.5 95.5
                   C 24.5 90.0, 25.5 85.0, 25.0 82.5
                   C 24.5 78.0, 26.5 72.0, 26.2 68.5
                   C 25.5 65.5, 23.0 63.5, 21.5 61.5
                   C 19.5 59.0, 16.5 56.0, 16.0 51.5
                   C 15.5 48.5, 12.0 44.0, 8.5 40.5
                   C 6.0 37.5, 7.5 35.5, 10.5 35.0
                   C 14.5 34.5, 20.0 34.8, 24.0 32.0
                   C 28.0 29.5, 34.0 27.5, 37.4 25.0
                   C 38.5 21.0, 38.0 16.5, 41.5 14.8
                   C 47.0 14.5, 55.0 14.0, 65.0 12.0
                   C 74.0 10.0, 84.0 6.5, 92.0 4.0
                   Z"
                className="fill-[url(#tnLandGrad)] dark:fill-[url(#tnLandDarkGrad)] stroke-[#7A1F2B] dark:stroke-[#D9A441] stroke-[1.2]"
              />

              {/* மண்டல எல்லைகள் (Regions) */}
              {showDistricts && (
                <g stroke="#7A1F2B" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.4" fill="none">
                  {/* வட தமிழ்நாடு / தொண்டை நாடு எல்லை */}
                  <path d="M 45 15 Q 65 24 88 28" />
                  {/* நடுநாடு எல்லை */}
                  <path d="M 37 34 Q 60 38 86 42" />
                  {/* கொங்கு நாடு & சோழ நாடு பிரிவு */}
                  <path d="M 46 36 L 44 65" />
                  {/* காவிரி டெல்டா / தஞ்சை பிரதேசம் */}
                  <path d="M 44 52 Q 65 52 87 56" />
                  {/* பாண்டிய நாடு எல்லை */}
                  <path d="M 26 68 Q 45 68 68 76" />
                  {/* தென் மண்டலம் (நெல்லை / குமரி) */}
                  <path d="M 25 82 Q 35 83 48 86" />
                </g>
              )}

              {/* மண்டலப் பெயர்கள் */}
              {showDistricts && (
                <g className="text-[2.2px] fill-[#7A1F2B]/60 dark:fill-[#D9A441]/60 font-bold select-none">
                  <text x="68" y="20">தொண்டை நாடு</text>
                  <text x="24" y="44">கொங்கு நாடு</text>
                  <text x="66" y="48">சோழ நாடு (டெல்டா)</text>
                  <text x="44" y="70">பாண்டிய நாடு</text>
                  <text x="32" y="90">தென்பாண்டி நாடு</text>
                </g>
              )}

              {/* தமிழ்நாட்டின் 5 முக்கிய நதிகள் (Tamil Nadu 5 Sacred Rivers) */}
              {showRivers && (
                <g fill="none">
                  {/* 1. பாலாறு (Palar River) */}
                  <path
                    d="M 52 16 Q 66 17, 80 18 Q 88 19, 95 21"
                    stroke="#1F6F78"
                    strokeWidth="1.2"
                  />
                  <text x="70" y="15" className="text-[2.3px] fill-[#1F6F78] font-bold">பாலாறு</text>

                  {/* 2. தென்பெண்ணை ஆறு (Thenpennai River) */}
                  <path
                    d="M 42 22 Q 58 26, 74 30 Q 82 32, 86 34"
                    stroke="#1F6F78"
                    strokeWidth="1.2"
                  />
                  <text x="60" y="26" className="text-[2.3px] fill-[#1F6F78] font-bold">தென்பெண்ணை</text>

                  {/* 3. காவிரி ஆறு & டெல்டா பிரிவுகள் (Cauvery River & Srirangam Delta) */}
                  <path
                    d="M 37 25 Q 36 32, 34 38 Q 36 43, 44 45 Q 56 47, 65 48"
                    stroke="#1F6F78"
                    strokeWidth="1.6"
                  />
                  {/* கொள்ளிடம் பிரிவு */}
                  <path
                    d="M 65 48 Q 74 46, 84 43 Q 86 43, 87 44"
                    stroke="#1F6F78"
                    strokeWidth="1.1"
                  />
                  {/* காவிரி பிரதான கிளை */}
                  <path
                    d="M 65 48 Q 75 51, 84 51 Q 86 52, 87 53"
                    stroke="#1F6F78"
                    strokeWidth="1.1"
                  />
                  <text x="48" y="43" className="text-[2.8px] fill-[#1F6F78] font-bold">காவிரி</text>

                  {/* 4. வைகை ஆறு (Vaigai River) */}
                  <path
                    d="M 27 66 Q 36 65, 46 68 Q 58 72, 66 75"
                    stroke="#1F6F78"
                    strokeWidth="1.3"
                  />
                  <text x="42" y="65" className="text-[2.5px] fill-[#1F6F78] font-bold">வைகை</text>

                  {/* 5. தாமிரபரணி ஆறு (Thamirabarani River) */}
                  <path
                    d="M 27 86 Q 34 87, 40 88 Q 43 90, 46 91"
                    stroke="#1F6F78"
                    strokeWidth="1.3"
                  />
                  <text x="32" y="85" className="text-[2.4px] fill-[#1F6F78] font-bold">தாமிரபரணி</text>
                </g>
              )}

              {/* கடல் மற்றும் வளைகுடா குறிப்புகள் */}
              <text x="82" y="24" className="text-[2.3px] fill-[#1F6F78]/70 font-semibold">வங்காள விரிகுடா</text>
              <text x="74" y="68" className="text-[2.1px] fill-[#1F6F78]/70 font-semibold">பாக் ஜலசந்தி</text>
              <text x="54" y="88" className="text-[2.1px] fill-[#1F6F78]/70 font-semibold">மன்னார் வளைகுடா</text>
              <text x="26" y="99" className="text-[2.3px] fill-[#7A1F2B] font-bold">கன்னியாகுமரி முனை</text>
            </svg>

            {/* வரலாற்று இடங்களுக்கான ஊடாடும் குறிப்பான்கள் (Interactive Place Markers) */}
            {filteredPlaces.map((place) => {
              const pos = getMarkerPosition(place);
              const isSelected = selectedPlace?.id === place.id;
              return (
                <div
                  key={place.id}
                  style={{ top: `${pos.y}%`, left: `${pos.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                  onClick={() => setSelectedPlace(place)}
                >
                  {/* துடிக்குமலை வட்டம் */}
                  {isSelected && (
                    <span className="absolute -inset-2.5 rounded-full bg-[#7A1F2B]/60 dark:bg-[#D9A441]/60 animate-ping" />
                  )}

                  <div
                    className={`relative flex items-center justify-center p-1.5 rounded-full transition-all shadow-lg ${
                      isSelected
                        ? 'bg-[#7A1F2B] text-white scale-125 ring-2 ring-[#D9A441]'
                        : 'bg-[#D9A441] text-[#2B1D14] hover:bg-[#7A1F2B] hover:text-white hover:scale-115'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </div>

                  {/* பெயர்ப் பலகை / Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover:block whitespace-nowrap bg-[#2B1D14] text-[#FBF6EA] text-[11px] px-2.5 py-1 rounded shadow-xl z-30 pointer-events-none border border-[#D9A441]/50">
                    <p className="font-bold">{place.name}</p>
                    <p className="text-[10px] text-[#D9A441]">{place.district} மாவட்டம்</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* அடிக்குறிப்பு வழிகாட்டி */}
          <div className="w-full flex items-center justify-between text-xs text-[#2B1D14]/70 dark:text-[#F5EFEB]/70 pt-2 border-t border-[#D9A441]/20">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7A1F2B] border border-[#D9A441]" /> தேர்ந்தெடுத்த தலம்
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D9A441]" /> வரலாற்று மையம்
              </span>
            </div>
            <span className="font-bold text-[#7A1F2B] dark:text-[#D9A441]">
              காட்டப்படும் மையங்கள்: {filteredPlaces.length}
            </span>
          </div>
        </div>

        {/* தேர்ந்தெடுக்கப்பட்ட தலத்தின் முழுமையான வரலாற்று ஆவணப் பலகை */}
        <div className="lg:col-span-5 bg-white dark:bg-[#201A16] rounded-2xl p-5 border-2 border-[#D9A441]/40 shadow-xl flex flex-col justify-between">
          {selectedPlace ? (
            <div>
              {/* தலைப்பு & மாவட்டம் */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#D9A441]/25">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#1F6F78]/15 text-[#1F6F78] dark:text-[#3DB2BF] border border-[#1F6F78]/30">
                      {selectedPlace.district} மாவட்டம்
                    </span>
                    <span className="text-[11px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 font-mono">
                      {selectedPlace.lat.toFixed(2)}° வ, {selectedPlace.lng.toFixed(2)}° கி
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441]">
                    {selectedPlace.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleReadAloud(
                      `${selectedPlace.name}, ${selectedPlace.district} மாவட்டம். ${selectedPlace.era}. ${selectedPlace.description}`
                    )
                  }
                  title="குரல் வழியே கேள்"
                  className={`p-2.5 rounded-full cursor-pointer transition-colors ${
                    isSpeaking
                      ? 'bg-[#7A1F2B] text-white animate-pulse'
                      : 'bg-[#D9A441]/20 hover:bg-[#D9A441]/40 text-[#7A1F2B] dark:text-[#D9A441]'
                  }`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* உண்மையான வரலாற்றுத் தலத்தின் படம் */}
              <div className="my-3 rounded-xl overflow-hidden h-44 border border-[#D9A441]/30 relative shadow-sm">
                <img
                  src={selectedPlace.image}
                  alt={selectedPlace.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md text-[#FBF6EA] text-xs px-3 py-1.5 rounded-lg flex items-center justify-between border border-white/20">
                  <span>பாதுகாக்கப்பட்ட ஏடுகள் / சாசனங்கள்:</span>
                  <span className="text-[#D9A441] font-extrabold text-sm font-mono">
                    {selectedPlace.manuscriptCount.toLocaleString('ta-IN')}
                  </span>
                </div>
              </div>

              {/* காலம் & வரிவடிவம் */}
              <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                <div className="bg-[#FBF6EA] dark:bg-[#181412] p-2.5 rounded-lg border border-[#D9A441]/25">
                  <div className="flex items-center gap-1 text-[#7A1F2B] dark:text-[#D9A441] font-bold mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>காலப் பின்னணி</span>
                  </div>
                  <p className="text-[#2B1D14]/85 dark:text-[#F5EFEB]/85 leading-tight">{selectedPlace.era}</p>
                </div>

                <div className="bg-[#FBF6EA] dark:bg-[#181412] p-2.5 rounded-lg border border-[#D9A441]/25">
                  <div className="flex items-center gap-1 text-[#1F6F78] dark:text-[#3DB2BF] font-bold mb-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>வரிவடிவம் / எழுத்துரு</span>
                  </div>
                  <p className="text-[#2B1D14]/85 dark:text-[#F5EFEB]/85 leading-tight">{selectedPlace.scriptType}</p>
                </div>
              </div>

              {/* முழுமையான வரலாற்று விளக்கம் */}
              <div className="mb-4">
                <span className="text-xs font-bold text-[#7A1F2B] dark:text-[#D9A441] block mb-1">
                  முழுமையான வரலாற்று ஆவணம் & அகழாய்வுக் குறிப்புகள்:
                </span>
                <div className="text-xs sm:text-sm text-[#2B1D14]/90 dark:text-[#F5EFEB]/90 font-tamil-serif leading-relaxed bg-[#FBF6EA]/60 dark:bg-[#181412]/60 p-3 rounded-lg border border-[#D9A441]/20 max-h-44 overflow-y-auto">
                  {selectedPlace.description}
                </div>
              </div>

              {/* கண்டெடுக்கப்பட்ட முக்கிய ஏடுகள் / ஆவணங்கள் */}
              <div className="mb-4">
                <h4 className="text-xs font-bold text-[#7A1F2B] dark:text-[#D9A441] mb-2 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>கண்டெடுக்கப்பட்ட முதன்மை ஏடுகள் & சாசனங்கள்:</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPlace.notableManuscripts.map((m, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-[#D9A441]/15 text-[#2B1D14] dark:text-[#F5EFEB] px-2.5 py-1 rounded-md border border-[#D9A441]/40 font-semibold"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* சுவடியை ஆய்வுக்குத் தேர்ந்தெடுக்கும் பொத்தான் */}
              {onSelectPlaceForManuscript && (
                <button
                  type="button"
                  onClick={() => onSelectPlaceForManuscript(selectedPlace)}
                  className="w-full py-3 bg-[#7A1F2B] hover:bg-[#962635] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-95 border border-[#D9A441]/40"
                >
                  <Sparkles className="w-4 h-4 text-[#D9A441]" />
                  <span>இத்தலத்துச் சுவடியை ஆய்வுக்குத் தேர்ந்தெடு</span>
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-16 text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 text-sm">
              வரைபடத்தில் ஏதேனும் ஒரு வரலாற்றுத் தலத்தைக் கிளிக் செய்து முழுமையான விவரங்களைக் காண்க.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
