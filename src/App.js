import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css';
import Login from './Components/Login/login.component';
import Home from './Components/Home/Component/home.component';
import Root from './Components/Root/root.component';
import { useLayoutEffect } from 'react';
import { Provider } from 'react-redux';
import cartStore from './Store/userStore';
import Checkout from './Components/CheckOut/Component/newCheckOut';
import Base from './Components/Base/Component/base.componenet';
import WishList from './Components/Settings/WishList/newWishlist'
import './Components/Navbar/navbar.css'
import CancelledOrder from './Components/Settings/OrderList/cancelledOrder.component';
import ProtectedRouterLogin from './ProtectedRouter/ProtectedRouterLogin';
import ProtectedRouter from './ProtectedRouter/ProtectedRouter';
import Products from './Components/Products/Products';
import OrderComponent from './Components/Settings/OrderList/NewOrderComponent';
import OrderDetails from './Components/Settings/OrderList/OrderDetails';
import Account from './Components/Account/Component/Account.component';
import ManageAccount from './Components/ManageAccount/ManageAccount';
import CartCheckParent from './Components/Cart&CheckParent/Component/Cart&CheckParent.component';
import CartPage from './Components/Cart/Component/cart.component';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Base />
            },
            {
                path: '/login',
                element: <ProtectedRouter><Login /></ProtectedRouter>
            },
            {
                path: '/cart',
                element: <CartCheckParent />,
                children: [
                    {
                        path: '/cart',
                        element: <CartPage />
                    }
                ]
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/account',
                element: <Account id="0" />,
                children: [
                    {
                        path: '/account',
                        element: <ManageAccount />
                    }
                ]
            },
            {
                path: '/products/:product_name/p/:product_id',
                element: <Products />
            },
            {
                path: '/checkout',
                element: <ProtectedRouterLogin><CartCheckParent /></ProtectedRouterLogin>,
                children: [
                    {
                        path: '/checkout',
                        element: <Checkout />
                    }
                ]
            },
            {
                path: '/search',
                element: <Home />
            },
            {
                path: '/orders',
                element: <ProtectedRouterLogin><OrderComponent /></ProtectedRouterLogin>,
                children: [
                    {
                        path: 'orders/cancelledOrders',
                        element: <CancelledOrder />
                    },
                ]
            },
            {
                path: '/wishList',
                element: <ProtectedRouterLogin><Account id="1" /></ProtectedRouterLogin>,
                children: [
                    {
                        path: '/wishList',
                        element: <WishList />
                    }
                ]
            },
            {
                path: '/order_details',
                element: <ProtectedRouterLogin><OrderDetails /></ProtectedRouterLogin>
            }
        ]
    }
])

function App() {
    useLayoutEffect(() => {
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