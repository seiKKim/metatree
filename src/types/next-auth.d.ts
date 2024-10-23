import NextAuth from 'next-auth/next';
import { module } from './../../.next/static/webpack/app/dashboard/page.c814c9de254da81c.hot-update';

declare module "next-auth" {
    interface User {
        mem_id: number;
        mem_userid: string;
        mem_username?: string | null;
        mem_nickname?: string | null;
        mem_email?: string | null;
        mem_grade?: string | null;
        mem_class?: string | null;
        mem_school_id?: number | null;
        mem_is_role?: string | null;
        school_name?: string;
        mem_teacher_number?: string; // 여기에 교원번호 추가
      }
    interface Session {
        user: User & {
            mem_id: string;
            mem_userid: string;
            mem_username?: string;
            mem_nickname?: string;
            mem_grade?: string;
            mem_class?: string;
            mem_email?: string;
            mem_school_id?: number;
            mem_is_role?: string;
            mem_teacher_number?: string; // 여기에 교원번호 추가
        }
        token: {
            mem_id: string;
            mem_userid: string;
            mem_username?: string;
            mem_nickname?: string;
            mem_grade?: string;
            mem_class?: string;
            mem_email?: string;
            mem_school_id?: number;
            mem_is_role?: string;
            mem_teacher_number?: string; // 여기에 교원번호 추가
        }
    }
}