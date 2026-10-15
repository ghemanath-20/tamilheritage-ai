/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Book,
  ManuscriptPage,
  Role,
  PortalType,
  StrictnessLevel,
  AuditEntry,
  HistoricalPlace,
} from './types';
import { StorageService } from './services/storage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ProjectDashboard } from './components/ProjectDashboard';
import { TamilNaduMap } from './components/TamilNaduMap';
import { AuditLogView } from './components/AuditLogView';
import { ExportView } from './components/ExportView';
import { EvaluationSuiteView } from './components/EvaluationSuiteView';
import { PublicPortalView } from './components/PublicPortalView';
import { LiveCameraCapture } from './components/LiveCameraCapture';
import { UploadModal } from './components/UploadModal';
import { LoginPortalModal } from './components/LoginPortalModal';
import { OnboardingTour } from './components/OnboardingTour';
import { OcrService } from './services/ocrService';
import { CheckCircle2, Upload, Camera } from 'lucide-react';

export default function App() {
  // மாநில நிலைகள் / State management
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState<ManuscriptPage | null>(null);

  // பயனர் மற்றும் பாத்திர அமைப்புகள்
  const [currentPortal, setCurrentPortal] = useState<PortalType>('official');
  const [currentRole, setCurrentRole] = useState<Role>('திருத்துநர்');
  const [username, setUsername] = useState<string>('அமுதன் (திருத்துநர்)');

  // விருப்பத்தேர்வுகள்
  const [strictness, setStrictness] = useState<StrictnessLevel>('ultra');

  // தணிக்கைப் பதிவுகள்
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>([]);

  // பார்வை நிலை (Official Portal) - கோரப்பட்டபடி 'pageReview', 'imageRestoration', 'constrainedCorrection' நீக்கப்பட்டுள்ளன
  const [officialView, setOfficialView] = useState<string>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // உரையாடல் மற்றும் மாதிரிப் பலகைகள் (Modals)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isLiveCameraOpen, setIsLiveCameraOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);

  // விழிப்பூட்டல் செய்தி (Toast)
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // தொடக்க தரவு ஏற்றுதல்
  useEffect(() => {
    const loadedBooks = StorageService.getBooks();
    setBooks(loadedBooks);
    if (loadedBooks.length > 0) {
      setCurrentBook(loadedBooks[0]);
      if (loadedBooks[0].pages.length > 0) {
        setCurrentPage(loadedBooks[0].pages[0]);
      }
    }

    setStrictness(StorageService.getStrictness());
    setAuditLogs(StorageService.getAuditLogs());

    // முதல் முறை வருகையாளர் வழிகாட்டி
    const hasSeenTour = localStorage.getItem('நூல்_மீட்பு_வழிகாட்டி_பார்த்தது');
    if (!hasSeenTour) {
      setIsOnboardingOpen(true);
      localStorage.setItem('நூல்_மீட்பு_வழிகாட்டி_பார்த்தது', 'true');
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // நேரலை கேமராவில் இருந்து பிடிபட்ட உண்மையான சுவடிப் படத்தைச் செயலாக்குதல்
  const handleCameraCapture = async (
    base64Image: string,
    modernTamilText?: string,
    words?: any[]
  ) => {
    setIsLiveCameraOpen(false);
    showToast('உண்மையான சுவடிப் படம் நவீன தமிழ் ஆவணமாக மாற்றப்படுகிறது...');

    let finalWords = words;
    if (!finalWords || finalWords.length === 0) {
      const ocrResult = await OcrService.processImage(
        base64Image,
        'நேரலை சுவடிப் பிரதி',
        currentBook?.bookLexicon || []
      );
      finalWords = ocrResult.words;
    }

    const newPage: ManuscriptPage = {
      id: `பக்கம்-நேரலை-${Date.now()}`,
      pageNumber: (currentBook?.pages.length || 0) + 1,
      originalImage: base64Image,
      enhancedImage: base64Image,
      words: finalWords,
      status: 'நிறைவுற்றது',
      contrast: 85,
      stainRemoval: 90,
      denoise: 75,
      fadeRecovery: 80,
      straighten: 0,
      autoEnhanced: true,
    };

    const newBook: Book = {
      id: `நூல்-${Date.now()}`,
      title: `நேரலை சுவடிப் பிரதி (${new Date().toLocaleDateString('ta-IN')})`,
      author: 'மரபு உரை ஆசிரியர்',
      year: '19-ஆம் நூற்றாண்டு',
      location: 'நேரலை நிழற்படக் கருவி ஆவணம்',
      totalPages: 1,
      completedPages: 1,
      status: 'நிறைவுற்றது',
      hallucinationRate: 0.0,
      pages: [newPage],
      bookLexicon: finalWords.map((w: any) => w.originalText).slice(0, 8),
      createdAt: new Date().toISOString().substring(0, 10),
    };

    const updatedBooks = [newBook, ...books];
    setBooks(updatedBooks);
    StorageService.saveBooks(updatedBooks);

    setCurrentBook(newBook);
    setCurrentPage(newPage);
    setOfficialView('export');

    StorageService.addAuditLog({
      actor: username,
      role: currentRole,
      action: `நேரலை நிழற்படக் கருவி வழி புதிய சுவடி '${newBook.title}' எண்மியமாக்கப்பட்டு நவீன PDF தயார் செய்யப்பட்டது`,
      targetArtifact: newBook.title,
      fingerprint: `ஷா256-தமிழ்-${Date.now().toString(16)}`,
    });
    setAuditLogs(StorageService.getAuditLogs());

    showToast('நேரலைச் சுவடி வெற்றிகரமாக எண்மியமாக்கப்பட்டு புதிய நவீன PDF தயார்!');
  };

  // வரைபடத்தில் இருந்து தலத்துச் சுவடியைத் தேர்ந்தெடுத்தல்
  const handleSelectPlaceForManuscript = (place: HistoricalPlace) => {
    showToast(`${place.name} வரலாற்று சுவடி ஆவணக் காப்பகத்தில் தேர்ந்தெடுக்கப்பட்டது!`);
    // அந்த தலத்து நூலை அமைத்து ஏற்றுமதி/வாசிப்புக்குக் கொண்டுசெல்கிறோம்
    if (books.length > 0) {
      setCurrentBook(books[0]);
    }
    setOfficialView('export');
  };

  // பொது மக்கள் திருத்தப் பரிந்துரை பதிவு
  const handleSubmitSuggestion = (suggestion: any) => {
    StorageService.addPublicSuggestion(suggestion);
    showToast('பொதுமக்கள் திருத்தப் பரிந்துரை பதிவு செய்யப்பட்டது!');
  };

  return (
    <div className="min-h-screen bg-[#FBF6EA] dark:bg-[#181412] text-[#2B1D14] dark:text-[#F5EFEB] flex flex-col font-tamil text-base leading-normal">
      {/* மேல் பட்டை: செயலியின் பெயர் மற்றும் நுழைவு வாயில் மாற்று மட்டுமே */}
      <Header onOpenLogin={() => setIsLoginModalOpen(true)} />

      {/* முதன்மை உள்ளடக்கப் பரப்பு */}
      <div className="flex-1 flex overflow-hidden">
        {/* அதிகாரிகள் தளத்திற்கான பக்கப்பட்டை (கோரப்பட்டபடி 3 உருப்படிகள் நீக்கப்பட்டன) */}
        {currentPortal === 'official' && (
          <Sidebar
            currentView={officialView}
            onSelectView={(v) => setOfficialView(v)}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-7xl mx-auto w-full">
          {/* பொதுமக்கள் தளம் */}
          {currentPortal === 'public' ? (
            <PublicPortalView
              books={books}
              onStartUpload={() => setIsUploadModalOpen(true)}
              onOpenLiveCamera={() => setIsLiveCameraOpen(true)}
              onSubmitSuggestion={handleSubmitSuggestion}
              onSelectPlaceForManuscript={handleSelectPlaceForManuscript}
              showToast={showToast}
            />
          ) : (
            /* அதிகாரிகள் தளம் (பக்க மதிப்பாய்வு, படச் சீரமைப்பு, கட்டுப்பாட்டுத் திருத்தம் நீக்கப்பட்டன) */
            <>
              {/* 1. முகப்புப் பலகை (நிகழ்நேர நேரலைப் புதுப்பித்தல்) */}
              {officialView === 'dashboard' && (
                <ProjectDashboard
                  books={books}
                  onNavigate={setOfficialView}
                  onSelectBook={(b) => {
                    setCurrentBook(b);
                    if (b.pages.length > 0) setCurrentPage(b.pages[0]);
                  }}
                  onOpenUpload={() => setIsUploadModalOpen(true)}
                  onOpenLiveCamera={() => setIsLiveCameraOpen(true)}
                />
              )}

              {/* 2. தமிழ்நாட்டு அசல் வரலாற்று & அகழாய்வு வரைபடம் */}
              {officialView === 'historicalMap' && (
                <TamilNaduMap onSelectPlaceForManuscript={handleSelectPlaceForManuscript} />
              )}

              {/* 3. புத்தகப் பதிவேற்றம் & நவீன PDF */}
              {officialView === 'upload' && (
                <div className="bg-[#FBF6EA] dark:bg-[#181412] p-8 rounded-2xl border-2 border-[#D9A441]/40 text-center max-w-xl mx-auto my-6 shadow-md">
                  <h3 className="text-xl font-bold font-tamil-serif text-[#7A1F2B] dark:text-[#D9A441] mb-2">
                    உண்மையான சுவடிகள் பதிவேற்றப் பலகை
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2B1D14]/80 dark:text-[#F5EFEB]/80 mb-6 leading-relaxed">
                    தகவல்கள் எதுவும் உள்ளிடத் தேவையில்லை — சுவடி அல்லது PDF கோப்பைத் தேர்வு செய்தவுடன் AI தானாகவே பழைய சுவடியை ஆய்வு செய்து புதிய நவீன தமிழ் வடிவில் மாற்றி உடனே PDF ஆகத் தரும்.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsUploadModalOpen(true)}
                      className="px-6 py-3 bg-[#7A1F2B] hover:bg-[#962635] text-white rounded-xl text-xs sm:text-sm font-bold cursor-pointer shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4 text-[#D9A441]" />
                      <span>சுவடி / PDF கோப்பைத் தேர்வு செய்க</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsLiveCameraOpen(true)}
                      className="px-6 py-3 bg-[#D9A441] hover:bg-[#e4b254] text-[#2B1D14] rounded-xl text-xs sm:text-sm font-bold cursor-pointer shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Camera className="w-4 h-4 text-[#7A1F2B]" />
                      <span>நேரலை நிழற்படக் கருவி</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 4. தணிக்கைப் பதிவு */}
              {officialView === 'auditLog' && <AuditLogView logs={auditLogs} />}

              {/* 5. மதிப்பீட்டுக் கூடம் */}
              {officialView === 'evaluations' && <EvaluationSuiteView />}

              {/* 6. காப்பக வெளியீடு & அசல் PDF பதிவிறக்கம் */}
              {officialView === 'export' && currentBook && (
                <ExportView book={currentBook} showToast={showToast} />
              )}
            </>
          )}
        </main>
      </div>

      {/* கீழ்ப்பகுதி அடிக்குறிப்பு */}
      <footer className="border-t border-[#D9A441]/30 py-3 px-4 bg-[#FBF6EA] dark:bg-[#181412] text-center text-xs text-[#2B1D14]/70 dark:text-[#F5EFEB]/70 select-none">
        <p>நூல் மீட்பு — பழைமையான தமிழ் நூல்களைக் கற்பனைச் சொற்கள் இன்றி மீட்டெடுக்கும் உயர்தர எண்மியக் கட்டமைப்பு</p>
      </footer>

      {/* உரையாடல் பெட்டிகள் */}
      <LoginPortalModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(portal, role, user) => {
          setCurrentPortal(portal);
          setCurrentRole(role);
          setUsername(user);
          showToast(`${role} பாத்திரத்தில் உள்நுழைவு வெற்றிகரமாக முடிந்தது!`);
        }}
      />

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={(newBook) => {
          const newBooks = [newBook, ...books];
          setBooks(newBooks);
          setCurrentBook(newBook);
          if (newBook.pages.length > 0) setCurrentPage(newBook.pages[0]);
          StorageService.saveBooks(newBooks);
          setOfficialView('export');
        }}
        onOpenLiveCamera={() => setIsLiveCameraOpen(true)}
        showToast={showToast}
      />

      {isLiveCameraOpen && (
        <LiveCameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setIsLiveCameraOpen(false)}
        />
      )}

      <OnboardingTour
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

      {/* விழிப்பூட்டல் சிப் */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2B1D14] text-[#FBF6EA] border-2 border-[#D9A441] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm animate-bounce font-tamil">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
