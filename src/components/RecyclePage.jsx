import { useState, useEffect } from "react"
import { useFirebase } from "../context/Firebase"
import { FaRecycle, FaListAlt, FaPlus } from "react-icons/fa"
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore"
import Navbar from "./Navbar"

const RecycleTracker = () => {
  const { user } = useFirebase()
  const db = getFirestore()
  const username = user?.displayName || user?.email
  const [recycleItem, setRecycleItem] = useState({
    type: "",
    condition: "",
    location: "",
    status: "Pending",
    submittedBy: username,
  })
  const [recycleList, setRecycleList] = useState([])

  useEffect(() => {
    const fetchRecycleList = async () => {
      if (username) {
        const q = query(collection(db, "recycleItems"), where("submittedBy", "==", username))
        const querySnapshot = await getDocs(q)
        const items = querySnapshot.docs.map((doc) => doc.data())
        setRecycleList(items)
      }
    }

    fetchRecycleList()
  }, [db, username])

  const handleChange = (e) => {
    const { name, value } = e.target
    setRecycleItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "recycleItems"), recycleItem)
      setRecycleList((prev) => [...prev, recycleItem])
      alert("Recycle item submitted successfully!")
      setRecycleItem({
        type: "",
        condition: "",
        location: "",
        status: "Pending",
        submittedBy: username,
      })
    } catch (error) {
      console.error("Error adding recycle item: ", error)
      alert("Failed to submit recycle item.")
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-9 bg-[#EFE3C2] py-10 px-4">
        <div className="max-w-4xl mx-auto bg-[#85A947] rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#3E7B27] text-[#EFE3C2] p-6 flex items-center">
            <FaRecycle className="mr-4 text-4xl" />
            <h2 className="text-2xl font-bold">Recycle Tracker</h2>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input
                  type="text"
                  name="type"
                  placeholder="Type of Recycle Item"
                  value={recycleItem.type}
                  onChange={handleChange}
                  className="w-full border-2 border-[#3E7B27] rounded-lg p-3 text-[#123524] focus:border-[#85A947]"
                />
                <input
                  type="text"
                  name="condition"
                  placeholder="Condition of the Item"
                  value={recycleItem.condition}
                  onChange={handleChange}
                  className="w-full border-2 border-[#3E7B27] rounded-lg p-3 text-[#123524] focus:border-[#85A947]"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={recycleItem.location}
                  onChange={handleChange}
                  className="w-full border-2 border-[#3E7B27] rounded-lg p-3 text-[#123524] focus:border-[#85A947]"
                />
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#3E7B27] text-[#EFE3C2] p-3 rounded-lg hover:bg-[#123524] transition-colors flex items-center justify-center"
                >
                  <FaPlus className="mr-2" /> Submit Item
                </button>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-[#123524] flex items-center">
                  <FaListAlt className="mr-3 text-[#3E7B27]" />
                  Recycle List
                </h3>
                <div className="bg-[#EFE3C2] rounded-lg max-h-[500px] overflow-auto">
                  <table className="w-full">
                    <thead className="bg-[#3E7B27] text-[#EFE3C2] sticky top-0">
                      <tr>
                        <th className="p-3 text-left">Type</th>
                        <th className="p-3 text-left">Condition</th>
                        <th className="p-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recycleList.map((item, index) => (
                        <tr key={index} className="border-b last:border-b-0 hover:bg-[#85A947]/30">
                          <td className="p-3 text-[#123524]">{item.type}</td>
                          <td className="p-3 text-[#123524]">{item.condition}</td>
                          <td
                            className={`p-3 font-semibold ${
                              item.status === "Resolved" ? "text-[#3E7B27]" : "text-[#123524]"
                            }`}
                          >
                            {item.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecycleTracker

