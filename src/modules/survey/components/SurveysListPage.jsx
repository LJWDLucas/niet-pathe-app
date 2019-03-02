import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SurveysList from './SurveysList';

class SurveysListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
    this.onSurveySelect = this.onSurveySelect.bind(this);
  }

  componentDidMount() {
    this.setState({ initialized: true });
  }

  onSurveySelect(id) {
    const { history, match } = this.props;
    return history.push(`${match.path}/${id}`);
  }

  render() {
    const { initialized } = this.state;

    if (!initialized) return null;

    return (
      <SurveysList
        onSurveySelect={this.onSurveySelect}
      />
    );
  }
}
const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SurveysListPage);

SurveysListPage.propTypes = {

};
