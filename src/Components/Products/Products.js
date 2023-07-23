import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const Products = () =>{
    const {product_name, product_id} = useParams();
    const [product, setProduct] = useState({});
    useEffect(()=> {
        axios.get(`https://dummyjson.com/products/${product_id}`).then((response)=>{
            setProduct(response.data);
        })
    })
    return (
        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <div style={{backgroundColor: 'white'}}>
                {product_name}
                {JSON.stringify(product)}
            </div>
        </div>
    )
}

export default Products