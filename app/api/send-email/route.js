// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    console.log('API 호출됨');
    
    const body = await request.json();
    console.log('받은 데이터:', body);
    
    const { email, message } = body;

    // 입력 검증
    console.log('이메일:', email, '메시지:', message);
    
    if (!email || !message) {
      console.log('검증 실패: 빈 값 발견');
      return NextResponse.json(
        { error: '이메일과 메시지를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // Resend API 키 확인
    console.log('Resend API 키 확인:', {
      apiKey: process.env.RESEND_API_KEY ? '설정됨' : '없음'
    });

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Resend API 키가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    // 이메일 발송
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [process.env.ADMIN_EMAIL || 'pbb2000y@gmail.com'], // 관리자 이메일로 발송
      subject: '코인 요청 확인',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #f97316; text-align: center;">새로운 코인 요청이 접수되었습니다</h2>
          <p>안녕하세요!</p>
          <p>다음과 같이 코인 요청이 접수되었습니다:</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
            <p><strong>📧 요청자 이메일:</strong> ${email}</p>
            <p><strong>🪙 요청 코인 수:</strong> ${message}</p>
            <p><strong>⏰ 요청 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
          </div>
          <div style="background-color: #fee2e2; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #dc2626; margin: 0;"><strong>⚠️ 참고:</strong> 이 이메일은 관리자(${process.env.ADMIN_EMAIL || 'pbb2000y@gmail.com'})에게 발송되었습니다.</p>
            <p style="color: #dc2626; margin: 5px 0 0 0; font-size: 14px;">실제 서비스에서는 요청자에게 직접 발송됩니다.</p>
          </div>
          <p>요청을 검토한 후 요청자에게 별도로 연락하시기 바랍니다.</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
            <p>감사합니다.</p>
            <p style="font-size: 12px;">이 메일은 자동으로 발송된 메일입니다.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend 에러:', error);
      return NextResponse.json(
        { error: '이메일 발송 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    console.log('이메일 발송 성공:', data);
    return NextResponse.json(
      { message: '이메일이 성공적으로 발송되었습니다.', emailId: data.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('API 에러:', error);
    return NextResponse.json(
      { error: '처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}