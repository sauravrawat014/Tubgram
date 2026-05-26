import {Menu, Bookmark} from 'lucide-react';
import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect } from "react";

export default function Sidebar({open, setOpen}){

    const [user, setUser] = useState(null);
      const backend_url = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem("token");

    useEffect(()=>{
    if(token) fetchUser();
}, [token]);


    const fetchUser = async(req,res)=>{
        try{
            const res = await axios.get(backend_url + '/api/user/me', {headers: {Authorization: `Bearer ${token}` }});

            if(res.data.success){
                setUser(res.data.user);
            }

        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className={`fixed top-0 left-0 bg-gray-900 h-screen text-white transition-all duration-300 ${open ? "w-52" : "w-12"}`}
        >

            <div className='p-4 cursor-pointer flex gap-10' onClick={()=>setOpen(!open)}>
                <Menu size={28}/>
                 {open && <h2 className='font-bold text-xl'>{user?.name?.[0].toUpperCase() + user?.name.slice(1)}</h2>}
            </div>

           

            
            <Link to="/bookmark">
            <div className='p-4 cursor-pointer flex items-center gap-4'>
                <Bookmark/>
                {open && <span className='transition-all duration-300'>Bookmark</span>}
            </div>
            </Link>

            

        </div>
    )
}
