import React, { useEffect, useState } from "react";
import { FaPlus, FaListAlt } from "react-icons/fa";
import Navbar from "./Navbar";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
  const username = "TestUser";
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

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-exp-1206" });

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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        // Set photo first
        setIssue((prev) => ({ ...prev, photo: reader.result }));

        try {
          // Analyze image with Gemini
          const prompt = `Analyze this image and provide:
1. A concise title for the issue
2. The precise location
3. A detailed description of the problem or situation
Return the response in JSON format with keys: text, location, description`;

          const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ inlineData: { mimeType: file.type, data: reader.result.split(',')[1] } }, { text: prompt }] }]
          });

          const response = result.response.text();
          
          // Try to parse the JSON response
          try {
            const parsedResponse = JSON.parse(response.replace(/```json|```/g, '').trim());
            
            setIssue((prev) => ({
              ...prev,
              text: parsedResponse.text || '',
              location: parsedResponse.location || '',
              description: parsedResponse.description || ''
            }));
          } catch (parseError) {
            console.error("Error parsing Gemini response:", parseError);
          }
        } catch (error) {
          console.error("Error analyzing image:", error);
        }
      };
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
      <div className="min-h-screen bg-[#EFE3C2] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#123524] text-white p-6 flex items-center">
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
                className="w-full border-2 border-[#3E7B27] rounded-lg p-3 text-[#123524] file:mr-4 file:rounded-lg file:border-0 file:bg-[#3E7B27] file:text-white hover:file:bg-[#85A947]"
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
                className="w-full border-2 border-[#85A947] rounded-lg p-3 text-[#123524] focus:border-[#3E7B27]"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={issue.location}
                onChange={handleChange}
                className="w-full border-2 border-[#85A947] rounded-lg p-3 text-[#123524] focus:border-[#3E7B27]"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={issue.description}
                onChange={handleChange}
                className="w-full border-2 border-[#85A947] rounded-lg p-3 text-[#123524] focus:border-[#3E7B27] h-32"
              />
              <input
                type="number"
                name="peopleRequired"
                placeholder="People Required"
                value={issue.peopleRequired}
                onChange={handleChange}
                className="w-full border-2 border-[#85A947] rounded-lg p-3 text-[#123524] focus:border-[#3E7B27]"
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-[#3E7B27] text-white p-3 rounded-lg hover:bg-[#85A947] transition-colors flex items-center justify-center"
              >
                <FaPlus className="mr-2" /> Submit Issue
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-[#123524] flex items-center">
                <FaListAlt className="mr-3 text-[#3E7B27]" />
                My Issues
              </h3>
              <div className="bg-[#EFE3C2] rounded-lg max-h-[500px] overflow-auto">
                <table className="w-full">
                  <thead className="bg-[#123524] text-white sticky top-0">
                    <tr>
                      <th className="p-3 text-left">Title</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myIssues.map((issue, index) => (
                      <tr
                        key={index}
                        className="border-b last:border-b-0 hover:bg-[#85A947]/30"
                      >
                        <td className="p-3 text-[#123524]">{issue.text}</td>
                        <td
                          className={`p-3 font-semibold ${
                            issue.status === "Resolved"
                              ? "text-[#3E7B27]"
                              : "text-[#85A947]"
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