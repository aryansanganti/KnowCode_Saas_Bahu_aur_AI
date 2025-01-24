import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { FaRecycle, FaListAlt } from "react-icons/fa";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";

const RecycleTracker = () => {
  const { user } = useFirebase();
  const db = getFirestore();
  const username = user?.displayName || user?.email;
  const [recycleItem, setRecycleItem] = useState({
    type: "",
    condition: "",
    location: "",
    status: "Pending",
    submittedBy: username,
  });
  const [recycleList, setRecycleList] = useState([]);

  useEffect(() => {
    const fetchRecycleList = async () => {
      if (username) {
        const q = query(
          collection(db, "recycleItems"),
          where("submittedBy", "==", username)
        );
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => doc.data());
        setRecycleList(items);
      }
    };

    fetchRecycleList();
  }, [db, username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecycleItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "recycleItems"), recycleItem);
      setRecycleList((prev) => [...prev, recycleItem]);
      alert("Recycle item submitted successfully!");
      setRecycleItem({ 
        type: "", 
        condition: "", 
        location: "", 
        status: "Pending", 
        submittedBy: username 
      });
    } catch (error) {
      console.error("Error adding recycle item: ", error);
      alert("Failed to submit recycle item.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#32CD32] text-white p-6 flex items-center">
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
                className="w-full border-2 border-[#D3D3D3] rounded-lg p-3 text-[#333333] focus:border-[#32CD32]"
              />
              <input
                type="text"
                name="condition"
                placeholder="Condition of the Item"
                value={recycleItem.condition}
                onChange={handleChange}
                className="w-full border-2 border-[#D3D3D3] rounded-lg p-3 text-[#333333] focus:border-[#32CD32]"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={recycleItem.location}
                onChange={handleChange}
                className="w-full border-2 border-[#D3D3D3] rounded-lg p-3 text-[#333333] focus:border-[#32CD32]"
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-[#32CD32] text-white p-3 rounded-lg hover:bg-[#228B22] transition-colors flex items-center justify-center"
              >
                <FaRecycle className="mr-2" /> Submit Item
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-[#333333] flex items-center">
                <FaListAlt className="mr-3 text-[#32CD32]" />
                Recycle List
              </h3>
              <div className="bg-[#F5F5DC] rounded-lg max-h-[500px] overflow-auto">
                <table className="w-full">
                  <thead className="bg-[#32CD32] text-white sticky top-0">
                    <tr>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Condition</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recycleList.map((item, index) => (
                      <tr 
                        key={index} 
                        className="border-b last:border-b-0 hover:bg-[#D3D3D3]/30"
                      >
                        <td className="p-3 text-[#333333]">{item.type}</td>
                        <td className="p-3 text-[#333333]">{item.condition}</td>
                        <td className={`p-3 font-semibold ${
                          item.status === 'Resolved' ? 'text-[#32CD32]' : 'text-[#FFD700]'
                        }`}>
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
  );
};

export default RecycleTracker;
