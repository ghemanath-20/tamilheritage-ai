/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Delete, CornerDownLeft, Space } from 'lucide-react';

interface TamilKeyboardProps {
  onInsertChar: (char: string) => void;
  onBackspace: () => void;
  onEnter?: () => void;
}

export const TamilKeyboard: React.FC<TamilKeyboardProps> = ({
  onInsertChar,
  onBackspace,
  onEnter,
}) => {
  // தமிழ்99 விசைப்பலகை வரிசைகள்
  const vowels = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ', 'ஃ'];
  const consonants = [
    'க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம',
    'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன',
  ];
  const signs = ['ா', 'ி', 'ீ', 'ு', 'ூ', 'ெ', 'ே', 'ை', 'ொ', 'ோ', 'ௌ', '்'];

  return (
    <div className="bg-[#2B1D14]/90 dark:bg-[#181412] p-3 rounded-lg border border-[#D9A441]/40 shadow-xl max-w-2xl mx-auto select-none">
      <div className="flex items-center justify-between pb-2 border-b border-[#D9A441]/20 mb-2">
        <span className="text-xs font-semibold text-[#D9A441]">தமிழ்99 விசைப்பலகை</span>
        <span className="text-[11px] text-[#FBF6EA]/70">நேரடி உள்ளீடு முறை</span>
      </div>

      {/* உயிரெழுத்துக்கள் */}
      <div className="flex flex-wrap gap-1 mb-2">
        {vowels.map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => onInsertChar(char)}
            className="flex-1 min-w-[32px] h-9 bg-[#FBF6EA]/10 hover:bg-[#D9A441] hover:text-[#2B1D14] text-[#FBF6EA] text-sm rounded font-medium transition-colors cursor-pointer active:scale-95 flex items-center justify-center"
          >
            {char}
          </button>
        ))}
      </div>

      {/* மெய்யெழுத்துக்கள் */}
      <div className="grid grid-cols-9 gap-1 mb-2">
        {consonants.map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => onInsertChar(char)}
            className="h-9 bg-[#FBF6EA]/15 hover:bg-[#D9A441] hover:text-[#2B1D14] text-[#FBF6EA] text-sm rounded font-medium transition-colors cursor-pointer active:scale-95 flex items-center justify-center"
          >
            {char}
          </button>
        ))}
      </div>

      {/* உயிர்மெய்க் குறிகள் மற்றும் கட்டுப்பாட்டுப் பொத்தான்கள் */}
      <div className="flex flex-wrap gap-1 items-center">
        {signs.map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => onInsertChar(char)}
            className="flex-1 min-w-[28px] h-9 bg-[#D9A441]/20 hover:bg-[#D9A441] hover:text-[#2B1D14] text-[#FBF6EA] text-sm rounded font-medium transition-colors cursor-pointer active:scale-95 flex items-center justify-center"
          >
            {char}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onInsertChar(' ')}
          title="இடைவெளி"
          className="px-4 h-9 bg-[#FBF6EA]/20 hover:bg-[#D9A441] hover:text-[#2B1D14] text-[#FBF6EA] text-xs rounded transition-colors cursor-pointer flex items-center gap-1"
        >
          <Space className="w-3.5 h-3.5" />
          <span>இடைவெளி</span>
        </button>

        <button
          type="button"
          onClick={onBackspace}
          title="அழி"
          className="px-3 h-9 bg-[#7A1F2B] hover:bg-[#962635] text-white text-xs rounded transition-colors cursor-pointer flex items-center gap-1"
        >
          <Delete className="w-3.5 h-3.5" />
          <span>அழி</span>
        </button>

        {onEnter && (
          <button
            type="button"
            onClick={onEnter}
            title="உறுதி"
            className="px-3 h-9 bg-[#1F6F78] hover:bg-[#278b96] text-white text-xs rounded transition-colors cursor-pointer flex items-center gap-1"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
            <span>சேர்</span>
          </button>
        )}
      </div>
    </div>
  );
};
