import { formattedDate } from "../Functions/orderListFunctions";
import { useState } from "react";

export const Timeline = ({ order, id, setStatus }) => {
    const [openDetail, setOpenDetail] = useState(true);

    return (
        <div className="disFlexJusConCen">
            {((order.order_status_index <= order.order_timeline_length)
                && (1 <= order.order_timeline_length - 1))
                &&
                <div className={`_order_041 w-1-${order.order_timeline_length} _order_116`}>
                    <div className="_order_042 _order_042C">Order Confirmed</div>
                    <div className="_order_043 flexCenCen">
                        <div className={`_order_044`}></div>
                        <div className={`_order_045 ${id === 1 && 'ripple01'} _order_046`} onMouseOver={() => {
                            setStatus('confirmed')
                        }}></div>
                        <div className={`_order_044 ${2 <= id ? '_order_046' : '_order_tobe'}`}></div>
                    </div>
                    <div className="_order_042 _order_042C">{formattedDate(order.order_date)}</div>
                </div>
            }
            {((order.order_status_index <= order.order_timeline_length)
                && (2 <= order.order_timeline_length - 1))
                &&
                <div className={`_order_041 w-1-${order.order_timeline_length} ${(id > 2 && openDetail) ? '_order_115' : '_order_116'}`}>
                    <div className={`_order_042 ${2 <= id ? '_order_042C' : '_order_042T'}`}>Shipped</div>
                    <div className="_order_043 flexCenCen">
                        <div className={`_order_044 ${2 <= id ? '_order_046' : '_order_tobe'}`}></div>
                        <div className={`_order_045 ${id === 2 && 'ripple01'} ${2 <= id ? '_order_046' : '_order_tobe'}`}
                            style={{
                                pointerEvents: `${id < 2 && 'none'}`
                            }}
                            onMouseOver={() => {
                                setStatus('shipped')
                            }}></div>
                        <div className={`_order_044 ${3 <= id ? '_order_046' : '_order_tobe'}`}></div>
                    </div>
                    <div className={`_order_042 ${2 <= id ? '_order_042C' : '_order_042T'}`}>{2 > id && 'Exp by '} {formattedDate(order.order_timeline.shipped)}</div>
                </div>
            }
            {((order.order_status_index <= order.order_timeline_length)
                && (3 <= order.order_timeline_length - 1))
                &&
                <div className={`_order_041 w-1-${order.order_timeline_length} ${(id > 3 && openDetail) ? '_order_115' : '_order_116'}`}>
                    <div className={`_order_042 ${3 <= id ? '_order_042C' : '_order_042T'}`}>In Transit</div>
                    <div className="_order_043 flexCenCen">
                        <div className={`_order_044 ${3 <= id ? '_order_046' : '_order_tobe'}`}></div>
                        <div className={`_order_045 ${id === 3 && 'ripple01'} ${3 <= id ? '_order_046' : '_order_tobe'}`}
                            style={{
                                pointerEvents: `${id < 3 && 'none'}`
                            }}
                            onMouseOver={() => {
                                setStatus('in_transit')
                            }}></div>
                        <div className={`_order_044 ${4 <= id ? '_order_046' : '_order_tobe'}`}></div>
                    </div>
                    <div className={`_order_042 ${3 <= id ? '_order_042C' : '_order_042T'}`}>{3 > id && 'Exp by '}{formattedDate(order.order_timeline.in_transit)}</div>
                </div>
            }
            {((order.order_status_index <= order.order_timeline_length)
                && (4 <= order.order_timeline_length - 1))
                &&
                <div className={`_order_041 w-1-${order.order_timeline_length} ${(id > 4 && openDetail) ? '_order_115' : '_order_116'}`}>
                    <div className={`_order_042 ${4 <= id ? '_order_042C' : '_order_042T'}`}>Nearest Hub</div>
                    <div className="_order_043 flexCenCen">
                        <div className={`_order_044 ${4 <= id ? '_order_046' : '_order_tobe'}`}></div>
                        <div className={`_order_045 ${id === 4 && 'ripple01'} ${4 <= id ? '_order_046' : '_order_tobe'}`}
                            style={{
                                pointerEvents: `${id < 4 && 'none'}`
                            }}
                            onMouseOver={() => {
                                setStatus('nearest_hub')
                            }}></div>
                        <div className={`_order_044 ${5 <= id ? '_order_046' : '_order_tobe'}`}></div>
                    </div>
                    <div className={`_order_042 ${4 <= id ? '_order_042C' : '_order_042T'}`}>{4 > id && 'Exp by '} {formattedDate(order.order_timeline.nearest_hub)}</div>
                </div>
            }
            {((order.order_status_index <= order.order_timeline_length)
                && (5 <= order.order_timeline_length - 1))
                &&
                <div className={`_order_041 w-1-${order.order_timeline_length} ${(id > 5 && openDetail) ? '_order_115' : '_order_116'}`}>
                    <div className={`_order_042 ${5 <= id ? '_order_042C' : '_order_042T'}`}>Out for delivery</div>
                    <div className="_order_043 flexCenCen">
                        <div className={`_order_044 ${5 <= id ? '_order_046' : '_order_tobe'}`}></div>
                        <div className={`_order_045 ${id === 5 && 'ripple01'} ${5 <= id ? '_order_046' : '_order_tobe'}`}
                            style={{
                                pointerEvents: `${id < 5 && 'none'}`
                            }}
                            onMouseOver={() => {
                                setStatus('out_for_delivery')
                            }}></div>
                        <div className={`_order_044 ${6 <= id ? '_order_046' : '_order_tobe'}`}></div>

                    </div>
                    <div className={`_order_042 ${5 <= id ? '_order_042C' : '_order_042T'}`}>{5 > id && 'Exp by '}{formattedDate(order.order_timeline.out_for_delivery)}</div>
                </div>
            }
            {((order.order_status_index <= order.order_timeline_length)
                && (6 === order.order_timeline_length || 6 <= order.order_timeline_length - 1))
                ?
                <div className={`_order_041 w-1-${order.order_timeline_length} _order_116`}>
                    <div className={`_order_042 ${6 <= id ? '_order_042C' : '_order_042T'}`}>Delivered</div>
                    <div className="_order_043 flexCenCen">
                        <div className={`_order_044 ${6 <= id ? '_order_046' : '_order_tobe'}`}></div>
                        <div className={`_order_045 ${6 <= id ? '_order_046' : '_order_tobe'}`}
                            style={{
                                pointerEvents: `${id < 6 && 'none'}`
                            }}
                            onMouseOver={() => {
                                setStatus('delivered')
                            }}></div>
                        <div className={`_order_044 ${6 !== order.order_timeline_length ? (6 <= id ? '_order_046' : '_order_tobe') : ''}`}></div>
                    </div>
                    <div className={`_order_042 ${6 <= id ? '_order_042C' : '_order_042T'}`}>{6 > id && 'Exp by '}{formattedDate(order.order_timeline.delivered)}</div>
                </div>
                :
                <div className={`_order_041 w-1-${order.order_timeline_length} _order_116`}>
                    <div className="_order_042">Cancelled</div>
                    <div className="_order_043 flexCenCen">
                        <div className="_order_046"></div>
                        <div className="_order_45 _order_cancelled"
                            onMouseOver={() => {
                                setStatus('cancelled')
                            }}></div>
                        <div className="_order_044"></div>
                    </div>
                    <div className="_order_047">{formattedDate(order.order_timeline.cancelled)}</div>
                </div>
            }
            <div className="_order_117">
                <button style={{
                    border: 'none', background: 'transparent', color: 'blueviolet', fontSize: '14px'
                }} onClick={() => {
                    setOpenDetail((lastState) => !lastState)
                }}>{
                        openDetail ? 'See All Updates >' : 'Close Update X'
                    }</button>
            </div>
        </div>
    )
}