import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { TLoginData } from '@api';
import { loginUserAsync } from '../../services/slices/UserSlice';

const initLoginData: TLoginData = {
  email: '',
  password: ''
};

export const Login: FC = () => {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState(initLoginData);
  const [errorText, setErrorText] = useState('');

  const { error } = useSelector((state) => state.userReducer);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUserAsync(loginData));
  };

  const handleInput = (key: keyof TLoginData, val: string) => {
    setErrorText('');
    setLoginData((prev) => ({
      ...prev,
      [key]: val
    }));
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
      setEmail={(val) => handleInput('email', val)}
      password={loginData.password}
      setPassword={(val) => handleInput('password', val)}
      handleSubmit={handleSubmit}
    />
  );
};
