"use client";

import { useState } from 'react';
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');
    
    // 보내는 데이터 확인
    const emailData = {
      email: user.emailAddresses[0].emailAddress,
      message: message
    };
    console.log('보내는 데이터:', emailData);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      console.log('응답 상태:', response.status);
      console.log('응답 헤더:', response.headers.get("content-type"));

      // 응답이 JSON인지 확인
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("서버에서 올바르지 않은 응답을 받았습니다.");
      }

      const result = await response.json();
      console.log('응답 데이터:', result);

      if (response.ok) {
        setSubmitStatus('success');
        setMessage('');
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || '알 수 없는 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('네트워크 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 로딩 중일 때
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 로그인하지 않은 경우
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <main className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">로그인이 필요합니다</h2>
            <p className="text-gray-600 mb-6">코인 요청을 위해 먼저 로그인해주세요.</p>
            <SignInButton mode="modal">
              <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                로그인
              </button>
            </SignInButton>
          </div>
        </main>
      </div>
    );
  }

  // 로그인한 경우 메인 폼
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <main className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          {/* 사용자 정보 표시 */}
          <div className="text-center mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center justify-center space-x-4">
              <img 
                src={user.imageUrl} 
                alt="프로필" 
                className="w-12 h-12 rounded-full"
              />
              <div className="text-left">
                <p className="font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  {user.emailAddresses[0].emailAddress}
                </p>
              </div>
            </div>
            <SignOutButton>
              <button className="mt-3 text-sm text-gray-500 hover:text-gray-700">
                로그아웃
              </button>
            </SignOutButton>
          </div>

          <form id="infoForm" onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">코인갯수를 입력해주세요</h2>
              <h4 className="text-gray-600">이메일 확인에 시간이 걸릴 수 있습니다.</h4>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                받을 코인 갯수
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="받을 코인 갯수 입력"
                rows="4"
                className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-colors resize-none"
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? '전송 중...' : '보내기'}
            </button>
            
            {submitStatus === 'success' && (
              <div className="text-center p-4 bg-green-100 text-green-700 rounded-lg">
                ✅ 이메일 전송 완료!
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg">
                ❌ 이메일 전송 실패!
                {errorMessage && (
                  <div className="text-sm mt-2">{errorMessage}</div>
                )}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}