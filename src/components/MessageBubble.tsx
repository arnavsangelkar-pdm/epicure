interface MessageBubbleProps {
  role: 'user' | 'assistant';
  children: React.ReactNode;
}

export default function MessageBubble({ role, children }: MessageBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={[
          'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm',
          isUser
            ? 'bg-amber-700 text-white rounded-br-sm'
            : 'bg-[#fdf9f4] text-slate-800 border border-amber-100 rounded-bl-sm',
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  );
}


