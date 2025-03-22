import { useRef,useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom";
import {login} from "../utils/AuthSlice"
import { useDispatch } from "react-redux";

let Login = () =>{

    const username = useRef();
    const emailId = useRef();
    const password = useRef();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    async function handleLogin()
    {
       try{
         if(username.current.value!="" && emailId.current.value!="" && password.current.value!="")
         {
           const response = await axios.post("http://localhost:1234/signin",
            {
            username:username.current.value,
            emailId:emailId.current.value,
            password:password.current.value
           },
           {
            headers:{"Content-Type":"application/json"}
           })
            if(response.status == 200){
              console.log(response.data.role)
              if(response.data.role=="client" || response.data.role=="admin") alert("user loggedIn successfully");
              else return alert("invalid credentials!");
              dispatch(login(response.data.role))
              if(response.data.role == "admin")navigate("/admin");
              else if(response.data.role=="client")navigate("client")
            }
            else if(response.status!==200){
              alert("Invalid credentials");
            }
           }
         
         else alert("Fill all the fields")
       }
       catch(error){
        console.log(error);
       }
    }

    return(
        <div className="flex justify-center items-center h-screen w-screen">
          <div className=" z-10 flex justify-evenly flex-col items-center h-[450px] w-[430px] rounded-lg absolute top-[130px] shadow-2xl shadow-slate-400">
            <p className="text-blue-950 text-2xl">Login</p>
            <input ref={username} type="text" placeholder="   Username" className="rounded-md w-72 h-14 border-2 border-black-700 pl-2"/>
            <input ref={emailId} type="text" placeholder="   EmailId" className="rounded-md w-72 h-14 border-2 border-black-700 pl-2"/>
            <input ref={password} type="text" placeholder="   Password" className="rounded-md w-72 h-14 border-2 border-black-700 pl-2"/>
            <p>Are you new to ToolVault <span className="text-blue-700 cursor-pointer" onClick={()=>navigate("/signup")}>signup</span></p>
            <button className="p-2 bg-blue-950 cursor-pointer rounded-md border w-72 h-12 text-white" onClick={handleLogin}>Login</button>
          </div>
        </div>
    )
}
export default Login;
