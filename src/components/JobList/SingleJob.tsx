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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
export default function SingleJob({
  job,
  alreadyApplied,
}: {
  job: IJobs;
  alreadyApplied: boolean;
}) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const listType = useListTypeStore((state) => state.listType);

  const { mutate } = useMutation(
    (jobId: number) =>
      fetch(`${import.meta.env.VITE_API_URL}/jobs/${jobId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage
            .getItem("accessToken")
            ?.replace(/"/g, "")}`,
        },
        body: JSON.stringify({ jobId }),
      })
        .then((res) => res.json())

        .catch(() =>
          toast({
            variant: "destructive",
            title: "Error",
            description: "User not found",
          })
        ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("appliedJobs");
      },
    }
  );

  const { mutate: mutateWithdraw } = useMutation(
    (jobId: number) =>
      fetch(`${import.meta.env.VITE_API_URL}/jobs/${jobId}/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage
            .getItem("accessToken")
            ?.replace(/"/g, "")}`,
        },
        body: JSON.stringify({ jobId }),
      })
        .then((res) => res.json())

        .catch(() =>
          toast({
            variant: "destructive",
            title: "Error",
            description: "User not found",
          })
        ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("appliedJobs");
      },
    }
  );

  const applyJobHandler = (jobId: number) => {
    mutate(jobId);
  };

  const WithdrawJobHandler = (jobId: number) => {
    mutateWithdraw(jobId);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => setIsDialogOpen(open)}
      key={job.id}
    >
      <DialogTrigger asChild>
        <div
          className={clsx(
            "pl-4 pr-2 py-4 shadow-lg flex items-center rounded-md md:px-16 hover:transition hover:shadow-xl hover:bg-gray-50 cursor-pointer relative",
            listType
              ? "flex-col text-center justify-center items-center space-y-2 "
              : "flex-row "
          )}
        >
          {alreadyApplied && (
            <span className="text-xs md:text-lg text-green-600 absolute left-0 top-5 -rotate-45">
              Applied
            </span>
          )}
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
            <div className="flex items-center justify-center mt-2">
              <CalendarIcon className="h-4 w-4 text-gray-600" />
              <span className="text-gray-600  ml-2">
                Date {format(new Date(job?.createdAt), "dd/MM/yyyy")}
              </span>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col space-y-4">
          <DialogTitle className="text-3xl">{job.name}</DialogTitle>
          <DialogDescription className="flex justify-around w-full items-center">
            <span> {job.companyName} </span>
            <span> {job.location}</span>
            <span>{job.salary}$</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-4">
          <p className="text-gray-600">{job.description}</p>
        </div>

        <DialogFooter className="flex flex-col items-center justify-center md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <Button
            type="submit"
            variant="destructive"
            className="hover:text-red-600 hover:bg-white active:bg-red-600 active:text-white border-none"
            onClick={() => setIsDialogOpen(false)}
          >
            Close
          </Button>
          {alreadyApplied ? (
            <Button
              type="submit"
              variant="outline"
              className="active:bg-green-600 active:text-white hover:bg-green-600 hover:text-white"
              onClick={() => {
                WithdrawJobHandler(job.id);
                setIsDialogOpen(false);
                toast({
                  variant: "default",
                  title: "Success",
                  description: "Job Removed Succesfully",
                  duration: 2000,
                });
              }}
            >
              Withdraw Job
            </Button>
          ) : (
            <Button
              type="submit"
              variant="outline"
              className="active:bg-green-600 active:text-white hover:bg-green-600 hover:text-white"
              onClick={() => {
                applyJobHandler(job.id);
                setIsDialogOpen(false);
                toast({
                  variant: "default",
                  title: "Success",
                  description: "Job applied successfully",
                  duration: 2000,
                });
              }}
            >
              Apply Job
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
