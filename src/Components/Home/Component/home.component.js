import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import ContentLoader from '../../Loader/contentLoader.component';
import Homechild from './HomeChild.component';
import { SwipeableDrawer } from "@mui/material";

import '../Styles/home.css';
import '../Styles/homeStyles.css';
import { Pagination } from '@mui/material';
import FilterHome from './filterHome';
import FilterListIcon from '@mui/icons-material/FilterList';



const Home = () => {
    const sorting = ['Relevance', 'Popularity', 'Price -- Low to High', 'Price -- High to Low',]
    const location = useLocation();

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const q = searchParams.get('q');

    const navigate = useNavigate();

    const toggleDrawer = (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setOpen((lastState) => !lastState)
    };

    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [ratingStatus, setRatingStatus] = useState([false, false])
    const [sortStatus, setSortStatus] = useState([false, false, false, false])
    const [open, setOpen] = useState(false)
    const [selectedSort, setSelectedSort] = useState(0);
    const [loader, setLoader] = useState(true);
    const [products, setProducts] = useState();

    const wishListItems = useSelector(state => state.wishListState.wishListItems)

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
                            <FilterHome type="desktop"
                                ratingStatus={ratingStatus} setRatingStatus={setRatingStatus}
                                sortStatus={sortStatus} setSortStatus={setSortStatus}
                                setOpen={setOpen} />
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
                                        <div className="_order_110" >
                                            <div style={{
                                                padding: '5px 2px', fontWeight: 500, textTransform: 'uppercase',
                                            }} onClick={() => {
                                                setOpen(true);
                                            }}>
                                                <FilterListIcon sx={{ marginRight: '10px' }} />
                                                Filters</div>
                                        </div>
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
                                <div className='pagination'>
                                    <div className='flexSpaceBetCen _home_021'>
                                        <span>Page {page} of 10</span>
                                        <Pagination count={10} page={page} onChange={handleChangePage} />
                                        <span className='_home_022'></span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <SwipeableDrawer
                        anchor="bottom"
                        open={open}
                        onClose={toggleDrawer}
                        onOpen={toggleDrawer}
                        sx={{
                            zIndex: 100
                        }}
                    >
                        <FilterHome setOpen={setOpen} type="mobile" products={products} setProducts={setProducts}
                            ratingStatus={ratingStatus}
                            sortStatus={sortStatus} setSortStatus={setSortStatus}
                            setRatingStatus={setRatingStatus}
                        />
                    </SwipeableDrawer>
                </div>
                :
                null
            }
        </>
    )
}

export default Home;