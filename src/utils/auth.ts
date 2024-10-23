import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        mem_userid: { label: "아이디", type: "text" },
        mem_password: { label: "비밀번호", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.mem_userid || !credentials?.mem_password) {
          throw new Error("모든 필드를 입력해주세요.");
        }

        const member = await prisma.member.findFirst({
          where: { 
            AND: [
              { mem_userid: credentials.mem_userid },
            ]
          },
        });
      
        if (!member) {
          throw new Error("사용자를 찾을 수 없습니다.");
        }

        const isPasswordValid = await bcrypt.compare(credentials.mem_password, member.mem_password);

        if (!isPasswordValid) {
          throw new Error("비밀번호가 올바르지 않습니다.");
        }
      
        return {
            mem_id: member.mem_id,
            id: member.mem_id.toString(),
            mem_userid: member.mem_userid,
            mem_username: member.mem_username,
            mem_nickname: member.mem_nickname,
            mem_email: member.mem_email,
            mem_school_id: member.mem_school_id,
            mem_is_role: member.mem_is_role,
            school_name: member.mem_schoolname,
            mem_teacher_number: member.mem_teacher_number || null, // 여기를 수정
            mem_grade: member.mem_grade, // 학년 추가
            mem_class: member.mem_class  // 반 추가
          };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.mem_userid = user.mem_userid;
        token.mem_username = user.mem_username;
        token.mem_nickname = user.mem_nickname;
        token.mem_email = user.mem_email;
        token.mem_school_id = user.mem_school_id;
        token.mem_is_role = user.mem_is_role;
        token.mem_teacher_number = user.mem_teacher_number || null; // 여기도 수정
        token.mem_grade = user.mem_grade; // 학년 추가
        token.mem_class = user.mem_class; // 반 추가
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          mem_userid: token.mem_userid,
          mem_username: token.mem_username,
          mem_nickname: token.mem_nickname,
          mem_email: token.mem_email,
          mem_school_id: token.mem_school_id,
          mem_is_role: token.mem_is_role,
          school_name: token.school_name,
          mem_teacher_number: token.mem_teacher_number || null,
          mem_grade: token.mem_grade, // 학년 추가
          mem_class: token.mem_class // 반 추가
        }
      }
    }     
  }
};
