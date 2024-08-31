import DataTable from "react-data-table-component";

const tableHeaderStyles = {
  headCells: {
    style: {
      backgroundColor: "#F3F4F6",
      font: "Poppins",
      fontWeight: "bold",
      color: "#64728C",
    },
  },
  cells: {
    style: {
      font: "Poppins",
      color: "#64728C",
      fontSize: "12px",
    },
  },
};

const handleFormatData = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate;
};

export const DuePayments = ({ data }) => {
  const DASHBOARD_DUE_PAYMENTS = [
    {
      name: "Customer",
      selector: (row) => row.customer,
    },
    {
      name: "Invoice Number",
      selector: (row) => row.invoice_number,
    },
    {
      name: "Due Date",
      selector: (row) => handleFormatData(row.Date),
    },
    {
      name: "Balance Amount (LKR)",
      selector: (row) =>
        parseFloat(row.Total_Pending_Amount).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
    },
  ];

  return (
    <div className="h-auto rounded-[20px] md:mb-0 mb-5 w-full md:w-[98.5%] pt-3 bg-white">
      <div className="flex flex-col  p-6 pl-6 ">
        <div className="w-auto">
          <h3 className="font-poppins font-semibold text-[16px] leading-[24px] text-[#64728C]">
            Due Payments
          </h3>
          <DataTable
            striped={true}
            columns={DASHBOARD_DUE_PAYMENTS}
            data={data.duePayments}
            customStyles={tableHeaderStyles}
            className="mt-4 scrollbar-x-style scrollbar-y-style"
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[2, 4, 6]}
            paginationComponentOptions={{
              rowsPerPageText: "Entries per page:",
              rangeSeparatorText: "of",
            }}
            noDataComponent={
              <div className="text-center">No data available</div>
            }
          />
        </div>
      </div>
    </div>
  );
};
