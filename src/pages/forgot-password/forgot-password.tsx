import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

const initForgotPassword: { email: string } = {
  email: ''
};

export const ForgotPassword: FC = () => {
  const {
    values: data,
    handleChange: handleInput,
    setValues: setEmail
  } = useForm(initForgotPassword);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError(null);
    forgotPasswordApi(data)
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setError(err));
  };

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={data.email}
      setEmail={handleInput}
      handleSubmit={handleSubmit}
    />
  );
};
