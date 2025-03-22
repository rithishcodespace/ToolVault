import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import { useRef } from "react";

let Editcard = () =>{
     
    const {table} = useParams();
    const {id} = useParams();
    const url = useRef();
    const name = useRef();
    const rate = useRef();
    const stock = useRef();
    const highlights = useRef();
    const description = useRef();
    const navigate = useNavigate();

    async function handleEdit()
    {
        if(url.current.value.trim()!="" && name.current.value.trim()!="" && rate.current.value.trim()!="" && highlights.current.value.trim()!="" && description.current.value.trim()!="")
        {
          const response = await axios.patch(`http://localhost:1234/editcard/${table}/${id}`,{
            url:url.current.value,
            name:name.current.value,
            rate:rate.current.value,
            stock:stock.current.value,
            highlights:highlights.current.value,
            description:description.current.value
          },{
            headers:{"Content-Type":"application/json"}
          })
          
          if(response.status == 200)
          {
            alert("card updated successfully!");
            navigate("/admin");
          }
          else
          {
            alert("card cannot be updated")
          }
        }
        else alert("Fill all the fields")
    }

    return(
        <div className="flex justify-center">
            <button className="absolute top-2.5 right-3.5 cursor-pointer bg-blue-950 text-white p-3 rounded-2xl font-mono" onClick={()=>navigate("/admin")}>Back</button>
            <div className="flex justify-center items-center flex-col rounded-2xl shadow-xl shadow-slate-400 pt-10 relative top-6.5 pb-12 w-[600px]">
            <p className="text-mono text-2xl relative bottom-3.5">Update Product Detail</p>
            <input type="text" ref={url} placeholder="Image url" className="rounded-md h-11 w-[500px] pl-2.5 border-[1px] border-blue-900 m-1"/>
            <input type="text" ref={name} placeholder="Product Name" className="rounded-md h-11 w-[500px] pl-2.5 border-[1px] border-blue-900 m-1"/>
            <input type="text" ref={rate} placeholder="Product Price" className="rounded-md h-11 w-[500px] pl-2.5 border-[1px] border-blue-900 m-1"/>
            <input type="text" ref={stock} placeholder="Available Stock" className="rounded-md h-11 w-[500px] pl-2.5 border-[1px] border-blue-900 m-1"/>
            <textarea ref={highlights} placeholder="Product Highlights" className="h-32 pt-2 pl-2 w-[500px] border-[1px] border-blue-900 m-1 rounded-lg  overflow-auto"></textarea>
            <textarea ref={description} placeholder="Product Description" className="h-52 pt-2 pl-2 w-[500px] border-[1px] m-1 border-blue-900 rounded-lg overflow-auto"></textarea>
            <button className="h-12 w-[500px] cursor-pointer rounded-lg bg-blue-950 relative top-3 text-white hover:bg-blue-900" onClick={handleEdit}>Update Product</button>
            </div>
        </div>
            )
}
export default Editcard;