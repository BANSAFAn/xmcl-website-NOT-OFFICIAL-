import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Send, Upload, X, FileText, Image as ImageIcon, Sparkles, Trash2, Shield } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const XMAIHelp: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t('xmai.greeting') }
  ]);
  const [input, setInput] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPolicy, setShowPolicy] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError(t('xmai.file_size_error', { size: '50' }));
        return;
      }
      if (!selectedFile.name.toLowerCase().endsWith('.txt')) {
        setError(t('xmai.file_type_error'));
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const encodeFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const getAIResponse = async (): Promise<string> => {
    let userQuery = input.trim();
    let logContent = '';

    if (file) {
      const base64Content = await encodeFileToBase64(file);
      logContent = atob(base64Content);
    }

    const response = await fetch('/api/xmairouter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userQuery, logContent }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || t('xmai.api_error'));
    }

    const data = await response.json();
    return data.response;
  };

  const sendMessage = async () => {
    if (!input.trim() && !file) {
      setError(t('xmai.input_error'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userMessage: Message = { role: 'user', content: input || `[${t('xmai.attached_file')}: ${file?.name}]` };
      setMessages(prev => [...prev, userMessage]);

      const aiResponse = await getAIResponse();

      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);

      setInput('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

    } catch (err: any) {
      console.error("Error processing message:", err);
      setError(err.message || t('xmai.processing_error'));
      setMessages(prev => [...prev, { role: 'assistant', content: err.message || t('xmai.processing_error') }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: t('xmai.greeting') }]);
    setInput('');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const togglePolicy = () => {
    setShowPolicy(!showPolicy);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-purple-900 text-white p-4 rounded-xl shadow-2xl relative">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            X-AI
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={togglePolicy}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            title={t('xmai.policy_button_title')}
          >
            <Shield className="w-5 h-5" />
          </button>
          <button
            onClick={clearChat}
            className="p-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
            title={t('xmai.clear_button_title')}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-black/20 rounded-lg border border-white/10 backdrop-blur-sm">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl max-w-full ${
              msg.role === 'user'
                ? 'bg-blue-600/30 self-end ml-auto'
                : 'bg-purple-600/30 self-start mr-auto'
            }`}
          >
            <div className="font-semibold mb-1">{msg.role === 'user' ? t('xmai.user_label') : t('xmai.ai_label')}</div>
            <div className="whitespace-pre-wrap break-words">{msg.content}</div>
            {msg.content.includes('[Прикреплен файл:') && (
              <div className="mt-2 flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>{t('xmai.attached_file')}</span>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
        {isLoading && (
          <div className="p-4 rounded-xl bg-purple-600/30 self-start mr-auto">
            <div className="font-semibold mb-1">{t('xmai.ai_label')}</div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/30 text-red-200 rounded-lg border border-red-500/50">
          {error}
        </div>
      )}

      {/* Модальное окно политики */}
      {showPolicy && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-white/10 rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={togglePolicy}
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">{t('xmai.policy.title')}</h3>
            <p className="text-slate-300 whitespace-pre-wrap">{t('xmai.policy.content')}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            disabled={isLoading || !!file}
          >
            <FileText className="w-5 h-5" />
            {file ? `${t('xmai.file_attached')}: ${file.name}` : t('xmai.attach_log')}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt"
            className="hidden"
          />
        </div>

        {file && (
          <div className="flex items-center justify-between p-2 bg-slate-800 rounded-md">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span className="text-sm truncate max-w-xs">{file.name}</span>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="text-red-400 hover:text-red-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('xmai.input_placeholder')}
            className="flex-1 p-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            rows={3}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-all shadow-lg disabled:opacity-50 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default XMAIHelp;