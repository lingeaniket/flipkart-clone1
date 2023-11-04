import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { handleCheck } from "../Functions/productsFunctions";

import { openLogin } from "../../Features/User/userSlice";
import { startLoginWishlist } from "../../Features/User/userWishListSlice";
import { setMessage, setOpen } from "../../Features/SnackBar/snackbarSlice";

import { Checkbox } from "@mui/material";
import { Skeleton } from "@mui/material";
import { pink } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";

const MobileThumbnail = ({ productImages, product, loaded }) => {
    const wishListItems = useSelector((state) => state.wishListState.wishListItems);
    const isUserLoggedIn = useSelector((state) => state.userState.userLoggedIn);

    const dispatch = useDispatch();

    return (
        <div
            id="carouselExample"
            className="carousel slide _prod_092"
            style={{
                width: "100%",
                border: "1px solid #f0f0f0",
            }}
        >
            {loaded ? (
                <Skeleton
                    variant="rectangle"
                    animation="wave"
                    sx={{
                        width: "100%",
                        // aspectRatio: '1/1'
                        height: "350px",
                        backgroundColor: "#f0f0f069",
                        margin: "16px 0 0 16px",
                    }}
                ></Skeleton>
            ) : (
                <>
                    <div className="carousel-inner">
                        {productImages.map((productImage, index) => (
                            <div className={`carousel-item ${index === 1 ? "active" : ""}`}>
                                <div
                                    style={{
                                        width: "100%",
                                        aspectRatio: "2/1.4",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: "15px",
                                    }}
                                >
                                    <img src={productImage} alt="..." style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon visually-hidden" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon visually-hidden" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    <div className="_prod_020">
                        <div className="_prod_021">
                            <Checkbox
                                id="name"
                                checked={wishListItems.some((item) => item === product.id) ? true : false}
                                onChange={(event) => {
                                    if (isUserLoggedIn) {
                                        handleCheck(event, product.id, dispatch);
                                    } else {
                                        dispatch(setMessage("Provide login for wishlisting a product"));
                                        dispatch(setOpen(true));
                                        dispatch(openLogin());
                                        dispatch(startLoginWishlist(product.id));
                                    }
                                }}
                                icon={<FavoriteIcon fontSize="small" />}
                                checkedIcon={<FavoriteIcon fontSize="small" sx={{ color: pink[500] }} />}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default memo(MobileThumbnail);
