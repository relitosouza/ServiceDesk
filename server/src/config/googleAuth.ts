import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Diagnostic logs (DO NOT log the actual private key value)
console.log('--- Google Auth Configuration ---');
console.log('GOOGLE_SERVICE_ACCOUNT_EMAIL present:', !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
console.log('GOOGLE_PRIVATE_KEY present:', !!process.env.GOOGLE_PRIVATE_KEY);
console.log('GOOGLE_SHEET_ID present:', !!process.env.GOOGLE_SHEET_ID);
if (process.env.GOOGLE_PRIVATE_KEY) {
  console.log('GOOGLE_PRIVATE_KEY format check:', process.env.GOOGLE_PRIVATE_KEY.startsWith('-----BEGIN PRIVATE KEY-----') ? 'OK' : 'INVALID (Check prefix)');
}
console.log('--------------------------------');

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file'],
});

export const sheets = google.sheets({ version: 'v4', auth });
export const drive = google.drive({ version: 'v3', auth });
