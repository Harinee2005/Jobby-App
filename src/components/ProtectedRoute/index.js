import {Component} from 'react'
import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

class ProtectedRoute extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    const {path, exact, component} = this.props
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return <Route path={path} exact={exact} component={component} />
  }
}

export default ProtectedRoute
