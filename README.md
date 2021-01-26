# Smart brain

A face recognition application using the CLARIFAI API with user authorization, registration, it's own Express server and React front end.

## Live site

https://prjct-smart-brain.herokuapp.com/

## Running the code

Clone the repository into your computer, install all the dependencies with "npm i", run "npm run-script start-dev".

### The server files are located in https://github.com/dzonasm/smart-brain-api

# Technologies used

React for the front-end,
The server is created using Express,
Database - Postgres. React particles and react tilt for animating the front-end. Styles were made using css and tacheyons.

# Using the app

We start by registering a new user and will be automatically logged in to the app, there we can paste an imgae url into the input and click "detect". The image will pop up, your entries count will encrease with every scanned image, and your user credentials will stay in the site database if you return, you'll simply have to sign in.
