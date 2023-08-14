import axios from "axios";

import { addLoadedItems } from "../../Features/User/productsSlice";

export function generateRandom(start, end, number) {
    const range = end - start + 1;
    if (range <= 0) {
        throw new Error("Invalid range. The range must be greater than 7 to generate 7 unique numbers.");
    }

    const allNumbers = Array.from({ length: range }, (_, index) => start + index);

    for (let i = allNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]];
    }

    return allNumbers.slice(0, number);
}

export const categories = [
    "smartphones", "laptops", "fragrances", "skincare",
    "groceries", "home-decoration", "furniture", "tops",
    "womens-dresses", "womens-shoes", "mens-shirts", "mens-shoes",
    "mens-watches", "womens-watches", "womens-bags", "womens-jewellery",
    "sunglasses", "automotive", "motorcycle", "lighting"
];

export const topCategories = [
    { title: 'Smart Phones', link: 'smartphones' },
    { title: 'Laptops', link: 'laptops' },
    { title: 'Sun Glasses', link: 'sunglasses' },
    { title: 'Womens Shoes', link: 'womens-shoes' },
    { title: 'Mens Shoes', link: 'mens-shoes' },
]

export const loadData = async (item) => {
    try {
        const response = await axios.get(`https://dummyjson.com/products/category/${categories[item]}`);
        const prodrange = generateRandom(0, response.data.products.length - 1, 5);

        return {
            category: categories[item],
            products: response.data.products.filter((product, index) => prodrange.includes(index)),
        };
    } catch (error) {
        console.error(`Error fetching data for ${categories[item]}:`, error);
        return null;
    }
};

export const loadMoreData = async (setProducts, dispatch, setLoaded) => {
    const range = generateRandom(0, 19, 8);
    const promises = range.map((item) => loadData(item));
    const fetchedData = await Promise.all(promises);
    const data = fetchedData.filter((item) => item !== null)
    setProducts((prevData) => [...prevData, ...data])

    dispatch(addLoadedItems(fetchedData.filter((item) => item !== null)))
    setTimeout(() => {
        setLoaded(true)
    }, 1000)
}