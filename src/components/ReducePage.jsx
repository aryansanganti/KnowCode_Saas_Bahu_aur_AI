import React, { useState } from "react";
import { motion } from "framer-motion";

const reduceTips = [
  { title: "Minimal Packaging", text: "Choose products with little to no packaging to reduce waste." },
  { title: "Avoid Single-Use Plastics", text: "Carry reusable bottles, straws, and cutlery wherever you go." },
  { title: "Energy Efficiency", text: "Switch to energy-efficient appliances to conserve power." },
  { title: "Composting", text: "Compost kitchen waste to reduce organic waste in landfills." },
  { title: "Digital Receipts", text: "Opt for digital receipts and documents to save paper." },
  { title: "Reusable Bags", text: "Use cloth bags instead of plastic for shopping." },
  { title: "Public Transport", text: "Use public transport or carpool to save fuel." },
  { title: "Secondhand Goods", text: "Purchase used items to reduce production waste." },
];

function ReducePage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tips based on search query
  const filteredTips = reduceTips.filter(
    (tip) =>
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Reduce Waste</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search reduce tips..."
          className="border p-3 rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display Filtered Tips */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredTips.map((tip, index) => (
          <motion.div
            key={index}
            
            className="p-6 bg-white border rounded-lg shadow-lg"
            whileHover={{ scale: 1.05, rotate: -1 }} // Hover animation
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="font-bold text-xl mb-2 text-blue-700">{tip.title}</h3>
            <p className="text-gray-700">{tip.text}</p>
          </motion.div>
        ))}
        {filteredTips.length === 0 && (
          <p className="text-gray-500 text-center">No results found. Try a different search term!</p>
        )}
      </div>
    </div>
  );
}

export default ReducePage;
