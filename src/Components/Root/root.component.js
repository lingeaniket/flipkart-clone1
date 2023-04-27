import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/navbar.component";
import { useEffect, 
    // useLayoutEffect
 } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { load } from "../Features/User/productsSlice";
// import Footer from "../Footer/footer.component";
import Loader from "../Loader/loader.component";
import { useNavigate } from "react-router-dom";

const Root = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products/').then(res => {
            dispatch(load(res.data))
        });
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        !localStorage.getItem('isloggedIn') && navigate('/login');
        // eslint-disable-next-line
      }, []);

    return (
        <>
            <Navbar />
            
            <Outlet />
            <Loader />
            {/* <Footer /> */}
        </>
    )
}
export default Root;