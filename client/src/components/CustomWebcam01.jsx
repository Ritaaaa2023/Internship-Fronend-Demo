import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const CustomImageHandler = () => {
  const webcamRef = useRef(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isMirrored, setIsMirrored] = useState(false);

  // Capture image from webcam
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setIsWebcamOpen(false);
  }, []);

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedFiles((prev) => [...prev, { src: event.target.result }]);
      };
      reader.readAsDataURL(file);
      return reader;
    });
  };

  // Simulate upload to S3
  const confirm = (index) => {
    setIsUploading(true);
    setTimeout(() => {
      alert("Image uploaded successfully to S3!");
      if (index !== null) {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
      } else {
        setImgSrc(null);
      }
      setIsUploading(false);
    }, 1500);
  };

  // Remove an uploaded image
  const remove = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Cancel operation
  const cancel = () => {
    setImgSrc(null);
    setSelectedImageIndex(null);
    setIsWebcamOpen(false);
  };

  // Retake photo
  const retake = () => {
    setImgSrc(null);
    setIsWebcamOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-medium text-gray-800 text-center mb-4">
          Please upload or take a picture.
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Snap a picture using your webcam or upload an image from your device.
        </p>

        {/* Frame for preview */}
        <div className="relative w-full h-64 border-4 border-blue-500 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 mb-4">
          {isWebcamOpen ? (
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className={`absolute inset-0 w-full h-full object-cover ${
                isMirrored ? "transform scale-x-[-1]" : ""
              }`}
            />
          ) : imgSrc ? (
            <img
              src={imgSrc}
              alt="Preview"
              className={`absolute inset-0 w-full h-full object-contain ${
                isMirrored ? "transform scale-x-[-1]" : ""
              }`}
            />
          ) : uploadedFiles.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 w-full h-full p-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative w-full h-32 border-2 border-gray-300 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={file.src}
                    alt={`Uploaded ${index}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(index);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No image selected.</p>
          )}
        </div>

        {/* Buttons for Webcam */}
        {!imgSrc && !isWebcamOpen && (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setIsWebcamOpen(true)}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Take a Picture
            </button>
            <label className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
              Upload Photos
            </label>
          </div>
        )}

        {/* Controls for Webcam */}
        {isWebcamOpen && (
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
        )}

        {/* Controls for Preview */}
        {(imgSrc || selectedImageIndex !== null) && (
          <div className="flex gap-4 mt-4">
            <button
              onClick={retake}
              className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Retake/Upload Again
            </button>
            <button
              onClick={() => confirm(selectedImageIndex)}
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

export default CustomImageHandler;
