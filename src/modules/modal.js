import { createAction, handleActions } from 'redux-actions';

// initial state
const initialState = {
  signInModalActive: false,
  signUpModalActive: false,
};

// action type
//.. signin
const SIGNIN_MODAL_ACTIVE = 'modal/signin/active';
const SIGNIN_MODAL_INACTIVE = 'modal/signin/inactive';
//.. signup
const SIGNUP_MODAL_ACTIVE = 'modal/signup/active';
const SIGNUP_MODAL_INACTIVE = 'modal/signup/inactive';

// action creator (sync)
//.. signin
const setSignInActive = createAction(SIGNIN_MODAL_ACTIVE);
const setSignInInactive = createAction(SIGNIN_MODAL_INACTIVE);
//.. signup
const setSignUpActive = createAction(SIGNUP_MODAL_ACTIVE);
const setSignUpInactive = createAction(SIGNUP_MODAL_INACTIVE);
export {
  setSignInActive,
  setSignInInactive,
  setSignUpActive,
  setSignUpInactive,
};

// reducer
const modalReducer = handleActions(
  {
    [SIGNIN_MODAL_ACTIVE]: prevState => ({
      ...prevState,
      signInModalActive: true,
    }),
    [SIGNIN_MODAL_INACTIVE]: prevState => ({
      ...prevState,
      signInModalActive: false,
    }),
    [SIGNUP_MODAL_ACTIVE]: prevState => ({
      ...prevState,
      signUpModalActive: true,
    }),
    [SIGNUP_MODAL_INACTIVE]: prevState => ({
      ...prevState,
      signUpModalActive: false,
    }),
  },
  initialState
);

export default modalReducer;
