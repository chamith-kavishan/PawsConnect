import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../contexts/NavigationContext";
import signUpImage from "../assets/images/logo-no-background.svg";

export const Login = () => {
  const { setUser, setToken } = useStateContext();
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const validate = (loginData) => {
    const errors = {};
    if (!loginData.email) {
      errors.email = "Email is required";
    } else if (!loginData.email.includes("@")) {
      errors.email = "Enter a valid email address";
    }
    if (!loginData.password) {
      errors.password = "Password is required";
    }
    setFormErrors(errors);
    return errors;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const validationErrors = validate(loginData);

    if (Object.keys(validationErrors).length === 0) {
      axiosClient
        .post("/user/login", loginData)
        .then(({ data }) => {
          setUser(data.user);
          setToken(data.token);
          navigate("/organization/reports");
        })
        .catch(({ response }) => {
          if (response && response.status === 401) {
            setAlertMessage(
              response?.data.error || "Invalid email or password",
            );
            setShowAlert(true);
          } else {
            setAlertMessage(response?.data.error || "An error occurred");
            setShowAlert(true);
          }
        });
    }
  };

  return (
    <>
      <div className="mt-5 flex w-full items-center justify-between md:h-screen">
        <div className="-mt-20 hidden w-[47%] items-center justify-center md:flex">
          <img src={signUpImage} alt="Sign up" className="w-[60%]" />
        </div>
        <div className="flex w-full items-center md:w-[47%]">
          <form
            className="border-1 mb-20 flex w-full flex-col items-center rounded-[15px] border border-[#B9B9B9] p-5 py-10 md:p-12 md:py-12"
            onSubmit={handleLogin}
          >
            <h3 className="font-poppins text-[24px] font-bold leading-9 text-[#64728C] md:text-[32px] md:leading-[20px]">
              Welcome back
            </h3>
            <h4 className="font-poppins text-[16px] font-semibold leading-[24px] text-[#64728C] md:mt-3 md:text-[18px]">
              Sign In
            </h4>
            <div className="mt-8 flex w-full flex-col justify-between gap-8 md:mt-10">
              <div className="w-full">
                <p className="font-poppins text-[14px] font-semibold leading-[24px] text-[#64728C] md:text-[18px]">
                  Email address
                </p>
                <input
                  name="Email address"
                  type="email"
                  ref={emailRef}
                  className="placeholder:text-[#A6A6A6]-600 placeholder:nunito mt-3 block w-full rounded-md border-0 bg-[#F1F4F9] py-3 pl-3 font-nunito text-[16px] font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[14px] focus:ring-1 focus:ring-inset sm:leading-6 md:text-[20px] md:placeholder:text-[18px]"
                  placeholder="esteban_schiller@gmail.com"
                />
                {formErrors.email && (
                  <span className="font-poppins text-xs font-medium text-red-500">
                    {formErrors.email}
                  </span>
                )}
              </div>
              <div className="w-full">
                <p className="font-poppins text-[14px] font-semibold leading-[24px] text-[#64728C] md:text-[18px]">
                  Password
                </p>
                <input
                  name="Password"
                  type="password"
                  ref={passwordRef}
                  className="placeholder:text-[#A6A6A6]-600 placeholder:nunito mt-3 block w-full rounded-md border-0 bg-[#F1F4F9] py-3 pl-3 font-nunito text-[16px] font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[14px] focus:ring-1 focus:ring-inset sm:leading-6 md:text-[20px] md:placeholder:text-[18px]"
                  placeholder="********"
                />
                {formErrors.password && (
                  <span className="font-poppins text-xs font-medium text-red-500">
                    {formErrors.password}
                  </span>
                )}
              </div>
            </div>
            {/* <div className="flex items-center justify-between w-full mt-8">
              <div className="flex justify-left text-start">
                <input type="checkbox" className="w-[18px]" />
                <p className="font-poppins font-semibold text-[16px] md:text-[18px] leading-6 text-[#64728C] pl-3">
                  Remember me
                </p>
              </div>
            </div> */}
            <button
              className="mt-8 flex w-[80%] cursor-pointer justify-center rounded-[10px] bg-[#02aee0] p-3 font-poppins text-[15px] font-bold leading-[28px] text-white md:text-[20px]"
              type="submit"
            >
              Sign In
            </button>
            {showAlert && (
              <div className="mt-4 font-semibold text-red-500">
                {alertMessage}
              </div>
            )}
            <div className="mt-8 font-poppins text-[14px] font-semibold leading-[24px] text-[#202224] md:text-[18px]">
              New to Optimize?{" "}
              <a
                className="text-[#02aee0] underline"
                href="/organization/sign-up"
              >
                Create Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
