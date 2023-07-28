import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import ContentLoader from '../../Loader/contentLoader.component';
import Homechild from './HomeChild.component';

import '../Styles/home.css';
import '../Styles/homeStyles.css';
import { Checkbox, FormGroup, FormControlLabel, Pagination } from '@mui/material';


const Home = () => {
    const filters = [4, 3];
    const sorting = ['Relevance', 'Popularity', 'Price -- Low to High', 'Price -- High to Low',]
    const location = useLocation();

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const q = searchParams.get('q');

    const navigate = useNavigate();

    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [checked, setChecked] = useState([false, false]);
    const [selectedSort, setSelectedSort] = useState(0);
    const [loader, setLoader] = useState(true);
    const [products, setProducts] = useState();

    const wishListItems = useSelector(state => state.wishListState.wishListItems)

    const handleChange = (event, idx) => {
        checked[idx] = event.target.checked;
        setChecked((checked) => [...checked]);
    };

    const handleChangePage = (event, value) => {
        setPage(() => value);
        const searchParam = new URLSearchParams(location.search);
        searchParam.set('page', value)
        navigate('?' + searchParam.toString(), { replace: true });
    };
    const handleSort = (index) => {
        setSelectedSort(index)

    }

    useEffect(() => {
        if (category) {
            axios.get(`https://dummyjson.com/products/category/${category}`).then((response) => {
                setProducts(response.data.products);
                setTimeout(() => {
                    setLoader(false);
                }, 1000)
            })
        } else if (q) {
            axios.get(`https://dummyjson.com/products/search?q=${q}`).then((response) => {
                setProducts(response.data.products)
                setTimeout(() => {
                    setLoader(false);
                }, 1000)
            })
        } else {
            axios.get(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`).then((response) => {
                setProducts(response.data.products)
                setTimeout(() => {
                    setLoader(false);
                }, 1000)
            })
        }

    }, [wishListItems, category, q, page]);

    return (
        <>
            {loader ? <ContentLoader /> : null}
            {!loader
                ?
                <div className='_home_001'>
                    <div className='_home_002'>
                        <div className='_home_003 _home_020'>
                            <div className='w-1-1 _home_020'>
                                <div className='w-1-1'>
                                    <div className='_home_007'>
                                        <section className='_home_008'>
                                            <div className='flexSpaceBetCen'>
                                                <div className='_home_009'>
                                                    <span>Filters</span>
                                                </div>
                                            </div>
                                        </section>
                                        <section className='_home_010'>
                                            <div className='flexSpaceBetCen'>
                                                <div className='_home_011'>Customer Ratings</div>
                                            </div>
                                            <div>
                                                <div className='_home_012'>
                                                    <FormGroup>
                                                        {filters.map((star, index) =>
                                                            <FormControlLabel
                                                                key={index}
                                                                control={
                                                                    <Checkbox
                                                                        size='small'
                                                                        onChange={(event) => {
                                                                            handleChange(event, index)
                                                                        }}
                                                                    />
                                                                }
                                                                label={`${star}★ & above`}
                                                            />
                                                        )}
                                                    </FormGroup>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='_home_004 _home_020'>
                            <div className='_home_013 _home_002'>
                                <div className='_home_014'>
                                    <div className='_home_015'>
                                        {(category || q)
                                            &&
                                            <span className='_home_016'>
                                                showing 1-{products.length} of {products.length} results for "{q ? q : category}"
                                            </span>
                                        }
                                        <div className='_home_017'>
                                            <span className='_home_018'>Sort By</span>
                                            {sorting.map((method, index) =>
                                                <div
                                                    key={index}
                                                    className='_home_019'
                                                    style={{
                                                        borderBottom: `${selectedSort === index ? '2px solid #2874f0' : '2px solid transparent'}`,
                                                        color: `${selectedSort === index ? '#2874f0' : 'black'}`,
                                                        fontWeight: `${selectedSort === index ? '500' : '100'}`
                                                    }}
                                                    onClick={() => handleSort(index)}
                                                >
                                                    {method}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {products.length > 0
                                ?
                                products.map((product) =>
                                    <Homechild key={product.id} product={product} />
                                )
                                :
                                <div>No Such Products</div>
                            }
                            {(!category && !q) &&
                                <div className='w-1-1'>
                                    <div className='flexSpaceBetCen _home_021'>
                                        <span>Page {page} of 10</span>
                                        <Pagination count={10} page={page} onChange={handleChangePage} />
                                        <span className='_home_022'></span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                :
                null
            }
        </>
    )
}

export default Home;