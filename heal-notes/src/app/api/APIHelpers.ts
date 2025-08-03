import * as Yup from "yup";
import { HTTP_STATUS } from "@/types/httpStatus";
import { NextResponse } from "next/server";

export const handleValidationError = (error: Yup.ValidationError) => {
  return NextResponse.json(
    { error: error.errors },
    { status: HTTP_STATUS.BAD_REQUEST }
  );
};
