import { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";

const IssueResolver = () => {
  const { user } = useFirebase();
  const username = user?.displayName || user?.email;
  const [issues, setIssues] = useState([]);
  const [wallets, setWallets] = useState({});

  useEffect(() => {
    // Fetch all issues from localStorage
    const allIssues = Object.keys(localStorage)
      .filter((key) => key !== "loggedInUser" && key !== "wallets")
      .flatMap((key) => JSON.parse(localStorage.getItem(key) || "[]"));
    setIssues(allIssues);

    // Fetch wallets from localStorage
    const storedWallets = JSON.parse(localStorage.getItem("wallets")) || {};
    setWallets(storedWallets);
  }, []);

  const handleResolve = (issueIndex) => {
    const updatedIssues = [...issues];
    const issue = updatedIssues[issueIndex];

    if (issue.status === "Resolved") {
      alert("This issue is already resolved!");
      return;
    }

    // Mark issue as resolved
    issue.status = "Resolved";

    // Add points to resolver's wallet
    const updatedWallets = { ...wallets };
    updatedWallets[username] = (updatedWallets[username] || 0) + 15;
    setWallets(updatedWallets);
    localStorage.setItem("wallets", JSON.stringify(updatedWallets));

    // Remove resolved issue from the list
    updatedIssues.splice(issueIndex, 1);
    setIssues(updatedIssues);

    // Update localStorage
    const owner = issue.raisedBy;
    const ownerIssues = JSON.parse(localStorage.getItem(owner)) || [];
    const ownerIssueIndex = ownerIssues.findIndex((i) => i.text === issue.text);
    if (ownerIssueIndex !== -1) {
      ownerIssues[ownerIssueIndex] = issue;
      localStorage.setItem(owner, JSON.stringify(ownerIssues));
    }

    alert("Issue resolved successfully! 15 credits added to your EcoWallet.");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#3CB371] text-white p-6 flex items-center">
          <h2 className="text-2xl font-bold">Resolve Community Issues</h2>
        </div>

        <div className="p-6">
          {issues.length === 0 ? (
            <p className="text-center text-[#333333]">No issues available to resolve.</p>
          ) : (
            <div className="bg-[#F5F5DC] rounded-lg max-h-[500px] overflow-auto">
              <table className="w-full">
                <thead className="bg-[#4682B4] text-white">
                  <tr>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Location</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue, index) => (
                    <tr key={index} className="border-b last:border-b-0 hover:bg-[#D3D3D3]/30">
                      <td className="p-3 text-[#333333]">{issue.text}</td>
                      <td className="p-3 text-[#333333]">{issue.location}</td>
                      <td
                        className={`p-3 font-semibold ${
                          issue.status === "Resolved" ? "text-[#3CB371]" : "text-[#FFD700]"
                        }`}
                      >
                        {issue.status}
                      </td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => handleResolve(index)}
                          className="bg-[#3CB371] text-white p-2 rounded-lg hover:bg-[#2E8B57]"
                        >
                          Resolve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueResolver;
