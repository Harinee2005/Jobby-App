import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errMsg: ''}

  renderUserName = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <label className="label" htmlFor="username">
          USERNAME
        </label>
        <input
          className="input-tag"
          type="text"
          id="username"
          placeholder="Username"
          onChange={this.onChangeUsername}
          value={username}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="input-tag"
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = ' https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.setState({errMsg: '', username: '', password: ''})
      this.onSuccessSubmit(data.jwt_token)
    } else {
      this.setState({errMsg: `* ${data.error_msg}`, username: '', password: ''})
    }
  }

  onSuccessSubmit = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    const {errMsg} = this.state
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-login"
          />
          <form className="form-box" onSubmit={this.onSubmitLoginForm}>
            {this.renderUserName()}
            {this.renderPassword()}
            <button className="login-btn" type="submit">
              Login
            </button>
            <p className="error-message">{errMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
