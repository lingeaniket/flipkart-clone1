import { useNavigate } from "react-router-dom";

import '../Styles/categoryList.css'

import { Button } from "@mui/material";

const CategoryList = ({ product }) => {
    const navigate = useNavigate()
    return (
        <div className="_catList_001">
            <div className='_catList_002'>
                <div className='_catList_003'>Best of {product.category}</div>
                <div>
                    <Button variant='contained' onClick={() => {
                        navigate(`/search?category=${product.category}`)
                    }}>View All</Button>
                </div>
            </div>
            <div className="_catList_004">
                <div className="_catList_006">
                    {(product.products)
                        ?
                        (product?.products?.map((product) =>
                            <div className="_catList_007" key={product.id}>
                                <div key={product.id} className='baseProdDiv _catList_005' style={{ position: 'relative' }}
                                    onClick={() => {
                                        navigate(`/products/${product.title}/p/${product.id}`);
                                    }}
                                >
                                    <div className="_catListImg">
                                        <img src={product.thumbnail} width={'100%'} height={'100%'} alt={product.title} style={{ objectFit: 'contain' }} />
                                    </div>
                                    <div style={{ fontWeight: 'bold' }}>{product.title}</div>
                                    <div>
                                        <span>${((product.price) * 100 / (100 - product.discountPercentage)).toFixed(0)}</span>
                                        <span style={{ fontWeight: '500' }}>${product.price}</span>
                                    </div>
                                    {(product.discountPercentage > 5)
                                        &&
                                        (
                                            <div className="_catList_008">{product.discountPercentage.toFixed(0)}% off</div>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryList