import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {
    movieTitle,
    releaseDate,
    movieDescription,
    poster,
    rating,
  } = movieDetails
  return (
    <li className="movie-card">
      <div className="logo-title-container-card">
        <img src={poster} alt="movie poster" className="company-logo-card" />
        <div className="title-rating-container-card">
          <h1 className="movie-Title">{movieTitle}</h1>
          <div className="rating-container-card">
            <p className="rating-number-card">Release Date</p>
            <p className="r-d-card">{releaseDate}</p>
          </div>
          <p className="rating-text">Rating:{rating}</p>
          <p className="type-text">{movieDescription}</p>
        </div>
      </div>
    </li>
  )
}

export default MovieCard
