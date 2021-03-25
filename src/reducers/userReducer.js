import { userConstant } from "../actions/constans";

const initialState = { users: [], conversations: [] };
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${userConstant.GET_USERS}_REQUEST`:
      break;
    case `${userConstant.GET_USERS}_SUCCESS`:
      state = {
        ...state,
        users: action.payload.users,
      };
      break;
    case `${userConstant.GET_MESSAGES}`:
      state = {
        ...state,
        conversations: action.payload.conversations,
      };
      break;
    case `${userConstant.GET_MESSAGES}_FAILURE`:
      break;
    default:
      return state;
  }
  return state;
};
export default userReducer;
