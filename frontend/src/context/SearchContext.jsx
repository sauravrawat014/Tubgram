import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";

export const SearchContext = createContext();

export const SearchProvider = ({children}) =>{
    const [articles, setArticles] = useState([]);
    const [topic, setTopic] = useState("");
    const [filter, setFilter] = useState("latest");
    const [showPopup, setShowpopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const backend_url =  import.meta.env.VITE_BACKEND_URL;
    const [homeExist, setHomeexist] = useState(true);
    const {token} = useContext(AuthContext);

      useEffect(() => {
        
    if (token) checkHistory();
  }, [token]);



    const checkHistory = async()=>{
        try{

            const res = await axios.get(backend_url + "/api/interaction/top", {headers: {Authorization: `Bearer ${token}`}});

            if(res.data.hasInteraction){
                fetchFeed(res.data.topic);
            } else{
                setShowpopup(true);
            }

        } catch(error){
            console.log(error);
        }
    }

    const fetchData = async()=>{

        if(!topic){
            return;
        }

        try{
        setLoading(true);
         const res = await axios.get(`${backend_url}/api/feed?topic=${topic}&filter=${filter}`);

        
        const data = res.data;
        setHomeexist(false);
        setArticles(data.articles);
        
        saveInteraction(topic, "search");
        } catch(error){
            console.log(error);
        } finally{
            setLoading(false);
        }
    }

    const fetchFeed = async(topic)=>{
        try{
            setLoading(true);
            const res = await axios.get(`${backend_url}/api/feed?topic=${topic}&filter=${filter}`);
            setArticles(res.data.articles);
            setTopic(topic);

        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const handlePopup = async(popupTopic)=>{
        try{
            setShowpopup(false);

            saveInteraction(popupTopic, "popup");
            fetchFeed(popupTopic);


        }catch(error){
            console.log(error);
        }
    }

    const saveInteraction = async(topic,action) =>{
        try{
            if(!token){
                return;
            }

            const res = await axios.post(backend_url + "/api/interaction/save", {topic,action}, {headers: {Authorization: `Bearer ${token}`}});

        }catch(error){
            console.log(error);
        }
    }

    return(
        <SearchContext.Provider value={{ articles, topic, setTopic, filter, setFilter, fetchData, showPopup, handlePopup, loading, homeExist}}>
            {children}
        </SearchContext.Provider>
    )
}
