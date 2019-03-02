import React, { Component } from 'react';
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { fetchSurvey } from '../actions/surveyActions';
import BackButton from '../../../components/BackButton';

class SurveyResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
  }

  componentDidMount() {
    const { getResult } = this.props;
    return getResult()
      .then(() => this.setState({ initialized: true }));
  }

  render() {
    const { initialized } = this.state;
    const { survey } = this.props;
    if (!initialized) return null;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-2">Titel van enquete:</div>
          <div className="col-sm-10">{survey.title}</div>
        </div>
        {survey.questions.map((question, index) => (
          <React.Fragment>
            {question.answerRequired && (
              <Table key={`text_${question.id}`}>
                <thead>
                  <tr>
                    <td>
                      #
                    </td>
                    <td>
                      {`Vraag: ${question.questionText}`}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {survey.answers[index].map((responder, i) => (
                    <tr>
                      <td>
                        {i + 1}
                      </td>
                      <td>
                        {responder.answerText}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            {question.ratingRequired && (
              <Table key={`rating${question.id}`}>
                <tbody>
                  <td>Hoi2</td>
                </tbody>
              </Table>
            )}
          </React.Fragment>
        ))}
        <BackButton destination="/secure/surveys" />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  survey: state.entities.surveys[ownProps.match.params.id]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getResult: () => dispatch(fetchSurvey(ownProps.match.params.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SurveyResults));

SurveyResults.propTypes = {

};
