import { DatePicker, DatePickerType } from "@mantine/dates";

interface BaseDatePickerProps<T extends DatePickerType> {
  type: T;
  allowSingleDateInRange?: boolean;
  defaultDate?: Date;
  onChange: (
    value: T extends "range" ? [Date | null, Date | null] : Date | null
  ) => void;
  value: T extends "range" ? [Date | null, Date | null] : Date | null;
}

const BaseDatePicker = <T extends DatePickerType>({
  type,
  allowSingleDateInRange,
  defaultDate = new Date(),
  onChange,
  value,
}: BaseDatePickerProps<T>) => {
  return (
    <DatePicker
      type={type}
      allowSingleDateInRange={allowSingleDateInRange as any}
      defaultDate={defaultDate}
      value={value as any}
      onChange={onChange as any}
    />
  );
};

export default BaseDatePicker;