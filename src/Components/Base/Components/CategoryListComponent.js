import { useNavigate } from "react-router-dom";

import '../Styles/categoryList.css'

import { Button } from "@mui/material";

const CategoryList = ({ product }) => {
    const navigate = useNavigate();
    function getRandomColor() {
        const minBrightness = 50; // Adjust this value to control the minimum brightness
        const maxBrightness = 200; // Adjust this value to control the maximum brightness

        const randomChannel = () => Math.floor(Math.random() * 256);

        while (true) {
            const color = `rgb(${randomChannel()}, ${randomChannel()}, ${randomChannel()})`;
            const brightness = colorBrightness(color);

            if (brightness >= minBrightness && brightness <= maxBrightness) {
                return color;
            }
        }
    }

    function colorBrightness(color) {
        const rgb = color.match(/\d+/g);
        if (!rgb || rgb.length !== 3) {
            return 0;
        }

        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        return brightness;
    }


    return (
        <div className="_catList_001" style={{

            background: `linear-gradient(to bottom right, ${getRandomColor()}, transparent`,
        }}>
            <div className='_catList_002' style={{
                color: 'white',
            }}>
                <div className='_catList_003'>Best of {product.category}</div>
                <div>
                    <Button variant='contained' sx={{ borderRadius: 0 }} onClick={() => {
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