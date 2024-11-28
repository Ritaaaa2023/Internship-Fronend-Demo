import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

const TakePicture = ({ onConfirm, onCancel }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isMirrored, setIsMirrored] = useState(false);

  // Capture image
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, []);

  // Confirm submission
  const confirm = () => {
    if (imgSrc) {
      onConfirm(imgSrc); // Pass image to parent component
    }
  };

  return (
    <div>
      <div className="relative w-full h-64 border-4 border-blue-500 rounded-lg overflow-hidden flex items-center justify-start bg-gray-100 mb-4">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="Captured"
            className="w-full h-full object-contain"
          />
        ) : (
          <Webcam
            ref={webcamRef}
            mirrored={isMirrored}
            screenshotFormat="image/jpeg"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex gap-4">
        {!imgSrc ? (
          <>
            <button
              onClick={onCancel}
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
          </>
        ) : (
          <>
            <button
              onClick={() => setImgSrc(null)}
              className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Retake
            </button>
            <button
              onClick={confirm}
              className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Confirm
            </button>
            <button
              onClick={onCancel}
              className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TakePicture;
