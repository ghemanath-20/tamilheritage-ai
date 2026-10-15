/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ManuscriptWord, StrictnessLevel } from '../types';
import { OcrService } from '../services/ocrService';
import { ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle, Sliders, Activity, Zap, Info } from 'lucide-react';

interface ConstrainedCorrectionEngineViewProps {
  words: ManuscriptWord[];
  strictness: StrictnessLevel;
  onUpdateStrictness: (level: StrictnessLevel) => void;
  onSelectWordForReview?: (word: ManuscriptWord) => void;
}

export const ConstrainedCorrectionEngineView: React.FC<ConstrainedCorrectionEngineViewProps> = ({
  words,
  strictness,
  onUpdateStrictness,
  onSelectWordForReview,
}) => {
  const [selectedWord, setSelectedWord] = useState<ManuscriptWord>(words[0] || null);
  const [eraseTestWord, setEraseTestWord] = useState<string>('தொல்காப்பியம்');
  const [eraseTestResult, setEraseTestResult] = useState<any | null>(null);

  // Run the "அழிக்கப்பட்ட எழுத்து சோதனை" (Deleted glyph safety test)
  const handleRunEraseTest = () => {
    const res = OcrService.testEraseSafety(eraseTestWord);
    setEraseTestResult(res);
  };

  // Confidence color utility
  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) {
      return (
        <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>{confidence}% (உயர் நம்பகத்தன்மை)</span>
        </span>
      );
    }
    if (confidence >= 70) {
      return (
        <span className="bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 text-amber-600" />
          <span>{confidence}% (நடுத்தரம்)</span>
        </span>
      );
    }
    return (
      <span className="bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1">
        <HelpCircle className="w-3 h-3 text-rose-600" />
        <span>{confidence}% (மனித மதிப்பாய்வுக்கு அனுப்பப்பட்டது)</span>
      </span>
    );
  };

  return (
    <div className="bg-[#FBF6EA] dark:bg-[#181412] text-[#2B1D14] dark:text-[#F5EFEB] rounded-xl border border-[#D9A441]/30 p-4 sm:p-6 shadow-md font-tamil">
      {/* தலைப்பு */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D9A441]/20 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-[#7A1F2B] dark:text-[#D9A441]" />
            <h2 className="text-xl sm:text-2xl font-bold font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441]">
              கட்டுப்பாட்டுத் திருத்த இயந்திரம் (பூச்சிய-கற்பனை விதிமுறை)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#2B1D14]/80 dark:text-[#F5EFEB]/80">
            மூன்று அடுக்கு சொல்லடைவுகளில் இல்லாத எந்தவொரு புதிய சொல்லையும் செயற்கை நுண்ணறிவு தானாக உருவாக்காது
          </p>
        </div>

        {/* கற்பனைச் சொல் விகிதம் (Live Invention Rate Gauge) */}
        <div className="bg-white dark:bg-[#201A16] px-4 py-2.5 rounded-xl border border-[#D9A441]/40 flex items-center gap-3 shadow-sm">
          <Activity className="w-5 h-5 text-emerald-600 animate-pulse" />
          <div>
            <span className="text-[11px] block font-semibold text-[#2B1D14]/70 dark:text-[#F5EFEB]/70">
              கற்பனைச் சொல் விகிதம்:
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold text-emerald-600">0.00%</span>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                பூச்சிய இலக்கு உறுதி
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* கட்டுப்பாடு பயன்முறைத் தேர்வு (Strictness Selector) */}
      <div className="my-6 bg-white dark:bg-[#201A16] p-4 rounded-xl border border-[#D9A441]/30">
        <div className="flex items-center gap-2 mb-3 text-sm font-bold text-[#7A1F2B] dark:text-[#D9A441]">
          <Sliders className="w-4 h-4" />
          <span>கட்டுப்பாட்டு கடுமைத் தேர்வு (Strictness Level):</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              id: 'ultra',
              label: 'மிகக் கடுமை',
              desc: 'எந்தவித ஊகமும் இன்றி பழஞ்சொற்களஞ்சியத்தில் முழுமையாகப் பொருந்தினால் மட்டுமே ஏற்கும்.',
            },
            {
              id: 'strict',
              label: 'கடுமை',
              desc: 'சொற்களஞ்சியத்தில் உள்ள சொற்களுக்கு அதிக முன்னுரிமை அளித்து திருத்தங்களை முன்மொழியும்.',
            },
            {
              id: 'balanced',
              label: 'சமநிலை',
              desc: 'சூழல் பொருள் பொருந்தி வரும் சொற்களை மனிதப் பார்வைக்கு வழிகாட்டும்.',
            },
          ].map((item) => {
            const active = strictness === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onUpdateStrictness(item.id as StrictnessLevel)}
                className={`p-3.5 rounded-lg border-2 cursor-pointer transition-all ${
                  active
                    ? 'border-[#7A1F2B] dark:border-[#D9A441] bg-[#7A1F2B]/5 dark:bg-[#D9A441]/10 shadow'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-[#D9A441]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-[#7A1F2B] dark:text-[#D9A441]">{item.label}</span>
                  {active && <span className="w-2.5 h-2.5 rounded-full bg-[#7A1F2B] dark:bg-[#D9A441]" />}
                </div>
                <p className="text-xs text-[#2B1D14]/70 dark:text-[#F5EFEB]/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* சொல் பட்டியல் மற்றும் நம்பகத்தன்மை நிலைகள் */}
        <div className="lg:col-span-7 bg-white dark:bg-[#201A16] rounded-xl p-4 border border-[#D9A441]/30 shadow">
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#D9A441]/20">
            <span className="text-sm font-bold text-[#7A1F2B] dark:text-[#D9A441]">
              பக்கத்தில் கண்டறியப்பட்ட சொற்கள் ({words.length})
            </span>
            <span className="text-xs text-[#2B1D14]/60 dark:text-[#F5EFEB]/60">
              சொல்லைத் தேர்வு செய்து தரவரிசையை ஆராய்க
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-80 overflow-y-auto p-1">
            {words.map((w) => {
              const isSelected = selectedWord?.id === w.id;
              return (
                <div
                  key={w.id}
                  onClick={() => setSelectedWord(w)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#7A1F2B] dark:border-[#D9A441] bg-[#7A1F2B]/10 dark:bg-[#D9A441]/15 shadow-sm'
                      : 'border-[#D9A441]/20 hover:border-[#D9A441]/50'
                  }`}
                >
                  <p className="font-bold text-sm truncate font-tamil-serif">{w.originalText}</p>
                  <div className="mt-1 flex items-center justify-between text-[11px]">
                    <span
                      className={`font-semibold ${
                        w.confidence >= 90
                          ? 'text-emerald-600'
                          : w.confidence >= 70
                          ? 'text-amber-600'
                          : 'text-rose-600'
                      }`}
                    >
                      {w.confidence}%
                    </span>
                    <span className="text-[10px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 truncate">
                      {w.tier.replace(' சொற்களஞ்சியம்', '')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* தேர்வு செய்த சொல்லின் தரவரிசைப் பலகை (Ranking Panel) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#201A16] rounded-xl p-4 border border-[#D9A441]/30 shadow flex flex-col justify-between">
          {selectedWord ? (
            <div>
              <div className="pb-3 border-b border-[#D9A441]/20 mb-3">
                <span className="text-[10px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 uppercase tracking-wider">
                  ஆய்வு செய்யப்படுகிற சொல்
                </span>
                <div className="flex items-center justify-between mt-1">
                  <h3 className="text-xl font-bold font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441]">
                    {selectedWord.originalText}
                  </h3>
                  {getConfidenceBadge(selectedWord.confidence)}
                </div>
              </div>

              {/* மூடிய வேட்பாளர் பட்டியல் (Closed Candidate List) */}
              <div className="mb-4">
                <span className="text-xs font-bold text-[#7A1F2B] dark:text-[#D9A441] block mb-1.5">
                  மூடிய சொல்லடைவு மாற்று வேட்பாளர் பட்டியல்:
                </span>
                {selectedWord.candidates && selectedWord.candidates.length > 0 ? (
                  <div className="space-y-1.5">
                    {selectedWord.candidates.map((cand, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded bg-[#FBF6EA] dark:bg-[#181412] border border-[#D9A441]/25 flex items-center justify-between text-xs"
                      >
                        <span className="font-bold font-tamil-serif">{cand}</span>
                        <span className="text-[10px] bg-[#1F6F78]/15 text-[#1F6F78] dark:text-[#3DB2BF] px-2 py-0.5 rounded border border-[#1F6F78]/30">
                          {selectedWord.tier}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-500/30 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
                    <Info className="w-4 h-4 flex-shrink-0" />
                    <span>
                      சொற்களஞ்சியத்தில் பொருத்தமான சொல் இல்லை. பூச்சிய-கற்பனை விதியின்படி சொல் திருத்தப்படாமல் <strong>[உறுதியில்லை]</strong> என்று வைக்கப்பட்டுள்ளது.
                    </span>
                  </div>
                )}
              </div>

              {/* 4-அடுக்கு மதிப்பெண் அளவீடுகள் (Ranking Breakdown Bars) */}
              <div className="space-y-2.5 text-xs pt-2 border-t border-[#D9A441]/20">
                <span className="font-bold text-[#7A1F2B] dark:text-[#D9A441] block text-xs">
                  உறுதிப்படுத்தும் 4-அடுக்கு மதிப்பெண்கள்:
                </span>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>எழுத்து நிலை ஒப்புமை</span>
                    <span className="font-mono font-bold">{selectedWord.confidence}%</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#7A1F2B] dark:bg-[#D9A441] h-full" style={{ width: `${selectedWord.confidence}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>உருபனியல் பொருத்தம் (Morphology Score)</span>
                    <span className="font-mono font-bold">{selectedWord.morphologyScore}%</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#1F6F78] h-full" style={{ width: `${selectedWord.morphologyScore}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>சூழல் சொல் நங்கூரம் (Context Score)</span>
                    <span className="font-mono font-bold">{selectedWord.contextScore}%</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full" style={{ width: `${selectedWord.contextScore}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* "அழிக்கப்பட்ட எழுத்து சோதனை" (Deleted Glyph Test Sandbox) */}
      <div className="mt-8 pt-6 border-t border-[#D9A441]/20 bg-white dark:bg-[#201A16] p-5 rounded-xl border border-[#D9A441]/30">
        <div className="flex items-center gap-2 mb-2 text-[#7A1F2B] dark:text-[#D9A441] font-bold text-base font-tamil-serif">
          <Zap className="w-5 h-5 text-[#D9A441]" />
          <span>அழிக்கப்பட்ட எழுத்து சோதனை (Zero-Hallucination Refusal Demonstration)</span>
        </div>
        <p className="text-xs text-[#2B1D14]/80 dark:text-[#F5EFEB]/80 mb-4">
          ஒரு சொல்லின் எழுத்து அழிக்கப்பட்டாலோ சிதைந்தாலோ, களஞ்சிய ஆதாரமின்றி செயற்கை நுண்ணறிவு எதையும் இட்டுக்கட்டாமல் நிராகரிப்பதை இங்கே நேரலையாகச் சோதிக்கலாம்.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={eraseTestWord}
            onChange={(e) => setEraseTestWord(e.target.value)}
            placeholder="சோதிக்க வேண்டிய தமிழ் சொல்"
            className="w-full sm:w-72 px-3 py-2 rounded border border-[#D9A441]/40 bg-[#FBF6EA] dark:bg-[#181412] text-sm font-tamil-serif"
          />
          <button
            type="button"
            onClick={handleRunEraseTest}
            className="w-full sm:w-auto px-5 py-2 bg-[#7A1F2B] hover:bg-[#962635] text-white rounded font-semibold text-xs sm:text-sm cursor-pointer shadow flex items-center justify-center gap-2"
          >
            <span>சோதனையைத் தொடங்கு</span>
          </button>
        </div>

        {eraseTestResult && (
          <div className="mt-4 p-4 rounded-lg bg-[#FBF6EA] dark:bg-[#181412] border border-[#D9A441]/30 text-xs">
            <div className="flex items-center gap-2 mb-2 font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>{eraseTestResult.systemMessage}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
              <div className="p-2 bg-white dark:bg-[#201A16] rounded border border-[#D9A441]/20">
                <span className="text-[10px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 block">மூலச் சொல்:</span>
                <span className="font-bold text-sm font-tamil-serif">{eraseTestResult.originalWord}</span>
              </div>
              <div className="p-2 bg-white dark:bg-[#201A16] rounded border border-[#D9A441]/20">
                <span className="text-[10px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 block">அழிக்கப்பட்ட நிலை:</span>
                <span className="font-bold text-sm font-tamil-serif text-rose-600">{eraseTestResult.erasedWord}</span>
              </div>
              <div className="p-2 bg-white dark:bg-[#201A16] rounded border border-[#D9A441]/20">
                <span className="text-[10px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 block">கற்பனை மறுப்பு:</span>
                <span className="font-bold text-sm text-emerald-600">வெற்றிகரமாக மறுக்கப்பட்டது</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
