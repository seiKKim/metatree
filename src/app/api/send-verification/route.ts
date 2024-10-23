import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  const { email } = await request.json();
  const verificationCode = generateVerificationCode();
  const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10분 후 만료

  try {
    // 기존 인증 코드가 있다면 삭제
    await prisma.mailAuth.deleteMany({
      where: { email: email },
    });

    // 새 인증 코드 저장
    await prisma.mailAuth.create({
      data: {
        email: email,
        code: verificationCode,
        expiresAt: expirationTime,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '이메일 인증 코드',
      text: `귀하의 인증 코드는 ${verificationCode} 입니다. 이 코드는 10분 후에 만료됩니다.`
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: '인증 코드가 이메일로 전송되었습니다.' });
  } catch (error) {
    console.error('이메일 전송 실패:', error);
    return NextResponse.json({ success: false, message: '이메일 전송 실패' }, { status: 500 });
  }
}
