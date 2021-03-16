import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actionCreators} from '../state'

// actionCreators 
export const useActions = () => {
    const dispatch = useDispatch()
    // binds actioncreators so you can import them all at once
    return bindActionCreators(actionCreators, dispatch)
}



