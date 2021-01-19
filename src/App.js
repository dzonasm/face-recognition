import './App.css';
import React, { useState } from 'react'
import Clarifai from 'clarifai'

import Navigation from './components/Navigation/Navigation.component'
import Logo from './components/Logo/Logo.component'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.component'
import MyParticles from './components/Particles/Particles'
import Rank from "./components/Rank/Rank"
import FaceRecognition from './components/FaceRecognition/FaceRecognition.component'

function App() {

  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState({})

  const clarifai = new Clarifai.App({
    apiKey: '7654400b593d4ae0bffc10b35f5b5242'
  });


  const onInputChange = (e) => {
    setInput(e.target.value)
  }

  const calcFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    console.log(box)
    setBox(box)
  }

  const onSubmit = () => {
    setImageUrl(input);
    console.log(input);
    clarifai.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, `${input}`)
      .then((response) => displayFaceBox(calcFaceLocation(response)))
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <MyParticles />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
      <FaceRecognition box={box} imageUrl={imageUrl} />
    </div>
  );
}

export default App;
