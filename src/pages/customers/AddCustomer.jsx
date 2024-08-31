import { useState } from "react";
import axiosClient from "../../../axios-client";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProcessingIcon, AddCustomerIcon } from "../../utils/icons";
import { FormInput } from "../../components/global/FormInput";
import { useStateContext } from "../../contexts/NavigationContext";
import Swal from "sweetalert2";

export const AddCustomer = () => {
  const { user } = useStateContext();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const initialFormData = {
    Title: "Mr",
    First_Name: "",
    Name: "",
    Email: "",
    Tp: "",
    Birthday: "",
    NIC: "",
    Address1: "",
    Address2: "",
    Address3: "",
    Branch_idBranch: user.branch,
    User_idUser: user.userId,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  //Validating the data
  const validate = (data) => {
    const errors = {};
    if (!data.Title) {
      errors.Title = "Title is required.";
    }
    if (!data.Name) {
      errors.Name = "Name is required.";
    }
    if (!data.Tp) {
      errors.Tp = "Telephone Number is required.";
    }
    return errors;
  };

  //Submitting the data
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateErrors = validate(formData);
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length === 0) {
      try {
        setSubmitting(true);
        axiosClient
          .post("/customer", formData)
          .then((res) => {
            toast.success("Customer added successfully !");
            setFormData(initialFormData);
            navigate("/customers");
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 409) {
              toast.error("Customer already exist !");
            } else {
              toast.error("Failed to add Customer. Please try again.");
            }
          });
        setSubmitting(false);
      } catch (error) {
        toast.error("Failed to add Customer. Please try again.");
      }
    } else {
      let errorMessage = "";
      Object.values(validateErrors).forEach((error) => {
        errorMessage += `${error}\n`;
      });
      Swal.fire({
        icon: "error",
        text: "Please fill out all required fields.",
        allowOutsideClick: false,
      });
    }
  };

  // Array of input items for rendering the form
  const inputItems = [
    {
      name: "First Name*",
      inputName: "Name",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "Second Name",
      inputName: "First_Name",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "Email",
      inputName: "Email",
      type: "email",
      placeholder: "Type here....",
    },
    {
      name: "NIC",
      inputName: "NIC",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "Line 1",
      inputName: "Address1",
      type: "text",
    },
    {
      name: "Line 2",
      inputName: "Address2",
      type: "text",
    },
    {
      name: "Line 3",
      inputName: "Address3",
      type: "text",
    },
  ];

  return (
    <>
      <section className="mt-8 pb-12">
        <div className="w-full rounded-[15px] bg-white px-[4%] pb-[40px] pt-[20px] md:px-[30px]">
          <div className="flex items-center gap-4">
            <AddCustomerIcon />
            <span className="mt-1 font-poppins text-[16px] font-medium leading-8 text-[#64728C] md:text-[22px] md:leading-[30px]">
              New Customer
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-6 flex w-full flex-col items-start gap-3 md:mt-10 md:flex-row md:gap-20">
              {inputItems.slice(0, 2).map((item, itemIndex) => {
                return (
                  <div className="mb-3 w-full md:w-[30%]" key={itemIndex}>
                    <FormInput
                      data={formData}
                      type={item.type}
                      errors={errors}
                      handleChange={handleChange}
                      name={item.name}
                      inputName={item.inputName}
                      placeholder={item.placeholder}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex w-full flex-col items-start gap-3 md:mt-5 md:flex-row md:gap-20">
              {inputItems.slice(2, 3).map((item, itemIndex) => {
                return (
                  <div className="mb-3 w-full md:w-[30%]" key={itemIndex}>
                    <FormInput
                      data={formData}
                      type={item.type}
                      errors={errors}
                      handleChange={handleChange}
                      name={item.name}
                      inputName={item.inputName}
                      placeholder={item.placeholder}
                    />
                  </div>
                );
              })}
              <div className="mb-3 w-full md:w-[30%]">
                <div className="w-full">
                  <p className="font-poppins text-[14px] font-medium leading-[24px] text-[#64728C] md:text-[16px]">
                    Contact Number*
                  </p>
                  <input
                    name="Contact Number"
                    type="text"
                    className="placeholder:text-[#64728C]-400 placeholder:poppins mt-2 block w-full rounded-[15px] border-0 py-2.5 pl-3 font-poppins text-[14px] font-normal text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[14px] focus:outline-[#bdbdbd] focus:ring-1 focus:ring-inset sm:leading-6 md:text-[15px] md:placeholder:text-[14px]"
                    value={formData.Tp}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const isNumericInput = /^\d+$/.test(inputValue);

                      if (isNumericInput || inputValue === "") {
                        setFormData({
                          ...formData,
                          Tp: inputValue,
                        });
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          Tp: "",
                        }));
                      } else {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          Tp: "Please enter only phone number.",
                        }));
                      }
                    }}
                    placeholder="Type here...."
                  />
                  {errors.Tp && (
                    <p className="font-inter pt-1 text-xs font-medium text-red-500">
                      {errors.Tp}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3 flex w-full flex-col items-start gap-20 md:mt-5 md:flex-row">
              {inputItems.slice(3, 4).map((item, itemIndex) => {
                return (
                  <div className="mb-3 w-full md:w-[30%]" key={itemIndex}>
                    <FormInput
                      data={formData}
                      type={item.type}
                      errors={errors}
                      handleChange={handleChange}
                      name={item.name}
                      inputName={item.inputName}
                      placeholder={item.placeholder}
                    />
                  </div>
                );
              })}
            </div>
            <div className="poppins text-[# ] mt-6 text-[16px] font-semibold leading-8">
              Address
            </div>
            <div className="mt-3 flex w-full flex-col items-start justify-between gap-3 md:mt-5 md:flex-row md:gap-10">
              {inputItems.slice(4, 7).map((item, itemIndex) => {
                return (
                  <div className="mb-3 w-full md:w-[30%]" key={itemIndex}>
                    <FormInput
                      data={formData}
                      type={item.type}
                      errors={errors}
                      handleChange={handleChange}
                      name={item.name}
                      inputName={item.inputName}
                      placeholder={item.placeholder}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-3 font-poppins text-[12px] font-normal leading-[18px] text-[#64728C] text-opacity-70 md:mt-5">
              *Required Filed
            </div>
            <div className="mt-7 flex justify-end gap-5 md:mt-0">
              <button
                className="min-w-[80px] rounded-[20px] bg-[#769EFF] bg-opacity-30 px-4 py-2 font-poppins text-[14px] font-semibold leading-[22px] text-[#10275E] hover:opacity-80"
                type="button"
                onClick={() => {
                  setFormData(initialFormData);
                }}
              >
                Cancel
              </button>
              <button
                className="flex min-w-[80px] items-center justify-center gap-2 rounded-[20px] bg-[#769EFF] bg-opacity-30 px-4 py-2 font-poppins text-[14px] font-semibold leading-[22px] text-[#10275E] hover:opacity-80"
                type="submit"
                disabled={submitting}
              >
                {submitting && <ProcessingIcon />}
                Save
              </button>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};
