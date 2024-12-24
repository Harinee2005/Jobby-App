import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const statusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileDetails extends Component {
  state = {profileDetails: {}, status: statusConstants.loading}

  fetchProfileDetails = async () => {
    this.setState({status: statusConstants.loading})
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(profileUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        status: statusConstants.success,
      })
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  componentDidMount = () => {
    this.fetchProfileDetails()
  }

  onRetry = () => {
    this.fetchProfileDetails()
  }

  render() {
    const {profileDetails, status} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    switch (status) {
      case statusConstants.success:
        return (
          <div className="profile-details-bg">
            <img className="profile-img" src={profileImageUrl} alt="profile" />
            <h1 className="profile-name">{name}</h1>
            <p className="profile-bio">{shortBio}</p>
          </div>
        )
      case statusConstants.failure:
        return (
          <div className="error-view">
            <button type="button" className="retry-btn" onClick={this.onRetry}>
              Retry
            </button>
          </div>
        )
      case statusConstants.loading:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      default:
        return null
    }
  }
}

export default ProfileDetails
