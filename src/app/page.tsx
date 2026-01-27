'use client';

import { useState } from 'react';
import Chat from '@/src/components/Chat';
import type { EpicureItem } from '@/src/data/epicureItems';

export default function Home() {
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (message: string): Promise<{ content: string; items: EpicureItem[] }> => {
    setError(null);
    
    try {
      // Get conversation history from localStorage (simple implementation)
      // In a real app, you'd manage this more robustly
      let history: any[] = [];
      if (typeof window !== 'undefined') {
        try {
          history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
        } catch (e) {
          // localStorage might be unavailable or corrupted
          history = [];
        }
      }
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversationHistory: history,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      
      // Update conversation history (simplified - in production, manage this better)
      if (typeof window !== 'undefined') {
        try {
          const newHistory = [
            ...history.slice(-5), // Keep last 5 messages
            { role: 'user', content: message },
            { role: 'assistant', content: data.content },
          ];
          localStorage.setItem('chatHistory', JSON.stringify(newHistory));
        } catch (e) {
          // localStorage might be unavailable
        }
      }
      
      return data;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6f1] text-slate-800">
      <header className="sticky top-0 z-10 border-b border-amber-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="text-lg font-semibold tracking-tight">Epicure Demo Chatbot</div>
          <div className="text-xs font-medium text-amber-700">
            Good Food. Real Fast.
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-10 pt-6 space-y-6">
        <section className="rounded-2xl bg-white p-6 shadow-sm border border-amber-50">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            What&apos;s for dinner tonight?
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Tell me what you&apos;re craving or what you have in your fridge, and I&apos;ll suggest
            gluten-free, nut-free recipes and Epicure products that are ready in minutes.
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-amber-700">
            Gluten-Free · Nut-Free · Stress Free
          </p>
        </section>

        {/* Error message */}
        {error && (
          <div className="rounded-xl bg-red-50 border-l-4 border-red-400 text-red-700 p-4">
            <p className="font-medium text-sm">Error: {error}</p>
          </div>
        )}

        <section>
          <Chat 
            onSendMessage={handleSendMessage}
          />
        </section>
      </main>

      <footer className="border-t border-amber-100 bg-white/80">
        <div className="mx-auto max-w-5xl px-4 py-3 text-[11px] text-slate-500">
          This is a demo chatbot. Always check ingredient labels for allergies. Not medical
          advice. For real Epicure products, visit <span className="font-medium">epicure.com</span>.
        </div>
      </footer>
    </div>
  );
}
