import { useState } from "react"
import axios from 'axios'
// ! A hook from React Router that gives you a function to redirect your page.
import { useNavigate } from "react-router-dom"
import { baseUrl } from '../config';

// ! Component for the signup page
export default function Signup() {

  // ! navigate is a function, we call it on successful signup to redirect
  const navigate = useNavigate()

  // ! Put all our state into a form. Any time the inputs change below, it will update this object in state.
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  // ! Any time the user types in an input, this function will update the formData for the correct field.
  function handleChange(e) {
    const newFormData = structuredClone(formData)
    newFormData[e.target.name] = e.target.value
    setFormData(newFormData)
  }

   // ! This function runs when the user clicks submit button to submit the form.
  async function handleSubmit(e) {
    e.preventDefault() // ! Prevent the page from reloading by default.
    try {
      // ! Try to post using axios. Axios is a nicer looking fetch, but works in very much the same way.
      // ! For axios.post, first argument is the URL on the backend we're posting to. Second argument is the form itself w/ the data.
      await axios.post(`${baseUrl}/signup`, formData) // ! With axios, you don't need a second await, just one!
      // ! Navigate to login page on frontend if request was successful.
      navigate('/login')
    } catch (err) {
      // ! If there's an error from backend, for now we console.log the error here.
      console.log(err.response.data)
    }
  }

  // ! A bunch of nicely styled JSX for our form, with all 4 inputs inside.
  return <div className="section">
    <div className="container">
      {/* // ! When the form is submitted, calls handleSubmit function. */}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            {/* // ! Each of these inputs is a "controlled input". 
                // ! Every time it changes we update state, and the value always matches whats in state. */}
            <input
              className="input"
              type="text"
              name={'username'}
              onChange={handleChange}
              value={formData.username}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name={'email'}
              onChange={handleChange}
              value={formData.email}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name={'password'}
              onChange={handleChange}
              value={formData.password}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Confirm password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name={'passwordConfirmation'}
              onChange={handleChange}
              value={formData.passwordConfirmation}
            />
          </div>
        </div>
        <button className="button">Submit</button>
      </form>
    </div>
  </div>
}