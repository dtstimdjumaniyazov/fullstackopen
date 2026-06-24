import { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogDetails from "./components/BlogDetails";
import ErrorBoundary from "./components/ErrorBoundary";
import PageNotFound from "./components/PageNotFound";
import { useBlogActions, useBlogsStore, useNotificationActions, useUserActions, useUsersStore } from "./store/store";
import UserView from "./components/UserView";
import UserDetailView from "./components/UserDetailsView";

const App = () => {
  const navigate = useNavigate();

  const { createNotification, errorNotification } = useNotificationActions()
  const { initialize, initializeUsers } = useBlogActions()
  const blogs = useBlogsStore()
  const user = useUsersStore()
  const { initializeUser, logout } = useUserActions()
  

  useEffect(() => {
    initialize()
  }, [initialize]);

  useEffect(() => {
    initializeUser()
  }, [initializeUser]);

  useEffect(() => {
    initializeUsers()
  }, [initializeUsers])


  const handleLogout = (event) => {
    event.preventDefault();
    try {
      logout()
      navigate("/");
    } catch (error) {
      errorNotification(error.response.data.error);
      console.error("Error logout", error);
    }
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar position="static">
          <Button color="inherit">
            <Link style={{ margin: "5px" }} to="/">
              Blogs
            </Link>
          </Button>
          <Button color="inherit">
            <Link style={{ margin: "5px" }} to="/create-blog">
              new blog
            </Link>
          </Button>
          <Button color="inherit">
              <Link style={{ margin: "5px" }} to="/users">
                Users
              </Link>
          </Button>
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit">
              <Link style={{ margin: "5px" }} to="/login">
                Login
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <div>
        <Notification/>
      </div>

      <Routes>
        <Route
          style={{ margin: "5px" }}
          path="/"
          element={
            <ErrorBoundary>
              <BlogList user={user} />
            </ErrorBoundary>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ErrorBoundary>
              <BlogDetails user={user}/>
            </ErrorBoundary>
          }
        />
        <Route
          path="/create-blog"
          element={
            <ErrorBoundary>
              <NewBlogForm />
            </ErrorBoundary>
          }
        />
        <Route 
          style={{ margin: "5px" }}
          path="/users"
          element={
            <ErrorBoundary>
              <UserView />
            </ErrorBoundary>
          }
        />
        <Route
          style={{ margin: "5px" }}
          path="/users/:id"
          element={
            <ErrorBoundary>
              <UserDetailView />
            </ErrorBoundary>
          }
        />
        <Route
          style={{ margin: "5px" }}
          path="/login"
          element={
            <ErrorBoundary>
              <LoginForm />
            </ErrorBoundary>
          }
        />
        <Route style={{ margin: "5px" }} path="*" element={<PageNotFound />} />
      </Routes>
    </Container>
  );
};

export default App;
