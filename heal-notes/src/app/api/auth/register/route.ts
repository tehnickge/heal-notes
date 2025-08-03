import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as Yup from "yup";
import prisma from "@/lib/prisma";
import { userRegistrationSchema } from "./register.dto";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/types/httpStatus";
import { handleValidationError } from "../../APIHelpers";

// Проверка наличия пользователя в базе данных
const checkUsernameExists = async (username: string): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  return Boolean(user); // возвращает true, если найден хотя бы один пользователь с таким username
};

// Основная функция обработки запроса
export async function POST(req: Request) {
  try {
    const user = await req.json();
    // Валидация входящих данных
    const validatedUser = await userRegistrationSchema.validate(user, {
      abortEarly: false,
    });
    const { name, username, secondname } = validatedUser;

    // Проверка существования имени пользователя и почты
    if (await checkUsernameExists(validatedUser.username)) {
      return NextResponse.json(
        {
          error: ERROR_MESSAGES.NAME_EXISTS,
        },
        { status: HTTP_STATUS.FORBIDDEN }
      );
    }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(
      validatedUser.password,
      Number(process.env.BCRYPT_SALT)
    );

    // Создание нового пользователя
    const createdUser = await prisma.user.create({
      data: {
        name,
        username,
        secondname,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = createdUser;

    return NextResponse.json(
      {
        ...userWithoutPassword,
      },
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return handleValidationError(error);
    }
    return NextResponse.json(
      { error: ERROR_MESSAGES.UNEXPECTED_ERROR },
      { status: HTTP_STATUS.SERVER_ERROR }
    );
  }
}
