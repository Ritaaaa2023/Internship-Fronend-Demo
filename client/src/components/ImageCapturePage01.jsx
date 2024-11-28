import React, { useState } from "react";
import TakePicture from "./TakePicture";
import UploadPhotos from "./UploadPhotos";

const ImageCapturePage = () => {
  const [currentMode, setCurrentMode] = useState(null); // "take" or "upload"
  const [submittedImages, setSubmittedImages] = useState([]);

  const handleConfirm = (image) => {
    setSubmittedImages((prev) => [...prev, image]);
    setCurrentMode(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-medium text-gray-800 text-center mb-4">
          Please upload or take a picture.
        </h2>
        {currentMode === "take" ? (
          <TakePicture
            onConfirm={handleConfirm}
            onCancel={() => setCurrentMode(null)}
          />
        ) : currentMode === "upload" ? (
          <UploadPhotos onConfirm={handleConfirm} />
        ) : (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setCurrentMode("take")}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Take a Picture
            </button>
            <button
              onClick={() => setCurrentMode("upload")}
              className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Upload Photos
            </button>
          </div>
        )}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Submitted Images:
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {submittedImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Submitted ${index}`}
                className="border border-gray-300 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCapturePage;
