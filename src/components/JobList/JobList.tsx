// fixme grid olduğu zaman eğer grid tek satır ise karelerin boyu uzuyor

import { useQuery } from "react-query";

import { IJobs, IJobsResponse } from "@/types/types";
import LoadingSpinner from "../ui/loadingSpinner";
import { useFilterStore } from "@/store/filterSlice";
import SingleJob from "./SingleJob";
import { useListTypeStore } from "@/store/listTypeSlice";

import clsx from "clsx";
import { useSortStore } from "@/store/sortSlice";
import { Button } from "../ui/button";

import { useEffect, useState } from "react";
import JobFilters from "./JobFilters";
import ViewToggle from "./ViewToggle";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import useDebounce from "@/hooks/useDebounce";
import Me from "../Me/Me";
import axios from "axios";
import { useToast } from "../ui/use-toast";

export default function JobList() {
  const [page, setPage] = useState(1);
  const query = useFilterStore((state) => state.filterQuery);
  const debouncedFilterQuery = useDebounce(query, 800);
  const { sortType } = useSortStore();
  const listType = useListTypeStore((state) => state.listType);
  const { toast } = useToast();

  const { searchType } = useFilterStore();

  let url = `${import.meta.env.VITE_API_URL}/jobs?page=${page}`;
  useEffect(() => {
    if (debouncedFilterQuery) {
      setPage(1);
    }
  }, [debouncedFilterQuery]);

  if (debouncedFilterQuery) {
    url += `&search%5Bfield%5D=${searchType}&search%5Bquery%5D=${debouncedFilterQuery}`;
  }

  if (sortType !== "none") {
    const sortTypeArr = sortType.split(" ");

    url += `&orderBy%5Bfield%5D=${sortTypeArr[0]}&orderBy%5Bdirection%5D=${sortTypeArr[1]}`;
  }

  const fetchJobs = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage
            .getItem("accessToken")
            ?.replace(/"/g, "")}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("İşlem başarısız oldu:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong!",
      });
    }
  };

  const { isLoading, isError, error, data, isPreviousData, isFetching } =
    useQuery<IJobsResponse>({
      queryKey: ["jobs", page, debouncedFilterQuery, sortType, searchType],
      queryFn: () => fetchJobs(),
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    });

  if (isError) {
    return <span>Error: {(error as Error).message}</span>;
  }

  return (
    <>
      <div className="flex">
        <div className="flex flex-col flex-1">
          <div className="flex justify-between">
            <JobFilters />
            <div className="flex space-x-4">
              <div className="hidden md:flex md:items-center md:justify-center md:space-x-4">
                <Button
                  onClick={() => setPage((old) => Math.max(old - 1, 0))}
                  disabled={page === 1}
                >
                  <ArrowLeftIcon />
                </Button>{" "}
                <span>{page}/10</span>
                <Button
                  onClick={() => {
                    if (!isPreviousData) {
                      setPage((old) => old + 1);
                    }
                  }}
                  disabled={
                    isPreviousData || page === 10 || data?.data?.length === 0
                  }
                >
                  <ArrowRightIcon />
                </Button>
              </div>
              <ViewToggle />
            </div>
          </div>
          <div
            className={clsx(
              "h-[75vh] max-h-[75vh] overflow-auto  pb-4 mt-2 ",
              !listType
                ? "flex flex-col space-y-4 md:space-y-8 md:px-4 md:pt-2 "
                : "grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4"
            )}
          >
            {isLoading || isFetching ? (
              <LoadingSpinner />
            ) : data?.data?.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <h1 className="text-2xl font-bold text-gray-500">
                  No Jobs Found
                </h1>
              </div>
            ) : (
              <>
                {data?.data?.map((job: IJobs) => (
                  <SingleJob key={job.id} {...job} />
                ))}
              </>
            )}
          </div>
        </div>
        <Me />
      </div>
    </>
  );
}
