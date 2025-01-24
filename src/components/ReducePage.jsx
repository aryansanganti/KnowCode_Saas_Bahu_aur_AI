import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Leaf, ChevronDown, ChevronUp } from "lucide-react"
import Navbar from "./Navbar"

const reduceTips = [
  {
    title: "Minimal Packaging",
    text: "Embrace the art of minimal packaging to significantly reduce waste. Opt for products with little to no packaging, such as loose fruits and vegetables, or items in recyclable containers. When shopping, bring your own reusable produce bags and containers for bulk items. Support brands that prioritize eco-friendly packaging solutions, like biodegradable materials or easily recyclable options. By choosing minimally packaged goods, you not only reduce waste but also send a powerful message to manufacturers about consumer preferences for sustainable packaging practices.",
    icon: "📦",
  },
  {
    title: "Avoid Single-Use Plastics",
    text: "Make a significant impact by eliminating single-use plastics from your daily routine. Invest in a high-quality reusable water bottle, coffee cup, and set of utensils to carry with you. Choose metal or glass straws over plastic ones. When ordering takeout, request no plastic cutlery. For grocery shopping, use cloth produce bags and reusable shopping bags. At home, replace plastic wrap with beeswax wraps or silicone covers. By consistently avoiding single-use plastics, you'll prevent hundreds of plastic items from entering landfills and oceans each year, contributing to a cleaner, healthier planet.",
    icon: "🥤",
  },
  {
    title: "Energy Efficiency",
    text: "Boost your home's energy efficiency to reduce your carbon footprint and save on utility bills. Start by switching to LED bulbs, which use up to 75% less energy than incandescent lighting. Invest in smart power strips to eliminate phantom energy draw from electronics. Upgrade to ENERGY STAR certified appliances when replacing old ones. Improve your home's insulation and seal any air leaks around windows and doors. Use a programmable thermostat to optimize heating and cooling. Consider installing solar panels or participating in community solar projects to further reduce your reliance on non-renewable energy sources.",
    icon: "💡",
  },
  {
    title: "Composting",
    text: "Transform your kitchen waste into nutrient-rich soil through composting. Start a compost bin in your backyard or use a countertop composter for apartment living. Compost fruit and vegetable scraps, coffee grounds, tea bags, and yard waste. Avoid meat, dairy, and oily foods to prevent odors and pests. Layer 'green' (nitrogen-rich) materials with 'brown' (carbon-rich) materials like dry leaves or newspaper. Turn your compost regularly and keep it moist. Use the finished compost to enrich your garden soil or donate it to community gardens. Composting not only reduces landfill waste but also creates a valuable resource for plant growth.",
    icon: "🍃",
  },
  {
    title: "Digital Receipts",
    text: "Embrace the digital age by opting for e-receipts whenever possible. Many retailers now offer the option to receive receipts via email or text. Set up a dedicated email folder for organizing your digital receipts, making them easy to find for returns or tax purposes. For personal record-keeping, use apps that allow you to scan and store paper receipts digitally. When paper receipts are unavoidable, recycle them if they're not printed on thermal paper. By choosing digital over paper, you're saving trees, reducing chemical use in paper production, and minimizing waste. This small change can have a significant cumulative effect on reducing paper consumption.",
    icon: "📱",
  },
  {
    title: "Reusable Bags",
    text: "Make reusable bags your go-to choice for all shopping needs. Invest in a variety of durable, washable bags for different purposes: sturdy canvas totes for groceries, mesh bags for produce, and compact foldable bags to keep in your car or purse for unexpected purchases. Choose bags made from sustainable materials like organic cotton, hemp, or recycled plastics. Regularly wash your reusable bags to maintain hygiene. Get creative by upcycling old t-shirts or fabric into unique shopping bags. By consistently using reusable bags, you can prevent hundreds of single-use plastic bags from entering the waste stream each year.",
    icon: "🛍️",
  },
  {
    title: "Public Transport",
    text: "Embrace public transportation to significantly reduce your carbon footprint. Research your local transit options and plan your routes in advance. Consider getting a monthly pass for cost savings and convenience. Use transit apps to track real-time arrivals and plan efficient journeys. For longer trips, explore intercity train or bus options. When public transport isn't available, organize carpools with colleagues or neighbors. Combine public transit with cycling by using bike racks on buses or trains. By choosing public transport, you're not only reducing emissions but also supporting infrastructure that makes cities more livable and reduces traffic congestion.",
    icon: "🚌",
  },
  {
    title: "Secondhand Goods",
    text: "Dive into the world of secondhand shopping to reduce waste and conserve resources. Explore thrift stores, consignment shops, and online marketplaces for pre-loved items. Before buying new, check if you can find a quality used version. Attend swap meets or organize clothing swaps with friends to refresh your wardrobe sustainably. When you no longer need items, donate or sell them instead of discarding. For furniture, consider upcycling or refinishing old pieces to give them new life. By choosing secondhand, you're extending the lifecycle of products, reducing demand for new manufacturing, and often saving money while finding unique items with character.",
    icon: "♻️",
  },
]

export default function ReducePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedTip, setExpandedTip] = useState(null);

  const filteredTips = reduceTips.filter(
    (tip) =>
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.text.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-teal-800 mb-8 flex items-center justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Leaf className="mr-4 h-10 w-10 text-green-600" />
          
        </motion.h1>

        <motion.div
          className="mb-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search for eco-friendly tips..."
            className="w-full p-4 pl-12 pr-4 text-gray-700 bg-white bg-opacity-80 border-2 border-teal-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500 h-6 w-6" />
        </motion.div>

        <AnimatePresence>
          {filteredTips.map((tip, index) => (
            <motion.div
              key={index}
              className="mb-4 bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedTip(expandedTip === index ? null : index)}
              >
                <div className="flex items-center">
                  <span className="text-3xl mr-4" role="img" aria-label={tip.title}>
                    {tip.icon}
                  </span>
                  <h2 className="text-xl font-semibold text-teal-700">{tip.title}</h2>
                </div>
                {expandedTip === index ? (
                  <ChevronUp className="h-6 w-6 text-teal-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-teal-500 flex-shrink-0" />
                )}
              </div>
              <AnimatePresence>
                {expandedTip === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-gray-700 leading-relaxed">{tip.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTips.length === 0 && (
          <motion.p
            className="text-center text-gray-600 mt-8 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            No eco-friendly tips found. Try a different search term!
          </motion.p>
        )}
      </div>
    </div>
    </>
  )
}

