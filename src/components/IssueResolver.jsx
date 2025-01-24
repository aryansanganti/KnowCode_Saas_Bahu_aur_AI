import { useEffect, useState } from "react"
import { useFirebase } from "../context/Firebase"
import Navbar from "./Navbar"

const IssueResolver = () => {
  const { user } = useFirebase()
  const username = user?.displayName || user?.email
  const [issues, setIssues] = useState([])
  const [wallets, setWallets] = useState({})

  useEffect(() => {
    // Fetch all issues from localStorage
    const allIssues = Object.keys(localStorage)
      .filter((key) => key !== "loggedInUser" && key !== "wallets")
      .flatMap((key) => JSON.parse(localStorage.getItem(key) || "[]"))
    setIssues(allIssues)

    // Fetch wallets from localStorage
    const storedWallets = JSON.parse(localStorage.getItem("wallets")) || {}
    setWallets(storedWallets)
  }, [])

  const handleResolve = (issueIndex) => {
    const updatedIssues = [...issues]
    const issue = updatedIssues[issueIndex]

    if (issue.status === "Resolved") {
      alert("This issue is already resolved!")
      return
    }

    // Mark issue as resolved
    issue.status = "Resolved"

    // Add points to resolver's wallet
    const updatedWallets = { ...wallets }
    updatedWallets[username] = (updatedWallets[username] || 0) + 15
    setWallets(updatedWallets)
    localStorage.setItem("wallets", JSON.stringify(updatedWallets))

    // Remove resolved issue from the list
    updatedIssues.splice(issueIndex, 1)
    setIssues(updatedIssues)

    // Update localStorage
    const owner = issue.raisedBy
    const ownerIssues = JSON.parse(localStorage.getItem(owner)) || []
    const ownerIssueIndex = ownerIssues.findIndex((i) => i.text === issue.text)
    if (ownerIssueIndex !== -1) {
      ownerIssues[ownerIssueIndex] = issue
      localStorage.setItem(owner, JSON.stringify(ownerIssues))
    }

    alert("Issue resolved successfully! 15 credits added to your EcoWallet.")
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#EFE3C2] py-10 px-4">
        <div className="max-w-4xl mx-auto bg-[#85A947] rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#3E7B27] text-[#EFE3C2] p-6 flex items-center">
            <h2 className="text-2xl font-bold">Resolve Community Issues</h2>
          </div>

          <div className="p-6">
            {issues.length === 0 ? (
              <p className="text-center text-[#123524]">No issues available to resolve.</p>
            ) : (
              <div className="bg-[#EFE3C2] rounded-lg max-h-[500px] overflow-auto">
                <table className="w-full">
                  <thead className="bg-[#3E7B27] text-[#EFE3C2]">
                    <tr>
                      <th className="p-3 text-left">Title</th>
                      <th className="p-3 text-left">Location</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issues.map((issue, index) => (
                      <tr key={index} className="border-b last:border-b-0 hover:bg-[#85A947]/30">
                        <td className="p-3 text-[#123524]">{issue.text}</td>
                        <td className="p-3 text-[#123524]">{issue.location}</td>
                        <td
                          className={`p-3 font-semibold ${
                            issue.status === "Resolved" ? "text-[#3E7B27]" : "text-[#123524]"
                          }`}
                        >
                          {issue.status}
                        </td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => handleResolve(index)}
                            className="bg-[#3E7B27] text-[#EFE3C2] p-2 rounded-lg hover:bg-[#123524]"
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
    </>
  )
}

export default IssueResolver

