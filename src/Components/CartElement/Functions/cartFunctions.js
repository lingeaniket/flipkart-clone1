import { decrementSingleOrdeQuantity, incrementSingleOrdeQuantity, removeSingleOrder, updateSingleOrdeQuantityByValue } from "../../Features/User/orderDetailsSlice";
import {
    addToSaveLater, moveToCart, removeFromCart, incrementQuantity,
    decrementQuantity,
    updateByValue,
} from "../../Features/User/userCartSlice";

export const saveProductForLater = (item, handleSnackBar, setMessage, setAlertType, dispatch) => {
    setTimeout(() => {
        handleSnackBar();
        setAlertType("success")
        setMessage(<span><i>"<b>{item.product.title}</b>"</i> is successfully Saved for later</span>)
        dispatch(addToSaveLater(item.product.id));
    }, 500)
}

export const moveProductToCart = (item, handleSnackBar, setMessage, setAlertType, dispatch) => {
    setTimeout(() => {
        handleSnackBar();
        setAlertType("success")
        setMessage(<span><i>"<b>{item.product.title}</b>"</i> is successfully Moved to Cart</span>)
        dispatch(moveToCart(item.product.id));
    }, 500)
}

export const removeProduct = (method, item, handleSnackBar, setAlertType, setMessage, dispatch) => {
    setTimeout(() => {
        handleSnackBar();
        setAlertType("success")
        setMessage(<span><i>"<b>{item.product.title}</b>"</i> is successfully Removed from Cart</span>);
        if (method === 'single') {
            dispatch(removeSingleOrder());
        } else {
            dispatch(removeFromCart(item.product.id))
        }
    }, 500)
}

export const handleQuantity = (method, type, item, dispatch, timeId, setMessage, handleSnackBar, setAlertType) => {
    clearInterval(timeId);
    setTimeout(() => {
        if (method === 'decrease') {
            if (type === 'single') {
                dispatch(decrementSingleOrdeQuantity());
            } else {
                dispatch(decrementQuantity(item.product.id));
            }
            setMessage(<span>Quantity of <i>"<b>{item.product.title}</b>"</i> is changed to <b>{Math.max(Number(item.quantity) - 1, 1)}</b></span>)
        } else {

            if ((item.quantity + 1) > 5) {

                setMessage(<span>We're sorry! Only 5 unit(s) allowed in each order</span>)
            } else {
                if (type === 'single') {
                    dispatch(incrementSingleOrdeQuantity());
                } else {
                    dispatch(incrementQuantity(item.product.id));
                }
                setMessage(<span>Quantity of <i>"<b>{item.product.title}</b>"</i> is changed to <b>{Math.max(Number(item.quantity) + 1, 1)}</b></span>)
            }
        }
        handleSnackBar();
        setAlertType("info");
    }, 500)
}

export const handleInputQuantity = (event, method, item, setMessage, handleSnackBar, setAlertType, timeId, dispatch, setTimeId) => {
    if (event.target.value > 0) {
        clearInterval(timeId);
        if (event.target.value > 5) {

            if (method === 'single') {
                dispatch(updateSingleOrdeQuantityByValue({ setValue: 5 }))
            } else {
                dispatch(updateByValue({ id: item.product.id, setValue: 5 }));
            }
            setTimeout(() => {
                handleSnackBar();
                setAlertType("info")
                setMessage(<span>We're sorry! Only 5 unit(s) allowed in each order</span>)
            }, 500)
        } else {
            if (method === 'single') {
                dispatch(updateSingleOrdeQuantityByValue({ setValue: event.target.value }))
            } else {
                dispatch(updateByValue({ id: item.product.id, setValue: event.target.value }));
            }

            setTimeout(() => {
                handleSnackBar();
                setAlertType("info")
                setMessage(<span>Quantity of <i>"<b>{item.product.title}</b>"</i> is changed to <b>{Math.max(Number(event.target.value), 1)}</b></span>)
            }, 500)
        }
    } else {
        const tId = setTimeout(() => {
            event.target.value = 1;
            if (method === 'single') {
                dispatch(updateSingleOrdeQuantityByValue({ setValue: 1 }))
            } else {

                dispatch(updateByValue({ id: item.product.id, setValue: 1 }));
            }
        }, 3000)
        setTimeId(tId);
        if (method === 'single') {
            dispatch(updateSingleOrdeQuantityByValue({ setValue: '' }))
        } else {
            dispatch(updateByValue({ id: item.product.id, setValue: '' }));
        }
        setTimeout(() => {
            handleSnackBar();
            setAlertType("info")
            setMessage(<span>Quantity of <i>"<b>{item.product.title}</b>"</i> is changed to <b>{Math.max(Number(event.target.value), 1)}</b></span>)
        }, 500)
    }
}