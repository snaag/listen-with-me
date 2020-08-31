import { createAction, handleActions } from 'redux-actions';

// initial state
const initialState = {
  isAlong: true,
};

// action type
const UPDATE_IS_ALONG = 'along/UPDATE_IS_ALONG';

// action creator
const updateIsAlong = createAction(UPDATE_IS_ALONG, status => status);
// const updateIsAlong = (status) => ({
//   type: UPDATE_IS_ALONG,
//   status
// })

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
// const alongReducer = (prevState = initialState, action) => {
//   switch (action.type) {
//     case UPDATE_IS_ALONG:
//       return {
//         ...prevState,
//         isAlong: action.status,
//       };

//     default:
//       return initialState;
//   }
// };

export default alongReducer;
