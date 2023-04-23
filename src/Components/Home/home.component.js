//Main React Import
import * as React from 'react';
import { useState, useLayoutEffect, useEffect } from 'react';
import { Oval } from 'react-loader-spinner'

// Main Redux and Router Import
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

//Material UI Import
import { FormControlLabel, Checkbox, Paper, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { addToCart, removeFromCart } from '../Features/User/userCartSlice';
import { filterProducts } from '../Features/User/productsSlice';

//Component CSS
import './home.css';

// import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loader from '../Loader/loader.component';
import ContentLoader from '../Loader/contentLoader.component';

//Button Creator
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const Home = () => {
  //Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cartState.cartItems);
  const savelater = useSelector(state => state.cartState.saveLaterItems);
  const products = useSelector(state => state.productState.products)
  const searched = useSelector(state => state.productState.searched)
  const filter = useSelector(state => state.productState.filter)
  const searchedItems = useSelector(state => state.productState.searchedItems)

  //To Check user is logged in or not
  //if user is logged in remain on same page or go to login page
  let product = products;
  if (searched) {
    product = searchedItems;
  }
  useLayoutEffect(() => {
    !localStorage.getItem('isloggedIn') && navigate('/login');
    // eslint-disable-next-line
  });

  //Loading
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000)
    // eslint-disable-next-line
  }, []);

  const [openF, setOpenF] = React.useState(false);
  const [openC, setOpenC] = React.useState(false);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpenSort = () => {
    setOpenC(true);
  };
  const handleClickOpenFilter = () => {
    setOpenF(true);
  };

  const handleCloseF = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpenF(false);
    }
  };
  const handleCloseS = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpenC(false);
    }
  };

  return (
    <>
      {/* Loading */}
      {loader ? <ContentLoader /> : null}

      {/* if not loading */}
      {!loader ?
        <div style={{}}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%', position: 'relative', backgroundColor: '#80808054'
          }}>

            {/* filter component */}
            <div style={{ width: '19%', backgroundColor: 'white', margin: '1% 0.5%' }}>
              <div>Filter
                <div>
                  <Button onClick={handleClickOpenFilter}>Filter Products By</Button>
                  <Dialog disableEscapeKeyDown open={openF} onClose={handleCloseF}>
                    <DialogTitle>Fill the form</DialogTitle>
                    <DialogContent>
                      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          {filter.map((item, idx) => <FormControlLabel key={item.category}
                            control={<Checkbox checked={item.checked} onChange={(event) => {
                              document.getElementById('loader').classList.toggle('showLoader');
                              dispatch(filterProducts({ category: item.category, checked: event.target.checked }))
                              setTimeout(() => {
                                handleCloseF()
                                document.getElementById('loader').classList.toggle('showLoader');
                              }, 1000)
                            }} name={item.category} />} label={item.category} />)}
                        </FormControl>
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseF}>Cancel</Button>
                      <Button onClick={handleCloseF}>Ok</Button>
                    </DialogActions>
                  </Dialog>

                </div>
              </div>
              <div>Sort
                <div>
                  <Button onClick={handleClickOpenSort}>Sort Products By</Button>
                  <Dialog disableEscapeKeyDown open={openC} onClose={handleCloseS}>
                    <DialogTitle>Fill the form</DialogTitle>
                    <DialogContent>
                      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <InputLabel htmlFor="demo-dialog-native">Age</InputLabel>
                          <Select
                            native
                            value={age}
                            onChange={handleChange}
                            input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                          >
                            <option aria-label="None" value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                          </Select>
                        </FormControl>
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseS}>Cancel</Button>
                      <Button onClick={handleCloseS}>Ok</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>

            {/* Product Component */}
            <div className='productMainContainer'>{
              product.map((value) => {
                return <Paper key={value.id} elevation={1} className='productContainer' >
                  <div className='productImageContainer disFlexJusConCen' onClick={() => { navigate(`/product/${value.id}`) }} >
                    <div className='productImage disFlexJusConCen'>
                      <img src={value.image} alt={value.id} />
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
                        <ColorButton variant="contained" onClick={() => {
                          document.getElementById('loader').classList.toggle('showLoader');
                          setTimeout(() => {
                            dispatch(removeFromCart(value));
                            document.getElementById('loader').classList.toggle('showLoader');
                          }, 500);
                        }}>remove from cart</ColorButton> :
                        <ColorButton variant="contained" onClick={() => {

                          document.getElementById('loader').classList.toggle('showLoader');
                          setTimeout(() => {
                            // dispatch(removeFromCart(value));
                            dispatch(addToCart(value))
                            document.getElementById('loader').classList.toggle('showLoader');
                          }, 500);
                        }}>Add to cart</ColorButton>}
                    </div>
                  </div>
                </Paper>
              })
            }
            </div>
          </div>
        </div> : null}
    </>
  )
}

export default Home;







// export default function DialogSelect() {
//   const [open, setOpen] = React.useState(false);
//   const [age, setAge] = React.useState('');

//   const handleChange = (event) => {
//     setAge(Number(event.target.value) || '');
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason !== 'backdropClick') {
//       setOpen(false);
//     }
//   };

//   return (
//     <div>
//       <Button onClick={handleClickOpen}>Open select dialog</Button>
//       <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
//         <DialogTitle>Fill the form</DialogTitle>
//         <DialogContent>
//           <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
//             <FormControl sx={{ m: 1, minWidth: 120 }}>
//               <InputLabel htmlFor="demo-dialog-native">Age</InputLabel>
//               <Select
//                 native
//                 value={age}
//                 onChange={handleChange}
//                 input={<OutlinedInput label="Age" id="demo-dialog-native" />}
//               >
//                 <option aria-label="None" value="" />
//                 <option value={10}>Ten</option>
//                 <option value={20}>Twenty</option>
//                 <option value={30}>Thirty</option>
//               </Select>
//             </FormControl>
//             <FormControl sx={{ m: 1, minWidth: 120 }}>
//               <InputLabel id="demo-dialog-select-label">Age</InputLabel>
//               <Select
//                 labelId="demo-dialog-select-label"
//                 id="demo-dialog-select"
//                 value={age}
//                 onChange={handleChange}
//                 input={<OutlinedInput label="Age" />}
//               >
//                 <MenuItem value="">
//                   <em>None</em>
//                 </MenuItem>
//                 <MenuItem value={10}>Ten</MenuItem>
//                 <MenuItem value={20}>Twenty</MenuItem>
//                 <MenuItem value={30}>Thirty</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleClose}>Ok</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }