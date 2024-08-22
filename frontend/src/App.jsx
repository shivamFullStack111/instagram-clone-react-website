import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Spinner from "./Spinner";
import isauthenticatedd from "./store/Controllers/userController";
import { useDispatch } from "react-redux";
import UserProtectedRoute from "./assets/protectedRoutes/userProtectedRoute";
import LoginRegisterProtectedRoute from "./assets/protectedRoutes/LoginRegisterProtectedRoute";

const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const Home = lazy(() => import("./Home"));


const App = () => {
  const dispatch = useDispatch();

 

  useEffect(() => {
    const cheackAuthenticated = async () => {
       await isauthenticatedd();
    };

    cheackAuthenticated();
  }, [dispatch]);

  


  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginRegisterProtectedRoute>
                <Login />
              </LoginRegisterProtectedRoute>
            }
          ></Route>

          <Route
            path="/register"
            element={
              <LoginRegisterProtectedRoute>
                <Register />
              </LoginRegisterProtectedRoute>
            }
          ></Route>

          <Route
            path="/"
            element={
              <UserProtectedRoute>
                <Home />
              </UserProtectedRoute>
            }
          ></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;




