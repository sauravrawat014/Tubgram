import {Home} from 'lucide-react';
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';

export default function Sort({setFilter, onSearch}){
    const {homeExist} = useContext(SearchContext);
    return(
        <div className={`flex ${homeExist?'justify-between':'justify-end'} p-2 mt-2`}>

            {homeExist?
                <div className='flex gap-2 p-2 items-center'>
                <Home className=''/>
                <h2 className=' font-bold text-lg'>Home</h2>
            </div>
            : ""}

            <select defaultValue="" className="border border-gray-300 rounded-lg p-1 text-base font-bold" onChange={(e)=>{setFilter(e.target.value); onSearch();}}>
                <option disabled hidden>Sort</option>
                <option>latest</option>
                <option>oldest</option>
            </select>
        </div>
    )
}