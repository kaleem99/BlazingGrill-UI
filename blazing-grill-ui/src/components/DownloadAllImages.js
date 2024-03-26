import React from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

import app from "../database/config";
const DownloadImages = () => {
  // Initialize Firebase app

  const handleDownloadImages = async () => {
    const storage = getStorage(app);
    const imagesRef = ref(storage, "files"); // Reference to the "images" folder

    try {
      // List all items in the "images" folder
      const { items } = await listAll(imagesRef);
      //   console.log(items);
      //   Download each image file
      const array = [];
      items.forEach(async (item) => {
        const imageUrl = await getDownloadURL(ref(storage, item.fullPath));
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        // console.log(imageUrl, item.name);
        array.push(new Array(item.name, imageUrl));
        // // Create a download link and trigger download
        // const link = document.createElement("a");
        // link.href = URL.createObjectURL(blob);
        // link.download = item.name;
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
      });
      console.log(array)
      alert("Images downloaded successfully!");
    } catch (error) {
      console.error("Error downloading images:", error);
      alert("Error downloading images. Please check the console for details.");
    }
  };

  return (
    <div>
      <button onClick={handleDownloadImages}>Download Images</button>
    </div>
  );
};

export default DownloadImages;
