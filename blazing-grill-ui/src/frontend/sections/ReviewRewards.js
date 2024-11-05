import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../database/config";
import React from "react";
function ReviewRewards({ adminUserEmail }) {
  const [rewardsData, setRewardsData] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  // Fetch data from Firestore "Rewards" collection
  const fetchRewards = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Rewards"));
      const rewardsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter out scanData where approved is false
      //   const filteredRewards = rewardsList
      //     .map((reward) => ({
      //       ...reward,
      //       scanData: reward.scanData.filter((item) => item.approved === false),
      //     }))
      //     .filter((reward) => reward.scanData.length > 0); // Keep only rewards with at least one unapproved item
      console.log(rewardsList);
      setRewardsData(rewardsList);
    } catch (error) {
      console.error("Error fetching rewards data:", error);
    }
  };
  useEffect(() => {
    fetchRewards();
  }, []);

  // Handle Approve Button Click
  const handleApprove = async (rewardId, scanItem) => {
    try {
      const rewardDocRef = doc(db, "Rewards", rewardId);
  
      // Find the reward data for the given email (rewardId)
      const emailData = rewardsData.find((data) => data.id === rewardId);
      let additionalPoints = 0; // Initialize cumulative points to add
  
      if (emailData) {
        // Map through the scanData to find and update the matching item
        const updatedScanData = emailData.items.map((item) => {
          if (item.name === scanItem.name && item.type === scanItem.type && !item.approved) {
            additionalPoints += item.points; // Add item points only if it’s not already approved
            return {
              ...item,
              approved: true, // Mark as approved
            };
          }
          return item; // Return item unchanged if it doesn’t match
        });
  
        // Update the reward document with the modified scanData and updated points
        await updateDoc(rewardDocRef, {
          items: updatedScanData,
          points: emailData.points + additionalPoints, // Add cumulative points to existing points
        });
  
        alert("Reward has been approved");
        await fetchRewards(); // Refresh data after update
      } else {
        console.error("Error: emailData not found.");
      }
    } catch (error) {
      console.error("Error approving reward:", error);
    }
  };
  

  // Handle Email Selection
  const handleEmailSelect = (email) => {
    setSelectedEmail(selectedEmail === email ? null : email);
  };
  const handleDecline = async (rewardId, scanItem) => {
    try {
      const rewardDocRef = doc(db, "Rewards", rewardId);

      // Find the reward data for the given email (rewardId)
      const emailData = rewardsData.find((data) => data.id === rewardId);

      if (emailData) {
        // Map through the scanData to find and update the matching item
        const updatedScanData = emailData.items.map((item) =>
          item.name === scanItem.name && item.type === scanItem.type
            ? {
                ...item,
                approved: true,
                reviewStars: item.reviewStars > 0 ? item.reviewStars - 1 : 0, // Decrement reviewStars, not below 0
              }
            : item
        );

        // Update the reward document with the modified scanData
        await updateDoc(rewardDocRef, { scanData: updatedScanData });

        alert(
          "Reward has been declined: reviewStars decremented and approved status set."
        );
        await fetchRewards();
      } else {
        console.error("Error: emailData not found.");
      }
    } catch (error) {
      console.error("Error declining reward:", error);
    }
  };

  return (
    <div className="ReviewRewards">
      <h2>Review Rewards</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#333", color: "white" }}>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {rewardsData.length > 0 ? (
            rewardsData.map((reward, index) => (
              <React.Fragment key={index}>
                {reward.items.length > 0 &&
                  reward.items.filter((data) => data.approved === false)
                    .length > 0 && (
                    <tr
                      style={{
                        borderBottom: "1px solid #ccc",
                        background: "#333",
                        color: "white",
                      }}
                    >
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEmailSelect(reward.email)}
                      >
                        {reward.email}
                      </td>
                      {selectedEmail === reward.email &&
                        reward.items.length > 0 && (
                          <td colSpan="6" style={{ padding: "0" }}>
                            {reward.items
                              .filter((data) => data.approved === false)
                              .map((item, idx) => (
                                <table
                                  key={idx}
                                  style={{
                                    width: "100%",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <thead>
                                    <th>Name</th>
                                    <th>Type</th>
                                    {/* <th>Stars</th> */}
                                    <th>Review Stars</th>
                                    <th>Images</th>
                                    <th>Actions</th>
                                  </thead>
                                  <tbody>
                                    <tr
                                      style={{
                                        borderBottom: "1px solid #ddd",
                                        background: "#333",
                                        color: "white",
                                      }}
                                    >
                                      <td>{item.name}</td>
                                      <td>{item.type}</td>
                                      {/* <td>{item.stars}</td> */}
                                      <td>{item.reviewStars}</td>
                                      <td>
                                        <img
                                          key={item.name}
                                          src={item.image}
                                          alt={`Reward Slip ${item.name + 1}`}
                                          style={{
                                            width: "50px",
                                            height: "auto",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            window.open(item.image, "_blank")
                                          }
                                        />
                                      </td>
                                      <td>
                                        <button
                                          onClick={() =>
                                            handleApprove(reward.id, item, idx)
                                          }
                                          style={{
                                            padding: "5px 10px",
                                            marginRight: "10px",
                                            backgroundColor: "#28a745",
                                            color: "#fff",
                                            border: "none",
                                            cursor: "pointer",
                                          }}
                                        >
                                          Approve
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleDecline(reward.id, item, idx)
                                          }
                                          style={{
                                            padding: "5px 10px",
                                            backgroundColor: "#dc3545", // Red color for decline
                                            color: "#fff",
                                            border: "none",
                                            cursor: "pointer",
                                          }}
                                        >
                                          Decline
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              ))}
                          </td>
                        )}
                    </tr>
                  )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No unapproved rewards found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewRewards;
