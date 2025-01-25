import { Link } from "react-router-dom"
import { useFirebase } from "../context/Firebase"
import { FiLogOut } from "react-icons/fi"
import { FaLeaf, FaRecycle, FaHandHoldingHeart, FaLightbulb, FaTree } from "react-icons/fa"
import Navbar from "./Navbar"

const HomePage = () => {
  const { user, handleLogout } = useFirebase()
  const username = user?.displayName || user?.email || "Eco Warrior"

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b pt-2 from-[#EFE3C2] to-[#85A947] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#3E7B27] opacity-50"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>
        <div className="absolute top-4 right-4 z-10">
          {/* <button
            onClick={handleLogout}
            className="text-[#123524] hover:text-[#3E7B27] flex items-center space-x-2 bg-[#EFE3C2] bg-opacity-80 rounded-full px-4 py-2 transition-all duration-300 hover:bg-opacity-100"
          >
            <FiLogOut />
            <span>Logout</span>
          </button> */}
        </div>
        <div className="text-center bg-[#EFE3C2] bg-opacity-90 p-10 rounded-3xl shadow-2xl z-10 transform hover:scale-105 transition-all duration-300">
          <h1 className="text-4xl font-bold mb-6 text-[#3E7B27]">Welcome, {username}</h1>
          <p className="text-[#123524] mb-8">Let's make a positive impact on our planet!</p>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <EcoButton to="/issue-raiser" icon={FaLeaf} label="Raise an Issue" color="[#3E7B27]" />
            <EcoButton to="/issue-resolver" icon={FaHandHoldingHeart} label="Resolve an Issue" color="[#85A947]" />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <EcoButton to="/reuse-page" icon={FaRecycle} label="Reuse" color="[#3E7B27]" />
            <EcoButton to="/reduce-page" icon={FaLightbulb} label="Reduce" color="[#85A947]" />
            <EcoButton to="/recycle-page" icon={FaTree} label="Recycle" color="[#3E7B27]" />
          </div>
        </div>
      </div>
    </>
  )
}

const EcoButton = ({ to, icon: Icon, label, color }) => (
  <Link
    to={to}
    className={`flex flex-col items-center justify-center p-6 bg-${color} text-[#EFE3C2] rounded-2xl hover:bg-opacity-80 transition-all duration-300 group`}
  >
    <Icon className={`text-4xl mb-2 group-hover:animate-bounce`} />
    <span className="text-sm font-medium">{label}</span>
  </Link>
)

export default HomePage

