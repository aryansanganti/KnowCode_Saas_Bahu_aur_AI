import React from "react";
import { useFirebase } from "../context/Firebase";
import { FaPlus, FaListAlt } from "react-icons/fa";

const IssueRaiser = () => {
  const { user } = useFirebase();
  const username = user?.displayName || user?.email;
  const [issue, setIssue] = React.useState({
    photo: "",
    text: "",
    location: "",
    description: "",
    peopleRequired: 1,
    status: "Open",
    raisedBy: username,
  });
  const [myIssues, setMyIssues] = React.useState([]);

  React.useEffect(() => {
    const userIssues = JSON.parse(localStorage.getItem(username)) || [];
    setMyIssues(userIssues);
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
    console.log("handlesubmit function");
    const userIssues = JSON.parse(localStorage.getItem(username)) || [];
    userIssues.push(issue);
    localStorage.setItem(username, JSON.stringify(userIssues));
    setMyIssues(userIssues);
    alert("Issue raised successfully!");
    setIssue({ 
      photo: "", 
      text: "", 
      location: "", 
      description: "", 
      peopleRequired: 1, 
      status: "Open", 
      raisedBy: username 
    });
  };

  return (
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
                        <td className={`p-3 font-semibold ${
                          issue.status === 'Resolved' ? 'text-[#3CB371]' : 'text-[#FFD700]'
                        }`}>
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
  );
};

export default IssueRaiser;