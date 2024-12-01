import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScanItem from "./ScanItem";


const EventForm = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    doctorName: "",
    patientName: "",
    eventTime: "",
    surgeryRoom: "",
  });
  const [cart, setCart] = useState([]); // Cart for items
  const [isFormPage, setIsFormPage] = useState(true); // Toggle between form and cart pages

  // Load saved data on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData")) || {};
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setFormData(savedData);
    setCart(savedCart);
  }, []);

  // Save form and cart data to localStorage
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [formData, cart]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form
  const validateForm = () => {
    const requiredFields = [
      "eventName",
      "doctorName",
      "patientName",
      "eventTime",
      "surgeryRoom",
    ];
    return requiredFields.every((field) => formData[field]?.trim() !== "");
  };

  // Add item to cart
  const addItemToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  // Remove item from cart
  const removeItemFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Next Step
  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsFormPage(false); // Switch to item selection page
    } else {
      alert("Please fill in all required fields before proceeding.");
    }
  };

  // Handle Final Submission
  const handleFinalSubmit = () => {
    alert("Event and Cart Submitted!");
    console.log("Form Data:", formData);
    console.log("Cart Items:", cart);
    // Reset everything
    setFormData({
      eventName: "",
      doctorName: "",
      patientName: "",
      eventTime: "",
      surgeryRoom: "",
    });
    setCart([]);
    localStorage.removeItem("formData");
    localStorage.removeItem("cart");
  };

  return (
    <div className=" flex items-center justify-center p-4">
   
        <div className="bg-white p-10 rounded-lg shadow-lg w-[800px] h-[700px] overflow-y-auto">
        {isFormPage ? (
          <form onSubmit={handleNextStep}>
            {/* Event Name */}
            <div className="mb-4">
              <label
                htmlFor="eventName"
                className="block text-gray-700 font-medium mb-2"
              >
                Event Name
              </label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Surgery A"
                required
              />
            </div>

            {/* Doctor Name */}
            <div className="mb-4">
              <label
                htmlFor="doctorName"
                className="block text-gray-700 font-medium mb-2"
              >
                Doctor Name
              </label>
              <input
                type="text"
                id="doctorName"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                className="w-full px-4 py-2  text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Tom Jeckson"
                required
              />
            </div>

            {/* Patient Name */}
            <div className="mb-4">
              <label
                htmlFor="patientName"
                className="block text-gray-700 font-medium mb-2"
              >
                Patient Name
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                className="w-full px-4 py-2  text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Hellson Poem"
                required
              />
            </div>

            {/* Surgery Room */}
            <div className="mb-4">
              <label
                htmlFor="surgeryRoom"
                className="block text-gray-700 font-medium mb-2"
              >
                Surgery Room
              </label>
              <select
                id="surgeryRoom"
                name="surgeryRoom"
                value={formData.surgeryRoom}
                onChange={handleChange}
                className="w-full px-4 py-2  text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Select a room
                </option>
                <option value="Surgery A">Surgery A</option>
                <option value="Surgery B">Surgery B</option>
                <option value="Surgery C">Surgery C</option>
                <option value="Surgery D">Surgery D</option>
              </select>
            </div>

            {/* Event Time */}
            <div className="mb-6">
              <label
                htmlFor="eventTime"
                className="block text-gray-700 font-medium mb-2"
              >
                Event Time
              </label>
              <input
                type="datetime-local"
                id="eventTime"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleChange}
                className="w-full px-4 py-2  text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          

            {/* Submit Buttons */}
            <div className="flex justify-center gap-4 py-4">
              <button
                className="w-40 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none text-center"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.setItem("formData", JSON.stringify(formData));
                  alert("Form Saved!");
                }}
              >
                Save
              </button>
              <motion.button
                animate={{ scale: 1.1 }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                type="submit"
                className="w-40 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none text-center"
              >
                Next Step
              </motion.button>
            </div>
          
          </form>
            
        ) : (
          <div>
            <ScanItem />

            <button
              onClick={handleFinalSubmit}
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
 
  );
};

export default EventForm;
