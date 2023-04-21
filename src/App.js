import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css';
import Login from './Components/Login/login.component';
import Home from './Components/Home/home.component';
import Cart from './Components/Cart/cart.component';
// import Catalog from './Components/Catalogue/catalogue.component';
import Root from './Components/Root/root.component';
import ProductPage from './Components/ProductPage/productPage.component';
import RootContext from './Context/RootContext/rootContext';
import { useState } from 'react';
import ProductContext from './Context/ProductContext/productContext';
import { Provider } from 'react-redux';
// import { Store } from '@reduxjs/toolkit';
// import userCartSlice from './Components/Features/User/userCartSlice';
import cartStore from './Store/cartStore';
// import { useState } from 'react';
// import HomeContext from './Context/homeContext/homeContext';
// import { useEffect } from 'react';

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
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/product/:id',
        element: <ProductPage />
      }


    ]
  }
])

function App() {
  const [rootPage, setRootPage] = useState(true);
  const [productArr, setProductArr] = useState();

  return (
    <>
    <Provider store={cartStore}>
    <ProductContext.Provider value={[productArr, setProductArr]}>
    <RootContext.Provider value={[rootPage, setRootPage]}>
      <RouterProvider router={router}></RouterProvider>
    </RootContext.Provider>
    </ProductContext.Provider>
    </Provider>
    </>
  );
}

export default App;
