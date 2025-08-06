import jwt from "jsonwebtoken";
import * as Yup from "yup";
import { HTTP_STATUS } from "@/types/httpStatus";
import { NextRequest, NextResponse } from "next/server";
import { UserJWT } from "@/types/user";

export const handleValidationError = (error: Yup.ValidationError) => {
  return NextResponse.json(
    { error: error.errors },
    { status: HTTP_STATUS.BAD_REQUEST }
  );
};

export const getToken = async (req: NextRequest): Promise<string | null> => {
  const token =
    req.cookies.get("jwt_token")?.value ||
    req.headers.get("Authorization")?.split(" ")[1];

  return token ? token : null;
};

export const getUserPayload = async (
  token: string
): Promise<UserJWT | null> => {
  try {
    const { id, username, name, secondname } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as UserJWT;

    return { id, username, name, secondname };
  } catch (error) {
    console.warn("Invalid or expired JWT:", error);
    return null;
  }
};
