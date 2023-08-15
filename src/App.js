import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css';
import './Components/Navbar/navbar.css'
import Home from './Components/Home/Component/home.component';
import Root from './Components/Root/root.component';
import cartStore from './Store/userStore';
import Checkout from './Components/CheckOut/Component/CheckoutComponent';
import Base from './Components/Base/base.componenet';
import WishList from './Components/Settings/WishList/newWishlist'
import ProtectedRouterLogin from './ProtectedRouter/ProtectedRouterLogin';
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
                path: '/account',
                element: <ProtectedRouterLogin><Account id="0" /></ProtectedRouterLogin>,
                children: [
                    {
                        path: '/account',
                        element: <ManageAccount />
                    }
                ]
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
                path: '/checkout',
                element: <CartCheckParent />,
                children: [
                    {
                        path: '/checkout',
                        element: <Checkout />
                    }
                ]
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/orderDetails',
                element: <ProtectedRouterLogin><OrderDetails /></ProtectedRouterLogin>
            },
            {
                path: '/orderresponse',
                element: <ProtectedRouterLogin><OrderDetails method="postCheckout" /></ProtectedRouterLogin>
            },
            {
                path: '/orders',
                element: <ProtectedRouterLogin><OrderComponent /></ProtectedRouterLogin>,
            },
            {
                path: '/products/:product_name/p/:product_id',
                element: <Products />
            },
            {
                path: '/search',
                element: <Home />
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
        ]
    }
])

function App() {
    return (
        <>
            <Provider store={cartStore}>
                <RouterProvider router={router}></RouterProvider>
            </Provider>
        </>
    );
}

export default App;