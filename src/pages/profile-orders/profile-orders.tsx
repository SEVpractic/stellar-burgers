import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUsersOrdersAsync,
  orderSelectors
} from '../../services/slices/OrderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const userOrders = useSelector(orderSelectors.selectUserOrders);

  useEffect(() => {
    dispatch(getUsersOrdersAsync());
  }, [dispatch]);

  return <ProfileOrdersUI orders={userOrders} />;
};
