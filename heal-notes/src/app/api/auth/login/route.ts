import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as Yup from "yup";
import { handleValidationError } from "../../APIHelpers";
import jwt from "jsonwebtoken";
import { userLoginSchema } from "./login.dto";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/types/httpStatus";
import { UserJWT } from "@/types/user";

export const POST = async (req: NextRequest) => {
  try {
    // получение данных от из тела запроса
    const body = await req.json();
    // валидация данных
    const { password, username } = await userLoginSchema.validate(body, {
      abortEarly: false,
    });
    // получение юзера по email или username
    const currentUser = await prisma.user.findUnique({ where: { username } });

    if (!currentUser) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_ARGUMENTS },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }
    // сравнение пароля из базы, который представлен ввиде hash`а с паролем который был передан
    const comparePassword = await bcrypt.compare(
      password,
      currentUser.password
    );

    if (!comparePassword) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_ARGUMENTS },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }
    // заполняем payload для jwt token
    const userJWT: UserJWT = {
      id: currentUser.id,
      username: currentUser.username,
      name: currentUser.name,
      secondname: currentUser.secondname,
    };
    // создаем новую подпись
    const JWTToken = jwt.sign(userJWT, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    // создание ответа
    const response = NextResponse.json(userJWT, { status: HTTP_STATUS.OK });
    // уставнавливаем jwt в coockies
    response.cookies.set("jwt_token", JWTToken, { httpOnly: true, path: "/" });
    return response;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return handleValidationError(error);
    }
    console.error("Ошибка при авторизации:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.UNEXPECTED_ERROR },
      { status: HTTP_STATUS.SERVER_ERROR }
    );
  }
};
