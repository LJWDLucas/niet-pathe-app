import update from 'immutability-helper';
import * as actionTypes from './actionTypes';

/*
{
  question: "",
  answerRequired: false,
  ratingRequired: false
}
*/
const initialState = {
  new: {
    title: "",
    questions: [],
    active: false,
    answers: {}
  },
};

const movies = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_QUESTION: {
      return update(state, {
        new: {
          questions: {
            $push: [action.payload]
          },
          answers: {
            [action.payload.id]: {
              $set: []
            }
          }
        },
      });
    }
    case actionTypes.REMOVE_QUESTION: {
      const newQuestions = [...state.new.questions];
      const { id } = newQuestions.splice(action.payload, 1)[0];
      return update(state, {
        new: {
          questions: {
            $set: newQuestions
          },
          answers: {
            $unset: [id]
          }
        }
      });
    }
    case actionTypes.SET_PROPERTY: {
      return update(state, {
        new: {
          [action.property]: {
            $set: action.payload
          }
        }
      });
    }
    case actionTypes.TOGGLE_QUESTION_REQUIRED: {
      return update(state, {
        new: {
          questions: {
            [action.index]: {
              [action.requiredType]: {
                $set: action.payload
              }
            }
          }
        }
      });
    }
    case actionTypes.SET_INITIAL_STATE: {
      return initialState;
    }
    default:
      return state;
  }
};

export default movies;
