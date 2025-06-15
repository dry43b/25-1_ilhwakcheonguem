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
    <div>

      <main >
        <form id="infoForm" onSubmit={handleSubmit}>
          <h2>이메일과 코인갯수를 입력해주세요.</h2>
          <h4>이메일 확인에 시간이 걸릴 수 있습니다.</h4>
          
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 입력"
            required
          />
          
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="받을 코인 갯수 입력"
            required
          />
          
          <button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? '전송 중...' : '보내기'}
          </button>
          
          {submitStatus === 'success' && (
            <div>이메일 전송 완료!</div>
          )}
          
          {submitStatus === 'error' && (
            <div>이메일 전송 실패!</div>
          )}
        </form>
      </main>
    </div>
  );
}