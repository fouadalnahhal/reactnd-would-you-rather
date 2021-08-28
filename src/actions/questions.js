import { assignAnswer, assignQuestion } from "../actions/users";
import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

export function handleAnswerQuestion(qid, answer) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();
    dispatch(answerQuestion({ authedUser, qid, answer }));
    dispatch(assignAnswer({ authedUser, qid, answer }));
    return saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => dispatch(hideLoading()))
      .catch((e) => {
        console.warn("Error adding the question", e);
      });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => {
      console.log("Your new question: ", question);
      dispatch(addQuestion(question));
      dispatch(assignQuestion(authedUser, question.id));
      dispatch(hideLoading());
    });
  };
}
