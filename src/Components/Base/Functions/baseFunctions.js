export function generateRandom(start, end, number) {
    const range = end - start + 1;
    console.log(number, range)
    if (range <= 0) {
        throw new Error("Invalid range. The range must be greater than 7 to generate 7 unique numbers.");
    }

    // Create an array with all the numbers in the given range
    const allNumbers = Array.from({ length: range }, (_, index) => start + index);

    // Shuffle the array to randomize the order
    for (let i = allNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]];
    }

    // Return the first 7 elements of the shuffled array
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
    {
        title : 'Smart Phones',
        link : 'smartphones',
    },
    {
        title : 'Laptops',
        link : 'laptops'
    }, 
    {
        title : 'Sun Glasses',
        link : 'sunglasses'
    },
    {
        title : 'Womens Shoes',
        link : 'womens-shoes'
    },
    {
        title : 'Mens Shoes',
        link : 'mens-shoes'
    },

]