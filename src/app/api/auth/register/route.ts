import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { 
      userid, password, name, nickname, schoolId,
      grade, class: class_, number, teachernumber, role, email 
    } = await request.json();

    // 필수 필드 검증
    if (!userid || !password || !email) {
      return NextResponse.json({ success: false, message: '필수 정보가 누락되었습니다.' }, { status: 400 });
    }

    // 아이디 중복 체크
    const existingUser = await prisma.member.findFirst({
      where: {
        mem_userid: userid,
        mem_school_id: parseInt(schoolId)
      }
    });

    if (existingUser) {
      return NextResponse.json({ success: false, message: '이미 사용 중인 아이디입니다.' }, { status: 400 });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새 회원 생성
    const newMember = await prisma.member.create({
      data: {
        mem_userid: userid,
        mem_password: hashedPassword,
        mem_username: name,
        mem_nickname: nickname,
        mem_email: email,
        mem_school_id: parseInt(schoolId),
        mem_grade: grade.toString(), // 문자열로 변환
        mem_class: class_,
        mem_number: number,
        mem_teacher_number: teachernumber,
        mem_is_role: role,
        mem_register_ip: request.headers.get('x-forwarded-for') || request.ip
      }
    });

    return NextResponse.json({ success: true, message: '회원가입이 완료되었습니다.' });

  } catch (error) {
    console.error('회원가입 오류:', error);
    return NextResponse.json({ success: false, message: '회원가입 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
