// utils/verificationUtils.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function generateVerificationCode(email: string): Promise<string> {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5분 후

  await prisma.mailAuth.upsert({
    where: { email: email },
    update: { code: code, expiresAt: expiresAt },
    create: { email: email, code: code, expiresAt: expiresAt },
  });

  return code;
}

export async function verifyCode(email: string, code: string): Promise<boolean> {
  const storedAuth = await prisma.mailAuth.findUnique({
    where: { email: email },
  });

  if (!storedAuth) return false;
  if (new Date() > storedAuth.expiresAt) {
    await prisma.mailAuth.delete({ where: { email: email } });
    return false;
  }
  if (storedAuth.code === code) {
    await prisma.mailAuth.delete({ where: { email: email } });
    return true;
  }
  return false;
}

  