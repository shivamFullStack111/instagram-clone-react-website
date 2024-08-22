

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Spinner from "../../Spinner";

const LoginRegisterProtectedRoute = ({children}) => {
  const { isauthenticated,isloading } = useSelector((state) => state.user);

  if(isloading){
    return<Spinner/>
  }else{
    if(isauthenticated) return <Navigate to={'/'}/>
    return children
  }

   
};

export default LoginRegisterProtectedRoute;
