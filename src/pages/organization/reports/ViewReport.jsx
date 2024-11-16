import { CloseIcon } from "../../../utils/icons";
import { Card, Dialog } from "@material-tailwind/react";

export const ViewReport = ({ handleOpen, open, report }) => {
  const handleClose = () => {
    handleOpen();
  };

  return (
    <>
      <Dialog
        size="md"
        open={open}
        handler={handleClose}
        className="font-inter overflow-scroll rounded-[10px] bg-transparent shadow-none scrollbar-hide"
      >
        <Card className="mx-auto w-full max-w-[100%] rounded-sm p-5">
          <div className="align-center flex justify-between border-b border-[#64728C] border-opacity-20">
            <div className="pb-3 font-poppins text-[24px] font-medium leading-9 text-[#64728C]">
              View Report
            </div>
            <div
              className="cursor-pointer text-[20px] font-bold"
              onClick={handleClose}
            >
              <CloseIcon />
            </div>
          </div>

          <div className="mt-5 flex w-full flex-col items-center space-y-4">
            <div className="text-[16px] font-medium">
              <span className="text-[#64728C]">Animal:</span>{" "}
              {report?.Animal || "N/A"}
            </div>
            <div className="text-[16px] font-medium">
              <span className="text-[#64728C]">Injured:</span>{" "}
              {report?.Injured || "N/A"}
            </div>
            <div className="text-[16px] font-medium">
              <span className="text-[#64728C]">Location:</span>{" "}
              <button
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${report?.Latitude},${report?.Longitude}`,
                    "_blank",
                  )
                }
                className="text-blue-500 underline transition hover:text-blue-700"
              >
                View Location
              </button>
            </div>
            <div className="text-[16px] font-medium">
              <span className="text-[#64728C]">Status:</span>{" "}
              {report?.Status === 0 ? "Pending" : "Resolved"}
            </div>
            <div className="text-[16px] font-medium">
              <span className="text-[#64728C]">Image:</span>
            </div>
            <div>
              <img
                src={report?.profileImageURL}
                alt="Report"
                className="max-w-full rounded-md border border-[#64728C] border-opacity-20"
              />
            </div>
          </div>
        </Card>
      </Dialog>
    </>
  );
};
