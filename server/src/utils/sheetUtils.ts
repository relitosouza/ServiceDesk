import { sheets } from '../config/googleAuth';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

export const appendRow = async (range: string, values: any[]) => {
  return await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] },
  });
};

export const getRows = async (range: string) => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID || '',
    range,
  });
  return res.data.values;
};
