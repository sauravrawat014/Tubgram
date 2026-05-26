import { useContext } from "react";
import SearchBar from "./SearchBar";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import tubegram_logo_ from '../assets/tubegram_logo_.svg';
import {LogIn, LogOut} from 'lucide-react';

export default function Navbar({ setTopic, onSearch }) {

    const { token,setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async()=>{
        try{
            if(token){
                setToken(null);
                navigate('/');

            } else{
                navigate('/login');
            }

        }catch(error){
            console.log(error);

        }
    }

    return (
        <div className="sticky top-0 z-100 flex flex-col sm:flex-row items-center justify-between  py-3 px-6 bg-[#1E293B]">

            <div className="flex justify-between items-center w-full sm:w-auto">
                 <img src={tubegram_logo_} className="w-40 sm:w-70"/>
                 <button onClick={handleLogout} className="sm:hidden shrink-0 cursor-pointer bg-white border rounded-lg p-2 hover:bg-gray-600 hover:text-white">
                    {token?<LogOut size={17}/>:<LogIn size={17}/>}
                 </button>
            </div>
            
            
           

            <SearchBar setTopic={setTopic} onSearch={onSearch} />

            <button onClick={handleLogout} className="hidden sm:flex shrink-0 gap-2 items-center whitespace-nowrap border rounded-lg bg-white py-2 px-4 font-bold cursor-pointer hover:bg-gray-600 hover:text-white">
                {token?<LogOut size={17}/>:<LogIn size={17}/>}
                {token ? "Log Out" : "Login"}
            </button>

        </div>
    )
}