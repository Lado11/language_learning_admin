import React, { useState } from "react";
import "./voic-upload-style.css";
import voicUploadIcon from "../../../../../../assets/images/upload-voice-icon.svg";

export const VoiceUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("voice", file);

    // try {
    //   setUploadStatus("Uploading...");
    //   const response = await axios.post("/api/upload", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   setUploadStatus("Upload successful!");
    //   console.log(response.data);
    // } catch (error) {
    //   setUploadStatus("Upload failed!");
    //   console.error(error);
    // }
  };

  // const triggerFileInput = () => {
  //   document.getElementById("voiceUpload").click();
  // };

  return (
    <div className="voice-upload-container">
      <div className="voice-upload-box">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          id="voiceUpload"
          style={{ display: "none" }}
        />
        <label htmlFor="voiceUpload" className="voice-upload-label">
          <div className="voice-upload-text">Voice Upload </div>
          <img src={voicUploadIcon} />
        </label>
      </div>
    </div>
  );
};
