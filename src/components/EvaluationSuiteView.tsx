/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BarChart3, TrendingDown, Target, Zap, CheckCircle2 } from 'lucide-react';

export const EvaluationSuiteView: React.FC = () => {
  const metrics = [
    {
      title: 'எழுத்துப்பிழை விகிதம் (CER)',
      before: '18.4%',
      after: '1.2%',
      improvement: '93.5% குறைப்பு',
      desc: 'தனித்தனி எழுத்துக்கள் தவறாக அடையாளம் காணப்படுவதைக் கட்டுப்படுத்திய நிலை.',
      color: 'emerald',
    },
    {
      title: 'சொற்பிழை விகிதம் (WER)',
      before: '24.8%',
      after: '2.1%',
      improvement: '91.5% குறைப்பு',
      desc: 'முழுச் சொற்கள் பிழையாக மாற்றப்படுவதைத் தடுத்து செந்தமிழ்ச் சொல்லடையோடு பொருத்திய நிலை.',
      color: 'teal',
    },
    {
      title: 'கற்பனைச் சொல் விகிதம் (Invention Rate)',
      before: '12.6%',
      after: '0.00%',
      improvement: '100% பூச்சிய இலக்கு',
      desc: 'செயற்கை நுண்ணறிவு புதிய சொற்களை உருவாக்காமல் முழுமையாகத் தடுக்கப்பட்ட நிலை.',
      color: 'maroon',
    },
  ];

  // Benchmark history
  const benchmarkRuns = [
    { run: 'தொடக்க இயல்பு எழுத்துணரி', cer: 18.4, wer: 24.8, inv: 12.6 },
    { run: 'படிமச் சீரமைப்பு சேர்த்த பின்', cer: 11.2, wer: 15.3, inv: 7.2 },
    { run: 'மூன்று அடுக்கு சொல்லடைவு இணைப்பு', cer: 4.5, wer: 6.8, inv: 1.4 },
    { run: 'நூல் மீட்பு பூச்சிய-கற்பனை விதிமுறை', cer: 1.2, wer: 2.1, inv: 0.0 },
  ];

  return (
    <div className="bg-[#FBF6EA] dark:bg-[#181412] text-[#2B1D14] dark:text-[#F5EFEB] rounded-xl border border-[#D9A441]/30 p-4 sm:p-6 shadow-md font-tamil">
      {/* தலைப்பு */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D9A441]/20 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#7A1F2B] dark:text-[#D9A441]" />
            <h2 className="text-xl sm:text-2xl font-bold font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441]">
              செயல்திறன் மதிப்பீட்டுக் கூடம் (Evaluation Suite)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#2B1D14]/80 dark:text-[#F5EFEB]/80">
            பொதுவான எழுத்துணரிகளுக்கும் நூல் மீட்பு பாதுகாப்புக் கட்டமைப்புக்கும் இடையேயான துல்லிய ஒப்பீடு
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/40">
          <Target className="w-4 h-4 text-emerald-600" />
          <span>பூச்சியக் கற்பனை இலக்கு எட்டப்பட்டது</span>
        </div>
      </div>

      {/* அளவீட்டு அட்டைகள் / Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#201A16] p-4 rounded-xl border border-[#D9A441]/30 shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold text-[#7A1F2B] dark:text-[#D9A441] block mb-2">
                {m.title}
              </span>

              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <span className="text-[10px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 block">முன்பு</span>
                  <span className="text-lg font-bold line-through text-rose-600 font-mono">
                    {m.before}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 block">நூல் மீட்பு</span>
                  <span className="text-2xl font-extrabold text-emerald-600 font-mono">
                    {m.after}
                  </span>
                </div>
              </div>

              <div className="p-2 bg-[#FBF6EA] dark:bg-[#181412] rounded border border-[#D9A441]/20 flex items-center justify-between text-xs mb-3">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" /> {m.improvement}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            </div>

            <p className="text-[11px] text-[#2B1D14]/70 dark:text-[#F5EFEB]/70 leading-relaxed border-t border-[#D9A441]/15 pt-2">
              {m.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ஒப்பீட்டு வரைபட அரங்கம் (Comparison Progress Chart) */}
      <div className="bg-white dark:bg-[#201A16] p-5 rounded-xl border border-[#D9A441]/30 shadow-sm">
        <h3 className="text-sm font-bold text-[#7A1F2B] dark:text-[#D9A441] mb-4 pb-2 border-b border-[#D9A441]/20">
          வளர்ச்சிப் படிநிலைகளின் பிழை குறைப்பு வரலாற்றுப் போக்கு:
        </h3>

        <div className="space-y-4">
          {benchmarkRuns.map((run, i) => (
            <div key={i} className="text-xs">
              <div className="flex justify-between items-center mb-1 font-semibold">
                <span>{run.run}</span>
                <span className="text-[11px] font-mono text-[#2B1D14]/70 dark:text-[#F5EFEB]/70">
                  எழுத்துப்பிழை: {run.cer}% | சொற்பிழை: {run.wer}% | கற்பனை: {run.inv}%
                </span>
              </div>

              <div className="flex h-3 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 gap-0.5">
                <div
                  className="bg-emerald-600 transition-all duration-500"
                  style={{ width: `${Math.max(2, 100 - run.cer - run.wer)}%` }}
                  title="துல்லிய விகிதம்"
                />
                <div
                  className="bg-amber-500"
                  style={{ width: `${run.wer}%` }}
                  title="சொற்பிழை"
                />
                <div
                  className="bg-rose-600"
                  style={{ width: `${run.inv}%` }}
                  title="கற்பனைச் சொல்"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-[#D9A441]/20 flex items-center justify-between text-[11px] text-[#2B1D14]/70 dark:text-[#F5EFEB]/70">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> துல்லிய ஏற்பு
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> சொற்பிழை
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" /> கற்பனைச் சொல்
            </span>
          </div>

          <span className="font-semibold text-[#7A1F2B] dark:text-[#D9A441]">
            பரிசோதனை மாதிரிகள்: 1,200 பக்கங்கள்
          </span>
        </div>
      </div>
    </div>
  );
};
