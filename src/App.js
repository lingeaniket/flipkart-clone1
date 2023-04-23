import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css';
import Login from './Components/Login/login.component';
import Home from './Components/Home/home.component';
import Cart from './Components/Cart/cart.component';
import Root from './Components/Root/root.component';
import ProductPage from './Components/ProductPage/productPage.component';
// import RootContext from './Context/RootContext/rootContext';
import { useLayoutEffect, useState } from 'react';
import ProductContext from './Context/ProductContext/productContext';
import { Provider } from 'react-redux';
import cartStore from './Store/userStore';
import Checkout from './Components/CheckOut/checkout.component';

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
      }
    ]
  }
])

function App() {
  // const [rootPage, setRootPage] = useState(null);
  const [productArr, setProductArr] = useState();

  useLayoutEffect(()=>{
    localStorage.getItem('rootPage')
  })

  return (
    <>
    <Provider store={cartStore}>
    <ProductContext.Provider value={{productArr, setProductArr}}>
    {/* <RootContext.Provider value={{rootPage, setRootPage}}> */}
      <RouterProvider router={router}></RouterProvider>
    {/* </RootContext.Provider> */}
    </ProductContext.Provider>
    </Provider>
    </>
  );
}

export default App;