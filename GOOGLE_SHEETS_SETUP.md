# Google Sheets Setup Guide

This guide will help you set up automatic saving of phone numbers to a Google Sheet.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

## Step 2: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Give it a name (e.g., "goldengate-popups")
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 3: Create and Download Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the JSON file

## Step 4: Create a Google Sheet

1. Create a new Google Sheet
2. Add headers in the first row (optional but recommended):
   - Column A: "Timestamp"
   - Column B: "Phone Number"
   - Column C: "Name"
3. Copy the Sheet ID from the URL:
   - The URL looks like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the `SHEET_ID_HERE` part

## Step 5: Share the Sheet with Service Account

1. Open your Google Sheet
2. Click "Share" button
3. Add the service account email (found in the JSON file as `client_email`)
4. Give it "Editor" permissions
5. Click "Send"

## Step 6: Add Environment Variables

Add these to your `.env.local` file (for local development):

```env
GOOGLE_SHEETS_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

**Important Notes:**
- The `GOOGLE_PRIVATE_KEY` should include the full key with `\n` characters (they will be converted automatically)
- Copy the `private_key` value from the JSON file you downloaded
- Keep the quotes around the private key

## Step 7: Add to Vercel (for production)

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the same three variables:
   - `GOOGLE_SHEETS_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
4. Redeploy your application

## Testing

1. Run `npm install` to install the googleapis package
2. Start your dev server: `npm run dev`
3. Submit a phone number through the form
4. Check your Google Sheet - you should see a new row appear!

## Troubleshooting

- **"Permission denied"**: Make sure you shared the sheet with the service account email
- **"Sheet not found"**: Check that the `GOOGLE_SHEETS_ID` is correct
- **"Invalid credentials"**: Verify the private key is correctly formatted with `\n` characters

## Alternative: Quick Setup Without Service Account

If you want a simpler setup without service accounts, you can:
1. Use a webhook service like Zapier or Make.com
2. Send data to a simple API endpoint that writes to Sheets
3. Use Google Apps Script (though this requires more setup)
