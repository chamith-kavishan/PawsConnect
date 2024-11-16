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
} from "../../../utils/icons";
import { TABLE_HEAD } from "../../../utils/tableArray";
import axiosClient from "../../../../axios-client";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/NavigationContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

export const Pets = () => {
  const { user } = useStateContext();

  const [pets, setPets] = useState([]);
  const [petTableLoading, setPetTableLoading] = useState(false);
  const handleLoading = () => setPetTableLoading((pre) => !pre);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPets, setFilteredPets] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(10);

  const [tableLoading, setTableLoading] = useState(true);

  const [expandedPetIndex, setExpandedPetIndex] = useState(null);

  const navigate = useNavigate();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchPets = () => {
      axiosClient
        .get(`/pet/${user.userId}`)
        .then((res) => {
          setPets(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setTableLoading(false);
    };
    fetchPets();
  }, [petTableLoading]);

  //Filtering the customers details
  useEffect(() => {
    const filtered = pets.filter((pet) => {
      const matchesSearch = pet.Name.toLowerCase().includes(
        searchQuery.toLowerCase(),
      );
      if (statusFilter && statusFilter.value !== "") {
        return matchesSearch && pet.Status === statusFilter.value;
      } else {
        return matchesSearch;
      }
    });

    setFilteredPets(filtered);
  }, [searchQuery, pets, statusFilter]);

  // Handler for search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handler for clicking edit button
  const handleEditClick = (pet) => {
    navigate(`/organization/pet/edit/${pet.idPet}`);
  };

  // Handler for clicking view button
  const handleViewClick = (pet) => {
    navigate(`/pet/single/${pet.idPet}`);
  };

  //Function to handle customer delete
  const handleDelete = (pet) => {
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .delete(`/pet/${pet.idPet}`)
          .then((res) => {
            Swal.fire("Deleted!", res.data.message, "success");
            setPets(pets.filter((cus) => cus.idPet !== pet.idPet));
          })
          .catch((error) => {
            console.error("Error deleting Pet:", error);
            if (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) {
              toast.error(error.response.data.message);
            } else {
              toast.error("Failed to delete Pet. Please try again.");
            }
          });
      }
    });
  };

  //Customer status change
  const handlePetStatus = (pet) => {
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
          .post(`/pet/status/${pet.idPet}`, statusData)
          .then((res) => {
            handleLoading();
            toast.success("pet's Status has been changed successfully !");
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
  const TABLE_PETS = [
    {
      name: "Name",
      selector: (row) => (
        <span
          onClick={() => handleViewClick(row)}
          className="pet-name cursor-pointer hover:underline"
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
    // {
    //   name: "Image",
    //   selector: (row) => {
    //     return (
    //       <img
    //         src={`http://localhost:8000/uploads/1724071255146-images.jpeg`}
    //         alt="Pet"
    //         className="pet-image"
    //         onClick={() => handleViewClick(row)}
    //       />
    //     );
    //   },
    //   wrap: false,
    //   maxWidth: "auto",
    // },
    {
      name: "Breed",
      selector: (row) => row.Breed,
      wrap: false,
      maxWidth: "auto",
    },
    {
      name: "Sex",
      selector: (row) => row.Sex,
      wrap: false,
      maxWidth: "auto",
      right: true,
    },
    {
      name: "Age",
      selector: (row) => row.Age,
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
    //       onClick={() => handlePetStatus(row)}
    //     >
    //       {row.Status == 0 ? "Inactive" : "Active"}
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
          <Tooltip content="Edit Pet">
            <IconButton
              onClick={() => handleEditClick(row)}
              variant="text"
              className="mx-2 bg-white"
            >
              <EditNewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip content="Delete Pet">
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
    if (expandedPetIndex === index) {
      setExpandedPetIndex(null);
    } else {
      setExpandedPetIndex(index);
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
                Search Pets
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
            to="/organization/pet/add"
          >
            <PlusIcon width={"24px"} />
          </Link>
          <DataTable
            columns={TABLE_PETS}
            responsive
            data={filteredPets}
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
            to="/pet/add"
          >
            <PlusIcon width={"14px"} />
          </Link>
        </div>
        <div className="mt-3 flex flex-col">
          <div className="mb-4 w-full md:mb-0 md:mr-5 md:w-1/5">
            <p className="pb-2 font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
              Search Pets
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
          {filteredPets
            .slice((currentPage - 1) * petsPerPage, currentPage * petsPerPage)
            .map((pet, index) => (
              <>
                <div
                  className="flex w-full items-center border-b border-[#64728C] border-opacity-10 px-2 py-2"
                  onClick={() => handleExpandClick(index)}
                >
                  <span className="mr-3 flex aspect-square w-[14px] items-center justify-center rounded-full border border-[#64728C]">
                    {expandedPetIndex === index ? (
                      <MinusIcon width={"8px"} />
                    ) : (
                      <PlusIcon width={"8px"} />
                    )}
                  </span>
                  <span className="font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                    {pet.Name}
                  </span>
                </div>
                {expandedPetIndex === index && (
                  <div className="w-full bg-[#D9D9D9] bg-opacity-20 pl-[35px]">
                    <div className="w-full border-b border-[#64728C] border-opacity-10 py-2 font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                      {pet.Name}
                    </div>
                    <div className="flex w-full items-center border-b border-[#64728C] border-opacity-10 py-2">
                      <div className="w-[40%] font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                        {TABLE_HEAD[1]}
                      </div>
                      <div className="w-[60%] text-wrap font-poppins text-[12px] font-normal leading-[18px] text-[#64728C]">
                        {pet.Tp}
                      </div>
                    </div>
                    <div className="flex w-full items-center border-b border-[#64728C] border-opacity-10 py-2">
                      <div className="w-[40%] font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                        {TABLE_HEAD[2]}
                      </div>
                      <div className="overflow-wrap break-word word-break w-[60%] break-all font-poppins text-[12px] font-normal leading-[18px] text-[#64728C]">
                        {pet.Email}
                      </div>
                    </div>
                    <div className="flex w-full items-center border-b border-[#64728C] border-opacity-10 py-2">
                      <div className="w-[40%] font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                        {TABLE_HEAD[3]}
                      </div>
                      <div className="w-[60%] font-poppins text-[12px] font-normal leading-[18px] text-[#64728C]">
                        {pet.Invoice_Count}
                      </div>
                    </div>
                    <div className="flex w-full items-center border-b border-[#64728C] border-opacity-10 py-2">
                      <div className="w-[40%] font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                        {TABLE_HEAD[4]}
                      </div>
                      <div className="w-[60%] font-poppins text-[12px] font-normal leading-[18px] text-[#64728C]">
                        {pet.Total_Invoice
                          ? parseFloat(pet.Total_Invoice).toLocaleString(
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
                            pet.Status == 0
                              ? `bg-[#ffe6e6] text-[#FF5B5B]`
                              : `bg-[#d9f3ea] text-[#00B074]`
                          }`}
                          onClick={() => handlePetStatus(pet)}
                        >
                          {pet.Status == 0 ? "Inactive" : "Active"}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center py-2">
                      <div className="w-[40%] font-poppins text-[12px] font-medium leading-[18px] text-[#64728C]">
                        {TABLE_HEAD[6]}
                      </div>
                      <div className="flex w-[60%] items-center gap-2">
                        <button
                          onClick={() => handleEditClick(pet)}
                          variant="text"
                          className="bg-transparent"
                        >
                          <EditNewIcon />
                        </button>
                        <button
                          onClick={() => handleDelete(pet)}
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
            Page {currentPage} of {Math.ceil(filteredPets.length / petsPerPage)}
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
              currentPage === Math.ceil(filteredPets.length / petsPerPage)
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
