import axios from "axios";
export const handleSorting = (index, products) => {
    switch (index) {
        case 1: {
            return products.sort((a, b) => a.rating - b.rating);
        }
        case 2: {
            return products.sort((a, b) => a.price - b.price);
        }
        case 3: {
            return products.sort((a, b) => b.price - a.price);
        }
        default: {
            return products.sort((a, b) => a.id - b.id);
        }
    }
};

export const loadProducts = async (
    category,
    q,
    setProducts,
    setOrgProducts,
    setLoader,
    page,
    setNoProducts,
    selectedSort,
    ratingStatus
) => {
    let products = [];
    if (category) {
        await axios.get(`https://dummyjson.com/products/category/${category}`).then((response) => {
            products = response.data.products;
        });
    } else if (q) {
        await axios.get(`https://dummyjson.com/products/search?q=${q}`).then((response) => {
            products = response.data.products;
        });
    } else {
        await axios.get(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`).then((response) => {
            products = response.data.products;
        });
    }

    setOrgProducts(() => products);
    let newProducts = filterProducts(ratingStatus, products);
    newProducts = handleSorting(selectedSort, newProducts);
    setProducts(() => newProducts);
    setTimeout(() => {
        setLoader(false);
    }, 1000);
    setTimeout(() => {
        if (newProducts.length === 0) {
            setNoProducts(<div>No Such Products</div>);
        }
    }, 3000);
};

export const filterProducts = (ratingStatus, orgProducts) => {
    let newproducts = orgProducts;
    if (ratingStatus.some((status) => status)) {
        ratingStatus.map((rating, index) => {
            if (rating) {
                newproducts = newproducts.filter((product) => {
                    if (index === 0) return product.rating >= 4;
                    else return product.rating >= 3;
                });
            }
            return true;
        });
    }
    return newproducts;
};
