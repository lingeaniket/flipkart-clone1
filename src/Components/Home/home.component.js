import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'

import './Styles/home.css';
import './Styles/homeStyles.css';

import FilterHome from './Component/filterHome';
import Homechild from './Component/HomeChild.component';

import { filterProducts, handleSorting, loadProducts } from './Functions/functionsHome';

import { Pagination, SwipeableDrawer } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const sort_status = ['Relevance', 'Popularity', 'Price -- Low to High', 'Price -- High to Low',]

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const q = searchParams.get('q');

    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [ratingStatus, setRatingStatus] = useState([false, false])
    const [noProducts, setNoProducts] = useState('')
    const [selectedSort, setSelectedSort] = useState(0);
    const [products, setProducts] = useState([]);
    const [orgProducts, setOrgProducts] = useState([]);
    const [loader, setLoader] = useState(true);
    const [open, setOpen] = useState(false)

    const wishListItems = useSelector(state => state.wishListState.wishListItems)

    const toggleDrawer = (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        setOpen((lastState) => !lastState)
    };

    const handleChangePage = (event, value) => {
        setPage(() => value);
        const searchParam = new URLSearchParams(location.search);
        searchParam.set('page', value)
        navigate('?' + searchParam.toString(), { replace: true });
    };
    const handleRatingStatus = (idx) => {
        setLoader(true)
        ratingStatus[idx] = !ratingStatus[idx];
        setProducts(filterProducts(ratingStatus, orgProducts))
        setRatingStatus((checked) => [...checked]);
        setTimeout(() => {
            setLoader(false);
        }, 1000)
    };

    const handleSort = (index) => {
        setLoader(true)
        setSelectedSort(index);
        setProducts(handleSorting(index, products))
        setTimeout(() => {
            setLoader(false);
        }, 1000)
    }
    const handleClear = () => {
        setLoader(true)
        setRatingStatus(() => [false, false]);
        const newProducts  = filterProducts([false, false], orgProducts);
        setProducts(handleSorting(selectedSort, newProducts))
        setTimeout(() => {
            setLoader(false);
        }, 1000)
        setOpen(false);
    }

    useEffect(() => {
        loadProducts(category, q, setProducts, setOrgProducts,  setLoader, page, setNoProducts,selectedSort, ratingStatus)
        // eslint-disable-next-line
    }, [wishListItems, category, q, page]);

    return (
        <div className='_home_001'>
            <div className='_home_002'>
                <div className='_home_003 _home_020'>
                    <FilterHome type="desktop"
                        ratingStatus={ratingStatus}
                        sort_status={sort_status}
                        handleRatingStatus={handleRatingStatus}
                        handleClear={handleClear}
                        selectedSort={selectedSort} handleSort={handleSort}
                    />
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
                                    <div style={{ padding: '5px 2px', fontWeight: 500, textTransform: 'uppercase', }}
                                        onClick={() => {
                                            setOpen(true);
                                        }}
                                    >
                                        <FilterListIcon sx={{ marginRight: '10px' }} />
                                        Filters
                                    </div>
                                </div>
                                <div className='_home_017'>
                                    <span className='_home_018'>Sort By</span>
                                    {sort_status.map((status, index) =>
                                        <div key={index}
                                            className={`_home_019 ${selectedSort === index ? '_home_sortSelected' : '_home_sortNotSelected'}`}
                                            onClick={() => handleSort(index)}
                                        >
                                            {status}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {(products.length > 0)
                        &&
                        products.map((product) =>
                            <Homechild key={product.id} product={product} loader={loader} />
                        )
                    }
                    <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white' }}>{noProducts}</div>
                    {(!category && !q)
                        &&
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
            <div className="_home_sort">
                <SwipeableDrawer
                    anchor="bottom"
                    open={open}
                    onClose={toggleDrawer}
                    onOpen={toggleDrawer}
                    sx={{ zIndex: 100 }}
                >
                    <FilterHome setOpen={setOpen} type="mobile" products={products} setProducts={setProducts}
                        ratingStatus={ratingStatus}
                        sort_status={sort_status}
                        handleRatingStatus={handleRatingStatus}
                        handleClear={handleClear}
                        selectedSort={selectedSort} handleSort={handleSort}
                    />
                </SwipeableDrawer>
            </div>
        </div>
    )
}

export default Home;