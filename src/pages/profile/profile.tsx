import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { TUser } from '@utils-types';
import { updateUserAsync } from '../../services/slices/UserSlice';
import { useForm } from '../../hooks/useForm';

const initUser: TUser & { password: string } = {
  email: '',
  name: '',
  password: ''
};

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  const {
    values: formValue,
    handleChange: setFormValue,
    setValues: setFormData
  } = useForm(initUser);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      name: user?.name ?? '',
      email: user?.email ?? ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserAsync(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormData(initUser);
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={setFormValue}
    />
  );
};
