import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/UserSlice';

export const AppHeader: FC = () => {
  const user = useSelector(userSelectors.selectUser);
  return <AppHeaderUI userName={user?.name} />;
};
