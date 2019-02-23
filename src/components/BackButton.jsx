import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

class BackButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { history, destination } = this.props;
    history.push(destination);
  }

  render() {
    return (
      <button
        type="button"
        className="btn btn-light"
        onClick={this.onClick}
      >
        Vorige
      </button>
    );
  }
}

export default withRouter(BackButton);

BackButton.propTypes = {
  history: PropTypes.object,
  destination: PropTypes.string
};
