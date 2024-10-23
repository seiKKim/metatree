import { NextResponse } from 'next/server';
import prisma from "../../../libs/db";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get('userid');
    // 사용자 조회
    try {
        if (userid) {
            const existingUser = await prisma.Member.findUnique({
                where: {
                    mem_userid: userid // mem_userid로 고유 사용자 조회
                }
            });
            if (existingUser) {
                return NextResponse.json({ error: '아이디가 이미 존재합니다.' }, { status: 409 });
            } else {
                return NextResponse.json({ message: '아이디 사용 가능.' });
            }
        } else {
            return NextResponse.json({ error: '아이디를 제공해야 합니다.' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error checking duplicate userid:', error);
        return NextResponse.json({ error: '아이디 확인 실패' }, { status: 500 });
    }
}

// 사용자 정보 수정
export async function PUT(request) {
    const body = await request.json(); // 요청 본문을 파싱합니다.
    const { uid, mem_userid, ...updateData } = body; // uid, mem_userid와 나머지 업데이트할 데이터를 분리합니다.

    try {
        // mem_userid가 존재할 경우 중복 확인
        if (mem_userid) {
            const existingUser = await prisma.Member.findUnique({
                where: {
                    mem_userid: mem_userid
                }
            });

            // 현재 사용자가 수정하려는 아이디가 기존의 아이디와 다른 경우
            if (existingUser && existingUser.mem_id !== uid) {
                return NextResponse.json({ error: '아이디가 이미 존재합니다.' }, { status: 409 });
            }
        }

        // 사용자 정보 업데이트
        const updatedUser = await prisma.Member.update({
            where: { mem_id: uid }, // uid를 mem_id로 변경
            data: {
                mem_userid, // 새로운 아이디
                ...updateData, // 나머지 데이터로 업데이트
            },
        });

        return NextResponse.json(updatedUser); // 업데이트된 사용자 정보 반환
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: '사용자 정보 수정 실패' }, { status: 500 });
    }
}

