'use client';

import { useState } from 'react';

// Format phone number as user types - accepts multiple input styles
function formatPhoneNumber(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Limit to 10 digits (US phone number)
  const limitedDigits = digits.slice(0, 10);
  
  // Format based on length: (555) 123-4567
  if (limitedDigits.length === 0) return '';
  if (limitedDigits.length <= 3) return `(${limitedDigits}`;
  if (limitedDigits.length <= 6) {
    return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
  }
  return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3, 6)}-${limitedDigits.slice(6)}`;
}

// Validate phone number - accepts formatted or unformatted
function isValidPhoneNumber(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  // Must be exactly 10 digits (US phone number)
  return digits.length === 10;
}

export default function Home() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    if (!isValidPhoneNumber(phone)) {
      setStatus('error');
      setMessage('Please enter a valid 10-digit phone number');
      return;
    }
    
    setStatus('loading');
    setMessage('');

    try {
      // Send the formatted phone number
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, name: '' }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('You\'re in! We\'ll hit you up soon.');
        setPhone('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-3 sm:p-6" style={{
      backgroundImage: 'url(/bridge-background.svg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#ffffff'
    }}>
      {/* Background image card - responsive sizing */}
      <div className="relative w-full h-[70vh] min-h-[500px] sm:w-[75%] sm:h-[75vh] max-w-6xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/101CCF04-741F-4933-A662-B9A64D6C7526_1_102_o.jpeg)',
          }}
        />
      </div>

      {/* Top left - golden gate pop ups text */}
      <div className="absolute left-3 top-3 sm:left-6 sm:top-6 z-30">
        <h2 className="text-[10px] sm:text-xs font-light tracking-wider text-gray-800">
          golden gate pop ups
        </h2>
      </div>

      {/* Top right - Logo as circle */}
      <div className="absolute right-3 top-3 sm:right-6 sm:top-6 z-30">
        <img 
          src="/DB7C25F9-6D05-4032-9EFC-71DFAC9150BD_1_105_c.jpeg" 
          alt="Logo" 
          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover shadow-md"
        />
      </div>

      {/* Content - Centered and overlayed on the card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="w-full max-w-sm px-4 sm:px-6">
          {/* Title Area - White text */}
          <div className="mb-8 sm:mb-12 text-center">
            <h1 className="text-base sm:text-lg font-light tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] px-2">
              join the adventure, we cant wait dance with you!
            </h1>
          </div>

          {/* Minimal input bar */}
          <form onSubmit={handleSubmit} className="relative">
            <div 
              className="relative flex items-center rounded-full bg-white/95 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-[0_6px_30px_rgba(0,0,0,0.2)]"
            >
              {/* Input field */}
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                required
                className="w-full rounded-full bg-transparent px-4 sm:px-6 py-3.5 sm:py-4 pr-12 sm:pr-14 text-base text-gray-900 placeholder-gray-500 outline-none"
                placeholder="(555) 123-4567"
                maxLength={14}
                suppressHydrationWarning
              />

              {/* Submit button - larger touch target on mobile */}
              <button
                type="submit"
                disabled={status === 'loading' || !phone.trim()}
                className="absolute right-1.5 sm:right-2 flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gray-900 text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all hover:bg-gray-800 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 touch-manipulation"
                aria-label="Submit"
              >
                {status === 'loading' ? (
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>

            {/* Status message - Minimal with white text */}
            {message && (
              <div
                className={`mt-4 sm:mt-6 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm text-center text-white backdrop-blur-sm shadow-lg ${
                  status === 'success'
                    ? 'bg-green-500/90'
                    : 'bg-red-500/90'
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-3 sm:bottom-6 left-0 right-0 z-30 text-center px-3 sm:px-6">
        <p className="text-xs sm:text-sm font-light text-gray-700 drop-shadow-[0_1px_4px_rgba(255,255,255,0.8)]">
          We are glad you found us! Can't wait to see you at the next pop up
        </p>
      </div>
    </div>
  );
}
