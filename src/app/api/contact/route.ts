import { NextResponse } from 'next/server';
import { sendContactEmails } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Please enter your name.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Please enter your email address.' },
        { status: 400 }
      );
    }

    // Basic email format regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== 'string' || subject.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Please select or enter a subject.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Please enter your message.' },
        { status: 400 }
      );
    }

    // Call email helper
    const result = await sendContactEmails({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to process contact submission. Please try again later.',
      },
      { status: 500 }
    );
  }
}
