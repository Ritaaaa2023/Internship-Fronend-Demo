import React, { useState } from "react";
import TakePicture from "./TakePicture";
import UploadPhotos from "./UploadPhotos";

const ImageCapturePage = () => {
  const [currentMode, setCurrentMode] = useState(null); // "take" or "upload"
  const [submittedImages, setSubmittedImages] = useState([]); // 所有提交的图片

  const handleConfirm = (image) => {
    setSubmittedImages((prev) => [...prev, image]); // 将提交的图片添加到列表
    setCurrentMode(null); // 返回主页面
  };

  const handleCancel = () => {
    setCurrentMode(null); // 返回主页面
  };

  return (
    <div>
      {/* 如果不是主页面，则显示 Return 按钮 */}
      {currentMode && (
        <div className="absolute top-4 left-4">
          <button
            onClick={() => setCurrentMode(null)} // 返回主页面
            className="fixed top-4 left-4 py-2 px-4 bg-sky-400 text-red-500 rounded-lg hover:bg-gray-600 justify-center"
          >
            Return
          </button>
        </div>
      )}

      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 text-center mb-4">
            Please upload or take a picture.
          </h2>

          {/* 模式切换 */}
          {currentMode === "take" ? (
            <TakePicture onConfirm={handleConfirm} onCancel={handleCancel} />
          ) : currentMode === "upload" ? (
            <UploadPhotos onConfirm={handleConfirm} onCancel={handleCancel} />
          ) : (
            // 主页面按钮
            <div className="flex flex-col gap-4 items-start">
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

          {/* 显示提交的图片 */}
          {!currentMode && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Submitted Images:
              </h3>
              <div className="grid grid-cols-2 gap-2 border-4 border-blue-500 p-4 rounded-lg">
                {submittedImages.length > 0 ? (
                  submittedImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Submitted ${index}`}
                      className="border border-gray-300 rounded-lg"
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center col-span-2">
                    No images submitted.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCapturePage;
