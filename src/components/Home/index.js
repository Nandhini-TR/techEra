import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {techList: [], status: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({status: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/te/courses'

    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()

      const modifiedData = data.courses.map(eachCourses => ({
        id: eachCourses.id,
        logoUrl: eachCourses.logo_url,
        name: eachCourses.name,
      }))

      this.setState({
        status: apiStatusConstants.success,
        techList: modifiedData,
      })
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="00BFFF" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-button" type="button" onClick={this.getCourses}>
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {techList} = this.state
    return (
      <ul className="tech-ul-list">
        {techList.map(each => (
          <Link to={`/courses/${each.id}`} className="link" key={each.id}>
            <li className="tech-list" key={each.id}>
              <img src={each.logoUrl} alt={each.name} className="logo" />
              <p className="course-name">{each.name}</p>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  rendertechEra = () => {
    const {status} = this.state

    switch (status) {
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="course-heading">Courses</h1>
          {this.rendertechEra()}
        </div>
      </>
    )
  }
}

export default Home
