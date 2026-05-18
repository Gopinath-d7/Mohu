import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Missing token or password parameters." }, { status: 400 });
    }

    // 1. Verify token exists and check if it's still active
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken || resetToken.expires < new Date()) {
      return NextResponse.json({ error: "Reset link has expired or is invalid." }, { status: 400 });
    }

    // 2. Hash new string password array
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Perform a safe transactional update (Update user password and delete old token record)
    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.delete({
        where: { id: resetToken.id },
      }),
    ]);

    return NextResponse.json({ message: "Password updated successfully!" });
  } catch (err: any) {
    return NextResponse.json({ error: "Internal update failure" }, { status: 500 });
  }
}