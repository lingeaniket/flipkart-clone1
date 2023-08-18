export const getOrderTimeLineIndex = (status) => {
    switch (status) {
        case 'confirmed': return 1;
        case 'shipped': return 2;
        case 'in_transit': return 3;
        case 'nearest_hub': return 4;
        case 'out_for_delivery': return 5;
        case 'delivered': return 6;
        case 'cancelled': return 7;
        case 'returned': return 7;
        default: return 1;
    }
}

export const formattedDate = (time) => {
    const fullDate = new Date(time);

    const dayOfWeek = fullDate.toLocaleString('en-US', { weekday: 'long' }).slice(0, 3);
    const month = fullDate.toLocaleString('en-US', { month: 'long' });

    const date = fullDate.getDate();

    const formattedDate = `${dayOfWeek} ${month} ${date}`;

    return formattedDate;
}


export const formattedFullDate = (time) => {
    const options = {
        weekday: 'long',       // Full weekday name (e.g., "Monday")
        month: 'long',         // Full month name (e.g., "January")
        day: 'numeric',        // Day of the month (1, 2, ..., 31)
        hour: 'numeric',       // Hour (1, 2, ..., 12)
        minute: '2-digit',     // Minutes (00, 01, ..., 59)
        hour12: true           // Use 12-hour clock format with am/pm
    };

    return new Date(time).toLocaleString('en-US', options);
}

export const handleFilter = (orderStatus, orderTime, orders, searchKey) => {
    let newOrderList = orders;
    if (orderStatus.some(status => status)) {
        orderStatus.map((status, index) => {
            if (status) {
                newOrderList = handleStatus(index, newOrderList);
            }
            return true
        })
    }
    if (orderTime.some(status => status)) {
        orderTime.map((status, index) => {
            if (status) {

                newOrderList = handleTime(index, newOrderList)
            }
            return true
        })
    }
    if (searchKey) {
        newOrderList = handleSearch(searchKey, newOrderList);
    }

    return newOrderList;

}

const handleStatus = (index, orderList) => {
    // console.log(orderList)
    switch (index) {
        case 0: {
            return orderList.filter((order) => order.order_status !== 'delivered' && order.order_status !== 'cancelled' && order.order_status !== 'returned')
        }
        case 1: {
            return orderList.filter((order) => order.order_status === 'delivered')
        }
        case 2: {
            return orderList.filter((order) => order.order_status === 'cancelled')
        }
        case 3: {
            return orderList.filter((order) => order.order_status === 'returned')
        }

        default: {
            return orderList
        }
    }

}

const handleTime = (index, orderList) => {
    const currentTime = new Date();
    switch (index) {
        case 0: {
            const last30thDayTime = new Date(currentTime);
            last30thDayTime.setDate(currentTime.getDate() - 30);
            return orderList.filter((order) => order.order_date >= last30thDayTime.getTime())
        }
        case 1: {
            return orderList.filter((order) => new Date(order.order_date).getFullYear() === 2022)
        }
        case 2: {
            return orderList.filter((order) => new Date(order.order_date).getFullYear() === 2021)
        }
        case 3: {
            return orderList.filter((order) => new Date(order.order_date).getFullYear() === 2020)
        }
        case 4: {
            return orderList.filter((order) => new Date(order.order_date).getFullYear() <= 2020)
        }
        default: {
            return orderList;
        }
    }
}

export const handleSearch = (keyword, orderList) => {
    const key = keyword.toLowerCase();
    return orderList.filter((order) => {
        return order.order_details.products.some((product) =>
            product.unit.title.toLowerCase().includes(key) ||
            product.unit.description.toLowerCase().includes(key) ||
            product.unit.brand.toLowerCase().includes(key) ||
            product.unit.category.toLowerCase().includes(key) ||
            product.order_id.includes(key) ||
            product.item_id.includes(key) ||
            product.unit_id.includes(key)
        )
    })
}