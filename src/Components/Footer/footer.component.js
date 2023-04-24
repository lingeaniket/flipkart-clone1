import React from 'react'
import './footer.css'

const Footer = () => {
    return (
        <footer style={{ position: 'relative', bottom: '0' }} className='footer'>
            <div style={{ width: '100%', margin: '0 auto', textAlign: 'left' }}>
                <div style={{ width: '100%' }}>
                    <div style={{ display: 'inline-block', verticalAlign: 'top', width: '100%', padding: '0 25px', color: '#878787', backgroundColor: '#fff' }}></div>
                </div>
                <div>
                    <div style={{ display: 'flex', flexFlow: 'row wrap', marginLeft: '65px', width: '90%', paddingTop: '40px' }}>
                        <div className='flex_1'>
                            <div className='footerChildTitle'>ABOUT</div>
                            <a href='/' className='footerALinks'>Contact Us</a>
                            <a href='/' className='footerALinks'>About Us</a>
                            <a href='/' className='footerALinks'>Careers</a>
                            <a href='/' className='footerALinks'>Flipkart Stories</a>
                            <a href='/' className='footerALinks'>Press</a>
                            <a href='/' className='footerALinks'>Flipkart Wholesale</a>
                            <a href='/' className='footerALinks'>Corporate Information</a>
                        </div>
                        <div className='flex_1'>
                            <div className='footerChildTitle'>HELP</div>
                            <a href='/' className='footerALinks'>Payments</a>
                            <a href='/' className='footerALinks'>Shipping</a>
                            <a href='/' className='footerALinks'>Cancellation & Returns</a>
                            <a href='/' className='footerALinks'>FAQ</a>
                            <a href='/' className='footerALinks'>Report Infringement</a>

                        </div>
                        <div className='flex_1'>
                            <div className='footerChildTitle'>CONSUMER POLICY</div>
                            <a href='/' className='footerALinks'>Return Policy</a>
                            <a href='/' className='footerALinks'>Terms Of Use</a>
                            <a href='/' className='footerALinks'>Security</a>
                            <a href='/' className='footerALinks'>Privacy</a>
                            <a href='/' className='footerALinks'>Sitemap</a>
                            <a href='/' className='footerALinks'>Grievance Redressal</a>
                            <a href='/' className='footerALinks'>EPR Compliance</a>
                        </div>
                        <div className='flex_1'>
                            <div className='footerChildTitle'>SOCIAL</div>
                            <a href='/' className='footerALinks'>Facebook</a>

                            <a href='/' className='footerALinks'>Twitter</a>
                            <a href='/' className='footerALinks'>YouTube</a>
                        </div>
                        <div className='flex_1'>
                            <div className='addressTitle' >
                                <div className='footerChildTitle'>
                                    <span>Mail Us: </span>
                                </div>
                                <div className='address'>
                                    <div className='addressMain'>
                                        <div className='addressMainDiv'>
                                            <p>Flipkart Internet Private Limited, </p>
                                            <p> Buildings Alyssa, Begonia &amp; </p>
                                            <p> Clove Embassy Tech Village, </p>
                                            <p> Outer Ring Road, Devarabeesanahalli Village, </p>
                                            <p> Bengaluru, 560103, </p>
                                            <p> Karnataka, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='flex_1'>
                            <div className='secAddress'>
                                <div className='footerChildTitle'>
                                    <span>Mail Us: </span>
                                </div>
                                <div className='address'>
                                    <div className='addressMain'>
                                        <div className='addressMainDiv'>
                                            <p>Flipkart Internet Private Limited, </p>
                                            <p> Buildings Alyssa, Begonia &amp; </p>
                                            <p> Clove Embassy Tech Village, </p>
                                            <p> Outer Ring Road, Devarabeesanahalli Village, </p>
                                            <p> Bengaluru, 560103, </p>
                                            <p> Karnataka, India </p>
                                            <p> CIN : U51109KA2012PTC066107 </p>
                                            <p> Telephone: <a href="tel:044-45614700">044-45614700</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div></div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;