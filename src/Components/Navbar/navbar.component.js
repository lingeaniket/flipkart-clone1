import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import { styled, alpha } from '@mui/material/styles';
// import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { addSearched, removeFilter } from '../Features/User/productsSlice';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import './navbar.css'
const pages = ['Home', 'Cart'];
const settings = ['Logout'];

function Navbar() {
  // eslint-disable-next-line
  const [searchState, setSearchState] = React.useState('');

  const products = useSelector(state => state.productState.products);
  const cart = useSelector(state => state.cartState.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const SearchTextField = styled(TextField)(({ theme }) => ({
  //   color : 'white'

  // }));

  // const Search = styled('div')(({ theme }) => ({
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   '&:hover': {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  //   marginLeft: 0,
  //   marginRight: theme.spacing(1),
  //   width: '70%',
  //   [theme.breakpoints.up(605)]: {
  //     marginLeft: theme.spacing(1),
  //     marginRight: theme.spacing(10),
  //     width: '80%',
  //   },
  // }));

  // const SearchIconWrapper = styled('div')(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }));

  // const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   color: 'inherit',
  //   '& .MuiInputBase-input': {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     // vertical padding + font size from searchIcon
  //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     transition: theme.transitions.create('width'),
  //     width: '100%',
  //     [theme.breakpoints.up(605)]: {
  //       width: '12ch',
  //       '&:focus': {
  //         width: '20ch',
  //       },
  //     },
  //   },
  // }));

  const handlesearch = (input) => {
    // console.log(input);
    const newprod = products.filter(product => {
      return product.title.toLowerCase().includes(input.toLowerCase()) ||
        product.description.toLowerCase().includes(input.toLowerCase()) ||
        product.category.toLowerCase().includes(input.toLowerCase())
    })
    setSearchState(newprod);
  }

  React.useEffect(() => {
    console.log('rendering')
  }, [])

  return (
    <AppBar position='sticky'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="a"
            onClick={() => {
              navigate('/');
              dispatch(removeFilter());
            }}
            sx={{
              mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace',
              fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',
            }}
          >
            FLIPKART
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="account of current user"
              aria-controls="menu-appbar" aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => {
                  navigate(page.toLowerCase());
                  dispatch(removeFilter());
                  handleCloseNavMenu();
                }}>
                  <Typography textAlign="center">{page === 'cart' ? `${page} (${cart.length})` : page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography variant="h5" noWrap component="a"
            onClick={() => {
              navigate('/');
              dispatch(removeFilter());
            }}
            sx={{
              mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace',
              fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',
            }}
          >
            FLIPKART
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  navigate(page.toLowerCase());
                  dispatch(removeFilter());
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page === 'Cart' ? `${page} (${cart.length})` : page}
              </Button>
            ))}
          </Box>
          <div style={{ position: 'relative' }}>
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" 
              inputProps={{ 'aria-label': 'search' }}
              // value={searchState}
                onChange={(event) => {
                  // setSearchState(event.target.value);
                  if (event.code === 'Enter' && event.target.value.length > 2) {
                    const key = event.target.value;
                    dispatch(addSearched({ searchKey: key }))
                    setSearchState('');
                    navigate('/home');
                  } else {
                    handlesearch(event.target.value);
                    // setSearchState(event.target.value);
                  }
                  console.log(event.target.value);
                }}
              />
            </Search>  */}

            <TextField
              id="standard-textarea"
              label="Search for products..."
              placeholder="Search..."
              multiline
              variant="standard"
              className='bar'
              // color='white'
              onChange={(event) => {
                if (event.code === 'Enter' && event.target.value.length > 2) {
                  const key = event.target.value;
                  dispatch(addSearched({ searchKey: key }))
                  setSearchState('');
                  navigate('/home');
                } else {
                  handlesearch(event.target.value);
                  // setSearchState(event.target.value);
                }
                if(event.target.value.length === 0){
                  setSearchState('')
                }
                console.log(event.target.value);
              }}
            />
            {/* <input onChange={(event) => {
              if (event.code === 'Enter' && event.target.value.length > 2) {
                const key = event.target.value;
                dispatch(addSearched({ searchKey: key }))
                setSearchState('');
                navigate('/home');
              } else {
                handlesearch(event.target.value);
                // setSearchState(event.target.value);
              }
              console.log(event.target.value);
            }} /> */}
            {searchState.length > 0 && (

              <div className="mainSearchDiv">
                {searchState.map((item) => {
                  return (
                    <div key={item.id} className='searchDiv'>
                      {/* <img src={item.image} alt={item.title} /> */}
                      <p>{item.title}</p>
                    </div>)
                })}
                <div>This is working</div>
              </div>
            )}
          </div>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>A</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={() => {
                    localStorage.removeItem('isloggedIn');
                    dispatch(removeFilter());
                    navigate(`/login`)
                  }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;