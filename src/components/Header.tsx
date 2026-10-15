/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LogIn } from 'lucide-react';

interface HeaderProps {
  onOpenLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLogin }) => {
  return (
    <header className="bg-[#FBF6EA] dark:bg-[#181412] text-[#2B1D14] dark:text-[#F5EFEB] border-b-2 border-[#D9A441]/40 px-6 py-4 sticky top-0 z-40 shadow-sm font-tamil select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* செயலியின் பெயர் மட்டுமே / Only App Name */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7A1F2B] to-[#962635] flex items-center justify-center text-[#D9A441] shadow-md border border-[#D9A441]/50">
            <span className="font-tamil-serif font-black text-2xl leading-none">நூ</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441] tracking-normal">
              நூல் மீட்பு
            </h1>
            <p className="text-[12px] text-[#2B1D14]/70 dark:text-[#F5EFEB]/70">
              100 ஆண்டு பழைமையான தமிழ் நூல்கள் பாதுகாப்பகம்
            </p>
          </div>
        </div>

        {/* நுழைவு வாயில் மாற்று பொத்தான் மட்டுமே / Only Login Switch Option */}
        <button
          type="button"
          onClick={onOpenLogin}
          className="px-4 py-2 bg-[#7A1F2B] hover:bg-[#962635] text-white rounded-lg text-xs sm:text-sm font-bold cursor-pointer shadow-md flex items-center gap-2 transition-all active:scale-95 border border-[#D9A441]/40"
        >
          <LogIn className="w-4 h-4 text-[#D9A441]" />
          <span>நுழைவு வாயில் மாற்று</span>
        </button>
      </div>
    </header>
  );
};
