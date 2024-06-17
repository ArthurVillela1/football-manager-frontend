import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'))

  useEffect(() => {
    // console.log(location.pathname)
    setIsLoggedIn(localStorage.getItem('token'))
  }, [location])

  function logout() {
    setIsLoggedIn(false)
    localStorage.removeItem('token')
  }

  return <nav className="navbar">
    <div className="navbar-menu is-active">
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {/*<Link to="/" className="button">Home</Link>*/}
            {<Link to="/Buildteam" className="button">Build Team</Link>}
            {!isLoggedIn && <Link to="/signup" className="button">Signup</Link>}
            {!isLoggedIn && <Link to="/login" className="button">Login</Link>}
            {isLoggedIn && <button className="button" onClick={logout}>Logout</button>}
          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default Navbar