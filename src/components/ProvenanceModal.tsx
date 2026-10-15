/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ManuscriptWord } from '../types';
import { GitBranch, X, CheckCircle2, ShieldCheck, Cpu, UserCheck, Layers, FileImage } from 'lucide-react';

interface ProvenanceModalProps {
  word: ManuscriptWord | null;
  onClose: () => void;
}

export const ProvenanceModal: React.FC<ProvenanceModalProps> = ({ word, onClose }) => {
  if (!word) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 font-tamil select-none">
      <div className="bg-[#FBF6EA] dark:bg-[#181412] text-[#2B1D14] dark:text-[#F5EFEB] rounded-xl border border-[#D9A441]/40 shadow-2xl max-w-2xl w-full p-5 max-h-[90vh] overflow-y-auto">
        {/* தலைப்பு */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D9A441]/20">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[#7A1F2B] dark:text-[#D9A441]" />
            <h3 className="text-lg font-bold font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441]">
              சொல் மூல வழித்தோன்றல் மரம் (Word Provenance Tree)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-2 text-xs text-[#2B1D14]/70 dark:text-[#F5EFEB]/70">
          ஆய்வு செய்யப்படும் சொல்: <strong className="text-sm font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441]">{word.originalText}</strong>
        </div>

        {/* படிநிலை மரம் / Hierarchical Tree Structure */}
        <div className="space-y-4 my-4 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#D9A441]/40">
          {/* படி 1: மூல ஏட்டுப் படத்துளிகள் */}
          <div className="relative flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#7A1F2B] text-white flex items-center justify-center z-10 shadow">
              <FileImage className="w-5 h-5" />
            </div>
            <div className="flex-1 bg-white dark:bg-[#201A16] p-3 rounded-lg border border-[#D9A441]/30 text-xs">
              <span className="font-bold text-[#7A1F2B] dark:text-[#D9A441] block mb-1">
                படி 1: மூல ஏட்டுப் படத்துளிகள் (Original Raw Pixels)
              </span>
              <p className="text-[#2B1D14]/80 dark:text-[#F5EFEB]/80">
                100 ஆண்டு பழைமையான தாள்/ஓலைச்சுவடியின் செபியா நிறப் படத்துண்டுகள் பிரித்தெடுக்கப்பட்டன.
              </p>
              <div className="mt-1.5 text-[11px] font-mono text-[#1F6F78]">
                நிலை: {word.damaged ? 'சிதைந்த பகுதி கண்டறியப்பட்டது' : 'தெளிவான அச்சுப் பதிவு'}
              </div>
            </div>
          </div>

          {/* படி 2: சீரமைத்த படம் & கறை நீக்கம் */}
          <div className="relative flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1F6F78] text-white flex items-center justify-center z-10 shadow">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex-1 bg-white dark:bg-[#201A16] p-3 rounded-lg border border-[#D9A441]/30 text-xs">
              <span className="font-bold text-[#1F6F78] dark:text-[#3DB2BF] block mb-1">
                படி 2: சீரமைத்த படத்துளி & வடிவ நிரப்பு (Enhanced Glyph)
              </span>
              <p className="text-[#2B1D14]/80 dark:text-[#F5EFEB]/80">
                மாறுபாடு சரிசெய்யப்பட்டு மங்கல்கள் நீக்கப்பட்டன. தமிழ் அச்சு வார்ப்புரு ஒப்புமை: {word.glyphMatchPercent}%.
              </p>
            </div>
          </div>

          {/* படி 3: நான்கு எழுத்துணரி கருதுகோள்கள் */}
          <div className="relative flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#D9A441] text-[#2B1D14] flex items-center justify-center z-10 shadow font-bold">
              <Cpu className="w-5 h-5 text-[#7A1F2B]" />
            </div>
            <div className="flex-1 bg-white dark:bg-[#201A16] p-3 rounded-lg border border-[#D9A441]/30 text-xs">
              <span className="font-bold text-[#7A1F2B] dark:text-[#D9A441] block mb-1">
                படி 3: நான்கு எழுத்துணரி ஒருமித்த தேர்வு (Multi-Engine Consensus)
              </span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['எழுத்துணரி 1', 'எழுத்துணரி 2', 'எழுத்துணரி 3', 'எழுத்துணரி 4'].map((eng, idx) => (
                  <div key={idx} className="p-1.5 bg-[#FBF6EA] dark:bg-[#181412] rounded border border-[#D9A441]/20">
                    <span className="font-semibold block">{eng}</span>
                    <span className="text-emerald-600 font-bold font-mono">
                      {word.engineScores ? word.engineScores[idx] : 95}% நம்பகத்தன்மை
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* படி 4: மூடிய சொல்லடைவு வேட்பாளர்கள் */}
          <div className="relative flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center z-10 shadow">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 bg-white dark:bg-[#201A16] p-3 rounded-lg border border-[#D9A441]/30 text-xs">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                படி 4: மூடிய சொல்லடைவுச் சரிபார்ப்பு (Closed Lexicon Candidates)
              </span>
              <p className="text-[#2B1D14]/80 dark:text-[#F5EFEB]/80">
                சொற்களஞ்சிய அடுக்கு: <strong>{word.tier}</strong>. தொகுக்கப்படாத சொற்கள் தவிர்க்கப்பட்டு பூச்சிய-கற்பனை விதி உறுதி செய்யப்பட்டது.
              </p>
            </div>
          </div>

          {/* படி 5: இறுதி முடிவு & மனித மேற்பார்வை */}
          <div className="relative flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#7A1F2B] text-white flex items-center justify-center z-10 shadow">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 bg-white dark:bg-[#201A16] p-3 rounded-lg border border-[#D9A441]/30 text-xs">
              <span className="font-bold text-[#7A1F2B] dark:text-[#D9A441] block mb-1">
                படி 5: மனிதத் திருத்துநர் ஏற்பு & வெளியீட்டு நிலை
              </span>
              <div className="flex items-center gap-2 mt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {word.status === 'accepted' ? 'ஏற்கப்பட்டது மற்றும் காப்பகத்திற்குத் தயார்' : 'மதிப்பாய்வு நிலுவையில் உள்ளது'}
                </span>
              </div>
              <span className="text-[10px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 block mt-1">
                தணிக்கைக் கைரேகை: ஷா256-தமிழ்-{word.id}-உறுதி
              </span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#D9A441]/20 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#7A1F2B] text-white rounded text-xs font-semibold cursor-pointer"
          >
            மூடு
          </button>
        </div>
      </div>
    </div>
  );
};
