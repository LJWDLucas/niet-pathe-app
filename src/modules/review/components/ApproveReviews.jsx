import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUnapprovedReviews } from '../actions/reviewActions';
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
    const { reviews } = this.props;

    if (!initialized) return null;

    return (
      <React.Fragment>
        <div>
          Klik op een review om deze in zijn geheel te bekijken of verwijder de review op basis van de snippet.
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
                      }}
                    >
                      Delete
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
  getUnapprovedReviews: () => dispatch(fetchUnapprovedReviews())
});

export default connect(mapStateToProps, mapDispatchToProps)(ApproveReviews);

ApproveReviews.propTypes = {
  getUnapprovedReviews: PropTypes.func,
  reviews: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object
};
