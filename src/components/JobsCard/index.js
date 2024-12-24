import {Component} from 'react'
import {Link} from 'react-router-dom'
import {IoIosStar} from 'react-icons/io'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

class JobsCard extends Component {
  render() {
    const {details} = this.props
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = details

    return (
      <Link className="link" to={`/jobs/${id}`}>
        <li className="job-card">
          <div className="job-card-header">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="company logo"
            />
            <div className="company-details">
              <h1 className="company-title">{title}</h1>
              <div className="rating-container">
                <IoIosStar className="star-icon" />
                <p className="company-title">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-card-body">
            <div className="location-type">
              <IoLocationSharp className="location-emp-type-icon" />
              <p className="location-emp-type">{location}</p>
              <BsBriefcaseFill className="location-emp-type-icon" />
              <p className="location-emp-type">{employmentType}</p>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr />
          <div>
            <h1 className="salary">Description</h1>
            <p className="location-emp-type">{jobDescription}</p>
          </div>
        </li>
      </Link>
    )
  }
}

export default JobsCard
