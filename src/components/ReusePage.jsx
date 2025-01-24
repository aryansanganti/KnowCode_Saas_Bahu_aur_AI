import React, { useState } from "react";
import { motion } from "framer-motion"; // Framer Motion for animations

const reuseIdeas = [
  { title: "Plant Holder", text: "Cut the bottle in half and use it as a pot for plants." },
  { title: "Bird Feeder", text: "Fill a bottle with seeds and hang it in your garden." },
  { title: "DIY Lamp", text: "Turn it into a creative lamp by adding LED lights inside." },
  { title: "Origami", text: "Fold paper into creative shapes for decorations or gifts." },
  { title: "Handmade Cards", text: "Create personalized cards for special occasions." },
  { title: "Gift Wrap", text: "Use old paper for eco-friendly gift wrapping." },
  { title: "Upcycled Bags", text: "Convert old clothes into reusable shopping bags." },
  { title: "Cleaning Rags", text: "Cut them into smaller pieces for cleaning purposes." },
  { title: "DIY Quilts", text: "Patch old clothes together to make a cozy quilt." },
  { title: "Mason Jar Storage", text: "Reuse jars to store spices, grains, or other items." },
  { title: "DIY Pencil Holders", text: "Turn empty cans or bottles into creative pencil holders." },
  { title: "Eco-Friendly Toys", text: "Create toys for kids using leftover household items." },
];

function ReusePage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter ideas based on search query
  const filteredIdeas = reuseIdeas.filter(
    (idea) =>
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-green-600 mb-6">Reuse Ideas</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search reuse ideas..."
          className="border p-3 rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display Filtered Ideas */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredIdeas.map((idea, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white border rounded-lg shadow-lg"
            whileHover={{ scale: 1.05, rotate: 1 }} // Hover animation
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="font-bold text-xl mb-2 text-green-700">{idea.title}</h3>
            <p className="text-gray-700">{idea.text}</p>
          </motion.div>
        ))}
        {filteredIdeas.length === 0 && (
          <p className="text-gray-500 text-center">No results found. Try a different search term!</p>
        )}
      </div>
    </div>
  );
}

export default ReusePage;
