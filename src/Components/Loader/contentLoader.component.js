import React from 'react'
import { Oval } from 'react-loader-spinner';

const ContentLoader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Oval
    ariaLabel="loading-indicator"
    height={100}
    width={100}
    strokeWidth={1}
    strokeWidthSecondary={1}
    color="blue"
    secondaryColor="white"
  /></div>
  )
}

export default ContentLoader;