"use client"

import  { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Recycle, ChevronDown, ChevronUp } from "lucide-react"
import Navbar from "./Navbar"

const reuseIdeas = [
  // ... (keep the existing reuseIdeas array)
]

export default function ReusePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedIdea, setExpandedIdea] = useState(null)

  const filteredIdeas = reuseIdeas.filter(
    (idea) =>
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.text.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <Navbar />
      <div className="min-h-screen  mt-9 bg-gradient-to-br from-[#EFE3C2] to-[#85A947] p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-[#123524] mb-8 flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Recycle className="mr-4 h-10 w-10 text-[#3E7B27]" />
            Creative Reuse Ideas
          </motion.h1>

          <motion.div
            className="mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Search for reuse ideas..."
              className="w-full p-4 pl-12 pr-4 text-[#123524] bg-[#EFE3C2] bg-opacity-80 border-2 border-[#3E7B27] rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#85A947] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3E7B27] h-6 w-6" />
          </motion.div>

          <AnimatePresence>
            {filteredIdeas.map((idea, index) => (
              <motion.div
                key={index}
                className="mb-4 bg-[#EFE3C2] bg-opacity-90 rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedIdea(expandedIdea === index ? null : index)}
                >
                  <div className="flex items-center">
                    <span className="text-3xl mr-4" role="img" aria-label={idea.title}>
                      {idea.icon}
                    </span>
                    <h2 className="text-xl font-semibold text-[#3E7B27]">{idea.title}</h2>
                  </div>
                  {expandedIdea === index ? (
                    <ChevronUp className="h-6 w-6 text-[#3E7B27] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-[#3E7B27] flex-shrink-0" />
                  )}
                </div>
                <AnimatePresence>
                  {expandedIdea === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-[#123524] leading-relaxed">{idea.text}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredIdeas.length === 0 && (
            <motion.p
              className="text-center text-[#123524] mt-8 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              No reuse ideas found. Try a different search term!
            </motion.p>
          )}
        </div>
      </div>
    </>
  )
}

