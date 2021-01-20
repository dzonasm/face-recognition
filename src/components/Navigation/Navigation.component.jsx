import React from 'react'


const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav className="flex justify-end">
                <p onClick={() => onRouteChange('signout')} className="f3 link dim black underline pa3 pointer"><ins>Sign Out</ins></p>
            </nav>
        )
    } else {
        return (
            <nav className="flex justify-end">
                <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer"><ins>Sign In</ins></p>
                <p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa3 pointer"><ins>Register</ins></p>
            </nav>
        )
    }
};

export default Navigation