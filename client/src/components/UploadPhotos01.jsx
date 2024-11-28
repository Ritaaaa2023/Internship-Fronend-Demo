import React, { useState } from "react";

const CustomUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]); // Array to store uploaded files
  const [selectedFile, setSelectedFile] = useState(null); // File currently selected for preview

  // Handle file uploads
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    const filePreviews = files.map((file) => ({
      id: Math.random().toString(36).substring(7), // Unique ID
      file,
      preview: URL.createObjectURL(file), // Preview URL
    }));
    setUploadedFiles((prev) => [...prev, ...filePreviews]); // Append files to the existing array
  };

  // Handle file click (to preview)
  const handleFileClick = (file) => {
    setSelectedFile(file); // Set file for preview
  };

  // Confirm submission
  const confirmFile = () => {
    alert("File submitted successfully!");
    setUploadedFiles((prev) =>
      prev.filter((file) => file.id !== selectedFile.id)
    ); // Remove submitted file from the list
    setSelectedFile(null); // Exit preview
  };

  // Remove file
  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId)); // Remove file
  };

  // Cancel preview
  const cancelPreview = () => {
    setSelectedFile(null); // Exit preview
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-medium text-gray-800 text-center mb-4">
          Please upload your files.
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Upload one or more images from your device and manage them below.
        </p>

        {/* Preview Section */}
        {selectedFile ? (
          <div className="relative w-full h-64 border-4 border-blue-500 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 mb-4">
            <img
              src={selectedFile.preview}
              alt="Selected"
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-0 flex gap-4 p-2 bg-white bg-opacity-80 w-full justify-center">
              <button
                onClick={cancelPreview}
                className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmFile}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        ) : (
          // Image Grid
          <div className="grid grid-cols-2 gap-2 w-full h-64 border-4 border-blue-500 rounded-lg overflow-hidden p-2 bg-gray-100 mb-4">
            {uploadedFiles.length > 0 ? (
              uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => handleFileClick(file)} // Click handler
                  className="relative border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg"
                >
                  <img
                    src={file.preview}
                    alt="Uploaded"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 flex items-center justify-center text-white">
                    <p className="text-sm font-medium">Click to Preview</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    className="absolute top-2 right-2 text-sm bg-red-500 text-white px-2 py-1 rounded-full"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center m-auto">
                No images uploaded.
              </p>
            )}
          </div>
        )}

        {/* Upload Button */}
        {!selectedFile && (
          <label className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              multiple
              onChange={handleFileUpload}
            />
            Upload Photos
          </label>
        )}

        {/* Footer */}
        {!selectedFile && (
          <p className="text-xs text-gray-500 text-center mt-4">
            Photos must be JPEG or PNG, and between 100KB and 1MB in size.
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomUpload;
