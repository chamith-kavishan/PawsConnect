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

export const SupplierCredits = ({ data }) => {
  const handleFormatData = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };
  const DASHBOARD_SUPPLIER_CREDIT_HEAD = [
    {
      name: "DATE",
      selector: (row) => handleFormatData(row.Date_Time),
    },
    {
      name: "SUPPLIER",
      selector: (row) => row.supplier,
    },
    {
      name: "CREDIT (LKR)",
      selector: (row) => (
        <span className="pr-2" style={{ textAlign: "right" }}>
          {parseFloat(row.Total_Credit_Balance).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
  ];

  return (
    <div className="h-auto rounded-[20px] md:mb-0 md:ml-2.5 w-full pt-3 bg-white">
      <div className="flex flex-col  p-6 pl-6 ">
        <div className="w-auto">
          <h3 className="font-poppins font-semibold text-[16px] leading-[24px] text-[#64728C]">
            Supplier Credits
          </h3>
          <div className="overflow-y-auto">
            <DataTable
              striped={true}
              columns={DASHBOARD_SUPPLIER_CREDIT_HEAD}
              data={data.supllier_credit_logs}
              headClassName="font-bold"
              customStyles={tableHeaderStyles}
              className="mt-4"
              pagination
              paginationPerPage={3}
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
    </div>
  );
};
