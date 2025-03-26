import { logout } from "../utils/AuthSlice";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updatesearchItem } from "../utils/searchSlice";

const Header = () => { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selector = useSelector((store)=>store.AuthSlice);
    const[searchItem,setsearchItem] = useState("");

    async function handleLogout() {
        dispatch(logout());
        // await axios.get("http://localhost:1234/logout");
        navigate("/");
    }

    function handleSearch()
    {
       if(searchItem.trim()!="")
       {
           dispatch(updatesearchItem(searchItem));
           setsearchItem("");
       }
       else alert("Invalid Search");
    }

    return (
        <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-md border-b border-blue-900 h-[85px] flex items-center justify-between px-5">
            {/* Logo & Name */}
            <div className="flex items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/780/780552.png" alt="logo" className="h-10" />
                <p className="text-2xl font-serif ml-2">ToolVault</p>
            </div>

            {/* Location Dropdown */}
            {(selector.role == "client") ? <select className="text-xl h-10 border rounded-md px-2">
                <option>Chennai</option>
                <option>Hyderabad</option>
                <option>Bangalore</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Kolkata</option>
                <option>Pune</option>
                <option>Gandhinagar</option>
                <option>Faridabad</option>
                <option>Ahmedabad</option>
            </select> : <p className="text-xl font-serif h-10 px-2 pt-1">Admin Dashboard</p>}

            {/* Search Bar */}
            <div className="relative w-[680px]">
                <input type="text" className="h-11 w-full border-2 border-blue-950 pl-2 rounded-md"  value={searchItem} onChange={(e)=>setsearchItem(e.target.value)} placeholder="Search for camera, shoes, backpack, ps4, xbox" />
                <img src="https://img.icons8.com/?size=60&id=W0xu6u7K9A0F&format=png" alt="search icon" className="h-7 absolute right-2 top-2 cursor-pointer" onClick={handleSearch}/>
            </div>

            {/* Cart Button */}
            {
                (selector.role == "admin") ? <button className="bg-blue-950 text-white cursor-pointer h-12 px-4 rounded-lg font-sans"> ➕ Add Section</button>
                : <button className="bg-blue-950 text-white cursor-pointer h-12 px-4 rounded-lg font-sans" onClick={()=>navigate("/cart")}> 🛒 My Cart</button>
            }

            {/* Logout Icon */}
            <img
                src="https://cdn-icons-png.flaticon.com/512/1286/1286853.png"
                className="h-8 cursor-pointer"
                alt="logout icon"
                onClick={handleLogout}
            />
        </div>
    );
};

export default Header;  
