import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

// actionCreators
export const useActions = () => {
  const dispatch = useDispatch();
  // we are making use of use memo - here to memoise bindactioncreators.
  // this means is only runs when something in array (in this case dispatch) changes.
  // this will therfore only run once.
  // binds actioncreators so you can import them all at once
  // memo is dispatch
  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
