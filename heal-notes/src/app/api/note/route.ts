import { getUserPayload } from "./../APIHelpers";
import { NextRequest, NextResponse } from "next/server";
import { getToken, handleValidationError } from "../APIHelpers";
import * as Yup from "yup";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/types/httpStatus";
import { createNoteSchema, getNoteSchema } from "./note.dto";
import { addDays, format } from "date-fns";
import { db } from "@/lib/drizzle/db";
import { notes } from "@/lib/drizzle/schema/notes";
import { and, eq, gte, lte } from "drizzle-orm";

export const POST = async (req: NextRequest) => {
  try {
    // получение данных от из тела запроса
    const body = await req.json();

    const token = await getToken(req);
    if (!token)
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_AUTHORIZED },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );

    const user = await getUserPayload(token);
    if (!user)
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_AUTHORIZED },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );

    const { id: currentUserId } = user;

    const { date, emotionRating, note, userFk, color } =
      await createNoteSchema.validate(body);

    if (currentUserId === userFk)
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_ARGUMENTS },
        { status: HTTP_STATUS.FORBIDDEN }
      );

    const formattedDate = format(new Date(date), "yyyy-MM-dd");

    // const checkNoteExistOnDate = await db
    //   .select()
    //   .from(notes)
    //   .where(
    //     and(eq(notes.date, formattedDate), eq(notes.userFk, currentUserId))
    //   )
    //   .limit(1);

    const checkNoteExistsOnDate = await db.query.notes.findFirst({
      where: and(
        eq(notes.date, formattedDate),
        eq(notes.userFk, currentUserId)
      ),
    });

    if (checkNoteExistsOnDate)
      return NextResponse.json(
        { error: ERROR_MESSAGES.CONFLICT },
        { status: HTTP_STATUS.CONFLICT }
      );

    return await db
      .insert(notes)
      .values({
        date: formattedDate,
        emotionRating,
        userFk,
        color,
        note,
      })
      .returning()
      .then((rows) => rows[0]);
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

export const GET = async (req: NextRequest) => {
  try {
    // получение данных от из тела запроса
    const body = await req.json();

    const token = await getToken(req);
    if (!token)
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_AUTHORIZED },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );

    const user = await getUserPayload(token);
    if (!user)
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_AUTHORIZED },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );

    const { id: currentUserId } = user;

    const { searchParams } = new URL(req.url);

    const userFk = searchParams.get("userFk");
    const dateStart = searchParams.get("dateStart");
    const dateEnd = searchParams.get("dateEnd");
    const validateDate = await getNoteSchema.validate({
      dateEnd,
      dateStart,
      userFk,
    });

    const formattedDateStart = format(validateDate.dateStart, "yyyy-MM-dd");

    if (validateDate.dateEnd) {
      const formattedDateEnd = format(validateDate.dateEnd, "yyyy-MM-dd");
      return await db.query.notes.findMany({
        where: and(
          gte(notes.date, formattedDateStart),
          lte(notes.date, formattedDateEnd),
          eq(notes.userFk, currentUserId)
        ),
      });
    }

    return await db.query.notes.findFirst({
      where: and(
        eq(notes.userFk, currentUserId),
        eq(notes.date, formattedDateStart)
      ),
    });
    
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
