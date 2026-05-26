// import {posts} from "../data/dummyData";
import { Bookmark } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { SearchContext } from "../context/SearchContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";



export default function Card({posts}){
    const {token} = useContext(AuthContext);
    const {saveInteraction} = useContext(SearchContext);
    const[bookmark, setBookmark] = useState([]);
     const backend_url =  import.meta.env.VITE_BACKEND_URL
     const {loading} = useContext(SearchContext);

    const fetchBookmarks = async()=>{

         if (!token) return;
        try{
            const res = await axios.get(backend_url + "/api/bookmark/get",{headers:{ Authorization: `Bearer ${token}`,}});
            const data = res.data.bookmarkPost ?.map((b)=>b.post) || [];
            setBookmark(data);

        }catch(error){
            console.log(error);

        }
    }

      useEffect(() => {
    fetchBookmarks();
  }, [token]);
    

    const handleBookmark = async(e,post)=>{

        e.preventDefault();
        e.stopPropagation();

        try{

            const isSaved = bookmark.some((b)=> b.url == post.url);

            if(isSaved){
                setBookmark((prev)=> prev.filter((b)=> b.url != post.url));

                const res = await axios.delete(backend_url + '/api/bookmark/delete', {headers:{Authorization: `Bearer ${token}`,},data: {url:post.url}});
            } else{
                setBookmark((prev)=> [...prev,post]);
            await axios.post(backend_url + '/api/bookmark/add',post,{headers:{ Authorization: `Bearer ${token}`,}});

            saveInteraction(post, "bookmark");
            }

        }catch(error){
            console.log(error);

        }

    }

     const isBookmarked = (post)=>{
            return bookmark.some((b)=> b.url == post.url);
        }

        if(loading){
            return(
                <div className="flex justify-center items-center mt-20">
                    <div className="rounded-full border-blue-500 border-t-transparent animate-spin border-4 w-10 h-10"/>
                </div>
            )
        }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5 mt-5">
            {
                posts.map((post,index)=>(
                    <a className="h-full" key={index} href={post.url} target="_blank">
                    <div className="border rounded-lg flex flex-col h-full">
                      <div>
                       {post.image && (
                             <img
                             className="w-full h-44 object-cover rounded-t-lg"
                             src={post.image}
                             alt="news"
                             onError={(e) => {
                            e.target.style.display = "none";
                        }}
                    />
                  )}
                      
                        </div>

                        <div className="flex flex-col p-5 flex-grow">
                            <h2 className="font-bold text-sm text-gray-900 line-clamp-2 leading-snug mb-1">{post.title}</h2>
                            <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{post.description}</p>
    
                        </div>
                       

                        <div className="flex justify-between items-center px-3 pb-3 pt-1 border-t border-gray-300">
                                <span className="text-[11px] text-blue-500 font-medium">{post.source}</span>
                                <div className="flex gap-3 justify-center items-center">
                                <span className="text-[10px] text-gray-400">{new Date(post.publishedAt).toLocaleString()}</span>
                                <button onClick={(e)=> handleBookmark(e,post)}><Bookmark className={`cursor-pointer transition ${isBookmarked(post) ?"text-blue-500 fill-blue-500" : "text-gray-400" }`}/></button>
                                </div>
                        </div>

                    </div>
                    </a>
                ))
            }
        </div>
    )
}