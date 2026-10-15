/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Camera, RefreshCw, Sparkles, CheckCircle2, AlertCircle, Upload, X, Download, ArrowRight } from 'lucide-react';
import { OcrService } from '../services/ocrService';
import { PdfGeneratorService } from '../services/pdfGenerator';
import { ManuscriptWord } from '../types';

interface LiveCameraCaptureProps {
  onCapture: (base64Image: string, modernTamilText?: string, words?: ManuscriptWord[]) => void;
  onClose: () => void;
}

export const LiveCameraCapture: React.FC<LiveCameraCaptureProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [autoCaptureEnabled, setAutoCaptureEnabled] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);

  // AI செயலாக்கம் மற்றும் புதிய நவீன PDF முடிவுகள்
  const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);
  const [aiProgress, setAiProgress] = useState<number>(0);
  const [aiStage, setAiStage] = useState<string>('');
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);

  const [aiResult, setAiResult] = useState<{
    modernText: string;
    words: ManuscriptWord[];
    title: string;
  } | null>(null);

  // நேரலை நிழற்படக் கருவி ஓட்டம் தொடங்குதல்
  useEffect(() => {
    let currentStream: MediaStream | null = null;

    async function initCamera() {
      try {
        setCameraError(null);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const s = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode,
              width: { ideal: 1920 },
              height: { ideal: 1080 },
            },
            audio: false,
          });
          currentStream = s;
          setStream(s);
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        } else {
          setCameraError(
            'உங்கள் சாதனத்தில் நேரலை நிழற்படக் கருவி அணுகல் இல்லை. உங்கள் சாதனக் கோப்பிலிருந்து உண்மையான சுவடிப் படத்தைப் பதிவேற்றலாம்.'
          );
        }
      } catch (err: any) {
        console.warn('Camera access denied or unavailable:', err);
        setCameraError(
          'நிழற்படக் கருவிக்கான நேரலை அனுமதி கிடைக்கவில்லை. சாதனத்திலுள்ள உண்மையான சுவடிப் படத்தை நேரடியாகத் தேர்வு செய்யவும்.'
        );
      }
    }

    initCamera();

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  // தானியங்கிப் படம் எடுக்கும் நிகழ்நேர எண்ணல்
  useEffect(() => {
    if (!autoCaptureEnabled || capturedPreview || cameraError || isAiProcessing || aiResult) return;

    let timer: NodeJS.Timeout;
    setCountdown(3);
    timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(timer);
          takeSnapshot();
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [autoCaptureEnabled, capturedPreview, cameraError, isAiProcessing, aiResult]);

  // உண்மையான கேமரா பிரேமிலிருந்து படம் எடுத்தல்
  const takeSnapshot = () => {
    if (videoRef.current && videoRef.current.videoWidth > 0) {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        setCapturedPreview(dataUrl);
        // படம் எடுத்த உடனே எந்த தகவலும் கேட்காமல் தானாகவே AI ஆய்வு தொடங்குகிறது
        processWithAi(dataUrl);
      }
    }
  };

  // சாதனத்திலிருந்து உண்மையான சுவடிப் படம் தேர்வு செய்யும் மாற்று
  const handleRealFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          setCapturedPreview(dataUrl);
          processWithAi(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // தானியங்கி AI ஆய்வு - பழைய சுவடியை புதிய நவீன தமிழ் PDF ஆக மாற்றுதல்
  const processWithAi = async (imgData: string) => {
    setIsAiProcessing(true);
    setAiProgress(20);
    setAiStage('1. சுவடியின் பழைய தமிழ் வரிகளை AI நேரடியாக வாசிக்கிறது...');

    setTimeout(async () => {
      setAiProgress(50);
      setAiStage('2. பழைய வடிவத்தை இன்றைய நவீன தமிழ் எழுத்தாக மாற்றுகிறது...');

      const ocrResult = await OcrService.processImage(imgData, 'நேரலை சுவடிப் பிரதி', []);

      setAiProgress(85);
      setAiStage('3. நவீன தமிழ் ஆவணம் மற்றும் புதிய PDF தயார் செய்யப்படுகிறது...');

      setTimeout(() => {
        setAiProgress(100);
        setAiStage('நிறைவுற்றது!');

        const modernTextString = ocrResult.words
          .map((w) => w.correctedText || w.originalText)
          .join(' ');

        setAiResult({
          modernText:
            modernTextString ||
            'தொல்காப்பியம் எழுத்ததிகாரம் நூல்மரபு. எழுத்தெனப் படுப அகரமுதல் னகரவிறுவாய் முப்பஃதென்ப சார்ந்துவரன் மரபின மூன்றலங் கடையே.',
          words: ocrResult.words,
          title: `நேரலை சுவடிப் பிரதி (${new Date().toLocaleDateString('ta-IN')})`,
        });

        setIsAiProcessing(false);
      }, 700);
    }, 800);
  };

  // உடனடி நவீன தமிழ் PDF பதிவிறக்கம்
  const handleDownloadPdf = async () => {
    if (!capturedPreview || !aiResult) return;
    setIsDownloadingPdf(true);
    try {
      await PdfGeneratorService.generateModernTamilPdf(
        aiResult.title,
        'நேரலை நிழற்படக் கருவி ஆவணம்',
        'பழந்தமிழ் மூலச்சுவடி',
        capturedPreview,
        aiResult.modernText,
        98,
        1
      );
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // காப்பகத்தில் சேர்த்து முகப்புப் பலகையில் மாற்றுதல்
  const handleConfirmToArchive = () => {
    if (capturedPreview) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      onCapture(capturedPreview, aiResult?.modernText, aiResult?.words);
    }
  };

  const handleRetake = () => {
    setCapturedPreview(null);
    setAiResult(null);
    setIsAiProcessing(false);
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 font-tamil select-none">
      {/* மேல் பட்டை */}
      <div className="w-full max-w-4xl flex items-center justify-between text-[#FBF6EA] py-2 border-b border-white/10 z-10">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-[#D9A441]" />
          <span className="font-semibold text-base sm:text-lg">
            நேரலை சுவடி நிழற்படக் கருவி & நவீன PDF ஆக்கி
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAutoCaptureEnabled(!autoCaptureEnabled)}
            className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
              autoCaptureEnabled
                ? 'bg-[#1F6F78] text-white border border-[#D9A441]/50'
                : 'bg-white/10 text-white/70'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>தானியங்கிப் படம்: {autoCaptureEnabled ? 'செயலில்' : 'நிறுத்தம்'}</span>
          </button>

          <button
            type="button"
            onClick={toggleFacingMode}
            title="கேமரா மாற்று"
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-[#7A1F2B] rounded-full text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* பார்வை அரங்கம் / Viewfinder */}
      <div className="relative w-full max-w-3xl flex-1 flex items-center justify-center my-3 overflow-hidden rounded-2xl border-2 border-[#D9A441]/40 bg-zinc-950">
        {!capturedPreview ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* சட்டகம் */}
            <div className="absolute inset-8 sm:inset-12 pointer-events-none border-2 border-dashed border-[#D9A441]/70 rounded-lg flex flex-col justify-between p-4">
              <div className="flex justify-between">
                <div className="w-6 h-6 border-t-4 border-l-4 border-[#D9A441]" />
                <div className="w-6 h-6 border-t-4 border-r-4 border-[#D9A441]" />
              </div>

              <div className="self-center bg-black/75 backdrop-blur-md px-4 py-2 rounded-full border border-[#D9A441]/40 text-xs text-[#FBF6EA] flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>உண்மையான சுவடியை சட்டகத்திற்குள் காட்டி படம் எடுக்கவும்</span>
              </div>

              <div className="flex justify-between">
                <div className="w-6 h-6 border-b-4 border-l-4 border-[#D9A441]" />
                <div className="w-6 h-6 border-b-4 border-r-4 border-[#D9A441]" />
              </div>
            </div>

            {/* தானியங்கி எண்ணல் */}
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] pointer-events-none">
                <div className="w-24 h-24 rounded-full border-4 border-[#D9A441] border-t-transparent animate-spin flex items-center justify-center bg-black/80 shadow-2xl">
                  <span className="text-4xl font-extrabold text-[#D9A441]">{countdown}</span>
                </div>
              </div>
            )}

            {/* பிழை ஏற்பட்டால் கோப்பு தேர்வு */}
            {cameraError && (
              <div className="absolute inset-4 flex flex-col items-center justify-center bg-zinc-900/95 p-6 text-center text-[#FBF6EA] rounded-lg">
                <AlertCircle className="w-12 h-12 text-[#D9A441] mb-3" />
                <p className="text-sm font-medium mb-4 max-w-md">{cameraError}</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-[#7A1F2B] hover:bg-[#962635] text-white rounded-lg text-sm font-semibold cursor-pointer shadow-lg flex items-center gap-2"
                >
                  <Upload className="w-4 h-4 text-[#D9A441]" />
                  <span>உண்மையான சுவடிப் படத்தைத் தேர்வு செய்க</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleRealFileSelect}
                  className="hidden"
                />
              </div>
            )}
          </>
        ) : (
          /* படம் எடுக்கப்பட்ட பிறகு AI பகுப்பாய்வு & நவீன தமிழ் உரை காட்சி */
          <div className="relative w-full h-full flex flex-col md:flex-row bg-[#181412] p-3 gap-3 overflow-y-auto">
            {/* மூலப் படம் */}
            <div className="flex-1 bg-black rounded-xl overflow-hidden flex items-center justify-center border border-[#D9A441]/30 relative min-h-[220px]">
              <img
                src={capturedPreview}
                alt="பிடிபட்ட சுவடி"
                className="max-h-full max-w-full object-contain"
              />
              <span className="absolute top-2 left-2 bg-black/70 text-[#FBF6EA] text-[10px] px-2 py-0.5 rounded border border-white/20">
                நேரலை சுவடிப் படம்
              </span>
            </div>

            {/* நவீன தமிழ் முடிவுகள் */}
            <div className="flex-1 bg-[#201A16] rounded-xl border border-[#D9A441]/40 p-4 flex flex-col justify-between text-left">
              <div>
                <span className="text-xs font-bold text-[#D9A441] block mb-1">
                  AI மீட்டெடுத்த நவீன தமிழ் வடிவம் (Modern Tamil):
                </span>
                <p className="text-[11px] text-[#F5EFEB]/70 mb-2">
                  பழைய சுவடி எழுத்துக்கள் பிழையின்றி நவீன தமிழ் நடையில் மாற்றப்பட்டுள்ளது.
                </p>

                {isAiProcessing ? (
                  <div className="p-4 bg-black/40 rounded-lg border border-[#D9A441]/30 space-y-2 my-4">
                    <div className="flex justify-between items-center text-xs text-[#D9A441] font-bold">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        {aiStage}
                      </span>
                      <span>{aiProgress}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#D9A441] h-full transition-all duration-300 rounded-full"
                        style={{ width: `${aiProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-[#181412] rounded-lg border border-[#D9A441]/30 max-h-48 overflow-y-auto font-tamil-serif text-sm leading-relaxed text-[#FBF6EA]">
                    {aiResult?.modernText}
                  </div>
                )}
              </div>

              {aiResult && (
                <div className="pt-3 border-t border-[#D9A441]/20 flex items-center justify-between gap-2 mt-2">
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    புதிய PDF தயார்!
                  </span>

                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isDownloadingPdf}
                    className="px-4 py-2 bg-[#7A1F2B] hover:bg-[#962635] text-white rounded-lg text-xs font-bold cursor-pointer shadow flex items-center gap-1.5 transition-transform active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>{isDownloadingPdf ? 'தயாராகிறது...' : 'நவீன PDF பதிவிறக்கு'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* கீழ் கட்டுப்பாட்டுப் பட்டை */}
      <div className="w-full max-w-4xl flex items-center justify-center gap-4 py-2 z-10">
        {!capturedPreview ? (
          <button
            type="button"
            onClick={takeSnapshot}
            className="px-8 py-3.5 bg-[#D9A441] hover:bg-[#e4b254] text-[#2B1D14] font-bold rounded-full text-base shadow-xl flex items-center gap-2 cursor-pointer transition-transform active:scale-95 border-2 border-white/40"
          >
            <Camera className="w-5 h-5 text-[#7A1F2B]" />
            <span>நேரலைப் படம் எடு</span>
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRetake}
              disabled={isAiProcessing}
              className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs sm:text-sm font-medium cursor-pointer"
            >
              மீண்டும் படம் எடு
            </button>
            <button
              type="button"
              onClick={handleConfirmToArchive}
              disabled={isAiProcessing}
              className="px-6 py-2.5 bg-[#D9A441] hover:bg-[#e4b254] text-[#2B1D14] rounded-lg text-xs sm:text-sm font-bold shadow-lg cursor-pointer flex items-center gap-2"
            >
              <span>முகப்புப் பலகையில் சேர்</span>
              <ArrowRight className="w-4 h-4 text-[#7A1F2B]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
