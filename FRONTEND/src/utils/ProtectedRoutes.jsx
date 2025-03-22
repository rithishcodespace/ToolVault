import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


let ProtectedRoutes = ({children,allowedRoles}) =>{
   const selector = useSelector((store)=>store.AuthSlice);
   if(!selector.loggedIn)return <Navigate to="/"/>
   if(!allowedRoles.includes(selector.role))return <Navigate to="/unauthorized"/>
   return children;
}

export default ProtectedRoutes;