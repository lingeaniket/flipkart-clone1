export const layoutDelivery = (time) => {

    const currentDate = new Date(time);

    // for practicle work

    // const order_shipped = new Date(currentDate)
    // const currentMinute = currentDate.getMinutes();
    // order_shipped.setMinutes(currentMinute + 2);

    // const order_out_for_delivery = new Date(order_shipped);
    // const shippped_date = order_shipped.getDate();
    // order_out_for_delivery.setHours(shippped_date+3);

    // const order_delivered = new Date(order_out_for_delivery);
    // const out_minutes = order_out_for_delivery.getMinutes();
    // order_delivered.setMinutes(out_minutes + 45)

    //instances
    const order_shipped = new Date(currentDate)
    const currentMinute = currentDate.getMinutes();
    order_shipped.setMinutes(currentMinute + 2);

    const order_in_transit = new Date(order_shipped);
    const shipped_minute = order_shipped.getMinutes();
    order_in_transit.setMinutes(shipped_minute + 2);

    const order_nearest_hub = new Date(order_in_transit);
    const transit_minute = order_in_transit.getMinutes();
    order_nearest_hub.setMinutes(transit_minute + 2);

    const order_out_for_delivery = new Date(order_nearest_hub);
    const hub_minute = order_nearest_hub.getMinutes();
    order_out_for_delivery.setMinutes(hub_minute + 2);

    const order_delivered = new Date(order_out_for_delivery);
    const out_minutes = order_out_for_delivery.getMinutes();
    order_delivered.setMinutes(out_minutes + 2)

    const return_policy = new Date(order_delivered);
    const delivery_minutes = order_delivered.getMinutes();
    return_policy.setMinutes(delivery_minutes + 5);

    return {
        shipped: order_shipped.getTime(),
        in_transit: order_in_transit.getTime(),
        nearest_hub: order_nearest_hub.getTime(),
        out_for_delivery: order_out_for_delivery.getTime(),
        delivered: order_delivered.getTime(),
        return_policy: return_policy.getTime(),
    }
}

export const checkStatusAndUpdate = (order) => {
    //order_details, order_status, order_id, order_date, order_timeline
    if (order.order_status === 'cancelled' || order.order_status === 'returned') {
        return order
    } else {
        const new_status = checkAndUpdate(order.order_timeline, order.order_status, order.order_status_index);
        return { ...order, order_status: new_status.status, order_status_index : new_status.index }
    }
}

export const checkAndUpdate = (timeline, status, index) => {
    const currentDate = new Date();

    const currenTime = currentDate.getTime();

    if (status === 'cancelled' || status === 'returned') {
        return { status, index };
    }

    if (timeline.delivered < currenTime) {
        return { status: "delivered", index: 6 };
    } else if (timeline.out_for_delivery < currenTime) {
        return { status: "out_for_delivery", index: 5 };
    } else if (timeline.nearest_hub < currenTime) {
        return { status: "nearest_hub", index: 4 };
    } else if (timeline.in_transit < currenTime) {
        return { status: "in_transit", index: 3 }
    } else if (timeline.shipped < currenTime) {
        return { status: "shipped", index: 2 };
    } else {
        return { status, index }
    }
}