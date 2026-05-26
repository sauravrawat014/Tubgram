import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/authContext"
import axios from "axios";
import { Trash2 } from "lucide-react";


export default function Bookmark(){

    const {token} = useContext(AuthContext);
    const [bookmark, setBookmark] = useState([]);
    const backend_url = import.meta.env.VITE_BACKEND_URL;

    const fetchBookmark = async()=>{
        try{

            const res = await axios.get(backend_url + '/api/bookmark/get', {headers: {Authorization: `Bearer ${token}`}});
            console.log("API RESPONSE:", res.data);
            const data = res.data.bookmarkPost?.map((b)=>b.post) || [];
            setBookmark(data);

        } catch(error){
            console.log(error);
        }
    }

    const deleteBookmark = async(e,post)=>{
        try{
            e.preventDefault();
            setBookmark((prev)=>prev.filter((b)=>b.url != post.url));

            await axios.delete(backend_url + "/api/bookmark/delete", {headers:{Authorization: `Bearer ${token}`}, data:{url:post.url}});

        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
  if (!token) return;

  fetchBookmark();
}, [token]);

    return(
        <div>
            <h1 className="text-2xl font-bold mt-5 flex justify-center text-center">Your Bookmark posts</h1>

            <div className="grid sm:grid-cols-3 gap-6 p-5 mt-5">
                {bookmark.length == 0 ? (
                    <p>No Bookmark Exist</p>
                ) : (
                    bookmark.map((post,index)=>(
                        <a key={index} href={post.url}>
                        <div className="border rounded-lg flex flex-col h-full">
                            <img className="w-full object-contain rounded-t-lg" src={post.image}/>

                            <div className="flex flex-col justify-center text-center p-5 flex-grow">
                                <h2 className="font-bold">{post.title}</h2>
                                <p className="text-sm mt-2">{post.description}</p>
                            </div>

                            <div className="flex justify-between text-sm text-gray-500 p-2">
                              <span>{post.source}</span>
                              <span>
                              {new Date(post.publishedAt).toLocaleString()}
                             </span>
                             <button onClick={(e)=>deleteBookmark(e,post)} className="cursor-pointer"><Trash2/></button>
                         </div>


                        </div>


                            </a>
                    ))
                )}
            </div>

        </div>
    )
}