import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        searched: false,
        searchedKey: "",
        originalItems: [],
        searchedItems: [],
        loadedItems: [],
        filter: [],
    },
    reducers: {
        addSearched: (state, action) => {
            state.searchedItems = state.products.filter((product) => {
                return (
                    product.title.toLowerCase().includes(action.payload.searchKey.toLowerCase()) ||
                    product.category.toLowerCase().includes(action.payload.searchKey.toLowerCase()) ||
                    product.description.toLowerCase().includes(action.payload.searchKey.toLowerCase())
                );
            });

            state.originalItems = state.searchedItems;
            state.searchedKey = action.payload;
            state.searched = true;

            let filter = [];
            const filter1 = state.searchedItems.map((item, i) => {
                return filter.findIndex((cat) => cat.category === item.category) === -1 && { category: item.category, checked: false };
            });
            state.filter = [...new Map(filter1.map((v) => [JSON.stringify(v), v])).values()];
            return state;
        },
        addLoadedItems: (state, action) => {
            state.loadedItems = [...state.loadedItems, action.payload];
            return state;
        },
        sortProducts: (state, action) => {
            state.searched = true;
            // console.log(action.payload.sorting)
            switch (action.payload.sorting) {
                case "pasc":
                    state.searchedItems = state.searchedItems.sort((a, b) => {
                        return a.price - b.price;
                    });
                    return state;
                case "pdsc":
                    state.searchedItems = state.searchedItems.sort((a, b) => {
                        return b.price - a.price;
                    });
                    return state;
                case "nasc":
                    state.searchedItems = state.searchedItems.sort((a, b) => {
                        return a.title - b.title;
                    });
                    return state;
                case "ndsc":
                    state.searchedItems = state.searchedItems.sort((a, b) => {
                        return b.title - a.title;
                    });
                    return state;
                case "rasc":
                    state.searchedItems = state.searchedItems.sort((a, b) => {
                        return a.rating.rate - b.rating.rate;
                    });
                    return state;
                case "rdsc":
                    state.searchedItems = state.searchedItems.sort((a, b) => {
                        return b.rating.rate - a.rating.rate;
                    });
                    return state;
                case "remove":
                    state.searchedItems = state.originalItems;
                    return state;
                default:
                    state.searchedItems = state.originalItems;
                    return state;
            }
        },
        filterProducts: (state, action) => {
            state.searched = true;
            let arr2 = state.filter.map((a) => {
                return { ...a };
            });
            arr2.find((a) => a.category === action.payload.category).checked = action.payload.checked;
            state.filter = arr2;

            if (!state.filter.some((category) => category.checked === true)) {
                state.searchedItems = state.originalItems;
            } else {
                state.searchedItems = state.originalItems.filter((item) => {
                    return state.filter.some((category) => {
                        return category.checked === true && item.category === category.category;
                    });
                });
            }
            return state;
        },
        load: (state, action) => {
            state.products = action.payload;
            let filter = [];
            const filter1 = state.products.map((item, i) => {
                return filter.findIndex((cat) => cat.category === item.category) === -1 && { category: item.category, checked: false };
            });
            state.filter = [...new Map(filter1.map((v) => [JSON.stringify(v), v])).values()];
            state.originalItems = state.products;
            state.searchedItems = state.products;
        },

        removeFilter: (state, action) => {
            state.searched = false;
            let filter = [];
            const filter1 = state.products.map((item, i) => {
                return filter.findIndex((cat) => cat.category === item.category) === -1 && { category: item.category, checked: false };
            });
            state.filter = [...new Map(filter1.map((v) => [JSON.stringify(v), v])).values()];
            state.originalItems = state.products;
            state.searchedItems = state.products;
            return state;
        },
        search: (state) => {
            state.searched = true;
        },
    },
});

export const { addSearched, filterProducts, load, removeFilter, search, sortProducts, addLoadedItems } = productSlice.actions;

export default productSlice.reducer;
