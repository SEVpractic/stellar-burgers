import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUsersOrdersAsync } from '../../services/slices/OrderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { userOrders } = useSelector((state) => state.orderReducer);

  useEffect(() => {
    dispatch(getUsersOrdersAsync());
  }, [dispatch]);

  return <ProfileOrdersUI orders={userOrders} />;
};
