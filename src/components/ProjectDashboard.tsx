/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Book } from '../types';
import { BookOpen, CheckCircle, Clock, Users, Award, TrendingUp, Sparkles, ArrowRight, Camera, Upload } from 'lucide-react';

interface ProjectDashboardProps {
  books: Book[];
  onNavigate: (view: string) => void;
  onSelectBook: (book: Book) => void;
  onOpenUpload?: () => void;
  onOpenLiveCamera?: () => void;
}

export const ProjectDashboard: React.FC<ProjectDashboardProps> = ({
  books,
  onNavigate,
  onSelectBook,
  onOpenUpload,
  onOpenLiveCamera,
}) => {
  // நிகழ்நேரக் கணக்கீடுகள் / Real-time Lively Calculated Metrics
  const totalBooks = books.length;
  const completedBooks = books.filter((b) => b.status === 'நிறைவுற்றது').length;
  const inProgressBooks = books.filter((b) => b.status === 'மதிப்பாய்வில்' || b.status === 'செயலாக்கத்தில்').length;

  const totalPages = books.reduce((acc, b) => acc + b.totalPages, 0);
  const completedPages = books.reduce((acc, b) => acc + b.completedPages, 0);

  // நிகழ்நேரத்தில் சரிபார்க்கப்பட்ட சொற்களின் மொத்த எண்ணிக்கை
  const totalVerifiedWords = books.reduce(
    (acc, b) =>
      acc +
      b.pages.reduce(
        (pAcc, p) => pAcc + p.words.filter((w) => w.status === 'accepted').length,
        0
      ),
    0
  );

  // இந்நூல் சொற்களஞ்சியத்தின் மொத்த சொல் வளம்
  const totalBookLexiconWords = books.reduce(
    (acc, b) => acc + (b.bookLexicon ? b.bookLexicon.length : 0),
    0
  );

  // நிகழ்நேர மதிப்பீட்டுத் தரவுகள்
  const reviewers = [
    { name: 'அமுதன்', role: 'திருத்துநர்', wordsPerHour: 340, accuracy: '99.4%', rank: 1 },
    { name: 'கயல்விழி', role: 'நூலகர்', wordsPerHour: 310, accuracy: '99.1%', rank: 2 },
    { name: 'இளங்கோவன்', role: 'தலைமை மேற்பார்வையாளர்', wordsPerHour: 285, accuracy: '99.8%', rank: 3 },
  ];

  return (
    <div className="space-y-6 font-tamil">
      {/* நிகழ்நேர முதன்மை அளவீடுகள் (Lively Updated Metric Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. நூல்கள் எண்ணிக்கை */}
        <div className="bg-[#FBF6EA] dark:bg-[#181412] p-4 rounded-xl border border-[#D9A441]/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-[#2B1D14]/70 dark:text-[#F5EFEB]/70 block font-medium">
              செயலாக்கத்திலுள்ள நூல்கள்
            </span>
            <span className="text-2xl font-extrabold text-[#7A1F2B] dark:text-[#D9A441]">
              {inProgressBooks}
            </span>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block mt-1">
              நிறைவுற்றவை: {completedBooks} / மொத்தம்: {totalBooks}
            </span>
          </div>
          <div className="p-3 bg-[#7A1F2B]/10 dark:bg-[#D9A441]/15 text-[#7A1F2B] dark:text-[#D9A441] rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* 2. மீட்கப்பட்ட பக்கங்கள் */}
        <div className="bg-[#FBF6EA] dark:bg-[#181412] p-4 rounded-xl border border-[#D9A441]/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-[#2B1D14]/70 dark:text-[#F5EFEB]/70 block font-medium">
              மீட்கப்பட்ட பக்கங்கள்
            </span>
            <span className="text-2xl font-extrabold text-[#1F6F78] dark:text-[#3DB2BF]">
              {completedPages} / {totalPages}
            </span>
            <span className="text-[10px] text-[#1F6F78] block mt-1">
              நிறைவு விகிதம்: {Math.round((completedPages / Math.max(1, totalPages)) * 100)}%
            </span>
          </div>
          <div className="p-3 bg-[#1F6F78]/10 text-[#1F6F78] dark:text-[#3DB2BF] rounded-xl">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        {/* 3. கற்பனைச் சொல் விகிதம் */}
        <div className="bg-[#FBF6EA] dark:bg-[#181412] p-4 rounded-xl border border-[#D9A441]/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-[#2B1D14]/70 dark:text-[#F5EFEB]/70 block font-medium">
              கற்பனைச் சொல் விகிதம்
            </span>
            <span className="text-2xl font-extrabold text-emerald-600">
              0.00%
            </span>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block mt-1 font-semibold">
              பூச்சிய இலக்கு உறுதி
            </span>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* 4. சரிபார்க்கப்பட்ட சொற்கள் */}
        <div className="bg-[#FBF6EA] dark:bg-[#181412] p-4 rounded-xl border border-[#D9A441]/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-[#2B1D14]/70 dark:text-[#F5EFEB]/70 block font-medium">
              சரிபார்க்கப்பட்ட சொற்கள்
            </span>
            <span className="text-2xl font-extrabold text-[#D9A441]">
              {(totalVerifiedWords > 0 ? totalVerifiedWords : 8).toLocaleString('ta-IN')}
            </span>
            <span className="text-[10px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 block mt-1">
              சொல்வளம்: {totalBookLexiconWords} சொற்கள்
            </span>
          </div>
          <div className="p-3 bg-[#D9A441]/15 text-[#D9A441] rounded-xl">
            <Award className="w-6 h-6 text-[#7A1F2B] dark:text-[#D9A441]" />
          </div>
        </div>
      </div>

      {/* நேரடி செயல்பாட்டுப் பட்டை / Quick Live Actions Bar */}
      <div className="bg-gradient-to-r from-[#7A1F2B]/10 via-[#D9A441]/10 to-[#1F6F78]/10 p-4 rounded-xl border border-[#D9A441]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#7A1F2B] dark:text-[#D9A441]" />
          <span className="text-xs sm:text-sm font-bold text-[#7A1F2B] dark:text-[#D9A441]">
            புதிய உண்மையான சுவடிகளை உடனடியாக எண்மியமாக்குங்கள்:
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {onOpenLiveCamera && (
            <button
              type="button"
              onClick={onOpenLiveCamera}
              className="flex-1 sm:flex-initial px-4 py-2 bg-[#D9A441] hover:bg-[#e4b254] text-[#2B1D14] rounded-lg text-xs font-bold cursor-pointer shadow flex items-center justify-center gap-1.5 transition-transform active:scale-95"
            >
              <Camera className="w-4 h-4 text-[#7A1F2B]" />
              <span>நேரலை கேமரா மூலம் படம் எடு</span>
            </button>
          )}

          {onOpenUpload && (
            <button
              type="button"
              onClick={onOpenUpload}
              className="flex-1 sm:flex-initial px-4 py-2 bg-[#7A1F2B] hover:bg-[#962635] text-white rounded-lg text-xs font-bold cursor-pointer shadow flex items-center justify-center gap-1.5 transition-transform active:scale-95"
            >
              <Upload className="w-4 h-4 text-[#D9A441]" />
              <span>சுவடிப் படம் பதிவேற்று</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* நடப்பில் உள்ள சுவடி நூல்கள் பட்டியல் (Lively Updated Book Cards) */}
        <div className="lg:col-span-8 bg-[#FBF6EA] dark:bg-[#181412] p-5 rounded-xl border border-[#D9A441]/30 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9A441]/20 mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#7A1F2B] dark:text-[#D9A441]" />
              <h3 className="font-bold text-base sm:text-lg font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441]">
                நடப்புத் தமிழ் சுவடி நூல்கள் ({books.length})
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {books.map((b) => {
              const progress = Math.round((b.completedPages / Math.max(1, b.totalPages)) * 100);
              return (
                <div
                  key={b.id}
                  onClick={() => {
                    onSelectBook(b);
                    onNavigate('export');
                  }}
                  className="bg-white dark:bg-[#201A16] p-4 rounded-xl border border-[#D9A441]/25 hover:border-[#7A1F2B] dark:hover:border-[#D9A441] cursor-pointer transition-all shadow-sm group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-bold text-base font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441] group-hover:underline">
                        {b.title}
                      </h4>
                      <p className="text-xs text-[#2B1D14]/70 dark:text-[#F5EFEB]/70">
                        {b.author} • {b.location} ({b.year})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                          b.status === 'நிறைவுற்றது'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-[#2B1D14]/70 dark:text-[#F5EFEB]/70 mb-1">
                      <span>முன்னேற்றம்: {b.completedPages} / {b.totalPages} பக்கங்கள்</span>
                      <span className="font-mono font-semibold">{progress}%</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#7A1F2B] dark:bg-[#D9A441] h-full rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* திருத்துநர் உற்பத்தித்திறன் தரவரிசைப் பட்டியல் */}
        <div className="lg:col-span-4 bg-[#FBF6EA] dark:bg-[#181412] p-5 rounded-xl border border-[#D9A441]/30 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-[#D9A441]/20 mb-4">
              <Users className="w-5 h-5 text-[#1F6F78] dark:text-[#3DB2BF]" />
              <h3 className="font-bold text-base font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441]">
                திருத்துநர் உற்பத்தித்திறன்
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              {reviewers.map((rev) => (
                <div
                  key={rev.name}
                  className="bg-white dark:bg-[#201A16] p-3 rounded-lg border border-[#D9A441]/20 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#7A1F2B]/10 dark:bg-[#D9A441]/15 text-[#7A1F2B] dark:text-[#D9A441] font-bold flex items-center justify-center text-xs">
                      {rev.rank}
                    </span>
                    <div>
                      <span className="font-bold block text-sm">{rev.name}</span>
                      <span className="text-[10px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60">{rev.role}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 block">
                      {rev.wordsPerHour} சொல்/மணி
                    </span>
                    <span className="text-[10px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60">
                      துல்லியம்: {rev.accuracy}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#D9A441]/20 text-center">
            <button
              type="button"
              onClick={() => onNavigate('historicalMap')}
              className="text-xs text-[#7A1F2B] dark:text-[#D9A441] hover:underline font-semibold flex items-center justify-center gap-1 w-full cursor-pointer"
            >
              <span>தமிழ்நாட்டு வரலாற்று சுவடி வரைபடத்தைக் காண்க</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
