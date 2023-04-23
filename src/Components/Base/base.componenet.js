import React from 'react'
import { useNavigate } from 'react-router-dom';

const Base = () => {
    const navigate = useNavigate();
  return (
    <div><button onClick={() => {
        navigate("/home");
        // setRootPage(false);
        // localStorage.setItem('rootPage', false);
    }}>View All Products</button></div>
  )
}

export default Base