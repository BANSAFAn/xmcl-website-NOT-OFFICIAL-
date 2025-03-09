
import { DownloadTranslations } from './types';

// Define default translations for download-specific terms that might not be in the main translations
export const defaultDownloadTranslations: DownloadTranslations = {
  portable: 'Portable',
  portableDescription: 'Run directly without installation',
  zip64: 'ZIP (64-bit)',
  zip32: 'ZIP (32-bit)',
  zipDescription: 'Download as ZIP file',
  appx: 'APPX Package',
  appxDescription: 'Windows Store format'
};
