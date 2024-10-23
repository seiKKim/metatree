import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, code } = await request.json();

  try {
    // 데이터베이스에서 해당 이메일의 인증 정보를 찾음
    const mailAuth = await prisma.mailAuth.findUnique({
      where: { email: email }
    });

    // 인증 정보가 없거나, 코드가 일치하지 않거나, 만료되었을 경우
    if (!mailAuth || mailAuth.code !== code || mailAuth.expiresAt < new Date()) {
      return NextResponse.json({ success: false, message: '유효하지 않은 인증 코드입니다.' }, { status: 400 });
    }

    // 이메일로 회원 찾기
    const member = await prisma.member.findFirst({
      where: { mem_email: email }
    });

    if (!member) {
      return NextResponse.json({ success: false, message: '해당 이메일의 회원을 찾을 수 없습니다.' }, { status: 400 });
    }

    // 회원 정보 업데이트
    await prisma.member.update({
      where: { mem_id: member.mem_id },
      data: { mem_email_cert: true }
    });

    // 인증 정보 삭제
    await prisma.mailAuth.delete({
      where: { email: email }
    });

    return NextResponse.json({ success: true, message: '이메일 인증이 완료되었습니다.' });
  } catch (error) {
    console.error('인증 확인 실패:', error);
    return NextResponse.json({ success: false, message: '인증 확인 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
