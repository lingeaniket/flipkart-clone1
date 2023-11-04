import { Button, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import OrderMapComponent from "../OrderDetails/Components/orderMapComponent";
import { useSelector } from "react-redux";
import { SwipeableDrawer } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import FilterOrder from "./Components/FilterOrder";
import { handleFilter, handleSearch } from "../OrderDetails/Functions/orderListFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const OrderComponent = () => {
    const orders = useSelector((state) => state.orderDetailsState.orders);
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const [searchKey, setSearchKey] = useState(searchParams.get("keyword"));
    const location = useLocation();
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);
    const [value, setValue] = useState("");
    const [loader, setLoader] = useState(true);

    const [orderStatus, setOrderStatus] = useState([false, false, false, false]);
    const [orderTime, setOrderTime] = useState([false, false, false, false, false]);

    const [open, setOpen] = useState(false);

    const toggleDrawer = (event) => {
        if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
        setOpen((lastState) => !lastState);
    };
    const handleSearchOrder = (event) => {
        setLoader(true);

        if (value.trim().length > 2) {
            setSearchKey(value);
            setOrderList(handleSearch(value, orderList));
            const searchParam = new URLSearchParams(location.search);
            searchParam.set("keyword", value);
            navigate("?" + searchParam.toString(), { replace: true });
        } else {
            alert("Minimun search length is 3");
        }
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    };

    useEffect(() => {
        setOrderList(handleFilter(orderStatus, orderTime, orders, keyword));
        setTimeout(() => {
            setLoader(false);
        }, 2000);
        // eslint-disable-next-line
    }, [orders, keyword, searchKey]);

    return (
        <div className="_order_094">
            <div className="_order_095">
                <div className="_order_096">
                    <FilterOrder
                        setOpen={setOpen}
                        type="desktop"
                        orderList={orderList}
                        setOrderList={setOrderList}
                        orderStatus={orderStatus}
                        setOrderStatus={setOrderStatus}
                        orderTime={orderTime}
                        setOrderTime={setOrderTime}
                        setLoader={setLoader}
                    />
                </div>
                <div className="_order_103">
                    <div className="_order_104">
                        <div className="_order_105">
                            <input
                                type="text"
                                className="_order_106"
                                placeholder="Search your orders here"
                                value={value}
                                onChange={(event) => {
                                    setValue(event.target.value);
                                }}
                            />
                        </div>
                        <Button
                            variant="contained"
                            sx={{ borderRadius: "0 4px 4px 0", textTransform: "lowercase" }}
                            onClick={handleSearchOrder}
                            // onClick={() => {
                            //     if(value.trim().length > 2) {
                            //         setSearchkey(value);
                            //         setSearched(true)
                            //         setOrderList(handleSearch(value, orderList))
                            //     } else {
                            //         alert("Minimun search length is 3")
                            //     }
                            // }}
                        >
                            <div className="_order_107">
                                <SearchIcon fontSize="small" sx={{ marginRight: "6px" }} />
                                <span>Search Orders</span>
                            </div>
                        </Button>
                        <div className="_order_110">
                            <div
                                style={{
                                    padding: "5px 2px",
                                    fontWeight: 500,
                                    textTransform: "uppercase",
                                }}
                                onClick={() => {
                                    setOpen(true);
                                }}
                            >
                                <FilterListIcon sx={{ marginRight: "10px" }} />
                                Filters
                            </div>
                        </div>
                    </div>
                    {loader ? (
                        <>
                            {orders.map((order, index) => (
                                <Skeleton
                                    key={index + order.order_id}
                                    variant="rectangle"
                                    width={"100%"}
                                    height={200}
                                    sx={{
                                        backgroundColor: "white",
                                    }}
                                    animation="wave"
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            {orderList.map((order) => (
                                <OrderMapComponent
                                    key={order.orderId}
                                    order={order}
                                    unit={order.order_details.products[0]}
                                    type="list_item"
                                />
                            ))}
                        </>
                    )}
                    <div className="_order_108">
                        <div className="_order_109">
                            <span>No more results to display</span>
                        </div>
                    </div>
                </div>
            </div>
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
                sx={{
                    zIndex: 100,
                }}
            >
                <FilterOrder
                    setOpen={setOpen}
                    type="mobile"
                    orderList={orderList}
                    setOrderList={setOrderList}
                    orderStatus={orderStatus}
                    setOrderStatus={setOrderStatus}
                    orderTime={orderTime}
                    setOrderTime={setOrderTime}
                    setLoader={setLoader}
                />
            </SwipeableDrawer>
        </div>
    );
};

export default OrderComponent;
