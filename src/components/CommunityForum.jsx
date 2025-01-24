import  { useState, useEffect } from "react"
import {
  Leaf,
  User,
  MessageCircle,
  FileText,
  Calendar,
  Users,
  HelpCircle,
  BookOpen,
  Send,
  ThumbsUp,
  MessageSquare,
  Globe,
  Bell,
  Search,
} from "lucide-react"
import { useFirebase } from "../context/Firebase"
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore"
import Navbar from "./Navbar"

const EcoFriendlyCommunityForum = () => {
  const [activeTab, setActiveTab] = useState("Explore")
  const [posts, setPosts] = useState([])
  const [newPostContent, setNewPostContent] = useState("")
  const { user } = useFirebase()
  const db = getFirestore()

  const tabs = [
    { name: "Explore", icon: <Globe className="w-5 h-5" /> },
    { name: "Feed", icon: <MessageCircle className="w-5 h-5" /> },
    { name: "Notifications", icon: <Bell className="w-5 h-5" /> },
    { name: "My Profile", icon: <User className="w-5 h-5" /> },
    { name: "Discussions", icon: <MessageCircle className="w-5 h-5" /> },
    { name: "Articles", icon: <FileText className="w-5 h-5" /> },
    { name: "Events", icon: <Calendar className="w-5 h-5" /> },
    { name: "Groups", icon: <Users className="w-5 h-5" /> },
    { name: "Help Center", icon: <HelpCircle className="w-5 h-5" /> },
    { name: "Resources", icon: <BookOpen className="w-5 h-5" /> },
  ]

  useEffect(() => {
    if (activeTab === "Explore") {
      const postsRef = collection(db, "posts")
      const q = query(postsRef, orderBy("createdAt", "desc"))

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setPosts(fetchedPosts)
      })

      return () => unsubscribe()
    }
  }, [db, activeTab])

  const handleCreatePost = async (e) => {
    e.preventDefault()

    if (!user || !newPostContent.trim()) return

    try {
      await addDoc(collection(db, "posts"), {
        user: user.displayName || user.email,
        content: newPostContent,
        userId: user.uid,
        createdAt: new Date(),
        likes: 0,
        comments: 0,
      })

      setNewPostContent("")
    } catch (error) {
      console.error("Error creating post:", error)
      alert("Failed to create post")
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-green-50">
      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-green-100 h-screen sticky top-0 overflow-y-auto">
        <div className="p-6 flex items-center space-x-2">
          <Leaf className="w-8 h-8" />
          <h1 className="text-xl font-bold">EcoConnect</h1>
        </div>
        <nav className="mt-6 space-y-1 px-3">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeTab === tab.name ? "bg-green-700 text-white" : "hover:bg-green-700/50"
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-800">{activeTab}</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-full bg-white border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
          </div>
        </header>

        {activeTab === "Explore" && (
          <div className="space-y-6">
            {/* Post Creation Form */}
            {user && (
              <form onSubmit={handleCreatePost} className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                    <User className="w-6 h-6 text-green-800" />
                  </div>
                  <p className="font-semibold text-green-800">{user.displayName || user.email}</p>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share your eco-friendly ideas..."
                    className="flex-1 p-3 rounded-l-lg border-2 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 text-white p-3 rounded-r-lg hover:bg-green-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            )}

            {/* Posts Display */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-6 bg-white rounded-xl shadow-md border border-green-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-green-800" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-green-800">{post.user}</h3>
                      <p className="text-sm text-green-600">
                        {post.createdAt && new Date(post.createdAt.toDate()).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex space-x-4 text-green-600">
                    <button className="flex items-center space-x-1 hover:text-green-800">
                      <ThumbsUp className="w-5 h-5" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-green-800">
                      <MessageSquare className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab !== "Explore" && (
          <div className="text-green-800 text-lg">Content for {activeTab} will be implemented here.</div>
        )}
      </main>
    </div>
    </>
  );
}

export default EcoFriendlyCommunityForum

