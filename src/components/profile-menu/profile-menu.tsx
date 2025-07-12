import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUserAsync } from '../../services/slices/UserSlise';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUserAsync());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
