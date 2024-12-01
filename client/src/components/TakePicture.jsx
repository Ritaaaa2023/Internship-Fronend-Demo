import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";

const TakePicture = () => {
  const webcamRef = useRef(null); // Webcam reference
  const [imgSrc, setImgSrc] = useState(null); // Captured image
  const [isUploading, setIsUploading] = useState(false); // Simulated uploading state
  const [isMirrored, setIsMirrored] = useState(true); // Mirror toggle
  const [isWebcamOpen, setIsWebcamOpen] = useState(false); // Webcam open state
  const [isAnimating, setIsAnimating] = useState(true); // Animation toggle state

  // Capture picture from webcam
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc); // Save captured image
    setIsWebcamOpen(false); // Close webcam after capture
  }, []);

  // Confirm photo (simulate upload)
  const confirm = () => {
    setIsUploading(true);
    setTimeout(() => {
      alert("Image uploaded successfully!");
      setImgSrc(null); // Clear captured image
      setIsWebcamOpen(true); // Reopen webcam for next capture
      setIsUploading(false); // Reset upload state
    }, 1500); // Simulate network delay
  };

  // Cancel operation and return to the initial state
  const cancel = () => {
    setImgSrc(null); // Clear captured image
    setIsWebcamOpen(false); // Close webcam
  };

  // Retake photo
  const retake = () => {
    setImgSrc(null); // Clear captured image
    setIsWebcamOpen(true); // Reopen webcam
  };

  return (
    <div className="flex flex-col items-center justify-start  bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 relative">
        {/* Fixed Image Frame */}
        <div className="relative w-[500px] h-[300px] border-4 border-blue-500 rounded-lg overflow-hidden bg-gray-100 mb-4">
          {!imgSrc && isWebcamOpen ? (
            <Webcam
              ref={webcamRef}
              mirrored={isMirrored}
              screenshotFormat="image/jpeg"
              className="absolute inset-0 w-full h-full object-cover"
              videoConstraints={{
                width: 1920,
                height: 1080,
                facingMode: "environment",
              }}
            />
          ) : imgSrc ? (
            <img
              src={imgSrc}
              alt="Captured"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col justify-center items-center h-full w-full text-gray-500 text-center space-y-4">
              <p>Click "Take a Picture" to start.</p>
              <p>Ensure your object fits inside the frame.</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="text-center items-center justify-center">
          {!isWebcamOpen && !imgSrc && (
            <motion.button
              animate={isAnimating ? { scale: 1.1 } : { scale: 1 }} // Conditionally apply animation
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: isAnimating ? Infinity : 0, // Stop repeating when animation is off
              }}
              onHoverStart={() => setIsAnimating(false)} // Stop animation on hover
              onHoverEnd={() => setIsAnimating(true)}
              onClick={() => setIsWebcamOpen(true)}
              className="py-2 px-20 bg-blue-500  text-white rounded-lg hover:bg-blue-600"
            >
              Take a Picture
            </motion.button>
          )}
        </div>
        {isWebcamOpen && !imgSrc && (
          <div className="flex gap-4 justify-center">
            <div className="flex items-center">
              <label className="text-gray-700 mr-2">Mirror:</label>
              <input
                type="checkbox"
                checked={isMirrored}
                onChange={() => setIsMirrored(!isMirrored)}
                className="w-4 h-4"
              />
            </div>
            <button
              onClick={cancel}
              className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <motion.button
              animate={isAnimating ? { scale: 1.1 } : { scale: 1 }} // Conditionally apply animation
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: isAnimating ? Infinity : 0, // Stop repeating when animation is off
              }}
              onHoverStart={() => setIsAnimating(false)} // Stop animation on hover
              onHoverEnd={() => setIsAnimating(true)}
              onClick={capture}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Capture
            </motion.button>
          </div>
        )}
        {imgSrc && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={cancel}
              className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={retake}
              className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Retake
            </button>
            <motion.button
              animate={isAnimating ? { scale: 1.1 } : { scale: 1 }} // Conditionally apply animation
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: isAnimating ? Infinity : 0, // Stop repeating when animation is off
              }}
              onHoverStart={() => setIsAnimating(false)} // Stop animation on hover
              onHoverEnd={() => setIsAnimating(true)}
              onClick={confirm}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Confirm"}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakePicture;
