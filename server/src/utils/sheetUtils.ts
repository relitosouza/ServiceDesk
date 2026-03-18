import { sheets } from '../config/googleAuth';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

export const appendRow = async (range: string, values: any[]) => {
  if (!SPREADSHEET_ID) {
    console.error('ERROR: GOOGLE_SHEET_ID is not defined in environment variables');
    throw new Error('Spreadsheet ID missing');
  }
  
  try {
    console.log(`Attempting to append row to sheet ${SPREADSHEET_ID} in range ${range}`);
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [values] },
    });
    console.log('Successfully appended row');
    return result;
  } catch (error: any) {
    console.error('ERROR in appendRow:', error.message);
    if (error.response) console.error('Response data:', error.response.data);
    throw error;
  }
};

export const getRows = async (range: string) => {
  if (!SPREADSHEET_ID) {
    console.error('ERROR: GOOGLE_SHEET_ID is not defined');
    return [];
  }

  try {
    console.log(`Fetching rows from sheet ${SPREADSHEET_ID}, range ${range}`);
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    });
    console.log('Successfully fetched rows');
    return res.data.values;
  } catch (error: any) {
    console.error('ERROR in getRows:', error.message);
    if (error.response) console.error('Response data:', error.response.data);
    throw error;
  }
};
