import React from 'react';
import PropTypes from 'prop-types';

const CarouselBrowseSlide = ({ movies }) => (
  <div className="row ">
    {movies.map(movie => (
      <div className="col-sm-3" style={{ maxHeight: "400px" }}>
        <img style={{ width: "100%", height: "auto" }} alt="ok" src={movie.posterUrl} />
      </div>
    ))}
  </div>
);

export default CarouselBrowseSlide;

CarouselBrowseSlide.propTypes = {
  movies: PropTypes.array
};
