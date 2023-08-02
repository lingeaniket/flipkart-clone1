import { Outlet } from "react-router-dom"
// import Navbar from "../Navbar/navbar.component";
import Navbar from "../Navbar/navbarComponent";
import {
    useEffect,
    // useLayoutEffect
} from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
// import { load } from "../Features/User/productsSlice";
import Footer from "../Footer/footer.component";
import Loader from "../Loader/loader.component";
import { updateOrdersStatus } from "../Features/User/orderDetailsSlice";
// import { useNavigate } from "react-router-dom";

const Root = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        setInterval(() => {
            console.log("printed and changed with effect");
            dispatch(updateOrdersStatus())
        }, 60000)
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Navbar />
            <Outlet />
            <Loader />
            <Footer />
        </>
    )
}
export default Root;