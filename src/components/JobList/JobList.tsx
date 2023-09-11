import { useQuery } from "react-query";

import { IJobs } from "@/types/types";
import Loading from "../ui/loading";
import { useFilterStore } from "@/store/filterSlice";
import SingleJob from "./Job";
import { useListTypeStore } from "@/store/listTypeSlice";

export default function JobList() {
  const filterByQuery = useFilterStore((state) => state.filterQuery);

  const listType = useListTypeStore((state) => state.listType);

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

  return (
    <div className="space-y-4 h-[75vh] overflow-auto md:flex-1 md:space-y-8 pb-4 md:px-4 md:pt-2">
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
  );
}
