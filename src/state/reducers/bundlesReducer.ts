import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundlesState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  } | undefined
}

const initialState: BundlesState = {};

const reducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        // current cell
        state[action.payload.cellId] = {
          // loading will be true
          loading: true,
          // throw away error and code
          code: '',
          err: '',
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        // get current cell
        state[action.payload.cellId] = {
           // loading is now false
          loading: false,
          // code and err set
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
