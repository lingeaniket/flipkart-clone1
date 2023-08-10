import './Styles/manageAccountStyles.css'
const ManageAccount = () => {
    return (
        <div className='_manageAcc_001'>
            <div className='_manageAcc_002'>
                <div className='_manageAcc_003'>
                    <div className='_manageAcc_004'>
                        <span className='_manageAcc_005'>Personal Information</span>
                        <span className='_manageAcc_006'>Edit</span>
                    </div>
                    <div>
                        <div className='_manageAcc_007'>
                            <div className='_manageAcc_008'>
                                <div className='_manageAcc_009'>
                                    <input className='_manageAcc_010'
                                        type="text" />
                                </div>
                            </div>
                            <div className='_manageAcc_008'>
                                <div className='_manageAcc_009'>
                                    <input className='_manageAcc_010'
                                        type="text" />
                                </div>
                            </div>
                        </div>
                        <div className='_manageAcc_011'>Your gender</div>
                        <div>
                            <label className='_manageAcc_012'>
                                <input
                                    type="radio" />
                                <div className='_manageAcc_013'>Male</div>
                            </label>
                            <label className='_manageAcc_012'>
                                <input
                                    type="radio" />
                                <div className='_manageAcc_013'>Female</div>
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='_manageAcc_003'>
                        <div className='_manageAcc_004'>
                            <span className='_manageAcc_005'>Email Address</span>
                            <span className='_manageAcc_006'>Edit</span>
                        </div>
                        <div>
                            <div className='_manageAcc_007'>
                                <div className='_manageAcc_008'>
                                    <div className='_manageAcc_009'>
                                        <input
                                            type="text"
                                            className='_manageAcc_010'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='_manageAcc_003'>
                        <div className='_manageAcc_004'>
                            <span className='_manageAcc_005'>Mobile Number</span>
                            <span className='_manageAcc_006'>Edit</span>
                        </div>
                        <div>
                            <div className='_manageAcc_007'>
                                <div className='_manageAcc_008'>
                                    <div className='_manageAcc_009'>
                                        <input className='_manageAcc_010'
                                            type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <img src="	https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myProfileFooter_4e9fe2.png" alt=""
                    width={'100%'} height={'auto'}
                    style={{
                        verticalAlign: 'middle',
                    }}
                />
            </div>
        </div>
    )
}

export default ManageAccount;