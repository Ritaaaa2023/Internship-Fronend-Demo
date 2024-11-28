import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const TakePicture = () => {
  const webcamRef = useRef(null); // Webcam reference
  const [imgSrc, setImgSrc] = useState(null); // Captured image
  const [isUploading, setIsUploading] = useState(false); // Simulated uploading state
  const [isMirrored, setIsMirrored] = useState(false); // Mirror toggle

  // Capture picture from webcam
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc); // Save captured image
  }, []);

  // Confirm photo (simulate upload)
  const confirm = () => {
    setIsUploading(true);
    setTimeout(() => {
      alert("Image uploaded successfully!");
      setImgSrc(null); // Clear captured image after upload
      setIsUploading(false); // Reset to the initial state
    }, 1500); // Simulate network delay
  };

  // Cancel operation and return to initial state
  const cancel = () => {
    setImgSrc(null); // Clear captured image
  };

  // Retake photo
  const retake = () => {
    setImgSrc(null); // Clear captured image and reopen webcam
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-medium text-gray-800 text-center mb-4">
          Take a Picture
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Use your webcam to take a picture for upload.
        </p>

        {/* Webcam or Captured Image Frame */}
        <div className="relative w-full h-64 border-4 border-blue-500 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 mb-4">
          {!imgSrc ? (
            <Webcam
              ref={webcamRef}
              mirrored={isMirrored}
              screenshotFormat="image/jpeg"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img
              src={imgSrc}
              alt="Captured"
              className="absolute inset-0 w-full h-full object-contain"
            />
          )}
        </div>

        {/* Controls */}
        {!imgSrc ? (
          <div className="flex gap-4 mt-4">
            <button
              onClick={cancel}
              className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={capture}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Capture
            </button>
            <div className="flex items-center ml-4">
              <label className="text-gray-700 mr-2">Mirror:</label>
              <input
                type="checkbox"
                checked={isMirrored}
                onChange={() => setIsMirrored(!isMirrored)}
                className="w-4 h-4"
              />
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={retake}
              className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Retake
            </button>
            <button
              onClick={confirm}
              className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Confirm"}
            </button>
            <button
              onClick={cancel}
              className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakePicture;
