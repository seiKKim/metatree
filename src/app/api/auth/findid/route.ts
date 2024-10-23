import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const { username, email } = await request.json();

  if (!username || !email) {
    return NextResponse.json(
      { success: false, message: "이름과 이메일을 모두 입력해주세요." },
      { status: 400 }
    );
  }

  try {
    // 사용자 검색
    const user = await prisma.member.findFirst({
      where: {
        mem_username: username, // 이름 조건
        mem_email: email,       // 이메일 조건
      },
      select: {
        mem_userid: true, // 필요한 필드 선택 (아이디)
      }
    });

    if (user) {
      return NextResponse.json(
        { success: true, id: user.mem_userid },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "해당하는 아이디를 찾을 수 없습니다." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("아이디 찾기 오류:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
