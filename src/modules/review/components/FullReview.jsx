import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMovieById } from '../../../actions/movieActions';
import BackButton from '../../../components/BackButton';
import { deleteReview, acceptReview } from '../actions/reviewActions';

class FullReview extends Component {
  componentDidMount() {
    const { fetchMovie, review } = this.props;
    if (!review) return null;
    fetchMovie(review.movieId);
  }


  render() {
    const { review, movie, removeReview, approveReview } = this.props;

    if (!review) {
      return (
        <React.Fragment>
          <div>Niets gevonden</div>
          <BackButton destination="/secure/reviews" />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <table className="table white-text">
          <thead>
            <tr>
              <th>Sleutel</th>
              <th>Waarde</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Filmnaam</td>
              <td>{(movie && movie.title) || null}</td>
            </tr>
            <tr>
              <td>Naam van poster</td>
              <td>{review.name || "Onbekend"}</td>
            </tr>
            <tr>
              <td>Opmerking</td>
              <td>{review.comment}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={e => {
            e.stopPropagation();
            approveReview(review.id);
          }}
          type="button"
        >
          Accepteren
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            removeReview(review.id, review.removalId);
          }}
          type="button"
        >
          Verwijderen
        </button>
        <BackButton destination="/secure/reviews" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const review = state.reviews.unapproved[ownProps.match.params.id];
  return {
    review: review || null,
    movie: state.entities.movies[(review && review.movieId) || null]
  };
};

const mapDispatchToProps = dispatch => ({
  fetchMovie: id => dispatch(getMovieById(id)),
  removeReview: (reviewId, removalId) => dispatch(deleteReview(reviewId, removalId)),
  approveReview: reviewId => dispatch(acceptReview(reviewId))
});

export default connect(mapStateToProps, mapDispatchToProps)(FullReview);

FullReview.propTypes = {
  review: PropTypes.object,
  movie: PropTypes.object,
  fetchMovie: PropTypes.func,
  removeReview: PropTypes.func,
  approveReview: PropTypes.func
};
