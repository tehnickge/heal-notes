import React from "react";

type SelectProps<T> = {
  options: T[];
  value: T | null;
  onChange: (value: T) => void;
  getOptionKey: (item: T) => string;
  getOptionValue: (item: T) => string;
  placeholder?: string;
};

const Select = <T extends unknown>({
  options,
  value,
  onChange,
  getOptionKey,
  getOptionValue,
  placeholder,
}: SelectProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = e.target.value;
    const selectedItem = options.find(
      (item) => getOptionKey(item) === selectedKey
    );
    if (selectedItem) {
      onChange(selectedItem);
    }
  };

  return (
    <select value={value ? getOptionKey(value) : ""} onChange={handleChange}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((item) => (
        <option key={getOptionKey(item)} value={getOptionKey(item)}>
          {getOptionValue(item)}
        </option>
      ))}
    </select>
  );
};

export default Select;
