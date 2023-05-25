const userProfileReducer = ((state, action) => {
    switch (action.type) {
        case "USER_PROFILE_REQUEST_START":
            return {
                userProfile : null,
                isFetching : true,
                error : null
            }

        case "USER_PROFILE_REQUEST_SUCCESS":
            return {
                userProfile : action.payload,
                isFetching : false,
                error : null
            }

        case "USER_PROFILE_REQUEST_ERROR":
            return {
                userProfile : null,
                isFetching : false,
                error : action.payload
            }
    
        default:
            return state;
    }
});

export default userProfileReducer;