import Header from "./components/Header";
import { Outlet } from "react-router-dom";

let Layout = () =>{
    return(
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}

export default Layout;