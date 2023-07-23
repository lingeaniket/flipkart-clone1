import {
    addToSaveLater, moveToCart, removeFromCart, incrementQuantity,
    decrementQuantity,
    updateByValue,
} from "../Features/User/userCartSlice";

export const saveProductForLater = (item, handleSnackBar, setMessage, setAlertType, dispatch) => {
    document.getElementById('loader').classList.toggle('showLoader');
    setTimeout(() => {
        document.getElementById('loader').classList.toggle('showLoader');
        handleSnackBar();
        setAlertType("success")
        setMessage(<span><i>"<b>{item.product.title}</b>"</i> is successfully Saved for later</span>)
        dispatch(addToSaveLater(item.product.id));
    }, 500)
}

export const moveProductToCart = (item, handleSnackBar, setMessage, setAlertType, dispatch) => {
    document.getElementById('loader').classList.toggle('showLoader');
    setTimeout(() => {
        document.getElementById('loader').classList.toggle('showLoader');
        handleSnackBar();
        setAlertType("success")
        setMessage(<span><i>"<b>{item.product.title}</b>"</i> is successfully Moved to Cart</span>)
        dispatch(moveToCart(item.product.id));
    }, 500)
}

export const removeProductFromCart = (item, handleSnackBar, setAlertType, setMessage, dispatch) => {
    document.getElementById('loader').classList.toggle('showLoader');
    setTimeout(() => {
        document.getElementById('loader').classList.toggle('showLoader');
        handleSnackBar();
        setAlertType("success")
        setMessage(<span><i>"<b>{item.product.title}</b>"</i> is successfully Removed from Cart</span>)
        dispatch(removeFromCart(item.product))
    }, 500)
}

export const handleQuantity = (method, item, dispatch, timeId, setMessage, handleSnackBar, setAlertType) => {
    document.getElementById('loader').classList.toggle('showLoader');
    clearInterval(timeId);
    setTimeout(() => {
        document.getElementById('loader').classList.toggle('showLoader');
        if (method === 'decrease') {
            dispatch(decrementQuantity(item.product.id));
            setMessage(<span>Quantity of <i>"<b>{item.product.title}</b>"</i> is changed to <b>{Math.max(Number(item.quantity) - 1, 1)}</b></span>)
        } else {
            dispatch(incrementQuantity(item.product.id));
            setMessage(<span>Quantity of <i>"<b>{item.product.title}</b>"</i> is changed to <b>{Math.max(Number(item.quantity) + 1, 1)}</b></span>)
        }
        handleSnackBar();
        setAlertType("info")
    }, 500)
}

export const handleInputQuantity = (event, item, setMessage, handleSnackBar, setAlertType, timeId, dispatch, setTimeId) => {
    if (event.target.value > 0) {
        clearInterval(timeId);
        dispatch(updateByValue({ id: item.product.id, setValue: event.target.value }));
        document.getElementById('loader').classList.toggle('showLoader');
        setTimeout(() => {
            handleSnackBar();
            setAlertType("info")
            setMessage(<span>Quantity of <i>"<b>{item.product.title}</b>"</i> is changed to <b>{Math.max(Number(event.target.value), 1)}</b></span>)
            document.getElementById('loader').classList.toggle('showLoader');
        }, 500)
    }
    else {
        const tId = setTimeout(() => {
            event.target.value = 1;
            dispatch(updateByValue({ id: item.product.id, setValue: 1 }));
        }, 3000)
        setTimeId(tId);
        dispatch(updateByValue({ id: item.product.id, setValue: '' }));
        document.getElementById('loader').classList.toggle('showLoader');
        setTimeout(() => {
            handleSnackBar();
            setAlertType("info")
            setMessage(<span>Quantity of <i>"<b>{item.product.title}</b>"</i> is changed to <b>{Math.max(Number(event.target.value), 1)}</b></span>)
            document.getElementById('loader').classList.toggle('showLoader');
        }, 500)
    }
}