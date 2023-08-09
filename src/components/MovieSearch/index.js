import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieSearch extends Component {
  state = {
    moviesList: [],
    moviesApiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  getMovies = async () => {
    this.setState({moviesApiStatus: apiStatusConstants.inProgress})

    const {searchInput} = this.state
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=e8ccc676e299173067a80520c1fee405&query=${searchInput}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(response.ok)

    const movies = data.results
    if (movies.length !== 0) {
      console.log(movies)
      const updatedData = movies.map(eachMovie => ({
        movieTitle: eachMovie.original_title,
        releaseDate: eachMovie.release_date,
        id: eachMovie.id,
        movieDescription: eachMovie.overview,
        poster: eachMovie.poster_path,
        rating: eachMovie.vote_average,
        title: eachMovie.title,
      }))
      this.setState({
        moviesList: updatedData,
        moviesApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({moviesApiStatus: apiStatusConstants.failure})
    }
  }

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="search-bar">
        <input
          className="search-input"
          type="search"
          placeholder="Search"
          value={searchInput}
          onChange={e => this.setState({searchInput: e.target.value})}
        />
        <button
          className="search-button"
          type="button"
          data-testid="searchButton"
          onClick={() => this.getMovies()}
        >
          Search!
        </button>
      </div>
    )
  }

  renderNoMoviesView = () => (
    <div className="no-movies-container">
      <h1 className="no-movies-heading">No movies Found</h1>
      <p className="no-movies-description">
        We could not find any movies. Try other filters.
      </p>
    </div>
  )

  renderMoviesLoaderView = () => (
    <div className="movies-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  renderMoviesList = () => {
    const {moviesList} = this.state
    return (
      <>
        {moviesList.length > 0 ? (
          <ul className="movies-list">
            {moviesList.map(eachMovie => (
              <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
            ))}
          </ul>
        ) : (
          this.renderNoMoviesView()
        )}
      </>
    )
  }

  renderMoviesBasedOnAPiStatus = () => {
    const {moviesApiStatus} = this.state

    switch (moviesApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderMoviesLoaderView()
      case apiStatusConstants.success:
        return this.renderMoviesList()
      case apiStatusConstants.failure:
        return this.renderMoviesApiFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movies-page-container">
        <div className="Heading-Movie-Container">
          <p className="movie-heading">Movie Name</p>
          <div>
            {this.renderSearchBar()}
            {this.renderMoviesBasedOnAPiStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default MovieSearch
