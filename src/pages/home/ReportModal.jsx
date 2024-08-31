import { useEffect, useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseIcon, CheckCircleIcon, ProcessingIcon } from "../../utils/icons";
import ReactWebcam from "react-webcam";
import axiosClient from "../../../axios-client";

export const ReportModal = ({ handleOpen, open }) => {
  const initialFormData = {
    Animal: "",
    Age: "",
    Injured: "",
    Latitude: "",
    Longitude: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [locationStatus, setLocationStatus] = useState("pending");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setLocationStatus("pending");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prevData) => ({
            ...prevData,
            Latitude: latitude.toString(),
            Longitude: longitude.toString(),
          }));
          setLocationStatus("success");
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Failed to get location.");
          setLocationStatus("error");
        },
      );
    }
  }, [open]);

  const handleClose = () => {
    handleOpen();
    setCameraOpen(false);
    setFormData(initialFormData);
    setLocationStatus("pending");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = (data) => {
    const errors = {};
    if (!data.Animal) {
      errors.Name = "Name is required.";
    }
    if (!data.Injured) {
      errors.Injured = "Status is required.";
    }
    if (!data.Age) {
      errors.Age = "Age is required.";
    }
    console.log(errors);
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateErrors = validate(formData);
    setErrors(validateErrors);
    console.log(validateErrors);
    if (Object.keys(validateErrors).length === 0) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      try {
        setSubmitting(true);
        const response = await axiosClient.post("/report", formData, {});
        toast.success("Pet added successfully!");
        handleClose();
      } catch (error) {
        toast.error("Failed to add pet. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleClose}
        className="overflow-x-hidden overflow-y-scroll rounded-[10px] bg-white font-poppins shadow-none scrollbar-hide"
      >
        <div className="mx-auto h-[4/5] w-full max-w-[100%] rounded-sm p-5">
          <div className="align-center flex justify-between border-b border-[#64728C] border-opacity-15">
            <div className="pb-4 font-poppins text-[16px] font-medium leading-8 text-[#64728C] md:text-[20px] md:leading-[30px]">
              Report an Animal
            </div>
            <div
              className="cursor-pointer text-[20px] font-bold"
              onClick={handleClose}
            >
              <CloseIcon />
            </div>
          </div>

          <div className="mt-4">
            <input
              type="text"
              name="Animal"
              placeholder="Animal Type"
              value={formData.Animal}
              onChange={handleInputChange}
              className="mb-4 w-full rounded-md border border-gray-300 p-2"
            />
            <input
              type="text"
              name="Age"
              placeholder="Age (years)"
              value={formData.Age}
              onChange={handleInputChange}
              className="mb-4 w-full rounded-md border border-gray-300 p-2"
            />
            <select
              name="Injured"
              value={formData.Injured}
              onChange={handleInputChange}
              className="mb-4 w-full rounded-md border border-gray-300 p-2"
            >
              <option value="">Is the animal injured?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="mt-4 text-center">
            {locationStatus === "pending" && (
              <p className="text-yellow-500">
                Please allow location access to proceed.
              </p>
            )}
            {locationStatus === "success" && (
              <div className="flex items-center justify-center gap-3 text-green-500">
                <CheckCircleIcon className="mr-2" />
                <span>Location retrieved successfully!</span>
              </div>
            )}
            {locationStatus === "error" && (
              <p className="text-red-500">
                Unable to retrieve location. Please try again.
              </p>
            )}
          </div>

          {cameraOpen && (
            <div className="mt-4 flex justify-center">
              <ReactWebcam
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  facingMode: "environment",
                }}
                className="h-auto w-full rounded-md"
              />
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-500 p-2 text-white"
            >
              {submitting && <ProcessingIcon />}
              Submit Report
            </button>
          </div>
        </div>
      </Dialog>
      <ToastContainer autoClose={1500} />
    </>
  );
};
