import { useState } from "react";

const ALL_TOPICS = [
  "Tech", "Sports", "AI", "Gaming",
  "Politics", "Science", "Entertainment", "Business"
];
export default function InterestPopup({onComplete}){

    const [select, setSelect] = useState("");
    return(
        <div className="flex items-center justify-center fixed inset-0 bg-black/60">
            <div className="flex flex-col items-center bg-white rounded-2xl p-8 w-96">
                <h1 className="font-bold text-2xl text-center mb-2">Welcome!</h1>
                <p className="text-gray-600 text-center mb-6">What do you want to see today?</p>

                <div className="flex flex-wrap gap-4 justify-center mb-6">
                    {ALL_TOPICS.map((topic)=>(
                        <button onClick={()=>setSelect(topic)} className={`px-4 py-2 rounded-full font-medium cursor-pointer border-2 transition ${select == topic ? "bg-blue-200 text-blue-700 border-blue-400" : "bg-white text-gray-600 border-gray-300"}`}>
                            {topic}
                        </button>
                    ))}
                </div>

                <button onClick={()=>onComplete(select)} className={`px-12 py-2 border-2 rounded-full mt-5 cursor-pointer ${select ? "bg-blue-200 text-blue-700 border-blue-400" : "bg-gray-500 text-gray-500 text-white"} `}>Submit</button>
            </div>

        </div>
    )
}