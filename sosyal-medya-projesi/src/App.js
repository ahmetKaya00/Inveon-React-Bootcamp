import {BrowserRouter as Router, Route,  Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PostDetails from "./pages/PostDetails";
import AddPost from "./pages/AddPost";
import { ToastContainer } from "react-toastify";

const App = () => {
  return(
    <Router>
      <Header/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route
          path="/"
          element={
            <ProtectedRoute>
                <Home/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:postId"
          element={
            <ProtectedRoute>
              <PostDetails/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-post"
          element={
            <ProtectedRoute>
              <AddPost/>
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </Router>
  );
}
export default App;