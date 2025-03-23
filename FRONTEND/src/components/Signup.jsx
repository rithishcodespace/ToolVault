import { useRef } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

let Signup = () =>{

    const username = useRef();
    const emailId = useRef();
    const password = useRef();
    const navigate = useNavigate();

    function handleSignup(e)
    {
       try{
         if(username.current.value!="" && emailId.current.value!="" && password.current.value!="")
         {
           axios.post("http://localhost:1234/signup",
            {
            username:username.current.value,
            emailId:emailId.current.value,
            password:password.current.value,
            role:"client"
           },
           {
            headers:{"Content-Type":"application/json"}
           })
           .then((response)=>{
            if(response.status == 200){
              alert("🧰 Welcome aboard, {username}! Your toolkit is ready to go! 🛠️");
              navigate("/");
            }
            else{
              alert("🚨 Oops! That email is already linked to a toolkit. Try another one! 👀");
            }
           })
         }
         else alert("Fill all the fields")
       }
       catch(error){
        console.log(error);
       }
    }

    return(
        <div className="flex justify-center items-center h-screen w-screen">
          <div className=" z-10 flex justify-evenly flex-col items-center h-[550px] w-[500px] rounded-lg absolute top-[130px] bg-slate-300">
            <p className="text-blue-950 text-3xl font-mono">Signup</p>
            <input ref={username} type="text" placeholder="   Username" className="rounded-md bg-white w-[450px] h-20 pl-2"/>
            <input ref={emailId} type="text" placeholder="   EmailId" className="rounded-md w-[450px] bg-white h-20 pl-2"/>
            <input ref={password} type="text" placeholder="   Password" className="rounded-md w-[450px] h-20 bg-white pl-2"/>
            <div>
              <input type="checkbox" className="inline relative top-0.5"/>&nbsp;<p className="inline">I agree to <span className="text-blue-700 underline">Terms and Conditions</span></p>
            </div>
            <button className="p-2 bg-blue-950 cursor-pointer rounded-md border w-[450px] h-20 text-xl font-mono text-white" onClick={handleSignup}>Signup</button>
          </div>
        </div>
    )
}
export default Signup;
 