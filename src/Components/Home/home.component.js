// import React, {useEffect, useState} from 'react'
import { useContext, useLayoutEffect } from 'react';
// import Navbar from '../Navbar/navbar.component';
import { useNavigate} from 'react-router-dom'
import productContext from '../../Context/ProductContext/productContext';
import { FormGroup, FormControlLabel, Checkbox, Paper } from '@mui/material';
import './home.css';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

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
  const navigate = useNavigate();
  useLayoutEffect(() => {
    !localStorage.getItem('isloggedIn') && navigate('/login');
  });
// eslint-disable-next-line
  const [productArr, setProductArr] = useContext(productContext);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', position: 'relative', backgroundColor: '#80808054', zIndex: '-3' }}>

      <div style={{ width: '19%', backgroundColor: 'white', margin: '1% 0.5%' }}>
        <div>Filter
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Label1" />
            <FormControlLabel control={<Checkbox />} label="Label2" />
            <FormControlLabel control={<Checkbox />} label="Label3" />
            <FormControlLabel control={<Checkbox />} label="Label4" />

          </FormGroup>
        </div>
        <div>Sort</div>
      </div>

      <div className='productMainContainer'>{
        productArr.map((value) => {
          return <Paper elevation={1} className='productContainer' >
            <div className='productImageContainer'>
              <div className='productImage'>

              <img src={value.image} alt={value.id} onClick={() => {
                navigate(`/product/${value.id}`);
              }} />
              </div>
            </div>
            <div style={{height: '40%'}}>{value.title}</div>
            <ColorButton variant="contained">Custom CSS</ColorButton>
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