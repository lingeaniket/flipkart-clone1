import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './base.css'
import { Button } from '@mui/material';

const currosal = [
    "https://rukminim1.flixcart.com/flap/1688/280/image/75a15c3e19c3f7de.jpg?q=50",
    "https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/8c1f16e3b6ceb589.jpeg?q=50",
    "https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/92d376fbe0892513.jpeg?q=50",
    "https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/a37c7aa9669fcd4c.jpg?q=50",
    "https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/6593790371ec0ef4.jpg?q=50",
    "https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/f9e33bc9015c3dfc.jpg?q=50"
]


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
            setLoaded(true)
        };

        fetchDataForAllKeywords();
        // eslint-disable-next-line
    }, [])
    
    return (
        <div>{
            loaded
                ?
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '50px', backgroundColor: 'white', marginBottom: '15px' }}>
                        <div style={{ width: '60%', display: 'flex', justifyContent: 'space-between' }}>
                            <div className='categoryStyle'>Mens Clothing</div>
                            <div className='categoryStyle'>Jewellery</div>
                            <div className='categoryStyle'>Womens Clothing</div>
                            <div className='categoryStyle'>SSD</div>
                            <div className='categoryStyle'>TV</div>
                        </div>
                    </div>
                    <div>
                        <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">{
                                currosal.map((curros, index) =>
                                    <div key={index} className="carousel-item active" data-bs-interval="3000">
                                        <img src={curros} className="d-block w-100" alt="..." />
                                    </div>
                                )
                            }
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                    </div>
                    <div>{
                        products.length === 8 &&
                        products.map((product, index) =>
                            <div
                                key={index + product.category}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    margin: '10px 5px',
                                    borderRadius: '5px',
                                    padding: '5px',
                                    backgroundColor: 'white'
                                }}
                            >
                                <div
                                    style={{ width: '15%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{ fontSize: '24px', textTransform: 'capitalize', textAlign: 'center' }}>
                                        Best of {product.category}
                                    </div>
                                    <div>
                                        <Button variant='contained'>View All</Button>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        backgroundColor: 'white',
                                        width: '85%',
                                        padding: '10px'
                                    }}
                                >{
                                        product.products
                                            ?
                                            product?.products?.map(product =>
                                                <div key={product.id}
                                                    className='baseProdDiv'
                                                    onClick={() => {
                                                        navigate(`/products/${product.title}/p/${product.id}`);
                                                    }}
                                                    style={{
                                                        width: '18%',
                                                        height: 'fit-content',
                                                        padding: '10px',
                                                        cursor: 'pointer'
                                                    }}>
                                                    <div className='baseImage' style={{ aspectRatio: 1 / 1, padding: '10px', }}>
                                                        <img src={product.thumbnail} width={'100%'} height={'100%'} alt={product.title} style={{ objectFit: 'contain' }} />
                                                    </div>
                                                    <div style={{ fontWeight: 'bold' }}>{product.title}</div>
                                                    <div>&#8377;{product.price}</div>
                                                    <div >Discount {product.discountPercentage}%</div>
                                                </div>)
                                            :
                                            null
                                    }</div>
                            </div>
                        )
                    }</div>
                </div>
                :
                null
        }</div>
    )
}

export default Base