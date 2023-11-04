import { formattedDate } from "../Functions/orderListFunctions";
import { useState } from "react";

export const Timeline = ({ order, id, setStatus }) => {
    const [openDetail, setOpenDetail] = useState(true);
    const deliveryStatus = ["shipped", "in_transit", "nearest_hub", "out_for_delivery"];

    return (
        <div className="disFlexJusConCen">
            {order.order_status_index <= order.order_timeline_length && 1 <= order.order_timeline_length - 1 && (
                <div className={`_order_041 w-1-${order.order_timeline_length} _order_116`}>
                    <div className="_order_042 _order_042C">Order Confirmed</div>
                    <div className="_order_043 flexCenCen">
                        <div className={`_order_044`}></div>
                        <div
                            className={`_order_045 ${id === 1 && "ripple01"} _order_046`}
                            onMouseOver={() => {
                                setStatus("confirmed");
                            }}
                        ></div>
                        <div className={`_order_044 ${2 <= id ? "_order_046" : "_order_tobe"}`}></div>
                    </div>
                    <div className="_order_042 _order_042C">{formattedDate(order.order_date)}</div>
                </div>
            )}
            {deliveryStatus.map((status, index) => (
                <>
                    {order.order_status_index <= order.order_timeline_length &&
                        order.order_timeline_length - 1 >= index + 2 &&
                        id >= index + 2 && (
                            <div
                                className={`_order_041 w-1-${order.order_timeline_length} ${
                                    id > index + 2 && openDetail ? "_order_115" : "_order_116"
                                }`}
                            >
                                <div className={`_order_042 ${index + 2 <= id ? "_order_042C" : "_order_042T"}`}>
                                    <span style={{ textTransform: "capitalize" }}>{status.replaceAll("_", " ")}</span>
                                </div>
                                <div className="_order_043 flexCenCen">
                                    <div className={`_order_044 ${index + 2 <= id ? "_order_046" : "_order_tobe"}`}></div>
                                    <div
                                        className={`_order_045 ${id === index + 2 && "ripple01"} ${
                                            index + 2 <= id ? "_order_046" : "_order_tobe"
                                        }`}
                                        style={{
                                            pointerEvents: `${id < index + 2 && "none"}`,
                                        }}
                                        onMouseOver={() => {
                                            setStatus(status);
                                        }}
                                    ></div>
                                    <div className={`_order_044 ${index + 3 <= id ? "_order_046" : "_order_tobe"}`}></div>
                                </div>
                                <div className={`_order_042 ${index + 2 <= id ? "_order_042C" : "_order_042T"}`}>
                                    {index + 2 > id && "Exp by "} {formattedDate(order.order_timeline.shipped)}
                                </div>
                            </div>
                        )}
                </>
            ))}
            {order.order_status_index <= order.order_timeline_length &&
            (6 === order.order_timeline_length || 6 <= order.order_timeline_length - 1) ? (
                <div className={`_order_041 w-1-${order.order_timeline_length} _order_116`}>
                    <div className={`_order_042 ${6 <= id ? "_order_042C" : "_order_042T"}`}>Delivered</div>
                    <div className="_order_043 flexCenCen">
                        <div className={`_order_044 ${6 <= id ? "_order_046" : "_order_tobe"}`}></div>
                        <div
                            className={`_order_045 ${6 <= id ? "_order_046" : "_order_tobe"}`}
                            style={{
                                pointerEvents: `${id < 6 && "none"}`,
                            }}
                            onMouseOver={() => {
                                setStatus("delivered");
                            }}
                        ></div>
                        <div
                            className={`_order_044 ${6 !== order.order_timeline_length ? (6 <= id ? "_order_046" : "_order_tobe") : ""}`}
                        ></div>
                    </div>
                    <div className={`_order_042 ${6 <= id ? "_order_042C" : "_order_042T"}`}>
                        {6 > id && "Exp by "}
                        {formattedDate(order.order_timeline.delivered)}
                    </div>
                </div>
            ) : (
                <div className={`_order_041 w-1-${order.order_timeline_length} _order_116`}>
                    <div className="_order_042 _order_042Can">Cancelled</div>
                    <div className="_order_043 flexCenCen">
                        <div className="_order_044 _order_cancelled"></div>
                        <div
                            className="_order_045 _order_cancelled"
                            onMouseOver={() => {
                                setStatus("cancelled");
                            }}
                        ></div>
                        <div className="_order_044 _order_cancelled" style={{ visibility: "hidden" }}></div>
                    </div>
                    <div className="_order_042">{formattedDate(order.order_timeline.cancelled)}</div>
                </div>
            )}
            <div className="_order_117">
                <button
                    style={{
                        border: "none",
                        background: "transparent",
                        color: "blueviolet",
                        fontSize: "14px",
                    }}
                    onClick={() => {
                        setOpenDetail((lastState) => !lastState);
                    }}
                >
                    {openDetail ? "See All Updates >" : "Close Update X"}
                </button>
            </div>
        </div>
    );
};
