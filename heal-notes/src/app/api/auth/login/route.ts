import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as Yup from "yup";
import jwt from "jsonwebtoken";

import { handleValidationError } from "../../APIHelpers";
import { userLoginSchema } from "./login.dto";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/types/httpStatus";
import { UserJWT } from "@/types/user";
import { eq } from "drizzle-orm";
import { users } from "@/lib/drizzle/schema/user";
import { db } from "@/lib/drizzle/db";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { username, password } = await userLoginSchema.validate(body, {
      abortEarly: false,
    });

    // Получение пользователя по username
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    const currentUser = userResult[0];

    if (!currentUser) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_ARGUMENTS },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const passwordMatch = await bcrypt.compare(password, currentUser.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_ARGUMENTS },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const userJWT: UserJWT = {
      id: currentUser.id,
      username: currentUser.username,
      name: currentUser.name,
      secondname: currentUser.secondname,
    };

    const JWTToken = jwt.sign(userJWT, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(userJWT, { status: HTTP_STATUS.OK });
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
