import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUserAsync } from '../../services/slices/UserSlise';
import { useNavigate } from 'react-router-dom';
import { TRegisterData } from '@api';

const initialRegisterData: TRegisterData = {
  email: '',
  name: '',
  password: ''
};

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorText, setErrorText] = useState('');
  const [registerData, setRegisterData] = useState(initialRegisterData);

  const { error } = useSelector((state) => state.userReducer);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(registerUserAsync(registerData));
  };

  useEffect(() => {
    let formattedErrorText = '';

    switch (error) {
      case null:
        break;
      case 'User already exists':
        formattedErrorText = 'Пользователь уже существует';
        break;
      default:
        formattedErrorText = 'Ошибка регистрации';
    }
    formattedErrorText && setErrorText(formattedErrorText);
  }, [error]);

  const handleInput = (key: keyof TRegisterData, val: string) => {
    setErrorText('');
    setRegisterData((prev) => ({
      ...prev,
      [key]: val
    }));
  };

  return (
    <RegisterUI
      errorText={errorText ? errorText : ''}
      email={registerData.email}
      userName={registerData.name}
      password={registerData.password}
      setEmail={(val) => handleInput('email', val)}
      setPassword={(val) => handleInput('password', val)}
      setUserName={(val) => handleInput('name', val)}
      handleSubmit={handleSubmit}
    />
  );
};
