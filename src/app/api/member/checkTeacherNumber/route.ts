import { NextResponse } from 'next/server';
import prisma from "../../../../libs/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const teacherNumber = searchParams.get('teacherNumber');

  if (!teacherNumber) {
    return NextResponse.json({ error: "교원번호가 제공되지 않았습니다." }, { status: 400 });
  }

  try {
    const existingTeacher = await prisma.member.findFirst({
      where: {
        mem_teacher_number: teacherNumber
      }
    });

    if (existingTeacher) {
      return NextResponse.json({ error: "이미 사용 중인 교원번호입니다." }, { status: 400 });
    }

    return NextResponse.json({ message: "사용 가능한 교원번호입니다." }, { status: 200 });
  } catch (error) {
    console.error("교원번호 중복 체크 중 오류 발생:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
