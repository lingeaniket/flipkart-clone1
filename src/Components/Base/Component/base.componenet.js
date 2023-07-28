import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Styles/base.css'
import { CircularProgress } from '@mui/material';
import Currosal from '../../Currosal/Currosal';
import CategoryList from '../../CategoryList/Component/CategoryList';
import { useDispatch, useSelector } from 'react-redux';
import { addLoadedItems } from '../../Features/User/productsSlice';

function generateRandom(start, end, number) {
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

const Base = () => {
    const categories = [
        "smartphones", "laptops", "fragrances", "skincare",
        "groceries", "home-decoration", "furniture", "tops",
        "womens-dresses", "womens-shoes", "mens-shirts", "mens-shoes",
        "mens-watches", "womens-watches", "womens-bags", "womens-jewellery",
        "sunglasses", "automotive", "motorcycle", "lighting"
    ];

    const navigate = useNavigate();
    const [products, setProducts] = useState([])
    const [loaded, setLoaded] = useState(false);
    const range = generateRandom(0, 19, 8);
    const dispatch = useDispatch();
    const loadedItems = useSelector(state=> state.productState.loadedItems)

    const fetchDataForKeyword = async (item) => {
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
    useEffect(() => {
        const fetchDataForAllKeywords = async () => {
            const promises = range.map((item) => fetchDataForKeyword(item));
            const fetchedData = await Promise.all(promises);
            setProducts(fetchedData.filter((item) => item !== null));
            dispatch(addLoadedItems(fetchedData.filter((item) => item !== null)))
            setLoaded(true)
        };
        if(loadedItems.length > 0){
            setProducts(loadedItems)
            setLoaded(true)
        } else {

            fetchDataForAllKeywords();
        }

        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '50px', backgroundColor: 'white', marginBottom: '15px' }}>
                    <div style={{ width: '60%', display: 'flex', justifyContent: 'space-between' }}>
                        <div className='categoryStyle' onClick={() => {
                            navigate('/search?category=smartphones')
                        }}>Smart Phones</div>
                        <div className='categoryStyle' onClick={() => {
                            navigate('/search?category=laptops')
                        }}>Laptops</div>
                        <div className='categoryStyle' onClick={() => {
                            navigate('/search?category=sunglasses')
                        }}>Sunglasses</div>
                        <div className='categoryStyle' onClick={() => {
                            navigate('/search?category=lighting')
                        }}>Lighting</div>
                        <div className='categoryStyle' onClick={() => {
                            navigate('/search?category=womens-shoes')
                        }}>Womens Shoes</div>
                        <div className='categoryStyle' onClick={() => {
                            navigate('/search?category=mens-shoes')
                        }}>Mens Shoes</div>
                    </div>
                </div>
                <Currosal />
                <div>{!loaded
                    ?
                    <div style={{
                        display: 'flex',
                        height: '300px',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <CircularProgress />
                    </div>
                    :
                    products.length === 8 &&
                    products.map((product, index) => <CategoryList key={index + product.category} product={product} />)
                }</div>
            </div>
        </div>
    )
}

export default Base