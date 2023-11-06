import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import "./Components/Navbar/Styles/navbar.css";

import Home from "./Components/Home/home.component";
import Root from "./Components/Root/root.component";
import Base from "./Components/Base/BaseComponent";
import Account from "./Components/Account/AccountComponent";
import CartPage from "./Components/Cart&CheckParent/Components/Cart/CartMainComponent";
import Checkout from "./Components/Cart&CheckParent/Components/CheckOut/CheckoutComponent";
import Products from "./Components/Products/Products";
import WishList from "./Components/Account/Components/Wishlist/WishlistComponent";
import cartStore from "./Store/userStore";
import OrderDetails from "./Components/OrderDetails/OrderDetails";
import ManageAccount from "./Components/Account/Components/ManageAccount/ManageAccountComponent";
import OrderComponent from "./Components/Orders/NewOrderComponent";
import ManageAddresses from "./Components/Account/Components/ManageAddresses/ManageAddressesComponent";
import CartCheckParent from "./Components/Cart&CheckParent/Cart&CheckParent.component";
import ProtectedRouterLogin from "./ProtectedRouter/ProtectedRouterLogin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Base />,
            },
            {
                path: "/account",
                element: (
                    <ProtectedRouterLogin>
                        <Account id="0" />
                    </ProtectedRouterLogin>
                ),
                children: [
                    {
                        path: "/account",
                        element: <ManageAccount />,
                    },
                ],
            },
            {
                path: "/account/addresses",
                element: (
                    <ProtectedRouterLogin>
                        <Account id="2" />
                    </ProtectedRouterLogin>
                ),
                children: [
                    {
                        path: "/account/addresses",
                        element: <ManageAddresses />,
                    },
                ],
            },
            {
                path: "/cart",
                element: <CartCheckParent />,
                children: [
                    {
                        path: "/cart",
                        element: <CartPage />,
                    },
                ],
            },
            {
                path: "/checkout",
                element: <CartCheckParent />,
                children: [
                    {
                        path: "/checkout",
                        element: <Checkout />,
                    },
                ],
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/orderDetails",
                element: (
                    <ProtectedRouterLogin>
                        <OrderDetails />
                    </ProtectedRouterLogin>
                ),
            },
            {
                path: "/orderresponse",
                element: (
                    <ProtectedRouterLogin>
                        <OrderDetails method="postCheckout" />
                    </ProtectedRouterLogin>
                ),
            },
            {
                path: "/orders",
                element: (
                    <ProtectedRouterLogin>
                        <OrderComponent />
                    </ProtectedRouterLogin>
                ),
            },
            {
                path: "/products/:product_name/p/:product_id",
                element: <Products />,
            },
            {
                path: "/search",
                element: <Home />,
            },
            {
                path: "/wishList",
                element: (
                    <ProtectedRouterLogin>
                        <Account id="1" />
                    </ProtectedRouterLogin>
                ),
                children: [
                    {
                        path: "/wishList",
                        element: <WishList />,
                    },
                ],
            },
        ],
    },
]);

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
