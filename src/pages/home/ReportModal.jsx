import { useEffect, useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseIcon, CheckCircleIcon, ProcessingIcon } from "../../utils/icons";
import ReactWebcam from "react-webcam";
import axiosClient from "../../../axios-client";

export const ReportModal = ({ handleOpen, open }) => {
  const [formData, setFormData] = useState({
    Latitude: "",
    Longitude: "",
    Image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [locationStatus, setLocationStatus] = useState("pending");
  const [submitting, setSubmitting] = useState(false);

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
    setFormData({
      Latitude: "",
      Longitude: "",
      Image: null,
    });
    setImagePreview(null);
    setLocationStatus("pending");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        Image: file,
      }));
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.Image) {
      toast.error("Please upload an image.");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      setSubmitting(true);
      await axiosClient.post("/report", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Report submitted successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setSubmitting(false);
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

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">
                Image Preview:
              </p>
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 max-h-64 w-full rounded-md border"
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
