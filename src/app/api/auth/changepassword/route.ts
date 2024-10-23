// /api/auth/changepassword.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'; // 비밀번호 해싱을 위한 bcrypt

const prisma = new PrismaClient();

export async function POST(request) {
  const { userid, newPassword } = await request.json();

  if (!userid || !newPassword) {
    return NextResponse.json(
      { success: false, message: "아이디와 새 비밀번호를 입력해주세요." },
      { status: 400 }
    );
  }

  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 비밀번호 업데이트
    await prisma.member.update({
      where: { mem_userid: userid },
      data: { mem_password: hashedPassword },
    });

    return NextResponse.json(
      { success: true, message: "비밀번호가 성공적으로 변경되었습니다." },
      { status: 200 }
    );

  } catch (error) {
    console.error("비밀번호 변경 오류:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
