import { authConstant } from "../actions/constans";

const initialState = {
  name: "",
  email: "",
  authenticating: false,
  authenticated: false,
  error: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${authConstant.USER_LOGIN}_REQUEST`:
      state = { ...state, authenticating: true };
      break;
    case `${authConstant.USER_LOGIN}_SUCCESS`:
      state = {
        ...state,
        authenticating: false,
        ...action.payload.user,
        authenticated: true,
      };
      break;
    case `${authConstant.USER_LOGIN}_FAILURE`:
      state = {
        ...state,
        authenticated: false,
        authenticating: false,
        error: action.payload.error,
      };
      break;
    case `${authConstant.USER_LOGOUT}_REQUEST`:
      break;
    case `${authConstant.USER_LOGOUT}_SUCCESS`:
      state = { ...initialState };
      break;
    case `${authConstant.USER_LOGOUT}_FAILURE`:
      state = { ...state, error: action.payload.error };
      break;
    default:
      return state;
  }
  return state;
};
export default authReducer;
