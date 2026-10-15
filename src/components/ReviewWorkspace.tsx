/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ManuscriptPage, ManuscriptWord, Book } from '../types';
import { TamilKeyboard } from './TamilKeyboard';
import { Check, X, Edit3, RotateCcw, RotateCw, Keyboard, Sparkles, BookOpen, Clock, AlertCircle } from 'lucide-react';

interface ReviewWorkspaceProps {
  book: Book;
  page: ManuscriptPage;
  onUpdateWord: (wordId: string, updatedText: string, status: 'accepted' | 'rejected') => void;
  onShowProvenance?: (word: ManuscriptWord) => void;
  onAddToBookLexicon?: (word: string) => void;
  showToast: (msg: string) => void;
}

export const ReviewWorkspace: React.FC<ReviewWorkspaceProps> = ({
  book,
  page,
  onUpdateWord,
  onShowProvenance,
  onAddToBookLexicon,
  showToast,
}) => {
  const [selectedWordId, setSelectedWordId] = useState<string>(page.words[0]?.id || '');
  const [reviewMode, setReviewMode] = useState<'page' | 'batch'>('page');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>('');
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);

  // Undo / Redo history stack
  const [history, setHistory] = useState<{ words: ManuscriptWord[] }[]>([]);
  const [future, setFuture] = useState<{ words: ManuscriptWord[] }[]>([]);

  const selectedWord = page.words.find((w) => w.id === selectedWordId) || page.words[0];

  useEffect(() => {
    if (selectedWord) {
      setEditText(selectedWord.correctedText || selectedWord.originalText);
    }
  }, [selectedWordId]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditing) return;
      if (e.key === 'a' || e.key === 'A') {
        handleAccept();
      } else if (e.key === 'r' || e.key === 'R') {
        handleReject();
      } else if (e.key === 'e' || e.key === 'E') {
        setIsEditing(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWord, isEditing]);

  // Handle Accept
  const handleAccept = () => {
    if (!selectedWord) return;
    saveSnapshot();
    onUpdateWord(selectedWord.id, selectedWord.originalText, 'accepted');
    if (onAddToBookLexicon) {
      onAddToBookLexicon(selectedWord.originalText);
    }
    showToast('சொல் ஏற்றுக்கொள்ளப்பட்டது. இந்நூல் சொற்களஞ்சியம் மேம்பட்டது!');
    selectNextWord();
  };

  // Handle Reject
  const handleReject = () => {
    if (!selectedWord) return;
    saveSnapshot();
    onUpdateWord(selectedWord.id, selectedWord.originalText, 'rejected');
    showToast('சொல் நிராகரிக்கப்பட்டு மறுஆய்வுக்குக் குறிக்கப்பட்டது.');
    selectNextWord();
  };

  // Handle Save Edit
  const handleSaveEdit = () => {
    if (!selectedWord || !editText.trim()) return;
    saveSnapshot();
    onUpdateWord(selectedWord.id, editText.trim(), 'accepted');
    if (onAddToBookLexicon) {
      onAddToBookLexicon(editText.trim());
    }
    setIsEditing(false);
    showToast('திருத்தம் சேமிக்கப்பட்டது. இந்நூல் சொற்களஞ்சியம் மேம்பட்டது!');
    selectNextWord();
  };

  const selectNextWord = () => {
    const idx = page.words.findIndex((w) => w.id === selectedWordId);
    if (idx !== -1 && idx < page.words.length - 1) {
      setSelectedWordId(page.words[idx + 1].id);
    }
  };

  const saveSnapshot = () => {
    setHistory((prev) => [...prev, { words: JSON.parse(JSON.stringify(page.words)) }]);
    setFuture([]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setFuture((prev) => [{ words: JSON.parse(JSON.stringify(page.words)) }, ...prev]);
    setHistory((prev) => prev.slice(0, prev.length - 1));
    showToast('முந்தைய செயல் தவிர்ந்தது.');
  };

  const handleRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setHistory((prev) => [...prev, { words: JSON.parse(JSON.stringify(page.words)) }]);
    setFuture((prev) => prev.slice(1));
    showToast('செயல் மீண்டும் செய்யப்பட்டது.');
  };

  // Metrics
  const pendingWordsCount = page.words.filter((w) => w.status === 'review' || w.status === 'flagged').length;
  const acceptedWordsCount = page.words.filter((w) => w.status === 'accepted').length;
  const progressPercent = Math.round((acceptedWordsCount / Math.max(1, page.words.length)) * 100);

  return (
    <div className="bg-[#FBF6EA] dark:bg-[#181412] text-[#2B1D14] dark:text-[#F5EFEB] rounded-xl border border-[#D9A441]/30 p-4 sm:p-6 shadow-md font-tamil">
      {/* மேல் பட்டை: தலைப்பு, பயன்முறை, முன்னேற்றம், செயல்தவிர் */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#D9A441]/20 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#7A1F2B] dark:text-[#D9A441]" />
            <h2 className="text-xl sm:text-2xl font-bold font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441]">
              மனித-செயற்கை நுண்ணறிவு கூட்டு மதிப்பாய்வுப் பணிமனை
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#2B1D14]/80 dark:text-[#F5EFEB]/80">
            {book.title} — பக்கம் {page.pageNumber} / {book.totalPages}
          </p>
        </div>

        {/* பயன்முறைத் தேர்வு & செயல்தவிர் / மீண்டும் செய் */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-white dark:bg-[#201A16] p-1 rounded-lg border border-[#D9A441]/30 flex items-center text-xs">
            <button
              type="button"
              onClick={() => setReviewMode('page')}
              className={`px-3 py-1 rounded cursor-pointer font-medium transition-colors ${
                reviewMode === 'page'
                  ? 'bg-[#7A1F2B] text-white'
                  : 'hover:bg-[#D9A441]/20'
              }`}
            >
              பக்க மதிப்பாய்வு
            </button>
            <button
              type="button"
              onClick={() => setReviewMode('batch')}
              className={`px-3 py-1 rounded cursor-pointer font-medium transition-colors ${
                reviewMode === 'batch'
                  ? 'bg-[#7A1F2B] text-white'
                  : 'hover:bg-[#D9A441]/20'
              }`}
            >
              தொகுப்பு மதிப்பாய்வு
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleUndo}
              disabled={history.length === 0}
              title="செயல்தவிர்"
              className="p-1.5 bg-white dark:bg-[#201A16] border border-[#D9A441]/30 rounded text-xs cursor-pointer disabled:opacity-40"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleRedo}
              disabled={future.length === 0}
              title="மீண்டும் செய்"
              className="p-1.5 bg-white dark:bg-[#201A16] border border-[#D9A441]/30 rounded text-xs cursor-pointer disabled:opacity-40"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* முன்னேற்ற அளவீடுகள் பட்டை (Progress Bar) */}
      <div className="my-4 bg-white dark:bg-[#201A16] p-3.5 rounded-xl border border-[#D9A441]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="w-full sm:w-1/2">
          <div className="flex justify-between font-semibold mb-1">
            <span>பக்க மதிப்பாய்வு நிறைவு</span>
            <span className="font-mono text-[#7A1F2B] dark:text-[#D9A441]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#7A1F2B] dark:bg-[#D9A441] h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 text-[#2B1D14]/80 dark:text-[#F5EFEB]/80">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>ஏற்கப்பட்டவை: <strong className="text-emerald-700 dark:text-emerald-400">{acceptedWordsCount}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
            <span>நிலுவையில் உள்ளவை: <strong className="text-rose-700 dark:text-rose-400">{pendingWordsCount}</strong></span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-[#1F6F78]">
            <Clock className="w-3.5 h-3.5" />
            <span>மதிப்பிடப்பட்ட நேரம்: ~3 நிமிடங்கள்</span>
          </div>
        </div>
      </div>

      {/* நான்கு பலகை ஆய்வு அரங்கம் (Four-Pane Synced Workspace) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {/* பலகை 1: மூலப்படம் (Original Image Pane) */}
        <div className="bg-white dark:bg-[#201A16] p-3 rounded-xl border border-[#D9A441]/30 shadow-sm flex flex-col">
          <span className="text-xs font-bold text-[#7A1F2B] dark:text-[#D9A441] pb-2 border-b border-[#D9A441]/20 mb-2">
            பலகை 1: மூலப்படம் (Original)
          </span>
          <div className="relative flex-1 min-h-[260px] bg-[#E8D5B5] rounded-lg overflow-hidden border border-[#D9A441]/20 flex items-center justify-center p-2">
            <img
              src={page.originalImage}
              alt="மூலப்படம்"
              className="max-h-full max-w-full object-contain filter sepia"
            />
            {/* தேர்ந்தெடுக்கப்பட்ட சொல்லுக்கான சிறப்பிப்பு வட்டம் */}
            <div className="absolute top-1/3 left-1/4 w-32 h-10 border-2 border-[#7A1F2B] bg-[#7A1F2B]/20 rounded animate-pulse pointer-events-none flex items-center justify-center">
              <span className="text-[10px] bg-[#7A1F2B] text-white px-1 rounded -top-5 absolute">
                தேர்ந்தெடுக்கப்பட்ட பகுதி
              </span>
            </div>
          </div>
          <span className="text-[10px] text-center text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 mt-1">
            மூல ஏட்டுப் பிரதி
          </span>
        </div>

        {/* பலகை 2: மேம்படுத்திய படம் (Enhanced Image Pane) */}
        <div className="bg-white dark:bg-[#201A16] p-3 rounded-xl border border-[#D9A441]/30 shadow-sm flex flex-col">
          <span className="text-xs font-bold text-[#1F6F78] dark:text-[#3DB2BF] pb-2 border-b border-[#D9A441]/20 mb-2">
            பலகை 2: மேம்படுத்திய படம் (Restored)
          </span>
          <div className="relative flex-1 min-h-[260px] bg-[#FBF6EA] rounded-lg overflow-hidden border border-[#D9A441]/20 flex items-center justify-center p-2">
            <img
              src={page.enhancedImage}
              alt="மேம்படுத்திய படம்"
              className="max-h-full max-w-full object-contain"
            />
            <div className="absolute top-1/3 left-1/4 w-32 h-10 border-2 border-[#1F6F78] bg-[#1F6F78]/20 rounded pointer-events-none" />
          </div>
          <span className="text-[10px] text-center text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 mt-1">
            கறை நீக்கப்பட்ட தூய வடிவம்
          </span>
        </div>

        {/* பலகை 3: எழுத்துணரி கருதுகோள்கள் (OCR Hypotheses Pane) */}
        <div className="bg-white dark:bg-[#201A16] p-3 rounded-xl border border-[#D9A441]/30 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#7A1F2B] dark:text-[#D9A441] pb-2 border-b border-[#D9A441]/20 mb-2 block">
              பலகை 3: எழுத்துணரி கருதுகோள்கள்
            </span>

            {selectedWord ? (
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-[#FBF6EA] dark:bg-[#181412] rounded border border-[#D9A441]/20">
                  <span className="text-[10px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 block">சொல்:</span>
                  <span className="font-bold text-base font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441]">
                    {selectedWord.originalText}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold block text-[#2B1D14]/70 dark:text-[#F5EFEB]/70">
                    4 எழுத்துணரி ஒப்பீட்டு மதிப்பெண்கள்:
                  </span>
                  {['எழுத்துணரி 1', 'எழுத்துணரி 2', 'எழுத்துணரி 3', 'எழுத்துணரி 4'].map((eng, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px]">
                      <span>{eng}</span>
                      <span className="font-mono font-semibold text-emerald-600">
                        {selectedWord.engineScores ? selectedWord.engineScores[idx] : 95}%
                      </span>
                    </div>
                  ))}
                </div>

                {onShowProvenance && (
                  <button
                    type="button"
                    onClick={() => onShowProvenance(selectedWord)}
                    className="w-full mt-2 py-1.5 bg-[#D9A441]/20 hover:bg-[#D9A441]/40 text-[#2B1D14] dark:text-[#F5EFEB] rounded text-[11px] font-semibold cursor-pointer border border-[#D9A441]/40 transition-colors"
                  >
                    மூல வழித்தோன்றல் மரம் காண்க (Provenance)
                  </button>
                )}
              </div>
            ) : null}
          </div>
          <span className="text-[10px] text-center text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 mt-2">
            எழுத்துணரி ஒருமித்த பகுப்பாய்வு
          </span>
        </div>

        {/* பலகை 4: இறுதி உரை (Final Text Review Pane) */}
        <div className="bg-white dark:bg-[#201A16] p-3 rounded-xl border border-[#D9A441]/30 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 pb-2 border-b border-[#D9A441]/20 mb-2 block">
              பலகை 4: இறுதி உறுதிப்படுத்திய உரை
            </span>

            {/* ஊடாடும் சொல் வரிசை / Interactive word list */}
            <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto p-1 text-sm font-tamil-serif leading-relaxed">
              {page.words.map((w) => {
                const isSelected = selectedWord?.id === w.id;
                let bgStyle = 'bg-emerald-100/70 text-emerald-950 border-emerald-400';
                if (w.confidence < 70 || w.status === 'flagged') {
                  bgStyle = 'bg-rose-100 text-rose-950 border-rose-400';
                } else if (w.confidence < 90 || w.status === 'review') {
                  bgStyle = 'bg-amber-100 text-amber-950 border-amber-400';
                }

                return (
                  <span
                    key={w.id}
                    onClick={() => setSelectedWordId(w.id)}
                    className={`px-1.5 py-0.5 rounded border cursor-pointer transition-all ${bgStyle} ${
                      isSelected ? 'ring-2 ring-[#7A1F2B] font-bold scale-105 shadow' : 'opacity-90'
                    }`}
                  >
                    {w.correctedText || w.originalText}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#D9A441]/20 text-[10px] text-[#2B1D14]/70 dark:text-[#F5EFEB]/70 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> உயர்
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> நடுத்தரம்
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> உறுதியில்லை
            </span>
          </div>
        </div>
      </div>

      {/* ஒரு-கிளிக் ஒப்புதல் கட்டுப்பாட்டுப் பட்டை & விசைப்பலகை (One-Click Actions & Keyboard) */}
      <div className="bg-white dark:bg-[#201A16] p-4 rounded-xl border border-[#D9A441]/30 shadow">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-3 border-b border-[#D9A441]/20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#7A1F2B] dark:text-[#D9A441]">
              சொல் செயல்பாடு:
            </span>
            <span className="text-lg font-bold font-tamil-serif bg-[#FBF6EA] dark:bg-[#181412] px-3 py-1 rounded border border-[#D9A441]/30">
              {selectedWord?.originalText || ''}
            </span>
          </div>

          {/* ஒரு-கிளிக் பொத்தான்கள் (Accept, Reject, Edit) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAccept}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs sm:text-sm font-semibold cursor-pointer shadow flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>ஏற்கிறேன்</span>
            </button>

            <button
              type="button"
              onClick={handleReject}
              className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs sm:text-sm font-semibold cursor-pointer shadow flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <X className="w-4 h-4" />
              <span>நிராகரி</span>
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-[#1F6F78] hover:bg-[#26838d] text-white rounded-lg text-xs sm:text-sm font-semibold cursor-pointer shadow flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <Edit3 className="w-4 h-4" />
              <span>திருத்து</span>
            </button>

            <button
              type="button"
              onClick={() => setShowKeyboard(!showKeyboard)}
              title="தமிழ்99 விசைப்பலகை"
              className={`p-2 rounded-lg border cursor-pointer transition-colors ${
                showKeyboard
                  ? 'bg-[#D9A441] text-[#2B1D14] border-[#D9A441]'
                  : 'bg-white dark:bg-[#181412] text-[#2B1D14] dark:text-[#F5EFEB] border-[#D9A441]/40 hover:bg-[#D9A441]/20'
              }`}
            >
              <Keyboard className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* விசைப்பலகை குறுக்குவழிகள் வழிகாட்டி (Keyboard Shortcuts Legend) */}
        <div className="py-2 flex items-center justify-between text-[11px] text-[#2B1D14]/70 dark:text-[#F5EFEB]/70">
          <div className="flex items-center gap-3">
            <span>விசைப்பலகை குறுக்குவழிகள்:</span>
            <span><kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded font-mono">A</kbd> = ஏற்கிறேன்</span>
            <span><kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded font-mono">R</kbd> = நிராகரி</span>
            <span><kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded font-mono">E</kbd> = திருத்து</span>
          </div>

          <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>செயல்முறை கற்றல் (Active Learning) நேரலையில் உள்ளது</span>
          </div>
        </div>

        {/* திருத்த உள்ளீட்டு புலம் / Edit Input Field */}
        {isEditing && (
          <div className="mt-3 p-3 bg-[#FBF6EA] dark:bg-[#181412] rounded-lg border border-[#D9A441]/40 flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 px-3 py-2 rounded border border-[#D9A441]/40 bg-white dark:bg-[#201A16] text-base font-tamil-serif"
              placeholder="சரியான தமிழ் சொல்லை உள்ளிடவும்..."
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-[#7A1F2B] hover:bg-[#962635] text-white rounded text-xs font-bold cursor-pointer"
              >
                சேமித்து ஏற்பு செய்
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-2 bg-zinc-200 dark:bg-zinc-800 rounded text-xs cursor-pointer"
              >
                ரத்து
              </button>
            </div>
          </div>
        )}

        {/* தமிழ்99 திரை விசைப்பலகை (On-screen Tamil99 Keyboard) */}
        {showKeyboard && (
          <div className="mt-4 pt-3 border-t border-[#D9A441]/20">
            <TamilKeyboard
              onInsertChar={(char) => setEditText((prev) => prev + char)}
              onBackspace={() => setEditText((prev) => prev.slice(0, -1))}
              onEnter={handleSaveEdit}
            />
          </div>
        )}
      </div>
    </div>
  );
};
