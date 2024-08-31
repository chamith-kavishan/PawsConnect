import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { MainLayout } from "../components/layouts/MainLayout";
import { GuestLayout } from "../components/layouts/GuestLayout";
import { Customer } from "../pages/customers/Customer";
import { AddCustomer } from "../pages/customers/AddCustomer";
import { EditCustomer } from "../pages/customers/EditCustomer";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/home/Home";
import { AboutUs } from "../pages/about-us/AboutUs";
import { AdoptPet } from "../pages/adopt-a-pet/AdoptPet";
import { Pets } from "../pages/organization/pets/Pets";
import { AddPet } from "../pages/organization/pets/AddPet";
import { EditPet } from "../pages/organization/pets/EditPet";
import { Blogs } from "../pages/organization/blogs/Blogs";
import { AddBlog } from "../pages/organization/blogs/AddBlog";
import { Reports } from "../pages/organization/reports/Reports";
import { Blog } from "../pages/blog/Blog";
import { BlogView } from "../pages/blog/BlogView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "about-us",
    element: <AboutUs />,
  },
  {
    path: "adopt-a-pet",
    element: <AdoptPet />,
  },
  {
    path: "organization/sign-up",
    element: <SignUp />,
  },
  {
    path: "organization/login",
    element: <Login />,
  },
  {
    path: "blogs",
    element: <Blog />,
  },
  {
    path: "blog/:id",
    element: <BlogView />,
  },
  {
    path: "/organization",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "pets",
        element: <Pets />,
      },
      {
        path: "pet/add",
        element: <AddPet />,
      },
      {
        path: "customer/add",
        element: <AddCustomer />,
      },
      {
        path: "pet/edit/:id",
        element: <EditPet />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blog/add",
        element: <AddBlog />,
      },
    ],
  },
  // {
  //   path: "/guest",
  //   element: <GuestLayout />,
  //   children: [
  //     {
  //       path: "login",
  //       element: <Login />,
  //     },
  //     {
  //       path: "signup",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
]);

export default router;
