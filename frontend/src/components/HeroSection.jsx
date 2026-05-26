
const topics = [
    "Technology", "Finance", "Sports", "Science", "Gaming", "World"
]



export default function HeroSection(){
    return(
        <div className="bg-[#1E293B] flex flex-col justify-center items-center px-8 py-12">

            <div className="flex items-center flex-col">
                <h2 className="text-white font-black text-3xl">News tailored to</h2>
                <h2 className="text-blue-400 font-black text-3xl">your interests</h2>
            </div>

            <div className="mt-3 text-[#8a9bb0] flex flex-col items-center">
                <p>Technology, Sports, Finance, Science —</p>
                <p>pick what you love and get a feed built for you.</p>
            </div>

            <div className="flex flex-wrap gap-2 text-white mt-5">
                {
                    topics.map((topic,index)=>(
                        <p className="border rounded-full border-white/15 px-4 py-1 bg-white/10 text-[#cdd8e3]" key={index}>{topic}</p>
                    ))
                }

            </div>

            <a className="text-white bg-blue-500 hover:bg-blue-600 px-5 py-2 mt-7 rounded-full font-bold" href="/login">
                <button>Login & pick your interests →</button>
            </a>

            
        </div>
    )
}