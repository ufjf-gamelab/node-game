import { UPDATE_HISTOGRAM_NAMES } from "../actions/types";

const INITIAL_STATE = {
  updateHistogramNames: false,
};
// ...state mantem o estado anterior modificando apenas as variaveis indicadas
export default (state = INITIAL_STATE, action: { type: any, payload: any }) => {
  switch (action.type) {
    case UPDATE_HISTOGRAM_NAMES:
      return { ...state, updateHistogramNames: action.payload };
    default:
      return state;
  }
};
