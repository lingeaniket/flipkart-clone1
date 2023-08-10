import { useEffect } from "react";
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux";

import Navbar from "../Navbar/navbarComponent";
// import Footer from "../Footer/footer.component";
import Loader from "../Loader/loader.component";
import SnackBar from "../SnackBar/snackBar.component";

import { updateOrdersStatus } from "../Features/User/orderDetailsSlice";

const Root = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        setInterval(() => {
            dispatch(updateOrdersStatus())
            console.log("Updated")
        }, 60000)
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Navbar />
            <Outlet />
            <Loader />
            {/* <Footer /> */}
            <SnackBar />
        </>
    )
}
export default Root;