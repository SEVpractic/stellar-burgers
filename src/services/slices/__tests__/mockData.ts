import { TConstructorIngredient, TIngredient } from '@utils-types';

export const mockBun: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  id: 'bun-1'
};

export const mockIngredient: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  id: 'main-1'
};

export const mockSauce: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  id: 'sauce-1'
};

export const mockIngridientsData: TIngredient[] = [
  mockBun,
  mockIngredient,
  mockSauce
];

export const mockOrderIds: string[] = [
  '643d69a5c3f7b9001cfa093c',
  '643d69a5c3f7b9001cfa0941'
];

export const mockCreateOrderResponce = {
  success: true,
  name: 'Краторный био-марсианский бургер',
  order: {
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
    _id: '68975947673086001ba82028',
    owner: {
      name: 'momo',
      email: 'momo@mailforspam.com',
      createdAt: '2025-07-12T12:25:40.757Z',
      updatedAt: '2025-07-17T17:58:21.334Z'
    },
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2025-08-09T14:20:55.476Z',
    updatedAt: '2025-08-09T14:20:56.333Z',
    number: 86114,
    price: 1679
  }
};

export const mockOrderNumber = 86114;

export const mockOrderResponce = {
  success: true,
  orders: [
    {
      _id: '68975947673086001ba82028',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
      owner: '687254445a54df001b6dde7c',
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-08-09T14:20:55.476Z',
      updatedAt: '2025-08-09T14:20:56.333Z',
      number: 86114,
      __v: 0
    }
  ]
};

export const mockUserOrders = {
  success: true,
  orders: [
    {
      _id: '68975947673086001ba82028',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
      owner: '687254445a54df001b6dde7c',
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-08-09T14:20:55.476Z',
      updatedAt: '2025-08-09T14:20:56.333Z',
      number: 86114,
      __v: 0
    }
  ],
  total: 85740,
  totalToday: 77
};

export const mockUserData = {
  email: 'momo@mailforspam.com',
  name: 'momo'
};

export const mockUserRegisterData = {
  email: 'momo@mailforspam.com',
  name: 'momo',
  password: '123QwE'
}

export const mockLoginData = {
  email: 'momo@mailforspam.com',
  password: '123QwE'
}