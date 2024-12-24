import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoIosStar} from 'react-icons/io'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import './index.css'

const statusConstants = {
  success: 'SUCCESS',
  error: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {jobDetails: [], similarJobs: [], status: statusConstants.loading}

  componentDidMount = () => {
    this.getParticularJobDetails()
  }

  getParticularJobDetails = async () => {
    this.setState({status: statusConstants.loading})
    const {match} = this.props
    const {id} = match.params
    const jobDetailsApi = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobDetailsApi, options)
    if (response.ok) {
      const data = await response.json()
      const jobDetailsList = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const similarJobsList = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetails: jobDetailsList,
        similarJobs: similarJobsList,
        status: statusConstants.success,
      })
    } else {
      this.setState({status: statusConstants.error})
    }
  }

  onRetrySimilarJobs = () => {
    this.getParticularJobDetails()
  }

  render() {
    const {jobDetails, similarJobs, status} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      title,
      rating,
    } = jobDetails
    let view
    switch (status) {
      case statusConstants.success:
        view = (
          <>
            <div className="job-card-container">
              <div className="job-card-header">
                <img
                  className="company-logo"
                  src={companyLogoUrl}
                  alt="job details company logo"
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
                  <p className="para">{location}</p>
                  <BsBriefcaseFill className="location-emp-type-icon" />
                  <p className="para">{employmentType}</p>
                </div>
                <p className="title">{packagePerAnnum}</p>
              </div>
              <hr />
              <div>
                <div className="job-card-body">
                  <h1 className="title">Description</h1>
                  <a href={companyWebsiteUrl} className="hyper-link">
                    Visit <FiExternalLink className="hyper-link-icon" />
                  </a>
                </div>
                <p className="para">{jobDescription}</p>
                <br />
                <h1 className="title">Skills</h1>
                <ul className="skills-container">
                  {skills.map(eachSkills => (
                    <li className="skill-cont" key={eachSkills.name}>
                      <img
                        className="skills-img"
                        src={eachSkills.image_url}
                        alt={eachSkills.name}
                      />
                      <p className="para">{eachSkills.name}</p>
                    </li>
                  ))}
                </ul>
                <div className="life-at-company-container">
                  <div className="life-at-company-details">
                    <h1 className="title">Life at Company</h1>
                    <p className="para">{lifeAtCompany.description}</p>
                  </div>
                  <img
                    className="life-at-company-img"
                    src={lifeAtCompany.image_url}
                    alt="life at company"
                  />
                </div>
              </div>
            </div>
            <div className="similar-jobs-container">
              <h1 className="title">Similar Jobs</h1>
              <ul className="similar-jobs">
                {similarJobs.map(eachJob => (
                  <li className="similar-job-card" key={eachJob.id}>
                    <div className="job-card-header">
                      <img
                        className="company-logo"
                        src={eachJob.companyLogoUrl}
                        alt="similar job company logo"
                      />
                      <div className="company-details">
                        <h1 className="company-title">{eachJob.title}</h1>
                        <div className="rating-container">
                          <IoIosStar className="star-icon" />
                          <p className="company-title">{eachJob.rating}</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <h1 className="salary">Description</h1>
                      <p className="location-emp-type">
                        {eachJob.jobDescription}
                      </p>
                    </div>
                    <div className="location-type">
                      <IoLocationSharp className="location-emp-type-icon" />
                      <p className="location-emp-type">{eachJob.location}</p>
                      <BsBriefcaseFill className="location-emp-type-icon" />
                      <p className="location-emp-type">
                        {eachJob.employmentType}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )
        break
      case statusConstants.loading:
        view = (
          <div
            className="loader-container-job-item-details"
            data-testid="loader"
          >
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
        break
      case statusConstants.error:
        view = (
          <div className="failure-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="failure-img"
            />
            <h1 className="failure-title">Oops! Something Went Wrong</h1>
            <p className="failure-description">
              We cannot seem to find the page you are looking for.
            </p>
            <button
              type="button"
              className="retry-btn"
              onClick={this.onRetrySimilarJobs}
            >
              Retry
            </button>
          </div>
        )
        break
      default:
        view = null
        break
    }
    return (
      <div className="jobitem-details-container">
        <Header />
        {view}
      </div>
    )
  }
}

export default JobItemDetails
