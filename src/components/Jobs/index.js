import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {IoMdSearch} from 'react-icons/io'
import Cookies from 'js-cookie'
import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import JobsCard from '../JobsCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const statusConstants = {
  success: 'SUCCESS',
  loading: 'LOADING',
  error: 'ERROR',
}

class Jobs extends Component {
  state = {
    employmentTypeArray: [],
    minPackage: '',
    search: '',
    jobsList: [],
    status: statusConstants.loading,
  }

  componentDidMount = () => {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({status: statusConstants.loading})
    const {employmentTypeArray, minPackage, search} = this.state
    const employmentTypeString = employmentTypeArray.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const jobsApi = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${minPackage}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApi, options)
    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data
      const updatedJobsData = jobs.map(eachData => ({
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        id: eachData.id,
        jobDescription: eachData.job_description,
        location: eachData.location,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
        title: eachData.title,
      }))
      this.setState({
        jobsList: updatedJobsData,
        status: statusConstants.success,
      })
    } else {
      this.setState({status: statusConstants.error})
    }
  }

  onSearching = event => {
    this.setState({search: event.target.value})
  }

  onSearchedBtn = () => {
    this.getJobsList()
  }

  renderSearchBar = () => (
    <>
      <input
        onChange={this.onSearching}
        className="input-search-tag"
        placeholder="Search"
        type="search"
      />
      <button
        className="search-btn"
        type="button"
        onClick={this.onSearchedBtn}
        data-testid="searchButton"
      >
        <IoMdSearch className="icon-search" />
      </button>
    </>
  )

  onSalaryRangeSelect = event => {
    this.setState({minPackage: event.target.value}, this.getJobsList)
  }

  onCheckboxChecks = event => {
    const {employmentTypeArray} = this.state
    const {value} = event.target
    if (employmentTypeArray.includes(value)) {
      this.setState(
        prevState => ({
          employmentTypeArray: prevState.employmentTypeArray.filter(
            eachJob => eachJob !== value,
          ),
        }),
        this.getJobsList,
      )
    } else {
      this.setState(
        prevState => ({
          employmentTypeArray: [...prevState.employmentTypeArray, value],
        }),
        this.getJobsList,
      )
    }
  }

  renderTypeOfEmployment = () => (
    <div>
      <h1 className="sort-title">Type of Employment</h1>
      <ul>
        {employmentTypesList.map(eachType => (
          <li className="sort-container" key={eachType.employmentTypeId}>
            <input
              className="checkbox"
              type="checkbox"
              value={eachType.employmentTypeId}
              id={eachType.employmentTypeId}
              onChange={this.onCheckboxChecks}
            />
            <label htmlFor={eachType.employmentTypeId} className="sort-label">
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSalarySort = () => (
    <div>
      <h1 className="sort-title">Salary Range</h1>
      <ul>
        {salaryRangesList.map(eachRange => (
          <li className="sort-container" key={eachRange.salaryRangeId}>
            <input
              type="radio"
              className="checkbox"
              name="salaryRange"
              id={eachRange.salaryRangeId}
              value={eachRange.salaryRangeId}
              onChange={this.onSalaryRangeSelect}
            />
            <label htmlFor={eachRange.salaryRangeId} className="sort-label">
              {eachRange.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  onRetryJobs = () => {
    this.getJobsList()
  }

  render() {
    const {jobsList, status} = this.state
    let content
    switch (status) {
      case statusConstants.success:
        if (jobsList.length > 0) {
          content = (
            <ul className="jobs-ul">
              {jobsList.map(eachJobData => (
                <JobsCard details={eachJobData} key={eachJobData.id} />
              ))}
            </ul>
          )
        } else {
          content = (
            <div className="failure-view">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
                className="failure-img"
              />
              <h1 className="failure-title">No Jobs Found</h1>
              <p className="failure-description">
                We could not find any jobs. Try other filters.
              </p>
            </div>
          )
        }

        break

      case statusConstants.loading:
        content = (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
        break

      case statusConstants.error:
        content = (
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
              onClick={this.onRetryJobs}
            >
              Retry
            </button>
          </div>
        )
        break

      default:
        content = null
        break
    }

    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-main-container">
          <div className="jobs-sort-container">
            <div className="search-bar">{this.renderSearchBar()}</div>
            <ProfileDetails />
            <hr />
            {this.renderTypeOfEmployment()}
            <hr />
            {this.renderSalarySort()}
          </div>
          <div className="jobs-details-container">
            <div className="search-bar-large">{this.renderSearchBar()}</div>
            {content}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
