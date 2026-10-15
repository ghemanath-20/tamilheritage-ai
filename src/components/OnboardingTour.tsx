/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Camera, Check, X, ArrowRight } from 'lucide-react';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<number>(1);

  const tourSteps = [
    {
      step: 1,
      title: '1. பூச்சிய-கற்பனை விதிமுறை (Zero-Hallucination Mandate)',
      desc: '100 ஆண்டு பழைமையான தமிழ் நூல்களை மீட்டெடுக்கும்போது, செயற்கை நுண்ணறிவு தனக்குத் தெரியாத அல்லது சேதமடைந்த எழுத்துக்களை சுயமாக கற்பனை செய்து தவறான சொற்களை உருவாக்காது. மூடிய செந்தமிழ்ச் சொற்களஞ்சியத்தோடு மட்டுமே ஒப்பிட்டு [உறுதியில்லை] என்று மனித பார்வைக்கு அனுப்பி வைக்கும்.',
      icon: ShieldCheck,
      color: '#7A1F2B',
    },
    {
      step: 2,
      title: '2. படச் சீரமைப்பு மற்றும் 4 எழுத்துணரி ஒருங்கிணைப்பு',
      desc: 'கறைகள், மை வழிந்த பகுதிகள் மற்றும் மங்கிய எழுத்துக்கள் தகவமைப்பு வடிகட்டிகள் வழியே சீரமைக்கப்படுகின்றன. நான்கு வெவ்வேறு எழுத்துணரிகள் ஒரே நேரத்தில் ஆய்வு செய்து நம்பகத்தன்மை எடையோடு ஒருமித்த முடிவை வழங்குகின்றன.',
      icon: Sparkles,
      color: '#1F6F78',
    },
    {
      step: 3,
      title: '3. நேரலை நிழற்படக் கருவி & தமிழ்நாட்டு வரலாற்று வரைபடம்',
      desc: 'உங்கள் இல்லத்திலுள்ள சுவடிகளை நேரலை நிழற்படக் கருவியின் வழிகாட்டு கட்டத்தில் வைத்து தானியங்கியாகப் படம் எடுக்கலாம். மேலும், தஞ்சை சரஸ்வதி மகால், மாமல்லபுரம், கீழடி உள்ளிட்ட பழந்தமிழ் ஆவணத் தலங்களை ஊடாடும் வரைபடத்தில் ஆராயலாம்.',
      icon: Camera,
      color: '#D9A441',
    },
  ];

  const current = tourSteps[step - 1];
  const Icon = current.icon;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-tamil select-none">
      <div className="bg-[#FBF6EA] dark:bg-[#181412] text-[#2B1D14] dark:text-[#F5EFEB] rounded-2xl border-2 border-[#D9A441]/50 shadow-2xl max-w-lg w-full p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* படிநிலை காட்டி / Step indicator dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                step === s ? 'w-8 bg-[#7A1F2B] dark:bg-[#D9A441]' : 'w-2 bg-[#D9A441]/30'
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col items-center text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg"
            style={{ backgroundColor: current.color }}
          >
            <Icon className="w-8 h-8" />
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441] mb-2">
            {current.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#2B1D14]/80 dark:text-[#F5EFEB]/80 leading-relaxed mb-6 font-tamil-serif">
            {current.desc}
          </p>

          <div className="w-full flex items-center justify-between pt-4 border-t border-[#D9A441]/20">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg text-xs font-semibold cursor-pointer"
              >
                முந்தையது
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 hover:underline cursor-pointer"
              >
                தவிர்
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-[#7A1F2B] hover:bg-[#962635] text-white rounded-lg text-xs sm:text-sm font-bold cursor-pointer shadow flex items-center gap-2"
            >
              <span>{step === 3 ? 'பயணத்தைத் தொடங்கு' : 'அடுத்தது'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
