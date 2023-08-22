import axios from "axios";
export const fetchData = async (id)=>{
    try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        return response.data
    } catch (error) {
        console.error(`Error fetching data for ${id}:`, error);
        return null;
    }

}

export const loadData = async (setProducts, range)=>{
    // const range = generateRandom(1, 100, 6);
    const promises = range.map((item) => fetchData(item));
    const fetchedData = await Promise.all(promises);
    const data = fetchedData.filter((item) => item !== null)
    setProducts(data);
}