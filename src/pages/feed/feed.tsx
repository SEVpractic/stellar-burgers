import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feedSelectors, getFeedsAsync } from '../../services/slices/FeedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(feedSelectors.selectOrders);
  const loading = useSelector(feedSelectors.selectLoading);

  useEffect(() => {
    dispatch(getFeedsAsync());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedsAsync());
      }}
    />
  );
};
