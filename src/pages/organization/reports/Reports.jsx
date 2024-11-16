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
  ViewIcon,
} from "../../../utils/icons";
import { TABLE_HEAD } from "../../../utils/tableArray";
import axiosClient from "../../../../axios-client";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/NavigationContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { ViewReport } from "./ViewReport";

export const Reports = () => {
  const { user } = useStateContext();

  const [reports, setReports] = useState([]);
  const [reportTableLoading, setReportTableLoading] = useState(false);
  const handleLoading = () => setReportTableLoading((pre) => !pre);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(10);

  const [tableLoading, setTableLoading] = useState(true);

  const [expandedReportIndex, setExpandedReportIndex] = useState(null);
  const [viewReport, setViewReport] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const navigate = useNavigate();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchReports = () => {
      axiosClient
        .get(`/report/${user.userId}`)
        .then((res) => {
          setReports(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setTableLoading(false);
    };
    fetchReports();
  }, [reportTableLoading]);

  //Filtering the customers details
  useEffect(() => {
    const filtered = reports.filter((report) => {
      if (statusFilter && statusFilter.value !== "") {
        return report.Status === statusFilter.value;
      } else {
        return true;
      }
    });
    setFilteredReports(filtered);
  }, [reports, statusFilter]);

  // Handler for search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handler for clicking edit button
  const handleEditClick = (report) => {
    navigate(`/organization/report/edit/${report.idReport}`);
  };

  // Handler for clicking view button
  const handleViewClick = (report) => {
    setViewReport(report);
    handleOpen();
  };

  //Function to handle customer delete
  const handleDelete = (report) => {
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .delete(`/report/${report.idReport}`)
          .then((res) => {
            Swal.fire("Deleted!", res.data.message, "success");
            setReports(
              reports.filter((cus) => cus.idReport !== report.idReport),
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
  const handleReportStatus = (report) => {
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
          .post(`/report/status/${report.idReport}`, statusData)
          .then((res) => {
            handleLoading();
            toast.success("report's Status has been changed successfully !");
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
  const TABLE_REPORTS = [
    {
      name: "Animal",
      selector: (row) => row.Animal,

      wrap: true,
      maxWidth: "auto",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => (
        <button
          onClick={() =>
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${row.Latitude},${row.Longitude}`,
              "_blank",
            )
          }
          className="text-blue-500 underline transition hover:text-blue-700"
        >
          View Location
        </button>
      ),
      wrap: false,
      maxWidth: "auto",
      right: true,
    },
    {
      name: "Injured",
      selector: (row) => (row.Injured === "no" ? "No" : "Yes"),
      wrap: false,
      maxWidth: "auto",
      right: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <div className="py-3">
          <img src={row.profileImageURL} className="h-[100px]" />
        </div>
      ),
      wrap: false,
      maxWidth: "auto",
      right: true,
    },
    // {
    //   name: "Status",
    //   selector: (row) => (
    //     <div
    //       className={`min-w-[70px] cursor-pointer rounded-full px-2 py-[2px] text-center font-poppins text-[11px] font-semibold ${
    //         row.Status == 0
    //           ? `bg-[#ffe6e6] text-[#FF5B5B]`
    //           : `bg-[#d9f3ea] text-[#00B074]`
    //       }`}
    //       onClick={() => handleReportStatus(row)}
    //     >
    //       {row.Status == 0 ? "Not Rescued" : "Rescued"}
    //     </div>
    //   ),
    //   wrap: false,
    //   maxWidth: "auto",
    //   center: true,
    // },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Tooltip content="View Report">
            <IconButton
              onClick={() => handleViewClick(row)}
              variant="text"
              className="bg-white"
            >
              <ViewIcon />
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
    if (expandedReportIndex === index) {
      setExpandedReportIndex(null);
    } else {
      setExpandedReportIndex(index);
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
                Search Reports
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
          <DataTable
            columns={TABLE_REPORTS}
            responsive
            data={filteredReports}
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
        <div className="mt-3 flex flex-col">
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
          {filteredReports
            .slice(
              (currentPage - 1) * reportsPerPage,
              currentPage * reportsPerPage,
            )
            .map((report, index) => (
              <>
                <div
                  className="flex w-full items-center border-b border-[#64728C] border-opacity-10 px-2 py-2"
                  onClick={() => handleExpandClick(index)}
                >
                  <span className="mr-3 flex aspect-square w-[14px] items-center justify-center rounded-full border border-[#64728C]">
                    {expandedReportIndex === index ? (
                      <MinusIcon width={"8px"} />
                    ) : (
                      <PlusIcon width={"8px"} />
                    )}
                  </span>
                  <span className="font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                    {report.Name}
                  </span>
                </div>
                {expandedReportIndex === index && (
                  <div className="w-full bg-[#D9D9D9] bg-opacity-20 pl-[35px]">
                    <div className="w-full border-b border-[#64728C] border-opacity-10 py-2 font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                      {report.Name}
                    </div>
                    <div className="flex w-full items-center border-b border-[#64728C] border-opacity-10 py-2">
                      <div className="w-[40%] font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                        {TABLE_HEAD[1]}
                      </div>
                      <div className="w-[60%] text-wrap font-poppins text-[12px] font-normal leading-[18px] text-[#64728C]">
                        {report.Tp}
                      </div>
                    </div>
                    <div className="flex w-full items-center border-b border-[#64728C] border-opacity-10 py-2">
                      <div className="w-[40%] font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                        {TABLE_HEAD[2]}
                      </div>
                      <div className="overflow-wrap break-word word-break w-[60%] break-all font-poppins text-[12px] font-normal leading-[18px] text-[#64728C]">
                        {report.Email}
                      </div>
                    </div>
                    <div className="flex w-full items-center border-b border-[#64728C] border-opacity-10 py-2">
                      <div className="w-[40%] font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                        {TABLE_HEAD[3]}
                      </div>
                      <div className="w-[60%] font-poppins text-[12px] font-normal leading-[18px] text-[#64728C]">
                        {report.Invoice_Count}
                      </div>
                    </div>
                    <div className="flex w-full items-center border-b border-[#64728C] border-opacity-10 py-2">
                      <div className="w-[40%] font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                        {TABLE_HEAD[4]}
                      </div>
                      <div className="w-[60%] font-poppins text-[12px] font-normal leading-[18px] text-[#64728C]">
                        {report.Total_Invoice
                          ? parseFloat(report.Total_Invoice).toLocaleString(
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
                            report.Status == 0
                              ? `bg-[#ffe6e6] text-[#FF5B5B]`
                              : `bg-[#d9f3ea] text-[#00B074]`
                          }`}
                          onClick={() => handleReportStatus(report)}
                        >
                          {report.Status == 0 ? "Inactive" : "Active"}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center py-2">
                      <div className="w-[40%] font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                        {TABLE_HEAD[6]}
                      </div>
                      <div className="flex w-[60%] items-center gap-2">
                        <button
                          onClick={() => handleEditClick(report)}
                          variant="text"
                          className="bg-transparent"
                        >
                          <EditNewIcon />
                        </button>
                        <button
                          onClick={() => handleDelete(report)}
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
            {Math.ceil(filteredReports.length / reportsPerPage)}
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
              currentPage === Math.ceil(filteredReports.length / reportsPerPage)
            }
          >
            <PaginateRight />
          </button>
        </div>
      </section>
      <ToastContainer />
      <ViewReport report={viewReport} handleOpen={handleOpen} open={open} />
    </>
  );
};
