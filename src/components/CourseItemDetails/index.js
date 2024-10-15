import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {techItemDetail: {}, status: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseItemDetails()
  }

  getCourseItemDetails = async () => {
    this.setState({status: apiStatusConstants.inProgress})

    const {match} = this.props

    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`

    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const modifiedData = {
        courseDetails: data.course_details,
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      this.setState({
        status: apiStatusConstants.success,
        techItemDetail: modifiedData,
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
      <button
        className="retry-button"
        type="button"
        onClick={this.getCourseItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {techItemDetail} = this.state
    const {name, description, imageUrl} = techItemDetail
    return (
      <div className="tech-container">
        <div className="tech-item-container">
          <img src={imageUrl} alt={name} className="tech-item-image" />
          <div className="description-container">
            <h1 className="item-name">{name}</h1>
            <p className="item-description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  rendertechEraDetailsList = () => {
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
        <div className="item-details-bg-container">
          {this.rendertechEraDetailsList()}
        </div>
      </>
    )
  }
}

export default CourseItemDetails
