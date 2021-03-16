import {useSelector, TypedUseSelectorHook} from 'react-redux'
import {RootState} from '../state'

// Defining the Root State Type#
// Both mapState and useSelector depend on declaring the type of the complete 
// Redux store state value. While this type could be written by hand, the easiest 
// way to define it is to have TypeScript infer it based 
// on what your root reducer function returns. This way, the type is 
// automatically updated as the reducer functions are modified.
// If you want to avoid repeating the state type declaration, 
// you can define a typed useSelector hook using a helper type exported by @types/react-redux:

//https://react-redux.js.org/using-react-redux/static-typing
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector