import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  registerUserAsync,
  userSelectors
} from '../../services/slices/UserSlice';
import { useForm } from '../../hooks/useForm';
import { TRegisterData } from '@api';

const initialRegisterData: TRegisterData = {
  email: '',
  name: '',
  password: ''
};

export const Register: FC = () => {
  const dispatch = useDispatch();
  const {
    values: registerData,
    handleChange: handleInput,
    setValues: setRegisterData
  } = useForm(initialRegisterData);
  const [errorText, setErrorText] = useState('');
  const error = useSelector(userSelectors.selectError);

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

  return (
    <RegisterUI
      errorText={errorText ? errorText : ''}
      email={registerData.email}
      userName={registerData.name}
      password={registerData.password}
      setEmail={handleInput}
      setPassword={handleInput}
      setUserName={handleInput}
      handleSubmit={handleSubmit}
    />
  );
};
