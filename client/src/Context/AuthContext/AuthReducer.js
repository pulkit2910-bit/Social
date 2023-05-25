// reducer takes previous state and action and updates the current state to new state according to the action

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "INTITIAL_STATE":
     return {
        user: null,
        isFetching: false,
        error: false,
     };
     
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };

    case "FOLLOW_USER_SUCCESS":
      return {
        user : action.payload,
        isFetching : false,
        error : null
      }

    case "UNFOLLOW_USER_SUCCESS":
      return {
        user : action.payload,
        isFetching : false,
        error : null
      }

    case "UPDATE_USER_START":
      return {
        user : action.payload,
        isFetching : true,
        error : null
      }

    case "UPDATE_USER_SUCCESS":
      return {
        user : action.payload,
        isFetching : false,
        error : null
      }
      
    case "UPDATE_USER_FAILURE":
      return {
        user : null,
        isFetching : false,
        error : action.payload
      }

    default:
      return state;
  }
};

export default AuthReducer;
