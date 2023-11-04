import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleCheck } from "../../../Products/Functions/productsFunctions";

import { Rating, Tooltip, IconButton, CircularProgress } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import "../../Styles/wishListStyles.css";

const WishList = () => {
    const [loaded, setLoaded] = useState(false);
    const [wishListProducts, setWishListProducts] = useState([]);

    const wishListItems = useSelector((state) => state.wishListState.wishListItems);

    const dispatch = useDispatch();

    const fetchDataForKeyword = async (id) => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching data for ${id}:`, error);
            return null;
        }
    };

    useEffect(() => {
        const fetchDataForAllKeywords = async () => {
            const promises = wishListItems.map((id) => fetchDataForKeyword(id));
            const fetchedData = await Promise.all(promises);
            setWishListProducts(fetchedData.filter((item) => item !== null));
            setTimeout(() => {
                setLoaded(true);
            }, 1000);
        };

        fetchDataForAllKeywords();
        // eslint-disable-next-line
    }, [wishListItems]);

    return (
        <div className="_wish_001">
            <div className="_wish_002">
                <div className="_wish_003">My Wishlist ({wishListItems.length})</div>
                {!loaded ? (
                    <div className="_wish_004">
                        <CircularProgress />
                    </div>
                ) : (
                    wishListProducts.map((product) => (
                        <div className="_wish_005">
                            <div className="_wish_006">
                                <div className="_wish_007">
                                    <div className="_wish_008">
                                        <div className="_wish_009">
                                            <img src={product.thumbnail} alt="" className="_wish_010" />
                                        </div>
                                    </div>
                                </div>
                                <div className="_wish_011">
                                    <div className="_wish_012">
                                        <div>
                                            <div className="_wish_013">{product.title}</div>
                                            <div className="_wish_014">
                                                <span>
                                                    <Tooltip title={`${product.rating}★`} arrow>
                                                        <span>
                                                            <Rating
                                                                name="half-rating-read"
                                                                value={product.rating}
                                                                precision={0.1}
                                                                size="small"
                                                                readOnly
                                                            />
                                                        </span>
                                                    </Tooltip>
                                                </span>
                                            </div>
                                            <div className="_wish_015">
                                                <img
                                                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                                                    alt={product.title}
                                                    height={"21"}
                                                />
                                            </div>
                                            <div className="_wish_016">
                                                <div className="_wish_017">${product.price}</div>
                                                <div className="_wish_018">${product.price}</div>
                                                <div className="_wish_019">{product.discountPercentage}% Off</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="_wish_020">
                                        <Tooltip title="delete item">
                                            <IconButton
                                                sx={{ float: "right" }}
                                                onClick={(event) => {
                                                    handleCheck(event, product.id, dispatch);
                                                }}
                                            >
                                                <DeleteRoundedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default WishList;
