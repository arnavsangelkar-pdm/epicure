'use client';

import { useState, useRef, useEffect } from 'react';
import { EpicureItem } from '@/src/data/epicureItems';
import MessageBubble from './MessageBubble';
import RecipeCard from './RecipeCard';
import ReactMarkdown from 'react-markdown';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  items?: EpicureItem[];
}

interface ChatProps {
  onSendMessage: (message: string) => Promise<{ content: string; items: EpicureItem[] }>;
}

export default function Chat({ onSendMessage }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your Epicure demo kitchen helper. Tell me what you're craving or what you have in your fridge, and I'll suggest recipes and products that are gluten-free, nut-free, and ready in minutes.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await onSendMessage(userMessage.content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        items: response.items,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again or rephrase your question.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex h-[70vh] flex-col rounded-2xl bg-white shadow-sm border border-amber-50">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <MessageBubble role={message.role}>
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="ml-2">{children}</li>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </MessageBubble>
            {message.items && message.items.length > 0 && (
              <div className="mt-2 space-y-2">
                {message.items.map((item) => (
                  <RecipeCard key={item.id} item={item} compact />
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#fdf9f4] text-slate-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-amber-100">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-amber-100 bg-[#fdf9f4] px-3 py-2"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about recipes or products…"
          className="flex-1 rounded-full border border-amber-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="rounded-full bg-amber-700 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm hover:bg-amber-800 disabled:opacity-40"
          disabled={!input.trim() || isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}

