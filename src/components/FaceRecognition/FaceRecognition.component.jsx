import React from 'react'

import './FaceRecognition.css'

import FaceBox from './FaceBox'

const FaceRecognition = ({ imageUrl, boxes }) => {


    const faceBoxes = boxes ?
        boxes.map(box => <FaceBox box={box} />)
        :
        null

    return (
        <div className="center pa4">
            <div className="absolute mt2">
                <img id="inputimage" alt="" src={`${imageUrl}`} width="500px" height="auto" />
                {faceBoxes}
            </div>
        </div>
    )
}

export default FaceRecognition;


