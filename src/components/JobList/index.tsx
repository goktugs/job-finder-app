import { useQuery } from "react-query";

import Job from "./Job";
import { IJobs } from "@/types/types";
import Loading from "../ui/loading";

export default function JobList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: "jobs",
    queryFn: () =>
      fetch("https://645e4f8b12e0a87ac0ed1b2d.mockapi.io/jobs").then((res) =>
        res.json()
      ),
  });

  if (isError) {
    return <span>Error: {(error as Error).message}</span>;
  }

  return (
    <div className="space-y-4 h-[60vh] overflow-auto md:flex-1 md:space-y-8 pb-4 md:px-4 md:pt-2">
      {isLoading ? (
        <Loading />
      ) : (
        data?.map((job: IJobs) => <Job key={job.id} {...job} />)
      )}
    </div>
  );
}
