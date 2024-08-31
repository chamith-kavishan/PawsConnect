import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { EditCustomer } from "./EditCustomer";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../contexts/NavigationContext";
import {
  Card,
  Typography,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

export const CustomerView = () => {
  const [customer, setCustomer] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { id } = useParams();
  const customerId = parseInt(id, 10);

  const { user } = useStateContext();

  useEffect(() => {
    const fetchCustomer = () => {
      axiosClient
        .get(`/customer/single/${customerId}`)
        .then((res) => {
          setCustomer(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCustomer();
  }, []);

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    editCustomerHandleOpen();
  };

  const [editOpen, setEditOpen] = useState(false);
  const editCustomerHandleOpen = () => setEditOpen((cur) => !cur);

  return (
    <section>
      <Card className="h-fit  rounded-none mx-3 md:mx-6 mr-3">
        <CardBody className="flex flex-col gap-5 p-3 pl-6 ">
          <div className=" flex justify-between w-full">
            <Typography
              variant="h4"
              className=" font-inter font-bold tracking-wide"
              color="blue-gray"
            >
              {customer.Title} {customer.Name}
            </Typography>
          </div>
          <div className="flex flex-col gap-6 font-inter border-[1px] w-full md:w-[35%] border-black px-5 py-3 rounded-lg">
            <div className="flex items-end justify-between">
              <div>
                <Typography
                  variant="h5"
                  className=" font-inter font-bold tracking-wide"
                  color="blue-gray"
                >
                  Customer Details
                </Typography>
              </div>
              <Link
                onClick={() => handleEditClick(customer)}
                className="cursor-pointer border-b border-dashed border-red-500 text-red-400 hover:text-[#9165A0] hover:border-[#9165A0] transition-all duration-300"
              >
                Edit
              </Link>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <div>Email:</div>
                <Link
                  to={"#"}
                  onClick={(e) => {
                    window.location.href = `mailto:${customer.Email}`;
                    e.preventDefault();
                  }}
                  className="text-red-400 hover:text-[#9165A0] hover:border-[#9165A0] transition-all duration-300"
                >
                  {customer.Email}
                </Link>
              </div>
              <div>
                <div>Owner:</div>
                <div>{user.userName}</div>
              </div>
              <div>
                <div>Birthday:</div>
                <div>{customer.Birthday}</div>
              </div>
              <div>
                <div>NIC:</div>
                <div>{customer.NIC}</div>
              </div>
              <div>
                <div>Phone:</div>
                <Link
                  to={"#"}
                  onClick={(e) => {
                    href = `tel:${customer.Tp}`; //Change the phone number to customer phone number
                    e.preventDefault();
                  }}
                  className="text-red-400 hover:text-[#9165A0] hover:border-[#9165A0] transition-all duration-300"
                >
                  {customer.Tp}
                </Link>
              </div>
              {customer.address_line1 && (
                <div>
                  <div>Address:</div>
                  <div>
                    {`${customer.address_line1} ,${customer.address_line2} , ${customer.address_line3}`}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"></CardFooter>
      </Card>

      {selectedCustomer && (
        <EditCustomer
          customer={customer}
          handleOpen={editCustomerHandleOpen}
          open={editOpen}
        />
      )}
    </section>
  );
};
