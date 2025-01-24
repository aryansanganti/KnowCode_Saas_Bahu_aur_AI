import React from "react";
import { useFirebase } from "../context/Firebase";
import { FaHandHoldingHeart, FaTasks } from "react-icons/fa";

const IssueResolver = () => {
  const { user } = useFirebase();
  const username = user?.displayName || user?.email;
  const [issues, setIssues] = React.useState([]);
  const [myTasks, setMyTasks] = React.useState([]);
  const [globalIssues, setGlobalIssues] = React.useState([]);

  React.useEffect(() => {
    const allIssues = Object.keys(localStorage)
      .filter((key) => key !== "loggedInUser")
      .flatMap((key) => JSON.parse(localStorage.getItem(key) || "[]"));

    const unresolvedIssues = allIssues.filter((issue) => issue.status === "Open");
    setIssues(unresolvedIssues);
    setMyTasks(allIssues.filter((issue) => issue.volunteers?.includes(username)));
    setGlobalIssues(unresolvedIssues);
  }, [username]);

  const handleVolunteer = (index) => {
    const issueToVolunteer = { ...issues[index] };

    if (issueToVolunteer.volunteers?.includes(username)) {
      alert("You have already volunteered for this issue.");
      return;
    }

    issueToVolunteer.volunteers = issueToVolunteer.volunteers || [];
    issueToVolunteer.volunteers.push(username);
    issueToVolunteer.peopleRequired--;

    if (issueToVolunteer.peopleRequired === 0) {
      issueToVolunteer.status = "Resolved";
    }

    const userIssues = JSON.parse(localStorage.getItem(issueToVolunteer.raisedBy)) || [];
    const updatedUserIssues = userIssues.map((issue) =>
      issue.text === issueToVolunteer.text ? issueToVolunteer : issue
    );
    localStorage.setItem(issueToVolunteer.raisedBy, JSON.stringify(updatedUserIssues));

    const updatedIssues = [...issues];
    updatedIssues[index] = issueToVolunteer;
    setIssues(updatedIssues.filter((issue) => issue.status === "Open"));
    setMyTasks((prev) => [...prev, issueToVolunteer]);
    setGlobalIssues(updatedIssues.filter((issue) => issue.status === "Open"));

    alert("You have successfully volunteered for this issue!");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#3CB371] text-white p-6 flex items-center">
          <FaHandHoldingHeart className="mr-4 text-4xl" />
          <h2 className="text-2xl font-bold">Resolve Community Issues</h2>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-4 text-[#333333] flex items-center">
            <FaHandHoldingHeart className="mr-3 text-[#4682B4]" />
            Available Issues
          </h3>
          {globalIssues.length === 0 ? (
            <p className="text-[#333333]">No issues available to resolve.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {globalIssues.map((issue, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 bg-[#F5F5DC] shadow-md hover:shadow-xl transition-all"
                >
                  {issue.photo && (
                    <img 
                      src={issue.photo} 
                      alt="Issue" 
                      className="mb-4 w-full h-48 object-cover rounded-lg" 
                    />
                  )}
                  <h4 className="text-lg font-bold text-[#333333] mb-2">{issue.text}</h4>
                  <p className="text-[#008080] mb-1">Location: {issue.location}</p>
                  <p className="text-[#333333] mb-2">{issue.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#4682B4] font-semibold">
                      People Required: {issue.peopleRequired}
                    </span>
                    <button
                      onClick={() => handleVolunteer(index)}
                      className="bg-[#008080] text-white px-4 py-2 rounded-md hover:bg-[#006666] transition-colors"
                    >
                      Volunteer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-[#333333] flex items-center">
              <FaTasks className="mr-3 text-[#4682B4]" />
              My Tasks
            </h3>
            <div className="bg-[#F5F5DC] rounded-lg">
              <table className="w-full">
                <thead className="bg-[#4682B4] text-white">
                  <tr>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myTasks.map((task, index) => (
                    <tr 
                      key={index} 
                      className="border-b last:border-b-0 hover:bg-[#D3D3D3]/30"
                    >
                      <td className="p-3 text-[#333333]">{task.text}</td>
                      <td className={`p-3 font-semibold ${
                        task.status === 'Resolved' ? 'text-[#3CB371]' : 'text-[#FFD700]'
                      }`}>
                        {task.status}
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
  );
};

export default IssueResolver;