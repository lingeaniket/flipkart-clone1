import { useNavigate } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import Currosal from "./Components/CurrosalComponent";
import CategoryList from "./Components/CategoryListComponent";
import RecommandedBase from "./Components/RecommandedComponent";

import { topCategories, loadMoreData } from "./Functions/baseFunctions";

import "./Styles/base.css";

import { CircularProgress, Skeleton } from "@mui/material";

const Base = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState([]); //products , recommended

    const loadedItems = useSelector((state) => state.productState.loadedItems);

    useEffect(() => {
        if (loadedItems.length > 0) {
            setProducts(loadedItems);
            setTimeout(() => {
                setLoaded(true);
            }, 1000);
        } else {
            loadMoreData(setProducts, dispatch, setLoaded);
        }

        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div>
                <div className="_base_002">
                    <div className="_base_003">
                        {topCategories.map((category, index) => (
                            <div
                                key={index}
                                className="categoryStyle"
                                onClick={() => {
                                    navigate(`/search?category=${category.link}`);
                                }}
                            >
                                {category.title}
                            </div>
                        ))}
                    </div>
                </div>
                <Currosal />
                <div>
                    {!loaded ? (
                        Array.from({ length: 8 }).map((ele, index) => (
                            <Skeleton
                                key={index}
                                width="100%"
                                variant="rectangular"
                                animation="wave"
                                height="310px"
                                sx={{ background: "white", borderRadius: "5px", margin: "10px 5px" }}
                            />
                        ))
                    ) : (
                        <InfiniteScroll
                            style={{ overflow: "hidden" }}
                            dataLength={products.length}
                            next={() => {
                                setTimeout(() => {
                                    loadMoreData(setProducts, dispatch, setLoaded);
                                }, 5000);
                            }}
                            hasMore={true}
                            loader={
                                <div
                                    className="disFlexJusConCen w-1-1"
                                    style={{
                                        height: "100px",
                                        alignItems: "center",
                                    }}
                                >
                                    <CircularProgress />
                                </div>
                            }
                        >
                            {products.map((product, index) => {
                                //product = {products, recommended}
                                return (
                                    <>
                                        {product.products.map((category) => (
                                            <CategoryList key={index + category.category} product={category} />
                                        ))}
                                        <div className="_base_004">
                                            <RecommandedBase range={product.recommended} />
                                        </div>
                                    </>
                                );
                            })}
                        </InfiniteScroll>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(Base);
