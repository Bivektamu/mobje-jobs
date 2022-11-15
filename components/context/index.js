import {useContext, createContext, useReducer} from 'react'
import reducer from './reducer';
const Store = createContext();
export const useStore = () => useContext(Store)

const initialState = {
    loading:true,
    user:null,
}



export const StoreProvider = ({children}) => {
    

    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <Store.Provider value={[state, dispatch]}>
            {children}
        </Store.Provider>
    )
}
