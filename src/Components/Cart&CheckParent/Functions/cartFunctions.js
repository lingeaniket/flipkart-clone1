import axios from "axios";

export const loadCartData = async (cart, savelater, setCartProducts, setSaveLaterProducts, setLoader) => {
    const cartPromises = cart.map((item) => fetchData(item.id, item.quantity));
    const saveLaterPromises = savelater.map((item) => fetchData(item.id, item.quantity));

    const cartData = await Promise.all(cartPromises);
    const saveLaterData = await Promise.all(saveLaterPromises);

    setCartProducts(cartData.filter((item) => item !== null));
    setSaveLaterProducts(saveLaterData.filter((item) => item !== null));
    setTimeout(() => {
        setLoader(false);
    }, 1000);
}

const fetchData = async (id, quantity) => {
    try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        return {
            product: response.data,
            quantity: quantity
        }
    } catch (error) {
        console.error(`Error fetching data for ${id}:`, error);
        return null;
    }
};


