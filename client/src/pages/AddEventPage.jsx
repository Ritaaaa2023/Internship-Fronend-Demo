import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import EventForm from "../components/EventForm";
import { saveFormData } from "../store/formSlice"; // Redux action
import CreateEvent from "../components/CreateEvent";

const AddEventPage = () => {
  const dispatch = useDispatch(); // Redux dispatch
  const navigate = useNavigate(); // For navigation

  const handleFormSubmit = (formData) => {
    // Save form data to Redux store
    dispatch(saveFormData(formData));

    // Navigate to the next step
    navigate("/scan-item");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="overflow-auto relative z-20">
        <Header title="Add Event > Basic Information" />
      </div>

      {/* Centered Form */}
      <div className="flex-1 flex items-center justify-center relative z-20 overflow-auto">
       <CreateEvent />
      </div>
    </div>
  );
};

export default AddEventPage;
