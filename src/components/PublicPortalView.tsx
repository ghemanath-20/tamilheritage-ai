/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Book, PublicSuggestion, HistoricalPlace } from '../types';
import { TamilNaduMap } from './TamilNaduMap';
import { Search, Upload, Camera, BookOpen, Download, Send, CheckCircle2, FileText, Sparkles } from 'lucide-react';

interface PublicPortalViewProps {
  books: Book[];
  onStartUpload: () => void;
  onOpenLiveCamera: () => void;
  onSubmitSuggestion: (suggestion: any) => void;
  onSelectPlaceForManuscript: (place: HistoricalPlace) => void;
  showToast: (msg: string) => void;
}

export const PublicPortalView: React.FC<PublicPortalViewProps> = ({
  books,
  onStartUpload,
  onOpenLiveCamera,
  onSubmitSuggestion,
  onSelectPlaceForManuscript,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<'search' | 'map' | 'suggest' | 'files'>('search');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBook, setSelectedBook] = useState<Book>(books[0]);

  // Suggestion form state
  const [suggestWord, setSuggestWord] = useState<string>('பகவன்');
  const [correctionWord, setCorrectionWord] = useState<string>('பகவான்');
  const [reason, setReason] = useState<string>('பழைய உரையின்படி நெடில் வடிவ ஒற்றுமை தேவைப்படுகிறது.');

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSuggestion({
      bookId: selectedBook.id,
      pageId: 'பக்கம்-1',
      wordId: 'சொல்-1',
      originalWord: suggestWord,
      suggestedWord: correctionWord,
      reason,
      submittedBy: 'அன்பரசு (பொது பயனர்)',
    });
    showToast('உங்கள் திருத்தப் பரிந்துரை சமர்ப்பிக்கப்பட்டது! அதிகாரிகளின் ஒப்புதலுக்குப் பின் சேர்க்கப்படும்.');
    setReason('');
  };

  const filteredBooks = books.filter(
    (b) =>
      b.title.includes(searchQuery) ||
      b.author.includes(searchQuery) ||
      b.location.includes(searchQuery)
  );

  return (
    <div className="space-y-6 font-tamil">
      {/* பொது மக்கள் நல்வரவு பதாகை / Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-[#1F6F78]/15 via-[#D9A441]/10 to-[#7A1F2B]/10 p-6 rounded-2xl border border-[#D9A441]/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs bg-[#1F6F78] text-white px-3 py-1 rounded-full font-bold">
            பொதுமக்கள் தளம்
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441] mt-2">
            பழந்தமிழ் நூல்கள் மற்றும் சுவடிகள் திறந்தவெளி ஆவண மையம்
          </h2>
          <p className="text-xs sm:text-sm text-[#2B1D14]/80 dark:text-[#F5EFEB]/80 mt-1 max-w-2xl leading-relaxed">
            நூற்றாண்டு பழைமையான தமிழ் நூல்களை வாசிக்கலாம், தேடலாம், உங்கள் இல்லத்தில் உள்ள பழைய ஏடுகளை நிழற்படக் கருவி வழியே பதிவேற்றி மீட்டெடுக்கலாம்.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={onOpenLiveCamera}
            className="w-full sm:w-auto px-5 py-3 bg-[#D9A441] hover:bg-[#e4b254] text-[#2B1D14] font-bold rounded-xl text-xs sm:text-sm shadow-md cursor-pointer flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <Camera className="w-4 h-4 text-[#7A1F2B]" />
            <span>நேரலை நிழற்படக் கருவி</span>
          </button>

          <button
            type="button"
            onClick={onStartUpload}
            className="w-full sm:w-auto px-5 py-3 bg-[#7A1F2B] hover:bg-[#962635] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md cursor-pointer flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <Upload className="w-4 h-4 text-[#D9A441]" />
            <span>சுவடிப் படம் பதிவேற்று</span>
          </button>
        </div>
      </div>

      {/* தாவல்கள் / Navigation Tabs for Public Portal */}
      <div className="flex items-center gap-2 border-b border-[#D9A441]/30 pb-2 text-xs font-bold overflow-x-auto">
        {[
          { id: 'search', label: 'நூல்கள் தேடல் & வாசிப்பு', icon: Search },
          { id: 'map', label: 'தமிழ்நாட்டு வரலாற்று வரைபடம்', icon: BookOpen },
          { id: 'suggest', label: 'திருத்தப் பரிந்துரை செய்க', icon: Send },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                active
                  ? 'bg-[#1F6F78] text-white shadow'
                  : 'text-[#2B1D14]/70 dark:text-[#F5EFEB]/70 hover:bg-[#D9A441]/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* தாவல் 1: நூல்கள் தேடல் & வாசிப்பு */}
      {activeTab === 'search' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#2B1D14]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="நூல் பெயர், ஆசிரியர் அல்லது ஊர் பெயர் உள்ளிட்டுத் தேடவும்..."
              className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-[#201A16] border border-[#D9A441]/40 rounded-xl text-xs sm:text-sm shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-[#FBF6EA] dark:bg-[#181412] p-4 rounded-xl border border-[#D9A441]/30 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="h-32 rounded-lg overflow-hidden mb-3 bg-[#E5D2B3] flex items-center justify-center border border-[#D9A441]/20">
                    <img
                      src={book.pages[0]?.enhancedImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-base font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441] mb-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-[#2B1D14]/70 dark:text-[#F5EFEB]/70 mb-2">
                    {book.author} ({book.year})
                  </p>
                  <p className="text-[11px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60">
                    காப்பகம்: {book.location}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D9A441]/20 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                    மீட்கப்பட்ட பக்கங்கள்: {book.completedPages}/{book.totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedBook(book);
                      showToast(`${book.title} திறக்கப்பட்டது!`);
                    }}
                    className="px-3 py-1 bg-[#1F6F78] hover:bg-[#278691] text-white rounded text-xs font-semibold cursor-pointer"
                  >
                    படிக்க
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* தாவல் 2: தமிழ்நாடு வரலாற்று வரைபடம் */}
      {activeTab === 'map' && (
        <TamilNaduMap onSelectPlaceForManuscript={onSelectPlaceForManuscript} />
      )}

      {/* தாவல் 3: பொதுமக்கள் திருத்தப் பரிந்துரை செய்க */}
      {activeTab === 'suggest' && (
        <div className="bg-[#FBF6EA] dark:bg-[#181412] p-6 rounded-xl border border-[#D9A441]/30 max-w-xl mx-auto shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Send className="w-5 h-5 text-[#1F6F78]" />
            <h3 className="text-lg font-bold font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441]">
              பொதுமக்கள் திருத்தப் பரிந்துரைப் படிவம்
            </h3>
          </div>
          <p className="text-xs text-[#2B1D14]/80 dark:text-[#F5EFEB]/80 mb-4 leading-relaxed">
            நீங்கள் கண்டறிந்த திருத்தங்களை இங்கே பதிவு செய்யலாம். முதன்மை மேற்பார்வையாளர் மற்றும் நூலகர் குழு அதனைச் சரிபார்த்து ஏற்றுக்கொள்வர்.
          </p>

          <form onSubmit={handleSuggestionSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold mb-1">நூல் தேர்வு:</label>
              <select
                value={selectedBook.id}
                onChange={(e) => {
                  const b = books.find((x) => x.id === e.target.value);
                  if (b) setSelectedBook(b);
                }}
                className="w-full px-3 py-2 bg-white dark:bg-[#201A16] border border-[#D9A441]/40 rounded-lg text-xs"
              >
                {books.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">தற்போதுள்ள சொல்:</label>
                <input
                  type="text"
                  value={suggestWord}
                  onChange={(e) => setSuggestWord(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-[#201A16] border border-[#D9A441]/40 rounded-lg text-xs font-tamil-serif"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">உங்கள் பரிந்துரை சொல்:</label>
                <input
                  type="text"
                  value={correctionWord}
                  onChange={(e) => setCorrectionWord(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-[#201A16] border border-[#D9A441]/40 rounded-lg text-xs font-tamil-serif"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">பரிந்துரைக்கான மொழியியல் காரணம் / ஆதாரம்:</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="எ.கா. இந்நூலின் 1887 பதிப்பு பக்கக் குறிப்பின்படி..."
                className="w-full px-3 py-2 bg-white dark:bg-[#201A16] border border-[#D9A441]/40 rounded-lg text-xs"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#1F6F78] hover:bg-[#258590] text-white rounded-lg font-bold text-xs sm:text-sm cursor-pointer shadow flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>பரிந்துரையை அதிகாரிகளுக்கு அனுப்புக</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
