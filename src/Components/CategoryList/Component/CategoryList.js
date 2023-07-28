import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const CategoryList = ({product}) => {
    const navigate  = useNavigate()
    return (
        <div
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
                    <Button variant='contained' onClick={() => {
                        navigate(`/search?category=${product.category}`)
                    }}>View All</Button>
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
                            </div>
                        )
                        :
                        null
                }</div>
        </div>
    )
}

export default CategoryList