import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/NavigationContext";
import logo from "../../assets/images/logo.png";

export const GuestLayout = () => {
  const { token } = useStateContext();
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <section className="flex flex-col px-[5%] py-5">
      <img
        className="mb-5 flex w-[20%] items-center justify-center md:mb-0 md:h-screen md:w-[90px]"
        src={logo}
      />
      <Outlet />
    </section>
  );
};
