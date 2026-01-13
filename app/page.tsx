'use client';

import { useState } from 'react';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Successfully signed up! We\'ll text you soon.');
        setPhone('');
        setName('');
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
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Full-width background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/background.jpg)',
        }}
      >
        {/* Subtle white overlay for minimalist aesthetic */}
        <div className="absolute inset-0 bg-white/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 md:py-16">
        <div className="w-full max-w-md">
          {/* Logo/Title Area */}
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-5xl font-extralight tracking-wide text-white drop-shadow-md md:text-6xl">
              Golden Gate
            </h1>
            <p className="text-base font-light text-white/95 drop-shadow-sm">
              Join us for an unforgettable night
            </p>
          </div>

          {/* Sign-up Form - Minimalist white card */}
          <div className="rounded-lg bg-white/98 backdrop-blur-sm p-8 shadow-xl">
            <h2 className="mb-2 text-xl font-light text-gray-900">
              Stay Connected
            </h2>
            <p className="mb-6 text-sm font-light text-gray-500">
              Join our text list for exclusive updates
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-gray-300 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full rounded border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-gray-300 focus:outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-6 w-full rounded border border-gray-900 bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'loading' ? 'Joining...' : 'Join Text List'}
              </button>

              {message && (
                <div
                  className={`rounded border p-3 text-xs ${
                    status === 'success'
                      ? 'border-green-200 bg-green-50 text-green-700'
                      : 'border-red-200 bg-red-50 text-red-700'
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
