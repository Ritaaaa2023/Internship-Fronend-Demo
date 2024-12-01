import React, { useEffect, useState } from "react";

const FormComponent = ({ formData, setFormData, onSave }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // Save form data to localStorage on change
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-[500px] h-[600px] overflow-y-auto">
      <form>
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
            className="w-full px-4 py-2   text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onSave}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
