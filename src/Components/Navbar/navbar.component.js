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
import { useDispatch, useSelector } from 'react-redux';
import { addSearched, removeFilter } from '../Features/User/productsSlice';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import './navbar.css'
const pages = ['Home', 'Cart'];
const settings = ['orders', 'wishList', 'logout'];

function Navbar() {
  const [searchState, setSearchState] = React.useState('');

  const products = useSelector(state => state.productState.products);
  const searched = useSelector(state => state.productState.searched)
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

  const handlesearch = (input) => {
    const newprod = products.filter(product => {
      return product.title.toLowerCase().includes(input.toLowerCase()) ||
        product.description.toLowerCase().includes(input.toLowerCase()) ||
        product.category.toLowerCase().includes(input.toLowerCase())
    })
    setSearchState(newprod);
  }

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
            <TextField
              id="standard-textarea"
              label="Search for products..."
              placeholder="Search..."
              multiline
              variant="standard"
              className='bar'
              onKeyUp={(event) => {
                if (event.code === 'Enter' && event.target.value.length > 2) {
                  const key = event.target.value;
                  setSearchState('');
                  event.target.value = '';
                  const searchkey = key.replace(/\s+/g, ' ').trim().replace(' ', '+');
                  document.getElementById('loader').classList.toggle('showLoader');
                  setTimeout(() => {
                    dispatch(addSearched({ searchKey: key.trim() }))
                    console.log(searched)
                    document.getElementById('loader').classList.toggle('showLoader');
                    navigate(`/search?keyword=${searchkey}`);
                  }, 1000);
                } else {
                  handlesearch(event.target.value);
                }
                if (event.target.value.length === 0) {
                  setSearchState('')
                }
              }}
            />
            {searchState.length > 0 && (

              <div className="mainSearchDiv">
                {searchState.map((item) => {
                  return (
                    <div key={item.id} className='searchDiv' style={{ backgroundColor: '#1976d2' }}>
                      <div className='searchRes' style={{ height: '20px', fontSize: '0.9vw', margin: '3% 0', padding: '0 5%', cursor: 'pointer', overflow: 'hidden' }} onClick={() => {
                        document.getElementById('loader').classList.toggle('showLoader');
                        setTimeout(() => {
                          document.getElementById('standard-textarea').value = '';
                          document.getElementById('loader').classList.toggle('showLoader');
                          setSearchState('')
                          navigate(`product/${item.id}`)
                        }, 1000);
                      }}>{item.title}</div>
                    </div>)
                })}
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
                  <Typography textAlign="center" style={{textTransform: 'capitalize'}} onClick={() => {
                    if (setting === 'logout') {
                      localStorage.removeItem('isloggedIn');
                      dispatch(removeFilter());
                      navigate(`/login`)
                    } else {
                      navigate(`/${setting}`)
                    }
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