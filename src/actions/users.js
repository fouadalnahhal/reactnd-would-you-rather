export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ASSIGN_ANSWER = "ASSIGN_ANSWER";
export const ASSIGN_QUESTION = "ASSIGN_QUESTION";



export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}
export function assignAnswer({ authedUser, qid, answer }) {
  return {
    type: ASSIGN_ANSWER,
    authedUser,
    qid,
    answer,
  };
}
export function assignQuestion(authedUser, qid) {
  return {
    type: ASSIGN_QUESTION,
    authedUser,
    qid,
  };
}