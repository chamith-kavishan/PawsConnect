import { useState, useEffect } from "react";
import { Tooltip, IconButton } from "@material-tailwind/react";
import {
  PlusIcon,
  ArrowDownIcon,
  MinusIcon,
  PaginateLeft,
  PaginateRight,
  EditNewIcon,
  RemoveIcon,
} from "../../utils/icons";
import { TABLE_HEAD } from "../../utils/tableArray";
import axiosClient from "../../../axios-client";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/NavigationContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

export const Customer = () => {
  const { user } = useStateContext();

  const [customers, setCustomers] = useState([]);
  const [customerTableLoading, setCustomerTableLoading] = useState(false);
  const handleLoading = () => setCustomerTableLoading((pre) => !pre);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [customerPerPage] = useState(10);

  const [tableLoading, setTableLoading] = useState(true);

  const [expandedCustomerIndex, setExpandedCustomerIndex] = useState(null);

  const navigate = useNavigate();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchCustomers = () => {
      axiosClient
        .get(`/customer/${user.branch}`)
        .then((res) => {
          setCustomers(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setTableLoading(false);
    };
    fetchCustomers();
  }, [customerTableLoading]);

  //Filtering the customers details
  useEffect(() => {
    const filtered = customers.filter((customer) => {
      const matchesSearch =
        customer.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.Tp.includes(searchQuery) ||
        customer.Email.toLowerCase().includes(searchQuery.toLowerCase());

      if (statusFilter && statusFilter.value !== "") {
        return matchesSearch && customer.Status === statusFilter.value;
      } else {
        return matchesSearch;
      }
    });

    setFilteredCustomers(filtered);
  }, [searchQuery, customers, statusFilter]);

  // Handler for search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handler for clicking edit button
  const handleEditClick = (customer) => {
    navigate(`/customer/edit/${customer.idCustomer}`);
  };

  // Handler for clicking view button
  const handleViewClick = (customer) => {
    navigate(`/customer/single/${customer.idCustomer}`);
  };

  //Function to handle customer delete
  const handleDelete = (customer) => {
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .delete(`/customer/${customer.idCustomer}`)
          .then((res) => {
            Swal.fire("Deleted!", res.data.message, "success");
            setCustomers(
              customers.filter((cus) => cus.idCustomer !== customer.idCustomer),
            );
          })
          .catch((error) => {
            console.error("Error deleting GRN:", error);
            if (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) {
              toast.error(error.response.data.message);
            } else {
              toast.error("Failed to delete GRN. Please try again.");
            }
          });
      }
    });
  };

  //Customer status change
  const handleCustomerStatus = (customer) => {
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change status!",
      customClass: {
        title: "font-inter",
        content: "font-inter",
        actions: "font-inter",
        confirmButton: "font-inter",
        cancelButton: "font-inter",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        let statusData = {
          User_idUser: user.userId,
        };
        axiosClient
          .post(`/customer/status/${customer.idCustomer}`, statusData)
          .then((res) => {
            handleLoading();
            toast.success("Customer's Status has been changed successfully !");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  //Custom styles for the table
  const tableHeaderStyles = {
    headCells: {
      style: {
        font: "Poppins",
        fontWeight: "600",
        color: "#64728C",
        fontSize: "14px",
      },
    },
    cells: {
      style: {
        font: "Poppins",
        fontWeight: "normal",
        color: "#64728C",
        fontSize: "12px",
      },
    },
  };

  // Handler for changing status filter
  const handleStatusFilterChange = (selectedOption) => {
    setStatusFilter(selectedOption);
  };

  // Define status options
  const statusOptions = [
    { value: "", label: "All" },
    { value: "1", label: "Active" },
    { value: "0", label: "Inactive" },
  ];

  //Creating the table
  const TABLE_CUSTOMERS = [
    {
      name: "Name",
      selector: (row) => (
        <span
          onClick={() => handleViewClick(row)}
          className="customer-name cursor-pointer hover:underline"
        >
          {row.Name}
        </span>
      ),
      wrap: true,
      maxWidth: "auto",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
      sortable: true,
    },
    {
      name: "Contact_No",
      selector: (row) => row.Tp,
      wrap: false,
      maxWidth: "auto",
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      wrap: false,
      maxWidth: "auto",
    },
    {
      name: "Invoice Count",
      selector: (row) => <span className="pr-2">{row.Invoice_Count}</span>,
      wrap: false,
      maxWidth: "auto",
      right: true,
    },
    {
      name: "Total (LKR)",
      selector: (row) => (
        <span className="pr-2">
          {row.Total_Invoice
            ? parseFloat(row.Total_Invoice).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "0.00"}
        </span>
      ),
      wrap: false,
      maxWidth: "auto",
      right: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <div
          className={`min-w-[70px] cursor-pointer rounded-full px-2 py-[2px] text-center font-poppins text-[11px] font-semibold ${
            row.Status == 0
              ? `bg-[#ffe6e6] text-[#FF5B5B]`
              : `bg-[#d9f3ea] text-[#00B074]`
          }`}
          onClick={() => handleCustomerStatus(row)}
        >
          {row.Status == 0 ? "Inactive" : "Active"}
        </div>
      ),
      wrap: false,
      maxWidth: "auto",
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Tooltip content="Edit Customer">
            <IconButton
              onClick={() => handleEditClick(row)}
              variant="text"
              className="mx-2 bg-white"
            >
              <EditNewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip content="Delete Customer">
            <IconButton
              onClick={() => handleDelete(row)}
              variant="text"
              className="mr-2 bg-white"
            >
              <RemoveIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  //React select styles
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      fontWeight: "600",
      color: state.isFocused ? "#64728C" : "#64728C82", // Change text color based on focus state
      borderColor: state.isFocused ? "#64728C" : provided.borderColor, // Change border color on focus
      boxShadow: state.isFocused ? "0 0 0 1px #64728C" : provided.boxShadow, // Change box shadow on focus
      "&:hover": {
        borderColor: state.isFocused ? "#64728C" : provided.borderColor,
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#64728C" : "#64728C", // Keep the text color consistent
      backgroundColor: state.isSelected ? "#e7e7e7" : "white",
      ":hover": {
        backgroundColor: state.isSelected ? "#ccc" : "#f3f3f3",
      },
      fontSize: "14px",
      fontWeight: "600",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#64728C", // Change text color for selected value
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "#bdbdbd", // Set the placeholder color
    }),
  };

  //Mobile version row expand
  const handleExpandClick = (index) => {
    if (expandedCustomerIndex === index) {
      setExpandedCustomerIndex(null);
    } else {
      setExpandedCustomerIndex(index);
    }
  };

  return (
    <>
      {/* Desktop version */}
      <section className="mt-8 hidden md:block">
        <div className="w-full rounded-[15px] bg-white px-[30px] pb-[40px] pt-[20px]">
          <div className="md:justify-left mt-4 flex flex-col md:flex-row">
            <div className="mb-4 w-full md:mb-0 md:mr-5 md:w-[250px]">
              <p className="pb-2 font-poppins text-[14px] font-medium leading-[22px] text-[#64728C]">
                Search Customers
              </p>
              <input
                type="text"
                placeholder="Type here...."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full rounded-[15px] border border-[#e6e8ed] px-5 py-2 font-poppins text-[15px] font-medium leading-[22px] focus:outline-[#bdbdbd]"
              />
            </div>
            <div className="w-full md:w-[250px]">
              <p className="pb-2 font-poppins text-[14px] font-medium leading-[22px] text-[#64728C]">
                Search by Status
              </p>
              <Select
                className="basic-single h-10 font-poppins text-[14px]"
                classNamePrefix="select"
                isSearchable={true}
                name="color"
                options={statusOptions}
                value={statusFilter}
                onChange={handleStatusFilterChange}
                styles={customSelectStyles}
              />
            </div>
          </div>
        </div>
        <div className="relative mt-10 w-full rounded-[15px] bg-white px-[30px] pb-[20px] pt-[20px]">
          <Link
            className="absolute -right-3 -top-5 flex aspect-square w-[50px] cursor-pointer items-center justify-center rounded-full bg-[#769EFF] bg-opacity-30"
            to="/customer/add"
          >
            <PlusIcon width={"24px"} />
          </Link>
          <DataTable
            columns={TABLE_CUSTOMERS}
            responsive
            data={filteredCustomers}
            customStyles={tableHeaderStyles}
            className="mt-4"
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15]}
            paginationComponentOptions={{
              rowsPerPageText: "Entries per page:",
              rangeSeparatorText: "of",
            }}
            noDataComponent={
              <div className="text-center">No data available</div>
            }
            progressPending={tableLoading}
          />
        </div>
      </section>

      {/* Mobile version */}
      <section className="mt-5 w-full rounded-[10px] bg-white px-[3%] py-3 md:hidden">
        <div className="flex justify-end">
          <Link
            className="-right-3 -top-5 flex aspect-square w-[30px] cursor-pointer items-center justify-center rounded-full bg-[#769EFF] bg-opacity-30"
            to="/customer/add"
          >
            <PlusIcon width={"14px"} />
          </Link>
        </div>
        <div className="mt-3 flex flex-col">
          <div className="mb-4 w-full md:mb-0 md:mr-5 md:w-1/5">
            <p className="pb-2 font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
              Search Customers
            </p>
            <input
              type="text"
              placeholder="Type here...."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="w-full rounded-[15px] border border-[#e6e8ed] px-3 py-2 font-poppins text-[12px] font-medium leading-[18px]"
            />
          </div>
          <div className="w-full md:w-1/5">
            <p className="pb-2 font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
              Search by Status
            </p>
            <Select
              className="basic-single h-10 font-poppins text-[12px]"
              classNamePrefix="select"
              isSearchable={true}
              name="color"
              options={statusOptions}
              value={statusFilter}
              onChange={handleStatusFilterChange}
              styles={customSelectStyles}
            />
          </div>
        </div>
        <div className="w-full pt-5">
          <div className="flex w-full items-center gap-2 bg-[#769EFF] bg-opacity-30 px-2 py-2 font-poppins text-[12px] font-medium leading-[18px] text-[#10275E]">
            <ArrowDownIcon />
            Name
          </div>
          {filteredCustomers
            .slice(
              (currentPage - 1) * customerPerPage,
              currentPage * customerPerPage,
            )
            .map((customer, index) => (
              <>
                <div
                  className="flex w-full items-center border-b border-[#64728C] border-opacity-10 px-2 py-2"
                  onClick={() => handleExpandClick(index)}
                >
                  <span className="mr-3 flex aspect-square w-[14px] items-center justify-center rounded-full border border-[#64728C]">
                    {expandedCustomerIndex === index ? (
                      <MinusIcon width={"8px"} />
                    ) : (
                      <PlusIcon width={"8px"} />
                    )}
                  </span>
                  <span className="font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                    {customer.Name}
                  </span>
                </div>
                {expandedCustomerIndex === index && (
                  <div className="w-full bg-[#D9D9D9] bg-opacity-20 pl-[35px]">
                    <div className="w-full border-b border-[#64728C] border-opacity-10 py-2 font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                      {customer.Name}
                    </div>
                    <div className="flex w-full items-center border-b border-[#64728C] border-opacity-10 py-2">
                      <div className="w-[40%] font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                        {TABLE_HEAD[1]}
                      </div>
                      <div className="w-[60%] text-wrap font-poppins text-[12px] font-normal leading-[18px] text-[#64728C]">
                        {customer.Tp}
                      </div>
                    </div>
                    <div className="flex w-full items-center border-b border-[#64728C] border-opacity-10 py-2">
                      <div className="w-[40%] font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                        {TABLE_HEAD[2]}
                      </div>
                      <div className="overflow-wrap break-word word-break w-[60%] break-all font-poppins text-[12px] font-normal leading-[18px] text-[#64728C]">
                        {customer.Email}
                      </div>
                    </div>
                    <div className="flex w-full items-center border-b border-[#64728C] border-opacity-10 py-2">
                      <div className="w-[40%] font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                        {TABLE_HEAD[3]}
                      </div>
                      <div className="w-[60%] font-poppins text-[12px] font-normal leading-[18px] text-[#64728C]">
                        {customer.Invoice_Count}
                      </div>
                    </div>
                    <div className="flex w-full items-center border-b border-[#64728C] border-opacity-10 py-2">
                      <div className="w-[40%] font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                        {TABLE_HEAD[4]}
                      </div>
                      <div className="w-[60%] font-poppins text-[12px] font-normal leading-[18px] text-[#64728C]">
                        {customer.Total_Invoice
                          ? parseFloat(customer.Total_Invoice).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )
                          : "0.00"}
                      </div>
                    </div>
                    <div className="flex w-full items-center border-b border-[#64728C] border-opacity-10 py-2">
                      <div className="w-[40%] font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                        {TABLE_HEAD[5]}
                      </div>
                      <div className="w-[60%] font-poppins text-[12px] font-medium leading-[18px]">
                        <div
                          className={`w-fit min-w-[60px] cursor-pointer rounded-full px-2 py-[2px] text-center font-poppins ${
                            customer.Status == 0
                              ? `bg-[#ffe6e6] text-[#FF5B5B]`
                              : `bg-[#d9f3ea] text-[#00B074]`
                          }`}
                          onClick={() => handleCustomerStatus(customer)}
                        >
                          {customer.Status == 0 ? "Inactive" : "Active"}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center py-2">
                      <div className="w-[40%] font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                        {TABLE_HEAD[6]}
                      </div>
                      <div className="flex w-[60%] items-center gap-2">
                        <button
                          onClick={() => handleEditClick(customer)}
                          variant="text"
                          className="bg-transparent"
                        >
                          <EditNewIcon />
                        </button>
                        <button
                          onClick={() => handleDelete(customer)}
                          variant="text"
                          className="ml-2 bg-transparent"
                        >
                          <RemoveIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
        </div>

        {/* Pagination for Mobile version */}
        <div className="mt-10 flex justify-end gap-4">
          <span className="font-poppins text-[10px] font-medium text-[#64728C]">
            Page {currentPage} of{" "}
            {Math.ceil(filteredCustomers.length / customerPerPage)}
          </span>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <PaginateLeft />
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filteredCustomers.length / customerPerPage)
            }
          >
            <PaginateRight />
          </button>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};
