import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import './Styles/productStyles.css'
import ExtraProducts from "./ExtraProducts";
import SideDetails from "./Components/SideDetails";
import MobileButton from "./Components/MobileBottomButton";
import MobileThumbnail from "./Components/MobileThumbnail";
import DesktopThumbnail from "./Components/DesktopThumbnail";

import { updateRecentlyViewed } from "../Features/User/userCartSlice";
import { fetchData, fetchRelatedData } from "./Functions/productsFunctions";

import { CircularProgress } from "@mui/material";

const Products = () => {
    const dispatch = useDispatch();
    const { product_id } = useParams();

    const [loader, setLoader] = useState(true);
    const [product, setProduct] = useState({});
    const [productImages, setProductImages] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

    const recent = useSelector(state => state.cartState.recentlyViewed)

    useEffect(() => {
        const fetchProductData = async () => {
            const response = await fetchData(product_id);
            setProduct(response.product);
            dispatch(updateRecentlyViewed(response.product.id));
            setProductImages([response.product.thumbnail, ...response.product.images])
            setRelatedProducts(() => response.relatedProducts);

            const promises = recent.map((id) => fetchRelatedData(id));
            const fetchedData = await Promise.all(promises);
            setRecentlyViewedProducts(fetchedData.filter((item) => item !== null && item.id !== Number(product_id)));
            setLoader(false)
        };

        fetchProductData();
        // eslint-disable-next-line
    }, [product_id])

    return (
        <>
            {loader
                ?
                (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '350px'
                    }}>
                        <CircularProgress />
                    </div>
                )
                :
                (
                    <div style={{ position: 'relative' }}>
                        <div className="_prod_002" style={{ position: 'relative' }}>
                            <div className="_prod_003" style={{ width: '100%' }}>
                                <DesktopThumbnail productImages={productImages} product={product} />
                                <MobileThumbnail productImages={productImages} product={product} />
                                <SideDetails product={product} />
                            </div>
                            <div className="w-1-1">
                                <ExtraProducts type='related' products={relatedProducts} />
                            </div>
                            {(recentlyViewedProducts.length > 0)
                                &&
                                (
                                    <div className="w-1-1">
                                        <ExtraProducts type='recent' products={recentlyViewedProducts} />
                                    </div>
                                )
                            }
                        </div >
                        <MobileButton product={product} />
                    </div>
                )
            }
        </>
    )
}

export default Products