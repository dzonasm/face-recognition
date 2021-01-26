import React, { useState } from 'react'



const Signin = ({ onRouteChange, loadUser }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onSubmitSignin = () => {
        fetch('https://shielded-cove-44100.herokuapp.com/signin', {
            method: 'post',
            headers: { "Content-type": 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => res.json())
            .then(user => {
                if (user.id) {
                    loadUser(user)
                    onRouteChange('home')
                }
            })
    }




    return (
        <article className="br3 ba dark-gray tc b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                onChange={onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                onChange={onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password" />
                        </div>
                    </fieldset>
                    <div>
                        <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"

                            onClick={onSubmitSignin}
                        >Sign In</button>

                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                    </div>
                </div>
            </main>
        </article>
    )
}

export default Signin
