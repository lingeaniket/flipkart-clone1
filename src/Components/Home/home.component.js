// import React, {useEffect, useState} from 'react'
import { useContext, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
// import Navbar from '../Navbar/navbar.component';
import { useNavigate } from 'react-router-dom'
import productContext from '../../Context/ProductContext/productContext';
import { FormGroup, FormControlLabel, Checkbox, Paper, Rating } from '@mui/material';
import './home.css';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import { addToCart } from '../Features/User/userCartSlice';
import { removeFromCart } from '../Features/User/userCartSlice';
import { useSelector } from 'react-redux';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

// export default function CustomizedButtons() {
//   return (
//     <Stack spacing={2} direction="row">
//       <ColorButton variant="contained">Custom CSS</ColorButton>
//       <BootstrapButton variant="contained" disableRipple>
//         Bootstrap
//       </BootstrapButton>
//     </Stack>
//   );
// }

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState([]);
  const cart = useSelector(state => state.cartState.cartItems);
  const savelater = useSelector(state => state.cartState.saveLaterItems);
  useLayoutEffect(() => {
    !localStorage.getItem('isloggedIn') && navigate('/login');
    // eslint-disable-next-line
  });

  const [productArr] = useContext(productContext);
  useLayoutEffect(() => {
    const filter1 = productArr.map((item, i) => {

      return filter.findIndex((cat) => cat.category === item.category) === -1 && { category: item.category, checked: false }
        // setFilter(filter);
      // };
      // return null;

    })

    setFilter([...new Map(filter1.map(v => [JSON.stringify(v), v])).values()])
    // filter1.map((item, i) => {
    //   if(filter1.findIndex((cat) => cat.category === item.category) === -1)
    // eslint-disable-next-line
  }, []);
  // eslint-disable-next-line

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', position: 'relative', backgroundColor: '#80808054' }}>

      <div style={{ width: '19%', backgroundColor: 'white', margin: '1% 0.5%' }}>
        <div>Filter
          <FormGroup>
            {filter.map((item, idx) => <FormControlLabel key={idx} control={<Checkbox checked={item.checked} onChange={(event)=>{
              let arr2 = filter.map(a => {return {...a}});
              console.log(arr2.find(a => a.category === item.category));
              arr2.find(a => a.category === item.category).checked = event.target.checked;

              setFilter(arr2);

            }} name={item.category} />} label={item.category} />)}
            {/* <FormControlLabel control={<Checkbox />} label="Label1" />
            <FormControlLabel control={<Checkbox />} label="Label2" />
            <FormControlLabel control={<Checkbox />} label="Label3" />
            <FormControlLabel control={<Checkbox />} label="Label4" /> */}

          </FormGroup>
        </div>
        <div>Sort</div>
      </div>

      <div className='productMainContainer'>{
        productArr.map((value) => {
          return <Paper key={value.id} elevation={1} className='productContainer' >
            <div className='productImageContainer'>
              <div className='productImage'>

                <img src={value.image} alt={value.id} onClick={() => {
                  navigate(`/product/${value.id}`);
                }} />
              </div>
            </div>
            <div style={{ height: '40%' }}>
              <div style={{ height: '50%' }}>


                {value.title} <br />
                ${value.price}
              </div>
              <div style={{ height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Rating name="half-rating-read" value={value.rating.rate} precision={0.1} readOnly /> <br />
                {cart.findIndex(item => item.value.id === value.id) > -1 || savelater.findIndex(item => item.value.id === value.id) > -1 ?
                  <ColorButton variant="contained" onClick={() => dispatch(removeFromCart(value))}>remove from cart</ColorButton> : <ColorButton variant="contained" onClick={() => dispatch(addToCart(value))}>Add to cart</ColorButton>}
              </div>
            </div>
          </Paper>
          // return <div key={value.id} className='productContainer'>
          //   <div className='productImageContainer'>
          //     <div className='productImage'>

          //     <img src={value.image} alt={value.id} onClick={() => {
          //       navigate(`/product/${value.id}`);
          //     }} />
          //     </div>
          //   </div>
          //   <div style={{height: '40%'}}>{value.title}</div>
          // </div>
        })
      }

      </div>

      {/* {productArr.map((value)=>{
        return <div>{value.id}</div>
      })} */}
      {/* <Navbar /> */}
      {/* <button>Explore products</button> */}
      {/* <div>ANiket This is Home</div> */}
    </div>
  )
}

export default Home;