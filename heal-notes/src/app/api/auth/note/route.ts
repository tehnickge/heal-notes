import { NextRequest, NextResponse } from "next/server";
import { handleValidationError } from "../../APIHelpers";
import * as Yup from "yup";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/types/httpStatus";

export const POST = async (req: NextRequest) => {
  try {
    // получение данных от из тела запроса
    const body = await req.json();
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return handleValidationError(error);
    }
  
    return NextResponse.json(
      { error: ERROR_MESSAGES.UNEXPECTED_ERROR },
      { status: HTTP_STATUS.SERVER_ERROR }
    );
  }
};
