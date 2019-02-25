import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUnapprovedReviews, deleteReview, acceptReview } from '../actions/reviewActions';
import BackButton from '../../../components/BackButton';

class ApproveReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
  }

  componentDidMount() {
    const { getUnapprovedReviews } = this.props;
    getUnapprovedReviews()
      .then(() => this.setState({ initialized: true }));
  }

  getSnippet(comment) {
    if (comment.length <= 100) return comment;
    return `${comment.substr(0, 100)}...`;
  }

  navigateToReview(id) {
    const { history, match } = this.props;
    history.push(`${match.path}/${id}`);
  }

  render() {
    const { initialized } = this.state;
    const { reviews, approveReview, removeReview } = this.props;

    if (!initialized) return null;

    return (
      <React.Fragment>
        <div>
          Klik op een review om deze in zijn geheel te bekijken of accepteer / verwijder de review op basis van de snippet.
        </div>
        <hr />
        <table className="table with-hover">
          <thead>
            <tr>
              <th>Review Id</th>
              <th>Movie Id</th>
              <th>Snippet</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(reviews).map(review => (
                <tr key={review.id} onClick={() => this.navigateToReview(review.id)}>
                  <td>{review.id}</td>
                  <td>{review.movieId}</td>
                  <td>{this.getSnippet(review.comment)}</td>
                  <td>
                    <div
                      onClick={e => {
                        e.stopPropagation();
                        approveReview(review.id);
                      }}
                    >
                      Accepteren
                    </div>
                  </td>
                  <td>
                    <div
                      onClick={e => {
                        e.stopPropagation();
                        removeReview(review.id, review.removalId);
                      }}
                    >
                      Verwijderen
                    </div>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
        <BackButton destination="/secure" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  reviews: state.reviews.unapproved,
});

const mapDispatchToProps = dispatch => ({
  getUnapprovedReviews: () => dispatch(fetchUnapprovedReviews()),
  removeReview: (reviewId, removalId) => dispatch(deleteReview(reviewId, removalId)),
  approveReview: reviewId => dispatch(acceptReview(reviewId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ApproveReviews);

ApproveReviews.propTypes = {
  getUnapprovedReviews: PropTypes.func,
  reviews: PropTypes.object,
  match: PropTypes.object,
  approveReview: PropTypes.func,
  removeReview: PropTypes.func,
  history: PropTypes.object
};
