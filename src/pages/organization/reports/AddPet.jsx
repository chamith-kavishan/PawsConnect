import { useState } from "react";
import axiosClient from "../../../../axios-client";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProcessingIcon, AddCustomerIcon } from "../../../utils/icons";
import { FormInput } from "../../../components/global/FormInput";
import { useStateContext } from "../../../contexts/NavigationContext";
import Swal from "sweetalert2";

export const AddPet = () => {
  const { user } = useStateContext();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const initialFormData = {
    Name: "",
    Breed: "",
    Sex: "",
    Age: "",
    Description: "",
    Organization_idOrganization: user.userId,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  //Validating the data
  const validate = (data) => {
    console.log(data);
    const errors = {};
    if (!data.Name) {
      errors.Name = "Name is required.";
    }
    if (!data.Breed) {
      errors.Breed = "Breed is required.";
    }
    if (!data.Sex) {
      errors.Sex = "Sex is required.";
    }
    if (!data.Age) {
      errors.Age = "Age is required.";
    }
    if (!data.Description) {
      errors.Description = "Description is required.";
    }
    console.log(errors);
    return errors;
  };

  //Submitting the data
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateErrors = validate(formData);
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length === 0) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      if (image) {
        formDataToSend.append("image", image);
      }

      try {
        setSubmitting(true);
        const response = await axiosClient.post("/pet", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Pet added successfully!");
        setFormData(initialFormData);
        setImage(null);
        navigate("/organization/pets");
      } catch (error) {
        if (error.response && error.response.status === 409) {
          toast.error("Pet already exists!");
        } else {
          toast.error("Failed to add pet. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    } else {
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
      name: "Name*",
      inputName: "Name",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "Breed",
      inputName: "Breed",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "Sex",
      inputName: "Sex",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "Age",
      inputName: "Age",
      type: "text",
      placeholder: "Type here....",
    },
  ];

  return (
    <>
      <section className="mt-8 pb-12">
        <div className="w-full rounded-[15px] bg-white px-[4%] pb-[40px] pt-[20px] md:px-[30px]">
          <div className="flex items-center gap-4">
            <AddCustomerIcon />
            <span className="mt-1 font-poppins text-[16px] font-medium leading-8 text-[#64728C] md:text-[22px] md:leading-[30px]">
              New Pet
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
            <div className="mt-3 flex w-full flex-col items-start gap-3 md:mt-5 md:flex-row md:gap-20">
              <div className="mb-3 w-full md:w-[30%]">
                <div className="w-full">
                  <p className="font-poppins text-[14px] font-medium leading-[24px] text-[#64728C] md:text-[16px]">
                    Description*
                  </p>
                  <textarea
                    name="Contact Number"
                    type="text"
                    className="placeholder:text-[#64728C]-400 placeholder:poppins mt-2 block min-h-[200px] w-full rounded-[15px] border-0 py-2.5 pl-3 font-poppins text-[14px] font-normal text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[14px] focus:outline-[#bdbdbd] focus:ring-1 focus:ring-inset sm:leading-6 md:text-[15px] md:placeholder:text-[14px]"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      setFormData({
                        ...formData,
                        Description: inputValue,
                      });
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        Description: "",
                      }));
                    }}
                    placeholder="Type here...."
                  >
                    {formData.Description}
                  </textarea>
                  {errors.Description && (
                    <p className="font-inter pt-1 text-xs font-medium text-red-500">
                      {errors.Description}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-3 md:w-[30%]">
                <p className="font-poppins text-[14px] font-medium leading-[24px] text-[#64728C] md:text-[16px]">
                  Upload Image
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2"
                />
              </div>
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
