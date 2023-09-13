import { Button } from "../ui/button";
import {
  BackpackIcon,
  CalendarIcon,
  DrawingPinFilledIcon,
  SketchLogoIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { IJobs } from "@/types/types";
import { useListTypeStore } from "@/store/listTypeSlice";
import clsx from "clsx";
export default function SingleJob(job: IJobs) {
  const listType = useListTypeStore((state) => state.listType);

  return (
    <div
      className={clsx(
        "pl-4 pr-2 py-4 shadow-lg flex items-center rounded-md md:px-16 hover:transition hover:shadow-xl hover:bg-gray-50 cursor-pointer",
        listType
          ? "flex-col text-center justify-center items-center space-y-2 "
          : "flex-row "
      )}
    >
      <BackpackIcon className="w-6 h-6 md:w-12 md:h-12 " />

      <div className="flex-1 flex flex-col space-y-2 mx-4 md:mx-12">
        <h3 className="font-bold text-md md:text-3xl ">
          {job.name}
          <span className="text-xs text-gray-500 ml-2 hidden md:block">
            ({job.companyName})
          </span>
        </h3>
        <div className="flex space-x-4">
          <div className="flex items-center text-gray-600 space-x-1 text-opacity-70 ">
            <DrawingPinFilledIcon className="text-gray-600 fill-gray-600 md:w-6 md:h-6" />
            <span className="text-xs md:text-lg">{job.location}</span>
          </div>
          <div className=" md:items-center text-gray-600 md:space-x-1 md:text-opacity-70 hidden md:flex  ">
            <SketchLogoIcon className="text-gray-600 fill-gray-600 md:w-4 md:h-4" />
            <span className="text-xs md:text-lg">${job.salary}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-xs md:text-lg">
        <Button className="bg-main-green text-white py-1 px-2 rounded-lg md:text-lg ">
          Apply Now
        </Button>
        <div className="flex items-center justify-center mt-2">
          <CalendarIcon className="h-4 w-4 text-gray-600" />
          <span className="text-gray-600  ml-2">
            Date {format(new Date(job?.createdAt), "dd/MM/yyyy")}
          </span>
        </div>
      </div>
    </div>
  );
}
