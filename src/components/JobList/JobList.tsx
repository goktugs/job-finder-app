import { useQuery } from "react-query";

import { IJobs } from "@/types/types";
import Loading from "../ui/loading";
import { useFilterStore } from "@/store/filterSlice";
import SingleJob from "./Job";
import { useListTypeStore } from "@/store/listTypeSlice";
import { Toggle } from "../ui/toggle";
import { WidthIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

export default function JobList() {
  const filterByQuery = useFilterStore((state) => state.filterQuery);

  const listType = useListTypeStore((state) => state.listType);
  const setListType = useListTypeStore((state) => state.setListType);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: "jobs",
    queryFn: () =>
      fetch("https://645e4f8b12e0a87ac0ed1b2d.mockapi.io/jobs").then((res) =>
        res.json()
      ),
  });

  const filteredData = data?.filter((job: IJobs) => {
    return job.name.toLowerCase().includes(filterByQuery.toLowerCase());
  });

  if (isError) {
    return <span>Error: {(error as Error).message}</span>;
  }

  console.log(listType);
  return (
    <>
      <div className="flex justify-end">
        <Toggle
          aria-pressed={listType}
          onClick={() => setListType(!listType)}
          variant="default"
          aria-label="Toggle Grid Row"
          className="gap-2"
        >
          {listType ? (
            <div className="flex space-x-2">
              <WidthIcon className="w-4 h-4" />
              <span>Grid</span>
            </div>
          ) : (
            <div className="flex space-x-2">
              <WidthIcon className="w-4 h-4 transform rotate-90" />
              <span>Row</span>
            </div>
          )}
        </Toggle>
      </div>
      <div
        // className="space-y-4 h-[60vh] max-h-[60vh] overflow-auto md:flex-1 md:space-y-8 pb-4 md:px-4 md:pt-2  "
        className={clsx(
          "h-[75vh] max-h-[75vh] overflow-auto  pb-4  ",
          !listType
            ? "flex flex-col space-y-4 md:space-y-8 md:px-4 md:pt-2 "
            : "grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4"
        )}
      >
        {isLoading ? (
          <Loading />
        ) : filteredData?.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl font-bold text-gray-500">No Jobs Found</h1>
          </div>
        ) : (
          filteredData?.map((job: IJobs) => <SingleJob key={job.id} {...job} />)
        )}
      </div>
    </>
  );
}
