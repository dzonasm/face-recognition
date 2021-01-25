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
  const [boxes, setBoxes] = useState([])
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
    setBoxes([]);
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
    const faceBoxesArr = data.outputs.map(output => output.data.regions.map(region => { return region.region_info.bounding_box }))
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boxes = faceBoxesArr[0].map(faceBox => {
      return {
        leftCol: faceBox.left_col * width,
        topRow: faceBox.top_row * height,
        rightCol: width - (faceBox.right_col * width),
        bottomRow: height - (faceBox.bottom_row * height)
      }
    }
    )
    return boxes;
  }

  const displayFaceBox = (boxes) => {
    setBoxes(boxes)
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
          <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
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
