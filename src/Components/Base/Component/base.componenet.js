import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import '../Styles/base.css'
import Currosal from '../../Currosal/Currosal';
import { addLoadedItems } from '../../Features/User/productsSlice';
import CategoryList from '../../CategoryList/Component/CategoryList';
import { generateRandom, categories, topCategories } from '../Functions/baseFunctions';

import { Skeleton } from '@mui/material';

const Base = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState([]);

    const loadedItems = useSelector(state => state.productState.loadedItems)

    const range = generateRandom(0, 19, 8);

    const fetchData = async (item) => {
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
        const fetchCategoryData = async () => {
            const promises = range.map((item) => fetchData(item));
            const fetchedData = await Promise.all(promises);
            setProducts(fetchedData.filter((item) => item !== null));
            dispatch(addLoadedItems(fetchedData.filter((item) => item !== null)))
            setTimeout(() => {
                setLoaded(true)
            }, 1000)
        };
        if (loadedItems.length > 0) {
            setProducts(loadedItems)
            setTimeout(() => {
                setLoaded(true)
            }, 1000)
        } else {
            fetchCategoryData();
        }

        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div>
                <div className='_base_002'>
                    <div className='_base_003'>
                        {topCategories.map((category, index) =>
                            <div key={index} className='categoryStyle' onClick={() => {
                                navigate(`/search?category=${category.link}`)
                            }}>{category.title}</div>
                        )}
                    </div>
                </div>
                <Currosal />
                <div>
                    {!loaded
                        ?
                        (
                            <>
                                {Array.from({ length: 8 }).map((ele, index) =>
                                    <Skeleton width='100%' variant='rectangular' animation="wave" height="310px" sx={{ background: 'white', borderRadius: '5px', margin: '10px 5px' }} />
                                )}
                            </>
                        )
                        :
                        ((products.length === 8)
                            &&
                            (products.map((product, index) =>
                                <CategoryList key={index + product.category} product={product} />
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Base