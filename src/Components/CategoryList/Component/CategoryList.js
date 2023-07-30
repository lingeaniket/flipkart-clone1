import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import '../Styles/categoryList.css'
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
                {product.products
                    ?
                    (product?.products?.map(product =>
                        <div key={product.id} className='baseProdDiv _catList_005' onClick={() => {
                            navigate(`/products/${product.title}/p/${product.id}`);
                        }}>
                            <div className='baseImage' style={{ aspectRatio: 1 / 1, padding: '10px', }}>
                                <img src={product.thumbnail} width={'100%'} height={'100%'} alt={product.title} style={{ objectFit: 'contain' }} />
                            </div>
                            <div style={{ fontWeight: 'bold' }}>{product.title}</div>
                            <div>&#8377;{product.price}</div>
                            <div >Discount {product.discountPercentage}%</div>
                        </div>
                    ))
                    :
                    null
                }
            </div>
        </div>
    )
}

export default CategoryList