import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";

let About = () =>{
    const {table,id} = useParams();
    const[data,setdata] = useState(null);

    async function addtocart()
    {
      let response = await axios.post("http://localhost:1234/addtocart",{
        id:data.id,
        img:data.img,
        name:data.name,
        details:data.details,
        tablename:table
      },
    {
        headers:{"Content-Type":"Application/json"}
    })
      if(response.status == 200)alert("Add to Cart!")
      else alert("couldn't add to cart")
    }

    useEffect(()=>{
      async function fetchdata()
      {
        const response = await axios.get(`http://localhost:1234/get/${table}/${id}`,{headers:{"Content-Type":"application/json"}})
        if(response.status == 200)setdata(response.data);
        else console.log(response)
      }
      fetchdata()
    },[])
    useEffect(()=>console.log(data),[data])
    return(
        <div>
            {data &&
                <div className="flex "> 
                    <div className="w-12/12"><img src={data.img} className="h-[650px] w-[650px]" /></div>
                    <div className="bg-slate-300 pt-7 w-screen flex justify-items-start pl-3.5 flex-col font-mono gap-3">
                    <img src="https://cdn-icons-png.flaticon.com/512/5952/5952750.png" 
                        alt="addtocart" 
                        className="h-8 cursor-pointer absolute top-24 right-[18px]" 
                        onClick={addtocart}
                    />

                    <p className="text-3xl">{data.name}</p>

                    <div className="flex items-center gap-2">
                        <p className="text-red-500">-19%</p>
                        <p className="text-3xl font-semibold">₹100 <span className="text-sm font-serif">per day</span></p>
                    </div>

                    <ul className="list-disc pl-5">
                        {data.details.split(";").map((point, index) => (
                            <li key={index} className="text-gray-700">{point.trim()}</li>
                        ))}
                    </ul>


                    </div>
                </div>
            }
        </div>
    )
}

export default About;