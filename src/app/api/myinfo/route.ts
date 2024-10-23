import { NextResponse } from 'next/server';
import prisma from '../../../libs/db'; // Prisma 클라이언트 임포트

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userid');
    const schoolId = searchParams.get('schoolid');

    if (!userId || !schoolId) {
        return NextResponse.json({ error: 'User ID and School ID are required' }, { status: 400 });
    }

    try {
        const userInfo = await prisma.member.findFirst({
            where: {
                mem_userid: userId,
                mem_school_id: parseInt(schoolId),
            },
            select: {
                mem_userid: true,
                mem_nickname: true,
                mem_school_id: true,
                mem_grade: true,
                mem_class: true,
                mem_number: true,
                mem_is_role: true,
                mem_teacher_number: true, 
                school: {
                    select: {
                        school_name: true
                    }
                }
            }
        });

        if (!userInfo) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const responseData = {
            ...userInfo,
            school_name: userInfo.school?.school_name
        };

        delete responseData.school;  // 중첩된 school 객체 제거

        return NextResponse.json(userInfo);
    } catch (error) {
        console.error('Error fetching user info:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// pages/api/myinfo/update.js
export async function POST(request) {
    const { userid, nickname, gradeClass, grade } = await request.json();

    try {
        const updatedMember = await prisma.member.update({
            where: { mem_userid: userid },
            data: {
                mem_nickname: nickname,
                mem_grade: grade,
                mem_class: gradeClass,
            },
        });

        return NextResponse.json(updatedMember);
    } catch (error) {
        console.error('Error updating member:', error);
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

