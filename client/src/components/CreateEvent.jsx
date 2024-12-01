import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FormComponent from "./FormComponent";
import CartList from "./CartList";
import ScanItem from "./ScanItem";
import { PDFDownloadLink } from "@react-pdf/renderer";
import EventInvoice from "./EventInvoice";

const CreateEvent = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Bendazac Lysine Eye Drops",
      description: "Atropine eye drops is currently the most effective ....",
      image: "https://via.placeholder.com/64",
      quantity: 2,
      unit: "Box",
    },
    {
      id: 2,
      name: "Poly Tears Eye Drops",
      description: "Moisturizing eye drops for dry eyes ....",
      image: "https://via.placeholder.com/64",
      quantity: 1,
      unit: "Bottle",
    },
  ]);

  const [formData, setFormData] = useState({
    eventName: "",
    doctorName: "",
    patientName: "",
    eventTime: "",
    surgeryRoom: "",
  });
  const [isFormPage, setIsFormPage] = useState(true); // Toggle between form and cart
  const [nurseName, setNurseName] = useState(""); // To capture nurse's name

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData")) || {};
    setFormData(savedData);
  }, []);

  const handleNextStep = () => {
    const requiredFields = [
      "eventName",
      "doctorName",
      "patientName",
      "eventTime",
      "surgeryRoom",
    ];
    if (requiredFields.every((field) => formData[field]?.trim() !== "")) {
      setIsFormPage(false);
      localStorage.setItem("formData", JSON.stringify(formData));
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleBack = () => {
    setIsFormPage(true);
  };

  const handleFinalSubmit = () => {
    if (!nurseName.trim()) {
      alert("Please enter your name before submitting.");
      return;
    }
    alert("Event Submitted!");
    console.log("Form Data:", formData);
    console.log("Cart Items:", cartItems);
    localStorage.removeItem("formData");
    setFormData({
      eventName: "",
      doctorName: "",
      patientName: "",
      eventTime: "",
      surgeryRoom: "",
    });
    setCartItems([]);
    setNurseName("");
    setIsFormPage(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div>
        {isFormPage ? (
          <div>
            <FormComponent
              formData={formData}
              setFormData={setFormData}
              onSave={() =>
                localStorage.setItem("formData", JSON.stringify(formData))
              }
            />
            <div className="flex justify-center gap-4 py-4">
              <motion.button
                animate={{ scale: 1.1 }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                onClick={handleNextStep}
                className="w-40 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                Next Step
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="min-h-screen flex bg-gray-100">
            <div className="w-1/2">
              <ScanItem />
            </div>
            <div className="min-h-screen w-1/2 bg-gray-50 p-6 border-l flex-1 overflow-auto relative z-10">
              <CartList
                cartItems={cartItems}
                updateQuantity={(id, newQuantity) =>
                  setCartItems((prev) =>
                    prev.map((item) =>
                      item.id === id ? { ...item, quantity: newQuantity } : item
                    )
                  )
                }
                removeItem={(id) =>
                  setCartItems((prev) => prev.filter((item) => item.id !== id))
                }
              />
              <div className="mt-6">
                <label
                  htmlFor="nurseName"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Nurse Name
                </label>
                <input
                  type="text"
                  id="nurseName"
                  value={nurseName}
                  onChange={(e) => setNurseName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleBack}
                  className="w-40 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                >
                  Back
                </button>
                <PDFDownloadLink
                  document={
                    <EventInvoice
                      formData={formData}
                      cartItems={cartItems}
                      nurseName={nurseName}
                    />
                  }
                  fileName="event-confirmation.pdf"
                  className={`w-40 py-2 text-white font-semibold rounded-lg text-center ${
                    nurseName.trim()
                      ? "bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  disabled={!nurseName.trim()}
                >
                  {({ loading }) => (loading ? "Loading PDF..." : "Save PDF")}
                </PDFDownloadLink>
                <button
                  onClick={handleFinalSubmit}
                  className={`w-40 py-2 font-semibold rounded-lg text-center ${
                    nurseName.trim()
                      ? "bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      : "bg-gray-300 text-gray-800 cursor-not-allowed"
                  }`}
                  disabled={!nurseName.trim()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
