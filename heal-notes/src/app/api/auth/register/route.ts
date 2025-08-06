import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as Yup from "yup";

import { userRegistrationSchema } from "./register.dto";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/types/httpStatus";
import { handleValidationError } from "../../APIHelpers";
import { db } from "@/lib/drizzle/db";
import { users } from "@/lib/drizzle/schema/user";
import { eq } from "drizzle-orm";

// Проверка наличия пользователя по username
const checkUsernameExists = async (username: string): Promise<boolean> => {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  return existingUser.length > 0;
};

// Основная функция регистрации
export async function POST(req: Request) {
  try {
    const user = await req.json();

    const validatedUser = await userRegistrationSchema.validate(user, {
      abortEarly: false,
    });

    const { name, username, secondname, password } = validatedUser;

    if (await checkUsernameExists(username)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NAME_EXISTS },
        { status: HTTP_STATUS.FORBIDDEN }
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT)
    );

    // Добавление пользователя в базу данных
    const insertResult = await db
      .insert(users)
      .values({
        name,
        username,
        secondname,
        password: hashedPassword,
      })
      .returning(); // Вернёт созданного пользователя

    const [createdUser] = insertResult;

    if (!createdUser) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.CONFLICT },
        { status: HTTP_STATUS.CONFLICT }
      );
    }

    const { password: _pw, ...userWithoutPassword } = createdUser;

    return NextResponse.json(userWithoutPassword, {
      status: HTTP_STATUS.OK,
    });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return handleValidationError(error);
    }

    console.error("Ошибка при регистрации:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.UNEXPECTED_ERROR },
      { status: HTTP_STATUS.SERVER_ERROR }
    );
  }
}
