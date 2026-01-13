import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { phone, name } = await request.json();

    // Validate input
    if (!phone || !name) {
      return NextResponse.json(
        { error: 'Phone number and name are required' },
        { status: 400 }
      );
    }

    // TODO: Integrate with your text message service
    // Examples: Twilio, MessageBird, AWS SNS, etc.
    // 
    // Example with Twilio:
    // const twilio = require('twilio');
    // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    // await client.messages.create({
    //   body: `Welcome ${name}! You've been added to our list.`,
    //   to: phone,
    //   from: process.env.TWILIO_PHONE_NUMBER
    // });

    // For now, just log the signup (you can replace this with your service)
    console.log('New signup:', { name, phone, timestamp: new Date().toISOString() });

    // In production, you would:
    // 1. Save to database (e.g., Supabase, MongoDB, PostgreSQL)
    // 2. Send confirmation text via SMS service
    // 3. Add to your mailing/text list

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully signed up!',
        // Remove this in production - only for testing
        data: { name, phone }
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
