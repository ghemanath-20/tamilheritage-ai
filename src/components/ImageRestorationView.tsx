/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { ManuscriptPage, ManuscriptWord } from '../types';
import { Sliders, Sparkles, Wand2, ShieldCheck, Layers, Eye, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageRestorationViewProps {
  page: ManuscriptPage;
  onUpdatePageEnhancement?: (pageId: string, enhancements: any) => void;
  onProceedToReview?: () => void;
}

export const ImageRestorationView: React.FC<ImageRestorationViewProps> = ({
  page,
  onUpdatePageEnhancement,
  onProceedToReview,
}) => {
  // Draggable slider position (0 - 100%)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // சீரமைப்புக் கட்டுப்பாடுகள் / Restoration sliders
  const [contrast, setContrast] = useState<number>(page.contrast || 75);
  const [stainRemoval, setStainRemoval] = useState<number>(page.stainRemoval || 80);
  const [denoise, setDenoise] = useState<number>(page.denoise || 65);
  const [fadeRecovery, setFadeRecovery] = useState<number>(page.fadeRecovery || 70);
  const [straighten, setStraighten] = useState<number>(page.straighten || 0);
  const [isAuto, setIsAuto] = useState<boolean>(page.autoEnhanced ?? true);

  // பெரிதாக்குதல் / Zoom level
  const [zoom, setZoom] = useState<number>(100);

  // Dragging event handlers for before/after comparison
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offset / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleAutoToggle = () => {
    const next = !isAuto;
    setIsAuto(next);
    if (next) {
      setContrast(82);
      setStainRemoval(88);
      setDenoise(72);
      setFadeRecovery(85);
      setStraighten(0);
    }
  };

  // Missing or damaged glyphs for "வடிவ நிரப்பு" (Constrained glyph inpainting demo)
  const damagedWords = page.words.filter((w) => w.damaged);

  return (
    <div className="bg-[#FBF6EA] dark:bg-[#181412] text-[#2B1D14] dark:text-[#F5EFEB] rounded-xl border border-[#D9A441]/30 p-4 sm:p-6 shadow-md font-tamil">
      {/* தலைப்பு மற்றும் செயல்பாடுகள் */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D9A441]/20 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-[#7A1F2B] dark:text-[#D9A441]" />
            <h2 className="text-xl sm:text-2xl font-bold font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441]">
              புத்திசாலிப் படச் சீரமைப்பு (மூலப்படம் ↔ மேம்படுத்திய படம்)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#2B1D14]/80 dark:text-[#F5EFEB]/80">
            பழைய சுவடியின் கறைகள் மற்றும் மங்கல்களை நீக்கி தமிழ் எழுத்து வார்ப்புருக்களை மட்டும் பாதுகாக்கும் அமைப்பு
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onProceedToReview && (
            <button
              type="button"
              onClick={onProceedToReview}
              className="px-5 py-2 bg-[#7A1F2B] hover:bg-[#962635] text-white rounded-lg text-xs sm:text-sm font-semibold cursor-pointer shadow flex items-center gap-2"
            >
              <span>மதிப்பாய்வுப் பணிமனைக்குச் செல்</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* பட ஒப்பீட்டுக் களம் (Draggable Before / After Slider) */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="flex items-center justify-between mb-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#7A1F2B] dark:text-[#D9A441]">மூலப்படம் (முன்பு)</span>
              <span className="text-[#2B1D14]/50 dark:text-[#F5EFEB]/50">↔</span>
              <span className="font-bold text-[#1F6F78] dark:text-[#3DB2BF]">மேம்படுத்திய படம் (பின்பு)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(80, z - 10))}
                className="p-1 bg-white dark:bg-[#201A16] border border-[#D9A441]/30 rounded cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono">{zoom}%</span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(180, z + 10))}
                className="p-1 bg-white dark:bg-[#201A16] border border-[#D9A441]/30 rounded cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleMouseMove}
            className="relative w-full h-[440px] sm:h-[480px] bg-black/10 rounded-xl overflow-hidden border-2 border-[#D9A441]/40 select-none cursor-ew-resize shadow-inner"
          >
            {/* மேம்படுத்திய படம் (முழு பரப்பு) */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-[#FBF6EA]"
              style={{
                filter: `contrast(${contrast}%) brightness(${100 + (fadeRecovery - 50) * 0.3}%)`,
                transform: `scale(${zoom / 100}) rotate(${straighten}deg)`,
              }}
            >
              <img
                src={page.enhancedImage}
                alt="மேம்படுத்திய சுவடி"
                className="w-full h-full object-contain pointer-events-none"
              />
              <span className="absolute top-3 right-3 bg-[#1F6F78]/85 text-white text-[11px] px-2.5 py-1 rounded font-medium shadow">
                மேம்படுத்திய படம் ({100 - Math.round(sliderPos)}%)
              </span>
            </div>

            {/* மூலப்படம் (இடது புற துண்டிப்பு அடுக்கு) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-2xl"
              style={{ width: `${sliderPos}%` }}
            >
              <div
                className="w-full h-full flex items-center justify-center bg-[#E5D2B3]"
                style={{
                  width: containerRef.current?.clientWidth || '100%',
                  transform: `scale(${zoom / 100})`,
                }}
              >
                <img
                  src={page.originalImage}
                  alt="மூலச் சுவடி"
                  className="w-full h-full object-contain pointer-events-none filter sepia contrast-125"
                />
              </div>
              <span className="absolute top-3 left-3 bg-[#7A1F2B]/85 text-white text-[11px] px-2.5 py-1 rounded font-medium shadow">
                மூலப்படம் ({Math.round(sliderPos)}%)
              </span>
            </div>

            {/* இழுவை நங்கூரம் / Draggable Divider Handle */}
            <div
              className="absolute inset-y-0 -ml-4 w-8 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-[#D9A441] text-[#2B1D14] flex items-center justify-center shadow-xl border-2 border-white text-xs font-bold">
                ↔
              </div>
            </div>
          </div>

          <p className="text-[11px] text-center text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 mt-2">
            சுட்டியை (Mouse) இடவலமாக நகர்த்தி மூலப்படத்திற்கும் சீரமைத்த படத்திற்கும் உள்ள வேறுபாட்டை ஆராயலாம்
          </p>
        </div>

        {/* தகவமைப்பு சீரமைப்புக் கட்டுப்பாடுகள் (Adaptive Controls) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white dark:bg-[#201A16] rounded-xl p-4 border border-[#D9A441]/30 shadow">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9A441]/20 mb-3">
              <div className="flex items-center gap-1.5 font-bold text-sm text-[#7A1F2B] dark:text-[#D9A441]">
                <Sliders className="w-4 h-4" />
                <span>தகவமைப்புச் சீரமைப்புக் கட்டுப்பாடுகள்</span>
              </div>

              {/* தானியங்கி நிலை மாற்றி */}
              <button
                type="button"
                onClick={handleAutoToggle}
                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1 ${
                  isAuto
                    ? 'bg-[#1F6F78] text-white shadow'
                    : 'bg-[#D9A441]/20 text-[#2B1D14] dark:text-[#F5EFEB]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>தானியங்கி: {isAuto ? 'இயக்கம்' : 'முடக்கம்'}</span>
              </button>
            </div>

            {/* நகர்வுச் சக்கரங்கள் / Sliders */}
            <div className="space-y-3.5 text-xs">
              {/* மாறுபாடு (Contrast) */}
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>மாறுபாடு (Contrast)</span>
                  <span className="font-mono text-[#7A1F2B] dark:text-[#D9A441]">{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="150"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  disabled={isAuto}
                  className="w-full accent-[#7A1F2B] cursor-pointer"
                />
              </div>

              {/* கறை நீக்கம் (Stain Removal) */}
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>கறை நீக்கம் (Stain Removal)</span>
                  <span className="font-mono text-[#7A1F2B] dark:text-[#D9A441]">{stainRemoval}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stainRemoval}
                  onChange={(e) => setStainRemoval(Number(e.target.value))}
                  disabled={isAuto}
                  className="w-full accent-[#7A1F2B] cursor-pointer"
                />
              </div>

              {/* இரைச்சல் நீக்கம் (Denoise) */}
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>இரைச்சல் நீக்கம் (Denoise)</span>
                  <span className="font-mono text-[#7A1F2B] dark:text-[#D9A441]">{denoise}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={denoise}
                  onChange={(e) => setDenoise(Number(e.target.value))}
                  disabled={isAuto}
                  className="w-full accent-[#7A1F2B] cursor-pointer"
                />
              </div>

              {/* மங்குதல் மீட்பு (Fade Recovery) */}
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>மங்குதல் மீட்பு (Fade Recovery)</span>
                  <span className="font-mono text-[#7A1F2B] dark:text-[#D9A441]">{fadeRecovery}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fadeRecovery}
                  onChange={(e) => setFadeRecovery(Number(e.target.value))}
                  disabled={isAuto}
                  className="w-full accent-[#7A1F2B] cursor-pointer"
                />
              </div>

              {/* தானியங்கி நேராக்குதல் (Straighten) */}
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>நேராக்குதல் சாய்வளவு</span>
                  <span className="font-mono text-[#7A1F2B] dark:text-[#D9A441]">{straighten}°</span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="15"
                  value={straighten}
                  onChange={(e) => setStraighten(Number(e.target.value))}
                  className="w-full accent-[#7A1F2B] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* "வடிவ நிரப்பு" (Constrained Glyph Inpainting Panel) */}
          <div className="bg-white dark:bg-[#201A16] rounded-xl p-4 border border-[#D9A441]/30 shadow">
            <div className="flex items-center gap-1.5 font-bold text-sm text-[#7A1F2B] dark:text-[#D9A441] mb-2 pb-2 border-b border-[#D9A441]/20">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>வடிவ நிரப்பு (கட்டுப்படுத்தப்பட்ட எழுத்து வார்ப்புருக்கள்)</span>
            </div>
            <p className="text-[11px] text-[#2B1D14]/80 dark:text-[#F5EFEB]/80 mb-3">
              சேதமடைந்த பகுதியில் தமிழ் அச்சு வார்ப்புரு பொருத்தம் மட்டுமே முன்மொழியப்படும். பொருந்தாதது ‘நிரப்பப்படவில்லை’ என குறிக்கப்படும்:
            </p>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
              {damagedWords.map((word) => (
                <div
                  key={word.id}
                  className="p-2.5 rounded bg-[#FBF6EA] dark:bg-[#181412] border border-[#D9A441]/25 flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[#7A1F2B] dark:text-[#D9A441]">{word.originalText}</span>
                    <span className="text-[10px] block text-[#2B1D14]/70 dark:text-[#F5EFEB]/70">
                      சேதமடைந்த எழுத்துப் பகுதி
                    </span>
                  </div>

                  <div className="text-right">
                    {word.glyphTemplate ? (
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded bg-[#1F6F78]/15 text-[#1F6F78] dark:text-[#3DB2BF] border border-[#1F6F78]/40 flex items-center justify-center font-bold text-sm">
                          {word.glyphTemplate}
                        </span>
                        <div>
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold block text-[11px]">
                            {word.glyphMatchPercent}% பொருத்தம்
                          </span>
                          <span className="text-[9px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60">வார்ப்புரு ஒப்புமை</span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-amber-800 dark:text-amber-400 bg-amber-500/15 px-2 py-1 rounded text-[11px] font-semibold border border-amber-500/30">
                        நிரப்பப்படவில்லை
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* பல எழுத்துணரி ஒருங்கிணைப்புப் பார்வை (Multi-Engine Fusion Consensus) */}
      <div className="mt-8 pt-6 border-t border-[#D9A441]/20">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-5 h-5 text-[#1F6F78] dark:text-[#3DB2BF]" />
          <h3 className="text-base sm:text-lg font-bold font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441]">
            நான்கு எழுத்துணரி ஒருங்கிணைப்பு ஆய்வு (Multi-Engine Fusion View)
          </h3>
        </div>
        <p className="text-xs text-[#2B1D14]/80 dark:text-[#F5EFEB]/80 mb-4">
          ஒவ்வொரு சொல்லுக்கும் தனித்தனி எழுத்துணரிகளின் முடிவுகள் நம்பகத்தன்மை எடையோடு தொகுக்கப்பட்டு ஒருமித்த முடிவு எட்டப்படுகிறது.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {['எழுத்துணரி 1 (தொன்மை அச்சுப் பொறி)', 'எழுத்துணரி 2 (சுவடி வடிவ வரிவடிவம்)', 'எழுத்துணரி 3 (உருபனியல் உரை நங்கூரம்)', 'எழுத்துணரி 4 (சூழல் சொல்லடைவு நங்கூரம்)'].map(
            (eng, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#201A16] p-3 rounded-lg border border-[#D9A441]/30 text-xs shadow-sm"
              >
                <div className="flex justify-between items-center mb-1.5 pb-1 border-b border-[#D9A441]/15">
                  <span className="font-bold text-[#7A1F2B] dark:text-[#D9A441]">{eng}</span>
                  <span className="font-mono text-emerald-600 font-bold">9{4 + idx}%</span>
                </div>
                <p className="text-[11px] text-[#2B1D14]/70 dark:text-[#F5EFEB]/70">
                  ஒருமித்த பங்களிப்பு எடை: <span className="font-semibold text-[#1F6F78]">0.{22 + idx * 2}</span>
                </p>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#1F6F78] h-full rounded-full"
                    style={{ width: `${92 + idx * 2}%` }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
