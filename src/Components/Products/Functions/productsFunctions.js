import { setMessage, setOpen } from "../../Features/SnackBar/snackbarSlice";
import { addToWishList, removeFromWishList } from "../../Features/User/userWishListSlice";
import axios from "axios";

export const offers = [
    <><span>Eligible for Flipkart Pay later</span></>,
    <><span className="_prod_051">Bank Offer</span>
        <span>Flat $15 Off on HDFC Bank Credit Card EMI Trxns on orders priced between $165 to $445</span>
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <span className="_prod_053 _prod_033">T&C</span>
        </div>
    </>,
    <>
        <span className="_prod_051">Bank Offer</span>
        <span>10% Instant Discount on HDFC Bank Credit Cards, up to $11 on orders of $55 and above</span>
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <span className="_prod_053 _prod_033">T&C</span>
        </div>
    </>,
    <>
        <span className="_prod_051">Bank Offer</span>
        <span>Flat $30 Off on HDFC Bank Credit Card EMI Trxns on orders priced between $445 to $555</span>
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <span className="_prod_053 _prod_033">T&C</span>
        </div>
    </>
]


export const handleCheck = (event, id, dispatch) => {
    if (event.target.checked) {
        setTimeout(() => {
            dispatch(setOpen(true));
            dispatch(setMessage(`Added to your Wishlist`))
            dispatch(addToWishList(id))
        }, 500);
    } else {
        setTimeout(() => {
            dispatch(setOpen(true));
            dispatch(setMessage(`Removed from your Wishlist`));
            dispatch(removeFromWishList(id))
        }, 500);
    }
}

export const fetchData = async (product_id) => {
    try {
        const productResponse = await axios.get(`https://dummyjson.com/products/${product_id}`);
        const relatedProductsResponse = await axios.get(`https://dummyjson.com/products/category/${productResponse.data.category}`)
        return {
            product: productResponse.data,
            relatedProducts: relatedProductsResponse.data.products.filter((product) => product.id !== Number(product_id))
        };
    } catch (error) {
        console.error(`Error fetching data for:`, error);
        return null;
    }
};

export const fetchRelatedData = async (itemId) => {
    try {
        const response = await axios.get(`https://dummyjson.com/products/${itemId}`);

        return response.data
    } catch (error) {
        console.error(`Error fetching data for ${itemId}:`, error);
        return null;
    }
};