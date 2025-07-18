import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  createOrderAsync,
  orderActions,
  orderSelectors
} from '../../services/slices/OrderSlice';
import { clearConstructor } from '../../services/slices/ConstructorSlice';
import { userSelectors } from '../../services/slices/UserSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.selectUser);
  const constructorItems = useSelector((state) => state.constructorReducer);
  const orderRequest = useSelector(orderSelectors.selectOrderRequest);
  const orderModalData = useSelector(orderSelectors.selectOrderModalData);

  useEffect(() => {
    dispatch(orderActions.clearOrder());
  }, [dispatch]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) return navigate('/login');

    const ids = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((el) => el._id)
    ];

    dispatch(createOrderAsync(ids));
  };

  const closeOrderModal = () => {
    dispatch(orderActions.clearOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
