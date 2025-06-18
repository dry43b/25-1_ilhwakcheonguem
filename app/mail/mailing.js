// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, message } = req.body;

    // Log received request (for debugging)
    console.log('Received request:', { email, message });

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'a59603712@gmail.com',
        pass: 'jxep ewul dzjp ycob', // Note: Better to use environment variables in production
      },
    });

    // Configure email options
    const mailOptions = {
      from: 'a59603712@gmail.com',
      to: email,
      subject: '입력하신 정보입니다',
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    
    // Return success response
    res.status(200).json({ message: '이메일 전송 성공' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: '이메일 전송 실패' });
  }
}