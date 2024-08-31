import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputItem } from "../components/global/InputItem";
import { useNavigate } from "react-router-dom";
import signUpImage from "../assets/images/sign-up-image.png";
import axiosClient from "../../axios-client";
import { ProcessingIcon } from "../utils/icons";

export const SignUp = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  useEffect(() => {
    if (open) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setFormData({ Latitude: latitude, Longitude: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
      );
    }
  }, [open]);

  const [submitting, setSubmitting] = useState(false);

  // State variables for form data and form errors
  const [formData, setFormData] = useState({
    Organization_Name: "",
    Email: "",
    Password: "",
    Contact: "",
    Location: "",
  });

  const [formErrors, setFormErrors] = useState({
    Organization_Name: "",
    Email: "",
    Password: "",
    Contact: "",
    Location: "",
  });

  // Function to handle changes in form inputs
  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset error message when user starts typing
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Function to handle form submission
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    const newFormErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (String(value).trim() === "") {
        newFormErrors[key] = `${key.replace("_", " ")} is required`;
      }
    });
    if (Object.keys(newFormErrors).length > 0) {
      setFormErrors(newFormErrors);
      return;
    }

    try {
      setSubmitting(true);
      const response = await axiosClient.post("/user/register", formData);
      if (response.status === 200) {
        toast.success("User registered successfully");
        setFormData({
          Organization_Name: "",
          Email: "",
          Password: "",
          Contact: "",
          Location: "",
        });
        setSubmitting(false);
        navigate("/organization/login");
      } else {
        setSubmitting(false);
        toast.error("Registration failed");
      }
      // console.log("");
    } catch (error) {
      setSubmitting(false);
      toast.error(error.response.data.Error);
      console.error("Error registering user:", error);
    }
  };

  const inputItems = [
    {
      name: "Email",
      inputName: "Email",
      type: "email",
      placeholder: "esteban_schiller@gmail.com",
    },
    {
      name: "Organization Name",
      inputName: "Organization_Name",
      type: "text",
      placeholder: "Organization Name",
    },
    {
      name: "Contact Number",
      inputName: "Contact",
      type: "text",
    },
    {
      name: "Password",
      inputName: "Password",
      type: "Password",
      placeholder: "● ● ● ● ● ●",
    },
    {
      name: "Location",
      inputName: "Location",
      type: "text",
      placeholder: "",
    },
  ];

  return (
    <section className="flex w-full items-center justify-between">
      <div className="-mt-20 hidden w-[47%] items-center justify-center md:flex">
        <img src={signUpImage} alt="Sign Up" />
      </div>
      <div className="flex w-full items-center md:w-[47%]">
        <div className="border-1 mb-20 flex w-full flex-col items-center rounded-[15px] border border-[#B9B9B9] p-5 py-10 md:p-12 md:py-12">
          <h3 className="text-center font-poppins text-[32px] font-bold leading-9 text-[#64728C] md:leading-[20px]">
            Create an Account
          </h3>
          <h4 className="mt-2 font-nunito text-[18px] font-semibold leading-[24px] text-[#64728C]">
            Create an account to continue
          </h4>
          <div className="mt-5 flex w-full flex-col justify-between gap-6 md:mt-10">
            {inputItems.slice(0, 5).map((item, itemIndex) => (
              <div className="w-full" key={itemIndex}>
                <InputItem
                  data={formData}
                  type={item.type}
                  errors={formErrors}
                  handleChange={handleChange}
                  setErrors={setFormErrors}
                  name={item.name}
                  inputName={item.inputName}
                  placeholder={item.placeholder}
                />
              </div>
            ))}
          </div>
          <div className="mt-5 flex w-full flex-col justify-between md:mt-8">
            <div
              className="mx-auto mt-5 flex w-[80%] cursor-pointer justify-center rounded-[10px] bg-[#FF8828] p-3 font-nunito text-[15px] font-bold leading-[28px] text-white md:mt-8 md:text-[20px]"
              onClick={handleSubmit}
            >
              Sign up
            </div>
          </div>
          <div className="mt-5 font-nunito text-[14px] font-semibold leading-[24px] text-[#202224] md:mt-8 md:text-[18px]">
            Already have an account?{" "}
            <a
              className="cursor-pointer text-[#FF8828] underline"
              href="/organization/login"
            >
              {submitting ? <ProcessingIcon /> : "Login"}
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};
