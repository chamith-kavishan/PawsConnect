import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProcessingIcon, AddCustomerIcon } from "../../utils/icons";
import { FormInput } from "../../components/global/FormInput";
import { useStateContext } from "../../contexts/NavigationContext";
import Swal from "sweetalert2";

export const EditCustomer = () => {
  const { user } = useStateContext();

  const { id } = useParams();
  const navigate = useNavigate();

  const customerId = parseInt(id, 10);

  const [submitting, setSubmitting] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({});

  const [errors, setErrors] = useState({});

  //Fetching the customer details from the database
  useEffect(() => {
    const fetchCustomer = () => {
      axiosClient
        .get(`/customer/single/${customerId}`)
        .then((res) => {
          setEditedCustomer(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCustomer();
  }, []);

  //Validating the data
  const validate = (data) => {
    const errors = {};
    if (!data.Name) {
      errors.Name = "Name is required.";
    }
    if (!data.Tp) {
      errors.Tp = "Contact Number is required.";
    }
    return errors;
  };

  //Saving the updated data
  const handleSave = (e) => {
    e.preventDefault();
    const validationErrors = validate(editedCustomer);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true);
      const extendedCustomerArray = {
        ...editedCustomer,
        User_idUser: user.userId,
        Branch_idBranch: user.branch,
      };
      axiosClient
        .put(`customer/${editedCustomer.idCustomer}`, extendedCustomerArray)
        .then(() => {
          toast.success("Customer edited successfully !");
          navigate("/customers");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to edit Customer. Please try again.");
        });
      setSubmitting(false);
    } else {
      setErrors(validationErrors);
      let errorMessage = "";
      Object.values(validationErrors).forEach((error) => {
        errorMessage += `${error}\n`;
      });
      Swal.fire({
        icon: "error",
        text: "Please fill out all required fields.",
        allowOutsideClick: false,
      });
    }
  };

  //Updating the input values
  const handleChange = (name, value) => {
    setEditedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
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
        <div className="w-full bg-white rounded-[15px] md:px-[30px] px-[4%] pt-[20px] pb-[40px]">
          <div className="flex items-center gap-4">
            <AddCustomerIcon />
            <span className="font-poppins font-medium text-[16px] md:text-[22px] leading-8 md:leading-[30px] text-[#64728C] mt-1">
              Edit Customer
            </span>
          </div>
          <form onSubmit={handleSave}>
            <div className="flex flex-col items-center w-full gap-3 mt-6 md:flex-row md:gap-20 md:mt-10">
              {inputItems.slice(0, 2).map((item, itemIndex) => {
                return (
                  <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
                    <FormInput
                      data={editedCustomer}
                      type={item.type}
                      errors={errors}
                      handleChange={handleChange}
                      name={item.name}
                      inputName={item.inputName}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-center w-full gap-3 mt-3 md:flex-row md:gap-20 md:mt-5">
              {inputItems.slice(2, 3).map((item, itemIndex) => {
                return (
                  <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
                    <FormInput
                      data={editedCustomer}
                      type={item.type}
                      errors={errors}
                      handleChange={handleChange}
                      name={item.name}
                      inputName={item.inputName}
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
                    className="block rounded-[15px] border-0 py-2.5 pl-3 text-gray-900 ring-1 ring-inset mt-2 ring-gray-300 placeholder:text-[#64728C]-400 placeholder:text-[14px] md:placeholder:text-[14px] placeholder:poppins focus:ring-1 focus:ring-inset sm:leading-6 w-full text-[14px] md:text-[15px] font-normal font-poppins"
                    value={editedCustomer.Tp}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const isNumericInput = /^\d+$/.test(inputValue);

                      if (isNumericInput || inputValue === "") {
                        setEditedCustomer({
                          ...editedCustomer,
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

            <div className="flex flex-col items-center w-full gap-20 mt-3 md:flex-row md:mt-5">
              {inputItems.slice(3, 4).map((item, itemIndex) => {
                return (
                  <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
                    <FormInput
                      data={editedCustomer}
                      type={item.type}
                      errors={errors}
                      handleChange={handleChange}
                      name={item.name}
                      inputName={item.inputName}
                    />
                  </div>
                );
              })}
            </div>

            <div className="poppins font-semibold text-[16px] leading-8 text-[#64728C] mt-6">
              Address
            </div>
            <div className="flex flex-col items-center justify-between w-full gap-3 mt-3 md:flex-row md:gap-10 md:mt-5">
              {inputItems.slice(4, 7).map((item, itemIndex) => {
                return (
                  <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
                    <FormInput
                      data={editedCustomer}
                      type={item.type}
                      errors={errors}
                      handleChange={handleChange}
                      name={item.name}
                      inputName={item.inputName}
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
                className="bg-[#769EFF] bg-opacity-30 font-poppins text-[14px] font-semibold leading-[22px] px-4 py-2 rounded-[20px] min-w-[80px] flex items-center justify-center gap-2 text-[#10275E]"
                type="submit"
                disabled={submitting}
              >
                {submitting && <ProcessingIcon />}
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
