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
      const filteredRewards = rewardsList
        .map((reward) => ({
          ...reward,
          scanData: reward.scanData.filter((item) => item.approved === false),
        }))
        .filter((reward) => reward.scanData.length > 0); // Keep only rewards with at least one unapproved item

      setRewardsData(filteredRewards);
    } catch (error) {
      console.error("Error fetching rewards data:", error);
    }
  };
  useEffect(() => {
    fetchRewards();
  }, []);

  // Handle Approve Button Click
  const handleApprove = async (rewardId, scanItem, scanIndex) => {
    try {
      const rewardDocRef = doc(db, "Rewards", rewardId);

      // Create a copy of the scanData with the updated values
      const updatedScanData = rewardsData.map((reward) =>
        reward.id === rewardId
          ? {
              ...reward,
              scanData: reward.scanData.map((item, idx) =>
                idx === scanIndex
                  ? {
                      ...item,
                      approved: true,
                      stars: item.reviewStars || 0, // Ensure stars is not undefined
                    }
                  : item
              ),
            }
          : reward
      );

      // Find the updated reward
      const updatedReward = updatedScanData.find(
        (reward) => reward.id === rewardId
      );

      // Ensure scanData is well-defined before updating the document
      if (updatedReward && updatedReward.scanData) {
        await updateDoc(rewardDocRef, { scanData: updatedReward.scanData });
        // setRewardsData(updatedScanData);
        alert("Reward has been approved");
        await fetchRewards();
      } else {
        console.error("Error: scanData is undefined or invalid.");
      }
    } catch (error) {
      console.error("Error approving reward:", error);
    }
  };

  // Handle Email Selection
  const handleEmailSelect = (email) => {
    setSelectedEmail(selectedEmail === email ? null : email);
  };
  const handleDecline = async (rewardId, scanItem, scanIndex) => {
    try {
      const rewardDocRef = doc(db, "Rewards", rewardId);

      // Create a copy of the scanData with the updated values
      const updatedScanData = rewardsData.map((reward) =>
        reward.id === rewardId
          ? {
              ...reward,
              scanData: reward.scanData.map((item, idx) =>
                idx === scanIndex
                  ? {
                      ...item,
                      approved: true,
                      reviewStars:
                        item.reviewStars > 0 ? item.reviewStars - 1 : 0, // Decrement reviewStars, but not below 0
                    }
                  : item
              ),
            }
          : reward
      );

      // Find the updated reward
      const updatedReward = updatedScanData.find(
        (reward) => reward.id === rewardId
      );

      // Ensure scanData is well-defined before updating the document
      if (updatedReward && updatedReward.scanData) {
        await updateDoc(rewardDocRef, { scanData: updatedReward.scanData });
        setRewardsData(updatedScanData);
        alert(
          "Reward has been updated: reviewStars decremented and approved status set."
        );
      } else {
        console.error("Error: scanData is undefined or invalid.");
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
                    reward.scanData.length > 0 && (
                      <td colSpan="6" style={{ padding: "0" }}>
                        {reward.scanData.map((item, idx) => (
                          <table
                            key={idx}
                            style={{ width: "100%", marginBottom: "10px" }}
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
                                  {reward.imageUrl &&
                                    reward.imageUrl.length > 0 && (
                                      <div
                                        style={{
                                          display: "flex",
                                          flexWrap: "wrap",
                                          gap: "10px",
                                        }}
                                      >
                                        {reward.imageUrl.map((url, imgIdx) => (
                                          <img
                                            key={imgIdx}
                                            src={url}
                                            alt={`Reward Slip ${imgIdx + 1}`}
                                            style={{
                                              width: "50px",
                                              height: "auto",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              window.open(url, "_blank")
                                            }
                                          />
                                        ))}
                                      </div>
                                    )}
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
