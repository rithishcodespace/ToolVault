import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
    const { table, id } = useParams();
    const [data, setData] = useState(null);

    async function addToCart() {
        if (!data) {
            alert("Data is not loaded yet!");
            return;
        }

        let response = await axios.post(
            "http://localhost:1234/addtocart",
            {
                id: data.id,
                img: data.img,
                name: data.name,
                details: data.details,
                tablename: table,
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        if (response.status === 200) alert("Added to Cart!");
        else alert("Couldn't add to cart");
    }

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `http://localhost:1234/get/${table}/${id}`,
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status === 200) setData(response.data);
            else console.log(response);
        }
        fetchData();
    }, []);

    useEffect(() => console.log(data), [data]);

    return (
        <div className="h-screen flex justify-center overflow-hidden items-center">
            { data && data.stock>0 && (
                <div className="flex w-full h-full">
                    {/* Product Image Section */}
                    <div className="w-[50%] fixed top-22 flex items-center justify-center">
                        <img src={data.img} className="h-[680px] w-[700px] object-contain" />
                    </div>

                    {/* Scrollable Details Section */}
                    <div className="bg-slate-300 absolute top-20 right-0.5 w-[50%] h-full overflow-y-scroll flex flex-col p-8 font-mono gap-3">
                        <p className="text-3xl font-semibold mt-1">{data.name}</p>
                        <p className="absolute top-8.5 p-2 right-5">Hurry up <span className="text-red-600 font-semibold">{data.stock}</span> pieces left!</p>

                        <div className="flex items-center gap-2">
                            <p className="text-3xl font-semibold">
                                Rent at <span className="text-red-600">₹{data.rate}</span> per day
                            </p>
                            <p className="text-red-500">-19%</p>
                        </div>

                        <p className="font-semibold text-2xl underline">Highlights</p>
                        <ul className="list-disc pl-5">
                            {data.details.split(";").map((point, index) => (
                                <li key={index} className="text-gray-700">{point.trim()}</li>
                            ))}
                        </ul>

                        <hr />

                        <div>
                            <p className="text-green-700 text-2xl">In Stock</p>
                            <p className="inline text-sm">Payment</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <p className="inline text-sm">Secure Transactions</p> <br />
                            <p className="inline text-sm">Ships from</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <p className="inline text-sm">&nbsp;ToolVault</p> <br />
                            <p className="inline text-sm">Sold by</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <p className="inline text-sm">Cocoblu Retail</p> <br /><br />

                            {/* Quantity Buttons */}
                            <div className="pt-2 pb-2">
                                <button className="text-2xl cursor-pointer active:bg-slate-500 bg-white inline hover:bg-black hover:text-white w-8 h-8 rounded-full">+</button>
                                <p className="text-xl inline p-4">Quantity</p>
                                <button className="text-2xl inline bg-white active:bg-slate-500 cursor-pointer hover:bg-black hover:text-white w-8 h-8 rounded-full">-</button>
                            </div><br />

                            {/* Buttons */}
                            <button className="p-2 rounded-xl pl-2 pr-2 active:bg-yellow-600 cursor-pointer bg-orange-300" onClick={addToCart}>Add to Cart</button>&nbsp;&nbsp;
                            <button className="p-2 rounded-xl pl-2 pr-2 bg-orange-500 cursor-pointer active:bg-orange-700">Rent Now</button><br /><br />

                            <hr /><br />

                            <p className="text-2xl font-semibold">About This Item</p><br />
                            <ul className="list-disc pl-5">
                                {data.extradetails.split("✔").map((point, index) => (
                                    <li key={index} className="text-xl font-sans">{point.trim()}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {
              data && data.stock<=0 && (
                <center>
                  <p className="absolute top-42 font-bold text-4xl">Stock Currently Unavailable</p>
                </center>
              )
            }
        </div>
    );
};

export default About;
