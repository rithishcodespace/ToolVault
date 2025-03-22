import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let Admin = () =>{

    const [campinggear,setcampinggear] = useState([]);
    const [LIKETORENT,SETLIKETORENT] = useState([]);
    const [winterwear,setwinterwear] = useState([]);
    const [cameras,setcameras] = useState([]);
    const [gamingconsole,setgamingconsole] = useState([]);
    const [creatorgear,setcreatorgear] = useState([]);
    const [trekkinggear,settrekkinggear] = useState([]);
    const [audio,setaudio] = useState([]);
    const navigate = useNavigate()

    function handleCampingGearAbout(id)
    {
      navigate(`/client/about/campinggear/${id}`)
    }
    function handleWinterWearAbout(id)
    {
      navigate(`/client/about/winterwear/${id}`)
    }
    function handleCamerasAbout(id)
    {
      navigate(`/client/about/cameras/${id}`)
    }
    function handleGamingConsoleAbout(id)
    {
      navigate(`/client/about/gamingconsole/${id}`)
    }
    function handleCreatorGearAbout(id)
    {
      navigate(`/client/about/creatorgear/${id}`)
    }
    function handleTrekkingGearAbout(id)
    {
      navigate(`/client/about/treckinggear/${id}`)
    }
    function handleVisualEquipmentsAbout(id)
    {
      navigate(`/client/about/audiovisualequipment/${id}`)
    }
    async function handleEdit(table,id)
    {
      navigate(`/editcard/${table}/${id}`);
    }
    // async function handleDelete(table,id)
    // {
    //   const response = await axios.delete(`http://localhost:1234/removecard/${table}/${id}`,{
    //     headers:{"Content-Type":"application/json"}
    //   })
    //   if (response.status === 200) {
    //     alert("Card deleted successfully");
    //     switch (table) {
    //         case "campinggear":
    //             setcampinggear(campinggear => campinggear.filter(card => card.id !== id));
    //             break;
    //         case "winterwear":
    //             setwinterwear(winterwear => winterwear.filter(card => card.id !== id));
    //             break;
    //         case "cameras":
    //             setcameras(cameras => cameras.filter(card => card.id !== id));
    //             break;
    //         case "gamingconsole":
    //             setgamingconsole(gamingconsole => gamingconsole.filter(card => card.id !== id));
    //             break;
    //         case "creatorgear":
    //             setcreatorgear(creatorgear => creatorgear.filter(card => card.id !== id));
    //             break;
    //         case "treckinggear":
    //             settrekkinggear(trekkinggear => trekkinggear.filter(card => card.id !== id));
    //             break;
    //         case "audiovisualequipment":
    //             setaudio(audio => audio.filter(card => card.id !== id));
    //             break;
    //         default:
    //             alert("Invalid table name!");
    //     }
    //     } else {
    //         alert("An error occurred while deleting the card!");
    //     }
    //   }   
    useEffect(()=>{
      async function fetchdata()
      {
        const[MiniRes,CampingRes,WinterRes,CamerasRes,GamingRes,CreatorRes,TrekkingRes,AudioRes] = await Promise.all([
          axios.get("http://localhost:1234/getminicards",{headers:{"Content-Type":"application/json"}}),
          axios.get("http://localhost:1234/get/campinggear", { headers: { "Content-type": "application/json" } }),
          axios.get("http://localhost:1234/get/winterwear", { headers: { "Content-type": "application/json" } }),
          axios.get("http://localhost:1234/get/cameras", { headers: { "Content-type": "application/json" } }),
          axios.get("http://localhost:1234/get/gamingconsole", { headers: { "Content-type": "application/json" } }),
          axios.get("http://localhost:1234/get/creatorgear", { headers: { "Content-type": "application/json" } }),
          axios.get("http://localhost:1234/get/treckinggear", { headers: { "Content-type": "application/json" } }),
          axios.get("http://localhost:1234/get/audiovisualequipment", { headers: { "Content-type": "application/json" } }),
        ])

        if(MiniRes.status == 200) SETLIKETORENT(MiniRes.data);
        if (CampingRes.status === 200) setcampinggear(CampingRes.data);
        if (WinterRes.status === 200) setwinterwear(WinterRes.data);
        if (CamerasRes.status === 200) setcameras(CamerasRes.data);
        if (GamingRes.status === 200) setgamingconsole(GamingRes.data);
        if (CreatorRes.status === 200) setcreatorgear(CreatorRes.data);
        if (TrekkingRes.status === 200) settrekkinggear(TrekkingRes.data);
        if (AudioRes.status === 200) setaudio(AudioRes.data);

      }
      fetchdata()
            
    }
    ,[])

    return(
        <div>
          <center className="relative top-4.5">
            <span className="text-blue-700 text-5xl font-bold">EXPERIENCE</span>&nbsp;
            <span className="inline text-5xl font-bold">MORE,</span>&nbsp;
            <span className="text-yellow-500 inline text-5xl font-bold">SPEND</span>&nbsp;
            <span  className="inline text-5xl font-bold">LESS</span>&nbsp;
          </center>
          {/*Like to Rent*/}
          {LIKETORENT && <div className="overflow-x-auto w-full mt-10 ">
            <div className="flex gap-6 p-4 w-max">
              {LIKETORENT.map((card, index) => (
                <div 
                  key={index} 
                  className="h-64 cursor-pointer w-48 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform hover:scale-105"
                >
                  <img src={card.img} className="h-36 w-36 object-cover rounded-md" alt={card.title} />
                  <p className="text-gray-800 font-semibold text-center mt-2">{card.title}</p>
                </div>
              ))}
            </div>
          </div>}
          {/*Camping Gear*/}
          <center className="text-mono text-5xl font-bold">Camping Gear</center>
          <img src="https://cdn-icons-png.flaticon.com/512/10307/10307926.png" alt="addcardimage" className="h-8 absolute top-[405px] right-7"/>
          <div className="overflow-x-auto w-full">
          <div className="flex gap-6 p-4 w-max mt-4">
            {campinggear?.map((card, index) => (
              <div
                key={index}
                className="h-[420px] cursor-pointer w-68 bg-white border-[0.5px] border-gray-700 rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
              >
                {/* crud */}
                <div className="flex justify-end w-full absoute top-2 space-x-1 right-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/6460/6460112.png" alt="delete" className="h-8 cursor-pointer" onClick={()=>handleDelete("campinggear",card.id)}/>
                    <img src="   https://cdn-icons-png.flaticon.com/512/3597/3597075.png " alt="edit" className="h-8 inline cursor-pointer" onClick={()=>handleEdit("campinggear",card.id)}/>
                </div>
                <img src={card.img} alt={card.name} className="h-52 w-52 object-cover rounded-md" />
                <p className="text-gray-800 font-semibold text-center  mt-2 mb-2 line-clamp-2">{card.name}</p>
                <div className="h-20"><p className="font-mono text-sm ">{card.details}</p></div>
                <button className="bg-yellow-200 cursor-pointer w-24 rounded-lg h-10 mt-2" onClick={()=>handleCampingGearAbout(card.id)}>View Rent</button>
              </div>
            ))}
          </div>
        </div>
         {/*Winter Wear*/}
         <center className="text-mono text-5xl font-bold">Winter Wear</center>
         <img src="https://cdn-icons-png.flaticon.com/512/10307/10307926.png" alt="addcardimage" className="h-8 absolute top-[945px] right-7"/>
          <div className="overflow-x-auto w-full">
          <div className="flex gap-6 p-4 w-max mt-4">
            {winterwear?.map((card, index) => (
              <div
                key={index}
                className="h-[420px] cursor-pointer w-68 bg-white border-[0.5px] border-gray-700 rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
              >
                <div className="flex justify-end w-full absoute top-2 space-x-1 right-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/6460/6460112.png" alt="delete" className="h-8 cursor-pointer"/>
                    <img src="   https://cdn-icons-png.flaticon.com/512/3597/3597075.png " alt="edit" className="h-8 inline cursor-pointer" onClick={()=>handleEdit("winterwear",card.id)}/>
                </div>
                <img src={card.img} alt={card.name} className="h-52 w-52 object-cover rounded-md" />
                <p className="text-gray-800 font-semibold mb-2 text-center mt-2">{card.name}</p>
                <div className="h-20"><p className="font-mono text-sm line-clamp-2">{card.details}</p></div>
                <button className="bg-yellow-200 cursor-pointer w-24 rounded-lg h-10 mt-2" onClick={()=>handleWinterWearAbout(card.id)}>View Rent</button>
              </div>
            ))}
          </div>
        </div>
         
        {/* Cameras */}
        <center className="text-mono text-5xl font-bold">Cameras</center>
        <img src="https://cdn-icons-png.flaticon.com/512/10307/10307926.png" alt="addcardimage" className="h-8 absolute top-[1475px] right-7"/>
          <div className="overflow-x-auto w-full">
          <div className="flex gap-6 p-4 w-max mt-4">
            {cameras?.map((card, index) => (
              <div
                key={index}
                className="h-[420px] cursor-pointer w-68 bg-white border-[0.5px] border-gray-700 rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
              >
                <div className="flex justify-end w-full absoute top-2 space-x-1 right-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/6460/6460112.png" alt="delete" className="h-8 cursor-pointer"/>
                    <img src="   https://cdn-icons-png.flaticon.com/512/3597/3597075.png " alt="edit" className="h-8 inline cursor-pointer" onClick={()=>handleEdit("cameras",card.id)}/>
                </div>
                <img src={card.img} alt={card.name} className="h-52 w-52 object-cover rounded-md" />
                <p className="text-gray-800 mb-2 font-semibold text-center mt-2">{card.name}</p>
                <div className="h-20"><p className="font-mono text-sm line-clamp-2">{card.details}</p></div>
                <button className="bg-yellow-200 cursor-pointer w-24 rounded-lg h-10 mt-2" onClick={()=>handleCamerasAbout(card.id)}>View Rent</button>
              </div>
            ))}
          </div>
        </div>

        {/* Gaming Console */}
        <center className="text-mono text-5xl font-bold">Gaming Console</center>
        <img src="https://cdn-icons-png.flaticon.com/512/10307/10307926.png" alt="addcardimage" className="h-8 absolute top-[2005px] right-7"/>
          <div className="overflow-x-auto w-full">
            <div className="flex gap-6 p-4 w-max mt-4">
              {gamingconsole?.map((card, index) => (
                <div
                  key={index}
                  className="h-[420px] cursor-pointer w-68 bg-white border-[0.5px] border-gray-700 rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
                >
                  <div className="flex justify-end w-full absoute top-2 space-x-1 right-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/6460/6460112.png" alt="delete" className="h-8 cursor-pointer"/>
                    <img src="   https://cdn-icons-png.flaticon.com/512/3597/3597075.png " alt="edit" className="h-8 inline cursor-pointer" onClick={()=>handleEdit("gamingconsole",card.id)}/>
                  </div>
                  <img src={card.img} alt={card.name} className="h-52 w-52 object-cover rounded-md" />
                  <p className="text-gray-800 mb-2 font-semibold text-center mt-2">{card.name}</p>
                  <div className="h-20"><p className="font-mono text-sm line-clamp-2">{card.details}</p></div>
                  <button className="bg-yellow-200 cursor-pointer w-24 rounded-lg h-10 mt-2" onClick={()=>handleGamingConsoleAbout(card.id)}>View Rent</button>
                </div>
              ))}
            </div>
          </div>

          {/* Creator Gear */}
        <center className="text-mono text-5xl font-bold">Creator Gear</center>
        <img src="https://cdn-icons-png.flaticon.com/512/10307/10307926.png" alt="addcardimage" className="h-8 absolute top-[2535px] right-7"/>
          <div className="overflow-x-auto w-full">
            <div className="flex gap-6 p-4 w-max mt-4">
              {creatorgear?.map((card, index) => (
                <div
                  key={index}
                  className="h-[420px] cursor-pointer w-68 bg-white border-[0.5px] border-gray-700 rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
                >
                <div className="flex justify-end w-full absoute top-2 space-x-1 right-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/6460/6460112.png" alt="delete" className="h-8 cursor-pointer"/>
                    <img src="   https://cdn-icons-png.flaticon.com/512/3597/3597075.png " alt="edit" className="h-8 inline cursor-pointer" onClick={()=>handleEdit("creatorgear",card.id)}/>
                </div>
                  <img src={card.img} alt={card.name} className="h-52 w-52 object-cover rounded-md" />
                  <p className="text-gray-800 mb-2 font-semibold text-center mt-2">{card.name}</p>
                  <div className="h-20"><p className="font-mono text-sm line-clamp-2">{card.details}</p></div>
                  <button className="bg-yellow-200 cursor-pointer w-24 rounded-lg h-10 mt-2" onClick={()=>handleCreatorGearAbout(card.id)}>View Rent</button>
                </div>
              ))}
            </div>
          </div>

           {/* Trekking Gear */}
        <center className="text-mono text-5xl font-bold">Trekking Gear</center>
        <img src="https://cdn-icons-png.flaticon.com/512/10307/10307926.png" alt="addcardimage" className="h-8 absolute top-[3070px] right-7"/>
          <div className="overflow-x-auto w-full">
            <div className="flex gap-6 p-4 w-max mt-4">
              {trekkinggear?.map((card, index) => (
                <div
                  key={index}
                  className="h-[420px] cursor-pointer w-68 bg-white border-[0.5px] border-gray-700 rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
                >
                <div className="flex justify-end w-full absoute top-2 space-x-1 right-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/6460/6460112.png" alt="delete" className="h-8 cursor-pointer"/>
                    <img src="   https://cdn-icons-png.flaticon.com/512/3597/3597075.png " alt="edit" className="h-8 inline cursor-pointer" onClick={()=>handleEdit("treckinggear",card.id)}/>
                </div>
                  <img src={card.img} alt={card.name} className="h-52 w-52 object-cover rounded-md" />
                  <p className="text-gray-800 mb-2 font-semibold text-center mt-2">{card.name}</p>
                  <div className="h-20"><p className="font-mono text-sm line-clamp-2">{card.details}</p></div>
                  <button className="bg-yellow-200 cursor-pointer w-24 rounded-lg h-10 mt-2" onClick={()=>handleTrekkingGearAbout(card.id)}>View Rent</button>
                </div>
              ))}
            </div>
          </div>
          
           {/* Audio Visual Equipments */}
        <center className="text-mono text-5xl font-bold">Audio Visual Equipments</center>
        <img src="https://cdn-icons-png.flaticon.com/512/10307/10307926.png" alt="addcardimage" className="h-8 absolute top-[3610px] right-7"/>
          <div className="overflow-x-auto w-full">
            <div className="flex gap-6 p-4 w-max mt-4">
              {audio?.map((card, index) => (
                <div
                  key={index}
                  className="h-[420px] cursor-pointer w-68 bg-white border-[0.5px] border-gray-700 rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
                >
                <div className="flex justify-end w-full absoute top-2 space-x-1 right-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/6460/6460112.png" alt="delete" className="h-8 cursor-pointer"/>
                    <img src="   https://cdn-icons-png.flaticon.com/512/3597/3597075.png " alt="edit" className="h-8 inline cursor-pointer" onClick={()=>handleEdit("audiovisualequipments",card.id)}/>
                </div>
                  <img src={card.img} alt={card.name} className="h-52 w-52 object-cover rounded-md" />
                  <p className="text-gray-800 mb-2 font-semibold line-clamp-2 text-center mt-2">{card.name}</p>
                  <div className="h-20"><p className="font-mono text-sm line-clamp-2">{card.details}</p></div>
                  <button className="bg-yellow-200 cursor-pointer w-24 rounded-lg h-10 mt-2" onClick={()=>handleVisualEquipmentsAbout(card.id)}>View Rent</button>
                </div>
              ))}
            </div>
          </div>

          <div className="text-gray-700 bg-slate-200 h-[350px] w-screen pl-12 pt-10">
            <p className="font-semibold text-2xl text-black">Welcome to ToolVault </p><br />
             <p className="font-serif text-sm">
             India, one of the best countries to live in the world. It’s a country which is well known for its culture and cuisine. ToolVault is a rental startup for all your lifestyle needs. Be it travel, photography, entertainment or fitness, you can rent all the latest products.
             </p>
             <br />
             <p className="font-serif text-sm">
             ToolVault is a leading rental platform with a pan-India presence. We offer Trekking Gear, Riding Gear, DSLR Camera, GoPro Camera, PS4 Console, Xbox Console, PS4 Games on rent in Chennai.
             </p><br />
             <p className="font-serif text-sm">
             ToolVault makes it easier for you to rent from us. All you need to do is choose the product whatever you need, add them to your cart, and check out. Rental products will be delivered to your home with full safety measures.
             </p><br />
             <p className="font-serif text-sm">
             We offer rental services all over India like Chennai, Hyderabad, Bangalore, Mumbai, Delhi, Kolkata, Pune, Gandhinagar, Faridabad, Ahmedabad and many more places.
             </p>
          </div>

          <div className="h-[420px] w-screen bg-blue-950">

          </div>

        </div>
    )
}
export default Admin;