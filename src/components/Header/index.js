import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="Header-container">
    <Link to="/" className="link">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="website-image"
      />
    </Link>
  </div>
)

export default Header
