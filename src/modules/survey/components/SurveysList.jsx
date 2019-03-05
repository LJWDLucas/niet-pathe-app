import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchAllSurveys } from '../actions/surveyActions';
import BackButton from '../../../components/BackButton';

class SurveysList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
    this.addSurvey = this.addSurvey.bind(this);
  }

  componentDidMount() {
    const { getSurveys } = this.props;
    return getSurveys()
      .then(() => this.setState({ initialized: true }));
  }

  addSurvey() {
    const { location, history } = this.props;
    history.push(`${location.pathname}/create`);
  }

  render() {
    const { initialized } = this.state;
    const { surveys, onSurveySelect } = this.props;

    if (!initialized) return null;

    return (
      <React.Fragment>
        <Table responsive className="with-hover">
          <thead>
            <tr>
              <th>Titel</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(surveys).map(survey => (
              <tr key={survey.id} onClick={() => onSurveySelect(survey.id)}>
                <td>{survey.title}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="row">
          <div className="col-lg-2">
            <BackButton destination="/secure" />
          </div>
          <div className="col-lg-2">
            <button
              type="button"
              className="btn btn-light"
              onClick={this.addSurvey}
            >
              Nieuwe enquete toevoegen
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  surveys: state.entities.surveys
});

const mapDispatchToProps = dispatch => ({
  getSurveys: () => dispatch(fetchAllSurveys())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SurveysList));

SurveysList.propTypes = {
  getSurveys: PropTypes.func,
  surveys: PropTypes.object
};
