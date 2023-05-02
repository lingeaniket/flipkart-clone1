import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css';
import Login from './Components/Login/login.component';
import Home from './Components/Home/home.component';
import Cart from './Components/Cart/cart.component';
import Root from './Components/Root/root.component';
import ProductPage from './Components/ProductPage/productPage.component';
import { useLayoutEffect } from 'react';
import { Provider } from 'react-redux';
import cartStore from './Store/userStore';
import Checkout from './Components/CheckOut/checkout.component';
import Base from './Components/Base/base.componenet';
import OrderList from './Components/Settings/OrderList/orderList.component'
import WishList from './Components/Settings/WishList/wishList.component'
import './Components/Navbar/navbar.css'
import CancelledOrder from './Components/Settings/OrderList/cancelledOrder.component';
// import PastOrder from './Components/Settings/OrderList/pastOrderComponent';

const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login />
  },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Base/>
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'product/:id',
        element: <ProductPage />
      }, {
        path: 'checkout',
        element: <Checkout/>
      },{
        path: '/search',
        element : <Home/>
      }, {
        path: '/orders',
        element : <OrderList />,
        children: [
          {
            path: 'orders/cancelledOrders',
            element: <CancelledOrder/>
          },
          // {
          //   path: 'orders/pastOrders',
          //   element: <PastOrder/>
          // }
        ]
      }, {
        path : '/wishList',
        element: <WishList />
      }
    ]
  }
])

function App() {
  useLayoutEffect(()=>{
    localStorage.getItem('rootPage')
  })

  return (
    <>
    <Provider store={cartStore}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
    </>
  );
}

export default App;