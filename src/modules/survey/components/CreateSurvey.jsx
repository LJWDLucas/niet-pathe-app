import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CreateSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
  }

  componentDidMount() {
    this.setState({ initialized: true });
  }

  render() {
    const { initialized } = this.state;

    if (!initialized) return null;

    return (
      <div>

      </div>
    );
  }
}
const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSurvey);

CreateSurvey.propTypes = {

};
