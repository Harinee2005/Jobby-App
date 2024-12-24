import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

class Header extends Component {
  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <ul className="nav-bg">
        <li>
          <Link className="link" to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
        </li>
        <li className="small-device-icons">
          <Link className="link" to="/">
            <AiFillHome className="nav-icon" />
          </Link>
          <Link className="link" to="/jobs">
            <BsFillBriefcaseFill className="nav-icon" />
          </Link>
          <Link className="link" to="/login">
            <FiLogOut onClick={this.onLogout} className="nav-icon" />
          </Link>
        </li>
        <li className="large-device-icon">
          <Link className="link" to="/">
            <p className="large-navbar">Home</p>
          </Link>
          <Link className="link" to="/jobs">
            <p className="large-navbar">Jobs</p>
          </Link>
        </li>
        <li className="large-device-icon">
          <Link className="link" to="/login">
            <button
              onClick={this.onLogout}
              className="large-navbar-btn"
              type="button"
            >
              Logout
            </button>
          </Link>
        </li>
      </ul>
    )
  }
}

export default withRouter(Header)
