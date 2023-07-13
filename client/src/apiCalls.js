import axios from "axios";

// auth api call
const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post("/auth/login", userCredentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        // console.log(res);
    } catch(err) {
        dispatch({ type: "LOGIN_FAILURE", payload : err });
        console.log(err);
    }
}

const registerCall = async (userCredentials) => {
    try {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        await axios.post("/auth/register", userCredentials, config);
        alert("User register successful");
    } catch (err) {
        console.log(err);
    }
}

// posts api call
const userFeed = async (userID, dispatch) => {
    dispatch({ type : "FEED_REQUEST_START" });
    try {
        const res = await axios.get(`/posts/feed/${userID}`);
        res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
        dispatch({ type : "FEED_REQUEST_SUCCESS", payload : res.data });
    } catch(err) {
        dispatch({ type : "FEED_REQUEST_ERROR", payload : err });
    }
}

const profilePosts = async (userID, dispatch) => {
    dispatch({ type : "PROFILE_REQUEST_START" });
    try {
        const res = await axios.get(`/posts?userID=${userID}`);
        res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
        dispatch({ type : "PROFILE_REQUEST_SUCCESS", payload : res.data });
    } catch(err) {
        dispatch({ type : "PROFILE_REQUEST_ERROR", payload : err });
    }
}

const createPost = async (prvPosts, postDetails, dispatch) => {
    dispatch({ type : "UPDATE_FEED_START" });
    try {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const post = await axios.post("/posts", postDetails, config);
        // console.log(post);
        dispatch({ type : "UPDATE_FEED_SUCCESS", payload : [post.data, ...prvPosts] })
    } catch (err) {
        dispatch({ type : "UPDATE_FEED_ERROR", payload : err })
        console.log(err);
    }
}

const deletePost = async (prvPosts, postID, dispatch) => {
    dispatch({ type : "DELETE_POST_START" });
    try {
        await axios.delete(`/posts/${postID}`);
        dispatch({ type : "DELETE_POST_SUCCESS", payload : prvPosts.filter((p) => p._id !== postID) })
    } catch (err) {
        dispatch({ type : "DELETE_POST_ERROR", payload : err })
        console.log(err);
    }
}

// user profile api call
const userProfile = async (userID, dispatch) => {
    dispatch({ type : "USER_PROFILE_REQUEST_START" });
    try {
        const res = await axios.get(`/users?userID=${userID}`);
        dispatch({ type : "USER_PROFILE_REQUEST_SUCCESS", payload : res.data });

    } catch (err) {
        dispatch({ type : "USER_PROFILE_REQUEST_ERROR", payload : err });
    }
}

const updateUser = async (user, formData, dispatch) => {
    dispatch({ type : "UPDATE_USER_START", payload : user });
    try {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const user = await axios.put("/users/update", formData, config);
        // console.log(user);
        dispatch({ type : "UPDATE_USER_SUCCESS", payload : user.data });
        alert("Account Updated !");
    } catch (err) {
        if (err.response.status === 403) {
            alert("Entered Email ID or Username already exists");
        }
    }
}

const addComment = async (postID, comment) => {
    try {
        const res = await axios.put(`/posts/comment/${postID}`, comment);
        return res.data.comment;
    } catch (err) {
        console.log(err);
    }
}

const followUser = async (currentUser, user, dispatch) => {
    try {
        await axios.put(`/users/follow/${user._id}`);
        currentUser.following.push(user._id);
        dispatch({ type : "FOLLOW_USER_SUCCESS", payload : currentUser });
    } catch (err) {
        console.log(err);
    }
}

const unfollowUser = async (currentUser, user, dispatch) => {
    try {
        await axios.put(`/users/unfollow/${user._id}`);
        const idx = currentUser.following.indexOf(user._id);
        currentUser.following.splice(idx, 1);
        dispatch({ type : "UNFOLLOW_USER_SUCCESS", payload : currentUser });
    } catch (err) {
        console.log(err);
    }
}

export { loginCall, registerCall, createPost, updateUser, deletePost, userFeed, profilePosts, userProfile, addComment, followUser, unfollowUser };