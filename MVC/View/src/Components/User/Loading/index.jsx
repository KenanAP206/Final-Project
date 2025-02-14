import React from 'react'
import './Loading.css'
import { PulseLoader } from 'react-spinners'
function index() {
    return (
        <div className='loadingpage'>

            <div>
                <div className="load"></div>
                <h2>Loading<PulseLoader color='#c83dff' /></h2>
            </div>
        </div>
    )
}

export default index
