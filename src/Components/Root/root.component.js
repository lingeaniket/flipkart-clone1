import { Outlet, 
    useNavigate 
} from "react-router-dom"
import Navbar from "../Navbar/navbar.component";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { load } from "../Features/User/productsSlice";
import Footer from "../Footer/footer.component";
// import { useContext, useEffect } from "react";
// import rootContext from "../../Context/RootContext/rootContext";

// import userCartStore from '../../Store/cartStore'
// import { Axios } from "axios";
// import axios from 'axios'
// import ProductContext from "../../Context/ProductContext/productContext";
// import productContext from "../../Context/ProductContext/productContext";
// import { Provider } from "react-redux";
// import productContext from "../../Context/ProductContext/productContext";

const Root = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=> {
        axios.get('https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products/').then(res => dispatch(load(res.data)));
        // eslint-disable-next-line
    }, [])
    // const { rootPage, setRootPage } = useContext(rootContext);
    return (
        <>
            <Navbar/>
            <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="3000">
                        <img src="https://rukminim1.flixcart.com/flap/1688/280/image/75a15c3e19c3f7de.jpg?q=50" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src="https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/8c1f16e3b6ceb589.jpeg?q=50" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src="https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/92d376fbe0892513.jpeg?q=50" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src="https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/a37c7aa9669fcd4c.jpg?q=50" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src="https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/6593790371ec0ef4.jpg?q=50" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src="https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/f9e33bc9015c3dfc.jpg?q=50" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <button onClick={() => {
                    navigate("/home");
                    // setRootPage(false);
                    // localStorage.setItem('rootPage', false);
                }}>View All Products</button>

            <Outlet />
            <Footer/>
        </>
    )
}
export default Root;