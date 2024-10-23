import { NextResponse } from 'next/server';
import prisma from '../../../libs/db';

// 학교 목록 조회 API
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    // 학교 조회 옵션
    const queryOptions = {
        where: {
            ...(name && {
                school_name: {
                    contains: name, // 부분 문자열 검색
                },
            }),
        },
    };

    try {
        const schools = await prisma.school.findMany(queryOptions);
        return NextResponse.json(schools);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "학교 조회 중 오류가 발생했습니다." }, { status: 500 });
    }
}

// 학교 추가 API
export async function POST(request) {
    const { school_name, address } = await request.json();

    // 필수 필드 체크
    if (!school_name) {
        return NextResponse.json({ success: false, error: "학교 이름은 필수입니다." }, { status: 400 });
    }

    if (!address) {
        return NextResponse.json({ success: false, error: "학교 주소는 필수입니다." }, { status: 400 });
    }

    try {
        // 새 학교 추가
        const newSchool = await prisma.school.create({
            data: {
                school_name,
                address,
            },
        });

        return NextResponse.json({ success: true, data: newSchool }, { status: 201 });
    } catch (error) {
        console.error('Error adding school:', error);
        return NextResponse.json({ success: false, error: "학교 추가 중 오류가 발생했습니다." }, { status: 500 });
    }
}