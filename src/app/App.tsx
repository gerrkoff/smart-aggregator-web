import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { Header, Main, Search } from '@/containers';

import styles from './App.module.css';

const router = createBrowserRouter([
  {
    children: [
      {
        element: <Main />,
        index: true,
      },
      {
        element: <Main />,
        path: '/message/:messageId',
      },
      {
        element: <Main />,
        path: '/chat/:chatId',
      },
      {
        element: <Main />,
        path: '/chat/:chatId/message/:messageId',
      },
      {
        element: <Main />,
        path: '/search/:search',
      },
      {
        element: <Main />,
        path: '/search/:search/chat/:chatId',
      },
      {
        element: <Main />,
        path: '/search/:search/chat/:chatId/message/:messageId',
      },
      {
        element: <Main />,
        path: '/search/:search/message/:messageId',
      },
    ],

    element: (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Header />
          <Search />
          <Outlet />
        </div>
      </div>
    ),
    path: '/',
  },
]);

export const App = () => <RouterProvider router={router} />;
