import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";


export default function Login(){

    const [currState, setCurrState] = useState('Login');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const backend_url =  import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();
    const {setToken} = useContext(AuthContext);

    const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            setError('');

            if(currState == 'Login'){
            const res = await axios.post(backend_url + "/api/login", {email,password});

            if(res.data.success){
                setToken(res.data.token);
                navigate('/');
            } else{
                setError(res.data.message);
            }
            }
            else{
                const res = await axios.post(backend_url + "/api/signup", {name,email,password});
                if(res.data.success){
                     setToken(res.data.token);
                navigate('/');
                } else{
                    setError(res.data.message);
                }
            }

        }
        catch(error){
            console.log(error);
            setError("Something went wrong. Please try again.");

        }
    }
     useEffect(()=>{

            const token = localStorage.getItem("token")

            if(token){
                navigate("/");
            }

        },[]);

    return(

        <div className="flex justify-center bg-gray-100 min-h-screen w-full items-center">
         
       <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center text-center mt-8 p-6 gap-4 bg-white rounded-lg w-[80%] max-w-md shadow-md">
        <h1 className="font-bold text-2xl">{currState}</h1>
       
            {currState == 'SignUp' ? <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Enter Your Name" className="border px-3 py-2 w-full" required/> : ''}
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter Your Email" className="w-full px-3 py-2 border" required/>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Enter Your Password" className="w-full px-3 py-2 border" required/>

            {error && (
                <div className="bg-red-100 text-red-600 border border-red-400 px-4 py-2 rounded w-full text-sm">{error}</div>
            )}

        <button className="bg-black text-white px-8 py-2 cursor-pointer hover:bg-gray-600">{currState == 'SignUp'? <p>SignUp</p>: <p>Login</p>}</button>

        <p className="text-center text-sm">
            {currState == 'Login' ?<span className="text-blue-500 cursor-pointer" onClick={()=>setCurrState('SignUp')}>Create An Account</span> : <span className="cursor-pointer text-blue-500" onClick={()=>setCurrState('Login')}>Login Here</span>}
        </p>
       </form>
       </div>
       
    )
}