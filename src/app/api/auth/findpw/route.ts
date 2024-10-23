// /api/auth/findpw.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const { userid, email } = await request.json();

  if (!userid || !email) {
    return NextResponse.json(
      { success: false, message: "아이디와 이메일을 입력해주세요." },
      { status: 400 }
    );
  }

  try {
    // 사용자 검색
    const user = await prisma.member.findUnique({
      where: { 
        mem_userid: userid,
        mem_email: email 
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "해당 아이디와 이메일에 대한 사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 사용자가 존재하면 성공 응답
    return NextResponse.json(
      { success: true, message: "사용자를 찾았습니다." },
      { status: 200 }
    );

  } catch (error) {
    console.error("비밀번호 찾기 오류:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
