import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import MasterLayout from "../MasterLayout/MasterLayout";
import Home from "../Home/Home";
import About from "../About/About";
import People from "../People/People";
import Details from "../Details/Details";
import Tvshows from "../Tvshows/Tvshows";
import Notfound from "../Notfound/Notfound";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [userData, setUserData] = useState(null);

  let logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    return <Navigate to="login" />;
  };

  let saveUserData = () => {
    let encodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
    console.log(decodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, []);

  let routes = createBrowserRouter([
    {
      path: "/",
      element: <MasterLayout userData={userData} logout={logout} />,
      errorElement: <Notfound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute userData={userData}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "about",
          element: (
            <ProtectedRoute userData={userData}>
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: "people",
          element: (
            <ProtectedRoute userData={userData}>
              <People />
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "details", element: <Details /> },
        { path: "tvshows", element: <Tvshows /> },
        {
          path: "movies",
          element: (
            <ProtectedRoute userData={userData}>
              <Movies />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
