"use client";

import { useState } from 'react';
import Head from 'next/head';

export const runtime = 'edge'

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
        setMessage('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <main className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <form id="infoForm" onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">이메일과 코인갯수를 입력해주세요.</h2>
              <h4 className="text-gray-600">이메일 확인에 시간이 걸릴 수 있습니다.</h4>
            </div>
            
            <div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 입력"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-theme-orange)] focus:border-transparent outline-none transition-colors"
                required
              />
            </div>
            
            <div>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="받을 코인 갯수 입력"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-theme-orange)] focus:border-transparent outline-none transition-colors resize-none"
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--color-button-orange)] text-white py-3 px-4 rounded-lg font-medium hover:bg-[var(--color-theme-orange)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? '전송 중...' : '보내기'}
            </button>
            
            {submitStatus === 'success' && (
              <div className="text-center p-4 bg-green-100 text-green-700 rounded-lg">이메일 전송 완료!</div>
            )}
            
            {submitStatus === 'error' && (
              <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg">이메일 전송 실패!</div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}