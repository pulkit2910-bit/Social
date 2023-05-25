import { createContext, useReducer } from "react";
import userProfileReducer from "./UserProfileReducer";

const INITIAL_STATE = {
    userProfile : null,
    isFetching : true,
    error : null
}

const UserProfileContext = createContext(INITIAL_STATE);

const UserProfileContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userProfileReducer, INITIAL_STATE);

    <UserProfileContext.Provider
        value={{
            userProfile : state.userProfile,
            isFetching : state.isFetching,
            error : state.error,
            dispatch
        }}
    >
        { children }  
    </UserProfileContext.Provider>
}

export { UserProfileContext, UserProfileContextProvider };