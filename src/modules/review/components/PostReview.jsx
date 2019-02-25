import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { constructReview, postReview } from '../actions/reviewActions';
import { getMovieById } from '../../../actions/movieActions';

class PostReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
  }

  componentDidMount() {
    const { movie, fetchMovie, setMovieId } = this.props;
    setMovieId();
    if (movie) return this.setState({ initialized: true });
    return fetchMovie()
      .then(() => this.setState({ initialized: true }));
  }

  hasAlreadyReviewed() {
    const { match } = this.props;
    return localStorage.getItem(match.params.movieId);
  }

  render() {
    const { initialized } = this.state;
    const { setReview, name, comment, createReview } = this.props;

    if (!initialized) return null;

    return (
      <React.Fragment>
        <form>
          <div className="form-group row">
            <label
              htmlFor="name"
              className="col-sm-2 col-form-label"
            >
              Naam
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control-plaintext"
                style={{ backgroundColor: "white" }}
                id="name"
                value={name}
                onChange={e => {
                  e.preventDefault();
                  if (e.target.value.length > 100) return null;
                  setReview('name', e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="col-sm-2 col-form-label">
                Review:
            </label>
            <div className="col-sm-10">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={comment}
              onChange={e => {
                e.preventDefault();
                if (e.target.value.length > 4500) return null;
                setReview('comment', e.target.value);
              }}
            />
            Maximaal 4500 karakters.
            </div>
          </div>
          <button
            type="button"
            className="btn btn-light"
            onClick={createReview}
            disabled={this.hasAlreadyReviewed()}
          >
            Opsturen
          </button>
        </form>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  movie: state.entities.movies[ownProps.match.params.movieId] || null,
  comment: state.reviews.review.comment,
  name: state.reviews.review.name
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchMovie: () => dispatch(getMovieById(ownProps.match.params.movieId)),
  setMovieId: () => dispatch(constructReview('movieId', ownProps.match.params.movieId)),
  setReview: (property, input) => dispatch(constructReview(property, input)),
  createReview: () => dispatch(postReview())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostReview);

PostReview.propTypes = {
  movie: PropTypes.object,
  match: PropTypes.object,
  comment: PropTypes.string,
  createReview: PropTypes.func,
  name: PropTypes.string,
  fetchMovie: PropTypes.func,
  setMovieId: PropTypes.func,
  setReview: PropTypes.func
};
