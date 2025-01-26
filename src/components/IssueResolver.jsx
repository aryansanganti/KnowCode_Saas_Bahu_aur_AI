import { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import Navbar from "./Navbar";
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import img7 from '../assets/7.jpg';
import img8 from '../assets/8.jpg';
import img9 from '../assets/9.jpg';
import img10 from '../assets/10.jpg';


const sustainabilityData =[
  {
    "id": 1,
    "location": "Bali, Indonesia",
    "photo": img10,
    "issue": "Plastic Pollution",
    "description": "Bali's pristine beaches are increasingly plagued by plastic waste, affecting marine life and tourism. Efforts are underway to reduce single-use plastics and promote recycling initiatives."
  },
  {
    "id": 2,
    "location": "Cape Town, South Africa",
    "photo": img9,
    "issue": "Water Scarcity",
    "description": "Cape Town experienced a severe water crisis, 'Day Zero,' highlighting the need for sustainable water management practices and public awareness about water conservation."
  },
  {
    "id": 3,
    "location": "Amazon Rainforest, Brazil",
    "photo": img8,
    "issue": "Deforestation",
    "description": "The Amazon rainforest faces significant deforestation due to illegal logging and agriculture, threatening biodiversity and contributing to climate change."
  },
  {
    "id": 4,
    "location": "Delhi, India",
    "photo": img7,
    "issue": "Air Pollution",
    "description": "Delhi frequently faces hazardous air quality levels due to vehicular emissions, industrial activities, and crop burning, impacting public health."
  },
  {
    "id": 5,
    "location": "Great Barrier Reef, Australia",
    "photo": img6,
    "issue": "Coral Bleaching",
    "description": "Rising ocean temperatures and pollution are causing coral bleaching in the Great Barrier Reef, threatening marine ecosystems and biodiversity."
  },
  {
    "id": 6,
    "location": "Arctic Circle",
    "photo": img5,
    "issue": "Glacial Melting",
    "description": "The Arctic is experiencing rapid ice melting due to global warming, leading to rising sea levels and habitat loss for polar species."
  },
  {
    "id": 7,
    "location": "Tokyo, Japan",
    "photo": img4,
    "issue": "Electronic Waste",
    "description": "Tokyo faces challenges in managing electronic waste as the city's tech-driven population generates large amounts of discarded gadgets."
  },
  {
    "id": 8,
    "location": "Nairobi, Kenya",
    "photo": img3,
    "issue": "Improper Waste Management",
    "description": "Nairobi's growing population struggles with inadequate waste management systems, leading to environmental degradation and health concerns."
  },
  {
    "id": 9,
    "location": "Venice, Italy",
    "photo": img2,
    "issue": "Flooding and Rising Sea Levels",
    "description": "Venice faces frequent flooding due to rising sea levels, endangering its historic architecture and the livelihoods of its residents."
  },
  {
    "id": 10,
    "location": "Beijing, China",
    "photo": img1,
    "issue": "Smog and Industrial Pollution",
    "description": "Beijing's rapid industrialization has led to severe smog, affecting visibility, public health, and overall quality of life."
  }
];

const IssueResolver = () => {
  const { user } = useFirebase();
  const username = user?.displayName || user?.email;
  const [issues, setIssues] = useState([]);
  const [wallets, setWallets] = useState({});
  const [currentDataIndex, setCurrentDataIndex] = useState(0);

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

  useEffect(() => {
    // Cycle through sustainability data every 5 seconds
    const interval = setInterval(() => {
      setCurrentDataIndex((prevIndex) => (prevIndex + 1) % sustainabilityData.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
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

  const liveData = sustainabilityData[currentDataIndex];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b pt-2 from-[#EFE3C2] to-[#85A947] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="flex gap-6 max-w-6xl mx-auto">
          {/* Main Issue Resolver Section */}
          <div className="w-3/4 bg-[#85A947] rounded-xl shadow-lg overflow-hidden">
            <div className="bg-[#3E7B27] text-[#EFE3C2] p-6 flex items-center">
              <h2 className="text-2xl font-bold">Resolve Community Issues</h2>
            </div>
            <div className="p-6">
              {issues.length === 0 ? (
                <p className="text-center text-[#123524]">
                  No issues available to resolve.
                </p>
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
                        <tr
                          key={index}
                          className="border-b last:border-b-0 hover:bg-[#85A947]/30"
                        >
                          <td className="p-3 text-[#123524]">{issue.text}</td>
                          
                          <td className="p-3 text-[#123524]">
                            {issue.location}
                          </td>
                          <td
                            className={`p-3 font-semibold ${
                              issue.status === "Resolved"
                                ? "text-[#3E7B27]"
                                : "text-[#123524]"
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

          {/* Live Data Section */}
          <div className="w-1/4 bg-[#EFE3C2] rounded-xl shadow-lg p-4">
            <h3 className="text-xl font-bold text-[#3E7B27] mb-4">
              Live Data from the World
            </h3>
            {liveData ? (
              <div className="text-center">
                <img
                  src={liveData.photo}
                  alt={liveData.issue}
                  className="w-full h-40  rounded-lg mb-4"
                />
                <h4 className="font-bold text-lg text-[#123524]">
                  {liveData.location}
                </h4>
                <p className="text-sm text-[#123524]">{liveData.issue}</p>
              </div>
            ) : (
              <p className="text-[#123524]">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueResolver;