import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { FormGroup, Label, Input, Table } from 'reactstrap';
import { connect } from 'react-redux';
import BackButton from '../../../components/BackButton';
import { setSurveyProperty, addSurveyQuestion, toggleSurveyQuestionCheckbox, removeSurveyQuestion, postSurvey } from '../actions/surveyActions';

class CreateSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newQuestion: ''
    };
    this.onNewQuestionChange = this.onNewQuestionChange.bind(this);
  }

  onNewQuestionChange(e) {
    this.setState({ newQuestion: e.target.value });
  }

  render() {
    const { survey, setTitle, addQuestion, setActive, toggleQuestionCheckbox, deleteQuestion, createSurvey } = this.props;
    const { newQuestion } = this.state;
    return (
      <React.Fragment>
        <FormGroup>
          <Label htmlFor="title">Titel</Label>
          <Input value={survey.title} onChange={e => setTitle(e.target.value)} />
        </FormGroup>
        <div>Vragen bij deze enquete:</div>
        <Table className="with-hover white-text">
          <tbody>
            {survey.questions.length === 0 && (
              <tr>
                <td>
                  Je hebt nog geen vragen toegevoegd!
                </td>
              </tr>
            )}
            {survey.questions.length > 0 && survey.questions.map((question, index) => (
              <tr key={question.id}>
                <td>
                  {question.questionText}
                </td>
                <td>
                  Antwoord verplicht
                  <input
                    type="checkbox"
                    className="form-control"
                    checked={survey.questions[index].answerRequired}
                    onChange={() => toggleQuestionCheckbox(index, 'answerRequired', !survey.questions[index].answerRequired)}
                  />
                </td>
                <td>
                  Waardering verplicht
                  <input
                    type="checkbox"
                    className="form-control"
                    checked={survey.questions[index].ratingRequired}
                    onChange={() => toggleQuestionCheckbox(index, 'ratingRequired', !survey.questions[index].ratingRequired)}
                  />
                </td>
                <td>
                  <div onClick={() => deleteQuestion(index)}>
                    Verwijderen
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="flex">
          <Input value={newQuestion} onChange={this.onNewQuestionChange} />
          <button className="btn btn-light" type="button" onClick={() => addQuestion(newQuestion)}>+</button>
        </div>
        <div>
          <Label htmlFor="active">Actief?</Label>
          <input
            id="active"
            checked={survey.active}
            type="checkbox"
            onChange={() => setActive(!survey.active)}
          />
        </div>
        <BackButton destination="/secure/surveys" />
        <button onClick={createSurvey} className="btn btn-light" type="button">
          Opslaan
        </button>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  survey: state.surveys.new
});

const mapDispatchToProps = dispatch => ({
  addQuestion: questionText => dispatch(addSurveyQuestion({
    id: uuid().substr(12, 36).replace(/\W/g, '4'),
    questionText,
    answerRequired: false,
    ratingRequired: false
  })),
  createSurvey: () => dispatch(postSurvey()),
  deleteQuestion: index => dispatch(removeSurveyQuestion(index)),
  toggleQuestionCheckbox: (index, requiredType, payload) => dispatch(toggleSurveyQuestionCheckbox(index, requiredType, payload)),
  setTitle: value => dispatch(setSurveyProperty('title', value)),
  setActive: value => dispatch(setSurveyProperty('active', value))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSurvey);

CreateSurvey.propTypes = {
  survey: PropTypes.object,
  setActive: PropTypes.func,
  setTitle: PropTypes.func,
  createSurvey: PropTypes.func,
  addQuestion: PropTypes.func,
  toggleQuestionCheckbox: PropTypes.func,
  deleteQuestion: PropTypes.func
};
