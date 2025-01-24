import  { useEffect, useState } from "react";
import { FaPlus, FaListAlt } from "react-icons/fa";
import Navbar from "./Navbar";

// Utility function for safe JSON parsing
const safeParse = (key, fallback = null) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return fallback;
  }
};

const IssueRaiser = () => {
  const username = "TestUser"; // Replace with actual username logic (e.g., Firebase user context)
  const [issue, setIssue] = useState({
    photo: "",
    text: "",
    location: "",
    description: "",
    peopleRequired: 1,
    status: "Open",
    raisedBy: username,
  });
  const [myIssues, setMyIssues] = useState([]);
  const [wallets, setWallets] = useState({});

  useEffect(() => {
    // Fetch user's issues from localStorage
    const userIssues = safeParse(username, []);
    setMyIssues(userIssues);

    // Fetch wallets from localStorage
    const storedWallets = safeParse("wallets", {});
    setWallets(storedWallets);
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssue((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setIssue((prev) => ({ ...prev, photo: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!issue.text || !issue.location || !issue.description) {
      alert("Please fill in all the fields.");
      return;
    }

    // Save the issue to localStorage
    const userIssues = safeParse(username, []);
    const updatedIssues = [...userIssues, issue];
    localStorage.setItem(username, JSON.stringify(updatedIssues));
    setMyIssues(updatedIssues);

    // Update wallet points (5 points for raising an issue)
    const updatedWallets = { ...wallets, [username]: (wallets[username] || 0) + 5 };
    localStorage.setItem("wallets", JSON.stringify(updatedWallets));
    setWallets(updatedWallets);

    alert("Issue raised successfully, and 5 points have been added to your wallet!");

    // Reset the issue form
    setIssue({
      photo: "",
      text: "",
      location: "",
      description: "",
      peopleRequired: 1,
      status: "Open",
      raisedBy: username,
    });
  };

  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-[#FAFAFA] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#4682B4] text-white p-6 flex items-center">
          <FaPlus className="mr-4 text-4xl" />
          <h2 className="text-2xl font-bold">Raise a Community Issue</h2>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border-2 border-[#3CB371] rounded-lg p-3 text-[#333333] file:mr-4 file:rounded-lg file:border-0 file:bg-[#3CB371] file:text-white hover:file:bg-[#2E8B57]"
              />
              {issue.photo && (
                <img
                  src={issue.photo}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <input
                type="text"
                name="text"
                placeholder="Issue Title"
                value={issue.text}
                onChange={handleChange}
                className="w-full border-2 border-[#D3D3D3] rounded-lg p-3 text-[#333333] focus:border-[#4682B4]"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={issue.location}
                onChange={handleChange}
                className="w-full border-2 border-[#D3D3D3] rounded-lg p-3 text-[#333333] focus:border-[#4682B4]"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={issue.description}
                onChange={handleChange}
                className="w-full border-2 border-[#D3D3D3] rounded-lg p-3 text-[#333333] focus:border-[#4682B4] h-32"
              />
              <input
                type="number"
                name="peopleRequired"
                placeholder="People Required"
                value={issue.peopleRequired}
                onChange={handleChange}
                className="w-full border-2 border-[#D3D3D3] rounded-lg p-3 text-[#333333] focus:border-[#4682B4]"
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-[#3CB371] text-white p-3 rounded-lg hover:bg-[#2E8B57] transition-colors flex items-center justify-center"
              >
                <FaPlus className="mr-2" /> Submit Issue
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-[#333333] flex items-center">
                <FaListAlt className="mr-3 text-[#4682B4]" />
                My Issues
              </h3>
              <div className="bg-[#F5F5DC] rounded-lg max-h-[500px] overflow-auto">
                <table className="w-full">
                  <thead className="bg-[#4682B4] text-white sticky top-0">
                    <tr>
                      <th className="p-3 text-left">Title</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myIssues.map((issue, index) => (
                      <tr
                        key={index}
                        className="border-b last:border-b-0 hover:bg-[#D3D3D3]/30"
                      >
                        <td className="p-3 text-[#333333]">{issue.text}</td>
                        <td
                          className={`p-3 font-semibold ${
                            issue.status === "Resolved"
                              ? "text-[#3CB371]"
                              : "text-[#FFD700]"
                          }`}
                        >
                          {issue.status}
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
  );
};

export default IssueRaiser;
