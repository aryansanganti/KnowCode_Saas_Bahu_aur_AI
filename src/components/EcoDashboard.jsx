import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";

const EcoDashboard = () => {
  const { user } = useFirebase();
  const username = user?.displayName || user?.email || "Guest";
  const [wallets, setWallets] = useState({});
  const [issuesRaised, setIssuesRaised] = useState(0);
  const [issuesResolved, setIssuesResolved] = useState(0);
  const [userCredits, setUserCredits] = useState(0);

  useEffect(() => {
    // Fetch wallets from localStorage
    const storedWallets = JSON.parse(localStorage.getItem("wallets")) || {};
    setWallets(storedWallets);

    // Set the logged-in user's credits
    setUserCredits(storedWallets[username] || 0);

    // Calculate total issues raised and resolved
    const allIssues = Object.keys(localStorage)
      .filter((key) => key !== "loggedInUser" && key !== "wallets")
      .flatMap((key) => JSON.parse(localStorage.getItem(key) || "[]"));

    setIssuesRaised(allIssues.length);

    const resolvedIssues = allIssues.filter((issue) => issue.status === "Resolved").length;
    setIssuesResolved(resolvedIssues);
  }, [username]);

  // Sort leaderboard by wallet credits
  const leaderboard = Object.entries(wallets)
    .sort(([, creditsA], [, creditsB]) => creditsB - creditsA)
    .map(([name, credits]) => ({ name, credits }));

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6 flex items-center">
          <h2 className="text-2xl font-bold">EcoWallet Dashboard</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-green-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Your EcoWallet Credits</h3>
              <p className="text-2xl">{userCredits}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Issues Raised</h3>
              <p className="text-2xl">{issuesRaised}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Issues Resolved</h3>
              <p className="text-2xl">{issuesResolved}</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Leaderboard</h3>
          <table className="w-full bg-gray-50 rounded-lg overflow-hidden shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Credits</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr key={index} className="border-b last:border-b-0 hover:bg-gray-200">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EcoDashboard;
