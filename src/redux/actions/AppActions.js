import { UPDATE_HISTOGRAM_NAMES } from "../actions/types";
export const setUpdateNamesHistograms = (aBool) => {
  return (dispatch) => {
    console.log(aBool);
    dispatch({ type: UPDATE_HISTOGRAM_NAMES, payload: aBool });
  };
};
