const FeedReducer = (state, action) => {
  switch (action.type) {
    case "FEED_REQUEST_START":
      return {
        posts: null,
        isFetching: true,
        error: null,
      };

    case "FEED_REQUEST_SUCCESS":
      return {
        posts: action.payload,
        isFetching: false,
        error: null,  
      };

    case "FEED_REQUEST_ERROR":
      return {
        posts: null,
        isFetching: false,
        error: action.payload,
      };

    case "PROFILE_REQUEST_START":
      return {
        posts: null,
        isFetching: true,
        error: null,
      };

    case "PROFILE_REQUEST_SUCCESS":
      return {
        posts: action.payload,
        isFetching: false,
        error: null,
      };

    case "PROFILE_REQUEST_ERROR":
      return {
        posts: null,
        isFetching: false,
        error: action.payload,
      };

    case "UPDATE_FEED_START":
      return {
        posts: null,
        isFetching: true,
        error: null,
      };

    case "UPDATE_FEED_SUCCESS":
      return {
        posts: action.payload,
        isFetching: false,
        error: null,
      };

    case "UPDATE_FEED_ERROR":
      return {
        posts: null,
        isFetching: false,
        error: action.payload,
      };

    case "DELETE_POST_START": 
      return {
        posts: null,
        isFetching: true,
        error: null,
      };

    case "DELETE_POST_SUCCESS": 
      return {
        posts: action.payload,
        isFetching: false,
        error: null,
      };

    case "DELETE_POST_ERROR": 
      return {
        posts: null,
        isFetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default FeedReducer;
