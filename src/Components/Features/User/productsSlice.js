import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";



export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        // (localStorage.getItem('products') !== null ? JSON.parse(localStorage.getItem('products')) : productData),
        searched: false,
        searchedKey: '',
        originalItems: [],
        searchedItems: [],
        filter: []
    },
    reducers: {
        addSearched: (state, action) => {
            state.searchedItems = state.products.filter((product) => {
                return product.title.toLowerCase().includes(action.payload.searchKey.toLowerCase()) ||
                    product.category.toLowerCase().includes(action.payload.searchKey.toLowerCase()) ||
                    product.description.toLowerCase().includes(action.payload.searchKey.toLowerCase())
            });
            state.originalItems = state.searchedItems;
            state.searchedKey = action.payload;
            state.searched = true;
            let filter = [];
            const filter1 =  state.searchedItems.map((item, i) => {
                        return filter.findIndex((cat) => cat.category === item.category) === -1 && { category: item.category, checked: false }
                      })
            state.filter = [...new Map(filter1.map(v => [JSON.stringify(v), v])).values()];
            // console.log(state.filter);
            return state;
        },
        removeFilter : (state, action) => {state.searched = false;
            // state.filter = [];
            state.filter = state.filter.map((item)=> { return {category: item.category, checked: false}})
        return state},
        filterProducts: (state, action) => {

            // // action = {category, checked}
            state.searched = true;
            let arr2 = state.filter.map(a => {return {...a}});
            //   console.log(arr2.find(a => a.category === action.payload.category));
              arr2.find(a => a.category === action.payload.category).checked = action.payload.checked;
              state.filter = arr2;

              if(state.filter.some((category)=>  category.checked === true) === false) {
                // console.log('false')
                state.searchedItems = state.originalItems;
              } else {
                // console.log('true')
                
              state.searchedItems = state.originalItems.filter((item)=> {
                // console.log('working item');
                return state.filter.some((category)=> {
                    if(category.checked === true && item.category === category.category){
                        // console.log('yes thi sis the category')
                    }
                    return category.checked === true && item.category === category.category;
                })
              })
            }
            return state;
        },
        load: (state, action) => {
            state.products = action.payload;
            let filter = [];
            const filter1 =  state.products.map((item, i) => {
                        return filter.findIndex((cat) => cat.category === item.category) === -1 && { category: item.category, checked: false }
                      })
            state.filter = [...new Map(filter1.map(v => [JSON.stringify(v), v])).values()];
            state.originalItems = state.products;

        }
    }
})

export const { addSearched, filterProducts, load, removeFilter } = productSlice.actions;

export default productSlice.reducer;