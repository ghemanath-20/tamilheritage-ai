/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Role, PortalType } from '../types';
import { Users, Shield, Smartphone, Mail, Lock, KeyRound, CheckCircle2, ArrowRight, X } from 'lucide-react';

interface LoginPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (portal: PortalType, role: Role, username: string) => void;
}

export const LoginPortalModal: React.FC<LoginPortalModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  const [activePortal, setActivePortal] = useState<PortalType>('public');

  // பொது மக்கள் உள்நுழைவு படிவ நிலை
  const [publicAuthMethod, setPublicAuthMethod] = useState<'otp' | 'password'>('otp');
  const [phoneNumber, setPhoneNumber] = useState<string>('9876543210');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('5432');
  const [publicEmail, setPublicEmail] = useState<string>('anbarasu@tamilmail.org');
  const [publicPassword, setPublicPassword] = useState<string>('••••••••');

  // அதிகாரிகள் உள்நுழைவு படிவ நிலை
  const [employeeId, setEmployeeId] = useState<string>('அதிகாரி-402');
  const [officialPassword, setOfficialPassword] = useState<string>('••••••••');
  const [mfaCode, setMfaCode] = useState<string>('829104');
  const [selectedRole, setSelectedRole] = useState<Role>('திருத்துநர்');

  // பொது மக்கள் உள்நுழைவு செயல்
  const handlePublicLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (publicAuthMethod === 'otp' && !otpSent) {
      setOtpSent(true);
      return;
    }
    onLoginSuccess('public', 'பொதுமக்கள்', 'அன்பரசு (பொது பயனர்)');
    onClose();
  };

  // அதிகாரிகள் உள்நுழைவு செயல்
  const handleOfficialLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const names: Record<Role, string> = {
      பொதுமக்கள்: 'பொது பயனர்',
      நூலகர்: 'கயல்விழி (நூலகர்)',
      திருத்துநர்: 'அமுதன் (திருத்துநர்)',
      'தலைமை மேற்பார்வையாளர்': 'இளங்கோவன் (தலைமை மேற்பார்வையாளர்)',
      நிர்வாகி: 'தமிழரசி (நிர்வாகி)',
    };
    onLoginSuccess('official', selectedRole, names[selectedRole]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 font-tamil select-none">
      <div className="bg-[#FBF6EA] dark:bg-[#181412] text-[#2B1D14] dark:text-[#F5EFEB] rounded-2xl border-2 border-[#D9A441]/40 shadow-2xl max-w-xl w-full p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* நுழைவு வாயில் தெரிவுப் பலகை (Two Clearly Separated Entrances) */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441] mb-1">
            நூல் மீட்பு நுழைவு வாயில்
          </h2>
          <p className="text-xs text-[#2B1D14]/70 dark:text-[#F5EFEB]/70">
            உங்கள் பாத்திரத்திற்குரிய நுழைவு வாயிலைத் தேர்வு செய்து உள்நுழையவும்
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              type="button"
              onClick={() => setActivePortal('public')}
              className={`p-3 rounded-xl border-2 font-bold text-xs sm:text-sm cursor-pointer transition-all flex flex-col items-center gap-1.5 ${
                activePortal === 'public'
                  ? 'border-[#1F6F78] bg-[#1F6F78]/15 text-[#1F6F78] dark:text-[#3DB2BF] shadow-md'
                  : 'border-[#D9A441]/30 hover:bg-[#D9A441]/10 text-[#2B1D14]/70 dark:text-[#F5EFEB]/70'
              }`}
            >
              <Users className="w-5 h-5 text-[#1F6F78]" />
              <span>பொதுமக்கள் நுழைவு</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePortal('official')}
              className={`p-3 rounded-xl border-2 font-bold text-xs sm:text-sm cursor-pointer transition-all flex flex-col items-center gap-1.5 ${
                activePortal === 'official'
                  ? 'border-[#7A1F2B] bg-[#7A1F2B]/15 text-[#7A1F2B] dark:text-[#D9A441] shadow-md'
                  : 'border-[#D9A441]/30 hover:bg-[#D9A441]/10 text-[#2B1D14]/70 dark:text-[#F5EFEB]/70'
              }`}
            >
              <Shield className="w-5 h-5 text-[#7A1F2B]" />
              <span>அதிகாரிகள் நுழைவு</span>
            </button>
          </div>
        </div>

        {/* 1. பொதுமக்கள் நுழைவுப் படிவம் */}
        {activePortal === 'public' ? (
          <form onSubmit={handlePublicLogin} className="space-y-4">
            <div className="flex justify-center gap-4 text-xs pb-3 border-b border-[#D9A441]/20">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="publicAuth"
                  checked={publicAuthMethod === 'otp'}
                  onChange={() => setPublicAuthMethod('otp')}
                  className="accent-[#1F6F78]"
                />
                <span>கைபேசி எண் + ஒருமுறை கடவுச்சொல் (OTP)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="publicAuth"
                  checked={publicAuthMethod === 'password'}
                  onChange={() => setPublicAuthMethod('password')}
                  className="accent-[#1F6F78]"
                />
                <span>மின்னஞ்சல் + கடவுச்சொல்</span>
              </label>
            </div>

            {publicAuthMethod === 'otp' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">கைபேசி எண்</label>
                  <div className="relative">
                    <Smartphone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#2B1D14]/50" />
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#201A16] border border-[#D9A441]/40 rounded-lg text-xs"
                      placeholder="உங்கள் 10 இலக்க கைபேசி எண்"
                      required
                    />
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      ஒருமுறை கடவுச்சொல் (OTP - மாதிரி: 5432)
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#2B1D14]/50" />
                      <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#201A16] border border-[#D9A441]/40 rounded-lg text-xs font-mono"
                        placeholder="அனுப்பப்பட்ட 4 இலக்க குறியீடு"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">மின்னஞ்சல் முகவரி</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#2B1D14]/50" />
                    <input
                      type="email"
                      value={publicEmail}
                      onChange={(e) => setPublicEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#201A16] border border-[#D9A441]/40 rounded-lg text-xs"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">கடவுச்சொல்</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#2B1D14]/50" />
                    <input
                      type="password"
                      value={publicPassword}
                      onChange={(e) => setPublicPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#201A16] border border-[#D9A441]/40 rounded-lg text-xs"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#1F6F78] hover:bg-[#268894] text-white rounded-lg text-xs sm:text-sm font-bold cursor-pointer shadow flex items-center justify-center gap-2 mt-4"
            >
              <span>{publicAuthMethod === 'otp' && !otpSent ? 'கடவுச்சொல் பெறுக' : 'உள்நுழை'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-[#2B1D14]/60 dark:text-[#F5EFEB]/60 mt-2">
              பொதுமக்கள் சுவடிகளைப் பதிவேற்றலாம், தேடலாம், திருத்தங்களைப் பரிந்துரைக்கலாம்.
            </p>
          </form>
        ) : (
          /* 2. அதிகாரிகள் நுழைவுப் படிவம் */
          <form onSubmit={handleOfficialLogin} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold mb-1">பணியாளர் அடையாள எண் (Employee ID)</label>
              <div className="relative">
                <Shield className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A1F2B]" />
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#201A16] border border-[#D9A441]/40 rounded-lg text-xs font-mono"
                  placeholder="அதிகாரி-XXXX"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">கடவுச்சொல்</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A1F2B]" />
                <input
                  type="password"
                  value={officialPassword}
                  onChange={(e) => setOfficialPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#201A16] border border-[#D9A441]/40 rounded-lg text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">
                இரண்டாம் நிலை பாதுகாப்புச் சரிபார்ப்புக் குறியீடு (MFA Token)
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A1F2B]" />
                <input
                  type="text"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#201A16] border border-[#D9A441]/40 rounded-lg text-xs font-mono"
                  placeholder="6 இலக்க பாதுகாப்பு குறியீடு"
                  required
                />
              </div>
            </div>

            {/* அதிகாரி பாத்திரத் தேர்வு (Role-based access selection for testing) */}
            <div>
              <label className="block text-xs font-semibold mb-1.5">அதிகார வரம்பு / பாத்திரம் (Role):</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['திருத்துநர்', 'நூலகர்', 'தலைமை மேற்பார்வையாளர்', 'நிர்வாகி'] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`p-2 rounded border text-left cursor-pointer transition-colors ${
                      selectedRole === r
                        ? 'border-[#7A1F2B] bg-[#7A1F2B]/15 text-[#7A1F2B] dark:text-[#D9A441] font-bold'
                        : 'border-[#D9A441]/30 hover:bg-[#D9A441]/10'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#7A1F2B] hover:bg-[#962635] text-white rounded-lg text-xs sm:text-sm font-bold cursor-pointer shadow flex items-center justify-center gap-2 mt-4"
            >
              <span>அதிகாரப் பூர்வமாக உள்நுழை</span>
              <CheckCircle2 className="w-4 h-4 text-[#D9A441]" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
