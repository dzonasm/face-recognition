import './App.css';
import React, { useState } from 'react'
import Navigation from './components/Navigation/Navigation.component'
import Logo from './components/Logo/Logo.component'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.component'
import MyParticles from './components/Particles/Particles'
import Rank from "./components/Rank/Rank"
import FaceRecognition from './components/FaceRecognition/FaceRecognition.component'
import Signin from './components/Signin/Signin.component'
import Register from './components/Register/Register.component'


const App = () => {

  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState({})
  const [route, setRoute] = useState('signin')
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  })

  const resetState = () => {
    setInput('');
    setImageUrl('');
    setBox({});
    setRoute('signin');
    setIsSignedIn(false);
    setUser({
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    })
  }

  const loadUser = (data) => {
    console.log(data)
    const { id, name, email, entries, joined } = data
    setUser({
      id,
      name,
      email,
      entries,
      joined
    })
  }




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
    fetch('https://shielded-cove-44100.herokuapp.com/imageUrl', {
      method: "post",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        input: input
      })
    }).then(response => response.json())
      .then((response) => {
        if (response) {
          fetch('https://shielded-cove-44100.herokuapp.com/image', {
            method: "put",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(res => res.json())
            .then(count => {
              setUser({ ...user, entries: count })
            })
            .catch(err => console.log(err))
        }
        displayFaceBox(calcFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  const onRouteChange = (route) => {
    (route === 'signout' ?
      resetState() :
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
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
        : (
          route === 'signin' ?
            <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
            :
            <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        )
      }
    </div>
  );
}

export default App;
