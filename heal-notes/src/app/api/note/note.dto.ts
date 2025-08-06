import * as Yup from "yup";
export const createNoteSchema: Yup.Schema<createNote> = Yup.object().shape({
  emotionRating: Yup.number()
    .required("Name is required")
    .min(0.5, "Name must be at least 0.5 characters")
    .max(5, "Name must be less than 5 characters"),
  date: Yup.date().required("date is required"),
  note: Yup.string().required("note is required"),
  color: Yup.string().optional(),
  userFk: Yup.string().required("User id is required"),
});

export type createNote = {
  emotionRating: number;
  date: Date;
  note: string;
  color?: string;
  userFk: string;
};

export const getNoteSchema: Yup.Schema<getNote> = Yup.object().shape({
  dateStart: Yup.date().required("dateStart is required"),
  dateEnd: Yup.date().optional(),
  userFk: Yup.string().required("user id is required"),
});

export type getNote = {
  dateStart: Date;
  dateEnd?: Date;
  userFk: string;
};
