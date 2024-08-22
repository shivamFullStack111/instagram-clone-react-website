import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Spinner from "../../Spinner";

const UserProtectedRoute = ({children}) => {
  const { isauthenticated ,isloading} = useSelector((state) => state.user);

  if(isloading){
    return <Spinner />
  }else{
    if(!isauthenticated) return <Navigate to={'/login'}/>
    return children
  }
};

export default UserProtectedRoute;
