import React from 'react'
import Tilt from 'react-tilt'

import brain from './brain.svg'
import "./Logo.css"


const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 120, width: 120 }} >
                <div className="h-100 Tilt-inner flex justify-center v-mid"><img src={brain} className="w-60" alt="brain"></img></div>
            </Tilt>
        </div>
    )
}

export default Logo;