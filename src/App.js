import './App.css';
import React, { useState } from 'react'
import Clarifai from 'clarifai'

import Navigation from './components/Navigation/Navigation.component'
import Logo from './components/Logo/Logo.component'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.component'
import MyParticles from './components/Particles/Particles'
import Rank from "./components/Rank/Rank"
import FaceRecognition from './components/FaceRecognition/FaceRecognition.component'
import Signin from './components/Signin/Signin.component'
import Register from './components/Register/Register.component'

function App() {

  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState({})
  const [route, setRoute] = useState('signin')
  const [isSignedIn, setIsSignedIn] = useState(false)

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

  const onRouteChange = (route) => {
    (route === 'signout' ?
      setIsSignedIn(false) :
      setIsSignedIn(true));
    setRoute(route)
  }

  return (
    <div className="App">
      <MyParticles />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home' ?
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
        : (
          route === 'signin' ?
            <Signin onRouteChange={onRouteChange} />
            :
            <Register onRouteChange={onRouteChange} />
        )
      }
    </div>
  );
}

export default App;
