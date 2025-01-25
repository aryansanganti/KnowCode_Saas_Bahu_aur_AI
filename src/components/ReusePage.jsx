"use client"

import  { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Recycle, ChevronDown, ChevronUp } from "lucide-react"
import Navbar from "./Navbar"
<style>
@import url('https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
</style>
const reuseIdeas = [
  {
    title: "Plant Holder",
    text: "Transform plastic bottles into stylish plant holders for your home or garden. Cut the bottle in half, paint or decorate the exterior, and add drainage holes to the bottom. Use the top half as a mini greenhouse for seedlings. This eco-friendly planter is perfect for herbs, succulents, or small flowers. Not only does this reduce plastic waste, but it also adds a unique, personalized touch to your green space. Consider creating a vertical garden by hanging multiple bottle planters on a wall or fence for a stunning visual effect.",
    icon: "🌿",
  },
  {
    title: "Bird Feeder",
    text: "Create a charming bird feeder from an empty plastic bottle to attract local wildlife. Cut small openings on the sides for perches and feeding access. Attach a shallow dish or use the bottle cap as a feeding tray. Fill with bird seed and hang in your garden using sturdy string or wire. This project not only repurposes plastic but also supports local bird populations, especially during harsh weather. Observe different bird species visiting your feeder and consider keeping a log of your sightings, turning your eco-friendly creation into a fun birdwatching activity.",
    icon: "🐦",
  },
  {
    title: "DIY Lamp",
    text: "Craft a unique, eco-friendly lamp using an empty glass bottle or jar. Clean the container thoroughly and ensure it's completely dry. Carefully drill a hole in the base for the cord, or use a bottle lamp kit for safety. Insert LED lights or a standard bulb socket. Decorate the exterior with paint, decoupage, or wrap with twine for a rustic look. This project not only repurposes materials but also creates a one-of-a-kind lighting fixture. Experiment with different bottle shapes and sizes to create various ambient lighting effects for your home.",
    icon: "💡",
  },
  {
    title: "Origami",
    text: "Breathe new life into old papers through the art of origami. Start with simple designs like cranes or butterflies, then progress to more complex models. Use colorful magazine pages, old maps, or patterned gift wrap for interesting textures. Create strings of origami for decorative garlands, or larger pieces for statement wall art. This craft not only reduces paper waste but also promotes mindfulness and improves hand-eye coordination. Host an origami party to share skills and create collaborative art pieces, fostering community while being eco-friendly.",
    icon: "🎨",
  },
  {
    title: "Handmade Cards",
    text: "Craft personalized, eco-friendly cards using recycled materials. Repurpose old greeting cards, colorful magazine pages, or textured papers as your base. Embellish with pressed flowers, leaves, or hand-drawn designs. Use non-toxic, water-based inks for stamping or calligraphy. These unique cards add a special touch to any occasion while reducing paper waste. Consider including seeds within the card stock, allowing recipients to plant the card and grow flowers or herbs. This thoughtful approach transforms your greeting into a lasting gift, promoting sustainability long after the occasion.",
    icon: "✉️",
  },
  {
    title: "Gift Wrap",
    text: "Embrace eco-friendly gift wrapping by repurposing materials you already have. Use old maps, newspaper comics, or pages from outdated books for a vintage look. Fabric scraps or scarves can be used in the Japanese Furoshiki style, creating reusable gift wrap. Decorate with natural elements like pine cones, cinnamon sticks, or dried orange slices for a festive touch. Use twine or fabric ribbons instead of plastic ones. This approach not only reduces waste but also adds a personal, creative flair to your gifts. Consider teaching a gift-wrapping workshop to spread eco-friendly practices in your community.",
    icon: "🎁",
  },
  {
    title: "Upcycled Bags",
    text: "Transform old clothing or fabric scraps into stylish, reusable shopping bags. Use sturdy materials like denim from old jeans or canvas from worn-out backpacks for durability. Incorporate interesting elements like pockets from shirts as external compartments. Add reinforced stitching for heavy loads. Personalize with embroidery, patches, or fabric paint. These handmade bags not only reduce textile waste but also serve as unique fashion statements. Organize a bag-making workshop in your community to encourage others to create their own eco-friendly carriers, reducing reliance on single-use plastic bags.",
    icon: "👜",
  },
  {
    title: "Cleaning Rags",
    text: "Give new purpose to old textiles by converting them into efficient cleaning rags. Cut worn-out t-shirts, towels, or bed linens into convenient sizes for various cleaning tasks. Use softer fabrics for dusting and polishing, while more durable materials work well for tougher jobs. Serge or zigzag stitch the edges to prevent fraying and extend their lifespan. Store in a repurposed container for easy access. This practice not only reduces textile waste but also saves money on disposable cleaning products. Consider creating a set of color-coded rags for different areas of your home to maintain hygiene.",
    icon: "🧽",
  },
  {
    title: "DIY Quilts",
    text: "Create cozy, memory-filled quilts by upcycling old clothes and fabrics. Sort materials by color or theme, such as baby clothes for a childhood memento or concert t-shirts for a music lover's quilt. Cut fabrics into uniform squares or interesting shapes for more complex designs. Incorporate meaningful elements like patches or embroidered details. Use eco-friendly batting made from recycled materials. This project not only repurposes textiles but also preserves memories in a functional, beautiful way. Consider organizing a community quilting circle to share skills, stories, and create quilts for local charities.",
    icon: "🛏️",
  },
  {
    title: "Mason Jar Storage",
    text: "Repurpose glass jars into versatile, eco-friendly storage solutions. Clean thoroughly and remove labels. Use for pantry storage of dry goods, spices, or homemade preserves. In the bathroom, store cotton balls, q-tips, or bath salts. Create desk organizers for office supplies or craft materials. Paint the lids or add chalkboard labels for easy identification. For a decorative touch, use as vases or candle holders. This not only reduces waste but also adds a charming, rustic aesthetic to your home. Organize a jar-decorating workshop to inspire creative reuse ideas in your community.",
    icon: "🏺",
  },
  {
    title: "DIY Pencil Holders",
    text: "Transform everyday items into unique, functional pencil holders. Use empty cans, glass jars, or plastic bottles as your base. Clean thoroughly and remove any sharp edges. Decorate with fabric, washi tape, or paint for a personalized touch. Add texture with rope wrapping or decoupage using old magazine clippings. For stability, fill the bottom with pebbles or marbles. Group different sizes together for a stylish desk organizer. This project not only repurposes materials but also adds character to your workspace. Consider creating themed holders for different subjects or seasons to make organization more engaging and fun.",
    icon: "✏️",
  },
  {
    title: "Eco-Friendly Toys",
    text: "Craft engaging, sustainable toys using household items. Turn cardboard boxes into playhouses, cars, or rocket ships. Create puppets from old socks or paper bags. Make musical instruments from containers filled with dried beans or rice. Use toilet paper rolls for binoculars or building blocks. Repurpose fabric scraps for dress-up clothes or doll accessories. These DIY toys not only reduce waste but also encourage creativity and imaginative play. Involve children in the creation process to teach them about sustainability and the value of reusing materials. Organize a toy-making workshop for families to share ideas and create together.",
    icon: "🧸",
  },

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

