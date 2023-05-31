import React, { useState } from "react";

const MenuSection = ({ storeDetails }) => {
  const [image, setImage] = useState(null);
  const [section, setSection] = useState("");
  const uploadImage = async (data) => {
    try {
      const fetchedResult = await fetch(
        `https://api.github.com/repos/kaleem99/The-Blazing-Grill-Images/contents/${section}.png`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      const imageSHA = await fetchedResult.json();
      const response = await fetch(
        `https://api.github.com/repos/kaleem99/The-Blazing-Grill-Images/contents/${data.name}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({
            message: "upload image from api",
            content: data.content,
            sha: imageSHA.sha,
          }),
        }
      );
      const res = await response.json();

      let message = "";
      if (res.message) {
        message = res.message;
        console.log(res);
      } else {
        message = `upload success: <a href="${res.content.html_url}">${res.content.html_url}</a>`;
      }
      console.log("res", res);
      document.querySelector(".log").innerHTML = message;
    } catch (error) {
      console.error(error);
    }
  };

  const getRandomName = (type) => {
    if (type.endsWith("png")) {
      return [Date.now(), ".png"].join("");
    }
    return [Date.now(), ".jpeg"].join("");
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const srcData = fileReader.result;
        resolve(srcData);
      };
      fileReader.readAsDataURL(blob);
    });
  };

  const parseClipboardData = async (callback) => {
    try {
      const items = await navigator.clipboard.read();
      for (let item of items) {
        for (let type of item.types) {
          if (type.startsWith("image/")) {
            console.log("item-->: ", item);
            item
              .getType(type)
              .then(blobToBase64)
              .then((srcData) => {
                callback &&
                  callback({
                    content: srcData,
                    name: getRandomName(type),
                    type: type,
                  });
              });
            return true;
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (callback) => {
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        blobToBase64(selectedFile).then((srcData) => {
          callback &&
            callback({
              content: srcData,
              name: selectedFile.name,
              type: selectedFile.type,
            });
        });
      }
    };

    const handlePasteClick = () => {
      parseClipboardData(callback);
    };

    return { handleFileChange, handlePasteClick };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!image) {
      alert("Image is empty, please select or paste");
      return;
    }
    if (section === "") {
      return alert("Please select a section that you would like to change");
    }
    const formData = new FormData(event.target);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
      console.log(value);
    }
    console.log(image);
    image.name = section + ".png";
    uploadImage({
      ...data,
      ...image,
    });
  };

  const { handleFileChange, handlePasteClick } = handleImageChange(
    (imageInfo) => {
      setImage({
        ...imageInfo,
        content: imageInfo.content.split("base64,")[1],
      });
    }
  );
  const handleChange = () => {};
  const MenuItemsSection = [
    "Burgers",
    "Grilled Chicken",
    "Fries",
    "Wings",
    "On A Roll",
    "Pizza",
    "Specials",
    "Sauces",
    "Drinks",
    "Air Fryer Pizza",
    "Grills",
  ];
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        {/* Form inputs */}
        <select
          name="category"
          id="category"
          onChange={(e) => setSection(e.target.value)}
        >
          <option value="None">Category</option>
          {MenuItemsSection.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input type="file" className="local" onChange={handleFileChange} />
        {/* <button type="button" className="paste" onClick={handlePasteClick}>
          Paste
        </button> */}

        <button type="submit">Submit</button>
      </form>

      {/* Image container */}

      {/* Log */}
      <div className="log"></div>
    </div>
  );
};

export default MenuSection;
