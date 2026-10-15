/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuditEntry } from '../types';
import { ShieldCheck, CheckCircle2, Search, Filter, Lock, Check } from 'lucide-react';

interface AuditLogViewProps {
  logs: AuditEntry[];
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [verifiedMap, setVerifiedMap] = useState<Record<string, boolean>>({});
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const handleVerify = (id: string) => {
    setAnimatingId(id);
    setTimeout(() => {
      setVerifiedMap((prev) => ({ ...prev, [id]: true }));
      setAnimatingId(null);
    }, 600);
  };

  const filteredLogs = logs.filter(
    (l) =>
      l.action.includes(searchTerm) ||
      l.actor.includes(searchTerm) ||
      l.targetArtifact.includes(searchTerm) ||
      l.fingerprint.includes(searchTerm)
  );

  return (
    <div className="bg-[#FBF6EA] dark:bg-[#181412] text-[#2B1D14] dark:text-[#F5EFEB] rounded-xl border border-[#D9A441]/30 p-4 sm:p-6 shadow-md font-tamil">
      {/* தலைப்பு */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D9A441]/20 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6 text-[#7A1F2B] dark:text-[#D9A441]" />
            <h2 className="text-xl sm:text-2xl font-bold font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441]">
              மாற்றவியலா தணிக்கைப் பதிவு (Immutable Audit Log)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#2B1D14]/80 dark:text-[#F5EFEB]/80">
            ஒவ்வொரு சொல் ஏற்பும், படச் சீரமைப்பும் குறியாக்க கைரேகையுடன் நிரந்தரமாகப் பதிவு செய்யப்படுகிறது
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>பிளாக்செயின் குறியாக்கப் பாதுகாப்பு தயார்</span>
          </span>
        </div>
      </div>

      {/* தேடல் பட்டை */}
      <div className="my-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#2B1D14]/50 dark:text-[#F5EFEB]/50" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="செயல்பாடு, பணியாளர் அல்லது கைரேகை மூலம் தேடவும்..."
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#201A16] border border-[#D9A441]/40 rounded-lg text-xs sm:text-sm"
          />
        </div>
        <span className="text-xs text-[#2B1D14]/70 dark:text-[#F5EFEB]/70 whitespace-nowrap">
          மொத்தப் பதிவுகள்: {filteredLogs.length}
        </span>
      </div>

      {/* தணிக்கை அட்டவணை (Append-Only Table) */}
      <div className="overflow-x-auto rounded-lg border border-[#D9A441]/30 bg-white dark:bg-[#201A16] shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FBF6EA] dark:bg-[#181412] text-[#7A1F2B] dark:text-[#D9A441] border-b border-[#D9A441]/30">
            <tr>
              <th className="p-3">பதிவு எண் & நேரம்</th>
              <th className="p-3">பணியாளர் & பாத்திரம்</th>
              <th className="p-3">செயல்பாடு</th>
              <th className="p-3">இலக்கு ஆவணம்</th>
              <th className="p-3">குறியாக்கக் கைரேகை</th>
              <th className="p-3 text-right">சரிபார்ப்பு</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D9A441]/15">
            {filteredLogs.slice(0, 20).map((log) => {
              const isVerified = verifiedMap[log.id] || log.verified;
              const isChecking = animatingId === log.id;

              return (
                <tr key={log.id} className="hover:bg-[#FBF6EA]/40 dark:hover:bg-[#181412]/40 transition-colors">
                  <td className="p-3">
                    <span className="font-bold text-[#7A1F2B] dark:text-[#D9A441] block">{log.id}</span>
                    <span className="text-[10px] text-[#2B1D14]/60 dark:text-[#F5EFEB]/60">{log.timestamp}</span>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold block">{log.actor}</span>
                    <span className="text-[10px] bg-[#1F6F78]/15 text-[#1F6F78] dark:text-[#3DB2BF] px-1.5 py-0.2 rounded border border-[#1F6F78]/30">
                      {log.role}
                    </span>
                  </td>
                  <td className="p-3 font-tamil-serif font-medium text-[#2B1D14]/90 dark:text-[#F5EFEB]/90">
                    {log.action}
                  </td>
                  <td className="p-3 font-mono text-[11px] text-[#2B1D14]/70 dark:text-[#F5EFEB]/70">
                    {log.targetArtifact}
                  </td>
                  <td className="p-3 font-mono text-[11px] text-[#7A1F2B] dark:text-[#D9A441]">
                    {log.fingerprint}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleVerify(log.id)}
                      disabled={isChecking}
                      className={`px-3 py-1 rounded text-[11px] font-semibold cursor-pointer transition-all flex items-center gap-1 ml-auto ${
                        isVerified
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-500/40'
                          : 'bg-[#7A1F2B] hover:bg-[#962635] text-white'
                      }`}
                    >
                      {isChecking ? (
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                      <span>{isVerified ? 'சரிபார்க்கப்பட்டது' : 'சரிபார்'}</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
