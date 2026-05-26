import { useEffect, useState } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import axios from "axios";

import Sort from "../components/Sort";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import InterestPopup from "../components/InterestPopup";
import HeroSection from "../components/HeroSection";
import { AuthContext } from "../context/authContext";
import BluredCard from "../components/BluredCard";


export default function Home(){

    const {articles, topic, setTopic, filter, setFilter, fetchData, showPopup, handlePopup} = useContext(SearchContext);
    const [open,setOpen] = useState(false);
    const {token} = useContext(AuthContext);

      useEffect(()=>{
            
      if(topic) fetchData();
        },[filter]);

        if(!token){
            return(
                <div className="min-h-screen bg-[#f4f5f7]">
                     <Navbar setTopic={setTopic} onSearch={fetchData}/>
                    <HeroSection/>
                    <BluredCard/>
                </div>
            )
        } else{
             return(

        <div className="flex">

             {showPopup && (<InterestPopup onComplete={handlePopup}/>)}
              <Sidebar open={open} setOpen={setOpen}/>

            <div className={`flex-1 transition-all duration-300 ${open ? "ml-52" : "ml-16"}`}>
              
            <Navbar setTopic={setTopic} onSearch={fetchData}/>
            
            {
            topic ?<Sort setFilter={setFilter} onSearch={fetchData}/> : ''
            }
            <Card posts={articles}/>

            </div>
        </div>
    )
}

        }
   
   