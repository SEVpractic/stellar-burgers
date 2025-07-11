import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { checkUserAuthAsync } from '../../services/slices/UserSlise';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const { user, isAuthChecked } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(checkUserAuthAsync());
    }
  }, [dispatch, isAuthChecked]);

  if (!isAuthChecked) return <Preloader />;

  if (!onlyUnAuth && !user)
    return <Navigate to='/login' state={{ from: location }} />;

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
