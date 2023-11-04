import { useParams } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Styles/productStyles.css";
import SideDetails from "./Components/SideDetails";
import MobileButton from "./Components/MobileBottomButton";
import ExtraProducts from "./Components/ExtraProducts";
import MobileThumbnail from "./Components/MobileThumbnail";
import DesktopThumbnail from "./Components/DesktopThumbnail";

import { updateRecentlyViewed } from "../Features/User/userCartSlice";

import { fetchData, fetchRelatedData } from "./Functions/productsFunctions";

const Products = () => {
    const dispatch = useDispatch();
    const { product_id } = useParams();

    const [loader, setLoader] = useState(true);
    const [product, setProduct] = useState({});
    const [productImages, setProductImages] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

    const recent = useSelector((state) => state.cartState.recentlyViewed);

    useEffect(() => {
        const fetchProductData = async () => {
            const response = await fetchData(product_id);
            setProduct(response.product);
            dispatch(updateRecentlyViewed(response.product.id));
            setProductImages([response.product.thumbnail, ...response.product.images]);
            setRelatedProducts(() => response.relatedProducts);

            const promises = recent.map((id) => fetchRelatedData(id));
            const fetchedData = await Promise.all(promises);
            setRecentlyViewedProducts(fetchedData.filter((item) => item !== null && item.id !== Number(product_id)));
            window.scrollTo(0, 0);
            setLoader(false);
        };
        setLoader(true);

        fetchProductData();
        // eslint-disable-next-line
    }, [product_id]);

    return (
        <>
            <div style={{ position: "relative" }}>
                <div className="_prod_002" style={{ position: "relative" }}>
                    <div className="_prod_003" style={{ width: "100%" }}>
                        <DesktopThumbnail productImages={productImages} product={product} loaded={loader} />
                        <MobileThumbnail productImages={productImages} product={product} loaded={loader} />
                        <SideDetails product={product} loaded={loader} />
                    </div>
                    <div className="w-1-1">
                        <ExtraProducts type="related" products={relatedProducts} loaded={loader} />
                    </div>
                    {recentlyViewedProducts.length > 0 && (
                        <div className="w-1-1">
                            <ExtraProducts type="recent" products={recentlyViewedProducts.slice(0, 6)} loaded={loader} />
                        </div>
                    )}
                </div>
                <MobileButton product={product} />
            </div>
        </>
    );
};

export default memo(Products);
