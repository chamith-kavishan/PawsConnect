import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axiosClient from "../../../axios-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseIcon, ProcessingIcon } from "../../utils/icons";
import { FormInput } from "../../components/global/FormInput";
import { useStateContext } from "../../contexts/NavigationContext";
import Swal from "sweetalert2";

export const AddCustomerModel = ({ handleOpen, open, handleLoading }) => {
  const { user } = useStateContext();
  const handleClose = () => {
    setFormData(initialFormData);
    setErrors({});
    handleOpen();
  };
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

  const validate = (data) => {
    const errors = {};
    if (!data.Title) {
      errors.Title = "Title is required.";
    }
    if (!data.Name) {
      errors.Name = "Last Name is required.";
    }
    if (!data.Tp) {
      errors.Tp = "Telephone Number is required.";
    }
    return errors;
  };

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
            handleClose();
            handleLoading();
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 409) {
              toast.error("Dealer already exist !");
            } else {
              toast.error("Failed to add Dealer. Please try again.");
            }
          });
        setSubmitting(false);
      } catch (error) {
        toast.error("Failed to add Dealer. Please try again.");
      }
    } else {
      let errorMessage = "";
      Object.values(validateErrors).forEach((error) => {
        errorMessage += `${error}\n`;
      });
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: errorMessage,
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
      <Dialog
        size="md"
        open={open}
        handler={handleClose}
        className="bg-white shadow-none rounded-[10px] overflow-y-scroll scrollbar-hide overflow-x-hidden font-poppins"
      >
        <DialogHeader className="w-full flex justify-between align-center border-b border-[#64728C] border-opacity-15 p-0 items-center pb-4 px-5 pt-5">
          <div className="font-poppins text-[16px] md:text-[20px] font-medium leading-8 md:leading-[30px] text-[#64728C]">
            New Customer
          </div>
          <div
            className="font-bold text-[20px] cursor-pointer"
            onClick={handleClose}
          >
            <CloseIcon />
          </div>
        </DialogHeader>
        <DialogBody className="px-5 overflow-y-scroll max-h-[500px] ">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-start w-full gap-3 md:flex-row md:gap-20 md:mt-5 ">
              {inputItems.slice(0, 2).map((item, itemIndex) => {
                return (
                  <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
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
            <div className="flex flex-col items-start w-full gap-3 mt-3 md:flex-row md:gap-20 md:mt-5 ">
              {inputItems.slice(2, 3).map((item, itemIndex) => {
                return (
                  <div className="md:w-[30%] w-full mb-3 " key={itemIndex}>
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
              <div className="md:w-[30%] w-full mb-3">
                <div className="w-full">
                  <p className="font-poppins text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C]">
                    Contact Number*
                  </p>
                  <input
                    name="Contact Number"
                    type="text"
                    className="block rounded-[15px] focus:outline-[#bdbdbd]   border-0 py-2.5 pl-3 text-gray-900 ring-1 ring-inset mt-2 ring-gray-300 placeholder:text-[#64728C]-400 placeholder:text-[14px] md:placeholder:text-[14px] placeholder:poppins focus:ring-1 focus:ring-inset sm:leading-6 w-full text-[14px] md:text-[15px] font-normal font-poppins"
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
                    <p className="pt-1 text-xs font-medium text-red-500 font-inter">
                      {errors.Tp}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start w-full gap-20 mt-3 md:flex-row md:mt-5">
              {inputItems.slice(3, 4).map((item, itemIndex) => {
                return (
                  <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
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
            <div className="poppins font-semibold text-[16px] leading-8 text-[#64728C] mt-6">
              Address
            </div>
            <div className="flex flex-col items-start justify-between w-full gap-3 mt-3 md:flex-row md:gap-10 md:mt-5">
              {inputItems.slice(4, 7).map((item, itemIndex) => {
                return (
                  <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
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
            <div className="font-poppins font-normal text-[12px] leading-[18px] text-[#64728C] text-opacity-70 md:mt-5 mt-3">
              *Required Filed
            </div>
            <div className="flex justify-end gap-5 md:mt-0 mt-7">
              <button
                className="bg-[#769EFF] bg-opacity-30 font-poppins text-[14px] font-semibold leading-[22px] px-4 py-2 rounded-[20px] min-w-[80px] text-[#10275E] hover:opacity-80"
                type="button"
                onClick={() => {
                  setFormData(initialFormData);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-[#769EFF] bg-opacity-30 font-poppins text-[14px] font-semibold leading-[22px] px-4 py-2 rounded-[20px] min-w-[80px] flex items-center justify-center gap-2 text-[#10275E] hover:opacity-80"
                type="submit"
                disabled={submitting}
              >
                {submitting && <ProcessingIcon />}
                Save
              </button>
            </div>
          </form>
        </DialogBody>
        <DialogFooter></DialogFooter>
      </Dialog>
    </>
  );
};
