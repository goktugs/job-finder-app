import { useQuery } from "react-query";

import { IJobs } from "@/types/types";
import Loading from "../ui/loading";
import { useFilterStore } from "@/store/filterSlice";
import SingleJob from "./Job";
import { useListTypeStore } from "@/store/listTypeSlice";
import { Toggle } from "../ui/toggle";
import { WidthIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { useSortStore } from "@/store/sortSlice";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useEffect } from "react";

export default function JobList() {
  const filterByQuery = useFilterStore((state) => state.filterQuery);

  const listType = useListTypeStore((state) => state.listType);
  const setListType = useListTypeStore((state) => state.setListType);

  const sortByDate = useSortStore((state) => state.sortByDate);
  const setSortByDate = useSortStore((state) => state.setSortByDate);
  const sortBySalary = useSortStore((state) => state.sortBySalary);
  const setSortBySalary = useSortStore((state) => state.setSortBySalary);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: "jobs",
    queryFn: () =>
      fetch("https://645e4f8b12e0a87ac0ed1b2d.mockapi.io/jobs").then((res) =>
        res.json()
      ),
  });
  useEffect(() => {
    setSortBySalary("");
  }, [setSortBySalary, sortByDate]);
  const filteredData = data?.filter((job: IJobs) => {
    return job.name.toLowerCase().includes(filterByQuery.toLowerCase());
  });

  if (sortByDate === "asc") {
    filteredData?.sort((a: IJobs, b: IJobs) => {
      return new Date(a.createdAT).getTime() - new Date(b.createdAT).getTime();
    });
  } else if (sortByDate === "desc") {
    filteredData?.sort((a: IJobs, b: IJobs) => {
      return new Date(b.createdAT).getTime() - new Date(a.createdAT).getTime();
    });
  }

  if (sortBySalary === "asc") {
    filteredData?.sort((a: IJobs, b: IJobs) => {
      return a.salary - b.salary;
    });
  } else if (sortBySalary === "desc") {
    filteredData?.sort((a: IJobs, b: IJobs) => {
      return b.salary - a.salary;
    });
  }

  if (isError) {
    return <span>Error: {(error as Error).message}</span>;
  }

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Date</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="morphismGlass">
              <DropdownMenuLabel className="text-center">
                Sort By
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-main-green" />
              <DropdownMenuRadioGroup
                value={sortByDate}
                onValueChange={(value) => setSortByDate(value)}
              >
                <DropdownMenuRadioItem value="asc">Asc</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="desc">Desc</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Salary</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="morphismGlass">
              <DropdownMenuLabel className="text-center">
                Sort By
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-main-green" />
              <DropdownMenuRadioGroup
                value={sortBySalary}
                onValueChange={(value) => setSortBySalary(value)}
              >
                <DropdownMenuRadioItem value="asc">Asc</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="desc">Desc</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Toggle
          aria-pressed={listType}
          onClick={() => setListType(!listType)}
          variant="default"
          aria-label="Toggle Grid Row"
          className="gap-2 border"
        >
          {listType ? (
            <div className="flex space-x-2">
              <WidthIcon className="w-4 h-4 transform transition-all rotate-180" />
              <span>Grid</span>
            </div>
          ) : (
            <div className="flex space-x-2">
              <WidthIcon className="w-4 h-4 transform transition-all rotate-90" />
              <span>Row</span>
            </div>
          )}
        </Toggle>
      </div>
      <div
        className={clsx(
          "h-[75vh] max-h-[75vh] overflow-auto  pb-4 mt-2 ",
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
