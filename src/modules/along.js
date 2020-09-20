import { createAction, handleActions } from 'redux-actions';

// initial state
const initialState = {
  isAlong: true,
};

// action type
const UPDATE_IS_ALONG = 'along/UPDATE_IS_ALONG';

// action creator
const updateIsAlong = createAction(UPDATE_IS_ALONG);

export { updateIsAlong };

// reducer
const alongReducer = handleActions(
  {
    [UPDATE_IS_ALONG]: (prevState, action) => ({
      ...prevState,
      isAlong: action.payload,
    }),
  },
  initialState
);

export default alongReducer;
