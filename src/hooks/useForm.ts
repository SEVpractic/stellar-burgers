import { useState, ChangeEvent } from 'react';

type FormValues = Record<string, any>;

export function useForm<T extends FormValues = FormValues>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return { values, handleChange, setValues };
}
