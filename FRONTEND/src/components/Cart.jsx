import { useEffect,useState } from "react";
import axios  from "axios";

let Cart = () =>{

    const[cartdata,setcartdata] = useState([]);
    const[subtotal,setsubtotal] = useState(null);
 
    useEffect(()=>{
        async function fetchdata()
        {
          const response = await axios.get("http://localhost:1234/getcart",{headers:{"Content-Type":"application/json"}});
          if(response.status==200)setcartdata(response.data);
          else console.log("An error occured while fetching the cart data!");
        }
        fetchdata()
    },[])

    async function increaseNeededStock(id,table)
    {
      const response = await axios.patch(`http://localhost:1234/addCartItemsCount/${table}/${id}`,{
        headers:{"Content-Type":"application/json"}
      },)
      if(response.status === 200)
      {
        console.log("stock items count increased successfully!")
        setcartdata(prevCart =>
          prevCart.map(item =>
            item.id === id ? { ...item, stock: item.stock + 1 } : item
          )
        );
      }
      else console.log("can't increase")
    }

    async function decreaseNeededStock(id,table)
    {
      const response = await axios.patch(`http://localhost:1234/removeCartItemsCount/${table}/${id}`,{
        headers:{"Content-Type":"application/json"}
      },)
      if(response.status === 200)
      {
        console.log("stock items count decreased successfully!")
        setcartdata(prevCart =>
          prevCart.map(item =>
            item.id === id ? { ...item, stock: item.stock - 1 } : item
          )
        );
      }
      else console.log("can't decrease")
    }

    return(
        <div>
            <center className="text-4xl font-serif mt-23">My Cart</center>
          <div className=" inline-block ml-10">
            { cartdata &&
               cartdata.map((card, index) => (
                <div
                  key={index}
                  className="w-[1100px] p-4 bg-white border-b border-blue-950 flex flex-row items-center gap-10 shadow-md rounded-lg">

                  <div className="flex items-center gap-4">
                    <img src={card.img} className="h-52 w-auto rounded-lg" />
                    <p className="w-36 text-lg font-semibold text-gray-800">{card.name}</p>
                  </div>
              
                  <p className="w-60 text-sm text-gray-600">{card.details}</p>
              
                  <p className="text-xl font-bold text-blue-700">₹{card.rate}</p>

                  {/* Quantity */}
                  <div className="pt-2 pb-2 pl-5">
                    <button className="text-3xl cursor-pointer bg-blue-200 active:bg-blue-500 inline hover:bg-black hover:text-white w-12 h-12 rounded-xl" onClick={()=>increaseNeededStock(card.id,card.Tablename)}>+</button>
                      <p className="text-xl inline p-4">{card.stock}</p>
                    <button className="text-3xl inline bg-blue-200 active:bg-blue-500 cursor-pointer hover:bg-black hover:text-white w-12 h-12  rounded-xl" onClick={()=>decreaseNeededStock(card.id,card.Tablename)}>-</button>
                  </div><br />

                  <p className="text-xl font-bold text-blue-700">₹{card.rate * card.stock}</p>
                </div>
              ))   
            }
          </div>
          <div className="fixed top-36  right-16 w-[450px] bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Order Summary</h2>
            <hr className="my-4 border-gray-300" />

            <div className="flex justify-between text-gray-700 text-lg py-2">
                <p>Subtotal</p>
                <p className="font-semibold">$500</p>
            </div>

            <div className="flex justify-between text-gray-700 text-lg py-2">
                <p>Shipping Fee</p>
                <p className="font-semibold text-green-600">Free</p>
            </div>

            <div className="flex justify-between bg-blue-950 text-white text-lg font-semibold py-4 px-6 rounded-md mt-4">
                <p>Total</p>
                <p>$500</p>
            </div>

            <button className="w-full bg-blue-600 text-white font-semibold text-lg py-3 mt-6 rounded-lg hover:bg-blue-700 transition">
                CHECKOUT
            </button>
            </div>

        </div>
        )
}

export default Cart;