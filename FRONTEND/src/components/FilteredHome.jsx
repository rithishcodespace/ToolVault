import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

let FilteredHome = () =>{
    const selector = useSelector((store)=>store.searchSlice.searchedCards);
    const navigate = useNavigate();
    return(
        <div className="flex justify-center flex-wrap flex-col">
            <center>
               <img src=" https://cdn-icons-png.flaticon.com/512/2961/2961937.png " className="absolute h-8 top-26 right-8 cursor-pointer" onClick={()=>navigate("/client")}/>
               {
                (selector.length!=0) ? selector.map((card,index)=>(
                    <div
                    key={index}
                    className="w-[1300px] p-5 bg-white border-b border-blue-950 flex flex-row items-center gap-60 shadow-md rounded-lg m-2"
                  >
  
                    <div className="flex items-center gap-4">
                      <img src={card.img} className="h-52 w-auto rounded-lg" />
                      <p className="w-45 text-lg font-semibold text-gray-800 ">{card.name}</p>
                    </div>
                
                    <p className="w-60 text-sm text-gray-600">{card.details}</p>
                
                    <p className="text-xl font-bold text-blue-700">$123</p>
                  </div> 
                )) :
                <center><p className="text-5xl font-bold absolute top-72 left-[670px]">No Data Found</p></center>
               }
            </center>
        </div>
    )
}

export default FilteredHome;