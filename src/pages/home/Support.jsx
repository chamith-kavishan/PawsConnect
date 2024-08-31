import { useState } from "react";
import { PrimaryButton } from "../../components/global/PrimaryButton";
import { LocationIcon, TickMailIcon } from "../../utils/icons";
import { ReportModal } from "./ReportModal";

export const Support = () => {
  const [reportOpen, setReportOpen] = useState(false);
  const reportHandleOpen = () => setReportOpen((cur) => !cur);

  const handleReportClick = () => {
    console.log("hi");
    reportHandleOpen();
  };

  return (
    <section className="absolute top-[550px] w-full px-[8%] pb-20 font-poppins">
      <div className="flex items-center justify-center px-12">
        <div className="flex h-[450px] w-[30%] flex-col items-center justify-center bg-[#1b9195]">
          <TickMailIcon color="white" />
          <div className="font-poppins text-[25px] font-medium text-white">
            Received
          </div>
          <div className="mt-5 w-[60%] text-center text-[22px] text-white">
            21,525 requests for help from volunteers
          </div>
        </div>
        <div className="mb-10 flex h-[550px] w-[50%] flex-col items-center justify-center bg-[#02aee0] shadow-sm">
          <LocationIcon />
          <div className="font-poppins text-[40px] font-medium text-white">
            Be the Next Savior!
          </div>
          <div className="mb-4 mt-5 w-[60%] text-center text-[20px] text-white">
            If you see an animal in need, let us know! Share the precise
            location and details so that nearby rescue teams and volunteers can
            provide timely assistance. Your report could save a life.
          </div>
          <PrimaryButton
            text="Report an Animal in Distress"
            onClick={handleReportClick}
          />
        </div>
        <div className="flex h-[450px] w-[25%] flex-col items-center justify-center bg-[#feda00]">
          <TickMailIcon color="#030305" />
          <div className="font-poppins text-[40px] font-medium text-[#030305]">
            Were Joined
          </div>
          <div className="mt-5 w-[60%] text-center text-[22px] text-[#030305]">
            32 Animal Welfare Organizations and Volunteers
          </div>
        </div>
      </div>
      <ReportModal handleOpen={reportHandleOpen} open={reportOpen} />
    </section>
  );
};
