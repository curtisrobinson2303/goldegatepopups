import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  try {
    const { phone, name } = await request.json();

    // Validate input
    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    
    // Log to console (always useful for debugging)
    console.log('New signup:', { phone, name: name || 'Not provided', timestamp });

    // Save to Google Sheets if configured
    if (process.env.GOOGLE_SHEETS_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      try {
        const auth = new google.auth.JWT(
          process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          undefined,
          process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          ['https://www.googleapis.com/auth/spreadsheets']
        );

        const sheets = google.sheets({ version: 'v4', auth });
        
        // Append row to the spreadsheet
        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEETS_ID,
          range: 'Sheet1!A:C', // Adjust range as needed
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[timestamp, phone, name || '']],
          },
        });

        console.log('Saved to Google Sheets successfully');
      } catch (sheetsError) {
        // Log error but don't fail the request
        console.error('Google Sheets error:', sheetsError);
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully signed up!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
