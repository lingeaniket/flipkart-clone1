import React from 'react'
import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className='hideLoader' id='loader'>
      <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'transparent' }}>
        <div className="modal-dialog modal-fullscreen modalBG" >
          <div className="modal-content" style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Oval
              ariaLabel="loading-indicator"
              height={100}
              width={100}
              strokeWidth={1}
              strokeWidthSecondary={1}
              color="blue"
              secondaryColor="white"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader;