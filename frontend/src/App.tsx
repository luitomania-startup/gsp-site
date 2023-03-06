import React, { ReactNode } from "react";
import "./App.css";
// import {Router as BrowserRouter} from 'react-router-dom'
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Contact from "./routes/contactUs";
import { useGetDocsListQuery } from "./services/docs";
// import AdminNavbar from "./components/AdminNavbar";
// import About from "./routes/aboutUs";
// import AdminHome from "./routes/adminHome";
// import AdminFeed from "./routes/adminFeed";
// import AdminGallery from "./routes/adminGallery";
// import AdminLogin from "./routes/adminLogin";
// import AdminMembers from "./routes/adminMembers";
// import AdminPosts from "./routes/adminPosts";
// import Gallery from "./routes/gallery";
// import Login from "./routes/login";
// import Members from "./routes/members";
// import Register from "./routes/register";
// import ViewFeed from "./components/ViewFeed";

const LazyAbout = React.lazy(() => import("./routes/aboutUs"));
const LazyMembers = React.lazy(() => import("./routes/members"));
const LazyGallery = React.lazy(() => import("./routes/gallery"));
const LazyLogin = React.lazy(() => import("./routes/login"));
const LazyRegister = React.lazy(() => import("./routes/register"));
const LazyViewFeed = React.lazy(() => import("./components/ViewFeed"));

// admin imports

const LazyAdminFeed = React.lazy(() => import("./routes/adminFeed"));
const LazyAdminPosts = React.lazy(() => import("./routes/adminPosts"));
const LazyAdminMembers = React.lazy(() => import("./routes/adminMembers"));
const LazyAdminGallery = React.lazy(() => import("./routes/adminGallery"));
const LazyAdminLogin = React.lazy(() => import("./routes/adminLogin"));
const LazyAdminNavbar = React.lazy(() => import("./components/AdminNavbar"));
const LazyAdminHome = React.lazy(() => import("./routes/adminHome"));
const LazyAdminAboutUs = React.lazy(() => import("./routes/adminAboutUs"));
const LazyAdminRegister = React.lazy(() => import("./routes/adminRegister"));

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <React.Suspense>{children}</React.Suspense>;
};
const App: React.FC = () => {
  const { data, error, isLoading } = useGetDocsListQuery();
  // console.log(import.meta.env.VITE_CLOUD_NAME);

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />

        <Route
          path="/about"
          element={
            <Wrapper>
              <LazyAbout />
            </Wrapper>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/members"
          element={
            <Wrapper>
              <LazyMembers />
            </Wrapper>
          }
        />
        <Route
          path="/gallery"
          element={
            <Wrapper>
              <LazyGallery />
            </Wrapper>
          }
        />

        <Route
          path="/login"
          element={
            <Wrapper>
              <LazyLogin />
            </Wrapper>
          }
        />

        <Route
          path="/register"
          element={
            <Wrapper>
              <LazyRegister />
            </Wrapper>
          }
        />

        <Route
          path="/feed/:id"
          element={
            <Wrapper>
              <LazyViewFeed />
            </Wrapper>
          }
        />
      </Route>
      <Route
        path="/admin"
        element={
          <Wrapper>
            <LazyAdminNavbar />
          </Wrapper>
        }
      >
        <Route
          index
          element={
            <Wrapper>
              <LazyAdminHome />
            </Wrapper>
          }
        />

        <Route
          path="login"
          element={
            <Wrapper>
              <LazyAdminLogin />
            </Wrapper>
          }
        />
        <Route
          path="gallery"
          element={
            <Wrapper>
              <LazyAdminGallery />
            </Wrapper>
          }
        />
        <Route
          path="posts"
          element={
            <Wrapper>
              <LazyAdminPosts />
            </Wrapper>
          }
        />
        <Route
          path="members"
          element={
            <Wrapper>
              <LazyAdminMembers />
            </Wrapper>
          }
        />
        <Route
          path="feed"
          element={
            <Wrapper>
              <LazyAdminFeed />
            </Wrapper>
          }
        />
        <Route
          path="aboutUs"
          element={
            <Wrapper>
              <LazyAdminAboutUs />
            </Wrapper>
          }
        />
        <Route
          path="membershipForm"
          element={
            <Wrapper>
              <LazyAdminRegister />
            </Wrapper>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
