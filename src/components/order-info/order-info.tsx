import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getOrderAsync } from '../../services/slices/OrderSlice';
import { ingredientsSelectors } from '../../services/slices/IngridientSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(ingredientsSelectors.selectIngredients);
  const { orderModalData } = useSelector((state) => state.orderReducer);
  const id = Number(useParams().number);

  useEffect(() => {
    dispatch(getOrderAsync(id));
  }, [dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderModalData || !ingredients.length) return null;

    const date = new Date(orderModalData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderModalData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderModalData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderModalData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
