/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Role = 'பொதுமக்கள்' | 'நூலகர்' | 'திருத்துநர்' | 'தலைமை மேற்பார்வையாளர்' | 'நிர்வாகி';

export type PortalType = 'public' | 'official';

export type StrictnessLevel = 'ultra' | 'strict' | 'balanced';

export type LexiconTier = 'செந்தமிழ் சொற்களஞ்சியம்' | 'தற்காலத் தமிழ்' | 'இந்நூல் சொற்கள்';

export interface ManuscriptWord {
  id: string;
  originalText: string;
  correctedText?: string;
  confidence: number; // 0 - 100
  tier: LexiconTier;
  damaged: boolean;
  missingGlyph: boolean;
  glyphTemplate: string | null;
  glyphMatchPercent: number;
  candidates: string[];
  engineScores: [number, number, number, number]; // எழுத்துணரி 1, 2, 3, 4
  morphologyScore: number;
  contextScore: number;
  status: 'accepted' | 'flagged' | 'review' | 'rejected';
  reviewer?: string;
  history?: {
    action: string;
    timestamp: string;
    by: string;
  }[];
  box?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface ManuscriptPage {
  id: string;
  pageNumber: number;
  originalImage: string;
  enhancedImage: string;
  words: ManuscriptWord[];
  status: 'நிறைவுற்றது' | 'மதிப்பாய்வில்' | 'செயலாக்கத்தில்' | 'நிலுவையில்';
  contrast: number;
  stainRemoval: number;
  denoise: number;
  fadeRecovery: number;
  straighten: number;
  autoEnhanced: boolean;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
  location: string;
  totalPages: number;
  completedPages: number;
  status: 'நிறைவுற்றது' | 'மதிப்பாய்வில்' | 'செயலாக்கத்தில்' | 'நிலுவையில்';
  hallucinationRate: number; // e.g. 0.00%
  pages: ManuscriptPage[];
  bookLexicon: string[];
  createdAt: string;
}

export interface HistoricalPlace {
  id: string;
  name: string;
  district: string;
  lat: number;
  lng: number;
  mapX: number; // Percentage for SVG map
  mapY: number; // Percentage for SVG map
  era: string;
  scriptType: string;
  description: string;
  notableManuscripts: string[];
  manuscriptCount: number;
  image: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: Role;
  action: string;
  targetArtifact: string;
  fingerprint: string;
  verified: boolean;
}

export interface SignedArtifact {
  id: string;
  name: string;
  version: string;
  signer: string;
  signatureStatus: 'சரிபார்க்கப்பட்டது' | 'செல்லுபடியானது' | 'தடைசெய்யப்பட்டது';
  date: string;
  hash: string;
  description: string;
}

export interface ProcessingJob {
  id: string;
  bookTitle: string;
  currentPage: number;
  totalPages: number;
  stage: 'படச் சீரமைப்பு' | 'எழுத்தறிதல்' | 'திருத்தம்' | 'மதிப்பாய்வு' | 'வெளியீடு';
  progress: number;
  status: 'இயங்குகிறது' | 'நிறுத்தப்பட்டது' | 'நிறைவுற்றது';
  startTime: string;
}

export interface PublicSuggestion {
  id: string;
  bookId: string;
  pageId: string;
  wordId: string;
  originalWord: string;
  suggestedWord: string;
  reason: string;
  submittedBy: string;
  submittedAt: string;
  status: 'பரிசீலனையில்' | 'ஏற்கப்பட்டது' | 'நிராகரிக்கப்பட்டது';
}
