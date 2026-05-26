import { Link } from "react-router-dom";
const PREVIEW_CARDS = [
  { bg: "bg-[#1a3a5c]", title: "Global markets surge as inflation cools", src: "BBC News" },
  { bg: "bg-[#1a3a2a]", title: "OpenAI announces real-time reasoning model", src: "TechCrunch" },
  { bg: "bg-[#2a1a3a]", title: "IPL 2026: Mumbai beat Chennai in thriller", src: "ESPN" },
];

export default function BluredCard(){
    return(
        <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 blur-sm pointer-events-none select-none opacity-60">
                {
                    PREVIEW_CARDS.map((prevCard, index)=>(
                        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden p-5" key={index}>
                           <div className={`h-36 ${prevCard.bg}`} />
                            <h2 className="text-2xl font-bold">{prevCard.title}</h2>
                            <p className="text-blue-600">{prevCard.src}</p>
                        </div>
                    ))
                }
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-2xl px-8 py-6 text-center border border-gray-100">
                    <div className="text-4xl mb-3">🔒</div>
                    <p className="font-black text-gray-900 text-sm mb-1">Your personalised feed is locked</p>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Login and pick your interests<br />to unlock your feed
            </p>
            <Link
            to="/login"
            className="bg-[#0f1923] hover:bg-[#1a2d42] text-white text-xs font-bold px-6 py-2.5 rounded-lg inline-block transition"
          >
            Login &amp; pick interests →
          </Link>
                </div>
            </div>
        </div>
    )
}
