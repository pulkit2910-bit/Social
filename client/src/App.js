import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import UserProfile from "./pages/userProfile/UserProfile";
import PostPage from "./pages/post/PostPage";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext/AuthContext";
import Chat from "./pages/Chat/Chat";
import EditProfile from "./pages/EditProfile/EditProfile";

function App() {
  const {user} = useContext(AuthContext);

  return (
    <div className="App">
      <div className="blur1" style={{ right: "4%", top: "5%" }}></div>
      <div className="blur1" style={{ left: "-5%", top: "60%" }}></div>
      <div className="blur2" style={{ left: "10%", top: "15%" }}></div>
      <div className="blur2" style={{ right: "-5%", top: "80%" }}></div>
      <div className="blur3" style={{ right: "30%", top: "5%" }}></div>
      <div className="blur3" style={{ right: "30%", top: "80%" }}></div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login />} />
          <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route exact path="/profile" element={user ? <Profile /> : <Navigate to="/" /> } />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile/:userID" element={user ? <UserProfile /> : <Navigate to="/" /> }  />
          <Route exact path="/post/:postID" element={user ? <PostPage /> : <Navigate to="/" /> }  />
          <Route exact path="/inbox" element={user ? <Chat /> : <Navigate to="/" />} />
          <Route exact path="/edit-profile" element={user ? <EditProfile /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
