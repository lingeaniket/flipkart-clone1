import { offers } from "../Functions/productsFunctions";
import { Rating, Tooltip, Skeleton } from "@mui/material";

const SideDetails = ({ product, loaded }) => {
    return (
        <div className={`_prod_061 _prod_084 _prod_093`}>
            {loaded ? (
                <>
                    <Skeleton
                        variant="rectangle"
                        animation="wave"
                        sx={{
                            width: "100%",
                            height: "100px",
                            backgroundColor: "#f0f0f069",
                            margin: "16px 0 0 16px",
                        }}
                    ></Skeleton>
                    <Skeleton
                        variant="rectangle"
                        animation="wave"
                        sx={{
                            width: "100%",
                            height: "150px",
                            backgroundColor: "#f0f0f069",
                            margin: "16px 0 0 16px",
                        }}
                    ></Skeleton>
                    <Skeleton
                        variant="rectangle"
                        animation="wave"
                        sx={{
                            width: "100%",
                            height: "100px",
                            backgroundColor: "#f0f0f069",
                            margin: "16px 0 0 16px",
                        }}
                    ></Skeleton>
                    <Skeleton
                        variant="rectangle"
                        animation="wave"
                        sx={{
                            width: "100%",
                            height: "30px",
                            backgroundColor: "#f0f0f069",
                            margin: "16px 0 0 16px",
                        }}
                    ></Skeleton>
                </>
            ) : (
                <>
                    <div className="w-1-1">
                        <div
                            style={{
                                padding: 0,
                                marginTop: "6px",
                            }}
                        >
                            <div>
                                <h1 className="_prod_031">
                                    <span className="_prod_032">{product.title}</span>
                                </h1>
                            </div>
                            <div>
                                <div className="_prod_033">
                                    <div className="_prod_082" style={{ marginTop: "6px" }}>
                                        <span style={{ position: "relative" }}>
                                            <div className="_prod_036 _prod_082">
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
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <span className="_prod_037">
                                    <img
                                        style={{ verticalAlign: "middle" }}
                                        src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                                        alt=""
                                        height="21"
                                    />
                                </span>
                            </div>
                            <div className="_prod_039 _prod_083">
                                <span>Special Price</span>
                            </div>
                            <div className="_prod_040">
                                <div className="_prod_041">${product.price}</div>
                                <div className="_prod_042 _prod_044 _prod_082">${product.price}</div>
                                <div className="_prod_044 _prod_082 _prod_083" style={{ letterSpacing: "-0.2px" }}>
                                    <span>{product.discountPercentage}% Off</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="_prod_w-1-1 _prod_border">
                        <div style={{ marginTop: "8px" }}>
                            <div className="_prod_046">Available Offers</div>
                        </div>
                        <div className="_prod_047" style={{ position: "relative" }}>
                            {offers.map((offer, index) => (
                                <span className="_prod_048 w-1-1" key={index}>
                                    <img
                                        src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                                        alt="baseTag"
                                        width="18"
                                        height="18"
                                        style={{ marginRight: "10px" }}
                                    />
                                    <li className="_prod_050 w-1-1 _prod_081">{offer}</li>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="_prod_border _prod_085">
                        <div className="_prod_055">Easy Payment Options</div>
                        <div style={{ marginLeft: "110px" }}>
                            <ul>
                                <li className="_prod_057" style={{ position: "relative" }}>
                                    No cost EMI starting from $10/month
                                </li>
                                <li className="_prod_057" style={{ position: "relative" }}>
                                    Flipkart Pay Later
                                </li>
                                <li className="_prod_057" style={{ position: "relative" }}>
                                    Cash on Delivery
                                </li>
                                <li className="_prod_057" style={{ position: "relative" }}>
                                    Net banking & Credit/ Debit/ ATM card
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="_prod_border _prod_085">
                        <div className="_prod_055">Description</div>
                        <div style={{ marginLeft: "110px", color: "#212121" }}>{product.description}</div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SideDetails;
