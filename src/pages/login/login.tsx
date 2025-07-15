import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { TLoginData } from '@api';
import { loginUserAsync } from '../../services/slices/UserSlice';
import { useForm } from '../../hooks/useForm';

const initLoginData: TLoginData = {
  email: '',
  password: ''
};

export const Login: FC = () => {
  const dispatch = useDispatch();

  const {
    values: loginData,
    handleChange: handleInput,
    setValues: setLoginData
  } = useForm(initLoginData);

  const [errorText, setErrorText] = useState('');

  const { error } = useSelector((state) => state.userReducer);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUserAsync(loginData));
  };

  useEffect(() => {
    let formattedErrorText = '';
    switch (error) {
      case null:
        break;
      case 'email or password are incorrect':
        formattedErrorText = 'Email или пароль введены неверно';
        break;
      default:
        formattedErrorText = 'Ошибка авторизации';
    }
    formattedErrorText && setErrorText(formattedErrorText);
  }, [error]);

  return (
    <LoginUI
      errorText={errorText}
      email={loginData.email}
      setEmail={handleInput}
      password={loginData.password}
      setPassword={handleInput}
      handleSubmit={handleSubmit}
    />
  );
};
