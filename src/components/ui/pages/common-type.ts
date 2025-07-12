import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

export type PageUIProps = {
  errorText: string | undefined;
  email: string;
  setEmail: (val: string) => void;
  handleSubmit: (e: SyntheticEvent) => void;
};
