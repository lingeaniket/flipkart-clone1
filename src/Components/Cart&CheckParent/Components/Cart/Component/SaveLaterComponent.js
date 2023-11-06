import React from "react";
import { useSelector } from "react-redux";

import CartElement from "./cartElementComponent";

import { Paper, Skeleton } from "@mui/material";

const SaveLaterComponent = ({ loader, saveLaterProducts }) => {
    const savelater = useSelector((state) => state.cartState.saveLaterItems);

    return (
        <Paper className="saveLaterPaper" elevation={1} square>
            <div className="disFlexAlignItCen">
                <div> Saved For Later ({savelater.length})</div>
            </div>
            <div>
                {loader
                    ? savelater.map((item, index) => (
                          <Skeleton
                              key={index}
                              variant="rectangular"
                              animation="wave"
                              width={"100%"}
                              height={"203px"}
                              sx={{ backgroundColor: "white", borderTop: "1px solid #f0f0f0" }}
                          />
                      ))
                    : saveLaterProducts.map((item) => <CartElement type="saveLater" method="cart" item={item} />)}
            </div>
        </Paper>
    );
};

export default React.memo(SaveLaterComponent);
