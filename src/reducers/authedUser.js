import { SET_AUTHED_USER } from '../actions/authedUser'

export default function authedUser(state = null, action) {
  if (action.type === SET_AUTHED_USER) {
      return action.id
  } else {
      return state;
  }
}