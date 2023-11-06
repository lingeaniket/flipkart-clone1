import React from "react";

import { Paper, Skeleton } from "@mui/material";
import CartElement from "./cartElementComponent";
const CartComponent = ({ cartProducts, handleOrderPlace, cart, loader }) => {
    return (
        <Paper elevation={1} style={{ backgroundColor: "transparent" }}>
            {/* <Paper sx={{ padding: '0 0 10px', backgroundColor: 'transparent' }} elevation={0}>
                <div className="disFlexJusConCen titleAddressDiv">
                    <div>
                        <div>Deliver To</div>
                        <div>Full address</div>
                    </div>
                    <div>
                        <Button className="addressChangeButton">Change</Button>
                    </div>
                </div>
            </Paper> */}
            {loader
                ? cart.map((item, idx) => (
                      <Skeleton
                          key={idx}
                          variant="rectangular"
                          animation="wave"
                          width={"100%"}
                          height={"203px"}
                          sx={{ backgroundColor: "white", borderTop: "1px solid #f0f0f0" }}
                      />
                  ))
                : cartProducts.map((item) => (
                      <Paper square elevation={0} key={item.product.id}>
                          <CartElement type="cart" method="cart" item={item} />
                      </Paper>
                  ))}
            <Paper square elevation={0} className="placeOrderPaper innerPlaceOrder">
                <div>
                    <button onClick={handleOrderPlace}>Place order</button>
                </div>
            </Paper>
        </Paper>
    );
};

export default CartComponent;
