import logo from '../assets/logo192.png'
import { Link } from 'react-router-dom'
import Signin from '../pages/signin/Signin'
import Signup from '../pages/singup/Signup'
import './Navbar.css'


export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
        <img src={logo} alt="logo" />
        <Link to="/tools" className="li icon">
          TOOLS
        </Link>
        </div>
        <div className="btn">
        <button>
          <Link to="/signup" className="li nav-item">Signup</Link>
        </button>
        <button>
          <Link to="/signin" className="li nav-item">Signin</Link>
        </button>
        </div>
      </nav>
    </div>
  )
}
