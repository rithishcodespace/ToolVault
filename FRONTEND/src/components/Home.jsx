import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {searchedCards} from "../utils/searchSlice";
import RevealOnScroll from "./RevealOnScroll"

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
    async function handlelike(table,id)
    {
      const response = await axios.patch(`http://localhost:1234/like/dislike/${table}/${id}`,{
        headers:{"Content-Type":"application/json"}
      })
      if(response.status===200)
      {
        if(table==="campinggear")
        {
          setcampinggear((campinggear)=>(
            campinggear.map((card)=>(card.id==id) ? {...card,liked: card.liked==1 ? 0 : 1} : card)
          ))
        }
        else if(table==="winterwear")
        {
          setwinterwear((winterwear)=>(
            winterwear.map((card)=>(card.id==id) ? {...card,liked: card.liked==1 ? 0 : 1} : card)
          ))
        }
        else if(table==="cameras")
        {
          setcameras((cameras)=>(
            cameras.map((card)=>(card.id==id) ? {...card,liked: card.liked==1 ? 0 : 1} : card)
          ))
        }
        else if(table==="treckinggear")
        {
          settrekkinggear((trekkinggear)=>(
            trekkinggear.map((card)=>(card.id==id) ? {...card,liked: card.liked==1 ? 0 : 1} : card)
          ))
        }
        else if(table==="audiovisualequipment")
        {
          setaudio((audio)=>(
            audio.map((card)=>(card.id==id) ? {...card,liked: card.liked==1 ? 0 : 1} : card)
          ))
        }
        else if(table==="gamingconsole")
        {
          gamingconsole((gamingconsole)=>(
            setgamingconsole.map((card)=>(card.id==id) ? {...card,liked: card.liked==1 ? 0 : 1} : card)
          ))
        }
        else if(table==="creatorgear")
        {
          setcreatorgear((creatorgear)=>(
            creatorgear.map((card)=>(card.id==id) ? {...card,liked: card.liked==1 ? 0 : 1} : card)
          ))
        }
      }
    }
  
    useEffect(()=>{
      async function fetchdata()
      {
        const[MiniRes,CampingRes,WinterRes,CamerasRes,GamingRes,CreatorRes,TrekkingRes,AudioRes] = await Promise.all([
          axios.get("http://localhost:1234/getminicards",{headers:{"Content-Type":"application/json"},withCredentials: true}),
          axios.get("http://localhost:1234/get/campinggear", { headers: { "Content-type": "application/json" },withCredentials: true }),
          axios.get("http://localhost:1234/get/winterwear", { headers: { "Content-type": "application/json" },withCredentials: true }),
          axios.get("http://localhost:1234/get/cameras", { headers: { "Content-type": "application/json" },withCredentials: true }),
          axios.get("http://localhost:1234/get/gamingconsole", { headers: { "Content-type": "application/json" },withCredentials: true }),
          axios.get("http://localhost:1234/get/creatorgear", { headers: { "Content-type": "application/json" },withCredentials: true }),
          axios.get("http://localhost:1234/get/treckinggear", { headers: { "Content-type": "application/json" },withCredentials: true }),
          axios.get("http://localhost:1234/get/audiovisualequipment", { headers: { "Content-type": "application/json" },withCredentials: true }),
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
        <div className="relative top-24">
          <RevealOnScroll>
            <center className="relative top-4.5">
              <span className="text-blue-700 text-5xl font-bold">EXPERIENCE</span>&nbsp;
              <span className="inline text-5xl font-bold">MORE,</span>&nbsp;
              <span className="text-yellow-500 inline text-5xl font-bold">SPEND</span>&nbsp;
              <span  className="inline text-5xl font-bold">LESS</span>&nbsp;
            </center>
          </RevealOnScroll>
          {/*Like to Rent*/}
          {LIKETORENT && <div className="overflow-x-auto w-full mt-10 ">
            {/* <RevealOnScroll> */}
              <div className="flex gap-6 p-4 w-max overflow-y-hidden">
                {LIKETORENT.map((card, index) => (
                  <RevealOnScroll>
                <a href={`#${card.title.replace(/\s+/g, "-")}`}>
                    <div 
                      key={index} 
                      className="h-64 cursor-pointer w-48 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg p-3 flex flex-col items-center transition-transform hover:scale-105"
                    >
                      <img src={card.img} className="h-36 w-36 object-cover rounded-md" alt={card.title} />
                      <p className="text-gray-800 font-semibold text-center mt-2">{card.title}</p>
                    </div>
                </a>
                  </RevealOnScroll>
                ))}
              </div>
            {/* </RevealOnScroll> */}
          </div>}
          {/*Camping Gear*/}
          <RevealOnScroll>
            <center id="Camping-Gear" className="text-mono text-5xl font-bold scroll-mt-38">Camping Gear</center>
          </RevealOnScroll>
          <div className="overflow-x-auto w-full">
            <RevealOnScroll>
          <div className="flex gap-6 p-4 w-max mt-4 overflow-y-hidden">
            {campinggear?.map((card, index) => (
              <RevealOnScroll>
                <div
                  key={index}
                  className="h-[430px] cursor-pointer w-78 bg-white border-[0.5px] border-gray-600 rounded-2xl shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
                >
                  {card.liked === 1 && <img src="https://cdn-icons-png.flaticon.com/512/9484/9484251.png" alt="redheart" className="h-7 pl-62" onClick={()=>handlelike("campinggear",card.id)}/>}
                  {card.liked === 0 && <img src="https://cdn-icons-png.flaticon.com/512/1216/1216575.png" alt="redheart" className="h-7 pl-62" onClick={()=>handlelike("campinggear",card.id)}/>}
                  <img src={card.img} alt={card.name} className="h-52 w-52 object-cover rounded-md" />
                  <p className="text-gray-800 font-semibold text-center  mt-2 mb-2 line-clamp-2">{card.name}</p>
                  <div className="h-20"><p className="font-mono text-sm">{card.details}</p></div>
                  <button className="bg-yellow-200 cursor-pointer w-24 rounded-lg h-10 mt-2" onClick={()=>handleCampingGearAbout(card.id)}>View Rent</button>
                </div>
              </RevealOnScroll>
            ))}
          </div>
            </RevealOnScroll>
        </div>
         {/*Winter Wear*/}
         <RevealOnScroll>
           <center id="Winter-Wear" className="text-mono text-5xl font-bold scroll-mt-38">Winter Wear</center>
          </RevealOnScroll>
          <div className="overflow-x-auto w-full">
          <RevealOnScroll>
          <div className="flex gap-6 p-4 overflow-y-hidden w-max mt-4">
            {winterwear?.map((card, index) => (
              <RevealOnScroll>
                <div
                  key={index}
                  className="h-[430px] cursor-pointer w-78 bg-white border-[0.5px] border-gray-700 rounded-2xl shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
                >
                  {card.liked === 1 && <img src="https://cdn-icons-png.flaticon.com/512/9484/9484251.png" alt="redheart" className="h-7 pl-62" onClick={()=>handlelike("winterwear",card.id)}/>}
                  {card.liked === 0 && <img src="https://cdn-icons-png.flaticon.com/512/1216/1216575.png" alt="redheart" className="h-7 pl-62" onClick={()=>handlelike("winterwear",card.id)}/>}
                  <img src={card.img} alt={card.name} className="h-52 w-52 object-cover rounded-md" />
                  <p className="text-gray-800 font-semibold mb-2 text-center mt-2">{card.name}</p>
                  <div className="h-20"><p className="font-mono text-sm line-clamp-2">{card.details}</p></div>
                  <button className="bg-yellow-200 cursor-pointer w-24 rounded-lg h-10 mt-2" onClick={()=>handleWinterWearAbout(card.id)}>View Rent</button>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          </RevealOnScroll>
        </div>
         
        {/* Cameras */}
        <RevealOnScroll>
           <center id="Cameras" className="text-mono text-5xl font-bold scroll-mt-38">Cameras</center>
        </RevealOnScroll>
          <div className="overflow-x-auto w-full">
          <RevealOnScroll>
          <div className="flex overflow-y-hidden gap-6 p-4 w-max mt-4">
            {cameras?.map((card, index) => (
              <RevealOnScroll>
                <div
                  key={index}
                  className="h-[430px] cursor-pointer w-78 bg-white border-[0.5px] border-gray-700 rounded-2xl shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
                >
                  {card.liked === 1 && <img src="https://cdn-icons-png.flaticon.com/512/9484/9484251.png" alt="redheart" className="h-7 pl-62" onClick={()=>handlelike("cameras",card.id)}/>}
                  {card.liked === 0 && <img src="https://cdn-icons-png.flaticon.com/512/1216/1216575.png" alt="redheart" className="h-7 pl-62" onClick={()=>handlelike("cameras",card.id)}/>}
                  <img src={card.img} alt={card.name} className="h-52 w-52 object-cover rounded-md" />
                  <p className="text-gray-800 mb-2 font-semibold text-center mt-2">{card.name}</p>
                  <div className="h-20"><p className="font-mono text-sm line-clamp-2">{card.details}</p></div>
                  <button className="bg-yellow-200 cursor-pointer w-24 rounded-lg h-10 mt-2" onClick={()=>handleCamerasAbout(card.id)}>View Rent</button>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          </RevealOnScroll>
        </div>

        {/* Gaming Console */}
        <RevealOnScroll>
           <center id="Gaming-Console" className="text-mono text-5xl font-bold scroll-mt-38">Gaming Console</center>
        </RevealOnScroll>
          <div className="overflow-x-auto w-full">
          <RevealOnScroll>
            <div className="flex overflow-y-hidden gap-6 p-4 w-max mt-4">
              {gamingconsole?.map((card, index) => (
                <RevealOnScroll>
                  <div
                    key={index}
                    className="h-[430px] cursor-pointer w-78 bg-white border-[0.5px] border-gray-700 rounded-2xl shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
                  >
                    {card.liked === 1 && <img src="https://cdn-icons-png.flaticon.com/512/9484/9484251.png" alt="redheart" className="h-7 pl-62" onClick={()=>handlelike("gamingconsole",card.id)}/>}
                    {card.liked === 0 && <img src="https://cdn-icons-png.flaticon.com/512/1216/1216575.png" alt="redheart" className="h-7 pl-62" onClick={()=>handlelike("gamingconsole",card.id)}/>}
                    <img src={card.img} alt={card.name} className="h-52 w-52 object-cover rounded-md" />
                    <p className="text-gray-800 mb-2 font-semibold text-center mt-2">{card.name}</p>
                    <div className="h-20"><p className="font-mono text-sm line-clamp-2">{card.details}</p></div>
                    <button className="bg-yellow-200 cursor-pointer w-24 rounded-lg h-10 mt-2" onClick={()=>handleGamingConsoleAbout(card.id)}>View Rent</button>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </RevealOnScroll>
          </div>

          {/* Creator Gear */}
          <RevealOnScroll>
            <center id="Creator-Gear" className="text-mono text-5xl font-bold scroll-mt-38">Creator Gear</center>
          </RevealOnScroll>
          <div className="overflow-x-auto w-full">
          <RevealOnScroll>
            <div className="flex overflow-y-hidden gap-6 p-4 w-max mt-4">
              {creatorgear?.map((card, index) => (
                <RevealOnScroll>
                  <div
                    key={index}
                    className="h-[430px] cursor-pointer w-78 bg-white border-[0.5px] border-gray-700 rounded-2xl shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
                  >
                    {card.liked === 1 && <img src="https://cdn-icons-png.flaticon.com/512/9484/9484251.png" alt="redheart" className="h-7 pl-62" onClick={()=>handlelike("creatorgear",card.id)}/>}
                    {card.liked === 0 && <img src="https://cdn-icons-png.flaticon.com/512/1216/1216575.png" alt="redheart" className="h-7 pl-62" onClick={()=>handlelike("creatorgear",card.id)}/>}
                    <img src={card.img} alt={card.name} className="h-52 w-52 object-cover rounded-md" />
                    <p className="text-gray-800 mb-2 font-semibold text-center mt-2">{card.name}</p>
                    <div className="h-20"><p className="font-mono text-sm line-clamp-2">{card.details}</p></div>
                    <button className="bg-yellow-200 cursor-pointer w-24 rounded-lg h-10 mt-2" onClick={()=>handleCreatorGearAbout(card.id)}>View Rent</button>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </RevealOnScroll>
          </div>

           {/* Trecking Gear */}
           <RevealOnScroll>
              <center id="Trekking-Gear" className="text-mono text-5xl font-bold scroll-mt-38">Trekking Gear</center>
           </RevealOnScroll>
          <div className="overflow-x-auto w-full">
          <RevealOnScroll>
            <div className="flex overflow-y-hidden gap-6 p-4 w-max mt-4">
              {trekkinggear?.map((card, index) => (
                <RevealOnScroll>
                  <div
                    key={index}
                    className="h-[430px] cursor-pointer w-78 bg-white border-[0.5px] border-gray-700 rounded-2xl shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
                  >
                    {card.liked === 1 && <img src="https://cdn-icons-png.flaticon.com/512/9484/9484251.png" alt="redheart" className="h-7 pl-62" onClick={()=>handlelike("treckinggear",card.id)}/>}
                    {card.liked === 0 && <img src="https://cdn-icons-png.flaticon.com/512/1216/1216575.png" alt="redheart" className="h-7 pl-62" onClick={()=>handlelike("treckinggear",card.id)}/>}
                    <img src={card.img} alt={card.name} className="h-52 w-52 object-cover rounded-md" />
                    <p className="text-gray-800 mb-2 font-semibold text-center mt-2">{card.name}</p>
                    <div className="h-20"><p className="font-mono text-sm line-clamp-2">{card.details}</p></div>
                    <button className="bg-yellow-200 cursor-pointer w-24 rounded-lg h-10 mt-2" onClick={()=>handleTrekkingGearAbout(card.id)}>View Rent</button>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </RevealOnScroll>
          </div>
          
           {/* Audio Visual Equipments */}
           <RevealOnScroll>
             <center id="Audio-Visual-Equipment" className="text-mono text-5xl font-bold scroll-mt-38">Audio Visual Equipments</center>
           </RevealOnScroll>
          <div className="overflow-x-auto w-full">
          <RevealOnScroll>
            <div className="flex overflow-y-hidden gap-6 p-4 w-max mt-4">
              {audio?.map((card, index) => (
                <RevealOnScroll>
                  <div
                    key={index}
                    className="h-[430px]cursor-pointer w-78 bg-white border-[0.5px] border-gray-700 rounded-2xl shadow-lg p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105  "
                  >
                    {card.liked === 1 && <img src="https://cdn-icons-png.flaticon.com/512/9484/9484251.png" alt="redheart" className="h-7 pl-62" onClick={()=>handlelike("audiovisualequipment",card.id)}/>}
                    {card.liked === 0 && <img src="https://cdn-icons-png.flaticon.com/512/1216/1216575.png" alt="redheart" className="h-7 pl-62" onClick={()=>handlelike("audiovisualequipment",card.id)}/>}
                    <img src={card.img} alt={card.name} className="h-52 w-52 object-cover rounded-md" />
                    <p className="text-gray-800 mb-2 font-semibold line-clamp-2 text-center mt-2">{card.name}</p>
                    <div className="h-20"><p className="font-mono text-sm line-clamp-2">{card.details}</p></div>
                    <button className="bg-yellow-200 cursor-pointer w-24 rounded-lg h-10 mt-2" onClick={()=>handleVisualEquipmentsAbout(card.id)}>View Rent</button>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </RevealOnScroll>
          </div>
          <RevealOnScroll>
            <div className="text-gray-700 bg-slate-200 h-[350px]  w-screen pl-12 pt-10">
              <p className="font-semibold text-2xl text-black">Welcome to ToolVault </p><br />
              <p className="font-serif text-md">
              India, one of the best countries to live in the world. It’s a country which is well known for its culture and cuisine. SharePal is a rental startup for all your lifestyle needs. Be it travel, photography, entertainment or fitness, you can rent all the latest products.
              </p>
              <br />
              <p className="font-serif text-md">
              SharePal is a leading rental platform with a pan-India presence. We offer Trekking Gear, Riding Gear, DSLR Camera, GoPro Camera, PS4 Console, Xbox Console, PS4 Games on rent in Chennai.
              </p><br />
              <p className="font-serif text-md">
              SharePal makes it easier for you to rent from us. All you need to do is choose the product whatever you need, add them to your cart, and check out. Rental products will be delivered to your home with full safety measures.
              </p><br />
              <p className="font-serif text-md">
              We offer rental services all over India like Chennai, Hyderabad, Bangalore, Mumbai, Delhi, Kolkata, Pune, Gandhinagar, Faridabad, Ahmedabad and many more places.
              </p>
            </div>
          </RevealOnScroll>

          <div className="h-[420px] w-screen bg-blue-950 flex ">
            <div className="h-[250px] flex flex-col gap-8 absolute top-[4600px] left-36">
              <p className="text-3xl text-white font-mono underline underline-offset-12">ToolVault</p>
              <p className="text-white text-xl">About us</p>
              <p className="text-white text-xl">Why ToolVault</p>
              <p className="text-white text-xl">Careers</p>
              <p className="text-white text-xl">Sitemap</p>
            </div>
            <div className="h-[250px] flex flex-col gap-8 absolute top-[4600px] left-[500px]">
              <p className="text-3xl text-white font-mono underline underline-offset-12">Information</p>
              <p className="text-white text-xl">How it works</p>
              <p className="text-white text-xl">FAQs</p>
              <p className="text-white text-xl">Verification</p>
              <p className="text-white text-xl">Refund Process</p>
              <p className="text-white text-xl">Cancellation Policy</p>
            </div>
            <div className="h-[250px] flex flex-col gap-8 absolute top-[4600px] left-[900px]">
              <p className="text-3xl text-white font-mono underline underline-offset-12">Policies</p>
              <p className="text-white text-xl">Rental Terms & Conditions</p>
              <p className="text-white text-xl">Shipping Policy</p>
              <p className="text-white text-xl">Damage Policy</p>
              <p className="text-white text-xl">Terms of Use</p>
              <p className="text-white text-xl">Privacy Policy</p>
            </div>
            <div className="h-[250px] flex flex-col gap-8 absolute top-[4600px] left-[1250px]">
              <p className="text-3xl text-white font-mono underline underline-offset-12">Need Help?</p>
              <p className="text-white text-xl">Contact +91 9952252304</p>
              <p className="text-white text-xl">www.toolvault.com</p>
              <p className="text-white text-xl">3.971/1 2nd street, anna nagar, Chennai-06</p>
            </div>
          </div>

        </div>
    )
}
export default Home;