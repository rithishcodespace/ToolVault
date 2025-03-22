import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {searchedCards} from "../utils/searchSlice"

let Home = () =>{

    const [campinggear,setcampinggear] = useState([]);
    const [winterwear,setwinterwear] = useState([]);
    const [cameras,setcameras] = useState([]);
    const [gamingconsole,setgamingconsole] = useState([]);
    const [creatorgear,setcreatorgear] = useState([]);
    const [trekkinggear,settrekkinggear] = useState([]);
    const [audio,setaudio] = useState([]);
    const [LIKETORENT,SETLIKETORENT] = useState([]);
    const [wholecards,setwholecards] = useState([]);
    const selector = useSelector((store)=>store.searchSlice);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        if (CampingRes.status === 200)
        {
          setcampinggear(CampingRes.data);
          setwholecards(prev => [...prev, ...CampingRes.data]);
        }
        if (WinterRes.status === 200) 
        {
          setwinterwear(WinterRes.data);
          setwholecards(prev => [...prev, ...WinterRes.data]);
        }
        if (CamerasRes.status === 200)
        {
          setcameras(CamerasRes.data);
          setwholecards(prev => [...prev, ...CamerasRes.data]);
        } 
        if (GamingRes.status === 200)
        {
          setgamingconsole(GamingRes.data); 
          setwholecards(prev => [...prev, ...GamingRes.data]);
        }  
        if (CreatorRes.status === 200) 
        {
          setcreatorgear(CreatorRes.data);
          setwholecards(prev => [...prev, ...CreatorRes.data]);
        }
        if (TrekkingRes.status === 200)
        {
          settrekkinggear(TrekkingRes.data);
          setwholecards(prev => [...prev, ...TrekkingRes.data]);
        } 
        if (AudioRes.status === 200)
        {
          setaudio(AudioRes.data);
          setwholecards(prev => [...prev, ...AudioRes.data]);
        } 

      }
      fetchdata()
            
    }
    ,[])

    useEffect(()=>{
      if(wholecards.length!=0)
      {
        const searchedcards = wholecards.filter((card)=>card.name.toLowerCase().includes(selector.searchItem.toLowerCase()));
        dispatch(searchedCards(searchedcards))
        
        navigate("/client/filteredcard");      
      }
    },[selector.searchItem])

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
          <div className="overflow-x-auto w-full">
          <div className="flex gap-6 p-4 w-max mt-4">
            {campinggear?.map((card, index) => (
              <div
                key={index}
                className="h-96 cursor-pointer w-78 bg-white border-[0.5px] border-gray-600 rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
              >
                <img src={card.img} alt={card.name} className="h-52 w-52 object-cover rounded-md" />
                <p className="text-gray-800 font-semibold text-center  mt-2 mb-2 line-clamp-2">{card.name}</p>
                <div className="h-20"><p className="font-mono text-sm">{card.details}</p></div>
                <button className="bg-yellow-200 cursor-pointer w-24 rounded-lg h-10 mt-2" onClick={()=>handleCampingGearAbout(card.id)}>View Rent</button>
              </div>
            ))}
          </div>
        </div>
         {/*Winter Wear*/}
         <center className="text-mono text-5xl font-bold">Winter Wear</center>
          <div className="overflow-x-auto w-full">
          <div className="flex gap-6 p-4 w-max mt-4">
            {winterwear?.map((card, index) => (
              <div
                key={index}
                className="h-96 cursor-pointer w-78 bg-white border-[0.5px] border-gray-700 rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
              >
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
          <div className="overflow-x-auto w-full">
          <div className="flex gap-6 p-4 w-max mt-4">
            {cameras?.map((card, index) => (
              <div
                key={index}
                className="h-96 cursor-pointer w-78 bg-white border-[0.5px] border-gray-700 rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
              >
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
          <div className="overflow-x-auto w-full">
            <div className="flex gap-6 p-4 w-max mt-4">
              {gamingconsole?.map((card, index) => (
                <div
                  key={index}
                  className="h-96 cursor-pointer w-78 bg-white border-[0.5px] border-gray-700 rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
                >
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
          <div className="overflow-x-auto w-full">
            <div className="flex gap-6 p-4 w-max mt-4">
              {creatorgear?.map((card, index) => (
                <div
                  key={index}
                  className="h-96 cursor-pointer w-78 bg-white border-[0.5px] border-gray-700 rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
                >
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
          <div className="overflow-x-auto w-full">
            <div className="flex gap-6 p-4 w-max mt-4">
              {trekkinggear?.map((card, index) => (
                <div
                  key={index}
                  className="h-96 cursor-pointer w-78 bg-white border-[0.5px] border-gray-700 rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
                >
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
          <div className="overflow-x-auto w-full">
            <div className="flex gap-6 p-4 w-max mt-4">
              {audio?.map((card, index) => (
                <div
                  key={index}
                  className="h-96 cursor-pointer w-78 bg-white border-[0.5px] border-gray-700 rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
                >
                  <img src={card.img} alt={card.name} className="h-52 w-52 object-cover rounded-md" />
                  <p className="text-gray-800 mb-2 font-semibold line-clamp-2 text-center mt-2">{card.name}</p>
                  <div className="h-20"><p className="font-mono text-sm line-clamp-2">{card.details}</p></div>
                  <button className="bg-yellow-200 cursor-pointer w-24 rounded-lg h-10 mt-2" onClick={()=>handleVisualEquipmentsAbout(card.id)}>View Rent</button>
                </div>
              ))}
            </div>
          </div>

          <div className="text-gray-700 bg-slate-200 h-[350px] w-screen pl-12 pt-10">
            <p className="font-semibold text-2xl text-black">Welcome to Sharepal </p><br />
             <p className="font-serif text-sm">
             India, one of the best countries to live in the world. It’s a country which is well known for its culture and cuisine. SharePal is a rental startup for all your lifestyle needs. Be it travel, photography, entertainment or fitness, you can rent all the latest products.
             </p>
             <br />
             <p className="font-serif text-sm">
             SharePal is a leading rental platform with a pan-India presence. We offer Trekking Gear, Riding Gear, DSLR Camera, GoPro Camera, PS4 Console, Xbox Console, PS4 Games on rent in Chennai.
             </p><br />
             <p className="font-serif text-sm">
             SharePal makes it easier for you to rent from us. All you need to do is choose the product whatever you need, add them to your cart, and check out. Rental products will be delivered to your home with full safety measures.
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
export default Home;