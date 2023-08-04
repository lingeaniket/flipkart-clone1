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

    // Get the month (0: January, 1: February, ..., 11: December)
    const month = fullDate.toLocaleString('en-US', { month: 'long' });

    // Get the day of the month (1, 2, 3, ..., 31)
    const date = fullDate.getDate();

    // Format the desired string "day month date"
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