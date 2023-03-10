import { createBrowserRouter } from 'react-router-dom';
import Chart from './routes/Chart';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import Price from './routes/Price';

const BASE_URL = process.env.PUBLIC_URL;

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Coins />,
    },
    {
      path: '/:coinId',
      element: <Coin />,
      children: [
        { path: 'price', element: <Price /> },
        { path: 'chart', element: <Chart /> },
      ],
    },
  ],
  { basename: { BASE_URL } as any }
);

export default router;
