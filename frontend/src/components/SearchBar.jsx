import { Search } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function SearchBar({ setTopic, onSearch }) {
    const { token } = useContext(AuthContext);

    const handleKeydown = (e) => {
        if (e.key === 'Enter') onSearch();
    };

    return (
        <div className="flex p-6 w-full sm:w-[80%]">
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Search News"
                    disabled={!token}
                    onKeyDown={handleKeydown}
                    onChange={(e) => setTopic(e.target.value)}
                    className="border rounded-lg p-2 pr-9 outline-none w-full bg-white"
                />
                <Search
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={onSearch}
                />
            </div>
        </div>
    );
}