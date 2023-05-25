import { createContext, useReducer } from "react";
import FeedReducer from "./FeedReducer";

const INITIAL_STATE = {
    posts : null,
    isFetching : true,
    error : null
}

const FeedContext = createContext(INITIAL_STATE);

const FeedContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FeedReducer, INITIAL_STATE);

    return (
        <FeedContext.Provider
            value={{
                posts : state.posts,
                isFetching : state.isFetching,
                error : state.error,
                dispatch
            }}
        >
            { children }
        </FeedContext.Provider>
    )
}

export { FeedContext, FeedContextProvider };